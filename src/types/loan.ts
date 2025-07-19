export interface LoanData {
  amount: number;
  installments: number;
  interestRate: number;
}

export interface LoanResult {
  totalAmount: number;
  installmentAmount: number;
  totalInterest: number;
  interestPercentage: number;
}

export interface LoanCalculation extends LoanData, LoanResult {}

export type LoanFormData = LoanData;

export interface LoanValidation {
  amount: {
    min: number;
    max: number;
  };
  installments: {
    min: number;
    max: number;
  };
  interestRate: {
    min: number;
    max: number;
  };
}

// Type guards to ensure runtime usage
export const isLoanData = (obj: unknown): obj is LoanData => {
  if (typeof obj !== "object" || obj === null) return false;
  const data = obj as LoanData;
  return (
    typeof data.amount === "number" &&
    typeof data.installments === "number" &&
    typeof data.interestRate === "number"
  );
};

export const isLoanResult = (obj: unknown): obj is LoanResult => {
  if (typeof obj !== "object" || obj === null) return false;
  const result = obj as LoanResult;
  return (
    typeof result.totalAmount === "number" &&
    typeof result.installmentAmount === "number" &&
    typeof result.totalInterest === "number" &&
    typeof result.interestPercentage === "number"
  );
};

export const isLoanCalculation = (obj: unknown): obj is LoanCalculation => {
  return isLoanData(obj) && isLoanResult(obj);
};

// Default values for interfaces
export const DEFAULT_LOAN_DATA: LoanData = {
  amount: 0,
  installments: 1,
  interestRate: 0,
};

export const DEFAULT_LOAN_RESULT: LoanResult = {
  totalAmount: 0,
  installmentAmount: 0,
  totalInterest: 0,
  interestPercentage: 0,
};

export const DEFAULT_LOAN_VALIDATION: LoanValidation = {
  amount: { min: 1000, max: 100000 },
  installments: { min: 6, max: 60 },
  interestRate: { min: 0.5, max: 10 },
};

// Factory functions
export const createLoanData = (data: Partial<LoanData> = {}): LoanData => ({
  ...DEFAULT_LOAN_DATA,
  ...data,
});

export const createLoanResult = (
  result: Partial<LoanResult> = {}
): LoanResult => ({
  ...DEFAULT_LOAN_RESULT,
  ...result,
});

export const createLoanCalculation = (
  data: Partial<LoanData> = {},
  result: Partial<LoanResult> = {}
): LoanCalculation => ({
  ...createLoanData(data),
  ...createLoanResult(result),
});
