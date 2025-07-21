// Componentes de gráficos individuais para empréstimo
export { LoanDistributionChart } from "./LoanDistributionChart";
export { LoanBalanceEvolutionChart } from "./LoanBalanceEvolutionChart";
export { LoanInstallmentCompositionChart } from "./LoanInstallmentCompositionChart";

// Tipos relacionados aos gráficos
export interface PaymentScheduleItem {
  month: number;
  remainingBalance: number;
  principalPayment: number;
  interestPayment: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
  monthLabel: string;
}

export interface ChartProps {
  loanData: import("@/types/loan").LoanCalculation;
  className?: string;
}
