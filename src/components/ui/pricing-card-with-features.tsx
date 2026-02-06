"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { GradientSlideButton } from "@/components/ui/gradient-slide-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaCheck } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

export const PricingCardWithFeatures = (): React.JSX.Element => {
  const features = [
    { label: "Complete App development", info: "End-to-end GPT app delivery." },
    { label: "Custom UI/UX Interfaces for ChatGPT", info: "Optimized conversational design." },
    { label: "Backend API integration", info: "Seamless OpenAI + third-party API integration." },
    { label: "OAuth authentication setup trough OpenAI", info: "Implements secure OAuth sign-in." },
    { label: "Production deployment", info: "Deployment on Vercel or preferred host." },
    { label: "Updates every 48h", info: "Frequent feature & patch releases." },
    { label: "30-90 days post-launch support", info: "Ongoing stability & support." },
    { label: "Handling submission process with OpenAI", info: "App review & approval assistance." },
  ];

  return (
    <TooltipProvider>
      <Card className="w-full max-w-[464px] rounded-[38px] border border-border bg-card text-card-foreground p-[23px] flex flex-col gap-6 shadow-sm">
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold leading-[24px]">
            Full GPT App Development
          </h2>
          <p className="text-base text-muted-foreground leading-[19px]">
            Tailor solution for your case
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
        <div className="flex items-center justify-between px-[6px]">
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Starting from</span>
            <span className="text-[34px] font-medium leading-[41px]">$3499</span>
          </div>

          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GradientSlideButton
              className="w-[220px] h-[64px] rounded-[39px] text-[20px] font-medium border-[3px] border-white/20 shadow-lg bg-white text-black hover:text-black"
              colorFrom="#ffffff"
              colorTo="#f3f4f6"
            >
              <span>lets grow</span>
            </GradientSlideButton>
          </a>
        </div>
      </Card>
    </TooltipProvider>
  );
};
