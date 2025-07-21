"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
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

interface LoanInstallmentCompositionChartProps {
  loanData: LoanCalculation;
  className?: string;
  showMonths?: number; // Número de meses para mostrar (padrão: 12)
}

export const LoanInstallmentCompositionChart = ({
  loanData,
  className,
  showMonths = 12,
}: LoanInstallmentCompositionChartProps) => {
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
  const displayedSchedule = paymentSchedule.slice(0, showMonths);

  // Formatadores
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
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
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
    <Card className={cn(className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">📊</span>
          <div>
            <CardTitle className="text-lg">Composição das Parcelas</CardTitle>
            <CardDescription className="text-sm">
              Distribuição entre juros e principal nas primeiras {showMonths}{" "}
              parcelas
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={displayedSchedule}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={1} />
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0.8} />
              </linearGradient>
              <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={1} />
                <stop offset="95%" stopColor="#d97706" stopOpacity={0.8} />
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
            <Tooltip content={<CompositionTooltip />} />
            <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="rect" />
            <Bar
              dataKey="principalPayment"
              stackId="a"
              fill="url(#colorPrincipal)"
              name="Principal (Amortização)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="interestPayment"
              stackId="a"
              fill="url(#colorInterest)"
              name="Juros Mensais"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Insights adicionais */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded bg-green-500"></div>
              <span className="text-sm font-medium text-green-800">
                Maior Amortização
              </span>
            </div>
            <p className="text-xs text-green-600">
              {displayedSchedule.length > 0 &&
                `${showMonths}º mês: ${formatCurrency(displayedSchedule[displayedSchedule.length - 1]?.principalPayment || 0)}`}
            </p>
          </div>

          <div className="p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded bg-yellow-500"></div>
              <span className="text-sm font-medium text-yellow-800">
                Maior Juro
              </span>
            </div>
            <p className="text-xs text-yellow-600">
              {displayedSchedule.length > 0 &&
                `1º mês: ${formatCurrency(displayedSchedule[0]?.interestPayment || 0)}`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
