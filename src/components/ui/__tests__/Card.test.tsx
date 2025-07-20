import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../Card";

describe("Card Components", () => {
  describe("Card", () => {
    it("should render without crashing", () => {
      render(<Card>Card Content</Card>);
      expect(screen.getByText("Card Content")).toBeTruthy();
    });

    it("should render with default variant", () => {
      const { container } = render(<Card>Default Card</Card>);
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass("bg-white");
      expect(card).toHaveClass("rounded-lg");
      expect(card).toHaveClass("border");
      expect(card).toHaveClass("border-gray-200");
    });

    it("should render with elevated variant", () => {
      const { container } = render(
        <Card variant="elevated">Elevated Card</Card>
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass("bg-white");
      expect(card).toHaveClass("rounded-2xl");
      expect(card).toHaveClass("shadow-xl");
    });

    it("should render with outlined variant", () => {
      const { container } = render(
        <Card variant="outlined">Outlined Card</Card>
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass("bg-white");
      expect(card).toHaveClass("rounded-lg");
      expect(card).toHaveClass("border-2");
      expect(card).toHaveClass("border-gray-300");
    });

    it("should apply custom className", () => {
      const { container } = render(<Card className="custom-class">Card</Card>);
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveClass("custom-class");
    });

    it("should pass through additional props", () => {
      const { container } = render(
        <Card data-testid="test-card" id="card-1">
          Card
        </Card>
      );
      const card = container.firstChild as HTMLElement;

      expect(card).toHaveAttribute("data-testid", "test-card");
      expect(card).toHaveAttribute("id", "card-1");
    });

    it("should handle ref correctly", () => {
      const ref = { current: null };
      render(<Card ref={ref}>Card</Card>);
      expect(ref.current).not.toBeNull();
    });

    it("should have displayName set", () => {
      expect(Card.displayName).toBe("Card");
    });
  });

  describe("CardHeader", () => {
    it("should render without crashing", () => {
      render(<CardHeader>Header Content</CardHeader>);
      expect(screen.getByText("Header Content")).toBeTruthy();
    });

    it("should have correct default styling", () => {
      const { container } = render(<CardHeader>Header</CardHeader>);
      const header = container.firstChild as HTMLElement;

      expect(header).toHaveClass("p-6");
      expect(header).toHaveClass("pb-4");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <CardHeader className="custom-header">Header</CardHeader>
      );
      const header = container.firstChild as HTMLElement;

      expect(header).toHaveClass("custom-header");
    });

    it("should have displayName set", () => {
      expect(CardHeader.displayName).toBe("CardHeader");
    });
  });

  describe("CardContent", () => {
    it("should render without crashing", () => {
      render(<CardContent>Content</CardContent>);
      expect(screen.getByText("Content")).toBeTruthy();
    });

    it("should have correct default styling", () => {
      const { container } = render(<CardContent>Content</CardContent>);
      const content = container.firstChild as HTMLElement;

      expect(content).toHaveClass("p-6");
      expect(content).toHaveClass("pt-0");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <CardContent className="custom-content">Content</CardContent>
      );
      const content = container.firstChild as HTMLElement;

      expect(content).toHaveClass("custom-content");
    });

    it("should have displayName set", () => {
      expect(CardContent.displayName).toBe("CardContent");
    });
  });

  describe("CardTitle", () => {
    it("should render without crashing", () => {
      render(<CardTitle>Title</CardTitle>);
      expect(screen.getByText("Title")).toBeTruthy();
    });

    it("should render as h3 element", () => {
      const { container } = render(<CardTitle>Title</CardTitle>);
      const title = container.firstChild as HTMLElement;

      expect(title.tagName).toBe("H3");
    });

    it("should have correct default styling", () => {
      const { container } = render(<CardTitle>Title</CardTitle>);
      const title = container.firstChild as HTMLElement;

      expect(title).toHaveClass("text-2xl");
      expect(title).toHaveClass("font-semibold");
      expect(title).toHaveClass("text-gray-900");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <CardTitle className="custom-title">Title</CardTitle>
      );
      const title = container.firstChild as HTMLElement;

      expect(title).toHaveClass("custom-title");
    });

    it("should have displayName set", () => {
      expect(CardTitle.displayName).toBe("CardTitle");
    });
  });

  describe("CardDescription", () => {
    it("should render without crashing", () => {
      render(<CardDescription>Description</CardDescription>);
      expect(screen.getByText("Description")).toBeTruthy();
    });

    it("should render as p element", () => {
      const { container } = render(
        <CardDescription>Description</CardDescription>
      );
      const description = container.firstChild as HTMLElement;

      expect(description.tagName).toBe("P");
    });

    it("should have correct default styling", () => {
      const { container } = render(
        <CardDescription>Description</CardDescription>
      );
      const description = container.firstChild as HTMLElement;

      expect(description).toHaveClass("text-sm");
      expect(description).toHaveClass("text-gray-600");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <CardDescription className="custom-desc">Desc</CardDescription>
      );
      const description = container.firstChild as HTMLElement;

      expect(description).toHaveClass("custom-desc");
    });

    it("should have displayName set", () => {
      expect(CardDescription.displayName).toBe("CardDescription");
    });
  });

  describe("Card Integration", () => {
    it("should render complete card structure", () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content goes here</p>
          </CardContent>
        </Card>
      );

      expect(screen.getByText("Card Title")).toBeTruthy();
      expect(screen.getByText("Card Description")).toBeTruthy();
      expect(screen.getByText("Card content goes here")).toBeTruthy();
    });
  });
});
