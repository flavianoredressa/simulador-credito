import {
  // Types
  LoanData,
  LoanResult,
  LoanCalculation,
  LoanFormData,
  LoanValidation,
  // Functions
  isLoanData,
  isLoanResult,
  isLoanCalculation,
  createLoanData,
  createLoanResult,
  createLoanCalculation,
  // Defaults
  DEFAULT_LOAN_DATA,
  DEFAULT_LOAN_RESULT,
  DEFAULT_LOAN_VALIDATION,
} from "../loan";

describe("Loan Types and Utilities", () => {
  describe("Type Guards", () => {
    describe("isLoanData", () => {
      it("should validate correct LoanData objects", () => {
        const validData = {
          amount: 10000,
          installments: 12,
          interestRate: 2.5,
        };

        expect(isLoanData(validData)).toBe(true);
      });

      it("should reject invalid objects", () => {
        expect(isLoanData(null)).toBe(false);
        expect(isLoanData(undefined)).toBe(false);
        expect(isLoanData({})).toBe(false);
        expect(isLoanData({ amount: "invalid" })).toBe(false);
        expect(isLoanData({ amount: 10000 })).toBe(false); // missing fields
      });

      it("should validate all required properties", () => {
        const partialData = {
          amount: 10000,
          installments: 12,
          // missing interestRate
        };

        expect(isLoanData(partialData)).toBe(false);
      });
    });

    describe("isLoanResult", () => {
      it("should validate correct LoanResult objects", () => {
        const validResult = {
          totalAmount: 12000,
          installmentAmount: 1000,
          totalInterest: 2000,
          interestPercentage: 20,
        };

        expect(isLoanResult(validResult)).toBe(true);
      });

      it("should reject invalid result objects", () => {
        expect(isLoanResult(null)).toBe(false);
        expect(isLoanResult({ totalAmount: "invalid" })).toBe(false);
        expect(isLoanResult({ totalAmount: 12000 })).toBe(false); // missing fields
      });
    });

    describe("isLoanCalculation", () => {
      it("should validate complete calculation objects", () => {
        const validCalculation = {
          // LoanData properties
          amount: 10000,
          installments: 12,
          interestRate: 2.5,
          // LoanResult properties
          totalAmount: 12000,
          installmentAmount: 1000,
          totalInterest: 2000,
          interestPercentage: 20,
        };

        expect(isLoanCalculation(validCalculation)).toBe(true);
      });

      it("should reject incomplete calculation objects", () => {
        const incompleteCalculation = {
          amount: 10000,
          installments: 12,
          // missing some required properties
        };

        expect(isLoanCalculation(incompleteCalculation)).toBe(false);
      });
    });
  });

  describe("Factory Functions", () => {
    describe("createLoanData", () => {
      it("should create default loan data when no parameters provided", () => {
        const data = createLoanData();

        expect(data).toEqual(DEFAULT_LOAN_DATA);
        expect(isLoanData(data)).toBe(true);
      });

      it("should merge provided data with defaults", () => {
        const customData = createLoanData({
          amount: 15000,
          installments: 24,
        });

        expect(customData.amount).toBe(15000);
        expect(customData.installments).toBe(24);
        expect(customData.interestRate).toBe(DEFAULT_LOAN_DATA.interestRate);
        expect(isLoanData(customData)).toBe(true);
      });

      it("should override all default values when provided", () => {
        const customData = createLoanData({
          amount: 50000,
          installments: 36,
          interestRate: 3.5,
        });

        expect(customData.amount).toBe(50000);
        expect(customData.installments).toBe(36);
        expect(customData.interestRate).toBe(3.5);
        expect(isLoanData(customData)).toBe(true);
      });
    });

    describe("createLoanResult", () => {
      it("should create default loan result when no parameters provided", () => {
        const result = createLoanResult();

        expect(result).toEqual(DEFAULT_LOAN_RESULT);
        expect(isLoanResult(result)).toBe(true);
      });

      it("should merge provided result with defaults", () => {
        const customResult = createLoanResult({
          totalAmount: 60000,
          installmentAmount: 1250,
        });

        expect(customResult.totalAmount).toBe(60000);
        expect(customResult.installmentAmount).toBe(1250);
        expect(customResult.totalInterest).toBe(
          DEFAULT_LOAN_RESULT.totalInterest
        );
        expect(customResult.interestPercentage).toBe(
          DEFAULT_LOAN_RESULT.interestPercentage
        );
        expect(isLoanResult(customResult)).toBe(true);
      });
    });

    describe("createLoanCalculation", () => {
      it("should create complete calculation with defaults", () => {
        const calculation = createLoanCalculation();

        expect(calculation).toEqual({
          ...DEFAULT_LOAN_DATA,
          ...DEFAULT_LOAN_RESULT,
        });
        expect(isLoanCalculation(calculation)).toBe(true);
      });

      it("should merge both data and result parameters", () => {
        const calculation = createLoanCalculation(
          { amount: 25000, installments: 30 },
          { totalAmount: 30000, installmentAmount: 1000 }
        );

        expect(calculation.amount).toBe(25000);
        expect(calculation.installments).toBe(30);
        expect(calculation.totalAmount).toBe(30000);
        expect(calculation.installmentAmount).toBe(1000);
        expect(isLoanCalculation(calculation)).toBe(true);
      });
    });
  });

  describe("Default Values", () => {
    describe("DEFAULT_LOAN_DATA", () => {
      it("should have valid default loan data structure", () => {
        expect(isLoanData(DEFAULT_LOAN_DATA)).toBe(true);
        expect(DEFAULT_LOAN_DATA).toHaveProperty("amount");
        expect(DEFAULT_LOAN_DATA).toHaveProperty("installments");
        expect(DEFAULT_LOAN_DATA).toHaveProperty("interestRate");
      });

      it("should have safe default values", () => {
        expect(DEFAULT_LOAN_DATA.amount).toBe(0);
        expect(DEFAULT_LOAN_DATA.installments).toBe(1);
        expect(DEFAULT_LOAN_DATA.interestRate).toBe(0);
      });
    });

    describe("DEFAULT_LOAN_RESULT", () => {
      it("should have valid default loan result structure", () => {
        expect(isLoanResult(DEFAULT_LOAN_RESULT)).toBe(true);
        expect(DEFAULT_LOAN_RESULT).toHaveProperty("totalAmount");
        expect(DEFAULT_LOAN_RESULT).toHaveProperty("installmentAmount");
        expect(DEFAULT_LOAN_RESULT).toHaveProperty("totalInterest");
        expect(DEFAULT_LOAN_RESULT).toHaveProperty("interestPercentage");
      });

      it("should have safe default values", () => {
        expect(DEFAULT_LOAN_RESULT.totalAmount).toBe(0);
        expect(DEFAULT_LOAN_RESULT.installmentAmount).toBe(0);
        expect(DEFAULT_LOAN_RESULT.totalInterest).toBe(0);
        expect(DEFAULT_LOAN_RESULT.interestPercentage).toBe(0);
      });
    });

    describe("DEFAULT_LOAN_VALIDATION", () => {
      it("should have valid validation structure", () => {
        expect(DEFAULT_LOAN_VALIDATION).toHaveProperty("amount");
        expect(DEFAULT_LOAN_VALIDATION).toHaveProperty("installments");
        expect(DEFAULT_LOAN_VALIDATION).toHaveProperty("interestRate");

        expect(DEFAULT_LOAN_VALIDATION.amount).toHaveProperty("min");
        expect(DEFAULT_LOAN_VALIDATION.amount).toHaveProperty("max");
        expect(DEFAULT_LOAN_VALIDATION.installments).toHaveProperty("min");
        expect(DEFAULT_LOAN_VALIDATION.installments).toHaveProperty("max");
        expect(DEFAULT_LOAN_VALIDATION.interestRate).toHaveProperty("min");
        expect(DEFAULT_LOAN_VALIDATION.interestRate).toHaveProperty("max");
      });

      it("should have reasonable validation ranges", () => {
        expect(DEFAULT_LOAN_VALIDATION.amount.min).toBeLessThan(
          DEFAULT_LOAN_VALIDATION.amount.max
        );
        expect(DEFAULT_LOAN_VALIDATION.installments.min).toBeLessThan(
          DEFAULT_LOAN_VALIDATION.installments.max
        );
        expect(DEFAULT_LOAN_VALIDATION.interestRate.min).toBeLessThan(
          DEFAULT_LOAN_VALIDATION.interestRate.max
        );
      });
    });
  });

  describe("Type Interfaces", () => {
    describe("LoanData interface", () => {
      it("should work with type assignments", () => {
        const data: LoanData = createLoanData({
          amount: 20000,
          installments: 24,
          interestRate: 2.8,
        });

        expect(data.amount).toBe(20000);
        expect(data.installments).toBe(24);
        expect(data.interestRate).toBe(2.8);
      });
    });

    describe("LoanResult interface", () => {
      it("should work with type assignments", () => {
        const result: LoanResult = createLoanResult({
          totalAmount: 24000,
          installmentAmount: 1000,
          totalInterest: 4000,
          interestPercentage: 20,
        });

        expect(result.totalAmount).toBe(24000);
        expect(result.installmentAmount).toBe(1000);
        expect(result.totalInterest).toBe(4000);
        expect(result.interestPercentage).toBe(20);
      });
    });

    describe("LoanCalculation interface", () => {
      it("should extend both LoanData and LoanResult", () => {
        const calculation: LoanCalculation = createLoanCalculation(
          { amount: 30000, installments: 36, interestRate: 1.5 },
          {
            totalAmount: 33000,
            installmentAmount: 916.67,
            totalInterest: 3000,
            interestPercentage: 10,
          }
        );

        // Should have LoanData properties
        expect(calculation.amount).toBe(30000);
        expect(calculation.installments).toBe(36);
        expect(calculation.interestRate).toBe(1.5);

        // Should have LoanResult properties
        expect(calculation.totalAmount).toBe(33000);
        expect(calculation.installmentAmount).toBe(916.67);
        expect(calculation.totalInterest).toBe(3000);
        expect(calculation.interestPercentage).toBe(10);
      });

      it("should be assignable to LoanData and LoanResult", () => {
        const calculation = createLoanCalculation(
          { amount: 15000, installments: 18, interestRate: 2.2 },
          {
            totalAmount: 18000,
            installmentAmount: 1000,
            totalInterest: 3000,
            interestPercentage: 20,
          }
        );

        const asLoanData: LoanData = calculation;
        const asLoanResult: LoanResult = calculation;

        expect(isLoanData(asLoanData)).toBe(true);
        expect(isLoanResult(asLoanResult)).toBe(true);
      });
    });

    describe("LoanFormData type alias", () => {
      it("should work as LoanData", () => {
        const formData: LoanFormData = createLoanData({
          amount: 12000,
          installments: 15,
          interestRate: 2.9,
        });

        const loanData: LoanData = formData;
        expect(formData).toEqual(loanData);
        expect(isLoanData(formData)).toBe(true);
      });
    });

    describe("LoanValidation interface", () => {
      it("should work with validation objects", () => {
        const validation: LoanValidation = {
          amount: { min: 5000, max: 200000 },
          installments: { min: 12, max: 48 },
          interestRate: { min: 1.0, max: 5.0 },
        };

        expect(validation.amount.min).toBe(5000);
        expect(validation.amount.max).toBe(200000);
        expect(validation.installments.min).toBe(12);
        expect(validation.installments.max).toBe(48);
        expect(validation.interestRate.min).toBe(1.0);
        expect(validation.interestRate.max).toBe(5.0);
      });
    });
  });

  describe("Integration Tests", () => {
    it("should work in a complete loan processing workflow", () => {
      // Create loan data
      const loanData = createLoanData({
        amount: 40000,
        installments: 48,
        interestRate: 1.8,
      });

      // Validate data
      expect(isLoanData(loanData)).toBe(true);

      // Create result
      const loanResult = createLoanResult({
        totalAmount: 45000,
        installmentAmount: 937.5,
        totalInterest: 5000,
        interestPercentage: 12.5,
      });

      // Validate result
      expect(isLoanResult(loanResult)).toBe(true);

      // Create complete calculation
      const calculation = createLoanCalculation(loanData, loanResult);

      // Validate complete calculation
      expect(isLoanCalculation(calculation)).toBe(true);
      expect(calculation.amount).toBe(loanData.amount);
      expect(calculation.totalAmount).toBe(loanResult.totalAmount);
    });

    it("should support validation workflows", () => {
      const validation: LoanValidation = DEFAULT_LOAN_VALIDATION;
      const testData = createLoanData({
        amount: 25000,
        installments: 24,
        interestRate: 2.5,
      });

      // Validate against rules
      const isAmountValid =
        testData.amount >= validation.amount.min &&
        testData.amount <= validation.amount.max;
      const isInstallmentsValid =
        testData.installments >= validation.installments.min &&
        testData.installments <= validation.installments.max;
      const isInterestValid =
        testData.interestRate >= validation.interestRate.min &&
        testData.interestRate <= validation.interestRate.max;

      expect(isAmountValid).toBe(true);
      expect(isInstallmentsValid).toBe(true);
      expect(isInterestValid).toBe(true);
    });
  });
});
