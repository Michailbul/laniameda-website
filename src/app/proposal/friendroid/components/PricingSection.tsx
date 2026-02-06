"use client";

import { motion } from "framer-motion";
import { PricingCardWithFeatures } from "@/components/ui/pricing-card-with-features";
import { useTheme } from "./ThemeContext";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <section
      id="pricing"
      className={cn(
        "snap-section relative min-h-screen overflow-hidden flex flex-col items-center justify-center py-24",
        "bg-transparent"
      )}
    >
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

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16 relative z-10"
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
            "mt-4 text-4xl md:text-5xl font-light tracking-[-0.02em] drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)]",
            "text-white"
          )}
        >
          Ready to <span className="font-medium text-teal-500">Build</span>?
        </h2>
        <p
          className={cn(
            "mt-4 text-lg max-w-xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]",
            "text-white/90"
          )}
        >
          Content strategy + system + decision rules. No guesswork, just a repeatable engine.
        </p>
      </motion.div>

      {/* Pricing Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <PricingCardWithFeatures />
      </motion.div>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-12 text-center text-sm"
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
    </section>
  );
}
