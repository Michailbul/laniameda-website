"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    DialogStack,
    DialogStackBody,
    DialogStackContent,
    DialogStackFooter,
    DialogStackHeader,
    DialogStackNext,
    DialogStackOverlay,
    DialogStackPrevious,
    DialogStackTrigger,
} from "@/components/ui/stacked-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, FileText, Heart, MessageCircle, MoreHorizontal, Repeat, Send, Share } from "lucide-react";

// Mock Data for Social Previews
const SOCIAL_PREVIEWS = [
    {
        type: "instagram",
        title: "Instagram Reel",
        description: "Vertical video format optimized for engagement",
        content: (
            <div className="relative w-full h-full bg-zinc-900 rounded-lg overflow-hidden flex flex-col">
                {/* Video Placeholder */}
                <div className="flex-1 bg-gradient-to-b from-zinc-800 to-zinc-900 flex items-center justify-center relative group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />
                    <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center backdrop-blur-sm z-10 transition-transform duration-300 group-hover:scale-110">
                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                    </div>
                    {/* Reel UI Overlay */}
                    <div className="absolute right-2 bottom-12 flex flex-col gap-4 items-center z-10">
                        <div className="flex flex-col items-center gap-1">
                            <Heart className="w-6 h-6 text-white text-shadow" />
                            <span className="text-[10px] text-white font-medium">4.2k</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <MessageCircle className="w-6 h-6 text-white text-shadow" />
                            <span className="text-[10px] text-white font-medium">842</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Send className="w-6 h-6 text-white text-shadow" />
                        </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-12 z-10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/50" />
                            <span className="text-sm font-medium text-white text-shadow">friendroid</span>
                        </div>
                        <p className="text-xs text-white/90 line-clamp-2 text-shadow-sm font-light">The future of robotics isn't just about hardware, it's about the stories we tell...</p>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                </div>
            </div>
        )
    },
    {
        type: "linkedin",
        title: "LinkedIn Carousel",
        description: "Swipeable document for professional insights",
        content: (
            <div className="flex flex-col w-full h-full bg-white rounded-md overflow-hidden border border-zinc-200">
                <div className="p-3 flex items-center gap-2 border-b border-zinc-100 bg-white">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500" />
                    <div>
                        <div className="text-xs font-bold text-zinc-900 leading-none mb-1">Company Name</div>
                        <div className="text-[10px] text-zinc-500 leading-none">Robotics & AI Innovation</div>
                    </div>
                </div>
                <div className="flex-1 bg-zinc-100 flex items-center justify-center p-4 relative group">
                    <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />
                    <div className="w-full aspect-[4/5] bg-white shadow-lg border border-zinc-200 flex flex-col p-6 transition-transform duration-300 group-hover:-translate-y-1 relative z-10">
                        <div className="w-8 h-8 mb-4">
                            <svg viewBox="0 0 24 24" fill="none" className="text-cyan-600 w-full h-full">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-serif text-zinc-900 leading-[1.1] mb-4">Why most robotics startups fail at storytelling.</h3>
                        <p className="text-xs text-zinc-500 leading-relaxed">A breakdown of the communication gap in technical industries.</p>
                        <div className="flex-1" />
                        <div className="flex justify-between items-center pt-4 border-t border-zinc-100 mt-2">
                            <span className="text-[10px] text-zinc-400 font-mono tracking-wider">01 / 05</span>
                            <div className="w-6 h-1 rounded-full bg-black" />
                        </div>
                    </div>
                </div>
                <div className="p-2 border-t border-zinc-100 flex justify-between px-4 bg-white">
                    <span className="flex items-center gap-1 text-zinc-500 text-[10px] bg-zinc-50 px-2 py-1 rounded-md"><Heart className="w-3 h-3" /> Like</span>
                    <span className="flex items-center gap-1 text-zinc-500 text-[10px] bg-zinc-50 px-2 py-1 rounded-md"><MessageCircle className="w-3 h-3" /> Comment</span>
                    <span className="flex items-center gap-1 text-zinc-500 text-[10px] bg-zinc-50 px-2 py-1 rounded-md"><Repeat className="w-3 h-3" /> Repost</span>
                </div>
            </div>
        )
    },
    {
        type: "twitter",
        title: "X Thread",
        description: "Threaded short-form content for reach",
        content: (
            <div className="flex flex-col w-full h-full bg-black rounded-lg border border-zinc-800 p-5 gap-4 overflow-hidden relative font-sans">
                {/* Tweet 1 */}
                <div className="flex gap-3 relative z-10">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 shrink-0 border border-zinc-700" />
                    <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-white font-semibold text-sm">Friendroid</span>
                            <div className="w-3 h-3 text-cyan-400">
                                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                            </div>
                            <span className="text-zinc-500 text-xs">@friendroid · 2h</span>
                        </div>
                        <p className="text-zinc-300 text-sm leading-relaxed font-light">Starting from zero needs output. If every post is a brand new project, you won't keep up. <span className="text-cyan-400">#RoboticsMarketing</span></p>
                        <div className="flex justify-between mt-3 text-zinc-600 max-w-[200px]">
                            <MessageCircle className="w-4 h-4 hover:text-cyan-400 transition-colors" />
                            <Repeat className="w-4 h-4 hover:text-green-400 transition-colors" />
                            <Heart className="w-4 h-4 hover:text-red-400 transition-colors" />
                            <Share className="w-4 h-4 hover:text-cyan-400 transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Connector Line */}
                <div className="absolute left-[37.5px] top-[50px] bottom-[20px] w-0.5 bg-zinc-800/80" />

                {/* Tweet 2 */}
                <div className="flex gap-3 relative z-10 mt-1">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 shrink-0 border border-zinc-700 opacity-60" />
                    <div className="flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-white font-semibold text-sm opacity-80">Friendroid</span>
                            <span className="text-zinc-500 text-xs">@friendroid · 2h</span>
                        </div>
                        <p className="text-zinc-300 text-sm leading-relaxed font-light">Here is the blueprint we use to turn 1 topic into 4+ pieces of content. 🧵👇</p>

                        <div className="mt-2 rounded-lg border border-zinc-800 overflow-hidden bg-zinc-900/50">
                            <div className="aspect-[2/1] bg-zinc-800/50 animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        type: "article",
        title: "Long-form Article",
        description: "Deep dive content for authority",
        content: (
            <div className="w-full h-full bg-[#FAFAFA] rounded-md border border-zinc-200 p-8 flex flex-col font-serif relative overflow-hidden group">
                <div className="w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 absolute top-0 left-0" />

                <div className="flex items-center gap-2 mb-6 border-b border-zinc-100 pb-4">
                    <div className="w-6 h-6 rounded-full bg-zinc-200" />
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-sans">Friendroid Blog</span>
                    <span className="text-[10px] text-zinc-300 font-sans">•</span>
                    <span className="text-[10px] text-zinc-400 font-sans">5 min read</span>
                </div>

                <h1 className="text-3xl font-bold text-zinc-900 mb-4 leading-tight group-hover:text-cyan-900 transition-colors duration-300">The Content Engine: How to Scale Technical Storytelling</h1>

                <div className="space-y-3 font-sans opacity-60">
                    <div className="h-2 w-full bg-zinc-200 rounded-sm" />
                    <div className="h-2 w-full bg-zinc-200 rounded-sm" />
                    <div className="h-2 w-3/4 bg-zinc-200 rounded-sm" />
                    <div className="h-2 w-full bg-zinc-200 rounded-sm mt-4" />
                    <div className="h-2 w-5/6 bg-zinc-200 rounded-sm" />
                </div>

                <div className="mt-auto flex items-center text-cyan-600 text-xs font-sans font-medium">
                    Read article <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        )
    }
];

export function RepurposingBlueprintCard({ isActive }: { isActive: boolean }) {
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
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Header Section */}
            <div className="flex-none mb-4 md:mb-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="grid grid-cols-[auto_1fr] gap-4 items-baseline border-b border-white/10 pb-4"
                >
                    <span className="text-cyan-400 font-mono text-sm tracking-wider">05</span>
                    <h2 className="text-white text-3xl md:text-4xl font-extralight tracking-tight uppercase">Repurposing Blueprint</h2>
                </motion.div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col lg:flex-row gap-8 items-center justify-center min-h-0 relative z-10 px-4">
                {/* Source */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={shouldAnimate ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col items-center gap-3"
                >
                    <div className="w-24 h-24 rounded-2xl border border-white/10 bg-zinc-950 flex items-center justify-center">
                        <FileText className="w-8 h-8 text-white/60" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] text-white/40 uppercase tracking-wider">News Source</span>
                </motion.div>

                {/* Arrow */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={shouldAnimate ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.4 }}
                    className="w-16 h-px bg-gradient-to-r from-white/20 to-cyan-500/50"
                />

                {/* Transform Label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={shouldAnimate ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                    className="px-3 py-1.5 rounded-full border border-cyan-500/30 bg-black"
                >
                    <span className="text-[10px] text-cyan-400 uppercase tracking-wider">Transform</span>
                </motion.div>

                {/* Arrow */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={shouldAnimate ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.6 }}
                    className="w-16 h-px bg-gradient-to-r from-cyan-500/50 to-white/20"
                />

                {/* Outputs */}
                <div className="flex flex-col gap-2">
                    {["LinkedIn Carousel", "Instagram Reels", "X Thread", "Article"].map((fmt, i) => (
                        <motion.div
                            key={fmt}
                            initial={{ opacity: 0, x: 20 }}
                            animate={shouldAnimate ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.7 + i * 0.1 }}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg border border-white/10 bg-zinc-950/50 hover:border-cyan-500/30 transition-colors"
                        >
                            <div className="w-2 h-2 rounded-full bg-cyan-500/60" />
                            <span className="text-xs text-white/70">{fmt}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Footer Section: Outcome */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex-none pt-6 md:pt-8 border-t border-white/10 relative z-10"
            >
                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                    <div className="relative group">
                        <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-mono mb-3">What You Get</p>
                        <p className="text-white/60 text-sm font-light leading-relaxed">
                            A workflow to turn <span className="text-white font-medium">one topic</span> into multiple pieces across platforms.
                            Rules so everything still feels consistent.
                        </p>
                    </div>
                    <div className="relative group">
                        <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                        <p className="text-[10px] text-cyan-400/50 uppercase tracking-[0.2em] font-mono mb-3">Outcome</p>
                        <p className="text-white text-base md:text-lg font-light">
                            More content with less effort <span className="text-white/40 block md:inline">— without reinventing the wheel.</span>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
