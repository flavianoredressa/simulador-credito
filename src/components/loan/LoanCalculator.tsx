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

// Função para calcular idade
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

// Função para determinar taxa de juros por idade
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

// Função PMT para cálculo de empréstimo
function calculatePMT(
  principal: number,
  annualRate: number,
  periods: number
): number {
  if (annualRate === 0) {
    return principal / periods;
  }

  const monthlyRate = annualRate / 100 / 12;
  const pmt =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, periods))) /
    (Math.pow(1 + monthlyRate, periods) - 1);

  return pmt;
}

// Função principal de cálculo
function calculateLoanWithAge(
  amount: number,
  installments: number,
  birthDate: string
): LoanCalculation {
  const age = calculateAge(birthDate);
  const annualInterestRate = getInterestRateByAge(age);
  const monthlyRate = annualInterestRate / 100 / 12;

  const installmentAmount = calculatePMT(
    amount,
    annualInterestRate,
    installments
  );
  const totalAmount = installmentAmount * installments;
  const totalInterest = totalAmount - amount;
  const interestPercentage = (totalInterest / amount) * 100;

  return {
    amount,
    installments,
    interestRate: monthlyRate,
    totalAmount,
    installmentAmount,
    totalInterest,
    interestPercentage,
    age,
    annualInterestRate,
  };
}

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
    <div className="space-y-8">
      <div className="grid lg:grid-cols-2 gap-8">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
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
