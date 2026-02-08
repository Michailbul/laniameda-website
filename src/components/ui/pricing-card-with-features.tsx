"use client";

import React from "react";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GradientSlideButton } from "@/components/ui/gradient-slide-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaCheck } from "react-icons/fa6";

interface PricingCardWithFeaturesProps {
  animateRows?: boolean;
  rowRevealTick?: number;
}

export const PricingCardWithFeatures = ({
  animateRows = false,
  rowRevealTick = 0,
}: PricingCardWithFeaturesProps): React.JSX.Element => {
  const rowAnimationControls = useAnimationControls();
  const prefersReducedMotion = useReducedMotion();

  const features = [
    { label: "Hypotheses Content Library", info: "Content ideas database. Never spend time about WHAT to create." },
    { label: "Prioritization System", info: "Never split focus" },
    { label: "Content Strategy", info: "Audience definition, 4–6 content pillars, daily action points." },
    { label: "Repurposing Blueprint", info: "One topic → multiple pieces." },
    { label: "Brand Kernel", info: "Narrative, positioning, promise." },
    { label: "Visual Direction", info: "References + do/don't list." },
    { label: "Metrics + Decision Rules", info: "Scale / improve / kill loop." },
    { label: "Pilot → Scale Roadmap", info: "Step-by-step next phase." },
  ];

  React.useEffect(() => {
    if (!animateRows) {
      rowAnimationControls.set({ opacity: 1, y: 0 });
      return;
    }

    rowAnimationControls.set(prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 });
    const frameId = window.requestAnimationFrame(() => {
      void rowAnimationControls.start((index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: prefersReducedMotion ? 0 : 0.08 + index * 0.05,
          duration: prefersReducedMotion ? 0.22 : 0.36,
          ease: [0.16, 1, 0.3, 1],
        },
      }));
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [animateRows, prefersReducedMotion, rowAnimationControls, rowRevealTick]);

  return (
    <TooltipProvider>
      <Card className="w-full max-w-[464px] rounded-[34px] border border-border bg-card text-card-foreground p-4 md:p-5 flex flex-col gap-4 shadow-sm">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold leading-[24px]">
            Content Engine Design
          </h2>
          <p className="text-base text-muted-foreground leading-[19px]">
            Strategy + system + decision rules
          </p>
        </div>

        {/* Features */}
        <CardContent className="rounded-[28px] border border-border bg-background px-5 py-5 md:px-6 md:py-6 flex flex-col gap-4">
            {features.map((f, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <motion.div
                    custom={i}
                    animate={rowAnimationControls}
                    initial={false}
                    className="flex items-center gap-3 cursor-pointer select-none text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FaCheck className="text-primary w-4 h-4 shrink-0" />
                    <span className="text-[15px] leading-[18px]">{f.label}</span>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-[260px] text-sm bg-popover text-popover-foreground border border-border rounded-xl px-3 py-2 shadow-md"
                >
                  {f.info}
                </TooltipContent>
              </Tooltip>
            ))}
        </CardContent>

        {/* Footer */}
        <div className="flex flex-col gap-3 px-1 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col">
            <span className="text-sm leading-none text-muted-foreground">Fixed price</span>
            <span className="mt-1 text-[34px] font-medium leading-[0.94] tracking-tight">$2,000</span>
          </div>

          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full sm:w-[220px]"
          >
            <GradientSlideButton
              className="h-[52px] w-full rounded-[36px] border-[3px] border-white/20 bg-zinc-950 text-[18px] font-medium text-white shadow-lg hover:text-white sm:h-[56px]"
              colorFrom="#14B8A6"
              colorTo="#0F766E"
            >
              <span>lets grow</span>
            </GradientSlideButton>
          </a>
        </div>
      </Card>
    </TooltipProvider>
  );
};
