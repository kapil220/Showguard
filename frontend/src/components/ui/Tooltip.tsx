import React, { useState } from "react";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-[#201515] border-x-transparent border-b-transparent border-[5px]",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-[#201515] border-x-transparent border-t-transparent border-[5px]",
    left: "left-full top-1/2 -translate-y-1/2 border-l-[#201515] border-y-transparent border-r-transparent border-[5px]",
    right: "right-full top-1/2 -translate-y-1/2 border-r-[#201515] border-y-transparent border-l-transparent border-[5px]",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-[9999] max-w-[280px] w-max bg-[#201515] text-[#fffefb] text-xs p-3 rounded-md shadow-xl border border-zinc-800 pointer-events-none transition-all duration-150 font-sans leading-relaxed ${positionClasses[position]}`}
        >
          {content}
          <div className={`absolute ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  );
};
