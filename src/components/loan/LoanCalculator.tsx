"use client";

import { useState } from "react";
import { LoanForm } from "@/components/loan/LoanForm";
import { LoanResults } from "@/components/loan/LoanResults";
import { calculateLoan } from "@/lib/calculations";
import { LOAN_LIMITS } from "@/constants/loan";
import type { LoanCalculation } from "@/types/loan";

export function LoanCalculator() {
  const [calculation, setCalculation] = useState<LoanCalculation>(
    calculateLoan({
      amount: LOAN_LIMITS.amount.default,
      installments: LOAN_LIMITS.installments.default,
      interestRate: LOAN_LIMITS.interestRate.default,
    })
  );

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <LoanForm onCalculate={setCalculation} />
      <LoanResults calculation={calculation} />
    </div>
  );
}
