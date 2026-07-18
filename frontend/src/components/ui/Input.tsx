import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = "",
  id,
  type = "text",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const isPassword = type === "password";

  // Determine current input type to display
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-xxs w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-body-sm font-semibold text-body select-none"
        >
          {label}
        </label>
      )}
      
      <div className="relative w-full">
        <input
          id={inputId}
          type={resolvedType}
          className={`bg-canvas text-ink border border-ink rounded-sm py-md w-full text-body-md placeholder:text-mute focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            isPassword ? "pr-11 pl-lg" : "px-lg"
          } ${error ? "border-primary/80 ring-2 ring-primary/20" : ""} ${className}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-md top-1/2 -translate-y-1/2 p-xs text-mute hover:text-body-mid focus:outline-none focus:text-body-mid transition-colors duration-200 cursor-pointer select-none flex items-center justify-center"
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5 opacity-40 hover:opacity-70 transition-opacity duration-200" />
            ) : (
              <EyeIcon className="w-5 h-5 opacity-40 hover:opacity-70 transition-opacity duration-200" />
            )}
          </button>
        )}
      </div>

      {error ? (
        <span className="text-caption text-primary font-medium mt-[2px]">
          {error}
        </span>
      ) : helperText ? (
        <span className="text-caption text-body-mid mt-[2px]">
          {helperText}
        </span>
      ) : null}
    </div>
  );
};
