"use client";

import { FileText, Target, Palette } from "lucide-react";
import { DisplayCards } from "@/components/ui/display-cards";
import { BlurTextEffect } from "@/components/ui/blur-text-effect";

export function Phase1CreativeTreatmentContent() {
  return (
    <>
      <p className="text-lg font-medium text-zinc-900 dark:text-white">
        <BlurTextEffect>Delivery: 10 business days</BlurTextEffect>
      </p>
      <p className="text-zinc-700 dark:text-zinc-300">
        What you get: Content strategy + system + decision rules{" "}
        <em className="text-zinc-600 dark:text-zinc-400">(not content production)</em>
      </p>

      <h4 className="text-zinc-900 dark:text-white font-semibold mt-4">Where You Are Today</h4>
      <p className="text-zinc-700 dark:text-zinc-300">
        You have an <strong>e-shop</strong>. You don&apos;t have an{" "}
        <strong>audience</strong> or a{" "}
        <strong>repeatable content engine</strong> to build and monetize that
        audience.
      </p>

      <h4 className="text-zinc-900 dark:text-white font-semibold mt-4">Where We&apos;re Going</h4>
      <p className="text-zinc-700 dark:text-zinc-300">
        The right way to build a brand is to provide value to your audience.
        Value comes in two forms:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
        <li>
          <strong className="text-zinc-900 dark:text-white">Emotional</strong> — status, connection, affiliation
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-white">Practical</strong> — knowledge, skills, tools
        </li>
      </ul>

      <h4 className="text-zinc-900 dark:text-white font-semibold mt-4">The Problem</h4>
      <p className="text-zinc-700 dark:text-zinc-300">Right now, you&apos;re facing:</p>
      <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
        <li>No audience</li>
        <li>No clear content strategy</li>
        <li>Overwhelming options (viral videos, news, carousels)</li>
        <li>No consistency system</li>
        <li>No brand messaging</li>
        <li>No clarity on formats or platforms</li>
      </ul>

      <h4 className="text-zinc-900 dark:text-white font-semibold mt-4">The Solution</h4>
      <div className="flex flex-col md:flex-row gap-6 items-end">
        <div className="flex-1">
          <p className="text-zinc-700 dark:text-zinc-300">
            <strong className="text-zinc-900 dark:text-white">In 5 business days, we&apos;ll design your content engine:</strong>
          </p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
            <li>What to say</li>
            <li>How to package it</li>
            <li>Where to publish</li>
            <li>What to measure</li>
            <li>How to grow consistently without guesswork</li>
          </ul>
        </div>
        <div className="shrink-0">
          <div className="w-full flex justify-center py-8 -mx-4">
            <DisplayCards
              scale={0.8}
              cards={[
                {
                  icon: <FileText className="size-4 text-teal-500 dark:text-teal-400" />,
                  title: "Content Library",
                  description: "Ranked hypotheses",
                  date: "Deliverable 1",
                  iconClassName: "text-teal-600 dark:text-teal-400",
                  titleClassName: "text-teal-600 dark:text-teal-400",
                  className: "[grid-area:stack] hover:-translate-y-6 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-teal-500/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-zinc-900/50 dark:before:bg-zinc-900/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                },
                {
                  icon: <Target className="size-4 text-teal-500 dark:text-teal-400" />,
                  title: "Strategy",
                  description: "Pillars + actions",
                  date: "Deliverable 2",
                  iconClassName: "text-teal-600 dark:text-teal-400",
                  titleClassName: "text-teal-600 dark:text-teal-400",
                  className: "[grid-area:stack] translate-x-10 translate-y-6 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-teal-500/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-zinc-900/50 dark:before:bg-zinc-900/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
                },
                {
                  icon: <Palette className="size-4 text-teal-500 dark:text-teal-400" />,
                  title: "Visual Direction",
                  description: "Style + rules",
                  date: "Deliverable 3",
                  iconClassName: "text-teal-600 dark:text-teal-400",
                  titleClassName: "text-teal-600 dark:text-teal-400",
                  className: "[grid-area:stack] translate-x-20 translate-y-12 hover:translate-y-6",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <h4 className="text-zinc-900 dark:text-white font-semibold mt-4">What You Get</h4>
      <ol className="list-decimal pl-5 space-y-2 text-zinc-700 dark:text-zinc-300">
        <li>
          <strong className="text-zinc-900 dark:text-white">Hypotheses Content Library</strong> — Ranked content
          directions with priority order
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-white">Prioritization System</strong> — Hero format + support
          format + publishing cadence
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-white">Content Strategy</strong> — Audience definition, 4–6
          content pillars, daily action points
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-white">Repurposing Blueprint</strong> — One topic → multiple pieces
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-white">Brand Kernel</strong> — Narrative, positioning, promise
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-white">Visual Direction</strong> — References + do/don&apos;t list
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-white">Metrics + Decision Rules</strong> — Scale / improve / kill
          loop
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-white">Pilot → Scale Roadmap</strong> — Step-by-step next phase
        </li>
      </ol>

      <h4 className="text-zinc-900 dark:text-white font-semibold mt-4">Why Us</h4>
      <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
        <li>
          <strong className="text-zinc-900 dark:text-white">180M monthly views</strong> across short-form platforms
        </li>
        <li>
          Deep background in <strong className="text-zinc-900 dark:text-white">AI engineering + generative content</strong>
        </li>
        <li>We&apos;ve built content engines that work</li>
      </ul>

      <h4 className="text-zinc-900 dark:text-white font-semibold mt-4">Pricing</h4>
      <p className="text-lg font-medium text-zinc-900 dark:text-white">
        $2,000 fixed
      </p>
      <p className="text-zinc-700 dark:text-zinc-300">Delivery: 5 business days</p>
      <p className="text-zinc-700 dark:text-zinc-300">Scope: Strategy + system + decision rules (not production)</p>

      <p className="text-lg font-medium text-teal-600 dark:text-teal-400 mt-4">
        Let&apos;s build your content engine.
      </p>
    </>
  );
}
