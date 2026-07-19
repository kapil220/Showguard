import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "cream" | "dark" | "outline";
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = "cream",
  className = "",
  ...props
}) => {
  // rounded-md (12px), p-xl (24px), text-body-md (18px)
  let variantStyles = "";

  switch (variant) {
    case "cream":
      // bg-canvas-soft, text-ink, padding xl, rounded-md
      variantStyles = "bg-canvas-soft text-ink border border-ink/5 rounded-md p-xl text-body-md";
      break;
    case "dark":
      // bg-ink, text-on-primary, padding xl, rounded-md
      variantStyles = "bg-ink text-on-primary rounded-md p-xl text-body-md";
      break;
    case "outline":
      // bg-canvas, text-ink, border 1px solid ink, padding xl, rounded-md
      variantStyles = "bg-canvas text-ink border border-ink rounded-md p-xl text-body-md";
      break;
  }

  return (
    <div
      className={`${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
