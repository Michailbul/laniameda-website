import * as React from "react";
import { motion } from "framer-motion";
import { LayoutPanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function InteractiveDeckCard({ isActive }: { isActive: boolean }) {
    return (
        <div className="w-full max-w-6xl mx-auto px-6">
            {/* Problem Section */}
            <div className="mb-6">
                <div className="flex items-start gap-4">
                    <div
                        className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300",
                            isActive
                                ? "border-emerald-500/30 bg-emerald-500/10"
                                : "border-white/10 bg-white/5"
                        )}
                    >
                        <LayoutPanelLeft
                            className={cn(
                                "h-5 w-5 transition-colors duration-300",
                                isActive ? "text-emerald-400" : "text-zinc-500"
                            )}
                        />
                    </div>
                    <div>
                        <p className="text-xs font-semibold tracking-[0.15em] text-zinc-500 uppercase">
                            Problem
                        </p>
                        <p className="mt-1 text-2xl font-medium text-white/90">
                            &ldquo;Investors ignore static PDFs.&rdquo;
                        </p>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="relative mb-5">
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-black px-4 text-[10px] font-bold tracking-[0.25em] text-zinc-500">
                        DELIVERABLE
                    </span>
                </div>
            </div>

            {/* Title */}
            <div className="mb-8">
                <h4 className="text-xl font-semibold text-white">
                    Interactive Pitch Deck{" "}
                    <span className="text-zinc-500 font-normal">(Next.js)</span>
                </h4>
                <p className="mt-1 text-sm text-zinc-400">
                    Live URL, analytics ready, mobile responsive, and fully animated.
                </p>
            </div>

            {/* Browser Mockup */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "relative w-full aspect-[16/9] max-h-[400px] rounded-xl border overflow-hidden bg-zinc-950 flex flex-col",
                    isActive ? "border-white/20 shadow-2xl shadow-emerald-900/20" : "border-white/10"
                )}
            >
                {/* Browser Toolbar */}
                <div className="h-8 border-b border-white/10 bg-white/[0.03] flex items-center px-3 gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="ml-4 flex-1 max-w-sm h-5 rounded bg-black/40 border border-white/5 flex items-center justify-center">
                        <span className="text-[10px] text-zinc-600 font-mono">pitch.yourbrand.com</span>
                    </div>
                </div>

                {/* Content Area - Mini Deck */}
                <div className="flex-1 relative overflow-hidden flex items-center justify-center p-8">
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 blur-[80px]" />

                    <div className="relative z-10 text-center space-y-4">
                        <motion.div
                            animate={{ y: [10, 0] }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                            className="inline-block"
                        >
                            <span className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-[10px] font-medium tracking-wide">
                                SCROLL TO EXPLORE
                            </span>
                        </motion.div>
                        <h3 className="text-3xl font-bold text-white tracking-tight">
                            The Future of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">
                                Investment Memos
                            </span>
                        </h3>
                        <div className="flex items-center justify-center gap-2">
                            <div className="h-8 w-24 rounded bg-white/10 animate-pulse" />
                            <div className="h-8 w-8 rounded-full bg-white/20" />
                        </div>
                    </div>

                    {/* Cursor Simulation */}
                    <motion.div
                        className="absolute z-20"
                        animate={{
                            x: ["0%", "100%", "50%"],
                            y: ["0%", "50%", "100%"]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                        <svg className="w-5 h-5 text-white drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 2L19 13L12 14.5L16 22L13.5 23.5L9 15.5L4 18V2Z" />
                        </svg>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
