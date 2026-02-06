"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "./ThemeContext";

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

export function OutcomeSection() {
  const [openId, setOpenId] = React.useState<string>("clarity");
  const { theme } = useTheme();
  const isLight = theme === "light";

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? "" : id));
  };

  return (
    <section
      id="deliverables"
      aria-label="Outcome"
      className="snap-section relative w-full overflow-hidden bg-transparent"
    >
      <div
        className={cn(
          "absolute inset-0 bg-[size:60px_60px]",
          isLight
            ? "bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
        )}
        aria-hidden
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-40",
          isLight
            ? "bg-gradient-to-b from-teal-50/65 to-transparent"
            : "bg-gradient-to-b from-teal-500/8 to-transparent"
        )}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-20 md:py-24">
        <div className="mb-10 text-center">
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
            className={cn(
              "mt-4 text-4xl font-light tracking-[-0.02em] sm:text-5xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]",
              "text-white"
            )}
          >
            What you walk away with
          </h2>
          <p
            className={cn(
              "mx-auto mt-4 max-w-2xl text-base leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]",
              "text-white/90"
            )}
          >
            Five focused deliverables you can use immediately to build a repeatable content engine.
          </p>
        </div>

        <div
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
        </div>
      </div>
    </section>
  );
}
