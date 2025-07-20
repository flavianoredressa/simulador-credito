import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge Component", () => {
  it("should render without crashing", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeTruthy();
  });

  it("should render with default variant", () => {
    const { container } = render(<Badge>Default Badge</Badge>);
    const badge = container.firstChild as HTMLElement;

    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveClass("inline-flex");
    expect(badge).toHaveClass("items-center");
    expect(badge).toHaveClass("rounded-full");
    expect(badge).toHaveClass("bg-gray-100");
    expect(badge).toHaveClass("text-gray-800");
  });

  it("should render with success variant", () => {
    const { container } = render(
      <Badge variant="success">Success Badge</Badge>
    );
    const badge = container.firstChild as HTMLElement;

    expect(badge).toHaveClass("bg-green-50");
    expect(badge).toHaveClass("text-green-800");
  });

  it("should render with warning variant", () => {
    const { container } = render(
      <Badge variant="warning">Warning Badge</Badge>
    );
    const badge = container.firstChild as HTMLElement;

    expect(badge).toHaveClass("bg-orange-50");
    expect(badge).toHaveClass("text-orange-800");
  });

  it("should render with danger variant", () => {
    const { container } = render(<Badge variant="danger">Danger Badge</Badge>);
    const badge = container.firstChild as HTMLElement;

    expect(badge).toHaveClass("bg-red-50");
    expect(badge).toHaveClass("text-red-800");
  });

  it("should render with info variant", () => {
    const { container } = render(<Badge variant="info">Info Badge</Badge>);
    const badge = container.firstChild as HTMLElement;

    expect(badge).toHaveClass("bg-blue-50");
    expect(badge).toHaveClass("text-blue-800");
  });

  it("should render with small size", () => {
    const { container } = render(<Badge size="sm">Small Badge</Badge>);
    const badge = container.firstChild as HTMLElement;

    expect(badge).toHaveClass("px-2");
    expect(badge).toHaveClass("py-1");
    expect(badge).toHaveClass("text-xs");
  });

  it("should render with medium size (default)", () => {
    const { container } = render(<Badge size="md">Medium Badge</Badge>);
    const badge = container.firstChild as HTMLElement;

    expect(badge).toHaveClass("px-3");
    expect(badge).toHaveClass("py-1");
    expect(badge).toHaveClass("text-sm");
  });

  it("should render with large size", () => {
    const { container } = render(<Badge size="lg">Large Badge</Badge>);
    const badge = container.firstChild as HTMLElement;

    expect(badge).toHaveClass("px-4");
    expect(badge).toHaveClass("py-2");
    expect(badge).toHaveClass("text-base");
  });

  it("should apply custom className", () => {
    const { container } = render(
      <Badge className="custom-class">Custom Badge</Badge>
    );
    const badge = container.firstChild as HTMLElement;

    expect(badge).toHaveClass("custom-class");
  });

  it("should pass through additional props", () => {
    const { container } = render(
      <Badge data-testid="test-badge" id="badge-1">
        Badge
      </Badge>
    );
    const badge = container.firstChild as HTMLElement;

    expect(badge).toHaveAttribute("data-testid", "test-badge");
    expect(badge).toHaveAttribute("id", "badge-1");
  });

  it("should handle ref correctly", () => {
    const ref = { current: null };
    render(<Badge ref={ref}>Ref Badge</Badge>);
    expect(ref.current).not.toBeNull();
  });

  it("should have displayName set", () => {
    expect(Badge.displayName).toBe("Badge");
  });
});
