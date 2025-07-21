import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

    const variants = {
      primary:
        "bg-[#8EDB00] hover:bg-[#76B800] text-[#50504F] focus:ring-2 focus:ring-[#8EDB00] shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200",
      secondary:
        "bg-[#50504F] hover:bg-[#3A3A3A] text-white focus:ring-2 focus:ring-[#50504F] transition-all duration-200",
      outline:
        "border-2 border-[#8EDB00] text-[#8EDB00] hover:bg-[#8EDB00] hover:text-white focus:ring-2 focus:ring-[#8EDB00] transition-all duration-200",
      ghost:
        "text-[#8EDB00] hover:bg-[#F4FDE0] focus:ring-2 focus:ring-[#8EDB00] transition-all duration-200",
    };
    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
