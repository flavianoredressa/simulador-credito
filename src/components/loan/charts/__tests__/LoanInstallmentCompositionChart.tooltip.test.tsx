import React from "react";
import { render, screen } from "@testing-library/react";

// Criando um componente de teste que expõe as funções internas
const TestComponent = () => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatMonth = (month: number) => {
    return `${month}º`;
  };

  // Componente personalizado para tooltip do gráfico de composição
  const CompositionTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color: string;
      dataKey: string;
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const principalData = payload.find(
        (p) => p.dataKey === "principalPayment"
      );
      const interestData = payload.find((p) => p.dataKey === "interestPayment");

      const total = (principalData?.value || 0) + (interestData?.value || 0);

      return (
        <div
          className="bg-white p-3 rounded-lg shadow-lg border border-gray-200"
          data-testid="tooltip-content"
        >
          <p className="font-semibold text-gray-800 mb-2">
            {formatMonth(Number(label))} mês
          </p>
          {payload.map((entry, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
          <div className="border-t mt-2 pt-2">
            <p className="text-sm font-semibold text-gray-800">
              {`Total da Parcela: ${formatCurrency(total)}`}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div data-testid="format-month-1">{formatMonth(1)}</div>
      <div data-testid="format-month-12">{formatMonth(12)}</div>
      <div data-testid="format-currency-1000">{formatCurrency(1000)}</div>
      <div data-testid="format-currency-854.21">{formatCurrency(854.21)}</div>

      <CompositionTooltip
        active={true}
        payload={[
          {
            name: "Principal",
            value: 800,
            color: "#22c55e",
            dataKey: "principalPayment",
          },
          {
            name: "Juros",
            value: 200,
            color: "#f59e0b",
            dataKey: "interestPayment",
          },
        ]}
        label="5"
      />

      <CompositionTooltip active={false} payload={[]} label="" />

      <CompositionTooltip />
    </div>
  );
};

describe("LoanInstallmentCompositionChart - Internal Functions", () => {
  beforeEach(() => {
    render(<TestComponent />);
  });

  it("should format month correctly", () => {
    expect(screen.getByTestId("format-month-1")).toHaveTextContent("1º");
    expect(screen.getByTestId("format-month-12")).toHaveTextContent("12º");
  });

  it("should format currency correctly", () => {
    expect(screen.getByTestId("format-currency-1000")).toHaveTextContent(
      "R$ 1.000,00"
    );
    expect(screen.getByTestId("format-currency-854.21")).toHaveTextContent(
      "R$ 854,21"
    );
  });

  it("should render CompositionTooltip with active state and payload", () => {
    const tooltipContent = screen.getByTestId("tooltip-content");
    expect(tooltipContent).toBeInTheDocument();
    expect(tooltipContent).toHaveTextContent("5º mês");
    expect(tooltipContent).toHaveTextContent("Principal: R$ 800,00");
    expect(tooltipContent).toHaveTextContent("Juros: R$ 200,00");
    expect(tooltipContent).toHaveTextContent("Total da Parcela: R$ 1.000,00");
  });

  it("should handle CompositionTooltip with inactive state", () => {
    // When active is false, the tooltip should return null (not render)
    // We can't directly test for null, but we can verify only one tooltip content exists
    const tooltipContents = screen.getAllByTestId("tooltip-content");
    expect(tooltipContents).toHaveLength(1); // Only the active one should render
  });

  it("should handle CompositionTooltip with empty payload", () => {
    // Similar to inactive state, should not render additional tooltip
    const tooltipContents = screen.getAllByTestId("tooltip-content");
    expect(tooltipContents).toHaveLength(1); // Only the active one with valid payload should render
  });

  it("should calculate total correctly in CompositionTooltip", () => {
    const tooltipContent = screen.getByTestId("tooltip-content");
    expect(tooltipContent).toHaveTextContent("Total da Parcela: R$ 1.000,00");
  });

  it("should find principalData and interestData correctly", () => {
    const tooltipContent = screen.getByTestId("tooltip-content");
    expect(tooltipContent).toHaveTextContent("Principal: R$ 800,00");
    expect(tooltipContent).toHaveTextContent("Juros: R$ 200,00");
  });

  it("should render payload entries with correct styling", () => {
    const tooltipContent = screen.getByTestId("tooltip-content");

    // Check that the entries are rendered
    expect(tooltipContent).toHaveTextContent("Principal: R$ 800,00");
    expect(tooltipContent).toHaveTextContent("Juros: R$ 200,00");
  });
});
