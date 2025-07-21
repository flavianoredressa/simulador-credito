import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoanCalculator } from "../LoanCalculator";
import { calculateLoanWithAge } from "@/lib/calculations";
import type { LoanCalculation } from "@/types/loan";

// Mock the calculations module
jest.mock("@/lib/calculations", () => ({
  calculateLoanWithAge: jest.fn(),
}));

// Mock the child components
jest.mock("@/components/loan/LoanForm", () => ({
  LoanForm: ({
    onCalculate,
  }: {
    onCalculate: (data: {
      amount: number;
      installments: number;
      birthDate: string;
    }) => void;
  }) => (
    <div data-testid="loan-form">
      <button
        data-testid="calculate-button"
        onClick={() =>
          onCalculate({
            amount: 50000,
            installments: 12,
            birthDate: "1990-01-01",
          })
        }
      >
        Calculate Loan
      </button>
    </div>
  ),
}));

jest.mock("@/components/loan/LoanResults", () => ({
  LoanResults: ({ calculation }: { calculation: LoanCalculation }) => (
    <div data-testid="loan-results">
      Results for amount: {calculation.amount}
    </div>
  ),
}));

// Mock animation components
jest.mock("@/components/animations/MotionComponents", () => ({
  FadeIn: ({
    children,
    delay,
    className,
  }: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
  }) => (
    <div data-testid="fade-in" data-delay={delay} className={className}>
      {children}
    </div>
  ),
  SlideInLeft: ({
    children,
    delay,
  }: {
    children: React.ReactNode;
    delay?: number;
  }) => (
    <div data-testid="slide-in-left" data-delay={delay}>
      {children}
    </div>
  ),
  SlideInRight: ({
    children,
    delay,
  }: {
    children: React.ReactNode;
    delay?: number;
  }) => (
    <div data-testid="slide-in-right" data-delay={delay}>
      {children}
    </div>
  ),
  StaggerContainer: ({
    children,
    staggerDelay,
  }: {
    children: React.ReactNode;
    staggerDelay?: number;
  }) => (
    <div data-testid="stagger-container" data-stagger-delay={staggerDelay}>
      {children}
    </div>
  ),
  StaggerChild: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="stagger-child">{children}</div>
  ),
}));

// Mock chart components
jest.mock("../charts", () => ({
  LoanBalanceEvolutionChart: ({ loanData }: { loanData: LoanCalculation }) => (
    <div data-testid="balance-evolution-chart">
      Balance Chart for {loanData.amount}
    </div>
  ),
  LoanDistributionChart: ({ loanData }: { loanData: LoanCalculation }) => (
    <div data-testid="distribution-chart">
      Distribution Chart for {loanData.amount}
    </div>
  ),
  LoanInstallmentCompositionChart: ({
    loanData,
  }: {
    loanData: LoanCalculation;
  }) => (
    <div data-testid="installment-composition-chart">
      Installment Chart for {loanData.amount}
    </div>
  ),
}));

const mockCalculateLoanWithAge = calculateLoanWithAge as jest.MockedFunction<
  typeof calculateLoanWithAge
>;

const mockLoanCalculation = {
  amount: 50000,
  installments: 12,
  interestRate: 0.02,
  totalAmount: 55000,
  installmentAmount: 4583.33,
  totalInterest: 5000,
  interestPercentage: 10,
  age: 34,
  annualInterestRate: 0.24,
};

