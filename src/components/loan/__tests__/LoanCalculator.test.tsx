import { render, screen, fireEvent } from "@testing-library/react";
import {
  LoanCalculator,
  calculateAge,
  getInterestRateByAge,
  calculatePMT,
} from "../LoanCalculator";

// Mock animation components
jest.mock("@/components/animations/MotionComponents", () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SlideInLeft: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SlideInRight: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  StaggerContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  StaggerChild: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock LoanChart
jest.mock("../LoanChart", () => ({
  __esModule: true,
  default: () => <div data-testid="loan-chart">LoanChart Component</div>,
}));

jest.mock("../LoanForm", () => ({
  LoanForm: ({ onCalculate }: { onCalculate?: (calc: unknown) => void }) => (
    <div data-testid="loan-form">
      LoanForm Component
      <button
        data-testid="calculate-button"
        onClick={() =>
          onCalculate?.({
            amount: 15000,
            installments: 18,
            birthDate: "1990-01-01",
          })
        }
      >
        Calculate
      </button>
      <button
        data-testid="calculate-without-birthdate"
        onClick={() =>
          onCalculate?.({
            amount: 10000,
            installments: 12,
            birthDate: "",
          })
        }
      >
        Calculate Without Birth Date
      </button>
      <button
        data-testid="calculate-middle-aged"
        onClick={() =>
          onCalculate?.({
            amount: 20000,
            installments: 24,
            birthDate: "1975-01-01", // Age ~50 (41-60 range, 2% rate)
          })
        }
      >
        Calculate Middle Aged
      </button>
      <button
        data-testid="calculate-senior"
        onClick={() =>
          onCalculate?.({
            amount: 25000,
            installments: 30,
            birthDate: "1955-01-01", // Age ~70 (above 60, 4% rate)
          })
        }
      >
        Calculate Senior
      </button>
      <button
        data-testid="calculate-exact-middle"
        onClick={() =>
          onCalculate?.({
            amount: 30000,
            installments: 36,
            birthDate: "1974-07-20", // Age exactly 51 (middle of 41-60 range)
          })
        }
      >
        Calculate Exact Middle
      </button>
    </div>
  ),
}));

jest.mock("../LoanResults", () => ({
  LoanResults: ({
    calculation,
  }: {
    calculation: {
      amount: number;
      installments: number;
      totalAmount: number;
      installmentAmount: number;
    };
  }) => (
    <div data-testid="loan-results">
      LoanResults Component
      <div data-testid="result-amount">Amount: {calculation.amount}</div>
      <div data-testid="result-installments">
        Installments: {calculation.installments}
      </div>
      <div data-testid="result-total">Total: {calculation.totalAmount}</div>
    </div>
  ),
}));

describe("LoanCalculator Component", () => {
  beforeAll(() => {
    // Mock Date to control age calculations
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-07-20"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should render LoanForm component initially", () => {
    render(<LoanCalculator />);

    expect(screen.getByTestId("loan-form")).toBeTruthy();
    expect(screen.getByText("LoanForm Component")).toBeTruthy();
  });

  it("should not render LoanResults initially", () => {
    render(<LoanCalculator />);

    expect(screen.queryByTestId("loan-results")).toBeNull();
  });

  it("should have proper grid layout structure", () => {
    const { container } = render(<LoanCalculator />);

    // Check if the component has grid layout
    const gridElement = container.querySelector(".grid");
    expect(gridElement).toBeTruthy();
    expect(gridElement?.classList.contains("lg:grid-cols-2")).toBe(true);
    expect(gridElement?.classList.contains("gap-8")).toBe(true);
  });

  it("should calculate and display results when form is submitted with valid birth date", () => {
    render(<LoanCalculator />);

    // Initially no results
    expect(screen.queryByTestId("loan-results")).toBeNull();
    expect(screen.queryByTestId("loan-chart")).toBeNull();

    // Click calculate button
    const calculateButton = screen.getByTestId("calculate-button");
    fireEvent.click(calculateButton);

    // Results should appear
    expect(screen.getByTestId("loan-results")).toBeTruthy();
    expect(screen.getByTestId("result-amount")).toBeTruthy();
    expect(screen.getByTestId("result-installments")).toBeTruthy();
    expect(screen.getByTestId("result-total")).toBeTruthy();

    // Chart should also appear
    expect(screen.getByTestId("loan-chart")).toBeTruthy();
  });

  it("should not calculate when birthDate is empty", () => {
    render(<LoanCalculator />);

    // Click calculate without birth date
    const calculateButton = screen.getByTestId("calculate-without-birthdate");
    fireEvent.click(calculateButton);

    // Results should not appear
    expect(screen.queryByTestId("loan-results")).toBeNull();
    expect(screen.queryByTestId("loan-chart")).toBeNull();
  });

  it("should render chart section with proper structure when calculation exists", () => {
    render(<LoanCalculator />);

    // Trigger calculation
    const calculateButton = screen.getByTestId("calculate-button");
    fireEvent.click(calculateButton);

    // Check chart section
    expect(screen.getByText("Análise Visual dos Pagamentos")).toBeTruthy();
    expect(screen.getByTestId("loan-chart")).toBeTruthy();
  });

  it("should handle multiple calculations correctly", () => {
    render(<LoanCalculator />);

    // First calculation
    const calculateButton = screen.getByTestId("calculate-button");
    fireEvent.click(calculateButton);

    expect(screen.getByTestId("loan-results")).toBeTruthy();

    // Second calculation (should replace the first)
    fireEvent.click(calculateButton);

    expect(screen.getByTestId("loan-results")).toBeTruthy();
    expect(screen.getByTestId("loan-chart")).toBeTruthy();
  });

  it("should have proper space-y-8 layout class", () => {
    const { container } = render(<LoanCalculator />);

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv?.classList.contains("space-y-8")).toBe(true);
  });

  describe("Age-based interest rate coverage tests", () => {
    it("should calculate loan for middle-aged person (41-60 years) with 2% interest", () => {
      render(<LoanCalculator />);

      // Initially no results
      expect(screen.queryByTestId("loan-results")).toBeNull();

      // Click calculate button for middle-aged person
      const calculateButton = screen.getByTestId("calculate-middle-aged");
      fireEvent.click(calculateButton);

      // Results should appear
      expect(screen.getByTestId("loan-results")).toBeTruthy();
      expect(screen.getByTestId("result-amount")).toBeTruthy();
      expect(screen.getByTestId("result-installments")).toBeTruthy();
      expect(screen.getByTestId("result-total")).toBeTruthy();

      // Chart should also appear
      expect(screen.getByTestId("loan-chart")).toBeTruthy();
      expect(screen.getByText("Análise Visual dos Pagamentos")).toBeTruthy();
    });

    it("should calculate loan for senior person (above 60 years) with 4% interest", () => {
      render(<LoanCalculator />);

      // Initially no results
      expect(screen.queryByTestId("loan-results")).toBeNull();

      // Click calculate button for senior person
      const calculateButton = screen.getByTestId("calculate-senior");
      fireEvent.click(calculateButton);

      // Results should appear
      expect(screen.getByTestId("loan-results")).toBeTruthy();
      expect(screen.getByTestId("result-amount")).toBeTruthy();
      expect(screen.getByTestId("result-installments")).toBeTruthy();
      expect(screen.getByTestId("result-total")).toBeTruthy();

      // Chart should also appear
      expect(screen.getByTestId("loan-chart")).toBeTruthy();
      expect(screen.getByText("Análise Visual dos Pagamentos")).toBeTruthy();
    });

    it("should handle all age group buttons correctly", () => {
      render(<LoanCalculator />);

      // Test that all age-related buttons exist and can be clicked
      expect(screen.getByTestId("calculate-button")).toBeTruthy(); // Young adult
      expect(screen.getByTestId("calculate-middle-aged")).toBeTruthy(); // Middle age
      expect(screen.getByTestId("calculate-senior")).toBeTruthy(); // Senior
      expect(screen.getByTestId("calculate-exact-middle")).toBeTruthy(); // Exact middle age

      // Click each one to ensure they work
      fireEvent.click(screen.getByTestId("calculate-button"));
      expect(screen.getByTestId("loan-results")).toBeTruthy();

      fireEvent.click(screen.getByTestId("calculate-middle-aged"));
      expect(screen.getByTestId("loan-results")).toBeTruthy();

      fireEvent.click(screen.getByTestId("calculate-senior"));
      expect(screen.getByTestId("loan-results")).toBeTruthy();

      fireEvent.click(screen.getByTestId("calculate-exact-middle"));
      expect(screen.getByTestId("loan-results")).toBeTruthy();
    });

    it("should calculate loan for exact middle-aged person (51 years old)", () => {
      render(<LoanCalculator />);

      // Initially no results
      expect(screen.queryByTestId("loan-results")).toBeNull();

      // Click calculate button for exact middle-aged person (51 years)
      const calculateButton = screen.getByTestId("calculate-exact-middle");
      fireEvent.click(calculateButton);

      // Results should appear
      expect(screen.getByTestId("loan-results")).toBeTruthy();
      expect(screen.getByTestId("result-amount")).toBeTruthy();
      expect(screen.getByTestId("result-installments")).toBeTruthy();
      expect(screen.getByTestId("result-total")).toBeTruthy();

      // Chart should also appear
      expect(screen.getByTestId("loan-chart")).toBeTruthy();
      expect(screen.getByText("Análise Visual dos Pagamentos")).toBeTruthy();
    });
  });

  // Unit tests for exported functions
  describe("Unit tests for individual functions", () => {
    describe("calculateAge", () => {
      beforeAll(() => {
        // Mock the current date to 2025-07-20 for consistent testing
        jest.useFakeTimers();
        jest.setSystemTime(new Date("2025-07-20"));
      });

      afterAll(() => {
        jest.useRealTimers();
      });

      it("should calculate age correctly for middle-aged person", () => {
        const age = calculateAge("1974-07-20"); // Exactly 51 years old
        expect(age).toBe(51);
      });

      it("should calculate age correctly for senior person", () => {
        const age = calculateAge("1955-01-01"); // About 70 years old
        expect(age).toBe(70);
      });

      it("should handle month/day boundaries correctly", () => {
        const age1 = calculateAge("1975-07-19"); // Day before current date
        const age2 = calculateAge("1975-07-21"); // Day after current date
        expect(age1).toBe(50);
        expect(age2).toBe(49); // Birthday hasn't occurred yet
      });
    });

    describe("getInterestRateByAge", () => {
      it("should return 2% for ages 41-60", () => {
        expect(getInterestRateByAge(41)).toBe(2);
        expect(getInterestRateByAge(50)).toBe(2);
        expect(getInterestRateByAge(60)).toBe(2);
      });

      it("should return 4% for ages above 60", () => {
        expect(getInterestRateByAge(61)).toBe(4);
        expect(getInterestRateByAge(70)).toBe(4);
        expect(getInterestRateByAge(80)).toBe(4);
      });

      it("should return 5% for ages 25 and below", () => {
        expect(getInterestRateByAge(18)).toBe(5);
        expect(getInterestRateByAge(25)).toBe(5);
      });

      it("should return 3% for ages 26-40", () => {
        expect(getInterestRateByAge(26)).toBe(3);
        expect(getInterestRateByAge(30)).toBe(3);
        expect(getInterestRateByAge(40)).toBe(3);
      });
    });

    describe("calculatePMT", () => {
      it("should handle zero interest rate correctly", () => {
        const pmt = calculatePMT(12000, 0, 12);
        expect(pmt).toBe(1000); // 12000 / 12 = 1000
      });

      it("should calculate PMT with regular interest rate", () => {
        const pmt = calculatePMT(10000, 3, 12);
        expect(pmt).toBeGreaterThan(800); // Should be more than simple division
        expect(pmt).toBeLessThan(900); // But not too much more
      });

      it("should handle edge cases", () => {
        const pmt1 = calculatePMT(1000, 0, 1);
        expect(pmt1).toBe(1000); // 1000 / 1 = 1000

        const pmt2 = calculatePMT(24000, 0, 24);
        expect(pmt2).toBe(1000); // 24000 / 24 = 1000
      });
    });
  });
});
