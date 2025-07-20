import { render, screen } from "@testing-library/react";
import { APP_CONFIG } from "@/constants/loan";
import Home from "../page";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

// Mock UI components
jest.mock("@/components/ui/Button", () => ({
  Button: ({
    children,
    className,
    size,
    ...props
  }: React.PropsWithChildren<{
    className?: string;
    size?: string;
    [key: string]: unknown;
  }>) => (
    <button className={`button ${className} size-${size}`} {...props}>
      {children}
    </button>
  ),
}));

jest.mock("@/components/ui/Card", () => ({
  Card: ({
    children,
    className,
    variant,
    ...props
  }: React.PropsWithChildren<{
    className?: string;
    variant?: string;
    [key: string]: unknown;
  }>) => (
    <div className={`card ${className} variant-${variant}`} {...props}>
      {children}
    </div>
  ),
  CardContent: ({
    children,
    className,
    ...props
  }: React.PropsWithChildren<{
    className?: string;
    [key: string]: unknown;
  }>) => (
    <div className={`card-content ${className}`} {...props}>
      {children}
    </div>
  ),
}));

describe("Home Page", () => {
  it("should render the main title", () => {
    render(<Home />);

    expect(screen.getByText("Simule seu")).toBeTruthy();
    expect(screen.getByText("Empréstimo")).toBeTruthy();
  });

  it("should render the description from APP_CONFIG", () => {
    render(<Home />);

    expect(screen.getByText(new RegExp(APP_CONFIG.description))).toBeTruthy();
  });

  it("should render all feature cards", () => {
    render(<Home />);

    APP_CONFIG.features.forEach((feature) => {
      expect(screen.getByText(feature.title)).toBeTruthy();
      expect(screen.getByText(feature.description)).toBeTruthy();
      expect(screen.getByText(feature.icon)).toBeTruthy();
    });
  });

  it("should render the CTA button with correct link", () => {
    render(<Home />);

    const ctaButton = screen.getByText("Simular Empréstimo Agora");
    expect(ctaButton).toBeTruthy();

    // Check if the link has the correct href
    const linkElement = ctaButton.closest("a");
    expect(linkElement).toHaveAttribute("href", "/simulador");
  });

  it("should render trust indicators", () => {
    render(<Home />);

    expect(
      screen.getByText("Gratuito • Sem compromisso • Resultado imediato")
    ).toBeTruthy();
  });

  it("should have proper structure with main element", () => {
    const { container } = render(<Home />);

    const mainElement = container.querySelector("main");
    expect(mainElement).toBeTruthy();
    expect(mainElement).toHaveClass(
      "min-h-screen",
      "bg-white",
      "flex",
      "items-center",
      "justify-center",
      "p-4"
    );
  });

  it("should render responsive layout classes", () => {
    const { container } = render(<Home />);

    // Check for responsive grid
    const gridContainer = container.querySelector(".grid.md\\:grid-cols-3");
    expect(gridContainer).toBeTruthy();

    // Check main container has responsive classes
    const mainElement = container.querySelector("main");
    expect(mainElement).toBeTruthy();
  });

  it("should render feature cards with proper styling", () => {
    const { container } = render(<Home />);

    // Should have 3 feature cards
    const featureCards = container.querySelectorAll(".card-content");
    expect(featureCards).toHaveLength(APP_CONFIG.features.length);
  });

  it("should have accessibility features", () => {
    render(<Home />);

    // Main content should be in a main landmark
    const main = screen.getByRole("main");
    expect(main).toBeTruthy();

    // Button should be accessible
    const ctaButton = screen.getByRole("button");
    expect(ctaButton).toBeTruthy();
  });

  it("should render with correct page layout", () => {
    const { container } = render(<Home />);

    // Should have centered content
    const centeredContent = container.querySelector(".max-w-4xl.mx-auto");
    expect(centeredContent).toBeTruthy();

    // Should have proper padding
    const paddedContent = container.querySelector(".p-4");
    expect(paddedContent).toBeTruthy();
  });
});
