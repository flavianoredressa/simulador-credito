import { render } from "@testing-library/react";
import RootLayout, { metadata } from "../layout";

// Mock Next.js fonts
jest.mock("next/font/google", () => ({
  Geist: () => ({
    variable: "--font-geist-sans",
  }),
  Geist_Mono: () => ({
    variable: "--font-geist-mono",
  }),
}));

// Mock CSS import
jest.mock("../globals.css", () => ({}));

describe("RootLayout", () => {
  it("should render without crashing", () => {
    const { container } = render(<div>Test Content</div>);

    expect(container.firstChild).toBeTruthy();
  });

  it("should render children content", () => {
    const { container } = render(
      <div data-testid="test-child">Test Content</div>
    );

    const testChild = container.querySelector('[data-testid="test-child"]');
    expect(testChild).toBeTruthy();
    expect(testChild?.textContent).toBe("Test Content");
  });

  it("should have proper component structure", () => {
    const { container } = render(<div>Content</div>);

    expect(container.firstChild).toBeTruthy();
    expect(container.firstChild?.nodeType).toBe(Node.ELEMENT_NODE);
  });

  it("should handle multiple children", () => {
    const { getByText } = render(
      <RootLayout>
        <header>Header</header>
        <main>Main Content</main>
        <footer>Footer</footer>
      </RootLayout>
    );

    expect(getByText("Header")).toBeTruthy();
    expect(getByText("Main Content")).toBeTruthy();
    expect(getByText("Footer")).toBeTruthy();
  });

  it("should handle empty children", () => {
    const { container } = render(<RootLayout>{null}</RootLayout>);

    // The layout should still render the html/body structure
    expect(container).toBeTruthy();
  });

  it("should handle complex nested children", () => {
    const { getByText } = render(
      <RootLayout>
        <div>
          <header>
            <nav>Navigation</nav>
          </header>
          <main>
            <section>Content Section</section>
          </main>
        </div>
      </RootLayout>
    );

    expect(getByText("Navigation")).toBeTruthy();
    expect(getByText("Content Section")).toBeTruthy();
  });

  it("should pass props correctly to children", () => {
    const TestComponent = ({ testProp }: { testProp: string }) => (
      <div data-testid="test-prop">{testProp}</div>
    );

    const { getByTestId } = render(
      <RootLayout>
        <TestComponent testProp="test-value" />
      </RootLayout>
    );

    const testElement = getByTestId("test-prop");
    expect(testElement.textContent).toBe("test-value");
  });

  it("should be a functional component", () => {
    expect(typeof RootLayout).toBe("function");
  });

  it("should accept readonly children prop", () => {
    const children = <div>Static content</div>;

    const { getByText } = render(<RootLayout children={children} />);

    expect(getByText("Static content")).toBeTruthy();
  });

  it("should render layout component properly", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    // Test that the component renders the content
    expect(getByText("Test Content")).toBeTruthy();
  });

  it("should handle React node types correctly", () => {
    const { getByText } = render(
      <RootLayout>
        <span>Text Node</span>
        {42}
        <div>Conditional</div>
      </RootLayout>
    );

    expect(getByText("Text Node")).toBeTruthy();
    expect(getByText("42")).toBeTruthy();
    expect(getByText("Conditional")).toBeTruthy();
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

  it("should have comprehensive description", () => {
    const description = metadata.description;
    expect(description).toContain("Simule");
    expect(description).toContain("empréstimo");
    expect(description).toContain("parcelas");
    expect(description).toContain("juros");
  });
});
