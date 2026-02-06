"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Social media brand icons as inline SVGs
const InstagramIcon = ({ x, y, size = 5 }: { x: number; y: number; size?: number }) => (
  <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5"/>
    <circle cx="18" cy="6" r="1" fill="white"/>
  </svg>
);

const YouTubeIcon = ({ x, y, size = 5 }: { x: number; y: number; size?: number }) => (
  <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="14" rx="3" stroke="white" strokeWidth="1.5"/>
    <polygon points="10,9 16,12 10,15" fill="white"/>
  </svg>
);

const LinkedInIcon = ({ x, y, size = 5 }: { x: number; y: number; size?: number }) => (
  <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="2" stroke="white" strokeWidth="1.5"/>
    <path d="M8 11v5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="8" cy="8" r="1" fill="white"/>
    <path d="M12 16v-5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 11c0-2 2-2 2-2v5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const TikTokIcon = ({ x, y, size = 5 }: { x: number; y: number; size?: number }) => (
  <svg x={x} y={y} width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M9 12a4 4 0 1 0 4 4V5c2 2 4 4 6 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface DatabaseWithRestApiProps {
  className?: string;
  circleText?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  buttonTexts?: {
    first: string;
    second: string;
  };
  title?: string;
  lightColor?: string;
}

const DatabaseWithRestApi = ({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor,
}: DatabaseWithRestApiProps) => {
  return (
    <div
      className={cn(
        "relative flex h-[350px] w-full max-w-[500px] flex-col items-center",
        className
      )}
    >
      <svg
        className="h-full sm:w-full text-muted"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
      >
        <g
          stroke="currentColor"
          fill="none"
          strokeWidth="0.4"
          strokeDasharray="100 100"
          pathLength="100"
        >
          <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
          <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
          <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
          <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        </g>

        <g mask="url(#db-mask-1)">
          <circle
            className="database db-light-1"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-2)">
          <circle
            className="database db-light-2"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-3)">
          <circle
            className="database db-light-3"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-4)">
          <circle
            className="database db-light-4"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>

        <g stroke="currentColor" fill="none" strokeWidth="0.4">
          <g>
            <rect
              fill="#0B0E10"
              x="14"
              y="5"
              width="34"
              height="10"
              rx="5"
            />
            <InstagramIcon x={17} y={6.5} />
            <text
              x="28"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.first || "GET"}
            </text>
          </g>
          <g>
            <rect
              fill="#0B0E10"
              x="60"
              y="5"
              width="34"
              height="10"
              rx="5"
            />
            <YouTubeIcon x={63} y={6.5} />
            <text
              x="74"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.second || "POST"}
            </text>
          </g>
          <g>
            <rect
              fill="#0B0E10"
              x="108"
              y="5"
              width="34"
              height="10"
              rx="5"
            />
            <LinkedInIcon x={111} y={6.5} />
            <text
              x="122"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.third || "PUT"}
            </text>
          </g>
          <g>
            <rect
              fill="#0B0E10"
              x="150"
              y="5"
              width="40"
              height="10"
              rx="5"
            />
            <TikTokIcon x={153} y={6.5} />
            <text
              x="165"
              y="12"
              fill="white"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.fourth || "DELETE"}
            </text>
          </g>
        </g>

        <defs>
          <mask id="db-mask-1">
            <path
              d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <mask id="db-mask-2">
            <path
              d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <mask id="db-mask-3">
            <path
              d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <mask id="db-mask-4">
            <path
              d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <radialGradient id="db-blue-grad" fx="1">
            <stop offset="0%" stopColor={lightColor || "#14B8A6"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>

      <div className="absolute bottom-10 flex w-full flex-col items-center">
        <div className="absolute -bottom-4 h-[100px] w-[62%] rounded-lg bg-accent/30" />
        <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border border-zinc-700 bg-[#101112] px-2 py-1 sm:-top-4 sm:py-1.5">
          <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L14 8L20 9L15 14L16 20L12 17L8 20L9 14L4 9L10 8L12 2Z" />
          </svg>
          <span className="ml-2 text-[10px]">
            {title ? title : "Data exchange using a customized REST API"}
          </span>
        </div>
        <div className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full border-t bg-[#141516] font-semibold text-xs">
          {circleText ? circleText : "SVG"}
        </div>
        <div className="relative z-10 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background shadow-md">
          <div className="absolute bottom-8 left-12 z-10 h-7 rounded-full bg-[#101112] px-3 text-xs border border-zinc-700 flex items-center gap-2">
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 7H17V17" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
            <span>{buttonTexts?.first || "LegionDev"}</span>
          </div>
          <div className="absolute right-16 z-10 hidden h-7 rounded-full bg-[#101112] px-3 text-xs sm:flex border border-zinc-700 items-center gap-2">
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6H20" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 12H20" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 18H20" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{buttonTexts?.second || "v2_updates"}</span>
          </div>

          <motion.div
            className="absolute -bottom-14 h-[100px] w-[100px] rounded-full border-t bg-accent/5"
            animate={{ scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 h-[145px] w-[145px] rounded-full border-t bg-accent/5"
            animate={{ scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[100px] h-[190px] w-[190px] rounded-full border-t bg-accent/5"
            animate={{ scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[120px] h-[235px] w-[235px] rounded-full border-t bg-accent/5"
            animate={{ scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
};

export default DatabaseWithRestApi;
