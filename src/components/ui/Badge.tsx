import { HTMLAttributes, forwardRef } from "react";

// Utility function to combine classes
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(" ");
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variants = {
      default: "bg-gray-100 text-gray-800",
      success: "bg-green-50 text-green-800",
      warning: "bg-orange-50 text-orange-800",
      danger: "bg-red-50 text-red-800",
      info: "bg-blue-50 text-blue-800",
    };

    const sizes = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-1 text-sm",
      lg: "px-4 py-2 text-base",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center font-medium rounded-full",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
