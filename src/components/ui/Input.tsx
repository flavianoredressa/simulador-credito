import { InputHTMLAttributes, forwardRef, useId } from "react";
import { cn } from "../../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  prefix?: string;
  suffix?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, label, error, helperText, prefix, suffix, id, ...props },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-3 text-gray-500 pointer-events-none">
              {prefix}
            </span>
          )}

          <input
            id={inputId}
            className={cn(
              "w-full px-4 py-3 border bg-white border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:ring-offset-2 text-gray-900 placeholder:text-gray-500 transition-all duration-200",
              prefix && "pl-12",
              suffix && "pr-12",
              error && "border-red-300 focus:ring-red-500 focus:border-red-500",
              className
            )}
            ref={ref}
            {...props}
          />

          {suffix && (
            <span className="absolute right-3 top-3 text-gray-500 pointer-events-none">
              {suffix}
            </span>
          )}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {helperText && !error && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
