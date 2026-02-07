"use client";

import { motion } from "framer-motion";
import { PricingCardWithFeatures } from "@/components/ui/pricing-card-with-features";
import { useTheme } from "./ThemeContext";
import { cn } from "@/lib/utils";
import { useReplayAnimation } from "./useReplayAnimation";

interface PricingSectionProps {
  replayTick: number;
}

export function PricingSection({ replayTick }: PricingSectionProps) {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const headingControls = useReplayAnimation({
    replayTick,
    fromY: 30,
    duration: 0.8,
  });
  const cardControls = useReplayAnimation({
    replayTick,
    fromY: 40,
    fromScale: 0.95,
    delay: 0.2,
    duration: 0.7,
  });
  const badgesControls = useReplayAnimation({
    replayTick,
    fromY: 14,
    delay: 0.45,
    duration: 0.6,
  });

  return (
    <section
      id="pricing"
      className={cn(
        "snap-section relative h-[100svh] overflow-hidden bg-transparent",
      )}
    >
      <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-center px-6 pb-8 pt-20 md:pb-8 md:pt-24">
      {/* Section header */}
      <motion.div
        animate={headingControls}
        initial={false}
        className="text-center mb-8 md:mb-10"
      >
        <span
          className={cn(
            "text-[13px] font-mono uppercase tracking-[0.3em] font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]",
            isLight ? "text-white/90" : "text-teal-200/90"
          )}
        >
          Investment
        </span>
        <h2
          className={cn(
            "mt-3 text-4xl md:text-[2.8rem] font-light tracking-[-0.02em] drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]",
            "text-white"
          )}
        >
          Ready to <span className="font-medium text-teal-500">Build</span>?
        </h2>
        <p
          className={cn(
            "mt-3 text-lg max-w-xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]",
            "text-white/90"
          )}
        >
          Content strategy + system + decision rules. No guesswork, just a repeatable engine.
        </p>
      </motion.div>

      {/* Pricing Card */}
      <motion.div
        animate={cardControls}
        initial={false}
        className="relative z-10 w-full max-w-[min(464px,92vw)]"
      >
        <PricingCardWithFeatures />
      </motion.div>

      {/* Trust badges */}
      <motion.div
        animate={badgesControls}
        initial={false}
        className="mt-6 text-center text-sm md:mt-8"
      >
        <p
          className={cn(
            "max-w-[92vw] px-3 text-base font-semibold tracking-[0.01em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]",
            isLight
              ? "text-zinc-800"
              : "text-zinc-100"
          )}
        >
          $2,000 fixed • 5 business day delivery • Strategy + system + decision rules
        </p>
      </motion.div>
      </div>
      {/* Subtle grid pattern - matching NextPageSection */}
      <div
        className={cn(
          "absolute inset-0 bg-[size:60px_60px]",
          isLight
            ? "bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
        )}
        aria-hidden
      />
    </section>
  );
}
