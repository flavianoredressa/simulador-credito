"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/Card";
import { LoanCalculation } from "@/types/loan";
import { cn } from "../../../lib/utils";

interface LoanDistributionChartProps {
  loanData: LoanCalculation;
  className?: string;
}

// Cores personalizadas para o gráfico
const CHART_COLORS = {
  success: "#22c55e",
  warning: "#eab308",
} as const;

export const LoanDistributionChart = ({
  loanData,
  className,
}: LoanDistributionChartProps) => {
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

  // Formatador de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🥧</span>
          <div>
            <CardTitle className="text-lg">
              Distribuição do Empréstimo
            </CardTitle>
            <CardDescription className="text-sm mb-3">
              Proporção entre valor principal e juros totais
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={summaryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }: { name: string; percent?: number }) =>
                `${name} (${((percent || 0) * 100).toFixed(1)}%)`
              }
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

        {/* Legenda personalizada */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <div>
              <p className="text-sm font-medium text-gray-700">Principal</p>
              <p className="text-xs text-gray-500">
                {formatCurrency(loanData.amount)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <div>
              <p className="text-sm font-medium text-gray-700">Juros Totais</p>
              <p className="text-xs text-gray-500">
                {formatCurrency(loanData.totalInterest)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
