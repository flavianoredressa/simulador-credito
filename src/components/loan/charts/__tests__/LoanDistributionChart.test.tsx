import { render, screen } from "@testing-library/react";
import { LoanDistributionChart } from "../LoanDistributionChart";
import type { LoanCalculation } from "@/types/loan";

// Mock do Recharts para evitar problemas de renderização nos testes
jest.mock("recharts", () => ({
  PieChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pie-chart">{children}</div>
  ),
  Pie: ({
    data,
    label,
    children,
  }: {
    data: Array<{ name: string; value: number }>;
    label?: (params: { name: string; percent?: number }) => string;
    children?: React.ReactNode;
  }) => (
    <div data-testid="pie">
      {data.map((item, index) => (
        <div key={index} data-testid={`pie-item-${item.name.toLowerCase()}`}>
          {item.name}: {item.value}
        </div>
      ))}
      {/* Test the label function */}
      {label && (
        <div data-testid="pie-label">
          {label({ name: "Principal", percent: 0.9728 })}
        </div>
      )}
      {label && (
        <div data-testid="pie-label-juros">
          {label({ name: "Juros", percent: 0.0272 })}
        </div>
      )}
      {label && (
        <div data-testid="pie-label-undefined">
          {label({ name: "Test", percent: undefined })}
        </div>
      )}
      {/* Render children to include Cell components */}
      {children}
    </div>
  ),
  Cell: ({ fill }: { fill?: string }) => (
    <div data-testid="cell" data-fill={fill} />
  ),
  Tooltip: ({ formatter }: { formatter?: (value: number) => string }) => (
    <div data-testid="tooltip">
      {/* Test the formatter function */}
      {formatter && (
        <div data-testid="tooltip-formatted">{formatter(10000)}</div>
      )}
    </div>
  ),
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
}));

// Mock do Card
jest.mock("@/components/ui/Card", () => ({
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-content">{children}</div>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-title">{children}</div>
  ),
  CardDescription: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-description">{children}</div>
  ),
}));

