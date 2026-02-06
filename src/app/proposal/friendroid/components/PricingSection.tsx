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
            "text-[13px] font-mono uppercase tracking-[0.3em] font-semibold",
            isLight ? "text-zinc-600" : "text-zinc-300"
          )}
        >
          Investment
        </span>
        <h2
          className={cn(
            "mt-4 text-4xl md:text-5xl font-light tracking-[-0.02em]",
            isLight ? "text-zinc-900" : "text-white"
          )}
        >
          Ready to <span className="font-medium text-teal-500">Start</span>?
        </h2>
        <p
          className={cn(
            "mt-4 text-lg max-w-xl mx-auto",
            isLight ? "text-zinc-600" : "text-zinc-400"
          )}
        >
          Transparent pricing for complete GPT app development. No hidden fees, just results.
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
        className={cn(
          "mt-12 text-center text-sm",
          isLight ? "text-zinc-500" : "text-zinc-400"
        )}
      >
        <p>7-day money-back guarantee • No credit card required for consultation</p>
      </motion.div>
    </section>
  );
}
