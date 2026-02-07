"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { useTheme } from "./ThemeContext";
import { Rocket, Zap, MapPin, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Phase0CurrentStateContent,
  Phase1CreativeTreatmentContent,
  Phase2PilotContent,
  ContentMarketFit,
} from "./cards";
import { useReplayAnimation } from "./useReplayAnimation";

// ─────────────────────────────────────────────────────────────────────────────
// Phase Badge
// ─────────────────────────────────────────────────────────────────────────────

function PhaseBadge({ phase, active }: { phase: number; active?: boolean }) {
  return (
    <div
      className={cn(
        "px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-[0.15em] transition-all duration-300",
        active
          ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
          : "bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
      )}
    >
      Phase {phase}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Card Expanded Styles
// ─────────────────────────────────────────────────────────────────────────────

const cardExpandedStyles = cn(
  "[&_h4]:text-black dark:[&_h4]:text-white [&_h4]:font-semibold [&_h4]:text-lg [&_h4]:tracking-tight [&_h4]:mt-6 [&_h4]:mb-3",
  "[&_strong]:text-teal-600 dark:[&_strong]:text-teal-300",
  "[&_p]:leading-relaxed",
  "[&_li]:leading-relaxed"
);

// ─────────────────────────────────────────────────────────────────────────────
// Main Section Component
// ─────────────────────────────────────────────────────────────────────────────

interface ExpandedCardScrollSyncState {
  active: boolean;
  progress: number;
}

interface CanvasPageSectionProps {
  onExpandedCardScrollSyncChange?: (state: ExpandedCardScrollSyncState) => void;
  replayTick: number;
}

export function CanvasPageSection({
  onExpandedCardScrollSyncChange,
  replayTick,
}: CanvasPageSectionProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const phase0MarkdownPath = "/assets/proposal/phase0-current-state.md";
  const phase0MarkdownFilename = "friendroid-phase0-current-state.md";
  const activeCardRef = React.useRef<string | null>(null);
  const headerControls = useReplayAnimation({
    replayTick,
    fromY: 30,
    duration: 0.8,
  });
  const phase0Controls = useReplayAnimation({
    replayTick,
    fromY: 40,
    delay: 0.1,
    duration: 0.7,
  });
  const indicatorControls = useReplayAnimation({
    replayTick,
    fromY: 10,
    delay: 0.95,
    duration: 0.6,
  });
  const phase1Controls = useReplayAnimation({
    replayTick,
    fromY: 40,
    delay: 0.2,
    duration: 0.7,
  });
  const phase2Controls = useReplayAnimation({
    replayTick,
    fromY: 40,
    delay: 0.3,
    duration: 0.7,
  });
  const phase3Controls = useReplayAnimation({
    replayTick,
    fromY: 40,
    delay: 0.4,
    duration: 0.7,
  });

  const handleCardActiveChange = React.useCallback((cardId: string, active: boolean) => {
    if (active) {
      activeCardRef.current = cardId;
      onExpandedCardScrollSyncChange?.({ active: true, progress: 0 });
      return;
    }

    if (activeCardRef.current === cardId) {
      activeCardRef.current = null;
      onExpandedCardScrollSyncChange?.({ active: false, progress: 0 });
    }
  }, [onExpandedCardScrollSyncChange]);

  const handleCardScrollProgressChange = React.useCallback((cardId: string, progress: number) => {
    if (activeCardRef.current !== cardId) return;
    onExpandedCardScrollSyncChange?.({ active: true, progress });
  }, [onExpandedCardScrollSyncChange]);

  const downloadButton = (
    <motion.a
      aria-label="Download markdown"
      href={phase0MarkdownPath}
      download={phase0MarkdownFilename}
      className="h-10 px-4 shrink-0 flex items-center gap-2 rounded-full bg-zinc-50 dark:bg-zinc-950 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-black/70 dark:text-white/70 border border-gray-200/90 dark:border-zinc-900 hover:border-gray-300/90 hover:text-black dark:hover:text-white dark:hover:border-zinc-800 transition-colors duration-300 focus:outline-none text-sm font-medium"
      onClick={(event) => event.stopPropagation()}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Download className="w-4 h-4" />
      <span className="hidden sm:inline">MD</span>
    </motion.a>
  );

  return (
    <section
      id="next-page"
      className={cn(
        "snap-section relative min-h-screen overflow-hidden flex flex-col items-center justify-center py-24",
        "bg-transparent"
      )}
    >
      {/* Subtle grid pattern - SpaceX style - inherited from Hero */}
      <div
        className={cn(
          "absolute inset-0 bg-[size:60px_60px]",
          isLight
            ? "bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
        )}
        aria-hidden
      />

      {/* Section header — Tesla typography */}
      <motion.div
        animate={headerControls}
        initial={false}
        className="text-center mb-20 relative z-10"
      >
        <span
          className={cn(
            "text-[13px] font-mono uppercase tracking-[0.3em] font-semibold",
            isLight ? "text-zinc-600" : "text-zinc-300"
          )}
        >
          Your Journey
        </span>
        <h2
          className={cn(
            "mt-4 text-4xl md:text-5xl font-light tracking-[-0.02em]",
            isLight ? "text-zinc-900" : "text-white"
          )}
        >
          Three(four) Phases to{" "}
          <span className="font-medium text-teal-500">Scale</span>
        </h2>
      </motion.div>

      {/* Cards grid */}
      <div className="relative flex items-start justify-center gap-6 md:gap-8 px-6 flex-wrap max-w-6xl">
        {/* Phase 0: Current State */}
        <motion.div
          animate={phase0Controls}
          initial={false}
          className="relative"
        >
          {/* "You are here" indicator */}
          <motion.div
            animate={indicatorControls}
            initial={false}
            className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-20"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className={cn(
                "w-0 h-0 border-l-[5px] border-r-[5px] border-b-[6px] border-l-transparent border-r-transparent",
                isLight ? "border-b-teal-500" : "border-b-teal-400"
              )}
            />
            <span className={cn(
              "text-[10px] font-mono uppercase tracking-[0.25em] whitespace-nowrap",
              isLight ? "text-teal-600" : "text-teal-400"
            )}>
              You are here
            </span>
          </motion.div>

          <ExpandableCard
            title="Where we are today"
            description="Current state"
            imageSize="compact"
            icon={<MapPin className="w-6 h-6" />}
            className="w-[220px]"
            classNameExpanded={cardExpandedStyles}
            headerAction={downloadButton}
            onActiveChange={(active) => handleCardActiveChange("phase-0", active)}
            onExpandedScrollProgressChange={(progress) => handleCardScrollProgressChange("phase-0", progress)}
          >
            <Phase0CurrentStateContent />
          </ExpandableCard>
        </motion.div>

        {/* Phase 1: Creative Treatment */}
        <motion.div
          animate={phase1Controls}
          initial={false}
          className="relative"
        >
          <ExpandableCard
            title="Creative Treatment"
            src="/assets/proposal-robot.png"
            description="Strategy"
            imageSize="compact"
            badge={<PhaseBadge phase={1} active />}
            className="w-[220px]"
            classNameExpanded={cardExpandedStyles}
            onActiveChange={(active) => handleCardActiveChange("phase-1", active)}
            onExpandedScrollProgressChange={(progress) => handleCardScrollProgressChange("phase-1", progress)}
          >
            <Phase1CreativeTreatmentContent />
          </ExpandableCard>
        </motion.div>

        {/* Phase 2: Pilot */}
        <motion.div
          animate={phase2Controls}
          initial={false}
          className="relative"
        >
          <ExpandableCard
            title="Pilot"
            description="4-week execution"
            imageSize="compact"
            icon={<Rocket className="w-6 h-6" />}
            badge={<PhaseBadge phase={2} />}
            className="w-[220px]"
            classNameExpanded={cn(cardExpandedStyles, "[&_strong]:text-violet-300")}
            onActiveChange={(active) => handleCardActiveChange("phase-2", active)}
            onExpandedScrollProgressChange={(progress) => handleCardScrollProgressChange("phase-2", progress)}
          >
            <Phase2PilotContent />
          </ExpandableCard>
        </motion.div>

        {/* Phase 3: Content Market Fit */}
        <motion.div
          animate={phase3Controls}
          initial={false}
          className="relative"
        >
          <ExpandableCard
            title="Content Market Fit"
            description="Value-driven engagement"
            imageSize="compact"
            icon={<Zap className="w-6 h-6" />}
            badge={<PhaseBadge phase={3} />}
            className="w-[220px]"
            classNameExpanded={cn(cardExpandedStyles, "[&_strong]:text-emerald-300")}
            onActiveChange={(active) => handleCardActiveChange("phase-3", active)}
            onExpandedScrollProgressChange={(progress) => handleCardScrollProgressChange("phase-3", progress)}
          >
            <ContentMarketFit />
          </ExpandableCard>
        </motion.div>
      </div>
    </section>
  );
}
