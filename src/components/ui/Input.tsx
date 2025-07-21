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
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[#50504F]"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {prefix && (
            <span className="absolute left-3 top-2.5 text-gray-500 pointer-events-none text-sm">
              {prefix}
            </span>
          )}

          <input
            id={inputId}
            className={cn(
              "w-full px-3 py-2.5 border bg-white border-gray-300 rounded-lg text-gray-900 placeholder:text-gray-500 transition-all duration-200 hover:border-gray-400 text-sm",
              prefix && "pl-10",
              suffix && "pr-10",
              error && "border-red-300 focus:ring-red-500 focus:border-red-500",
              className
            )}
            ref={ref}
            {...props}
          />

          {suffix && (
            <span className="absolute right-3 top-2.5 text-gray-500 pointer-events-none text-sm">
              {suffix}
            </span>
          )}
        </div>

        {error && <p className="text-xs text-red-600">{error}</p>}

        {helperText && !error && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
