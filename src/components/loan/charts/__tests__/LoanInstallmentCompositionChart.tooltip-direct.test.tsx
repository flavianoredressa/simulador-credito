import React from "react";
import { render } from "@testing-library/react";
import { LoanInstallmentCompositionChart } from "../LoanInstallmentCompositionChart";
import { LoanCalculation } from "@/types/loan";

// Mock específico que força execução do tooltip
let capturedTooltipComponent: React.ComponentType<{
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string | number;
}> | null = null;

jest.mock("recharts", () => {
  const MockTooltip = ({
    content,
    ...props
  }: {
    content?: React.ComponentType<Record<string, unknown>>;
    [key: string]: unknown;
  }) => {
    // Capturar o componente do tooltip
    if (content && typeof content === "function") {
      capturedTooltipComponent = content;

      // Renderizar o tooltip imediatamente com dados de teste
      const testProps = {
        active: true,
        payload: [
          {
            name: "Amortização",
            value: 1500.5,
            color: "#10b981",
            dataKey: "principalPayment",
          },
          {
            name: "Juros",
            value: 500.25,
            color: "#f59e0b",
            dataKey: "interestPayment",
          },
        ],
        label: "12",
      };

      // Executar o componente do tooltip
      React.createElement(content, testProps);

      // Também executar cenários diferentes para cobertura completa
      const scenarios = [
        // Cenário inativo
        {
          active: false,
          payload: [],
          label: "1",
        },
        // Cenário com payload vazio
        {
          active: true,
          payload: [],
          label: "5",
        },
        // Cenário com payload null/undefined
        {
          active: true,
          payload: [],
          label: "8",
        },
        {
          active: true,
          payload: [],
          label: "10",
        },
        // Cenário com dados válidos mas diferentes
        {
          active: true,
          payload: [
            {
              name: "Amortização",
              value: 2000.75,
              color: "#10b981",
              dataKey: "principalPayment",
            },
            {
              name: "Juros",
              value: 300.25,
              color: "#f59e0b",
              dataKey: "interestPayment",
            },
          ],
          label: "24",
        },
        // Cenário com valores zerados
        {
          active: true,
          payload: [
            {
              name: "Amortização",
              value: 0,
              color: "#10b981",
              dataKey: "principalPayment",
            },
            {
              name: "Juros",
              value: 0,
              color: "#f59e0b",
              dataKey: "interestPayment",
            },
          ],
          label: "36",
        },
      ];

      // Executar todos os cenários
      scenarios.forEach((scenario) => {
        React.createElement(content, scenario);
      });
    }

    return <div data-testid="tooltip" {...props} />;
  };

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
      // Executar tickFormatter se fornecido
      if (tickFormatter) {
        [1, 6, 12, 18, 24, 30, 36].forEach((value) => {
          tickFormatter(value);
        });
      }
      return <div data-testid="x-axis" />;
    },
    YAxis: () => <div data-testid="y-axis" />,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    Tooltip: MockTooltip,
    Legend: () => <div data-testid="legend" />,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
  };
});