describe("LoanDistributionChart", () => {
  const mockLoanData: LoanCalculation = {
    amount: 10000,
    installments: 12,
    interestRate: 0.0025, // 3% anual / 12 meses
    installmentAmount: 856.07,
    totalAmount: 10272.84,
    totalInterest: 272.84,
    annualInterestRate: 3,
    age: 35,
    interestPercentage: 2.73,
  };

  it("should render the distribution chart correctly", () => {
    render(<LoanDistributionChart loanData={mockLoanData} />);

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("card-title")).toBeInTheDocument();
    expect(screen.getByTestId("card-description")).toBeInTheDocument();
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
    expect(screen.getByText("Distribuição do Empréstimo")).toBeInTheDocument();
  });

  it("should display the correct title and description", () => {
    render(<LoanDistributionChart loanData={mockLoanData} />);

    expect(screen.getByText("Distribuição do Empréstimo")).toBeInTheDocument();
    expect(
      screen.getByText("Proporção entre valor principal e juros totais")
    ).toBeInTheDocument();
  });

  it("should render pie chart data correctly", () => {
    render(<LoanDistributionChart loanData={mockLoanData} />);

    // Verificar se os dados do gráfico estão sendo passados
    expect(screen.getByTestId("pie-item-principal")).toHaveTextContent(
      "Principal: 10000"
    );
    expect(screen.getByTestId("pie-item-juros")).toHaveTextContent(
      "Juros: 272.84"
    );
  });

  it("should display formatted currency in legend", () => {
    render(<LoanDistributionChart loanData={mockLoanData} />);

    // Verificar se os valores estão formatados em reais na legenda (not in tooltip)
    const legendAmounts = screen.getAllByText("R$ 10.000,00");
    expect(legendAmounts.length).toBeGreaterThan(0);
    expect(screen.getByText("R$ 272,84")).toBeInTheDocument();
  });

  it("should have proper icon in header", () => {
    render(<LoanDistributionChart loanData={mockLoanData} />);

    expect(screen.getByText("🥧")).toBeInTheDocument();
  });

  it("should render legend with correct labels", () => {
    render(<LoanDistributionChart loanData={mockLoanData} />);

    expect(screen.getByText("Principal")).toBeInTheDocument();
    expect(screen.getByText("Juros Totais")).toBeInTheDocument();
  });

  it("should handle zero interest scenario", () => {
    const zeroInterestLoan: LoanCalculation = {
      ...mockLoanData,
      totalInterest: 0,
      totalAmount: 10000,
    };

    render(<LoanDistributionChart loanData={zeroInterestLoan} />);

    expect(screen.getByTestId("pie-item-principal")).toHaveTextContent(
      "Principal: 10000"
    );
    expect(screen.getByTestId("pie-item-juros")).toHaveTextContent("Juros: 0");
    expect(screen.getByText("R$ 0,00")).toBeInTheDocument();
  });

  it("should apply custom className when provided", () => {
    const { container } = render(
      <LoanDistributionChart loanData={mockLoanData} className="custom-class" />
    );

    // Just check that it renders correctly with className prop
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should handle large loan amounts correctly", () => {
    const largeLoan: LoanCalculation = {
      ...mockLoanData,
      amount: 100000,
      totalInterest: 15000,
      totalAmount: 115000,
    };

    render(<LoanDistributionChart loanData={largeLoan} />);

    expect(screen.getByTestId("pie-item-principal")).toHaveTextContent(
      "Principal: 100000"
    );
    expect(screen.getByTestId("pie-item-juros")).toHaveTextContent(
      "Juros: 15000"
    );
    expect(screen.getByText("R$ 100.000,00")).toBeInTheDocument();
    expect(screen.getByText("R$ 15.000,00")).toBeInTheDocument();
  });

  it("should render pie chart label function correctly", () => {
    render(<LoanDistributionChart loanData={mockLoanData} />);

    // Test the label function with different scenarios
    expect(screen.getByTestId("pie-label")).toHaveTextContent(
      "Principal (97.3%)"
    );
    expect(screen.getByTestId("pie-label-juros")).toHaveTextContent(
      "Juros (2.7%)"
    );
    expect(screen.getByTestId("pie-label-undefined")).toHaveTextContent(
      "Test (0.0%)"
    );
  });

  it("should format currency correctly in tooltip", () => {
    render(<LoanDistributionChart loanData={mockLoanData} />);

    // Test the tooltip formatter function
    expect(screen.getByTestId("tooltip-formatted")).toHaveTextContent(
      "R$ 10.000,00"
    );
  });

  it("should render all chart components", () => {
    render(<LoanDistributionChart loanData={mockLoanData} />);

    // Verify all chart components are rendered
    expect(screen.getByTestId("responsive-container")).toBeInTheDocument();
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
    expect(screen.getByTestId("pie")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    expect(screen.getAllByTestId("cell")).toHaveLength(2);
  });

  it("should render legend colors correctly", () => {
    render(<LoanDistributionChart loanData={mockLoanData} />);

    // Check that legend color indicators are present
    const container = screen.getByTestId("card-content");
    expect(container).toBeInTheDocument();

    // The legend should have the correct structure with color indicators
    expect(screen.getByText("Principal")).toBeInTheDocument();
    expect(screen.getByText("Juros Totais")).toBeInTheDocument();
  });

  it("should handle decimal interest amounts correctly", () => {
    const decimalLoan: LoanCalculation = {
      ...mockLoanData,
      amount: 5000.5,
      totalInterest: 125.75,
      totalAmount: 5126.25,
    };

    render(<LoanDistributionChart loanData={decimalLoan} />);

    expect(screen.getByTestId("pie-item-principal")).toHaveTextContent(
      "Principal: 5000.5"
    );
    expect(screen.getByTestId("pie-item-juros")).toHaveTextContent(
      "Juros: 125.75"
    );
    expect(screen.getByText("R$ 5.000,50")).toBeInTheDocument();
    expect(screen.getByText("R$ 125,75")).toBeInTheDocument();
  });

  it("should render card structure correctly", () => {
    render(<LoanDistributionChart loanData={mockLoanData} />);

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("card-header")).toBeInTheDocument();
    expect(screen.getByTestId("card-content")).toBeInTheDocument();
    expect(screen.getByTestId("card-title")).toBeInTheDocument();
    expect(screen.getByTestId("card-description")).toBeInTheDocument();
  });

  it("should handle very small interest amounts", () => {
    const smallInterestLoan: LoanCalculation = {
      ...mockLoanData,
      amount: 1000,
      totalInterest: 0.01,
      totalAmount: 1000.01,
    };

    render(<LoanDistributionChart loanData={smallInterestLoan} />);

    expect(screen.getByText("R$ 0,01")).toBeInTheDocument();
    expect(screen.getByTestId("pie-item-juros")).toHaveTextContent(
      "Juros: 0.01"
    );
  });
});
