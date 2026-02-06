"use client";

import { motion } from "framer-motion";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { useTheme } from "./ThemeContext";
import { Rocket, Zap, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Phase0CurrentStateContent,
  Phase1CreativeTreatmentContent,
  Phase2PilotContent,
  Phase3ScaleContent,
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

export function CanvasPageSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";

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
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* "You are here" indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
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
            title="Where we are now"
            description="Current state"
            imageSize="compact"
            icon={<MapPin className="w-6 h-6" />}
            className="w-[220px]"
            classNameExpanded={cardExpandedStyles}
          >
            <Phase0CurrentStateContent />
          </ExpandableCard>
        </motion.div>

        {/* Phase 1: Creative Treatment */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
          >
            <Phase1CreativeTreatmentContent />
          </ExpandableCard>
        </motion.div>

        {/* Phase 2: Pilot */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
          >
            <Phase2PilotContent />
          </ExpandableCard>
        </motion.div>

        {/* Phase 3: Scale */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <ExpandableCard
            title="Scale"
            description="Ongoing growth engine"
            imageSize="compact"
            icon={<Zap className="w-6 h-6" />}
            badge={<PhaseBadge phase={3} />}
            className="w-[220px]"
            classNameExpanded={cn(cardExpandedStyles, "[&_strong]:text-emerald-300")}
          >
            <Phase3ScaleContent />
          </ExpandableCard>
        </motion.div>
      </div>
    </section>
  );
}
