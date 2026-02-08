'use client';

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type FlowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
};

export function FlowButton({
  text = "Modern Button",
  className,
  type = "button",
  ...props
}: FlowButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] border-zinc-200 bg-zinc-900 px-8 py-3 text-sm font-semibold text-white whitespace-nowrap cursor-pointer shadow-sm transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white hover:bg-white hover:text-zinc-900 hover:rounded-[12px] active:scale-[0.95]",
        className,
      )}
      {...props}
    >
      <ArrowRight
        className="absolute w-4 h-4 left-[-25%] stroke-current fill-none z-[9] group-hover:left-4 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      />

      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
        {text}
      </span>

      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-[50%] opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]" />

      <ArrowRight
        className="absolute w-4 h-4 right-4 stroke-current fill-none z-[9] group-hover:right-[-25%] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      />
    </button>
  );
}
