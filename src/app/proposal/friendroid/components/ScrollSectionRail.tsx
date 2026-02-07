"use client";

import { useId, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeContext";
import { type FriendroidSectionId } from "./shared";

const SECTION_ITEMS: Array<{ id: FriendroidSectionId; label: string }> = [
  { id: "hero", label: "Hero" },
  { id: "next-page", label: "Offer" },
  { id: "outcome", label: "Outcome" },
  { id: "pricing", label: "Pricing" },
];

const DOT_STEP = 36;
const TRACK_PADDING = 10;

interface ScrollSectionRailProps {
  activeSection: FriendroidSectionId;
  onNavSelect: (sectionId: FriendroidSectionId) => void;
  expandedCardState?: ExpandedCardRailState;
}

interface ExpandedCardRailState {
  active: boolean;
  progress: number;
}

interface RailNodeButtonProps {
  active: boolean;
  isLight: boolean;
  label: string;
  expandedMode: boolean;
  onClick: () => void;
}

function RailNodeButton({
  active,
  isLight,
  label,
  expandedMode,
  onClick,
}: RailNodeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={expandedMode}
      aria-disabled={expandedMode ? "true" : undefined}
      aria-current={!expandedMode && active ? "true" : undefined}
      aria-label={`Jump to ${label}`}
      className={cn(
        "group relative flex items-center justify-center transition-colors duration-300",
        expandedMode ? "h-7 w-7" : "h-8 w-8",
        expandedMode ? "cursor-default" : "cursor-pointer"
      )}
    >
      <span
        className={cn(
          "border transition-all duration-300 rounded-full",
          expandedMode ? "h-2 w-2" : "h-2.5 w-2.5",
          active
            ? "scale-75 border-transparent bg-transparent opacity-0"
            : expandedMode
            ? isLight
              ? "border-zinc-950/14 bg-zinc-950/6"
              : "border-white/28 bg-white/18"
            : isLight
            ? "border-zinc-900/14 bg-zinc-50/65 group-hover:scale-110 group-hover:border-cyan-500/45 group-hover:bg-cyan-500/25"
            : "border-white/18 bg-white/20 group-hover:scale-110 group-hover:border-cyan-100/70 group-hover:bg-cyan-200/36"
        )}
      />
    </button>
  );
}

interface LiquidMarkerProps {
  activeIndex: number;
  filterId: string;
  isLight: boolean;
  prefersReducedMotion: boolean | null;
  expandedMode: boolean;
  dotStep: number;
  trackPadding: number;
}

function LiquidMarker({
  activeIndex,
  filterId,
  isLight,
  prefersReducedMotion,
  expandedMode,
  dotStep,
  trackPadding,
}: LiquidMarkerProps) {
  const y = trackPadding + activeIndex * dotStep;
  const shouldUseGoo = !expandedMode && !prefersReducedMotion;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
      style={shouldUseGoo ? { filter: `url(#${filterId})` } : undefined}
    >
      <motion.span
        className="absolute left-1/2 top-0 -translate-x-1/2"
        animate={{
          y,
          width: expandedMode ? 14 : 20,
          height: expandedMode ? 14 : 20,
          borderRadius: 999,
          backgroundColor: expandedMode
            ? "rgba(255,255,255,0.97)"
            : isLight
            ? "rgb(6 182 212)"
            : "rgb(103 232 249)",
          boxShadow: expandedMode
            ? isLight
              ? "0 0 0 1px rgba(17,24,39,0.14),0 4px 10px rgba(17,24,39,0.18)"
              : "0 0 0 1px rgba(255,255,255,0.32),0 4px 12px rgba(0,0,0,0.36)"
            : isLight
            ? "0 0 12px rgba(6,182,212,0.4)"
            : "0 0 16px rgba(103,232,249,0.45)",
          scale:
            expandedMode || prefersReducedMotion
              ? 1
              : [1, 1.14, 1],
        }}
        transition={{
          y: { type: "spring", stiffness: 220, damping: 28, mass: 0.68 },
          width: { duration: 0.34, ease: "easeInOut" },
          height: { duration: 0.34, ease: "easeInOut" },
          borderRadius: { duration: 0.34, ease: "easeInOut" },
          backgroundColor: { duration: 0.34, ease: "easeInOut" },
          boxShadow: { duration: 0.34, ease: "easeInOut" },
          scale:
            expandedMode || prefersReducedMotion
              ? { duration: 0.16, ease: "easeOut" }
              : { duration: 0.42, ease: "easeOut" },
        }}
      />

      {expandedMode || prefersReducedMotion ? null : (
        <>
          <motion.span
            className={cn(
              "absolute left-1/2 top-[3px] h-3.5 w-3.5 -translate-x-1/2 rounded-full blur-[0.8px]",
              isLight ? "bg-cyan-400/80" : "bg-cyan-200/90"
            )}
            animate={{
              y,
              x: [0, 1, 0],
              scale: [0.92, 1.18, 0.94],
              opacity: [0.38, 0.18, 0.34],
            }}
            transition={{
              y: { type: "spring", stiffness: 190, damping: 32, mass: 0.82 },
              x: { duration: 0.5, ease: "easeInOut" },
              scale: { duration: 0.5, ease: "easeInOut" },
              opacity: { duration: 0.5, ease: "easeInOut" },
            }}
          />

          <motion.span
            className={cn(
              "absolute left-1/2 top-[6px] h-2.5 w-2.5 -translate-x-1/2 rounded-full",
              isLight ? "bg-white/55" : "bg-white/70"
            )}
            animate={{
              y,
              x: [-0.3, 0.3, -0.3],
              opacity: [0.48, 0.2, 0.48],
            }}
            transition={{
              y: { type: "spring", stiffness: 200, damping: 30, mass: 0.76 },
              x: { duration: 0.45, ease: "easeInOut" },
              opacity: { duration: 0.45, ease: "easeInOut" },
            }}
          />
        </>
      )}
    </div>
  );
}

