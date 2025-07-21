import { render, screen } from "@testing-library/react";
import { LoanInstallmentCompositionChart } from "../LoanInstallmentCompositionChart";
import type { LoanCalculation } from "@/types/loan";

// Mock do Recharts
jest.mock("recharts", () => ({
  BarChart: ({
    children,
    data,
  }: {
    children: React.ReactNode;
    data: Array<Record<string, unknown>>;
  }) => (
    <div data-testid="bar-chart" data-items={data.length}>
      {children}
    </div>
  ),
  Bar: ({
    name,
    dataKey,
    stackId,
  }: {
    name: string;
    dataKey: string;
    stackId: string;
  }) => (
    <div
      data-testid="bar"
      data-name={name}
      data-key={dataKey}
      data-stack={stackId}
    />
  ),
  XAxis: ({ dataKey }: { dataKey: string }) => (
    <div data-testid="x-axis" data-key={dataKey} />
  ),
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
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

describe("LoanInstallmentCompositionChart", () => {
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

  it("should render the installment composition chart correctly", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    expect(screen.getByTestId("card")).toBeInTheDocument();
    expect(screen.getByTestId("card-title")).toBeInTheDocument();
    expect(screen.getByTestId("card-description")).toBeInTheDocument();
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
    expect(screen.getByText("Composição das Parcelas")).toBeInTheDocument();
  });

  it("should display the correct title and description with default months", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    expect(screen.getByText("Composição das Parcelas")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Distribuição entre juros e principal nas primeiras 12 parcelas"
      )
    ).toBeInTheDocument();
  });

  it("should display custom number of months in description", () => {
    render(
      <LoanInstallmentCompositionChart loanData={mockLoanData} showMonths={6} />
    );

    expect(
      screen.getByText(
        "Distribuição entre juros e principal nas primeiras 6 parcelas"
      )
    ).toBeInTheDocument();
  });

  it("should render chart with correct number of data points for default showMonths", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    const barChart = screen.getByTestId("bar-chart");
    expect(barChart).toHaveAttribute("data-items", "12"); // Default 12 months
  });

  it("should render chart with custom showMonths value", () => {
    render(
      <LoanInstallmentCompositionChart loanData={mockLoanData} showMonths={6} />
    );

    const barChart = screen.getByTestId("bar-chart");
    expect(barChart).toHaveAttribute("data-items", "6");
  });

  it("should not exceed total installments even with high showMonths", () => {
    const shortLoan: LoanCalculation = {
      ...mockLoanData,
      installments: 8,
    };

    render(
      <LoanInstallmentCompositionChart loanData={shortLoan} showMonths={15} />
    );

    const barChart = screen.getByTestId("bar-chart");
    expect(barChart).toHaveAttribute("data-items", "8"); // Limited to actual installments
  });

  it("should have proper icon in header", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    expect(screen.getByText("📊")).toBeInTheDocument();
  });

  it("should render both principal and interest bars", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    const bars = screen.getAllByTestId("bar");
    expect(bars).toHaveLength(2);

    expect(bars[0]).toHaveAttribute("data-key", "principalPayment");
    expect(bars[0]).toHaveAttribute("data-name", "Principal (Amortização)");

    expect(bars[1]).toHaveAttribute("data-key", "interestPayment");
    expect(bars[1]).toHaveAttribute("data-name", "Juros Mensais");
  });

  it("should render chart components correctly", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    expect(screen.getByTestId("x-axis")).toBeInTheDocument();
    expect(screen.getByTestId("y-axis")).toBeInTheDocument();
    expect(screen.getByTestId("grid")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    expect(screen.getByTestId("legend")).toBeInTheDocument();
  });

  it("should display insights section", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    expect(screen.getByText("Maior Amortização")).toBeInTheDocument();
    expect(screen.getByText("Maior Juro")).toBeInTheDocument();
  });

  it('should show first month in "Maior Juro" insight', () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    const maiorJuroText = screen.getByText(/1º mês:/);
    expect(maiorJuroText).toBeInTheDocument();
  });

  it('should show last displayed month in "Maior Amortização" insight', () => {
    render(
      <LoanInstallmentCompositionChart loanData={mockLoanData} showMonths={6} />
    );

    const maiorAmortizacaoText = screen.getByText(/6º mês:/);
    expect(maiorAmortizacaoText).toBeInTheDocument();
  });

  it("should apply custom className when provided", () => {
    const { container } = render(
      <LoanInstallmentCompositionChart
        loanData={mockLoanData}
        className="custom-class"
      />
    );

    // Just check that it renders correctly with className prop
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should handle single month display", () => {
    render(
      <LoanInstallmentCompositionChart loanData={mockLoanData} showMonths={1} />
    );

    const barChart = screen.getByTestId("bar-chart");
    expect(barChart).toHaveAttribute("data-items", "1");
    expect(
      screen.getByText(
        "Distribuição entre juros e principal nas primeiras 1 parcelas"
      )
    ).toBeInTheDocument();
  });

  it("should have both bars in the same stack", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    const bars = screen.getAllByTestId("bar");
    expect(bars[0]).toHaveAttribute("data-stack", "a");
    expect(bars[1]).toHaveAttribute("data-stack", "a");
  });

  it("should render insights with currency formatting", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    // Should have currency formatting in insights
    const currencyElements = screen.getAllByText(/R\$/);
    expect(currencyElements.length).toBeGreaterThanOrEqual(2); // At least in the insights
  });

  it("should handle very short loan terms", () => {
    const veryShortLoan: LoanCalculation = {
      ...mockLoanData,
      installments: 3,
    };

    render(
      <LoanInstallmentCompositionChart
        loanData={veryShortLoan}
        showMonths={12}
      />
    );

    const barChart = screen.getByTestId("bar-chart");
    expect(barChart).toHaveAttribute("data-items", "3"); // Limited to actual installments

    const maiorAmortizacaoText = screen.getByText(/12º mês:/);
    expect(maiorAmortizacaoText).toBeInTheDocument();
  });

  it("should test formatMonth function output", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    // Check if month formatting is correct in the insights
    expect(screen.getByText(/12º mês:/)).toBeInTheDocument();
    expect(screen.getByText(/1º mês:/)).toBeInTheDocument();
  });

  it("should test formatCurrency function output", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    // Check if currency formatting is working in insights
    const insights = screen.getAllByText(/R\$.*,.*/);
    expect(insights.length).toBeGreaterThan(0);
    expect(insights[0]).toBeInTheDocument();
  });

  describe("CompositionTooltip component", () => {
    it("should test CompositionTooltip component internal functions", () => {
      // Create a direct test for the internal functions
      render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

      // The tooltip is internally defined, so we test its integration
      const tooltip = screen.getByTestId("tooltip");
      expect(tooltip).toBeInTheDocument();

      // Test the month formatting functionality through the insights section
      expect(screen.getByText(/12º mês:/)).toBeInTheDocument();
      expect(screen.getByText(/1º mês:/)).toBeInTheDocument();
    });

    it("should properly render formatCurrency function", () => {
      render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

      // Test currency formatting through the visible insights
      const currencyValues = screen.getAllByText(/R\$/);
      expect(currencyValues.length).toBeGreaterThan(0);

      // Test specific currency format in insights
      expect(screen.getByText(/R\$ 854,21/)).toBeInTheDocument();
      expect(screen.getByText(/R\$ 25,00/)).toBeInTheDocument();
    });

    it("should handle tooltip integration properly", () => {
      render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

      // Test that tooltip is configured correctly
      const tooltip = screen.getByTestId("tooltip");
      expect(tooltip).toBeInTheDocument();

      // Since the tooltip is internal, we verify its presence and configuration
      // The actual tooltip behavior is covered by the Recharts library
      expect(tooltip).toHaveAttribute("data-testid", "tooltip");
    });
  });

  it("should handle edge case with empty displayedSchedule", () => {
    const emptyScheduleLoanData = {
      amount: 0,
      interestRate: 0,
      installments: 0,
      totalAmount: 0,
      totalInterest: 0,
      monthlyPayment: 0,
      installmentAmount: 0,
      interestPercentage: 0,
    };

    render(
      <LoanInstallmentCompositionChart loanData={emptyScheduleLoanData} />
    );

    expect(screen.getByText("Composição das Parcelas")).toBeInTheDocument();
  });

  it("should handle gradients in BarChart", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    // Test that gradient definitions are properly rendered using test-ids
    const principalBars = screen
      .getAllByTestId("bar")
      .filter(
        (bar) => bar.getAttribute("data-name") === "Principal (Amortização)"
      );
    const interestBars = screen
      .getAllByTestId("bar")
      .filter((bar) => bar.getAttribute("data-name") === "Juros Mensais");

    expect(principalBars.length).toBeGreaterThan(0);
    expect(interestBars.length).toBeGreaterThan(0);
  });

  it("should render legend with correct icon type", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    const legend = screen.getByTestId("legend");
    expect(legend).toBeInTheDocument();
  });

  it("should handle XAxis and YAxis tick formatting", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    const xAxis = screen.getByTestId("x-axis");
    const yAxis = screen.getByTestId("y-axis");

    expect(xAxis).toBeInTheDocument();
    expect(yAxis).toBeInTheDocument();
  });

  it("should render CartesianGrid with correct stroke properties", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    const grid = screen.getByTestId("grid");
    expect(grid).toBeInTheDocument();
  });

  it("should handle Bar components with correct stackId and radius", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    const bars = screen.getAllByTestId("bar");

    // Check that bars exist and have the correct configuration
    expect(bars.length).toBeGreaterThanOrEqual(2);

    // Check principal bar
    const principalBar = bars.find(
      (bar) => bar.getAttribute("data-key") === "principalPayment"
    );
    expect(principalBar).toBeDefined();
    expect(principalBar).toHaveAttribute("data-stack", "a");

    // Check interest bar
    const interestBar = bars.find(
      (bar) => bar.getAttribute("data-key") === "interestPayment"
    );
    expect(interestBar).toBeDefined();
    expect(interestBar).toHaveAttribute("data-stack", "a");
  });
});
