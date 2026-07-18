import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "text";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) => {
  const baseStyles = "font-sans transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  let variantStyles = "";

  switch (variant) {
    case "primary":
      // bg-primary, text-on-primary, rounded-md (12px), text-button-md (18px, 600 weight), py-md px-xl (12px 24px)
      variantStyles = "bg-primary hover:bg-primary/95 text-on-primary text-button-md rounded-md py-md px-xl shadow-sm";
      break;
    case "secondary":
      // bg-ink, text-on-primary, rounded-md, text-button-md, py-md px-xl
      variantStyles = "bg-ink hover:bg-ink-soft text-on-primary text-button-md rounded-md py-md px-xl";
      break;
    case "tertiary":
      // bg-canvas, text-ink, border 1px solid ink, rounded-md, text-button-md, py-md px-xl
      variantStyles = "bg-canvas hover:bg-canvas-soft text-ink border border-ink text-button-md rounded-md py-md px-xl";
      break;
    case "text":
      // bg-canvas, text-ink, rounded-md, text-button-sm (14.4px, 700 weight, 0.144px tracking), py-sm px-lg (8px 16px)
      variantStyles = "bg-canvas hover:bg-canvas-soft text-ink text-button-sm rounded-md py-sm px-lg font-bold tracking-[0.144px]";
      break;
  }

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
