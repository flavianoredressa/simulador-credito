"use client";

import { useState } from "react";
import { LoanForm } from "@/components/loan/LoanForm";
import { LoanResults } from "@/components/loan/LoanResults";
import LoanChart from "@/components/loan/LoanChart";
import {
  FadeIn,
  SlideInLeft,
  SlideInRight,
  StaggerContainer,
  StaggerChild,
} from "@/components/animations/MotionComponents";
import type { LoanCalculation } from "@/types/loan";
import { calculateLoanWithAge } from "@/lib/calculations";

interface LoanFormData {
  amount: number;
  installments: number;
  birthDate: string;
}

export function LoanCalculator() {
  const [calculation, setCalculation] = useState<LoanCalculation | null>(null);

  const handleCalculate = (data: LoanFormData) => {
    if (data.birthDate) {
      const result = calculateLoanWithAge(
        data.amount,
        data.installments,
        data.birthDate
      );
      setCalculation(result);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid lg:grid-cols-2 gap-3 sm:gap-4">
        <SlideInLeft delay={0.2}>
          <LoanForm onCalculate={handleCalculate} />
        </SlideInLeft>

        {calculation && (
          <SlideInRight delay={0.4}>
            <LoanResults calculation={calculation} />
          </SlideInRight>
        )}
      </div>

      {/* Seção de Gráficos */}
      {calculation && (
        <FadeIn delay={0.6} className="w-full">
          <StaggerContainer staggerDelay={0.2}>
            <StaggerChild>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
                Análise Visual dos Pagamentos
              </h2>
            </StaggerChild>

            <StaggerChild>
              <LoanChart loanData={calculation} />
            </StaggerChild>
          </StaggerContainer>
        </FadeIn>
      )}
    </div>
  );
}
