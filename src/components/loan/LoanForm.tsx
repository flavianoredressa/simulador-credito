"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { LOAN_LIMITS } from "@/constants/loan";
import { calculateLoan } from "@/lib/calculations";
import { formatCurrency } from "@/lib/utils";
import type { LoanData } from "@/types/loan";

interface LoanFormProps {
  onCalculate?: (calculation: ReturnType<typeof calculateLoan>) => void;
}

export function LoanForm({ onCalculate }: LoanFormProps) {
  const [formData, setFormData] = useState<LoanData>({
    amount: LOAN_LIMITS.amount.default,
    installments: LOAN_LIMITS.installments.default,
    interestRate: LOAN_LIMITS.interestRate.default,
  });

  const handleInputChange =
    (field: keyof LoanData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      const newData = { ...formData, [field]: value };
      setFormData(newData);

      // Calcula automaticamente quando os dados mudam
      if (onCalculate) {
        onCalculate(calculateLoan(newData));
      }
    };

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Dados do Empréstimo</CardTitle>
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
          label="Número de Parcelas"
          min={LOAN_LIMITS.installments.min}
          max={LOAN_LIMITS.installments.max}
          step={LOAN_LIMITS.installments.step}
          value={formData.installments}
          onChange={handleInputChange("installments")}
          helperText={`${formData.installments} meses`}
        />

        <Input
          type="number"
          label="Taxa de Juros (% ao mês)"
          suffix="%"
          min={LOAN_LIMITS.interestRate.min}
          max={LOAN_LIMITS.interestRate.max}
          step={LOAN_LIMITS.interestRate.step}
          value={formData.interestRate}
          onChange={handleInputChange("interestRate")}
          helperText={`Taxa mensal de ${formData.interestRate}%`}
        />
      </CardContent>
    </Card>
  );
}
