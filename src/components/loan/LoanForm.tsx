"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { LOAN_LIMITS } from "@/constants/loan";
import { getInterestRateByAge, getAgeFromBirthDate } from "@/lib/calculations";

// Utility function to format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

interface LoanFormData {
  amount: number;
  installments: number;
  birthDate: string;
}

interface LoanFormProps {
  onCalculate?: (data: LoanFormData) => void;
}

export function LoanForm({ onCalculate }: LoanFormProps) {
  const [formData, setFormData] = useState<LoanFormData>({
    amount: LOAN_LIMITS.amount.default,
    installments: LOAN_LIMITS.installments.default,
    birthDate: "",
  });

  const [age, setAge] = useState<number | null>(null);
  const [interestRate, setInterestRate] = useState<number | null>(null);

  const handleInputChange =
    (field: keyof LoanFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "birthDate" ? e.target.value : Number(e.target.value);
      const newData = { ...formData, [field]: value };
      setFormData(newData);

      // Calcula automaticamente quando os dados mudam e data de nascimento está preenchida
      if (newData.birthDate && onCalculate) {
        onCalculate(newData);
      }
    };

  // Atualiza idade e taxa quando a data de nascimento muda
  useEffect(() => {
    if (formData.birthDate) {
      const calculatedAge = getAgeFromBirthDate(formData.birthDate);
      const calculatedRate = getInterestRateByAge(calculatedAge);
      setAge(calculatedAge);
      setInterestRate(calculatedRate);
    } else {
      setAge(null);
      setInterestRate(null);
    }
  }, [formData.birthDate]);

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Simulação de Empréstimo</CardTitle>
        <CardDescription>
          Preencha os dados abaixo para calcular sua simulação. A taxa de juros
          será determinada automaticamente pela sua idade.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Input
          type="number"
          label="Valor do Empréstimo"
          prefix="R$"
          min={LOAN_LIMITS.amount.min}
          max={LOAN_LIMITS.amount.max}
          step={LOAN_LIMITS.amount.step}
          value={formData.amount}
          onChange={handleInputChange("amount")}
          helperText={`Valor atual: ${formatCurrency(formData.amount)}`}
          placeholder="10.000"
        />

        <Input
          type="number"
          label="Prazo de Pagamento (meses)"
          min={LOAN_LIMITS.installments.min}
          max={LOAN_LIMITS.installments.max}
          step={LOAN_LIMITS.installments.step}
          value={formData.installments}
          onChange={handleInputChange("installments")}
          helperText={`${formData.installments} parcelas mensais`}
          placeholder="12"
        />

        <Input
          type="date"
          label="Data de Nascimento"
          value={formData.birthDate}
          onChange={handleInputChange("birthDate")}
          helperText="Sua idade determina a taxa de juros aplicada"
          required
        />

        {age !== null && interestRate !== null && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              Informações Calculadas
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Idade:</span>
                <span className="ml-2 font-medium text-blue-900 ">
                  {age} anos
                </span>
              </div>
              <div>
                <span className="text-blue-700 ">Taxa de Juros:</span>
                <span className="ml-2 font-medium text-blue-900 ">
                  {interestRate}% ao ano
                </span>
              </div>
            </div>

            <div className="mt-3 text-xs text-blue-600 ">
              <p>
                <strong>Faixas etárias:</strong>
                Até 25 anos: 5% <br />
                De 26 a 40 anos: 3% <br />
                De 41 a 60 anos: 2% <br />
                Acima de 60: 4%
              </p>
            </div>
          </div>
        )}

        {!formData.birthDate && (
          <div className="bg-yellow-50  border border-yellow-200  rounded-lg p-4">
            <p className="text-yellow-800  text-sm">
              💡 Preencha sua data de nascimento para calcular a taxa de juros e
              ver os resultados da simulação.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
