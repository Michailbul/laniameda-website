"use client";

import { cn } from "@/lib/utils";

interface ProposalBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  isLight?: boolean;
}

export const ProposalBadge = ({ 
  text = "Proposal for Friendroid", 
  isLight = false,
  className,
  ...props
}: ProposalBadgeProps) => {
  return (
    <div className={cn("inline-flex w-fit", className)} {...props}>
      <div
        className={cn(
          "px-4 py-2.5 rounded-xl",
          "backdrop-blur-sm",
          isLight
            ? "bg-gray-100 border border-gray-200"
            : "bg-teal-500/10 border border-teal-500/20"
        )}
      >
        <div className="flex items-center gap-3">
          <span
            className="h-6 w-6 shrink-0 grid place-items-center overflow-hidden"
            aria-hidden="true"
          >
            <FriendroidLogo className="h-full w-full" />
          </span>
          <span className={cn(
            "text-[10px] tracking-[0.5em] uppercase font-medium",
            isLight ? "text-gray-600" : "text-teal-400/90"
          )}>
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};

function FriendroidLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" {...props}>
      {/* Cyan background - no rounded corners */}
      <rect width="100" height="100" fill="#00E5E5" />
      {/* Black rounded diamond */}
      <path
        d="M50 15 C55 15, 80 40, 85 50 C80 60, 55 85, 50 85 C45 85, 20 60, 15 50 C20 40, 45 15, 50 15 Z"
        fill="#0a0a0a"
      />
    </svg>
  );
}
