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
    <div className="bg-white rounded-lg shadow-lg p-3 border border-gray-200">
      <h3 className="text-base font-bold text-secondary mb-3">
        Resultado da Simulação
      </h3>

      <div className="space-y-2">
        <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
          <span className="text-secondary-600 text-xs">
            Valor do empréstimo:
          </span>
          <span className="font-semibold text-secondary text-xs">
            {calculation.amount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
          <span className="text-secondary-600 text-xs">
            Taxa de juros (mês):
          </span>
          <span className="font-semibold text-secondary text-xs">
            {formatInterestRate(calculation.interestRate)}
          </span>
        </div>

        <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
          <span className="text-secondary-600 text-xs">Prazo:</span>
          <span className="font-semibold text-secondary text-xs">
            {calculation.installments} meses
          </span>
        </div>

        <div className="flex justify-between items-center py-1.5 border-b border-gray-200 bg-primary-50 px-2.5 rounded-lg">
          <span className="text-primary-800 font-medium text-xs">
            Parcela mensal:
          </span>
          <span className="font-bold text-primary-900 text-sm">
            {calculation.installmentAmount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
          <span className="text-secondary-600 text-xs">Total a pagar:</span>
          <span className="font-semibold text-secondary text-xs">
            {calculation.totalAmount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>

        <div className="flex justify-between items-center py-1.5">
          <span className="text-secondary-600 text-xs">Total de juros:</span>
          <span className="font-semibold text-red-600 text-xs">
            {calculation.totalInterest.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>

      <div className="mt-3 p-2.5 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-800">
          <strong>Importante:</strong> Esta simulação é apenas uma estimativa.
          Os valores reais podem variar conforme as condições específicas de
          cada instituição financeira.
        </p>
      </div>
    </div>
  );
}
