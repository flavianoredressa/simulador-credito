import { LoanCalculation } from "@/types/loan";

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
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Resultado da Simulação
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-gray-600">Valor do empréstimo:</span>
          <span className="font-semibold text-gray-900">
            {calculation.amount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-gray-600">Taxa de juros (mês):</span>
          <span className="font-semibold text-gray-900">
            {formatInterestRate(calculation.interestRate)}
          </span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-gray-600">Prazo:</span>
          <span className="font-semibold text-gray-900">
            {calculation.installments} meses
          </span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-gray-200 bg-blue-50 px-4 rounded-lg">
          <span className="text-blue-800 font-medium">Parcela mensal:</span>
          <span className="font-bold text-blue-900 text-lg">
            {calculation.installmentAmount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-gray-600">Total a pagar:</span>
          <span className="font-semibold text-gray-900">
            {calculation.totalAmount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        <div className="flex justify-between items-center py-3">
          <span className="text-gray-600">Total de juros:</span>
          <span className="font-semibold text-red-600">
            {calculation.totalInterest.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Importante:</strong> Esta simulação é apenas uma estimativa.
          Os valores reais podem variar conforme as condições específicas de
          cada instituição financeira.
        </p>
      </div>
    </div>
  );
}
