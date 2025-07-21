"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/Card";
import { LoanCalculation } from "@/types/loan";
import { cn } from "../../../lib/utils";

interface PaymentScheduleItem {
  month: number;
  remainingBalance: number;
  principalPayment: number;
  interestPayment: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
  monthLabel: string;
}

interface LoanBalanceEvolutionChartProps {
  loanData: LoanCalculation;
  className?: string;
}

// Cores personalizadas para o gráfico
const CHART_COLORS = {
  primary: "#2563eb",
} as const;

export const LoanBalanceEvolutionChart = ({
  loanData,
  className,
}: LoanBalanceEvolutionChartProps) => {
  // Gerar dados do cronograma de pagamento
  const generatePaymentSchedule = (
    loan: LoanCalculation
  ): PaymentScheduleItem[] => {
    const { amount, installments, interestRate, installmentAmount } = loan;

    const monthlyRate = interestRate;
    let remainingBalance = amount;
    const schedule: PaymentScheduleItem[] = [];

    let cumulativeInterest = 0;
    let cumulativePrincipal = 0;

    for (let month = 1; month <= installments; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = installmentAmount - interestPayment;

      cumulativeInterest += interestPayment;
      cumulativePrincipal += principalPayment;
      remainingBalance -= principalPayment;

      schedule.push({
        month,
        monthLabel: `${month}º mês`,
        remainingBalance: Math.max(0, remainingBalance),
        principalPayment: Math.max(0, principalPayment),
        interestPayment: Math.max(0, interestPayment),
        cumulativeInterest,
        cumulativePrincipal,
      });
    }

    return schedule;
  };

  const paymentSchedule = generatePaymentSchedule(loanData);

  // Formatadores
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatMonth = (month: number) => {
    return `${month}º mês`;
  };

  // Componente personalizado para tooltip
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">
            {formatMonth(Number(label))}
          </p>
          {payload.map((entry, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">📉</span>
          <div>
            <CardTitle className="text-lg">Evolução do Saldo Devedor</CardTitle>
            <CardDescription className="text-sm">
              Como o saldo diminui ao longo do tempo
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={paymentSchedule}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={CHART_COLORS.primary}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={CHART_COLORS.primary}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              tickFormatter={formatMonth}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickFormatter={(value) => formatCurrency(value)}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="remainingBalance"
              stroke={CHART_COLORS.primary}
              strokeWidth={2}
              fill="url(#colorBalance)"
              name="Saldo Restante"
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Informações adicionais */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center text-sm mt-1">
            <span className="text-gray-600">Período:</span>
            <span className="font-semibold text-gray-800">
              {loanData.installments} meses
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
