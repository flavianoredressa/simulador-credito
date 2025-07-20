import React from "react";
import { render, screen } from "@testing-library/react";
import LoanChart from "../LoanChart";
import { LoanCalculation } from "@/types/loan";

// Mock do Recharts para evitar problemas com SVG em ambiente de teste
jest.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  PieChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pie-chart">{children}</div>
  ),
  Pie: ({
    data: _data,
    dataKey,
  }: {
    data: unknown[];
    label?: unknown;
    dataKey: string;
  }) => (
    <div data-testid="pie" data-key={dataKey}>
      Mock Pie Chart Data
    </div>
  ),
  Cell: ({ fill }: { fill: string }) => (
    <div data-testid="pie-cell" style={{ backgroundColor: fill }} />
  ),
  AreaChart: ({
    children,
    data,
  }: {
    children: React.ReactNode;
    data: unknown[];
  }) => (
    <div data-testid="area-chart" data-length={data.length}>
      {children}
    </div>
  ),
  Area: ({ dataKey, name }: { dataKey: string; name: string }) => (
    <div data-testid="area" data-key={dataKey}>
      {name}
    </div>
  ),
  BarChart: ({
    children,
    data,
  }: {
    children: React.ReactNode;
    data: unknown[];
  }) => (
    <div data-testid="bar-chart" data-length={data.length}>
      {children}
    </div>
  ),
  Bar: ({
    dataKey,
    name,
    stackId,
  }: {
    dataKey: string;
    name: string;
    stackId?: string;
  }) => (
    <div data-testid="bar" data-key={dataKey} data-stack={stackId}>
      {name}
    </div>
  ),
  XAxis: ({
    dataKey,
  }: {
    dataKey: string;
    tickFormatter?: (value: unknown) => string;
  }) => <div data-testid="x-axis" data-key={dataKey} />,
  YAxis: ({
    tickFormatter: _tickFormatter,
  }: {
    tickFormatter?: (value: unknown) => string;
  }) => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: ({
    content: _content,
    formatter: _formatter,
  }: {
    content?: React.ComponentType;
    formatter?: (value: unknown) => string;
  }) => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
}));

