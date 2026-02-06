"use client";

import * as React from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CheckCircle2, Route, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const ACTION_ITEMS = [
    { text: "Creative findings distilled into tactics", sub: "What worked → What to do" },
    { text: "Platform-specific execution steps", sub: "Instagram, TikTok, LinkedIn, YouTube" },
    { text: "Content templates & formats", sub: "Plug-and-play structures" },
    { text: "Publishing schedule & frequency", sub: "When to post, how often" },
    { text: "Team handoff documentation", sub: "Delegate without losing quality" },
];

const PHASES = [
    { label: "Prepare Treatment", desc: "Research & Strategy", color: "cyan", current: true },
    { label: "Pilot", desc: "Validate", color: "white", current: false },
    { label: "Scale", desc: "Amplify", color: "white", current: false },
];

export function PilotScaleRoadmapCard({ isActive }: { isActive: boolean }) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, margin: "-10% 0px" });
    const shouldAnimate = isActive && isInView;
    const [openIndex, setOpenIndex] = React.useState<number | null>(0);

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
                className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"
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
                    <span className="text-cyan-400 font-mono text-sm tracking-wider">07</span>
                    <h2 className="text-white text-2xl md:text-3xl font-extralight tracking-tight uppercase">Pilot → Scale Roadmap</h2>
                </motion.div>
            </div>

            {/* Main Content */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0 relative z-10">

                {/* Left: Problem + Accordion */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="lg:col-span-7 flex flex-col gap-6"
                >
                    {/* Problem */}
                    <div className="relative pl-5 border-l border-white/10">
                        <div className="absolute top-0 left-[-1px] h-6 w-[1px] bg-cyan-400" />
                        <span className="text-[10px] text-cyan-400/80 uppercase tracking-[0.2em] font-mono block mb-2">The Issue</span>
                        <h3 className="text-white text-lg font-light leading-snug">
                            No clear system to scale.
                            <span className="text-white/40 block mt-1 text-sm">Ideation fatigue and execution uncertainty stall growth.</span>
                        </h3>
                    </div>

                    {/* Accordion */}
                    <div className="flex-1 overflow-y-auto">
                        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-mono mb-4">What You Get — Step-by-Step Action Plan</p>
                        
                        <div className="space-y-2">
                            {ACTION_ITEMS.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                                    transition={{ delay: 0.3 + (i * 0.08), duration: 0.5 }}
                                    className="rounded-lg border border-white/5 bg-white/[0.02] overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                        className="w-full flex items-center justify-between gap-4 p-4 hover:bg-white/[0.03] transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="shrink-0">
                                                <div className={cn(
                                                    "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                                    openIndex === i ? "border-cyan-500 bg-cyan-500/20" : "border-cyan-500/40"
                                                )}>
                                                    <CheckCircle2 className={cn(
                                                        "w-3 h-3 text-cyan-400 transition-opacity",
                                                        openIndex === i ? "opacity-100" : "opacity-0"
                                                    )} />
                                                </div>
                                            </div>
                                            <p className="text-white/90 text-sm font-light text-left">{item.text}</p>
                                        </div>
                                        <ChevronDown className={cn(
                                            "w-4 h-4 text-white/40 transition-transform duration-300 shrink-0",
                                            openIndex === i && "rotate-180"
                                        )} />
                                    </button>
                                    <AnimatePresence>
                                        {openIndex === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-4 pb-4 pt-0 pl-12">
                                                    <p className="text-[12px] text-white/50 font-mono leading-relaxed">{item.sub}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right: Phase Roadmap Squares */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="lg:col-span-5 flex items-center justify-center"
                >
                    <div className="relative w-full max-w-[320px] flex flex-col gap-4">
                        {PHASES.map((phase, i) => (
                            <motion.div
                                key={phase.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                transition={{ delay: 0.5 + (i * 0.15), duration: 0.5 }}
                                className={cn(
                                    "relative p-6 rounded-xl border transition-all duration-300",
                                    phase.current 
                                        ? "border-cyan-500/50 bg-cyan-950/30 shadow-lg shadow-cyan-500/10" 
                                        : "border-white/10 bg-white/[0.02]"
                                )}
                            >
                                {/* Current Indicator */}
                                {phase.current && (
                                    <div className="absolute -top-3 left-4 px-3 py-1 bg-cyan-500 rounded-full flex items-center gap-1.5">
                                        <Sparkles className="w-3 h-3 text-black" />
                                        <span className="text-[10px] font-mono text-black uppercase tracking-wider">We Are Here</span>
                                    </div>
                                )}
                                
                                <div className="flex items-center gap-4">
                                    {/* Step Number */}
                                    <div className={cn(
                                        "w-12 h-12 rounded-lg border flex items-center justify-center shrink-0",
                                        phase.current 
                                            ? "border-cyan-500/50 bg-cyan-500/20" 
                                            : "border-white/20 bg-white/5"
                                    )}>
                                        <span className={cn(
                                            "font-mono text-sm font-medium",
                                            phase.current ? "text-cyan-400" : "text-white/40"
                                        )}>0{i + 1}</span>
                                    </div>
                                    
                                    {/* Label */}
                                    <div>
                                        <p className={cn(
                                            "text-lg font-light",
                                            phase.current ? "text-white" : "text-white/50"
                                        )}>{phase.label}</p>
                                        <p className={cn(
                                            "text-[10px] uppercase tracking-wider font-mono",
                                            phase.current ? "text-cyan-400/70" : "text-white/30"
                                        )}>{phase.desc}</p>
                                    </div>
                                </div>

                                {/* Connector Line */}
                                {i < PHASES.length - 1 && (
                                    <div className="absolute left-[2.25rem] -bottom-4 h-4 w-px bg-gradient-to-b from-white/20 to-transparent" />
                                )}
                            </motion.div>
                        ))}

                        {/* Bottom Label */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                            className="mt-2 pt-4 border-t border-white/10"
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
                        <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-mono mb-2">What You Get</p>
                        <p className="text-white/70 text-sm font-light leading-relaxed">
                            A ready-to-execute plan. <span className="text-white">No ambiguity. Just follow the steps.</span>
                        </p>
                    </div>
                    <div className="relative group">
                        <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                        <p className="text-[10px] text-cyan-400/50 uppercase tracking-[0.2em] font-mono mb-2">Outcome</p>
                        <p className="text-white text-base font-light flex items-center gap-2">
                            Full clarity on scaling execution. <CheckCircle2 className="w-4 h-4 text-cyan-500" />
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
