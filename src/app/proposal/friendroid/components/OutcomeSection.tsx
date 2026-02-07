"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeContext";
import { useReplayAnimation } from "./useReplayAnimation";

interface OutcomeItem {
  id: string;
  title: string;
  description: string;
}

const deliverables: OutcomeItem[] = [
  {
    id: "clarity",
    title: "Crystal-Clear Brand Positioning",
    description:
      "A concise, memorable brand narrative that instantly communicates your value. No more confused prospects-just immediate understanding of what you do and why it matters.",
  },
  {
    id: "system",
    title: "Repeatable Content System",
    description:
      "A documented playbook for creating consistent, high-quality content. You'll know exactly what to post, when to post it, and how each piece ties back to your business goals.",
  },
  {
    id: "visuals",
    title: "Premium Visual Identity",
    description:
      "A cohesive design language that elevates every touchpoint. From social posts to pitch decks, your visuals will signal quality and build trust before you say a word.",
  },
  {
    id: "roadmap",
    title: "Pilot-to-Scale Roadmap",
    description:
      "A concrete execution plan with clear milestones and priorities. You'll know exactly what to do next, with built-in flexibility to adapt as you learn what works.",
  },
  {
    id: "library",
    title: "Tested Content Library",
    description:
      "A validated collection of content hypotheses, formats, and angles that resonate with your audience. Stop guessing-start executing with confidence based on real data.",
  },
];

const OUTCOME_OLD_SEGMENT = "walk away";
const OUTCOME_NEW_SEGMENT = "proceed building";
const OUTCOME_SHARED_WORD = "with";
const OUTCOME_SEGMENT_WIDTH_BUFFER_PX = 10;
const OUTCOME_INITIAL_HOLD_MS = 760;
const OUTCOME_STRIKE_PHASE_MS = 820;
const OUTCOME_WITH_SHIFT_PHASE_MS = 520;
const OUTCOME_REVEAL_PHASE_MS = 940;
const OUTCOME_SETTLE_PHASE_MS = 680;

function OutcomeAccordion({
  item,
  index,
  isOpen,
  isLight,
  onToggle,
}: {
  item: OutcomeItem;
  index: number;
  isOpen: boolean;
  isLight: boolean;
  onToggle: () => void;
}) {
  const rowNumber = `${index + 1}`.padStart(2, "0");

  return (
    <div className={cn("relative border-b last:border-b-0", isLight ? "border-zinc-200/80" : "border-white/10")}>
      <button
        onClick={onToggle}
        className={cn(
          "group relative flex w-full items-center justify-between gap-4 rounded-xl py-5 text-left",
          "transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 focus-visible:ring-offset-0",
          isOpen
            ? isLight
              ? "bg-teal-50/70"
              : "bg-teal-500/5"
            : isLight
            ? "hover:bg-zinc-50/80"
            : "hover:bg-white/[0.03]"
        )}
      >
        <div className="flex items-center gap-4">
          <div className="relative flex w-9 shrink-0 items-center">
            <span
              className={cn(
                "font-mono text-xs tracking-[0.22em] transition-colors duration-200",
                isOpen
                  ? isLight
                    ? "text-teal-700"
                    : "text-teal-300"
                  : isLight
                  ? "text-zinc-500 group-hover:text-zinc-700"
                  : "text-zinc-500 group-hover:text-zinc-300"
              )}
            >
              {rowNumber}
            </span>
            <span
              className={cn(
                "absolute -left-3.5 h-2 w-2 rounded-full border transition-transform duration-200",
                isOpen
                  ? isLight
                    ? "scale-100 border-teal-600 bg-teal-600"
                    : "scale-100 border-teal-300 bg-teal-300"
                  : "scale-0 border-transparent bg-transparent"
              )}
            />
          </div>

          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-200",
              isOpen
                ? isLight
                  ? "border-teal-600 bg-teal-600 text-white"
                  : "border-teal-300 bg-teal-300 text-zinc-950"
                : isLight
                ? "border-zinc-300 bg-zinc-100 text-zinc-500 group-hover:border-teal-500 group-hover:text-teal-600"
                : "border-white/15 bg-white/5 text-zinc-400 group-hover:border-teal-400/60 group-hover:text-teal-300"
            )}
          >
            <Check className="h-4 w-4" />
          </div>

          <span
            className={cn(
              "text-base font-medium transition-colors duration-200 sm:text-lg",
              isOpen
                ? isLight
                  ? "text-zinc-900"
                  : "text-white"
                : isLight
                ? "text-zinc-700 group-hover:text-zinc-900"
                : "text-zinc-300 group-hover:text-white"
            )}
          >
            {item.title}
          </span>
        </div>

        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 transition-transform duration-200",
            isOpen ? "rotate-180" : "rotate-0",
            isLight ? "text-zinc-500" : "text-zinc-400"
          )}
        />
      </button>

      {isOpen ? (
        <span
          className={cn(
            "pointer-events-none absolute bottom-0 left-0 h-px w-full",
            isLight
              ? "bg-gradient-to-r from-teal-500/60 via-cyan-500/55 to-transparent"
              : "bg-gradient-to-r from-teal-300/75 via-cyan-300/60 to-transparent"
          )}
        />
      ) : null}

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p
            className={cn(
              "pb-5 pl-[5.25rem] pr-4 text-base leading-relaxed",
              isLight ? "text-zinc-600" : "text-zinc-400"
            )}
          >
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

