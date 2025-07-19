import type { LoanData, LoanCalculation } from "@/types/loan";
import {
  getAgeFromBirthDate,
  getInterestRateByAge,
  convertAnnualToMonthlyRate,
} from "@/lib/utils";

/**
 * Calcula o valor total do empréstimo com juros compostos
 */
export const calculateTotalAmount = (
  amount: number,
  interestRate: number,
  installments: number
): number => {
  const monthlyRate = interestRate / 100;
  return amount * Math.pow(1 + monthlyRate, installments);
};

/**
 * Calcula o valor da parcela
 */
export const calculateInstallmentAmount = (
  totalAmount: number,
  installments: number
): number => {
  return totalAmount / installments;
};

/**
 * Calcula o total de juros pagos
 */
export const calculateTotalInterest = (
  totalAmount: number,
  principalAmount: number
): number => {
  return totalAmount - principalAmount;
};

/**
 * Calcula a porcentagem de juros sobre o valor principal
 */
export const calculateInterestPercentage = (
  totalInterest: number,
  principalAmount: number
): number => {
  return (totalInterest / principalAmount) * 100;
};

/**
 * Realiza todos os cálculos do empréstimo
 */
export const calculateLoan = (loanData: LoanData): LoanCalculation => {
  const { amount, interestRate, installments } = loanData;

  const totalAmount = calculateTotalAmount(amount, interestRate, installments);
  const installmentAmount = calculateInstallmentAmount(
    totalAmount,
    installments
  );
  const totalInterest = calculateTotalInterest(totalAmount, amount);
  const interestPercentage = calculateInterestPercentage(totalInterest, amount);

  return {
    ...loanData,
    totalAmount,
    installmentAmount,
    totalInterest,
    interestPercentage,
  };
};

/**
 * Calcula usando a fórmula SAC (Sistema de Amortização Constante)
 * Alternativa ao juro composto - parcelas decrescentes
 */
export const calculateSAC = (loanData: LoanData): LoanCalculation => {
  const { amount, interestRate, installments } = loanData;
  const monthlyRate = interestRate / 100;

  // Amortização constante
  const amortization = amount / installments;

  // Calcula o total considerando juros decrescentes
  let totalAmount = 0;
  for (let i = 0; i < installments; i++) {
    const remainingBalance = amount - amortization * i;
    const interest = remainingBalance * monthlyRate;
    totalAmount += amortization + interest;
  }

  const installmentAmount = totalAmount / installments; // Média das parcelas
  const totalInterest = totalAmount - amount;
  const interestPercentage = (totalInterest / amount) * 100;

  return {
    ...loanData,
    totalAmount,
    installmentAmount,
    totalInterest,
    interestPercentage,
  };
};

/**
 * Calcula empréstimo usando a fórmula PMT com taxa baseada na idade
 * PMT = PV * [r * (1 + r)^n] / [(1 + r)^n - 1]
 * Onde: PMT = Pagamento mensal, PV = Valor presente, r = Taxa mensal, n = Número de pagamentos
 */
export const calculateLoanWithAge = (
  amount: number,
  installments: number,
  birthDate: string
): LoanCalculation & { age?: number; annualInterestRate?: number } => {
  // Calcula idade e determina taxa de juros
  const age = getAgeFromBirthDate(birthDate);
  const annualRate = getInterestRateByAge(age);
  const monthlyRate = convertAnnualToMonthlyRate(annualRate) / 100; // Converte para decimal

  // Fórmula PMT: PV * [r * (1 + r)^n] / [(1 + r)^n - 1]
  let installmentAmount: number;

  if (monthlyRate === 0) {
    // Se taxa for 0, parcela é simplesmente o valor dividido pelo número de parcelas
    installmentAmount = amount / installments;
  } else {
    const factor = Math.pow(1 + monthlyRate, installments);
    installmentAmount = (amount * (monthlyRate * factor)) / (factor - 1);
  }

  const totalAmount = installmentAmount * installments;
  const totalInterest = totalAmount - amount;
  const interestPercentage = (totalInterest / amount) * 100;

  return {
    amount,
    installments,
    interestRate: convertAnnualToMonthlyRate(annualRate), // Taxa mensal para compatibilidade
    totalAmount,
    installmentAmount,
    totalInterest,
    interestPercentage,
    age,
    annualInterestRate: annualRate,
  };
};
