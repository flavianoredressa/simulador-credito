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
import { formatCurrency } from "@/lib/utils";

interface LoanFormData {
  amount: number;
  installments: number;
  birthDate: string;
}

interface LoanFormProps {
  onCalculate?: (data: LoanFormData) => void;
}

// Função para calcular idade no frontend
function calculateAge(birthDate: string): number {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

// Função para determinar taxa de juros por idade no frontend
function getInterestRateByAge(age: number): number {
  if (age <= 25) {
    return 5; // 5% ao ano
  } else if (age >= 26 && age <= 40) {
    return 3; // 3% ao ano
  } else if (age >= 41 && age <= 60) {
    return 2; // 2% ao ano
  } else {
    return 4; // 4% ao ano (acima de 60 anos)
  }
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
      const calculatedAge = calculateAge(formData.birthDate);
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
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Informações Calculadas
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700 dark:text-blue-300">Idade:</span>
                <span className="ml-2 font-medium text-blue-900 dark:text-blue-100">
                  {age} anos
                </span>
              </div>
              <div>
                <span className="text-blue-700 dark:text-blue-300">
                  Taxa de Juros:
                </span>
                <span className="ml-2 font-medium text-blue-900 dark:text-blue-100">
                  {interestRate}% ao ano
                </span>
              </div>
            </div>

            <div className="mt-3 text-xs text-blue-600 dark:text-blue-400">
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
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              💡 Preencha sua data de nascimento para calcular a taxa de juros e
              ver os resultados da simulação.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
