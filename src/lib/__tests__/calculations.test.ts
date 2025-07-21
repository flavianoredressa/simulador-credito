import {
  calculateInstallmentAmount,
  calculateLoan,
  calculateTotalAmount,
  getInterestRateByAge,
  calculateLoanWithAge,
} from "@/lib/calculations";

describe("calculateInstallmentAmount", () => {
  it("should calculate correct installment for basic loan", () => {
    const installment = calculateInstallmentAmount(11352.12, 12);
    expect(installment).toBeCloseTo(946.01, 2);
  });

  it("should handle zero interest rate", () => {
    const installment = calculateInstallmentAmount(12000, 12);
    expect(installment).toBe(1000);
  });

  it("should handle high amounts", () => {
    const installment = calculateInstallmentAmount(120000, 120);
    expect(installment).toBe(1000);
  });

  it("should handle different installment counts", () => {
    const installment = calculateInstallmentAmount(24000, 24);
    expect(installment).toBe(1000);
  });
});

describe("calculateTotalAmount", () => {
  it("should calculate total amount with compound interest", () => {
    const total = calculateTotalAmount(10000, 2, 12);
    expect(total).toBeCloseTo(12682.42, 2);
  });

  it("should handle zero interest", () => {
    const total = calculateTotalAmount(12000, 0, 12);
    expect(total).toBe(12000);
  });

  it("should handle high interest rates", () => {
    const total = calculateTotalAmount(5000, 10, 6);
    expect(total).toBeCloseTo(8857.81, 2);
  });
});

describe("calculateLoan", () => {
  it("should calculate complete loan structure", () => {
    const loanData = { amount: 10000, installments: 12, interestRate: 2 };
    const loan = calculateLoan(loanData);

    expect(loan.amount).toBe(10000);
    expect(loan.installments).toBe(12);
    expect(loan.interestRate).toBe(2);
    expect(loan.totalAmount).toBeCloseTo(12682.42, 2);
    expect(loan.installmentAmount).toBeCloseTo(1056.87, 2);
    expect(loan.totalInterest).toBeCloseTo(2682.42, 2);
  });

  it("should handle zero interest loans", () => {
    const loanData = { amount: 12000, installments: 12, interestRate: 0 };
    const loan = calculateLoan(loanData);

    expect(loan.installmentAmount).toBe(1000);
    expect(loan.totalAmount).toBe(12000);
    expect(loan.totalInterest).toBe(0);
  });
});

describe("getInterestRateByAge", () => {
  it("should return correct rates for different age groups", () => {
    expect(getInterestRateByAge(24)).toBe(5); // Até 25
    expect(getInterestRateByAge(30)).toBe(3); // 26-40
    expect(getInterestRateByAge(50)).toBe(2); // 41-60
    expect(getInterestRateByAge(65)).toBe(4); // 60+
  });

  it("should handle negative age scenario (returns 5%)", () => {
    expect(getInterestRateByAge(-1)).toBe(5);
  });

  it("should handle boundary ages", () => {
    expect(getInterestRateByAge(25)).toBe(5);
    expect(getInterestRateByAge(26)).toBe(3);
    expect(getInterestRateByAge(40)).toBe(3);
    expect(getInterestRateByAge(41)).toBe(2);
    expect(getInterestRateByAge(60)).toBe(2);
    expect(getInterestRateByAge(61)).toBe(4);
  });
});

describe("calculateLoanWithAge", () => {
  it("should calculate loan with age-based interest rate", () => {
    // Using a specific birth date that will result in a predictable age
    const birthDate = "1990-01-01";
    const loan = calculateLoanWithAge(10000, 12, birthDate);

    // Test that the function returns valid results
    expect(loan.amount).toBe(10000);
    expect(loan.installments).toBe(12);
    expect(typeof loan.age).toBe("number");
    expect(typeof loan.annualInterestRate).toBe("number");
    expect(loan.installmentAmount).toBeGreaterThan(0);
    expect(loan.totalAmount).toBeGreaterThan(loan.amount);
  });

  it("should handle interest rate correctly", () => {
    const birthDate = "2020-01-01"; // Very young person
    const loan = calculateLoanWithAge(12000, 12, birthDate);

    // For a young person, we expect 5% annual rate
    expect(loan.annualInterestRate).toBe(5);
    expect(loan.installmentAmount).toBeGreaterThan(1000); // Should be more than simple division due to interest
  });
});
