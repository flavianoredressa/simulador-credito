/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import {
  FadeIn,
  SlideInLeft,
  SlideInRight,
  ScaleIn,
  Bounce,
  Pulse,
  StaggerContainer,
  StaggerChild,
  useHoverAnimation,
} from "../MotionComponents";

// Mock Framer Motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      initial,
      animate,
      transition,
      variants,
      whileHover,
      whileTap,
      ...props
    }: {
      children?: React.ReactNode;
      className?: string;
      initial?: any;
      animate?: any;
      transition?: any;
      variants?: any;
      whileHover?: any;
      whileTap?: any;
      [key: string]: any;
    }) => (
      <div
        className={className}
        data-initial={JSON.stringify(initial)}
        data-animate={JSON.stringify(animate)}
        data-transition={JSON.stringify(transition)}
        data-variants={JSON.stringify(variants)}
        data-while-hover={JSON.stringify(whileHover)}
        data-while-tap={JSON.stringify(whileTap)}
        {...props}
      >
        {children}
      </div>
    ),
  },
}));

// Test component for useHoverAnimation hook
const TestHoverComponent = () => {
  const hoverProps = useHoverAnimation();
  return (
    <div
      data-testid="hover-component"
      data-while-hover={JSON.stringify(hoverProps.whileHover)}
      data-while-tap={JSON.stringify(hoverProps.whileTap)}
      data-transition={JSON.stringify(hoverProps.transition)}
    >
      Hover Test
    </div>
  );
};

