import { render, screen } from "@testing-library/react";
import { Footer } from "../Footer";

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

describe("Footer Component", () => {
  it("should render without crashing", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("should render the main heading", () => {
    render(<Footer />);

    expect(screen.getByText("Simulador de Empréstimo")).toBeInTheDocument();
  });

  it("should render the copyright notice", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`© ${currentYear}`))
    ).toBeInTheDocument();
  });

  it("should render resource features list", () => {
    render(<Footer />);

    expect(screen.getByText("Recursos")).toBeInTheDocument();
    expect(screen.getByText("✓ Cálculo preciso de juros")).toBeInTheDocument();
    expect(screen.getByText("✓ Resultados instantâneos")).toBeInTheDocument();
    expect(screen.getByText("✓ 100% gratuito")).toBeInTheDocument();
    expect(screen.getByText("✓ Sem cadastro necessário")).toBeInTheDocument();
  });

  it("should render important information section", () => {
    render(<Footer />);

    expect(screen.getByText("Importante")).toBeTruthy();
    expect(
      screen.getByText(/Este simulador é apenas uma ferramenta de cálculo/)
    ).toBeTruthy();
  });

  it("should have proper styling classes", () => {
    const { container } = render(<Footer />);

    const footerElement = container.querySelector("footer");
    expect(footerElement).toHaveClass(
      "bg-gray-50",
      "border-t",
      "border-gray-200",
      "mt-auto"
    );
  });

  it("should have responsive grid layout", () => {
    const { container } = render(<Footer />);

    const gridContainer = container.querySelector(".grid");
    expect(gridContainer).toHaveClass("md:grid-cols-3");
  });

  it("should have proper semantic structure", () => {
    render(<Footer />);

    // Should be a footer landmark
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeTruthy();
  });

  it("should render company description", () => {
    render(<Footer />);

    const description = screen.getByText(
      /Ferramenta gratuita para simular empréstimos/i
    );
    expect(description).toBeTruthy();
  });

  it("should have container with proper max width", () => {
    const { container } = render(<Footer />);

    const containerDiv = container.querySelector(".max-w-7xl");
    expect(containerDiv).toBeTruthy();
    expect(containerDiv).toHaveClass("mx-auto", "px-4", "sm:px-6", "lg:px-8");
  });

  it("should render footer sections with headings", () => {
    render(<Footer />);

    expect(screen.getByText("Simulador de Empréstimo")).toBeTruthy();
    expect(screen.getByText("Recursos")).toBeTruthy();
    expect(screen.getByText("Importante")).toBeTruthy();
  });

  it("should have proper spacing and padding", () => {
    const { container } = render(<Footer />);

    const innerContainer = container.querySelector(".py-4");
    expect(innerContainer).toBeTruthy();
  });

  it("should render divider between sections", () => {
    const { container } = render(<Footer />);

    const divider = container.querySelector(".border-t.border-gray-200.mt-4");
    expect(divider).toBeTruthy();
  });

  it("should render current year dynamically", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(new RegExp(currentYear.toString()));
    expect(copyrightText).toBeTruthy();
  });

  it("should have accessibility features", () => {
    render(<Footer />);

    // Footer should be a contentinfo landmark
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeTruthy();

    // Should have proper headings
    const mainHeading = screen.getByRole("heading", { level: 3 });
    expect(mainHeading).toBeTruthy();

    const subHeadings = screen.getAllByRole("heading", { level: 4 });
    expect(subHeadings).toHaveLength(2);
  });

  it("should render proper grid structure", () => {
    const { container } = render(<Footer />);

    const gridColumns = container.querySelectorAll(".grid > div");
    expect(gridColumns).toHaveLength(3);
  });

  it("should have proper text colors and styles", () => {
    const { container } = render(<Footer />);

    const mainHeading = container.querySelector("h3");
    expect(mainHeading).toHaveClass(
      "text-base",
      "font-semibold",
      "text-gray-900"
    );

    const description = container.querySelector("p.text-gray-600");
    expect(description).toBeTruthy();
  });
});