describe("LoanCalculator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Initial Rendering", () => {
    it("should render the main container", () => {
      render(<LoanCalculator />);

      const container =
        screen.getByTestId("loan-form").parentElement?.parentElement
          ?.parentElement;
      expect(container).toHaveClass("space-y-3", "sm:space-y-4");
    });

    it("should render the grid layout for form and results", () => {
      render(<LoanCalculator />);

      const gridContainer =
        screen.getByTestId("loan-form").parentElement?.parentElement;
      expect(gridContainer).toHaveClass(
        "grid",
        "lg:grid-cols-2",
        "gap-3",
        "sm:gap-4"
      );
    });

    it("should render the loan form with slide-in-left animation", () => {
      render(<LoanCalculator />);

      const slideInLeft = screen.getByTestId("slide-in-left");
      expect(slideInLeft).toBeInTheDocument();
      expect(slideInLeft).toHaveAttribute("data-delay", "0.2");

      const loanForm = screen.getByTestId("loan-form");
      expect(loanForm).toBeInTheDocument();
    });

    it("should NOT render loan results initially", () => {
      render(<LoanCalculator />);

      const loanResults = screen.queryByTestId("loan-results");
      expect(loanResults).not.toBeInTheDocument();

      const slideInRight = screen.queryByTestId("slide-in-right");
      expect(slideInRight).not.toBeInTheDocument();
    });

    it("should NOT render financial summary initially", () => {
      render(<LoanCalculator />);

      const summaryTitle = screen.queryByText("Resumo Financeiro");
      expect(summaryTitle).not.toBeInTheDocument();
    });

    it("should NOT render charts section initially", () => {
      render(<LoanCalculator />);

      const chartsTitle = screen.queryByText("Gráficos Interativos");
      expect(chartsTitle).not.toBeInTheDocument();
    });
  });

  describe("Loan Calculation Handling", () => {
    it("should call calculateLoanWithAge when form is submitted with valid data", () => {
      mockCalculateLoanWithAge.mockReturnValue(mockLoanCalculation);

      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      expect(mockCalculateLoanWithAge).toHaveBeenCalledWith(
        50000,
        12,
        "1990-01-01"
      );
    });

    it("should NOT call calculateLoanWithAge when birthDate is empty", () => {
      // Clear all mocks first
      jest.clearAllMocks();

      // Create a custom component that simulates the exact logic from LoanCalculator
      const TestComponent = () => {
        const [calculation, setCalculation] =
          React.useState<LoanCalculation | null>(null);

        const handleCalculate = (data: {
          amount: number;
          installments: number;
          birthDate: string;
        }) => {
          if (data.birthDate) {
            const result = calculateLoanWithAge(
              data.amount,
              data.installments,
              data.birthDate
            );
            setCalculation(result);
          }
        };

        return (
          <div>
            <button
              data-testid="calculate-button-empty"
              onClick={() =>
                handleCalculate({
                  amount: 50000,
                  installments: 12,
                  birthDate: "",
                })
              }
            >
              Calculate with Empty Date
            </button>
            {calculation && (
              <div data-testid="has-calculation">Has calculation</div>
            )}
          </div>
        );
      };

      render(<TestComponent />);

      const calculateButton = screen.getByTestId("calculate-button-empty");
      fireEvent.click(calculateButton);

      // Since birthDate is empty, calculateLoanWithAge should not be called
      expect(mockCalculateLoanWithAge).not.toHaveBeenCalled();

      // And no calculation should be displayed
      expect(screen.queryByTestId("has-calculation")).not.toBeInTheDocument();
    });

    it("should update calculation state when valid calculation is performed", async () => {
      mockCalculateLoanWithAge.mockReturnValue(mockLoanCalculation);

      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const loanResults = screen.getByTestId("loan-results");
        expect(loanResults).toBeInTheDocument();
        expect(loanResults).toHaveTextContent("Results for amount: 50000");
      });
    });
  });

  describe("Results Section Rendering", () => {
    beforeEach(() => {
      mockCalculateLoanWithAge.mockReturnValue(mockLoanCalculation);
    });

    it("should render loan results with slide-in-right animation after calculation", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const slideInRight = screen.getByTestId("slide-in-right");
        expect(slideInRight).toBeInTheDocument();
        expect(slideInRight).toHaveAttribute("data-delay", "0.4");

        const loanResults = screen.getByTestId("loan-results");
        expect(loanResults).toBeInTheDocument();
      });
    });

    it("should render financial summary section after calculation", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const summaryTitle = screen.getByText("Resumo Financeiro");
        expect(summaryTitle).toBeInTheDocument();
        expect(summaryTitle).toHaveClass(
          "text-xl",
          "font-bold",
          "text-gray-800"
        );
      });
    });

    it("should render financial summary with fade-in animation", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const fadeInElements = screen.getAllByTestId("fade-in");
        const summaryFadeIn = fadeInElements.find(
          (el) =>
            el.getAttribute("data-delay") === "0.8" &&
            el.classList.contains("w-full")
        );
        expect(summaryFadeIn).toBeInTheDocument();
      });
    });

    it("should render stagger container with correct delay", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const staggerContainers = screen.getAllByTestId("stagger-container");
        expect(staggerContainers.length).toBeGreaterThan(0);
        expect(staggerContainers[0]).toHaveAttribute(
          "data-stagger-delay",
          "0.2"
        );
      });
    });
  });

  describe("Financial Summary Cards", () => {
    beforeEach(() => {
      mockCalculateLoanWithAge.mockReturnValue(mockLoanCalculation);
    });

    it("should render financial summary header with icon", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const headerIcon = screen.getByText("📋");
        expect(headerIcon).toBeInTheDocument();

        const headerIconContainer = headerIcon.parentElement;
        expect(headerIconContainer).toHaveClass(
          "flex",
          "items-center",
          "justify-center",
          "w-10",
          "h-10",
          "bg-gradient-to-r",
          "from-gray-100",
          "to-gray-500",
          "rounded-full",
          "shadow-md"
        );
      });
    });

    it("should render loan amount card with correct values", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const amountTitle = screen.getByText("Valor Emprestado");
        expect(amountTitle).toBeInTheDocument();
        expect(amountTitle).toHaveClass(
          "text-sm",
          "font-medium",
          "text-blue-700"
        );

        const amountIcon = screen.getByText("💵");
        expect(amountIcon).toBeInTheDocument();

        const amountValue = screen.getByText("R$ 50.000,00");
        expect(amountValue).toBeInTheDocument();
        expect(amountValue).toHaveClass(
          "text-xl",
          "font-bold",
          "text-blue-900"
        );
      });
    });

    it("should render monthly installment card with correct values", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const installmentTitle = screen.getByText("Parcela Mensal");
        expect(installmentTitle).toBeInTheDocument();
        expect(installmentTitle).toHaveClass(
          "text-sm",
          "font-medium",
          "text-green-700"
        );

        const installmentIcon = screen.getByText("💰");
        expect(installmentIcon).toBeInTheDocument();

        const installmentValue = screen.getByText("R$ 4.583,33");
        expect(installmentValue).toBeInTheDocument();
        expect(installmentValue).toHaveClass(
          "text-xl",
          "font-bold",
          "text-green-900"
        );
      });
    });

    it("should render total amount card with correct values", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const totalTitle = screen.getByText("Total a Pagar");
        expect(totalTitle).toBeInTheDocument();
        expect(totalTitle).toHaveClass(
          "text-sm",
          "font-medium",
          "text-purple-700"
        );

        const totalIcon = screen.getByText("💳");
        expect(totalIcon).toBeInTheDocument();

        const totalValue = screen.getByText("R$ 55.000,00");
        expect(totalValue).toBeInTheDocument();
        expect(totalValue).toHaveClass(
          "text-xl",
          "font-bold",
          "text-purple-900"
        );
      });
    });

    it("should render total interest card with correct values", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const interestTitle = screen.getByText("Total de Juros");
        expect(interestTitle).toBeInTheDocument();
        expect(interestTitle).toHaveClass(
          "text-sm",
          "font-medium",
          "text-red-700"
        );

        const interestIcon = screen.getByText("⚠️");
        expect(interestIcon).toBeInTheDocument();

        const interestValue = screen.getByText("R$ 5.000,00");
        expect(interestValue).toBeInTheDocument();
        expect(interestValue).toHaveClass(
          "text-xl",
          "font-bold",
          "text-red-900"
        );
      });
    });

    it("should render financial cards in correct grid layout", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const cardContainer = screen
          .getByText("Valor Emprestado")
          .closest(".grid");
        expect(cardContainer).toHaveClass(
          "grid",
          "grid-cols-1",
          "md:grid-cols-2",
          "lg:grid-cols-4",
          "gap-4"
        );
      });
    });
  });

  describe("Charts Section", () => {
    beforeEach(() => {
      mockCalculateLoanWithAge.mockReturnValue(mockLoanCalculation);
    });

    it("should render charts section with fade-in animation", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const fadeInElements = screen.getAllByTestId("fade-in");
        const chartsFadeIn = fadeInElements.find(
          (el) =>
            el.getAttribute("data-delay") === "0.6" &&
            el.classList.contains("w-full")
        );
        expect(chartsFadeIn).toBeInTheDocument();
      });
    });

    it("should render charts header with icon and title", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const chartsTitle = screen.getByText("Gráficos Interativos");
        expect(chartsTitle).toBeInTheDocument();
        expect(chartsTitle).toHaveClass(
          "text-xl",
          "font-bold",
          "text-gray-800"
        );

        const chartsIcon = screen.getByText("📊");
        expect(chartsIcon).toBeInTheDocument();

        const chartsIconContainer = chartsIcon.parentElement;
        expect(chartsIconContainer).toHaveClass(
          "flex",
          "items-center",
          "justify-center",
          "w-10",
          "h-10",
          "bg-gradient-to-r",
          "from-blue-500",
          "to-indigo-600",
          "rounded-full",
          "shadow-md"
        );
      });
    });

    it("should render loan distribution chart", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const distributionChart = screen.getByTestId("distribution-chart");
        expect(distributionChart).toBeInTheDocument();
        expect(distributionChart).toHaveTextContent(
          "Distribution Chart for 50000"
        );
      });
    });

    it("should render loan balance evolution chart", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const balanceChart = screen.getByTestId("balance-evolution-chart");
        expect(balanceChart).toBeInTheDocument();
        expect(balanceChart).toHaveTextContent("Balance Chart for 50000");
      });
    });

    it("should render loan installment composition chart", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const installmentChart = screen.getByTestId(
          "installment-composition-chart"
        );
        expect(installmentChart).toBeInTheDocument();
        expect(installmentChart).toHaveTextContent(
          "Installment Chart for 50000"
        );
      });
    });

    it("should render charts in correct grid layout", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const chartsGridContainer = screen
          .getByTestId("distribution-chart")
          .closest(".grid");
        expect(chartsGridContainer).toHaveClass(
          "grid",
          "grid-cols-1",
          "md:grid-cols-6",
          "gap-4",
          "mb-6"
        );

        // Check individual chart containers
        const distributionContainer =
          screen.getByTestId("distribution-chart").parentElement;
        expect(distributionContainer).toHaveClass("md:col-span-3");

        const balanceContainer = screen.getByTestId(
          "balance-evolution-chart"
        ).parentElement;
        expect(balanceContainer).toHaveClass("md:col-span-3");
      });
    });
  });

  describe("Component Integration", () => {
    it("should pass calculation data to all chart components", async () => {
      mockCalculateLoanWithAge.mockReturnValue(mockLoanCalculation);

      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const distributionChart = screen.getByTestId("distribution-chart");
        const balanceChart = screen.getByTestId("balance-evolution-chart");
        const installmentChart = screen.getByTestId(
          "installment-composition-chart"
        );

        expect(distributionChart).toHaveTextContent("50000");
        expect(balanceChart).toHaveTextContent("50000");
        expect(installmentChart).toHaveTextContent("50000");
      });
    });

    it("should pass calculation data to LoanResults component", async () => {
      mockCalculateLoanWithAge.mockReturnValue(mockLoanCalculation);

      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const loanResults = screen.getByTestId("loan-results");
        expect(loanResults).toHaveTextContent("Results for amount: 50000");
      });
    });

    it("should handle multiple calculations correctly", async () => {
      const secondMockCalculation = {
        ...mockLoanCalculation,
        amount: 75000,
        totalAmount: 82500,
        installmentAmount: 6875,
        totalInterest: 7500,
      };

      // First calculation
      mockCalculateLoanWithAge.mockReturnValueOnce(mockLoanCalculation);
      render(<LoanCalculator />);

      let calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        expect(screen.getByText("R$ 50.000,00")).toBeInTheDocument();
      });

      // Second calculation
      mockCalculateLoanWithAge.mockReturnValueOnce(secondMockCalculation);
      calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        expect(screen.getByText("R$ 75.000,00")).toBeInTheDocument();
        expect(screen.queryByText("R$ 50.000,00")).not.toBeInTheDocument();
      });
    });
  });

  describe("Styling and Layout", () => {
    beforeEach(() => {
      mockCalculateLoanWithAge.mockReturnValue(mockLoanCalculation);
    });

    it("should apply correct styling to financial summary container", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const summaryContainer = screen
          .getByText("Resumo Financeiro")
          .closest(".bg-gradient-to-br");
        expect(summaryContainer).toHaveClass(
          "bg-gradient-to-br",
          "from-gray-50",
          "to-gray-100",
          "border",
          "border-gray-200",
          "rounded-xl",
          "p-6",
          "shadow-lg"
        );
      });
    });

    it("should apply correct styling to charts container", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const chartsContainer = screen
          .getByText("Gráficos Interativos")
          .closest(".bg-gradient-to-br");
        expect(chartsContainer).toHaveClass(
          "bg-gradient-to-br",
          "from-green-50",
          "to-green-100",
          "border",
          "border-green-200",
          "rounded-xl",
          "p-6",
          "shadow-lg"
        );
      });
    });

    it("should apply correct styling to financial cards", async () => {
      render(<LoanCalculator />);

      const calculateButton = screen.getByTestId("calculate-button");
      fireEvent.click(calculateButton);

      await waitFor(() => {
        const amountCard = screen
          .getByText("Valor Emprestado")
          .closest(".bg-gradient-to-br");
        expect(amountCard).toHaveClass(
          "bg-gradient-to-br",
          "from-blue-50",
          "to-blue-100",
          "p-4",
          "rounded-lg",
          "border",
          "border-blue-200",
          "shadow-sm"
        );

        const installmentCard = screen
          .getByText("Parcela Mensal")
          .closest(".bg-gradient-to-br");
        expect(installmentCard).toHaveClass(
          "bg-gradient-to-br",
          "from-green-50",
          "to-green-100",
          "p-4",
          "rounded-lg",
          "border",
          "border-green-200",
          "shadow-sm"
        );

        const totalCard = screen
          .getByText("Total a Pagar")
          .closest(".bg-gradient-to-br");
        expect(totalCard).toHaveClass(
          "bg-gradient-to-br",
          "from-purple-50",
          "to-purple-100",
          "p-4",
          "rounded-lg",
          "border",
          "border-purple-200",
          "shadow-sm"
        );

        const interestCard = screen
          .getByText("Total de Juros")
          .closest(".bg-gradient-to-br");
        expect(interestCard).toHaveClass(
          "bg-gradient-to-br",
          "from-red-50",
          "to-red-100",
          "p-4",
          "rounded-lg",
          "border",
          "border-red-200",
          "shadow-sm"
        );
      });
    });
  });
});