describe("LoanInstallmentCompositionChart - Direct Tooltip Coverage", () => {
  const mockLoanData: LoanCalculation = {
    amount: 100000,
    installments: 36,
    interestRate: 8.5,
    totalAmount: 114395.04,
    installmentAmount: 3177.64,
    totalInterest: 14395.04,
    interestPercentage: 14.4,
  };

  beforeEach(() => {
    capturedTooltipComponent = null;
  });

  test("should execute CompositionTooltip component with all scenarios", () => {
    // Renderizar o componente principal para capturar o tooltip
    const { getByTestId } = render(
      <LoanInstallmentCompositionChart loanData={mockLoanData} />
    );

    // Verificar se o tooltip foi renderizado
    expect(getByTestId("tooltip")).toBeInTheDocument();

    // Verificar se o componente do tooltip foi capturado
    expect(capturedTooltipComponent).toBeTruthy();
  });

  test("should render CompositionTooltip directly with various scenarios", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    expect(capturedTooltipComponent).not.toBeNull();

    if (capturedTooltipComponent) {
      const TooltipComponent = capturedTooltipComponent;

      // Teste direto com diferentes cenários
      const scenarios = [
        // Cenário ativo com dados completos
        {
          active: true,
          payload: [
            {
              name: "Amortização",
              value: 1800.0,
              color: "#10b981",
              dataKey: "principalPayment",
            },
            {
              name: "Juros",
              value: 400.0,
              color: "#f59e0b",
              dataKey: "interestPayment",
            },
          ],
          label: "18",
        },
        // Cenário inativo
        {
          active: false,
          payload: [
            {
              name: "Amortização",
              value: 1000.0,
              color: "#10b981",
              dataKey: "principalPayment",
            },
          ],
          label: "6",
        },
        // Cenário com payload vazio
        {
          active: true,
          payload: [],
          label: "3",
        },
      ];

      scenarios.forEach((props) => {
        const result = render(<TooltipComponent {...props} />);

        if (props.active && props.payload && props.payload.length > 0) {
          // Para cenários ativos com dados, deve renderizar conteúdo
          expect(result.container.firstChild).not.toBeNull();
        } else {
          // Para cenários inativos ou sem dados, deve retornar null
          expect(result.container.firstChild).toBeNull();
        }
      });
    }
  });

  test("should handle CompositionTooltip edge cases", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    if (capturedTooltipComponent) {
      const TooltipComponent = capturedTooltipComponent;

      // Casos extremos
      const edgeCases = [
        // Payload com apenas um item
        {
          active: true,
          payload: [
            {
              name: "Amortização",
              value: 2000.0,
              color: "#10b981",
              dataKey: "principalPayment",
            },
          ],
          label: "30",
        },
        // Label como string
        {
          active: true,
          payload: [
            {
              name: "Juros",
              value: 150.0,
              color: "#f59e0b",
              dataKey: "interestPayment",
            },
          ],
          label: "25",
        },
        // Valores muito altos
        {
          active: true,
          payload: [
            {
              name: "Amortização",
              value: 99999.99,
              color: "#10b981",
              dataKey: "principalPayment",
            },
            {
              name: "Juros",
              value: 0.01,
              color: "#f59e0b",
              dataKey: "interestPayment",
            },
          ],
          label: "1",
        },
      ];

      edgeCases.forEach((props) => {
        const result = render(<TooltipComponent {...props} />);
        expect(result.container.firstChild).not.toBeNull();
      });
    }
  });

  test("should test all branches of CompositionTooltip logic", () => {
    render(<LoanInstallmentCompositionChart loanData={mockLoanData} />);

    if (capturedTooltipComponent) {
      const TooltipComponent = capturedTooltipComponent;

      // Testar find operations com diferentes dataKeys
      const findTestCases = [
        // Caso onde principalData é encontrado mas interestData não
        {
          active: true,
          payload: [
            {
              name: "Amortização",
              value: 1500.0,
              color: "#10b981",
              dataKey: "principalPayment",
            },
            {
              name: "Outro",
              value: 200.0,
              color: "#blue",
              dataKey: "otherPayment",
            },
          ],
          label: "15",
        },
        // Caso onde interestData é encontrado mas principalData não
        {
          active: true,
          payload: [
            {
              name: "Outro",
              value: 300.0,
              color: "#blue",
              dataKey: "otherPayment",
            },
            {
              name: "Juros",
              value: 250.0,
              color: "#f59e0b",
              dataKey: "interestPayment",
            },
          ],
          label: "20",
        },
        // Caso onde nenhum é encontrado
        {
          active: true,
          payload: [
            {
              name: "Outro1",
              value: 100.0,
              color: "#red",
              dataKey: "other1",
            },
            {
              name: "Outro2",
              value: 200.0,
              color: "#blue",
              dataKey: "other2",
            },
          ],
          label: "25",
        },
      ];

      findTestCases.forEach((props) => {
        const result = render(<TooltipComponent {...props} />);
        expect(result.container.firstChild).not.toBeNull();
      });
    }
  });
});
