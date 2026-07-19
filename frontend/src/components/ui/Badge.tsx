import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "pill";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "pill",
  className = "",
  ...props
}) => {
  // bg-canvas-soft, text-ink, text-body-sm (16px), rounded-pill (9999px), py-xs px-md (4px 12px)
  const baseStyles = "inline-flex items-center justify-center font-sans font-medium border border-ink/10 select-none";
  let variantStyles = "";

  if (variant === "pill") {
    variantStyles = "bg-canvas-soft text-ink text-body-sm rounded-pill py-xs px-md";
  }

  return (
    <span
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
