"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DotScreenShader } from "@/components/ui/dot-shader-background";
import { Check, ChevronDown } from "lucide-react";

interface OutcomeItem {
  id: string;
  title: string;
  description: string;
}

const outcomes: OutcomeItem[] = [
  {
    id: "clarity",
    title: "Crystal-Clear Brand Positioning",
    description:
      "A concise, memorable brand narrative that instantly communicates your value. No more confused prospects—just immediate understanding of what you do and why it matters.",
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
      "A validated collection of content hypotheses, formats, and angles that resonate with your audience. Stop guessing—start executing with confidence based on real data.",
  },
];

function OutcomeAccordion({ item, isOpen, onToggle }: { item: OutcomeItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-white/10 last:border-b-0"
    >
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between gap-4 text-left group"
      >
        <div className="flex items-center gap-4">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center
            transition-colors duration-300
            ${isOpen ? "bg-white text-black" : "bg-white/10 text-white group-hover:bg-white/20"}
          `}>
            <Check className="w-4 h-4" />
          </div>
          <span className={`
            text-lg font-medium transition-colors duration-300
            ${isOpen ? "text-white" : "text-white/80 group-hover:text-white"}
          `}>
            {item.title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-white/60"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pl-12 pr-4 text-white/60 text-base leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function OutcomeSection() {
  const [openId, setOpenId] = React.useState<string>("clarity");

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? "" : id));
  };

  return (
    <section
      id="outcome"
      aria-label="Outcome"
      className="snap-section relative w-full bg-black overflow-hidden"
    >
      {/* Shader Background */}
      <div className="absolute inset-0 z-0">
        <DotScreenShader />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-screen w-full max-w-[900px] flex-col px-6 pt-16">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="text-[10px] font-mono uppercase tracking-[0.34em] text-zinc-400">
            Results
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            By the end, you will have
          </h2>
        </div>

        {/* Accordion List */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-0">
            {outcomes.map((outcome) => (
              <OutcomeAccordion
                key={outcome.id}
                item={outcome}
                isOpen={openId === outcome.id}
                onToggle={() => handleToggle(outcome.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
