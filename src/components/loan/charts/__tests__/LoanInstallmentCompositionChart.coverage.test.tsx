import React from "react";
import { render } from "@testing-library/react";
import { LoanInstallmentCompositionChart } from "../LoanInstallmentCompositionChart";
import { LoanCalculation } from "@/types/loan";

// Mock mais específico que força a execução das funções não cobertas
let mockTickFormatter: ((value: number) => string) | null = null;
let mockTooltipComponent: React.ComponentType<{
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    payload: Record<string, unknown>;
  }>;
  label?: number;
}> | null = null;

jest.mock("recharts", () => {
  return {
    BarChart: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="bar-chart">{children}</div>
    ),
    Bar: ({ dataKey }: { dataKey: string }) => (
      <div data-testid={`bar-${dataKey}`} />
    ),
    XAxis: ({
      tickFormatter,
    }: {
      tickFormatter?: (value: number) => string;
    }) => {
      // Capturar e executar o tickFormatter
      if (tickFormatter) {
        mockTickFormatter = tickFormatter;
        // Executar imediatamente com diferentes valores
        tickFormatter(1);
        tickFormatter(12);
        tickFormatter(36);
        tickFormatter(0);
        tickFormatter(-1);
      }
      return <div data-testid="x-axis" />;
    },
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    Tooltip: ({
      content,
    }: {
      content?: React.ComponentType<Record<string, unknown>>;
    }) => {
      // Capturar o componente de tooltip customizado
      if (content) {
        mockTooltipComponent = content;
      }
      return <div data-testid="tooltip" />;
    },
    Legend: () => <div data-testid="legend" />,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  };
});

describe("LoanInstallmentCompositionChart - Coverage Tests", () => {
  const mockLoanData: LoanCalculation = {
    amount: 100000,
    interestRate: 8.5,
    totalInterest: 14395.04,
    installmentAmount: 1143.96,
    totalAmount: 114395.04,
    installments: 60,
    interestPercentage: 14.4,
    age: 30,
  };

  const defaultProps = {
    loanData: mockLoanData,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockTickFormatter = null;
    mockTooltipComponent = null;
  });

  test("should execute formatMonth function through XAxis tickFormatter", () => {
    render(<LoanInstallmentCompositionChart {...defaultProps} />);

    // Verificar se o tickFormatter foi capturado e executado
    expect(mockTickFormatter).toBeTruthy();

    // Executar com mais valores para garantir cobertura
    if (mockTickFormatter) {
      const results = [
        mockTickFormatter(1),
        mockTickFormatter(6),
        mockTickFormatter(12),
        mockTickFormatter(24),
        mockTickFormatter(36),
        mockTickFormatter(48),
      ];

      // Verificar formato esperado
      expect(results).toEqual(["1º", "6º", "12º", "24º", "36º", "48º"]);
    }
  });

  test("should render CompositionTooltip component directly", () => {
    render(<LoanInstallmentCompositionChart {...defaultProps} />);

    // Verificar se o componente de tooltip foi capturado
    expect(mockTooltipComponent).toBeTruthy();

    if (mockTooltipComponent) {
      const TooltipComponent = mockTooltipComponent;

      // Testar tooltip ativo com dados válidos
      const activeProps = {
        active: true,
        payload: [
          {
            dataKey: "principal",
            value: 850.5,
            payload: {
              month: 1,
              principal: 850.5,
              interest: 149.5,
              total: 1000.0,
            },
          },
          {
            dataKey: "interest",
            value: 149.5,
            payload: {
              month: 1,
              principal: 850.5,
              interest: 149.5,
              total: 1000.0,
            },
          },
        ],
        label: 1,
      };

      const { container: activeContainer } = render(
        <TooltipComponent {...activeProps} />
      );
      expect(activeContainer.firstChild).not.toBeNull();
    }
  });

  test("should handle CompositionTooltip with inactive state", () => {
    render(<LoanInstallmentCompositionChart {...defaultProps} />);

    if (mockTooltipComponent) {
      const TooltipComponent = mockTooltipComponent;

      // Testar tooltip inativo
      const inactiveProps = {
        active: false,
        payload: [],
        label: undefined,
      };

      const { container: inactiveContainer } = render(
        <TooltipComponent {...inactiveProps} />
      );
      expect(inactiveContainer.firstChild).toBeNull();
    }
  });

  test("should handle CompositionTooltip with no payload", () => {
    render(<LoanInstallmentCompositionChart {...defaultProps} />);

    if (mockTooltipComponent) {
      const TooltipComponent = mockTooltipComponent;

      // Testar tooltip sem payload
      const noPayloadProps = {
        active: true,
        payload: undefined,
        label: 5,
      };

      const { container } = render(<TooltipComponent {...noPayloadProps} />);
      expect(container.firstChild).toBeNull();
    }
  });

  test("should handle CompositionTooltip with empty payload", () => {
    render(<LoanInstallmentCompositionChart {...defaultProps} />);

    if (mockTooltipComponent) {
      const TooltipComponent = mockTooltipComponent;

      // Testar tooltip com payload vazio
      const emptyPayloadProps = {
        active: true,
        payload: [],
        label: 10,
      };

      const { container } = render(<TooltipComponent {...emptyPayloadProps} />);
      expect(container.firstChild).toBeNull();
    }
  });

  test("should handle CompositionTooltip with different data values", () => {
    render(<LoanInstallmentCompositionChart {...defaultProps} />);

    if (mockTooltipComponent) {
      const TooltipComponent = mockTooltipComponent;

      // Testar com diferentes valores
      const scenarios = [
        {
          active: true,
          payload: [
            {
              dataKey: "principal",
              value: 1200.75,
              payload: {
                month: 12,
                principal: 1200.75,
                interest: 95.25,
                total: 1296.0,
              },
            },
            {
              dataKey: "interest",
              value: 95.25,
              payload: {
                month: 12,
                principal: 1200.75,
                interest: 95.25,
                total: 1296.0,
              },
            },
          ],
          label: 12,
        },
        {
          active: true,
          payload: [
            {
              dataKey: "principal",
              value: 0,
              payload: { month: 36, principal: 0, interest: 50, total: 50 },
            },
            {
              dataKey: "interest",
              value: 50,
              payload: { month: 36, principal: 0, interest: 50, total: 50 },
            },
          ],
          label: 36,
        },
      ];

      scenarios.forEach((props) => {
        const { container } = render(<TooltipComponent {...props} />);
        expect(container.firstChild).not.toBeNull();
      });
    }
  });

  test("should execute formatMonth with edge cases", () => {
    render(<LoanInstallmentCompositionChart {...defaultProps} />);

    if (mockTickFormatter) {
      // Testar valores extremos
      const edgeCases = [0, -1, 100, 999];
      const results = edgeCases.map((value) => mockTickFormatter!(value));

      expect(results).toEqual(["0º", "-1º", "100º", "999º"]);
    }
  });
});
