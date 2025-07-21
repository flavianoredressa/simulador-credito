import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../page";

// Mock Next.js components
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return (
      <a href={href} data-testid="next-link">
        {children}
      </a>
    );
  };
});

jest.mock("next/image", () => {
  return ({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        data-testid="next-image"
      />
    );
  };
});

// Mock UI components
jest.mock("@/components/ui/Button", () => ({
  Button: ({
    children,
    size,
    className,
    ...props
  }: {
    children: React.ReactNode;
    size?: string;
    className?: string;
    [key: string]: unknown;
  }) => (
    <button
      data-testid="button"
      data-size={size}
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
}));

jest.mock("@/components/ui/Card", () => ({
  Card: ({
    children,
    variant,
    className,
    ...props
  }: {
    children: React.ReactNode;
    variant?: string;
    className?: string;
    [key: string]: unknown;
  }) => (
    <div
      data-testid="card"
      data-variant={variant}
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
  CardContent: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <div data-testid="card-content" className={className} {...props}>
      {children}
    </div>
  ),
}));

describe("Home Page", () => {
  it("should render without crashing", () => {
    render(<Home />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("should render the main layout structure", () => {
    render(<Home />);

    const main = screen.getByRole("main");
    expect(main).toHaveClass(
      "min-h-screen",
      "bg-white",
      "flex",
      "items-center",
      "justify-center"
    );
  });

  it("should render the main heading with correct text and styling", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Simule seu Empréstimo");
    expect(heading).toHaveClass(
      "text-2xl",
      "sm:text-3xl",
      "lg:text-4xl",
      "font-bold",
      "text-[#50504F]"
    );
  });

  it("should render the highlighted 'Empréstimo' text with correct styling", () => {
    render(<Home />);

    const highlightedText = screen.getByText("Empréstimo");
    expect(highlightedText).toBeInTheDocument();
    expect(highlightedText).toHaveClass("text-[#8EDB00]");
  });

  it("should render the description paragraph", () => {
    render(<Home />);

    const description = screen.getByText(
      /Simule seu empréstimo de forma rápida e segura.*Calcule parcelas, juros e encontre a opção ideal para você./
    );
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass(
      "text-base",
      "lg:text-lg",
      "text-[#757574]"
    );
  });

  it("should render all feature cards", () => {
    render(<Home />);

    // Check that all 3 feature cards are rendered
    const cards = screen.getAllByTestId("card");
    expect(cards).toHaveLength(4); // 3 feature cards + 1 main card

    // Check for specific features
    expect(screen.getByText("Cálculo Preciso")).toBeInTheDocument();
    expect(screen.getByText("Resultado Instantâneo")).toBeInTheDocument();
    expect(screen.getByText("100% Seguro")).toBeInTheDocument();
  });

  it("should render feature descriptions", () => {
    render(<Home />);

    expect(
      screen.getByText("Simule um crédito com seu carro em garantia")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Simule um crédito com seu imóvel em garantia")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Por dentro do Crédito do Trabalhador")
    ).toBeInTheDocument();
  });

  it("should render feature icons as images", () => {
    render(<Home />);

    const images = screen.getAllByTestId("next-image");
    expect(images).toHaveLength(3);

    // Check specific image sources
    expect(screen.getByAltText("Cálculo Preciso")).toHaveAttribute(
      "src",
      "/veiculo.png"
    );
    expect(screen.getByAltText("Resultado Instantâneo")).toHaveAttribute(
      "src",
      "/imovel.png"
    );
    expect(screen.getByAltText("100% Seguro")).toHaveAttribute(
      "src",
      "/consignado.webp"
    );
  });

  it("should render images with correct dimensions and styling", () => {
    render(<Home />);

    const images = screen.getAllByTestId("next-image");
    images.forEach((image) => {
      expect(image).toHaveAttribute("width", "20");
      expect(image).toHaveAttribute("height", "20");
      expect(image).toHaveClass("w-8", "h-8");
    });
  });

  it("should render the main call-to-action button", () => {
    render(<Home />);

    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Simular Empréstimo Agora");
    expect(button).toHaveAttribute("data-size", "md");
    expect(button).toHaveClass("shadow-xl");
  });

  it("should wrap the button in a Next.js Link to /simulador", () => {
    render(<Home />);

    const link = screen.getByTestId("next-link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/simulador");
  });

  it("should render the main card with elevated variant", () => {
    render(<Home />);

    const cards = screen.getAllByTestId("card");
    const mainCard = cards[0]; // First card should be the main one
    expect(mainCard).toHaveAttribute("data-variant", "elevated");
    expect(mainCard).toHaveClass("p-4", "sm:p-6", "lg:p-8");
  });

  it("should render feature cards with correct styling", () => {
    render(<Home />);

    const cards = screen.getAllByTestId("card");
    const featureCards = cards.slice(1); // Skip the main card

    featureCards.forEach((card) => {
      expect(card).toHaveClass(
        "bg-gradient-to-br",
        "from-white",
        "to-gray-50",
        "p-3",
        "sm:p-4"
      );
    });
  });

  it("should render feature card content with correct structure", () => {
    render(<Home />);

    const cardContents = screen.getAllByTestId("card-content");
    expect(cardContents).toHaveLength(3); // One for each feature card

    cardContents.forEach((content) => {
      expect(content).toHaveClass("p-0");
    });
  });

  it("should render feature titles with correct styling", () => {
    render(<Home />);

    const featureTitles = [
      screen.getByText("Cálculo Preciso"),
      screen.getByText("Resultado Instantâneo"),
      screen.getByText("100% Seguro"),
    ];

    featureTitles.forEach((title) => {
      expect(title.tagName).toBe("H3");
      expect(title).toHaveClass(
        "text-base",
        "font-semibold",
        "text-[#50504F]",
        "mb-1",
        "sm:mb-2"
      );
    });
  });

  it("should render feature descriptions with correct styling", () => {
    render(<Home />);

    const descriptions = [
      screen.getByText("Simule um crédito com seu carro em garantia"),
      screen.getByText("Simule um crédito com seu imóvel em garantia"),
      screen.getByText("Por dentro do Crédito do Trabalhador"),
    ];

    descriptions.forEach((desc) => {
      expect(desc.tagName).toBe("P");
      expect(desc).toHaveClass("text-sm", "text-[#757574]");
    });
  });

  it("should render the grid layout for features", () => {
    render(<Home />);

    // Look for the features container div
    const featuresContainer = screen
      .getByText("Cálculo Preciso")
      .closest(".grid");
    expect(featuresContainer).toHaveClass(
      "sm:grid-cols-2",
      "lg:grid-cols-3",
      "gap-3",
      "sm:gap-4",
      "mb-6",
      "sm:mb-8"
    );
  });

  it("should handle icon rendering logic", () => {
    render(<Home />);

    // All APP_CONFIG features have icons that start with "/", so they should render as images
    const images = screen.getAllByTestId("next-image");
    expect(images).toHaveLength(3);

    // Verify that the conditional logic works correctly for image paths
    // The component checks if feature.icon.startsWith("/") to decide between image and text
    expect(images[0]).toHaveAttribute("src", "/veiculo.png");
    expect(images[1]).toHaveAttribute("src", "/imovel.png");
    expect(images[2]).toHaveAttribute("src", "/consignado.webp");
  });

  it("should have proper responsive design classes", () => {
    render(<Home />);

    const main = screen.getByRole("main");
    expect(main).toHaveClass("p-2", "sm:p-4");

    const container = main.querySelector(".max-w-5xl");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("mx-auto", "text-center", "w-full");
  });

  it("should render icon containers with correct styling", () => {
    render(<Home />);

    // Find the icon containers by looking for the div that contains the images
    const images = screen.getAllByTestId("next-image");
    images.forEach((image) => {
      const iconContainer = image.parentElement;
      expect(iconContainer).toHaveClass(
        "w-10",
        "h-10",
        "rounded-full",
        "flex",
        "items-center",
        "justify-center",
        "mx-auto",
        "mb-2",
        "sm:mb-3",
        "shadow-lg"
      );
    });
  });

  it("should be accessible", () => {
    render(<Home />);

    // Check for proper heading hierarchy
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();

    // Check for proper main landmark
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();

    // Check that images have alt text
    const images = screen.getAllByTestId("next-image");
    images.forEach((image) => {
      expect(image).toHaveAttribute("alt");
    });

    // Check that the button is accessible
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
  });
});
