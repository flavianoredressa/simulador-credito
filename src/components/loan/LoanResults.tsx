import { LoanCalculation } from "@/types/loan";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface LoanResultsProps {
  calculation: LoanCalculation;
}

// Formatador para taxa de juros mensal
const formatInterestRate = (monthlyRate: number) => {
  // Converte taxa decimal mensal para percentual e formata
  const percentageRate = monthlyRate * 100;
  return `${percentageRate.toFixed(2)}%`;
};

export function LoanResults({ calculation }: LoanResultsProps) {
  return (
    <Card variant="elevated">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Resultado da Simulação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-lg">💵</span>
            <span className="text-gray-600 text-xs">Valor do empréstimo:</span>
          </div>
          <Badge variant="info" size="sm">
            {calculation.amount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Badge>
        </div>

        <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-lg">📊</span>
            <span className="text-gray-600 text-xs">Taxa de juros (mês):</span>
          </div>
          <Badge variant="warning" size="sm">
            {formatInterestRate(calculation.interestRate)}
          </Badge>
        </div>

        <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-lg">📅</span>
            <span className="text-gray-600 text-xs">Prazo:</span>
          </div>
          <Badge variant="default" size="sm">
            {calculation.installments} meses
          </Badge>
        </div>

        <div className="flex justify-between items-center py-3 bg-gradient-to-r from-green-50 to-emerald-50 px-4 rounded-lg border border-green-200 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <span className="text-green-800 font-semibold text-sm">
              Parcela mensal:
            </span>
          </div>
          <Badge
            variant="success"
            size="lg"
            className="text-lg font-bold shadow-md"
          >
            {calculation.installmentAmount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Badge>
        </div>

        <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-lg">💳</span>
            <span className="text-gray-600 text-xs">Total a pagar:</span>
          </div>
          <Badge variant="info" size="sm">
            {calculation.totalAmount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Badge>
        </div>

        <div className="flex justify-between items-center py-1.5">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <span className="text-gray-600 text-xs">Total de juros:</span>
          </div>
          <Badge variant="danger" size="sm">
            {calculation.totalInterest.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Badge>
        </div>

        <Card className="mt-4 bg-yellow-50 border-yellow-200">
          <CardContent className="p-3">
            <div className="flex items-start gap-2 mt-5">
              <span className="text-lg">💡</span>
              <p className="text-xs text-yellow-800 flex-1">
                <strong>Importante:</strong> Esta simulação é apenas uma
                estimativa. Os valores reais podem variar conforme as condições
                específicas de cada instituição financeira.
              </p>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
