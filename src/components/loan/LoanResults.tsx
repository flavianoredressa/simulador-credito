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
    age,
    annualInterestRate,
  } = calculation;

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Resultado da Simulação</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Valor da Parcela - Destaque Principal */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Valor da Parcela
              </span>
              <Badge variant="info" size="sm">
                Mensal
              </Badge>
            </div>
            <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-1">
              {formatCurrency(installmentAmount)}
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {installments}x de {formatCurrency(installmentAmount)}
            </p>
          </div>

          {/* Informações da Taxa e Idade */}
          {age !== undefined && annualInterestRate !== undefined && (
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                    Sua Idade
                  </span>
                  <div className="text-lg font-bold text-purple-900 dark:text-purple-100">
                    {age} anos
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                    Taxa Aplicada
                  </span>
                  <div className="text-lg font-bold text-purple-900 dark:text-purple-100">
                    {annualInterestRate}% ao ano
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Outras Informações */}
          <div className="grid gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                  Valor Solicitado
                </span>
              </div>
              <div className="text-xl font-bold text-green-900 dark:text-green-100">
                {formatCurrency(amount)}
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                  Total dos Juros
                </span>
                <Badge variant="warning" size="sm">
                  {formatPercentage(interestPercentage, 1)}
                </Badge>
              </div>
              <div className="text-xl font-bold text-orange-900 dark:text-orange-100">
                {formatCurrency(totalInterest)}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Total a Pagar
                </span>
              </div>
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {formatCurrency(totalAmount)}
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Resumo da Simulação:
            </h3>
            <div className="grid gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Parcelas:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {installments} meses
                </span>
              </div>
              {annualInterestRate !== undefined && (
                <div className="flex justify-between">
                  <span>Taxa anual aplicada:</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {annualInterestRate}% ao ano
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Taxa mensal equivalente:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {formatPercentage(interestRate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Juros sobre o valor:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
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
