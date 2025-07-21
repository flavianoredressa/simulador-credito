import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "../Input";

describe("Input Component", () => {
  it("should render without crashing", () => {
    render(<Input />);

    const input = screen.getByRole("textbox");
    expect(input).toBeTruthy();
  });

  it("should render with label", () => {
    render(<Input label="Test Label" />);

    expect(screen.getByText("Test Label")).toBeTruthy();
    expect(screen.getByLabelText("Test Label")).toBeTruthy();
  });

  it("should render with error message", () => {
    render(<Input error="This field is required" />);

    expect(screen.getByText("This field is required")).toBeTruthy();

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass(
      "border-red-300",
      "focus:ring-red-500",
      "focus:border-red-500"
    );
  });

  it("should render with helper text", () => {
    render(<Input helperText="Enter your email address" />);

    expect(screen.getByText("Enter your email address")).toBeTruthy();
  });

  it("should not show helper text when error is present", () => {
    render(<Input helperText="Helper text" error="Error message" />);

    expect(screen.getByText("Error message")).toBeTruthy();
    expect(screen.queryByText("Helper text")).toBeNull();
  });

  it("should render with prefix", () => {
    render(<Input prefix="R$" />);

    expect(screen.getByText("R$")).toBeTruthy();

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("pl-10");
  });

  it("should render with suffix", () => {
    render(<Input suffix="%" />);

    expect(screen.getByText("%")).toBeTruthy();

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("pr-10");
  });

  it("should render with both prefix and suffix", () => {
    render(<Input prefix="$" suffix="USD" />);

    expect(screen.getByText("$")).toBeTruthy();
    expect(screen.getByText("USD")).toBeTruthy();

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("pl-10", "pr-10");
  });

  it("should apply custom className", () => {
    render(<Input className="custom-class" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("custom-class");
  });

  it("should generate unique id if not provided", () => {
    const { container: firstContainer } = render(<Input label="First" />);
    const firstInput = firstContainer.querySelector("input");
    const firstId = firstInput?.getAttribute("id");

    const { container: secondContainer } = render(<Input label="Second" />);
    const secondInput = secondContainer.querySelector("input");
    const secondId = secondInput?.getAttribute("id");

    expect(firstId).toBeTruthy();
    expect(secondId).toBeTruthy();
    expect(firstId).not.toBe(secondId);
  });

  it("should use provided id", () => {
    render(<Input id="custom-id" label="Test" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("id", "custom-id");

    const label = screen.getByText("Test");
    expect(label).toHaveAttribute("for", "custom-id");
  });

  it("should handle input changes", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<Input onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await user.type(input, "test value");

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue("test value");
  });

  it("should forward ref correctly", () => {
    const ref = { current: null as HTMLInputElement | null };
    render(<Input ref={ref} />);

    expect(ref.current).toBeTruthy();
    expect(ref.current?.tagName.toLowerCase()).toBe("input");
  });

  it("should pass through HTML input props", () => {
    render(
      <Input
        type="email"
        placeholder="Enter email"
        disabled
        required
        maxLength={50}
      />
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("placeholder", "Enter email");
    expect(input).toBeDisabled();
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("maxLength", "50");
  });

  it("should have proper styling classes", () => {
    render(<Input />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass(
      "w-full",
      "px-3",
      "py-2.5",
      "border",
      "bg-white",
      "border-gray-300",
      "rounded-lg",
      "text-gray-900",
      "placeholder:text-gray-500",
      "transition-all",
      "duration-200"
    );
  });

  it("should have correct container structure", () => {
    const { container } = render(<Input label="Test" error="Error" />);

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass("space-y-1.5");
  });

  it("should handle focus and blur events", async () => {
    const user = userEvent.setup();
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);

    const input = screen.getByRole("textbox");

    await user.click(input);
    expect(handleFocus).toHaveBeenCalled();

    await user.tab();
    expect(handleBlur).toHaveBeenCalled();
  });

  it("should render all elements in correct order", () => {
    const { container } = render(
      <Input label="Test Label" prefix="$" suffix="%" helperText="Helper" />
    );

    const wrapper = container.firstChild;
    const children = wrapper?.childNodes;

    // Should have label, input container, and helper text
    expect(children).toHaveLength(3);
  });

  it("should have displayName set correctly", () => {
    expect(Input.displayName).toBe("Input");
  });
});