export function ScrollSectionRail({
  activeSection,
  onNavSelect,
  expandedCardState,
}: ScrollSectionRailProps) {
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const filterId = useId().replace(/:/g, "");
  const stepCount = SECTION_ITEMS.length;
  const expandedMode = expandedCardState?.active === true;
  const dotStep = expandedMode ? 30 : DOT_STEP;
  const trackPadding = expandedMode ? 8 : TRACK_PADDING;
  const extraTrackHeight = expandedMode ? 18 : 28;

  const sectionIndex = useMemo(
    () => Math.max(SECTION_ITEMS.findIndex((item) => item.id === activeSection), 0),
    [activeSection]
  );
  const expandedProgress = useMemo(
    () => Math.min(1, Math.max(0, expandedCardState?.progress ?? 0)),
    [expandedCardState?.progress]
  );
  const expandedIndex = useMemo(
    () => Math.min(Math.floor(expandedProgress * stepCount), stepCount - 1),
    [expandedProgress, stepCount]
  );
  const activeIndex = expandedMode ? expandedIndex : sectionIndex;

  return (
    <aside className="pointer-events-none fixed right-4 top-1/2 z-[58] -translate-y-1/2 md:right-6">
      <svg aria-hidden className="absolute h-0 w-0">
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="210%" height="210%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.1" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <motion.nav
        aria-label={
          expandedMode
            ? "Expanded card reading progress"
            : "Friendroid proposal section navigation"
        }
        animate={{
          x: expandedMode ? -1 : 0,
          scale: 1,
        }}
        transition={{ duration: 0.32, ease: "easeInOut" }}
        className={cn(
          "relative flex flex-col items-center rounded-none border-transparent bg-transparent shadow-none transition-colors duration-300",
          expandedMode ? "w-[52px] px-0 py-0 pointer-events-none" : "w-[74px] px-2 py-2 pointer-events-auto",
          expandedMode
            ? isLight
              ? "text-zinc-800/78"
              : "text-white/76"
            : isLight
            ? "text-zinc-900"
            : "text-zinc-100"
        )}
      >
        <motion.div
          animate={{
            letterSpacing: expandedMode ? "0.15em" : "0.28em",
          }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className={cn(
            "mb-2 whitespace-nowrap px-1.5 py-0.5 font-mono text-[9px]",
            expandedMode
              ? isLight
                ? "text-zinc-800/80"
                : "text-white/78"
              : isLight
              ? "text-cyan-600/95"
              : "text-cyan-200/95"
          )}
        >
          {`${activeIndex + 1} / ${stepCount}`}
        </motion.div>

        <div
          className={cn("relative", expandedMode ? "w-8" : "w-10")}
          style={{
            height: trackPadding * 2 + dotStep * Math.max(stepCount - 1, 0) + extraTrackHeight,
          }}
        >
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute left-1/2 w-px -translate-x-1/2 rounded-full",
              expandedMode
                ? isLight
                  ? "bg-gradient-to-b from-zinc-700/22 via-zinc-700/12 to-zinc-700/22"
                  : "bg-gradient-to-b from-white/24 via-white/14 to-white/24"
                : isLight
                ? "bg-gradient-to-b from-zinc-500/30 via-zinc-500/15 to-zinc-500/30"
                : "bg-gradient-to-b from-cyan-100/35 via-cyan-200/14 to-cyan-100/35"
            )}
            style={{ top: expandedMode ? 10 : 12, bottom: expandedMode ? 10 : 12 }}
          />

          <div
            className="absolute inset-x-0 flex flex-col items-center justify-between"
            style={{ top: expandedMode ? 4 : 6, bottom: expandedMode ? 4 : 6 }}
          >
            {SECTION_ITEMS.map((item, index) => (
              <RailNodeButton
                key={item.id}
                label={item.label}
                isLight={isLight}
                active={activeIndex === index}
                expandedMode={expandedMode}
                onClick={() => {
                  if (expandedMode) return;
                  onNavSelect(item.id);
                }}
              />
            ))}
          </div>

          <LiquidMarker
            activeIndex={activeIndex}
            isLight={isLight}
            filterId={filterId}
            prefersReducedMotion={prefersReducedMotion}
            expandedMode={expandedMode}
            dotStep={dotStep}
            trackPadding={trackPadding}
          />
        </div>
      </motion.nav>
    </aside>
  );
}
