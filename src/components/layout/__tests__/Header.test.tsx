import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

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
    variant,
    size,
    ...props
  }: React.PropsWithChildren<{
    className?: string;
    variant?: string;
    size?: string;
    [key: string]: unknown;
  }>) => (
    <button
      className={`button ${className} variant-${variant} size-${size}`}
      {...props}
    >
      {children}
    </button>
  ),
}));

// Mock APP_CONFIG
jest.mock("@/constants/loan", () => ({
  APP_CONFIG: {
    title: "Simulador de Empréstimo",
  },
}));

describe("Header Component", () => {
  it("should render without crashing", () => {
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toBeTruthy();
  });

  it("should render the logo/brand text", () => {
    render(<Header />);

    expect(screen.getByText("Simulador de Empréstimo")).toBeTruthy();
    expect(screen.getByText("💰")).toBeTruthy();
  });

  it("should render navigation links", () => {
    render(<Header />);

    expect(screen.getByText("Início")).toBeTruthy();
    expect(screen.getByText("Simulador")).toBeTruthy();
  });

  it("should have correct navigation href attributes", () => {
    render(<Header />);

    const inicioLink = screen.getByText("Início").closest("a");
    expect(inicioLink).toHaveAttribute("href", "/");

    const simuladorLink = screen.getByText("Simulador").closest("a");
    expect(simuladorLink).toHaveAttribute("href", "/simulador");
  });

  it("should have proper styling classes", () => {
    const { container } = render(<Header />);

    const headerElement = container.querySelector("header");
    expect(headerElement).toHaveClass(
      "bg-white",
      "shadow-sm",
      "border-b",
      "border-gray-200"
    );
  });

  it("should render logo with proper styling", () => {
    render(<Header />);

    const logoText = screen.getByText("Simulador de Empréstimo");
    expect(logoText).toHaveClass(
      "ml-2",
      "text-xl",
      "font-bold",
      "text-gray-900"
    );

    const logoIcon = screen.getByText("💰");
    expect(logoIcon).toHaveClass("text-2xl", "font-bold", "text-blue-600");
  });

  it("should have proper semantic structure", () => {
    render(<Header />);

    // Should be a header landmark
    const header = screen.getByRole("banner");
    expect(header).toBeTruthy();

    // Should have navigation landmark
    const nav = screen.getByRole("navigation");
    expect(nav).toBeTruthy();
  });

  it("should render navigation items with hover effects", () => {
    const { container } = render(<Header />);

    const navLinks = container.querySelectorAll("nav a");
    navLinks.forEach((link) => {
      expect(link).toHaveClass("hover:text-blue-600");
    });
  });

  it("should have container with proper max width", () => {
    const { container } = render(<Header />);

    const containerDiv = container.querySelector(".max-w-7xl");
    expect(containerDiv).toBeTruthy();
    expect(containerDiv).toHaveClass("mx-auto", "px-4", "sm:px-6", "lg:px-8");
  });

  it("should render all navigation elements in correct order", () => {
    const { container } = render(<Header />);

    const navItems = container.querySelectorAll("nav a");
    expect(navItems).toHaveLength(2);

    expect(navItems[0]).toHaveTextContent("Início");
    expect(navItems[1]).toHaveTextContent("Simulador");
  });

  it("should have proper flexbox layout", () => {
    const { container } = render(<Header />);

    const flexContainer = container.querySelector(
      ".flex.justify-between.items-center.h-16"
    );
    expect(flexContainer).toBeTruthy();
  });

  it("should render logo as a link", () => {
    render(<Header />);

    const logoLink = screen.getByText("Simulador de Empréstimo").closest("a");
    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("should have proper navigation styling", () => {
    const { container } = render(<Header />);

    const nav = container.querySelector("nav");
    expect(nav).toHaveClass("flex", "space-x-8");
  });

  it("should render with proper height", () => {
    const { container } = render(<Header />);

    const heightContainer = container.querySelector(".h-16");
    expect(heightContainer).toBeTruthy();
  });

  it("should have transition effects on navigation items", () => {
    const { container } = render(<Header />);

    const navLinks = container.querySelectorAll("nav a");
    navLinks.forEach((link) => {
      expect(link).toHaveClass("transition-colors");
    });
  });
});
