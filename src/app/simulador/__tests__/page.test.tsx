import { render, screen } from "@testing-library/react";
import SimuladorPage from "../page";

// Mock the layout components - Header is no longer used
jest.mock("@/components/layout/Footer", () => ({
  Footer: () => <footer data-testid="footer">Footer Component</footer>,
}));

// Mock the LoanCalculator component
jest.mock("@/components/loan/LoanCalculator", () => ({
  LoanCalculator: () => (
    <div data-testid="loan-calculator">Loan Calculator Component</div>
  ),
}));

describe("Simulador Page", () => {
  it("should render without crashing", () => {
    render(<SimuladorPage />);

    expect(screen.getByTestId("footer")).toBeTruthy();
    expect(screen.getByTestId("loan-calculator")).toBeTruthy();
  });

  it("should render the Footer component", () => {
    render(<SimuladorPage />);

    const footer = screen.getByTestId("footer");
    expect(footer).toBeTruthy();
    expect(footer.tagName.toLowerCase()).toBe("footer");
  });

  it("should render the LoanCalculator component", () => {
    render(<SimuladorPage />);

    const calculator = screen.getByTestId("loan-calculator");
    expect(calculator).toBeTruthy();
  });

  it("should have proper page structure", () => {
    const { container } = render(<SimuladorPage />);

    // Should have a div container wrapping everything
    const pageContainer = container.firstChild;
    expect(pageContainer).toBeTruthy();
    expect(pageContainer?.nodeType).toBe(Node.ELEMENT_NODE);
  });

  it("should render components in correct order", () => {
    const { container } = render(<SimuladorPage />);

    const children = container.firstChild?.childNodes;
    expect(children).toHaveLength(2);

    // First should be main (LoanCalculator container)
    expect(children?.[0].nodeName.toLowerCase()).toBe("main");

    // Second should be Footer
    expect(children?.[1]).toHaveAttribute("data-testid", "footer");
  });

  it("should render all required components", () => {
    render(<SimuladorPage />);

    // Verify main components are present (no header anymore)
    expect(screen.getByTestId("loan-calculator")).toBeTruthy();
    expect(screen.getByTestId("footer")).toBeTruthy();
  });

  it("should be accessible with proper structure", () => {
    render(<SimuladorPage />);

    // Should have main landmark
    const main = screen.getByRole("main");
    expect(main).toBeTruthy();

    // Should have footer landmark
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeTruthy();
  });

  it("should export default function", () => {
    // Test that the page is exportable as default
    expect(typeof SimuladorPage).toBe("function");
    expect(SimuladorPage.name).toBe("Simulador");
  });

  it("should maintain layout consistency", () => {
    const { container } = render(<SimuladorPage />);

    // Should have a consistent container structure
    const mainContainer = container.firstChild;
    expect(mainContainer).toBeTruthy();

    // All children should be present
    const childCount = mainContainer?.childNodes.length;
    expect(childCount).toBe(2); // Main, Footer (no Header)
  });
});
