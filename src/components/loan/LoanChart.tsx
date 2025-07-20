"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { LoanCalculation } from "@/types/loan";

// Utility function to combine classes
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

interface LoanChartProps {
  loanData: LoanCalculation;
  className?: string;
}

interface PaymentScheduleItem {
  month: number;
  remainingBalance: number;
  principalPayment: number;
  interestPayment: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
  monthLabel: string;
}

// Cores personalizadas para os gráficos
const CHART_COLORS = {
  primary: "#2563eb",
  secondary: "#10b981",
  accent: "#f59e0b",
  danger: "#ef4444",
  info: "#06b6d4",
  success: "#22c55e",
  warning: "#eab308",
  gradient: {
    blue: ["#3b82f6", "#1d4ed8"],
    green: ["#10b981", "#059669"],
    orange: ["#f59e0b", "#d97706"],
  },
} as const;

const LoanChart = ({ loanData, className }: LoanChartProps) => {
  // Gerar dados do cronograma de pagamento
  const generatePaymentSchedule = (
    loan: LoanCalculation
  ): PaymentScheduleItem[] => {
    const { amount, installments, interestRate, installmentAmount } = loan;

    // CORREÇÃO: O interestRate já vem como taxa decimal mensal, não precisa dividir por 100
    // Exemplo: Se taxa anual é 5%, taxa mensal é 5/100/12 = 0.00416666...
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

  // Dados para gráfico de pizza (resumo total)
  const summaryData = [
    {
      name: "Principal",
      value: loanData.amount,
      color: CHART_COLORS.success,
    },
    {
      name: "Juros",
      value: loanData.totalInterest,
      color: CHART_COLORS.warning,
    },
  ];

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

  // Formatador para taxa de juros mensal
  const formatInterestRate = (monthlyRate: number) => {
    // Converte taxa decimal mensal para percentual e formata
    const percentageRate = monthlyRate * 100;
    return `${percentageRate.toFixed(2)}%`;
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
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-w-[200px]">
          <p className="font-semibold text-gray-800 mb-3 text-center border-b pb-2">
            📊 {label}
          </p>
          <div className="space-y-2">
            {interestData && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-orange-600">
                  💰 Juros:
                </span>
                <span className="text-sm font-bold text-orange-700">
                  {formatCurrency(interestData.value)}
                </span>
              </div>
            )}
            {principalData && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-600">
                  🏛️ Principal:
                </span>
                <span className="text-sm font-bold text-green-700">
                  {formatCurrency(principalData.value)}
                </span>
              </div>
            )}
            <div className="border-t pt-2 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">
                  💳 Total da Parcela:
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
            {interestData && total > 0 && (
              <div className="text-xs text-gray-500 text-center mt-2">
                Juros: {((interestData.value / total) * 100).toFixed(1)}% da
                parcela
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
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
          <p className="font-semibold text-gray-800">{label}</p>
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
    <div className={cn("space-y-6", className)}>
      {/* Grid com Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600">
                Valor do Empréstimo
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(loanData.amount)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600">
                Total de Juros
              </h3>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(loanData.totalInterest)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600">
                Total a Pagar
              </h3>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(loanData.totalAmount)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Pizza - Resumo Principal vs Juros */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição do Empréstimo</CardTitle>
            <CardDescription>
              Proporção entre valor principal e juros totais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={summaryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({
                    name,
                    percent,
                  }: {
                    name: string;
                    percent?: number;
                  }) => `${name} (${((percent || 0) * 100).toFixed(1)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {summaryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Evolução do Saldo Devedor */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução do Saldo Devedor</CardTitle>
            <CardDescription>
              Como o saldo diminui ao longo do tempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
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
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Composição das Parcelas */}
      <Card>
        <CardHeader>
          <CardTitle>Composição das Parcelas</CardTitle>
          <CardDescription>
            Distribuição entre juros e principal nas primeiras 12 parcelas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={paymentSchedule.slice(0, 12)}
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
        </CardContent>
      </Card>
      {/* Resumo Final */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Financeiro</CardTitle>
          <CardDescription>Análise completa do seu empréstimo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800">
                Taxa de Juros
              </h4>
              <p className="text-2xl font-bold text-blue-900">
                {formatInterestRate(loanData.interestRate)} a.m.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-800">Parcelas</h4>
              <p className="text-2xl font-bold text-green-900">
                {loanData.installments}x
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-orange-800">
                Valor da Parcela
              </h4>
              <p className="text-2xl font-bold text-orange-900">
                {formatCurrency(loanData.installmentAmount)}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-purple-800">
                % de Juros
              </h4>
              <p className="text-2xl font-bold text-purple-900">
                {(
                  (loanData.totalInterest / loanData.totalAmount) *
                  100
                ).toFixed(1)}
                %
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanChart;
