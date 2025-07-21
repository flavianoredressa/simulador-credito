import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoanForm } from "../LoanForm";
import { LOAN_LIMITS } from "@/constants/loan";

// Mock UI components
jest.mock("@/components/ui/Card", () => ({
  Card: ({
    children,
    variant,
  }: {
    children: React.ReactNode;
    variant?: string;
  }) => <div className={`card variant-${variant}`}>{children}</div>,
  CardContent: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={`card-content ${className}`}>{children}</div>,
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div className="card-header">{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <h2 className="card-title">{children}</h2>
  ),
  CardDescription: ({ children }: { children: React.ReactNode }) => (
    <p className="card-description">{children}</p>
  ),
}));

jest.mock("@/components/ui/Input", () => ({
  Input: ({
    label,
    value,
    onChange,
    helperText,
    prefix,
    suffix,
    ...props
  }: React.PropsWithChildren<{
    label?: string;
    value?: number | string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    helperText?: string;
    prefix?: string;
    suffix?: string;
    [key: string]: unknown;
  }>) => (
    <div className="input-wrapper">
      {label && <label>{label}</label>}
      {prefix && <span className="prefix">{prefix}</span>}
      <input
        data-testid={`input-${label?.toLowerCase().replace(/\s+/g, "-").replace(/[()%]/g, "")}`}
        value={value}
        onChange={onChange}
        {...props}
      />
      {suffix && <span className="suffix">{suffix}</span>}
      {helperText && <p className="helper-text">{helperText}</p>}
    </div>
  ),
}));