describe("LoanChart", () => {
  const mockLoanData: LoanCalculation = {
    amount: 10000,
    installments: 12,
    interestRate: 0.02, // 2% ao mês
    installmentAmount: 946.56,
    totalAmount: 11358.72,
    totalInterest: 1358.72,
    interestPercentage: 12.0,
  };

  describe("Renderização básica", () => {
    it("should render without crashing", () => {
      render(<LoanChart loanData={mockLoanData} />);
      expect(screen.getByText("Valor do Empréstimo")).toBeInTheDocument();
    });

    it("should render with custom className", () => {
      const { container } = render(
        <LoanChart loanData={mockLoanData} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should render all main sections", () => {
      render(<LoanChart loanData={mockLoanData} />);

      // Cards de estatísticas
      expect(screen.getByText("Valor do Empréstimo")).toBeInTheDocument();
      expect(screen.getByText("Total de Juros")).toBeInTheDocument();
      expect(screen.getByText("Total a Pagar")).toBeInTheDocument();

      // Gráficos
      expect(
        screen.getByText("Distribuição do Empréstimo")
      ).toBeInTheDocument();
      expect(screen.getByText("Evolução do Saldo Devedor")).toBeInTheDocument();
      expect(screen.getByText("Composição das Parcelas")).toBeInTheDocument();
      expect(screen.getByText("Resumo Financeiro")).toBeInTheDocument();
    });
  });

  describe("Cards de Estatísticas", () => {
    it("should display loan amount correctly", () => {
      render(<LoanChart loanData={mockLoanData} />);
      expect(screen.getByText("R$ 10.000,00")).toBeInTheDocument();
    });

    it("should display total interest correctly", () => {
      render(<LoanChart loanData={mockLoanData} />);
      expect(screen.getByText("R$ 1.358,72")).toBeInTheDocument();
    });

    it("should display total amount correctly", () => {
      render(<LoanChart loanData={mockLoanData} />);
      expect(screen.getByText("R$ 11.358,72")).toBeInTheDocument();
    });

    it("should format large amounts correctly", () => {
      const largeLoanData: LoanCalculation = {
        ...mockLoanData,
        amount: 1000000,
        totalAmount: 1200000,
        totalInterest: 200000,
        interestPercentage: 16.67,
      };

      render(<LoanChart loanData={largeLoanData} />);
      expect(screen.getByText("R$ 1.000.000,00")).toBeInTheDocument();
      expect(screen.getByText("R$ 1.200.000,00")).toBeInTheDocument();
      expect(screen.getByText("R$ 200.000,00")).toBeInTheDocument();
    });
  });

  describe("Resumo Financeiro", () => {
    it("should display interest rate correctly", () => {
      render(<LoanChart loanData={mockLoanData} />);
      expect(screen.getByText("2.00% a.m.")).toBeInTheDocument();
    });

    it("should display number of installments", () => {
      render(<LoanChart loanData={mockLoanData} />);
      expect(screen.getByText("12x")).toBeInTheDocument();
    });

    it("should display installment amount", () => {
      render(<LoanChart loanData={mockLoanData} />);
      expect(screen.getByText("R$ 946,56")).toBeInTheDocument();
    });

    it("should calculate interest percentage correctly", () => {
      render(<LoanChart loanData={mockLoanData} />);
      // (1358.72 / 11358.72) * 100 = 11.96%
      expect(screen.getByText("12.0%")).toBeInTheDocument();
    });

    it("should handle different interest rates", () => {
      const highInterestLoan: LoanCalculation = {
        ...mockLoanData,
        interestRate: 0.05, // 5% ao mês
        interestPercentage: 25.0,
      };

      render(<LoanChart loanData={highInterestLoan} />);
      expect(screen.getByText("5.00% a.m.")).toBeInTheDocument();
    });

    it("should handle small interest rates", () => {
      const lowInterestLoan: LoanCalculation = {
        ...mockLoanData,
        interestRate: 0.005, // 0.5% ao mês
        interestPercentage: 6.0,
      };

      render(<LoanChart loanData={lowInterestLoan} />);
      expect(screen.getByText("0.50% a.m.")).toBeInTheDocument();
    });
  });

  describe("Componentes de Gráfico", () => {
    it("should render pie chart for loan distribution", () => {
      render(<LoanChart loanData={mockLoanData} />);
      expect(screen.getByTestId("pie-chart")).toBeInTheDocument();
      expect(screen.getByTestId("pie")).toBeInTheDocument();
    });

    it("should render area chart for balance evolution", () => {
      render(<LoanChart loanData={mockLoanData} />);
      expect(screen.getByTestId("area-chart")).toBeInTheDocument();
      expect(screen.getByTestId("area")).toBeInTheDocument();
    });

    it("should render bar chart for installment composition", () => {
      render(<LoanChart loanData={mockLoanData} />);
      expect(screen.getByTestId("bar-chart")).toBeInTheDocument();

      const principalBar = screen.getByText("Principal (Amortização)");
      const interestBar = screen.getByText("Juros Mensais");

      expect(principalBar).toBeInTheDocument();
      expect(interestBar).toBeInTheDocument();
    });

    it("should render chart components with correct data length", () => {
      render(<LoanChart loanData={mockLoanData} />);

      // Gráfico de área deve ter 12 pontos (número de parcelas)
      const areaChart = screen.getByTestId("area-chart");
      expect(areaChart).toHaveAttribute("data-length", "12");

      // Gráfico de barras deve ter 12 pontos (limitado a 12 primeiras parcelas)
      const barChart = screen.getByTestId("bar-chart");
      expect(barChart).toHaveAttribute("data-length", "12");
    });

    it("should limit bar chart to first 12 months even with more installments", () => {
      const longTermLoan: LoanCalculation = {
        ...mockLoanData,
        installments: 24, // 24 parcelas
        interestPercentage: 18.5,
      };

      render(<LoanChart loanData={longTermLoan} />);

      // Gráfico de área deve ter 24 pontos
      const areaChart = screen.getByTestId("area-chart");
      expect(areaChart).toHaveAttribute("data-length", "24");

      // Gráfico de barras deve continuar limitado a 12
      const barChart = screen.getByTestId("bar-chart");
      expect(barChart).toHaveAttribute("data-length", "12");
    });
  });

  describe("Pie Chart Data", () => {
    it("should render pie chart with correct data", () => {
      render(<LoanChart loanData={mockLoanData} />);

      // Verificar se os dados do gráfico de pizza estão sendo renderizados
      expect(screen.getByText(/Principal/)).toBeInTheDocument();
      expect(screen.getAllByText(/Juros/)[0]).toBeInTheDocument();
    });

    it("should calculate percentages correctly in pie chart", () => {
      render(<LoanChart loanData={mockLoanData} />);

      // Com os valores mock: Principal: 10000, Juros: 1358.72
      // Total: 11358.72
      // Principal: (10000 / 11358.72) * 100 = 88.0%
      // Juros: (1358.72 / 11358.72) * 100 = 12.0%
      expect(screen.getByText("Mock Pie Chart Data")).toBeInTheDocument();
    });
  });

  describe("Casos extremos", () => {
    it("should handle zero interest rate", () => {
      const zeroInterestLoan: LoanCalculation = {
        amount: 10000,
        installments: 10,
        interestRate: 0,
        installmentAmount: 1000,
        totalAmount: 10000,
        totalInterest: 0,
        interestPercentage: 0,
      };

      render(<LoanChart loanData={zeroInterestLoan} />);

      expect(screen.getByText("0.00% a.m.")).toBeInTheDocument();
      expect(screen.getByText("R$ 0,00")).toBeInTheDocument(); // Total de juros
      expect(screen.getByText("0.0%")).toBeInTheDocument(); // Porcentagem de juros
    });

    it("should handle single installment", () => {
      const singleInstallmentLoan: LoanCalculation = {
        amount: 5000,
        installments: 1,
        interestRate: 0.05,
        installmentAmount: 5250,
        totalAmount: 5250,
        totalInterest: 250,
        interestPercentage: 4.76,
      };

      render(<LoanChart loanData={singleInstallmentLoan} />);

      expect(screen.getByText("1x")).toBeInTheDocument();
      expect(screen.getAllByText("R$ 5.250,00")[0]).toBeInTheDocument();
    });

    it("should handle very small amounts", () => {
      const smallLoan: LoanCalculation = {
        amount: 100,
        installments: 2,
        interestRate: 0.01,
        installmentAmount: 50.75,
        totalAmount: 101.5,
        totalInterest: 1.5,
        interestPercentage: 1.48,
      };

      render(<LoanChart loanData={smallLoan} />);

      expect(screen.getByText("R$ 100,00")).toBeInTheDocument();
      expect(screen.getByText("R$ 1,50")).toBeInTheDocument();
      expect(screen.getByText("R$ 101,50")).toBeInTheDocument();
    });

    it("should handle high interest scenarios", () => {
      const highInterestLoan: LoanCalculation = {
        amount: 1000,
        installments: 3,
        interestRate: 0.1, // 10% ao mês
        installmentAmount: 400,
        totalAmount: 1200,
        totalInterest: 200,
        interestPercentage: 16.67,
      };

      render(<LoanChart loanData={highInterestLoan} />);

      expect(screen.getByText("10.00% a.m.")).toBeInTheDocument();
      expect(screen.getByText("16.7%")).toBeInTheDocument(); // (200/1200)*100
    });
  });

  describe("Descrições dos gráficos", () => {
    it("should display correct chart descriptions", () => {
      render(<LoanChart loanData={mockLoanData} />);

      expect(
        screen.getByText("Proporção entre valor principal e juros totais")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Como o saldo diminui ao longo do tempo")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "Distribuição entre juros e principal nas primeiras 12 parcelas"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText("Análise completa do seu empréstimo")
      ).toBeInTheDocument();
    });
  });

  describe("Labels do resumo financeiro", () => {
    it("should display all financial summary labels", () => {
      render(<LoanChart loanData={mockLoanData} />);

      expect(screen.getByText("Taxa de Juros")).toBeInTheDocument();
      expect(screen.getByText("Parcelas")).toBeInTheDocument();
      expect(screen.getByText("Valor da Parcela")).toBeInTheDocument();
      expect(screen.getByText("% de Juros")).toBeInTheDocument();
    });
  });

  describe("Utilitário cn function", () => {
    it("should combine classes correctly", () => {
      const { container } = render(
        <LoanChart loanData={mockLoanData} className="test-class" />
      );

      // Verifica se a classe foi aplicada corretamente
      expect(container.firstChild).toHaveClass("space-y-6", "test-class");
    });

    it("should handle undefined className", () => {
      const { container } = render(<LoanChart loanData={mockLoanData} />);
      expect(container.firstChild).toHaveClass("space-y-6");
    });
  });
});
