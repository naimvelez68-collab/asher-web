"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: React.ReactNode;
  /** Color del blob en hover. Por defecto #c9a96e */
  blobColor?: string;
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", icon, blobColor = "#c9a96e", className, style, ...props }, ref) => {
  return (
    <button
      ref={ref}
      style={style}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full font-semibold",
        "flex items-center justify-center",
        className
      )}
      {...props}
    >
      {/* Blob — invisible en reposo, se expande en hover */}
      <span
        className="pointer-events-none absolute left-[18%] top-[38%] h-2 w-2 rounded-full opacity-0 transition-all duration-300 ease-out group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-[1.6] group-hover:opacity-100"
        style={{ background: blobColor }}
        aria-hidden="true"
      />

      {/* Texto en reposo — sale hacia la derecha */}
      <span className="relative z-10 whitespace-nowrap transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0">
        {text}
      </span>

      {/* Texto + ícono en hover — entra desde la derecha */}
      <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <span className="whitespace-nowrap">{text}</span>
        {icon ?? <ArrowRight className="h-4 w-4 flex-shrink-0" />}
      </span>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export { InteractiveHoverButton };
