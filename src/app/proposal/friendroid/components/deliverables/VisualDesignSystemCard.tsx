"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import { Scissors, LayoutGrid, Type, Sparkles, Check, X } from "lucide-react";

const REFERENCE_ITEMS: CardStackItem[] = [
    {
        id: 1,
        title: "Clean Tech Aesthetic",
        description: "Minimal, high-contrast robotics footage with cinematic depth",
        tag: "Editing Style",
    },
    {
        id: 2,
        title: "Kinetic Typography",
        description: "Animated text overlays and caption systems that feel premium",
        tag: "Motion Design",
    },
    {
        id: 3,
        title: "Lower Thirds System",
        description: "Text positioning, captions, and information hierarchy",
        tag: "Layout/UI",
    },
    {
        id: 4,
        title: "Premium Color Grading",
        description: "Consistent film look and visual identity across all content",
        tag: "Visual Consistency",
    },
    {
        id: 5,
        title: "Smooth Transitions",
        description: "Pacing, cuts, and flow that feels intentional and polished",
        tag: "Editing Style",
    },
];

// Clean Instagram Reel skeleton - minimal, matching real Reels UI
const CustomCardRenderer = (item: CardStackItem, state: { active: boolean }) => {
    return (
        <div className="relative h-full w-full bg-zinc-900 overflow-hidden">
            {/* Tag at top */}
            <span className="absolute top-3 left-3 px-1.5 py-0.5 text-[8px] font-mono uppercase tracking-wider bg-cyan-500/20 border border-cyan-500/30 rounded text-cyan-400 z-20">
                {item.tag}
            </span>

            {/* Right side engagement icons - like Instagram */}
            <div className="absolute right-2 bottom-16 flex flex-col gap-3 items-center">
                {/* Heart */}
                <div className="w-6 h-6 rounded-full bg-white/10" />
                {/* Comment */}
                <div className="w-6 h-6 rounded-full bg-white/10" />
                {/* Bookmark */}
                <div className="w-6 h-6 rounded-full bg-white/10" />
                {/* Profile */}
                <div className="w-6 h-6 rounded-full bg-white/15 border border-white/20" />
            </div>

            {/* Bottom: username + caption */}
            <div className="absolute bottom-3 left-3 right-10">
                <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-12 h-2 rounded bg-white/15" />
                </div>
                <div className="w-20 h-1.5 rounded bg-white/8" />
                {/* Audio pill */}
                <div className="mt-2 flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-white/10" />
                    <div className="w-14 h-1.5 rounded bg-white/8" />
                </div>
            </div>
        </div>
    );
};

const WHAT_YOU_GET = [
    { icon: Scissors, text: "Editing style references", sub: "pacing, cuts, overlays" },
    { icon: LayoutGrid, text: "Layout/UI references", sub: "lower thirds, text systems" },
    { icon: Type, text: "Typography references", sub: "premium vs cheap" },
];

export function VisualDesignSystemCard({ isActive }: { isActive: boolean }) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, margin: "-10% 0px" });
    const shouldAnimate = isActive && isInView;

    return (
        <div ref={containerRef} className="w-full h-full max-h-[85vh] flex flex-col relative px-4 md:px-8 py-4 overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
                    backgroundSize: "60px 60px"
                }}
            />
            <motion.div
                className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Header Section */}
            <div className="flex-none mb-4 md:mb-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-[auto_1fr] gap-4 items-baseline border-b border-white/10 pb-4"
                >
                    <span className="text-amber-400 font-mono text-sm tracking-wider">06</span>
                    <h2 className="text-white text-2xl md:text-3xl font-extralight tracking-tight uppercase">Visual Identity Reference</h2>
                </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center min-h-0 relative z-10 overflow-hidden">

                {/* Left Column: Context */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="lg:col-span-4 flex flex-col gap-6 md:pr-8"
                >
                    {/* Problem Statement */}
                    <div className="relative pl-6 border-l border-white/10">
                        <div className="absolute top-0 left-[-1px] h-8 w-[1px] bg-amber-400" />
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] text-amber-400/80 uppercase tracking-[0.2em] font-mono">The Problem</span>
                        </div>
                        <h3 className="text-white text-lg md:text-xl font-light leading-snug">
                            Premium brand needs premium visual style.
                            <span className="text-white/40 block mt-2 text-sm md:text-base">There is none yet.</span>
                        </h3>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

                    {/* What You Get */}
                    <div>
                        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-mono mb-4">What You Get</p>
                        <ul className="space-y-3">
                            {WHAT_YOU_GET.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-white/60 text-sm font-light group">
                                    <item.icon className="w-4 h-4 text-white/20 group-hover:text-amber-400 transition-colors mt-0.5 shrink-0" />
                                    <div>
                                        <span className="group-hover:text-white transition-colors block">{item.text}</span>
                                        <span className="text-[10px] text-white/30">{item.sub}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                   
                </motion.div>

                {/* Right Column: CardStack Visualization */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="lg:col-span-8 flex items-center justify-center relative overflow-visible"
                >
                    <CardStack
                        items={REFERENCE_ITEMS}
                        cardWidth={160}
                        cardHeight={284}
                        overlap={0.55}
                        spreadDeg={28}
                        maxVisible={5}
                        autoAdvance
                        intervalMs={3500}
                        pauseOnHover
                        showDots
                        activeScale={1.02}
                        inactiveScale={0.9}
                        activeLiftPx={14}
                        depthPx={100}
                        tiltXDeg={8}
                        renderCard={CustomCardRenderer}
                    />
                </motion.div>

            </div>

            {/* Footer Section: Outcome */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex-none pt-4 md:pt-6 border-t border-white/10 relative z-10"
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="relative group">
                        <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-amber-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                        <p className="text-[10px] text-amber-400/50 uppercase tracking-[0.2em] font-mono mb-1">Outcome</p>
                        <p className="text-white text-sm md:text-base font-light">
                            A reference-driven starting point <span className="text-white/40">— making full visual design faster and clearer.</span>
                        </p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {["Editing", "Layout", "Typography", "Consistency"].map((tag) => (
                            <span key={tag} className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 rounded text-white/40">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
