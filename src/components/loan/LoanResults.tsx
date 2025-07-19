import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import type { LoanCalculation } from "@/types/loan";

interface LoanResultsProps {
  calculation: LoanCalculation;
}

export function LoanResults({ calculation }: LoanResultsProps) {
  const {
    amount,
    installments,
    interestRate,
    totalAmount,
    installmentAmount,
    totalInterest,
    interestPercentage,
  } = calculation;

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Resultado da Simulação</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Valor da Parcela - Destaque Principal */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-800">
                Valor da Parcela
              </span>
              <Badge variant="info" size="sm">
                Mensal
              </Badge>
            </div>
            <div className="text-3xl font-bold text-blue-900 mb-1">
              {formatCurrency(installmentAmount)}
            </div>
            <p className="text-sm text-blue-700">
              {installments}x de {formatCurrency(installmentAmount)}
            </p>
          </div>

          {/* Outras Informações */}
          <div className="grid gap-4">
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-800">
                  Valor Solicitado
                </span>
              </div>
              <div className="text-xl font-bold text-green-900">
                {formatCurrency(amount)}
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-orange-800">
                  Total dos Juros
                </span>
                <Badge variant="warning" size="sm">
                  {formatPercentage(interestPercentage, 1)}
                </Badge>
              </div>
              <div className="text-xl font-bold text-orange-900">
                {formatCurrency(totalInterest)}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-800">
                  Total a Pagar
                </span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {formatCurrency(totalAmount)}
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Resumo:</h3>
            <div className="grid gap-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Parcelas:</span>
                <span className="font-medium">{installments} meses</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa mensal:</span>
                <span className="font-medium">
                  {formatPercentage(interestRate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Juros sobre o valor:</span>
                <span className="font-medium">
                  {formatPercentage(interestPercentage, 1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
