"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const [growthPopoverOpen, setGrowthPopoverOpen] = React.useState(false);
  const growthPopoverRef = React.useRef<HTMLDivElement>(null);
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Phase 0 paths
  const phase0MarkdownPath = "/assets/proposal/phase0-current-state.md";
  const phase0MarkdownFilename = "friendroid-phase0-current-state.md";

  // Phase 1 paths
  const phase1MarkdownPath = "/assets/proposal/phase1-creative-treatment.md";
  const phase1MarkdownFilename = "friendroid-phase1-creative-treatment.md";

  // Phase 2 paths
  const phase2MarkdownPath = "/assets/proposal/phase2-pilot.md";
  const phase2MarkdownFilename = "friendroid-phase2-pilot.md";

  // Phase 3 paths
  const phase3MarkdownPath = "/assets/proposal/phase3-scale.md";
  const phase3MarkdownFilename = "friendroid-phase3-scale.md";
  const activeCardRef = React.useRef<string | null>(null);
  const [shouldStartSequence, setShouldStartSequence] = React.useState(false);
  const [revealedCardCount, setRevealedCardCount] = React.useState(0);
  const [showBaseHeading, setShowBaseHeading] = React.useState(false);
  const [showFourToken, setShowFourToken] = React.useState(false);
  const [showFiveToken, setShowFiveToken] = React.useState(false);
  const hasPlayedSequenceRef = React.useRef(false);
  const activePhaseWord = showFiveToken ? "five" : showFourToken ? "four" : null;

  React.useEffect(() => {
    if (replayTick > 0) {
      setShouldStartSequence(true);
    }
  }, [replayTick]);

  React.useEffect(() => {
    if (shouldStartSequence) return;
    const sectionElement = sectionRef.current;
    if (!sectionElement || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldStartSequence(true);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(sectionElement);
    return () => observer.disconnect();
  }, [shouldStartSequence]);

  React.useEffect(() => {
    if (!shouldStartSequence || hasPlayedSequenceRef.current) return;
    hasPlayedSequenceRef.current = true;

    let cancelled = false;
    const timeoutIds: number[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(resolve, ms);
        timeoutIds.push(id);
      });

    const runSequence = async () => {
      const cardStaggerMs = prefersReducedMotion ? 70 : 420;
      const preParallelBlockMs = prefersReducedMotion ? 60 : 320;
      const pauseBetweenBlocksMs = prefersReducedMotion ? 140 : 1000;

      // Block 0: base heading + first card begin together
      setShowBaseHeading(true);
      setRevealedCardCount(1);
      await wait(cardStaggerMs);
      if (cancelled) return;

      setRevealedCardCount(2);
      await wait(cardStaggerMs);
      if (cancelled) return;

      setRevealedCardCount(3);
      await wait(cardStaggerMs);
      if (cancelled) return;

      await wait(preParallelBlockMs);
      if (cancelled) return;

      // Block 1: card 4 + (four) in parallel
      setRevealedCardCount(4);
      setShowFourToken(true);
      await wait(pauseBetweenBlocksMs);
      if (cancelled) return;

      // Block 2: card 5 + (five replaces four) in parallel
      setRevealedCardCount(5);
      setShowFourToken(false);
      setShowFiveToken(true);
    };

    void runSequence();

    return () => {
      cancelled = true;
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, [prefersReducedMotion, shouldStartSequence]);

  const cardHiddenState = React.useMemo(
    () => (prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.97 }),
    [prefersReducedMotion]
  );
  const indicatorHiddenState = React.useMemo(
    () => (prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }),
    [prefersReducedMotion]
  );
  const cardTransition = React.useMemo(
    () => ({
      duration: prefersReducedMotion ? 0.24 : 0.98,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    }),
    [prefersReducedMotion]
  );
  const indicatorTransition = React.useMemo(
    () => ({
      duration: prefersReducedMotion ? 0.26 : 0.83,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    }),
    [prefersReducedMotion]
  );
  const getCardVisibleState = React.useCallback(
    (finalOpacity = 1) =>
      prefersReducedMotion
        ? { opacity: finalOpacity }
        : { opacity: finalOpacity, y: 0, scale: 1 },
    [prefersReducedMotion]
  );
  const indicatorVisibleState = React.useMemo(
    () => (prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }),
    [prefersReducedMotion]
  );
  const tokenFadeTransition = React.useMemo(
    () => ({
      duration: prefersReducedMotion ? 0.18 : 0.32,
      ease: "easeInOut" as const,
    }),
    [prefersReducedMotion]
  );
  const headingHiddenState = React.useMemo(
    () => (prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, filter: "blur(6px)" }),
    [prefersReducedMotion]
  );
  const headingVisibleState = React.useMemo(
    () => (prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }),
    [prefersReducedMotion]
  );
  const headingTransition = React.useMemo(
    () => ({
      duration: prefersReducedMotion ? 0.2 : 0.72,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    }),
    [prefersReducedMotion]
  );

  const handleGrowthClick = React.useCallback(() => {
    setGrowthPopoverOpen(true);
    setTimeout(() => setGrowthPopoverOpen(false), 2500);
  }, []);

  React.useEffect(() => {
    if (!growthPopoverOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (growthPopoverRef.current && !growthPopoverRef.current.contains(event.target as Node)) {
        setGrowthPopoverOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [growthPopoverOpen]);

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

  const phase0DownloadButton = (
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

  const phase1DownloadButton = (
    <motion.a
      aria-label="Download markdown"
      href={phase1MarkdownPath}
      download={phase1MarkdownFilename}
      className="h-10 px-4 shrink-0 flex items-center gap-2 rounded-full bg-zinc-50 dark:bg-zinc-950 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-black/70 dark:text-white/70 border border-gray-200/90 dark:border-zinc-900 hover:border-gray-300/90 hover:text-black dark:hover:text-white dark:hover:border-zinc-800 transition-colors duration-300 focus:outline-none text-sm font-medium"
      onClick={(event) => event.stopPropagation()}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Download className="w-4 h-4" />
      <span className="hidden sm:inline">MD</span>
    </motion.a>
  );

  const phase2DownloadButton = (
    <motion.a
      aria-label="Download markdown"
      href={phase2MarkdownPath}
      download={phase2MarkdownFilename}
      className="h-10 px-4 shrink-0 flex items-center gap-2 rounded-full bg-zinc-50 dark:bg-zinc-950 hover:bg-neutral-100 dark:hover:bg-neutral-900 text-black/70 dark:text-white/70 border border-gray-200/90 dark:border-zinc-900 hover:border-gray-300/90 hover:text-black dark:hover:text-white dark:hover:border-zinc-800 transition-colors duration-300 focus:outline-none text-sm font-medium"
      onClick={(event) => event.stopPropagation()}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Download className="w-4 h-4" />
      <span className="hidden sm:inline">MD</span>
    </motion.a>
  );

  const phase3DownloadButton = (
    <motion.a
      aria-label="Download markdown"
      href={phase3MarkdownPath}
      download={phase3MarkdownFilename}
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
      ref={sectionRef}
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
        className="text-center mb-20 relative z-10"
        initial={headingHiddenState}
        animate={showBaseHeading ? headingVisibleState : headingHiddenState}
        transition={headingTransition}
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
          <span className="inline-flex items-center justify-center gap-0 flex-wrap">
            <span>Three</span>
            {activePhaseWord && (
              <span className="relative inline-grid align-middle">
                <span className="invisible font-medium whitespace-nowrap"> (five) </span>
                <motion.span
                  className={cn(
                    "absolute inset-0 whitespace-nowrap font-medium",
                    isLight ? "text-zinc-500" : "text-zinc-400"
                  )}
                  initial={false}
                  animate={{ opacity: showFourToken ? 1 : 0 }}
                  transition={tokenFadeTransition}
                >
                  {" (four) "}
                </motion.span>
                <motion.span
                  className={cn(
                    "absolute inset-0 whitespace-nowrap font-medium",
                    isLight ? "text-zinc-500" : "text-zinc-400"
                  )}
                  initial={false}
                  animate={{ opacity: showFiveToken ? 1 : 0 }}
                  transition={tokenFadeTransition}
                >
                  {" (five) "}
                </motion.span>
              </span>
            )}
            <span>{activePhaseWord ? "Phases to " : " Phases to "}</span>
            <span className="font-medium text-teal-500">Scale</span>
          </span>
        </h2>
      </motion.div>

      {/* Cards grid */}
      <div className="relative flex items-start justify-center gap-4 md:gap-6 px-4 flex-nowrap max-w-7xl">
        {/* Phase 0: Current State */}
        <motion.div
          animate={revealedCardCount >= 1 ? getCardVisibleState() : cardHiddenState}
          transition={cardTransition}
          initial={cardHiddenState}
          className="relative"
        >
          {/* "You are here" indicator */}
          <motion.div
            animate={revealedCardCount >= 1 ? indicatorVisibleState : indicatorHiddenState}
            transition={indicatorTransition}
            initial={indicatorHiddenState}
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
            src="/assets/strategy.png"
            description="current state"
            imageSize="compact"
            icon={<MapPin className="w-6 h-6" />}
            className="w-[220px]"
            classNameExpanded={cardExpandedStyles}
            headerAction={phase0DownloadButton}
            hideBottomBlurOnExpand
            onActiveChange={(active) => handleCardActiveChange("phase-0", active)}
            onExpandedScrollProgressChange={(progress) => handleCardScrollProgressChange("phase-0", progress)}
          >
            <Phase0CurrentStateContent />
          </ExpandableCard>
        </motion.div>

        {/* Phase 1: Creative Treatment */}
        <motion.div
          animate={revealedCardCount >= 2 ? getCardVisibleState() : cardHiddenState}
          transition={cardTransition}
          initial={cardHiddenState}
          className="relative"
        >
          <ExpandableCard
            title="Creative Treatment"
            src="/assets/offer.png"
            description="strategy"
            imageSize="compact"
            badge={<PhaseBadge phase={1} active />}
            className="w-[220px]"
            classNameExpanded={cardExpandedStyles}
            headerAction={phase1DownloadButton}
            hideBottomBlurOnExpand
            onActiveChange={(active) => handleCardActiveChange("phase-1", active)}
            onExpandedScrollProgressChange={(progress) => handleCardScrollProgressChange("phase-1", progress)}
          >
            <Phase1CreativeTreatmentContent />
          </ExpandableCard>
        </motion.div>

        {/* Phase 2: Pilot */}
        <motion.div
          animate={revealedCardCount >= 3 ? getCardVisibleState() : cardHiddenState}
          transition={cardTransition}
          initial={cardHiddenState}
          className="relative"
        >
          <ExpandableCard
            title="Seed"
            src="/assets/seed.png"
            description="4-week execution"
            imageSize="compact"
            icon={<Rocket className="w-6 h-6" />}
            badge={<PhaseBadge phase={2} />}
            className="w-[220px]"
            classNameExpanded={cn(cardExpandedStyles, "[&_strong]:text-violet-300")}
            headerAction={phase2DownloadButton}
            hideBottomBlurOnExpand
            onActiveChange={(active) => handleCardActiveChange("phase-2", active)}
            onExpandedScrollProgressChange={(progress) => handleCardScrollProgressChange("phase-2", progress)}
          >
            <Phase2PilotContent />
          </ExpandableCard>
        </motion.div>

        {/* Phase 3: Content Market Fit */}
        <motion.div
          animate={revealedCardCount >= 4 ? getCardVisibleState() : cardHiddenState}
          transition={cardTransition}
          initial={cardHiddenState}
          className="relative"
        >
          <ExpandableCard
            title="Content Market Fit"
            src="/assets/cmf.png"
            description="build trust"
            imageSize="compact"
            icon={<Zap className="w-6 h-6" />}
            badge={<PhaseBadge phase={3} />}
            className="w-[220px]"
            classNameExpanded={cn(cardExpandedStyles, "[&_strong]:text-emerald-300")}
            headerAction={phase3DownloadButton}
            hideBottomBlurOnExpand
            onActiveChange={(active) => handleCardActiveChange("phase-3", active)}
            onExpandedScrollProgressChange={(progress) => handleCardScrollProgressChange("phase-3", progress)}
          >
            <ContentMarketFit />
          </ExpandableCard>
        </motion.div>

        {/* Phase 4: Growth - Long Term */}
        <motion.div
          animate={revealedCardCount >= 5 ? getCardVisibleState(0.5) : cardHiddenState}
          transition={cardTransition}
          initial={cardHiddenState}
          className="relative"
          ref={growthPopoverRef}
        >
          {/* Popover */}
          {growthPopoverOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute -top-20 left-1/2 -translate-x-1/2 z-50 w-48 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-xl shadow-xl text-center"
            >
              <p className="text-sm font-medium">Coming soon...</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                Future growth initiatives
              </p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-zinc-900 dark:border-t-white" />
            </motion.div>
          )}
          <ExpandableCard
            title="Growth"
            src="/assets/golf.png"
            description="long-term vision"
            imageSize="compact"
            icon={<Rocket className="w-6 h-6" />}
            badge={<PhaseBadge phase={4} />}
            className="w-[220px] border-2 border-dashed border-zinc-300 dark:border-zinc-600"
            classNameExpanded={cardExpandedStyles}
            hideBottomBlurOnExpand
            onClick={handleGrowthClick}
            onActiveChange={() => {}}
            onExpandedScrollProgressChange={() => {}}
          >
            <div className="p-8 text-center">
              <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium">
                Coming in the future...
              </p>
              <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-2">
                Full-scale automation and expansion across all platforms.
              </p>
            </div>
          </ExpandableCard>
        </motion.div>
      </div>
    </section>
  );
}