describe("MotionComponents", () => {
  describe("FadeIn", () => {
    it("should render children with correct initial and animate properties", () => {
      render(
        <FadeIn data-testid="fade-in">
          <div>Test Content</div>
        </FadeIn>
      );

      const element = screen.getByTestId("fade-in");
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Test Content");
      expect(element).toHaveAttribute(
        "data-initial",
        JSON.stringify({ opacity: 0, y: 20 })
      );
      expect(element).toHaveAttribute(
        "data-animate",
        JSON.stringify({ opacity: 1, y: 0 })
      );
    });

    it("should use default delay and duration values", () => {
      render(
        <FadeIn data-testid="fade-in">
          <div>Test Content</div>
        </FadeIn>
      );

      const element = screen.getByTestId("fade-in");
      const transition = JSON.parse(
        element.getAttribute("data-transition") || "{}"
      );
      expect(transition.delay).toBe(0);
      expect(transition.duration).toBe(0.5);
    });

    it("should use custom delay and duration values", () => {
      render(
        <FadeIn delay={1} duration={2} data-testid="fade-in">
          <div>Test Content</div>
        </FadeIn>
      );

      const element = screen.getByTestId("fade-in");
      const transition = JSON.parse(
        element.getAttribute("data-transition") || "{}"
      );
      expect(transition.delay).toBe(1);
      expect(transition.duration).toBe(2);
    });

    it("should apply custom className", () => {
      render(
        <FadeIn className="custom-class" data-testid="fade-in">
          <div>Test Content</div>
        </FadeIn>
      );

      const element = screen.getByTestId("fade-in");
      expect(element).toHaveClass("custom-class");
    });

    it("should spread additional props", () => {
      render(
        <FadeIn id="custom-id" data-testid="fade-in">
          <div>Test Content</div>
        </FadeIn>
      );

      const element = screen.getByTestId("fade-in");
      expect(element).toHaveAttribute("id", "custom-id");
    });
  });

  describe("SlideInLeft", () => {
    it("should render children with correct initial and animate properties", () => {
      render(
        <SlideInLeft data-testid="slide-left">
          <div>Test Content</div>
        </SlideInLeft>
      );

      const element = screen.getByTestId("slide-left");
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Test Content");
      expect(element).toHaveAttribute(
        "data-initial",
        JSON.stringify({ opacity: 0, x: -50 })
      );
      expect(element).toHaveAttribute(
        "data-animate",
        JSON.stringify({ opacity: 1, x: 0 })
      );
    });

    it("should use default delay and duration values", () => {
      render(
        <SlideInLeft data-testid="slide-left">
          <div>Test Content</div>
        </SlideInLeft>
      );

      const element = screen.getByTestId("slide-left");
      const transition = JSON.parse(
        element.getAttribute("data-transition") || "{}"
      );
      expect(transition.delay).toBe(0);
      expect(transition.duration).toBe(0.5);
    });

    it("should use custom delay and duration values", () => {
      render(
        <SlideInLeft delay={0.5} duration={1.5} data-testid="slide-left">
          <div>Test Content</div>
        </SlideInLeft>
      );

      const element = screen.getByTestId("slide-left");
      const transition = JSON.parse(
        element.getAttribute("data-transition") || "{}"
      );
      expect(transition.delay).toBe(0.5);
      expect(transition.duration).toBe(1.5);
    });

    it("should apply custom className", () => {
      render(
        <SlideInLeft className="slide-class" data-testid="slide-left">
          <div>Test Content</div>
        </SlideInLeft>
      );

      const element = screen.getByTestId("slide-left");
      expect(element).toHaveClass("slide-class");
    });
  });

  describe("SlideInRight", () => {
    it("should render children with correct initial and animate properties", () => {
      render(
        <SlideInRight data-testid="slide-right">
          <div>Test Content</div>
        </SlideInRight>
      );

      const element = screen.getByTestId("slide-right");
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Test Content");
      expect(element).toHaveAttribute(
        "data-initial",
        JSON.stringify({ opacity: 0, x: 50 })
      );
      expect(element).toHaveAttribute(
        "data-animate",
        JSON.stringify({ opacity: 1, x: 0 })
      );
    });

    it("should use default delay and duration values", () => {
      render(
        <SlideInRight data-testid="slide-right">
          <div>Test Content</div>
        </SlideInRight>
      );

      const element = screen.getByTestId("slide-right");
      const transition = JSON.parse(
        element.getAttribute("data-transition") || "{}"
      );
      expect(transition.delay).toBe(0);
      expect(transition.duration).toBe(0.5);
    });

    it("should use custom delay and duration values", () => {
      render(
        <SlideInRight delay={0.3} duration={1.2} data-testid="slide-right">
          <div>Test Content</div>
        </SlideInRight>
      );

      const element = screen.getByTestId("slide-right");
      const transition = JSON.parse(
        element.getAttribute("data-transition") || "{}"
      );
      expect(transition.delay).toBe(0.3);
      expect(transition.duration).toBe(1.2);
    });

    it("should apply custom className", () => {
      render(
        <SlideInRight className="slide-right-class" data-testid="slide-right">
          <div>Test Content</div>
        </SlideInRight>
      );

      const element = screen.getByTestId("slide-right");
      expect(element).toHaveClass("slide-right-class");
    });
  });

  describe("ScaleIn", () => {
    it("should render children with correct initial and animate properties", () => {
      render(
        <ScaleIn data-testid="scale-in">
          <div>Test Content</div>
        </ScaleIn>
      );

      const element = screen.getByTestId("scale-in");
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Test Content");
      expect(element).toHaveAttribute(
        "data-initial",
        JSON.stringify({ opacity: 0, scale: 0.8 })
      );
      expect(element).toHaveAttribute(
        "data-animate",
        JSON.stringify({ opacity: 1, scale: 1 })
      );
    });

    it("should use spring transition with correct properties", () => {
      render(
        <ScaleIn data-testid="scale-in">
          <div>Test Content</div>
        </ScaleIn>
      );

      const element = screen.getByTestId("scale-in");
      const transition = JSON.parse(
        element.getAttribute("data-transition") || "{}"
      );
      expect(transition.delay).toBe(0);
      expect(transition.duration).toBe(0.5);
      expect(transition.type).toBe("spring");
      expect(transition.stiffness).toBe(100);
    });

    it("should use custom delay and duration values", () => {
      render(
        <ScaleIn delay={0.8} duration={2.5} data-testid="scale-in">
          <div>Test Content</div>
        </ScaleIn>
      );

      const element = screen.getByTestId("scale-in");
      const transition = JSON.parse(
        element.getAttribute("data-transition") || "{}"
      );
      expect(transition.delay).toBe(0.8);
      expect(transition.duration).toBe(2.5);
      expect(transition.type).toBe("spring");
      expect(transition.stiffness).toBe(100);
    });

    it("should apply custom className", () => {
      render(
        <ScaleIn className="scale-class" data-testid="scale-in">
          <div>Test Content</div>
        </ScaleIn>
      );

      const element = screen.getByTestId("scale-in");
      expect(element).toHaveClass("scale-class");
    });
  });

  describe("Bounce", () => {
    it("should render children with correct animate properties", () => {
      render(
        <Bounce data-testid="bounce">
          <div>Test Content</div>
        </Bounce>
      );

      const element = screen.getByTestId("bounce");
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Test Content");

      const animateStr = element.getAttribute("data-animate") || "{}";
      expect(animateStr).toContain('"y":[0,-10,0]');
      expect(animateStr).toContain('"duration":2');
      expect(animateStr).toContain('"repeat":null'); // Infinity gets serialized as null
      expect(animateStr).toContain('"repeatType":"reverse"');
    });

    it("should apply custom className", () => {
      render(
        <Bounce className="bounce-class" data-testid="bounce">
          <div>Test Content</div>
        </Bounce>
      );

      const element = screen.getByTestId("bounce");
      expect(element).toHaveClass("bounce-class");
    });

    it("should spread additional props", () => {
      render(
        <Bounce data-custom="value" data-testid="bounce">
          <div>Test Content</div>
        </Bounce>
      );

      const element = screen.getByTestId("bounce");
      expect(element).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Pulse", () => {
    it("should render children with correct animate properties", () => {
      render(
        <Pulse data-testid="pulse">
          <div>Test Content</div>
        </Pulse>
      );

      const element = screen.getByTestId("pulse");
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Test Content");

      const animateStr = element.getAttribute("data-animate") || "{}";
      expect(animateStr).toContain('"scale":[1,1.05,1]');
      expect(animateStr).toContain('"duration":1.5');
      expect(animateStr).toContain('"repeat":null'); // Infinity gets serialized as null
      expect(animateStr).toContain('"repeatType":"reverse"');
    });

    it("should apply custom className", () => {
      render(
        <Pulse className="pulse-class" data-testid="pulse">
          <div>Test Content</div>
        </Pulse>
      );

      const element = screen.getByTestId("pulse");
      expect(element).toHaveClass("pulse-class");
    });

    it("should spread additional props", () => {
      render(
        <Pulse id="pulse-id" data-testid="pulse">
          <div>Test Content</div>
        </Pulse>
      );

      const element = screen.getByTestId("pulse");
      expect(element).toHaveAttribute("id", "pulse-id");
    });
  });

  describe("StaggerContainer", () => {
    it("should render children with correct variants and initial/animate states", () => {
      render(
        <StaggerContainer data-testid="stagger-container">
          <div>Child 1</div>
          <div>Child 2</div>
        </StaggerContainer>
      );

      const element = screen.getByTestId("stagger-container");
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Child 1Child 2");
      expect(element).toHaveAttribute("data-initial", '"hidden"');
      expect(element).toHaveAttribute("data-animate", '"visible"');

      const variants = JSON.parse(
        element.getAttribute("data-variants") || "{}"
      );
      expect(variants.hidden).toEqual({});
      expect(variants.visible.transition.staggerChildren).toBe(0.1);
    });

    it("should use custom staggerDelay", () => {
      render(
        <StaggerContainer staggerDelay={0.3} data-testid="stagger-container">
          <div>Child 1</div>
        </StaggerContainer>
      );

      const element = screen.getByTestId("stagger-container");
      const variants = JSON.parse(
        element.getAttribute("data-variants") || "{}"
      );
      expect(variants.visible.transition.staggerChildren).toBe(0.3);
    });

    it("should apply custom className", () => {
      render(
        <StaggerContainer
          className="stagger-class"
          data-testid="stagger-container"
        >
          <div>Child</div>
        </StaggerContainer>
      );

      const element = screen.getByTestId("stagger-container");
      expect(element).toHaveClass("stagger-class");
    });

    it("should spread additional props", () => {
      render(
        <StaggerContainer role="group" data-testid="stagger-container">
          <div>Child</div>
        </StaggerContainer>
      );

      const element = screen.getByTestId("stagger-container");
      expect(element).toHaveAttribute("role", "group");
    });
  });

  describe("StaggerChild", () => {
    it("should render children with correct variants", () => {
      render(
        <StaggerChild data-testid="stagger-child">
          <div>Child Content</div>
        </StaggerChild>
      );

      const element = screen.getByTestId("stagger-child");
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Child Content");

      const variants = JSON.parse(
        element.getAttribute("data-variants") || "{}"
      );
      expect(variants.hidden).toEqual({ opacity: 0, y: 20 });
      expect(variants.visible).toEqual({ opacity: 1, y: 0 });
    });

    it("should apply custom className", () => {
      render(
        <StaggerChild className="child-class" data-testid="stagger-child">
          <div>Child Content</div>
        </StaggerChild>
      );

      const element = screen.getByTestId("stagger-child");
      expect(element).toHaveClass("child-class");
    });

    it("should spread additional props", () => {
      render(
        <StaggerChild aria-label="stagger child" data-testid="stagger-child">
          <div>Child Content</div>
        </StaggerChild>
      );

      const element = screen.getByTestId("stagger-child");
      expect(element).toHaveAttribute("aria-label", "stagger child");
    });
  });

  describe("useHoverAnimation hook", () => {
    it("should return correct hover animation properties", () => {
      render(<TestHoverComponent />);

      const element = screen.getByTestId("hover-component");
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent("Hover Test");

      const whileHover = JSON.parse(
        element.getAttribute("data-while-hover") || "{}"
      );
      const whileTap = JSON.parse(
        element.getAttribute("data-while-tap") || "{}"
      );
      const transition = JSON.parse(
        element.getAttribute("data-transition") || "{}"
      );

      expect(whileHover).toEqual({ scale: 1.05 });
      expect(whileTap).toEqual({ scale: 0.95 });
      expect(transition.type).toBe("spring");
      expect(transition.stiffness).toBe(400);
      expect(transition.damping).toBe(17);
    });
  });

  describe("Complex scenarios", () => {
    it("should work with nested components", () => {
      render(
        <StaggerContainer data-testid="parent">
          <StaggerChild data-testid="child1">
            <FadeIn data-testid="grandchild1">
              <div>Nested Content 1</div>
            </FadeIn>
          </StaggerChild>
          <StaggerChild data-testid="child2">
            <ScaleIn data-testid="grandchild2">
              <div>Nested Content 2</div>
            </ScaleIn>
          </StaggerChild>
        </StaggerContainer>
      );

      expect(screen.getByTestId("parent")).toBeInTheDocument();
      expect(screen.getByTestId("child1")).toBeInTheDocument();
      expect(screen.getByTestId("child2")).toBeInTheDocument();
      expect(screen.getByTestId("grandchild1")).toBeInTheDocument();
      expect(screen.getByTestId("grandchild2")).toBeInTheDocument();
      expect(screen.getByText("Nested Content 1")).toBeInTheDocument();
      expect(screen.getByText("Nested Content 2")).toBeInTheDocument();
    });

    it("should handle multiple animation types together", () => {
      render(
        <div>
          <FadeIn delay={0.1} data-testid="fade">
            Fade
          </FadeIn>
          <SlideInLeft delay={0.2} data-testid="slide">
            Slide
          </SlideInLeft>
          <Bounce data-testid="bounce">Bounce</Bounce>
          <Pulse data-testid="pulse">Pulse</Pulse>
        </div>
      );

      expect(screen.getByTestId("fade")).toBeInTheDocument();
      expect(screen.getByTestId("slide")).toBeInTheDocument();
      expect(screen.getByTestId("bounce")).toBeInTheDocument();
      expect(screen.getByTestId("pulse")).toBeInTheDocument();
    });

    it("should handle empty children", () => {
      render(
        <div>
          <FadeIn data-testid="empty-fade">
            <div></div>
          </FadeIn>
          <SlideInLeft data-testid="empty-slide">
            <div></div>
          </SlideInLeft>
          <ScaleIn data-testid="empty-scale">
            <div></div>
          </ScaleIn>
        </div>
      );

      expect(screen.getByTestId("empty-fade")).toBeInTheDocument();
      expect(screen.getByTestId("empty-slide")).toBeInTheDocument();
      expect(screen.getByTestId("empty-scale")).toBeInTheDocument();
    });

    it("should handle string children", () => {
      render(
        <div>
          <FadeIn data-testid="string-fade">String Content</FadeIn>
          <SlideInRight data-testid="string-slide">Another String</SlideInRight>
          <ScaleIn data-testid="string-scale">Scale String</ScaleIn>
        </div>
      );

      expect(screen.getByTestId("string-fade")).toHaveTextContent(
        "String Content"
      );
      expect(screen.getByTestId("string-slide")).toHaveTextContent(
        "Another String"
      );
      expect(screen.getByTestId("string-scale")).toHaveTextContent(
        "Scale String"
      );
    });
  });
});
