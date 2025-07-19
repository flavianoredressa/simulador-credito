import type { LoanData, LoanCalculation } from "@/types/loan";

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
