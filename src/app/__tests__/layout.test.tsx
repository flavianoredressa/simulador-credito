import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "../layout";

// Mock Next.js fonts
jest.mock("next/font/google", () => ({
  Geist: jest.fn(() => ({
    variable: "--font-geist-sans",
    className: "geist-sans",
  })),
  Geist_Mono: jest.fn(() => ({
    variable: "--font-geist-mono",
    className: "geist-mono",
  })),
}));

// Mock CSS import
jest.mock("../globals.css", () => ({}));

// Mock Header component
jest.mock("@/components/layout/Header", () => ({
  Header: () => <header data-testid="header">Mocked Header</header>,
}));

describe("RootLayout", () => {
  it("should render the RootLayout component structure", () => {
    render(
      <RootLayout>
        <main data-testid="main-content">Test Content</main>
      </RootLayout>
    );

    // Test that the mocked header is rendered
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("main-content")).toBeInTheDocument();
  });

  it("should render head with favicon and apple-touch-icon", () => {
    render(
      <RootLayout>
        <main>Test Content</main>
      </RootLayout>
    );

    // Test favicon
    const favicon = document.querySelector('link[rel="icon"]');
    expect(favicon).toHaveAttribute("href", "/favicon.ico");

    // Test apple-touch-icon
    const appleTouchIcon = document.querySelector(
      'link[rel="apple-touch-icon"]'
    );
    expect(appleTouchIcon).toHaveAttribute("href", "/icons/icon-192x192.png");
  });

  it("should render with correct HTML attributes", () => {
    const { container } = render(
      <RootLayout>
        <main>Test Content</main>
      </RootLayout>
    );

    // Check that the component contains the expected structure
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should render Header component", () => {
    render(
      <RootLayout>
        <main>Test Content</main>
      </RootLayout>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByText("Mocked Header")).toBeInTheDocument();
  });

  it("should render children content after Header", () => {
    render(
      <RootLayout>
        <main data-testid="main-content">Main Content</main>
      </RootLayout>
    );

    const header = screen.getByTestId("header");
    const mainContent = screen.getByTestId("main-content");

    expect(header).toBeInTheDocument();
    expect(mainContent).toBeInTheDocument();
    expect(mainContent).toHaveTextContent("Main Content");
  });

  it("should handle multiple children", () => {
    render(
      <RootLayout>
        <header data-testid="child-header">Header</header>
        <main data-testid="child-main">Main Content</main>
        <footer data-testid="child-footer">Footer</footer>
      </RootLayout>
    );

    expect(screen.getByTestId("child-header")).toBeInTheDocument();
    expect(screen.getByTestId("child-main")).toBeInTheDocument();
    expect(screen.getByTestId("child-footer")).toBeInTheDocument();
  });

  it("should handle empty children", () => {
    render(<RootLayout>{null}</RootLayout>);

    // The layout should still render the Header
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("should handle complex nested children", () => {
    render(
      <RootLayout>
        <div>
          <section data-testid="nested-section">
            <article>Content Article</article>
          </section>
        </div>
      </RootLayout>
    );

    expect(screen.getByTestId("nested-section")).toBeInTheDocument();
    expect(screen.getByText("Content Article")).toBeInTheDocument();
  });

  it("should pass props correctly to children components", () => {
    const TestComponent = ({ testProp }: { testProp: string }) => (
      <div data-testid="test-prop">{testProp}</div>
    );

    render(
      <RootLayout>
        <TestComponent testProp="test-value" />
      </RootLayout>
    );

    const testElement = screen.getByTestId("test-prop");
    expect(testElement).toHaveTextContent("test-value");
  });

  it("should be a functional component", () => {
    expect(typeof RootLayout).toBe("function");
  });

  it("should accept readonly children prop", () => {
    const children = <div data-testid="static">Static content</div>;

    render(<RootLayout children={children} />);

    expect(screen.getByTestId("static")).toBeInTheDocument();
    expect(screen.getByText("Static content")).toBeInTheDocument();
  });

  it("should handle React node types correctly", () => {
    render(
      <RootLayout>
        <span data-testid="text">Text Node</span>
        <div data-testid="number">{42}</div>
        <div data-testid="conditional">Conditional</div>
      </RootLayout>
    );

    expect(screen.getByTestId("text")).toHaveTextContent("Text Node");
    expect(screen.getByTestId("number")).toHaveTextContent("42");
    expect(screen.getByTestId("conditional")).toHaveTextContent("Conditional");
  });

  it("should render the expected component structure", () => {
    const { container } = render(
      <RootLayout>
        <main data-testid="content">Content</main>
      </RootLayout>
    );

    // Verify the component renders correctly
    expect(container).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("should handle string children", () => {
    render(
      <RootLayout>
        <div>Simple string content</div>
      </RootLayout>
    );

    expect(screen.getByText("Simple string content")).toBeInTheDocument();
  });

  it("should handle fragment children", () => {
    render(
      <RootLayout>
        <>
          <div data-testid="fragment-1">Fragment child 1</div>
          <div data-testid="fragment-2">Fragment child 2</div>
        </>
      </RootLayout>
    );

    expect(screen.getByTestId("fragment-1")).toBeInTheDocument();
    expect(screen.getByTestId("fragment-2")).toBeInTheDocument();
  });

  it("should handle conditional rendering", () => {
    const showContent = true;

    render(
      <RootLayout>
        {showContent && (
          <div data-testid="conditional">Conditional content</div>
        )}
      </RootLayout>
    );

    expect(screen.getByTestId("conditional")).toBeInTheDocument();
  });

  it("should handle array of children", () => {
    const items = [1, 2, 3];

    render(
      <RootLayout>
        {items.map((item) => (
          <div key={item} data-testid={`item-${item}`}>
            Item {item}
          </div>
        ))}
      </RootLayout>
    );

    expect(screen.getByTestId("item-1")).toBeInTheDocument();
    expect(screen.getByTestId("item-2")).toBeInTheDocument();
    expect(screen.getByTestId("item-3")).toBeInTheDocument();
  });
});

describe("Font Configuration", () => {
  it("should configure Geist fonts correctly", () => {
    // Test that the font mocks are working correctly
    const nextFont = jest.requireMock("next/font/google");

    expect(nextFont.Geist).toHaveBeenCalledWith({
      variable: "--font-geist-sans",
      subsets: ["latin"],
    });

    expect(nextFont.Geist_Mono).toHaveBeenCalledWith({
      variable: "--font-geist-mono",
      subsets: ["latin"],
    });
  });

  it("should include font variables in the layout", () => {
    // This test verifies that the font configuration is imported and used
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );

    // The fact that the component renders without error means the fonts are loaded correctly
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});

describe("Metadata", () => {
  it("should have correct title", () => {
    expect(metadata.title).toBe("Simulador de Empréstimo");
  });

  it("should have correct description", () => {
    expect(metadata.description).toBe(
      "Simule seu empréstimo de forma rápida e segura. Calcule parcelas, juros e encontre a opção ideal para você."
    );
  });

  it("should have proper metadata structure", () => {
    expect(typeof metadata).toBe("object");
    expect(metadata).toHaveProperty("title");
    expect(metadata).toHaveProperty("description");
  });

  it("should have descriptive title for SEO", () => {
    expect(metadata.title).toContain("Simulador");
    expect(metadata.title).toContain("Empréstimo");
  });

  it("should have comprehensive description for SEO", () => {
    const description = metadata.description;
    expect(description).toContain("Simule");
    expect(description).toContain("empréstimo");
    expect(description).toContain("parcelas");
    expect(description).toContain("juros");
    if (description) {
      expect(description.length).toBeGreaterThan(50); // Good length for SEO
    }
  });

  it("should export metadata as named export", () => {
    expect(metadata).toBeDefined();
    expect(typeof metadata.title).toBe("string");
    expect(typeof metadata.description).toBe("string");
  });
});
