"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Route, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ACTION_ITEMS = [
    { text: "Creative findings distilled into tactics", sub: "What worked → What to do" },
    { text: "Platform-specific execution steps", sub: "Instagram, TikTok, LinkedIn, YouTube" },
    { text: "Content templates & formats", sub: "Plug-and-play structures" },
    { text: "Publishing schedule & frequency", sub: "When to post, how often" },
    { text: "Team handoff documentation", sub: "Delegate without losing quality" },
];

const PHASES = [
    { label: "Pilot", desc: "Validate", color: "teal" },
    { label: "Systemize", desc: "Build", color: "teal" },
    { label: "Scale", desc: "Amplify", color: "white" },
];

export function PilotScaleRoadmapCard({ isActive }: { isActive: boolean }) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, margin: "-10% 0px" });
    const shouldAnimate = isActive && isInView;

    return (
        <div ref={containerRef} className="w-full h-full max-h-[85vh] flex flex-col relative px-4 md:px-8 py-4 overflow-hidden">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.08]"
                style={{
                    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                    backgroundSize: "80px 80px"
                }}
            />
            <motion.div
                className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full pointer-events-none"
                animate={{ opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Header */}
            <div className="flex-none mb-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-[auto_1fr] gap-4 items-baseline border-b border-white/10 pb-4"
                >
                    <span className="text-teal-400 font-mono text-sm tracking-wider">07</span>
                    <h2 className="text-white text-2xl md:text-3xl font-extralight tracking-tight uppercase">Pilot → Scale Roadmap</h2>
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0 relative z-10">

                {/* Left: Problem + Checklist */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="lg:col-span-7 flex flex-col gap-6"
                >
                    {/* Problem */}
                    <div className="relative pl-5 border-l border-white/10">
                        <div className="absolute top-0 left-[-1px] h-6 w-[1px] bg-teal-400" />
                        <span className="text-[10px] text-teal-400/80 uppercase tracking-[0.2em] font-mono block mb-2">The Issue</span>
                        <h3 className="text-white text-lg font-light leading-snug">
                            No clear system to scale.
                            <span className="text-white/40 block mt-1 text-sm">Ideation fatigue and execution uncertainty stall growth.</span>
                        </h3>
                    </div>

                    {/* The Checklist */}
                    <div className="flex-1">
                        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-mono mb-4">What You Get — Step-by-Step Action Plan</p>
                        
                        <div className="space-y-3">
                            {ACTION_ITEMS.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                    transition={{ delay: 0.3 + (i * 0.08), duration: 0.5 }}
                                    className="group flex items-start gap-4 p-4 rounded-lg border border-white/5 bg-white/[0.02] hover:border-teal-500/20 hover:bg-white/[0.04] transition-all duration-300"
                                >
                                    <div className="shrink-0 mt-0.5">
                                        <div className="w-5 h-5 rounded border border-teal-500/40 flex items-center justify-center group-hover:bg-teal-500/10 transition-colors">
                                            <CheckCircle2 className="w-3 h-3 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-white/90 text-sm font-light group-hover:text-white transition-colors">{item.text}</p>
                                        <p className="text-[11px] text-white/30 mt-0.5 font-mono">{item.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right: Phase Diagram */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="lg:col-span-5 flex items-center justify-center"
                >
                    <div className="relative w-full max-w-[280px]">
                        {/* Phase Flow */}
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[23px] top-8 bottom-8 w-px bg-gradient-to-b from-teal-500/50 via-teal-500/20 to-transparent" />
                            
                            {PHASES.map((phase, i) => (
                                <motion.div
                                    key={phase.label}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                    transition={{ delay: 0.5 + (i * 0.15), duration: 0.5 }}
                                    className="relative flex items-center gap-5 mb-8 last:mb-0"
                                >
                                    {/* Node */}
                                    <div className={cn(
                                        "relative z-10 w-12 h-12 rounded-full border flex items-center justify-center shrink-0",
                                        phase.color === "teal" 
                                            ? "border-teal-500/30 bg-teal-950/30" 
                                            : "border-white/20 bg-white/5"
                                    )}>
                                        <span className={cn(
                                            "font-mono text-xs",
                                            phase.color === "teal" ? "text-teal-400" : "text-white/60"
                                        )}>0{i + 1}</span>
                                    </div>
                                    
                                    {/* Label */}
                                    <div>
                                        <p className={cn(
                                            "text-lg font-light",
                                            phase.color === "teal" ? "text-white" : "text-white/70"
                                        )}>{phase.label}</p>
                                        <p className="text-[10px] text-white/30 uppercase tracking-wider font-mono">{phase.desc}</p>
                                    </div>

                                    {/* Arrow (except last) */}
                                    {i < PHASES.length - 1 && (
                                        <ArrowRight className="absolute left-[44px] top-[52px] w-3 h-3 text-teal-500/30 rotate-90" />
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom Label */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                            className="mt-6 pt-4 border-t border-white/10"
                        >
                            <div className="flex items-center gap-2 text-[10px] text-white/30 font-mono uppercase tracking-wider">
                                <Route className="w-3 h-3" />
                                <span>Executable Path</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Footer: Outcome */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex-none pt-6 border-t border-white/10 relative z-10"
            >
                <div className="grid md:grid-cols-2 gap-6 md:gap-12">
                    <div className="relative group">
                        <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-teal-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-mono mb-2">What You Get</p>
                        <p className="text-white/70 text-sm font-light leading-relaxed">
                            A ready-to-execute plan. <span className="text-white">No ambiguity. Just follow the steps.</span>
                        </p>
                    </div>
                    <div className="relative group">
                        <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-teal-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                        <p className="text-[10px] text-teal-400/50 uppercase tracking-[0.2em] font-mono mb-2">Outcome</p>
                        <p className="text-white text-base font-light flex items-center gap-2">
                            Full clarity on scaling execution. <CheckCircle2 className="w-4 h-4 text-teal-500" />
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