describe("LoanForm Component", () => {
  it("should render without crashing", () => {
    render(<LoanForm />);

    expect(screen.getByText("Simulação de Empréstimo")).toBeTruthy();
  });

  it("should render all form fields", () => {
    render(<LoanForm />);

    expect(screen.getByText("Valor do Empréstimo")).toBeTruthy();
    expect(screen.getByText("Prazo de Pagamento (meses)")).toBeTruthy();
    expect(screen.getByText("Data de Nascimento")).toBeTruthy();
  });

  it("should initialize with default values", () => {
    render(<LoanForm />);

    const amountInput = screen.getByTestId("input-valor-do-empréstimo");
    const installmentsInput = screen.getByTestId(
      "input-prazo-de-pagamento-meses"
    );
    const birthDateInput = screen.getByTestId("input-data-de-nascimento");

    expect(amountInput).toHaveValue(LOAN_LIMITS.amount.default);
    expect(installmentsInput).toHaveValue(LOAN_LIMITS.installments.default);
    expect(birthDateInput).toHaveValue("");
  });

  it("should render input prefixes", () => {
    render(<LoanForm />);

    expect(screen.getByText("R$")).toBeTruthy(); // Amount prefix
  });

  it("should render helper texts", () => {
    render(<LoanForm />);

    expect(screen.getByText(/parcelas mensais/)).toBeTruthy();
    expect(screen.getByText(/Valor atual: R\$/)).toBeTruthy();
  });

  it("should have proper input limits", () => {
    render(<LoanForm />);

    const amountInput = screen.getByTestId("input-valor-do-empréstimo");
    const installmentsInput = screen.getByTestId(
      "input-prazo-de-pagamento-meses"
    );

    // Amount limits
    expect(amountInput).toHaveAttribute(
      "min",
      LOAN_LIMITS.amount.min.toString()
    );
    expect(amountInput).toHaveAttribute(
      "max",
      LOAN_LIMITS.amount.max.toString()
    );
    expect(amountInput).toHaveAttribute(
      "step",
      LOAN_LIMITS.amount.step.toString()
    );

    // Installments limits
    expect(installmentsInput).toHaveAttribute(
      "min",
      LOAN_LIMITS.installments.min.toString()
    );
    expect(installmentsInput).toHaveAttribute(
      "max",
      LOAN_LIMITS.installments.max.toString()
    );
    expect(installmentsInput).toHaveAttribute(
      "step",
      LOAN_LIMITS.installments.step.toString()
    );
  });

  it("should call onCalculate when birth date is filled and amount changes", async () => {
    const user = userEvent.setup();
    const mockOnCalculate = jest.fn();

    render(<LoanForm onCalculate={mockOnCalculate} />);

    // First, fill birth date (required for calculations)
    const birthDateInput = screen.getByTestId("input-data-de-nascimento");
    await user.type(birthDateInput, "1990-01-01");

    // Now the onCalculate should be called when birth date is set
    expect(mockOnCalculate).toHaveBeenCalled();
  });

  it("should have proper card structure", () => {
    const { container } = render(<LoanForm />);

    const card = container.querySelector(".card.variant-elevated");
    expect(card).toBeTruthy();
  });

  it("should render correct number of input fields", () => {
    const { container } = render(<LoanForm />);

    const inputWrappers = container.querySelectorAll(".input-wrapper");
    expect(inputWrappers).toHaveLength(3); // amount, installments, birthDate
  });

  it("should have proper input types", () => {
    render(<LoanForm />);

    const amountInput = screen.getByTestId("input-valor-do-empréstimo");
    const installmentsInput = screen.getByTestId(
      "input-prazo-de-pagamento-meses"
    );
    const birthDateInput = screen.getByTestId("input-data-de-nascimento");

    expect(amountInput).toHaveAttribute("type", "number");
    expect(installmentsInput).toHaveAttribute("type", "number");
    expect(birthDateInput).toHaveAttribute("type", "date");
  });

  it("should display age-based information when birth date is filled", async () => {
    const user = userEvent.setup();
    render(<LoanForm />);

    const birthDateInput = screen.getByTestId("input-data-de-nascimento");
    await user.type(birthDateInput, "1990-01-01");

    // Should show calculated information
    expect(screen.getByText("Informações Calculadas")).toBeTruthy();
    expect(screen.getByText(/Idade:/)).toBeTruthy();
    expect(screen.getByText(/Taxa de Juros:/)).toBeTruthy();
  });

  it("should display correct interest rate for age <= 25 (5% rate)", async () => {
    const user = userEvent.setup();
    render(<LoanForm />);

    const birthDateInput = screen.getByTestId("input-data-de-nascimento");
    await user.type(birthDateInput, "2000-01-01"); // About 25 years old

    expect(screen.getByText("5% ao ano")).toBeInTheDocument();
  });

  it("should display correct interest rate for age 26-40 (3% rate)", async () => {
    const user = userEvent.setup();
    render(<LoanForm />);

    const birthDateInput = screen.getByTestId("input-data-de-nascimento");
    await user.type(birthDateInput, "1990-01-01"); // About 35 years old

    expect(screen.getByText("3% ao ano")).toBeInTheDocument();
  });

  it("should display correct interest rate for age 41-60 (2% rate)", async () => {
    const user = userEvent.setup();
    render(<LoanForm />);

    const birthDateInput = screen.getByTestId("input-data-de-nascimento");
    await user.type(birthDateInput, "1975-01-01"); // About 50 years old

    expect(screen.getByText("2% ao ano")).toBeInTheDocument();
  });

  it("should display correct interest rate for age > 60 (4% rate)", async () => {
    const user = userEvent.setup();
    render(<LoanForm />);

    const birthDateInput = screen.getByTestId("input-data-de-nascimento");
    await user.type(birthDateInput, "1960-01-01"); // About 65 years old

    expect(screen.getByText("4% ao ano")).toBeInTheDocument();
  });

  it("should handle input changes for amount field", async () => {
    const user = userEvent.setup();
    const mockOnCalculate = jest.fn();
    render(<LoanForm onCalculate={mockOnCalculate} />);

    const amountInput = screen.getByTestId("input-valor-do-empréstimo");
    const birthDateInput = screen.getByTestId("input-data-de-nascimento");

    // First set birth date to enable calculations
    await user.type(birthDateInput, "1990-01-01");
    mockOnCalculate.mockClear();

    // Change amount
    await user.clear(amountInput);
    await user.type(amountInput, "15000");

    expect(mockOnCalculate).toHaveBeenCalled();
    expect(
      screen.getByText(/Valor atual: R\$\s*15\.000,00/)
    ).toBeInTheDocument();
  });

  it("should handle input changes for installments field", async () => {
    const user = userEvent.setup();
    const mockOnCalculate = jest.fn();
    render(<LoanForm onCalculate={mockOnCalculate} />);

    const installmentsInput = screen.getByTestId(
      "input-prazo-de-pagamento-meses"
    );
    const birthDateInput = screen.getByTestId("input-data-de-nascimento");

    // First set birth date to enable calculations
    await user.type(birthDateInput, "1990-01-01");
    mockOnCalculate.mockClear();

    // Change installments
    await user.clear(installmentsInput);
    await user.type(installmentsInput, "18");

    expect(mockOnCalculate).toHaveBeenCalled();
    expect(screen.getByText("18 parcelas mensais")).toBeInTheDocument();
  });

  it("should display warning message when birth date is not filled", () => {
    render(<LoanForm />);

    expect(
      screen.getByText(
        /Preencha sua data de nascimento para calcular a taxa de juros/
      )
    ).toBeInTheDocument();
  });

  it("should display age rate information table", async () => {
    const user = userEvent.setup();
    render(<LoanForm />);

    const birthDateInput = screen.getByTestId("input-data-de-nascimento");
    await user.type(birthDateInput, "1990-01-01");

    // Should show the age rate table
    expect(screen.getByText("Faixas:")).toBeInTheDocument();
    expect(screen.getByText(/Até 25: 5%/)).toBeInTheDocument();
    expect(screen.getByText(/26-40: 3%/)).toBeInTheDocument();
    expect(screen.getByText(/41-60: 2%/)).toBeInTheDocument();
    expect(screen.getByText(/60\+: 4%/)).toBeInTheDocument();
  });

  it("should clear age and interest rate when birth date is cleared", async () => {
    const user = userEvent.setup();
    render(<LoanForm />);

    const birthDateInput = screen.getByTestId("input-data-de-nascimento");

    // First set birth date
    await user.type(birthDateInput, "1990-01-01");
    expect(screen.getByText("Informações Calculadas")).toBeInTheDocument();

    // Clear birth date
    await user.clear(birthDateInput);

    // Should show warning message again
    expect(
      screen.getByText(
        /Preencha sua data de nascimento para calcular a taxa de juros/
      )
    ).toBeInTheDocument();
  });

  it("should handle form without onCalculate prop", () => {
    // Test without onCalculate prop to ensure no errors
    render(<LoanForm />);

    expect(screen.getByText("Simulação de Empréstimo")).toBeInTheDocument();
  });
});
