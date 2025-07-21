"use client";

import { useState } from "react";
import { LoanForm } from "@/components/loan/LoanForm";
import { LoanResults } from "@/components/loan/LoanResults";

import {
  FadeIn,
  SlideInLeft,
  SlideInRight,
  StaggerContainer,
  StaggerChild,
} from "@/components/animations/MotionComponents";
import type { LoanCalculation } from "@/types/loan";
import { calculateLoanWithAge } from "@/lib/calculations";
import {
  LoanBalanceEvolutionChart,
  LoanDistributionChart,
  LoanInstallmentCompositionChart,
} from "./charts";

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
      {/* Resumo Financeiro */}
      {calculation && (
        <FadeIn delay={0.8} className="w-full">
          <StaggerContainer staggerDelay={0.2}>
            <StaggerChild>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-gray-100 to-gray-500 rounded-full shadow-md">
                    <span className="text-xl text-white">📋</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Resumo Financeiro
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Cards do Resumo Financeiro */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">💵</span>
                      <h3 className="text-sm font-medium text-blue-700">
                        Valor Emprestado
                      </h3>
                    </div>
                    <p className="text-xl font-bold text-blue-900">
                      {calculation.amount.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">💰</span>
                      <h3 className="text-sm font-medium text-green-700">
                        Parcela Mensal
                      </h3>
                    </div>
                    <p className="text-xl font-bold text-green-900">
                      {calculation.installmentAmount.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">💳</span>
                      <h3 className="text-sm font-medium text-purple-700">
                        Total a Pagar
                      </h3>
                    </div>
                    <p className="text-xl font-bold text-purple-900">
                      {calculation.totalAmount.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">⚠️</span>
                      <h3 className="text-sm font-medium text-red-700">
                        Total de Juros
                      </h3>
                    </div>
                    <p className="text-xl font-bold text-red-900">
                      {calculation.totalInterest.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerChild>
          </StaggerContainer>
        </FadeIn>
      )}
      {/* Seção de Gráficos */}
      {calculation && (
        <FadeIn delay={0.6} className="w-full">
          <StaggerContainer staggerDelay={0.2}>
            <StaggerChild>
              <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md">
                    <span className="text-xl text-white">📊</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Gráficos Interativos
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
                  <div className="md:col-span-3">
                    <LoanDistributionChart loanData={calculation} />
                  </div>
                  <div className="md:col-span-3">
                    <LoanBalanceEvolutionChart loanData={calculation} />
                  </div>
                </div>
                <div>
                  <LoanInstallmentCompositionChart loanData={calculation} />
                </div>
              </div>
            </StaggerChild>
          </StaggerContainer>
        </FadeIn>
      )}
    </div>
  );
}
