import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { usePathname } from "next/navigation";
import { Header } from "../Header";

// Mock Next.js components
jest.mock("next/link", () => {
  return function MockedLink({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
});

jest.mock("next/image", () => {
  return function MockedImage({
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
  }) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  };
});

// Mock usePathname hook
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock Button component
jest.mock("@/components/ui/Button", () => ({
  Button: ({
    children,
    variant,
    size,
    className,
  }: {
    children: React.ReactNode;
    variant?: string;
    size?: string;
    className?: string;
  }) => (
    <button className={className} data-variant={variant} data-size={size}>
      {children}
    </button>
  ),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("should render the header element", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Header />);

      const header = screen.getByRole("banner");
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass("bg-[#50504F]", "shadow-sm");
    });

    it("should render the main container with correct classes", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Header />);

      const container = screen.getByRole("banner").querySelector("div");
      expect(container).toHaveClass(
        "max-w-7xl",
        "mx-auto",
        "px-4",
        "sm:px-6",
        "lg:px-8"
      );
    });

    it("should render the inner flex container with correct classes", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Header />);

      const flexContainer = screen
        .getByRole("banner")
        .querySelector("div > div");
      expect(flexContainer).toHaveClass(
        "flex",
        "justify-between",
        "items-center",
        "h-12",
        "sm:h-14"
      );
    });
  });

  describe("Logo Section", () => {
    it("should render the logo link to home page", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Header />);

      const logoLink = screen.getByRole("link", { name: /creditas logo/i });
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute("href", "/");
      expect(logoLink).toHaveClass("flex", "items-center");
    });

    it("should render the logo image with correct attributes", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Header />);

      const logoImage = screen.getByAltText("Creditas Logo");
      expect(logoImage).toBeInTheDocument();
      expect(logoImage).toHaveAttribute("src", "/logo.svg");
      expect(logoImage).toHaveAttribute("width", "100");
      expect(logoImage).toHaveAttribute("height", "22");
      expect(logoImage).toHaveClass("h-5", "w-auto");
    });

    it("should render the logo container with correct classes", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Header />);

      const logoContainer = screen.getByRole("link", {
        name: /creditas logo/i,
      }).parentElement;
      expect(logoContainer).toHaveClass("flex", "items-center");
    });
  });

  describe("Navigation Button - Conditional Rendering", () => {
    it("should render the 'Simular Empréstimo' button when NOT on simulator page", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Header />);

      const button = screen.getByRole("button", {
        name: /simular empréstimo/i,
      });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("data-variant", "primary");
      expect(button).toHaveAttribute("data-size", "sm");
    });

    it("should render the simulator link when NOT on simulator page", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Header />);

      const simulatorLink = screen.getByRole("link", {
        name: /simular empréstimo/i,
      });
      expect(simulatorLink).toBeInTheDocument();
      expect(simulatorLink).toHaveAttribute("href", "/simulador");
    });

    it("should NOT render the 'Simular Empréstimo' button when on simulator page", () => {
      mockUsePathname.mockReturnValue("/simulador");
      render(<Header />);

      const button = screen.queryByRole("button", {
        name: /simular empréstimo/i,
      });
      expect(button).not.toBeInTheDocument();

      const simulatorLink = screen.queryByRole("link", {
        name: /simular empréstimo/i,
      });
      expect(simulatorLink).not.toBeInTheDocument();
    });

    it("should render the button container with correct classes when NOT on simulator page", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Header />);

      const buttonContainer = screen.getByRole("button", {
        name: /simular empréstimo/i,
      }).parentElement?.parentElement;
      expect(buttonContainer).toHaveClass("flex", "items-center");
    });
  });

  describe("Pathname Logic", () => {
    it("should correctly identify when NOT on simulator page (root path)", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Header />);

      expect(
        screen.getByRole("button", { name: /simular empréstimo/i })
      ).toBeInTheDocument();
    });

    it("should correctly identify when NOT on simulator page (other path)", () => {
      mockUsePathname.mockReturnValue("/about");
      render(<Header />);

      expect(
        screen.getByRole("button", { name: /simular empréstimo/i })
      ).toBeInTheDocument();
    });

    it("should correctly identify when on simulator page", () => {
      mockUsePathname.mockReturnValue("/simulador");
      render(<Header />);

      expect(
        screen.queryByRole("button", { name: /simular empréstimo/i })
      ).not.toBeInTheDocument();
    });

    it("should correctly handle similar but different paths", () => {
      mockUsePathname.mockReturnValue("/simulador/test");
      render(<Header />);

      expect(
        screen.getByRole("button", { name: /simular empréstimo/i })
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic header element", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Header />);

      const header = screen.getByRole("banner");
      expect(header.tagName).toBe("HEADER");
    });

    it("should have accessible logo link", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Header />);

      const logoLink = screen.getByRole("link", { name: /creditas logo/i });
      expect(logoLink).toBeInTheDocument();
    });

    it("should have accessible navigation button", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Header />);

      const button = screen.getByRole("button", {
        name: /simular empréstimo/i,
      });
      expect(button).toBeInTheDocument();
    });

    it("should have accessible simulator link", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Header />);

      const simulatorLink = screen.getByRole("link", {
        name: /simular empréstimo/i,
      });
      expect(simulatorLink).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("should render all elements in correct hierarchy when NOT on simulator page", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Header />);

      // Check header exists
      const header = screen.getByRole("banner");
      expect(header).toBeInTheDocument();

      // Check logo link exists
      const logoLink = screen.getByRole("link", { name: /creditas logo/i });
      expect(logoLink).toBeInTheDocument();

      // Check logo image exists
      const logoImage = screen.getByAltText("Creditas Logo");
      expect(logoImage).toBeInTheDocument();

      // Check simulator link exists
      const simulatorLink = screen.getByRole("link", {
        name: /simular empréstimo/i,
      });
      expect(simulatorLink).toBeInTheDocument();

      // Check button exists
      const button = screen.getByRole("button", {
        name: /simular empréstimo/i,
      });
      expect(button).toBeInTheDocument();
    });

    it("should render only logo elements when on simulator page", () => {
      mockUsePathname.mockReturnValue("/simulador");
      render(<Header />);

      // Check header exists
      const header = screen.getByRole("banner");
      expect(header).toBeInTheDocument();

      // Check logo link exists
      const logoLink = screen.getByRole("link", { name: /creditas logo/i });
      expect(logoLink).toBeInTheDocument();

      // Check logo image exists
      const logoImage = screen.getByAltText("Creditas Logo");
      expect(logoImage).toBeInTheDocument();

      // Check simulator elements don't exist
      const simulatorLink = screen.queryByRole("link", {
        name: /simular empréstimo/i,
      });
      expect(simulatorLink).not.toBeInTheDocument();

      const button = screen.queryByRole("button", {
        name: /simular empréstimo/i,
      });
      expect(button).not.toBeInTheDocument();
    });
  });

  describe("Hook Integration", () => {
    it("should call usePathname hook", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Header />);

      expect(mockUsePathname).toHaveBeenCalled();
    });

    it("should react to pathname changes", () => {
      const { rerender } = render(<Header />);

      // First render - not simulator page
      mockUsePathname.mockReturnValue("/");
      rerender(<Header />);
      expect(
        screen.getByRole("button", { name: /simular empréstimo/i })
      ).toBeInTheDocument();

      // Second render - simulator page
      mockUsePathname.mockReturnValue("/simulador");
      rerender(<Header />);
      expect(
        screen.queryByRole("button", { name: /simular empréstimo/i })
      ).not.toBeInTheDocument();
    });
  });
});
