"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GradientSlideButton } from "@/components/ui/gradient-slide-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaCheck } from "react-icons/fa6";

export const PricingCardWithFeatures = (): React.JSX.Element => {
  const features = [
    { label: "Hypotheses Content Library", info: "Ranked content directions with priority order." },
    { label: "Prioritization System", info: "Hero format + support format + publishing cadence." },
    { label: "Content Strategy", info: "Audience definition, 4–6 content pillars, daily action points." },
    { label: "Repurposing Blueprint", info: "One topic → multiple pieces." },
    { label: "Brand Kernel", info: "Narrative, positioning, promise." },
    { label: "Visual Direction", info: "References + do/don't list." },
    { label: "Metrics + Decision Rules", info: "Scale / improve / kill loop." },
    { label: "Pilot → Scale Roadmap", info: "Step-by-step next phase." },
  ];

  return (
    <TooltipProvider>
      <Card className="w-full max-w-[464px] rounded-[38px] border border-border bg-card text-card-foreground p-[23px] flex flex-col gap-6 shadow-sm">
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
        <CardContent className="rounded-[33px] border border-border bg-background px-[27px] py-[30px] flex flex-col gap-[25px]">
            {features.map((f, i) => (
              <Tooltip key={i}>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-3 cursor-pointer select-none text-muted-foreground hover:text-foreground transition-colors">
                    <FaCheck className="text-primary w-5 h-5 shrink-0" />
                    <span className="text-base leading-[19px]">{f.label}</span>
                  </div>
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
        <div className="flex flex-col gap-4 px-[6px] sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col">
            <span className="text-sm leading-none text-muted-foreground">Fixed price</span>
            <span className="mt-1 text-[38px] font-medium leading-[0.94] tracking-tight">$2,000</span>
          </div>

          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full sm:w-[220px]"
          >
            <GradientSlideButton
              className="h-[58px] w-full rounded-[39px] border-[3px] border-white/20 bg-zinc-950 text-[20px] font-medium text-white shadow-lg hover:text-white sm:h-[62px]"
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
