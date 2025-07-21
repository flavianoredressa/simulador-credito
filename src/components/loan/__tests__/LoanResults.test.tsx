import { render, screen } from "@testing-library/react";
import { LoanResults } from "../LoanResults";
import { calculateLoan } from "@/lib/calculations";

describe("LoanResults Component", () => {
  const mockCalculation = calculateLoan({
    amount: 10000,
    installments: 12,
    interestRate: 2,
  });

  it("should render loan results correctly", () => {
    render(<LoanResults calculation={mockCalculation} />);

    // Check if main title is present
    expect(screen.getByText("Resultado da Simulação")).toBeTruthy();

    // Check if loan amount is displayed
    expect(screen.getByText("Valor do empréstimo:")).toBeTruthy();

    // Check if installment value is displayed
    expect(screen.getByText("Parcela mensal:")).toBeTruthy();

    // Check if total interest is displayed
    expect(screen.getByText("Total de juros:")).toBeTruthy();

    // Check if total amount is displayed
    expect(screen.getByText("Total a pagar:")).toBeTruthy();

    // Check if interest rate is displayed
    expect(screen.getByText("Taxa de juros (ano):")).toBeTruthy();

    // Check if installments count is displayed
    expect(screen.getByText("Prazo:")).toBeTruthy();
  });

  it("should display formatted currency values", () => {
    render(<LoanResults calculation={mockCalculation} />);

    // The loan amount should be displayed
    expect(screen.getByText("R$ 10.000,00")).toBeTruthy();

    // The installment amount should be displayed (we'll check for existence rather than exact format)
    const installmentElements = screen.getAllByText(/R\$/);
    expect(installmentElements.length).toBeGreaterThan(0);
  });

  it("should display summary information", () => {
    render(<LoanResults calculation={mockCalculation} />);

    // Check if installments count is displayed
    expect(screen.getByText("12 meses")).toBeTruthy();

    // Check if interest rate is displayed (it should be monthly rate formatted as percentage)
    const interestElements = screen.getAllByText(/%/);
    expect(interestElements.length).toBeGreaterThan(0);
  });

  it("should display important notice", () => {
    render(<LoanResults calculation={mockCalculation} />);

    // Check if important notice is displayed
    expect(screen.getByText("Importante:")).toBeTruthy();
    expect(
      screen.getByText(/Esta simulação é apenas uma estimativa/)
    ).toBeTruthy();
  });

  it("should handle different calculation values", () => {
    const customCalculation = calculateLoan({
      amount: 5000,
      installments: 6,
      interestRate: 1.5,
    });

    render(<LoanResults calculation={customCalculation} />);

    // Check if different values are displayed
    expect(screen.getByText("R$ 5.000,00")).toBeTruthy();
    expect(screen.getByText("6 meses")).toBeTruthy();
  });

  it("should have proper structure", () => {
    const { container } = render(<LoanResults calculation={mockCalculation} />);

    // Check if the component has the expected structure
    expect(container.querySelector(".bg-blue-50")).toBeTruthy(); // installment card highlight
    expect(container.querySelector(".bg-yellow-50")).toBeTruthy(); // important notice
  });

  it("should handle zero interest calculation", () => {
    const zeroInterestCalculation = calculateLoan({
      amount: 10000,
      installments: 10,
      interestRate: 0,
    });

    render(<LoanResults calculation={zeroInterestCalculation} />);

    // Should still display all fields properly
    const amountElements = screen.getAllByText("R$ 10.000,00");
    expect(amountElements.length).toBeGreaterThanOrEqual(1); // Can appear multiple times (amount and total)
    expect(screen.getByText("10 meses")).toBeTruthy();
    expect(screen.getByText("R$ 0,00")).toBeTruthy(); // Zero interest
    expect(screen.getByText("0.00%")).toBeTruthy(); // Zero interest rate
  });
});