interface OutcomeSectionProps {
  replayTick: number;
}

export function OutcomeSection({ replayTick }: OutcomeSectionProps) {
  const [openId, setOpenId] = React.useState<string>("clarity");
  const [headlinePhase, setHeadlinePhase] = React.useState<
    "idle" | "strike" | "space" | "reveal" | "settle" | "final"
  >("idle");
  const [hasPlayedHeadline, setHasPlayedHeadline] = React.useState(false);
  const [segmentWidths, setSegmentWidths] = React.useState({ old: 0, next: 0 });
  const headingRef = React.useRef<HTMLHeadingElement | null>(null);
  const oldSegmentMeasureRef = React.useRef<HTMLSpanElement | null>(null);
  const nextSegmentMeasureRef = React.useRef<HTMLSpanElement | null>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";
  const prefersReducedMotion = useReducedMotion();
  const headingControls = useReplayAnimation({
    replayTick,
    fromY: 28,
    duration: 0.72,
  });
  const panelControls = useReplayAnimation({
    replayTick,
    fromY: 38,
    delay: 0.12,
    duration: 0.78,
  });

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? "" : id));
  };

  React.useLayoutEffect(() => {
    const measure = () => {
      const oldWidth = oldSegmentMeasureRef.current?.getBoundingClientRect().width ?? 0;
      const nextWidth = nextSegmentMeasureRef.current?.getBoundingClientRect().width ?? 0;

      setSegmentWidths((current) => {
        if (Math.abs(current.old - oldWidth) < 0.5 && Math.abs(current.next - nextWidth) < 0.5) {
          return current;
        }
        return { old: oldWidth, next: nextWidth };
      });
    };

    measure();
    window.addEventListener("resize", measure);
    if ("fonts" in document) {
      // Re-measure after custom fonts settle to keep inline spacing exact.
      void (document as Document & { fonts?: { ready?: Promise<unknown> } }).fonts?.ready?.then(measure);
    }

    return () => window.removeEventListener("resize", measure);
  }, []);

  React.useEffect(() => {
    if (!headingRef.current || hasPlayedHeadline) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasPlayedHeadline(true);
        observer.disconnect();

        if (prefersReducedMotion) {
          setHeadlinePhase("final");
        }
      },
      { threshold: 0.45 }
    );

    observer.observe(headingRef.current);
    return () => observer.disconnect();
  }, [hasPlayedHeadline, prefersReducedMotion]);

  React.useEffect(() => {
    if (!hasPlayedHeadline || prefersReducedMotion || headlinePhase !== "idle") return;

    const timeoutId = window.setTimeout(() => {
      setHeadlinePhase("strike");
    }, OUTCOME_INITIAL_HOLD_MS);

    return () => window.clearTimeout(timeoutId);
  }, [hasPlayedHeadline, prefersReducedMotion, headlinePhase]);

  React.useEffect(() => {
    if (headlinePhase !== "strike") return;

    const timeoutId = window.setTimeout(() => {
      setHeadlinePhase("space");
    }, OUTCOME_STRIKE_PHASE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [headlinePhase]);

  React.useEffect(() => {
    if (headlinePhase !== "space") return;

    const timeoutId = window.setTimeout(() => {
      setHeadlinePhase("reveal");
    }, OUTCOME_WITH_SHIFT_PHASE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [headlinePhase]);

  React.useEffect(() => {
    if (headlinePhase !== "reveal") return;

    const timeoutId = window.setTimeout(() => {
      setHeadlinePhase("settle");
    }, OUTCOME_REVEAL_PHASE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [headlinePhase]);

  React.useEffect(() => {
    if (headlinePhase !== "settle") return;

    const timeoutId = window.setTimeout(() => {
      setHeadlinePhase("final");
    }, OUTCOME_SETTLE_PHASE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [headlinePhase]);

  const hasStruckPhrase = headlinePhase !== "idle";
  const hasShiftedWith = headlinePhase === "space" || headlinePhase === "reveal";
  const hasRevealedPhrase = headlinePhase === "reveal" || headlinePhase === "settle" || headlinePhase === "final";
  const oldSegmentWidth =
    segmentWidths.old > 0
      ? `${Math.ceil(segmentWidths.old + OUTCOME_SEGMENT_WIDTH_BUFFER_PX)}px`
      : `${OUTCOME_OLD_SEGMENT.length + 1}ch`;
  const nextSegmentWidth =
    segmentWidths.next > 0
      ? `${Math.ceil(segmentWidths.next + OUTCOME_SEGMENT_WIDTH_BUFFER_PX)}px`
      : `${OUTCOME_NEW_SEGMENT.length + 1}ch`;

  return (
    <section
      id="outcome"
      aria-label="Outcome"
      className="snap-section relative w-full overflow-hidden bg-transparent"
    >
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-20 md:py-24">
        <motion.div
          animate={headingControls}
          initial={false}
          className="mb-10 text-center"
        >
          <p
            className={cn(
              "text-[11px] font-mono uppercase tracking-[0.3em]",
              isLight
                ? "text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
                : "text-teal-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
            )}
          >
            Outcome
          </p>
          <h2
            ref={headingRef}
            className={cn(
              "mt-4 text-4xl font-light leading-[1.08] tracking-[-0.02em] sm:text-5xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]",
              "text-white"
            )}
          >
            <span aria-hidden className="inline-flex items-baseline whitespace-nowrap">
              <span>What you&nbsp;</span>

              <span className="relative inline-flex items-baseline">
                <span
                  className="inline-block overflow-hidden whitespace-nowrap align-baseline transition-[max-width,opacity] duration-[760ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ maxWidth: hasRevealedPhrase ? 0 : oldSegmentWidth, opacity: hasRevealedPhrase ? 0 : 1 }}
                >
                  <span className="relative inline-block -mb-[0.08em] pb-[0.08em] pr-[0.1em]">
                    {OUTCOME_OLD_SEGMENT}
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-white/95"
                      style={{ transformOrigin: "0% 50%" }}
                      initial={false}
                      animate={
                        hasStruckPhrase
                          ? { scaleX: 1, opacity: 1 }
                          : { scaleX: 0, opacity: 0 }
                      }
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.66,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </span>
                </span>

                <span
                  className="inline-block overflow-hidden whitespace-nowrap align-baseline transition-[max-width,opacity] duration-[920ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ maxWidth: hasRevealedPhrase ? nextSegmentWidth : 0, opacity: hasRevealedPhrase ? 1 : 0 }}
                >
                  <motion.span
                    className="inline-block -mb-[0.08em] pb-[0.08em] pr-[0.1em]"
                    initial={false}
                    animate={
                      hasRevealedPhrase
                        ? {
                            y: 0,
                            opacity: 1,
                            textShadow:
                              headlinePhase === "final"
                                ? [
                                    "0 0 0 rgba(45,212,191,0)",
                                    "0 0 18px rgba(45,212,191,0.52)",
                                    "0 0 10px rgba(45,212,191,0.34)",
                                  ]
                                : "0 0 18px rgba(45,212,191,0.52)",
                          }
                        : {
                            y: "0.64em",
                            opacity: 0,
                            textShadow: "0 0 0 rgba(45,212,191,0)",
                          }
                    }
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.86,
                      ease: [0.2, 0.9, 0.3, 1],
                    }}
                  >
                    {OUTCOME_NEW_SEGMENT}
                  </motion.span>
                </span>
              </span>

              <motion.span
                className="ml-[0.16em] inline-block"
                initial={false}
                animate={hasShiftedWith ? { x: 24 } : { x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 230,
                  damping: 20,
                  mass: 0.8,
                  duration: prefersReducedMotion ? 0 : undefined,
                }}
              >
                {OUTCOME_SHARED_WORD}
              </motion.span>
            </span>
            <span className="sr-only">
              {`What you ${
                hasRevealedPhrase
                  ? `${OUTCOME_NEW_SEGMENT} ${OUTCOME_SHARED_WORD}`
                  : `${OUTCOME_OLD_SEGMENT} ${OUTCOME_SHARED_WORD}`
              }`}
            </span>
            <span aria-hidden className="pointer-events-none fixed -left-[9999px] -top-[9999px] whitespace-nowrap opacity-0">
              <span ref={oldSegmentMeasureRef}>{OUTCOME_OLD_SEGMENT}</span>
              <span className="mx-2" />
              <span ref={nextSegmentMeasureRef}>{OUTCOME_NEW_SEGMENT}</span>
            </span>
          </h2>
          <p
            className={cn(
              "mx-auto mt-4 max-w-2xl text-base leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]",
              "text-white/90"
            )}
          >
            Five focused deliverables you can use immediately to build a repeatable content engine.
          </p>
        </motion.div>

        <motion.div
          animate={panelControls}
          initial={false}
          className={cn(
            "mx-auto w-full max-w-4xl rounded-3xl border p-4 sm:p-6 md:p-8",
            isLight
              ? "border-zinc-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
              : "border-white/10 bg-zinc-950/70 shadow-[0_10px_32px_rgba(0,0,0,0.28)]"
          )}
        >
          <div className="mb-4">
            <span
              className={cn(
                "inline-flex rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-[0.2em]",
                isLight
                  ? "border-teal-200 bg-teal-50 text-teal-700"
                  : "border-teal-400/25 bg-teal-500/10 text-teal-300"
              )}
            >
              Deliverables
            </span>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute bottom-2 left-0 top-2 w-5">
              <div className={cn("absolute bottom-0 left-[8px] top-0 w-px", isLight ? "bg-zinc-200" : "bg-white/12")} />
            </div>

            <div className="space-y-0 pl-6">
              {deliverables.map((outcome, index) => (
                <OutcomeAccordion
                  key={outcome.id}
                  item={outcome}
                  index={index}
                  isLight={isLight}
                  isOpen={openId === outcome.id}
                  onToggle={() => handleToggle(outcome.id)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
