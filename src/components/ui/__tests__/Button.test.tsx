import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

describe("Button Component", () => {
  it("should render with default props", () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-[#8EDB00]", "px-4", "py-3"); // primary variant, md size
  });

  it("should render different variants", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-[#8EDB00]");

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-[#50504F]");

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByRole("button")).toHaveClass("border-[#8EDB00]");

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button")).toHaveClass("text-[#8EDB00]");
  });

  it("should render different sizes", () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole("button")).toHaveClass("px-3", "py-2", "text-sm");

    rerender(<Button size="md">Medium</Button>);
    expect(screen.getByRole("button")).toHaveClass("px-4", "py-3", "text-base");

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole("button")).toHaveClass("px-8", "py-4", "text-lg");
  });

  it("should handle click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass(
      "disabled:opacity-50",
      "disabled:cursor-not-allowed"
    );
  });

  it("should not trigger click when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should accept custom className", () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  it("should forward additional props", () => {
    render(
      <Button data-testid="custom-button" aria-label="Custom label">
        Test
      </Button>
    );

    const button = screen.getByTestId("custom-button");
    expect(button).toHaveAttribute("aria-label", "Custom label");
  });

  it("should have proper focus styles", () => {
    render(<Button>Focus me</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-offset-2"
    );
  });

  it("should have hover effects", () => {
    render(<Button variant="primary">Hover me</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(
      "hover:bg-[#76B800]",
      "transform",
      "hover:scale-105"
    );
  });

  it("should render children correctly", () => {
    render(
      <Button>
        <span>Icon</span>
        Text Content
      </Button>
    );

    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByText("Text Content")).toBeInTheDocument();
  });
});
