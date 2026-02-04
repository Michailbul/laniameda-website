"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Target, Zap, Fingerprint, Sparkles, MessageSquareText, BookOpenCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandClarityCard({ isActive }: { isActive: boolean }) {
    return (
        <div className="w-full h-full flex flex-col relative max-w-7xl mx-auto">
            {/* Background Texture - subtle */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/0 to-zinc-950/20 pointer-events-none" />

            {/* 1. Problem Section (Compact Header) */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="flex-none pt-2 pb-6 lg:pb-8 border-b border-white/5"
            >
                <div className="flex items-start gap-4 max-w-3xl">
                    <div className="flex-none pt-1">
                        <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-bold">Problem</span>
                        </div>
                    </div>
                    <p className="text-base lg:text-lg text-zinc-400 font-light leading-snug">
                        We lack a <span className="text-zinc-100 font-medium">repeatable elevator pitch</span> that makes an <span className="text-zinc-100 font-medium">emotional connection</span>, leaving users unsure of why they should care.
                    </p>
                </div>
            </motion.div>

            {/* 2. Main Content (Grid) */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-0 pt-8">

                {/* Left Col: What you get (List) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h3 className="text-3xl font-bold text-white tracking-tight mb-1">
                            Brand Clarity Kernel
                        </h3>
                        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono mb-8">
                            Strategy • Narrative • Anchor
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <FeatureItem
                                icon={Sparkles}
                                title="Core Identity"
                                desc="Clear answers: usage, promise, enemy, & who it's for."
                            />
                            <FeatureItem
                                icon={MessageSquareText}
                                title="30-Second Hook"
                                desc="Ready-to-use pitch for bio, intro, & pinned posts."
                            />
                            <FeatureItem
                                icon={Zap}
                                title="Story Spine"
                                desc="Hero → Problem → Guide → Plan → Success structure."
                            />
                            <FeatureItem
                                icon={Fingerprint}
                                title="Visual Anchor"
                                desc="Recognizable brand face without showing a real person."
                            />
                            <FeatureItem
                                icon={BookOpenCheck}
                                title="Brand Bible"
                                desc="Mission, values, voice, tone, & personality guide."
                                className="md:col-span-2"
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Right Col: Outcome (Visual Card) */}
                <div className="lg:col-span-5 flex flex-col h-full">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative flex-1 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/50 to-black/50 overflow-hidden group"
                    >
                        {/* Decorative BG */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] group-hover:bg-teal-500/15 transition-colors duration-500" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-[60px]" />
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

                        <div className="relative h-full flex flex-col p-8">
                            <div className="flex-none mb-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <Target className="w-5 h-5 text-teal-400" />
                                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">Outcome</span>
                                </div>
                                <h4 className="text-xl lg:text-2xl font-medium text-white leading-relaxed mb-4">
                                    "Clarity on exactly what the brand stands for."
                                </h4>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                    Plus an elevator pitch that makes people <span className="text-white border-b border-teal-500/50">lean in</span> within <span className="font-mono text-teal-400">30 seconds</span>.
                                </p>
                            </div>

                            {/* Visual Flow Representation */}
                            <div className="flex-none mt-8 pt-8 border-t border-white/5">
                                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-zinc-700" />
                                        <span>Problem</span>
                                    </div>
                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent mx-2" />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-zinc-500" />
                                        <span>Hook</span>
                                    </div>
                                    <div className="h-px w-full bg-gradient-to-r from-transparent via-teal-500/50 to-transparent mx-2" />
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
                                        <span className="text-teal-400">Empathy</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ icon: Icon, title, desc, className }: { icon: any, title: string, desc: string, className?: string }) {
    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <div className="flex items-center gap-2 text-zinc-200">
                <Icon className="w-4 h-4 text-zinc-500" />
                <span className="text-sm font-semibold tracking-wide">{title}</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed pl-6">
                {desc}
            </p>
        </div>
    )
}
