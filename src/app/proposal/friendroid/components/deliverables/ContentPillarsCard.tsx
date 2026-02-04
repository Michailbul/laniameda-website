import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Columns, Filter, CheckCircle2, XCircle, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const pillars = [
    {
        title: "Insight",
        subtitle: "News → Implications",
        description: "Translating industry shifts into actionable meaning.",
        image: "/assets/content-pillars/news.png",
        color: "from-blue-500/20 to-blue-900/40"
    },
    {
        title: "Culture",
        subtitle: "Entertainment & Memes",
        description: "Engaging with the zeitgeist through humor and relatability.",
        image: "/assets/content-pillars/culture.png",
        color: "from-amber-500/20 to-amber-900/40"
    },
    {
        title: "Utility",
        subtitle: "Tools & Workflows",
        description: "Bridging the gap between AI tech and practical use.",
        image: "/assets/content-pillars/utility.png",
        color: "from-emerald-500/20 to-emerald-900/40"
    },
    {
        title: "Truth",
        subtitle: "Myth-busting",
        description: "Challenging misconceptions with deep expertise.",
        image: "/assets/content-pillars/truth.png",
        color: "from-rose-500/20 to-rose-900/40"
    },
    {
        title: "Aesthetic",
        subtitle: "Visual Excellence",
        description: "Pure visual inspiration that defines the brand standard.",
        image: "/assets/content-pillars/aesthetic.png",
        color: "from-purple-500/20 to-purple-900/40"
    },
];

export function ContentPillarsCard({ isActive }: { isActive: boolean }) {
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

    return (
        <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
            <div className="flex flex-col h-full max-h-[600px] justify-between">
                {/* Header Section */}
                <div className="flex items-end justify-between border-b border-white/10 pb-6 mb-6 flex-none">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-lg border bg-zinc-900/50",
                                isActive ? "border-indigo-500/50 text-indigo-400" : "border-white/10 text-zinc-600"
                            )}>
                                <Columns className="h-4 w-4" />
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-mono">
                                Content Strategy
                            </span>
                        </div>
                        <h3 className="text-3xl font-light text-white tracking-wide">
                            Content <span className="font-serif italic text-zinc-500">Pillars</span>
                        </h3>
                    </div>

                    <div className="text-right hidden sm:block">
                        <p className="text-xs text-zinc-500 font-mono mb-1">OUTCOME</p>
                        <p className="text-sm text-white/80 max-w-xs leading-relaxed">
                            Zero guesswork. A repeatable routine of high-signal topics.
                        </p>
                    </div>
                </div>

                {/* Pillars Container - Flex Accordion */}
                <div
                    className="flex-1 flex gap-2 w-full min-h-0 relative group/container"
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    {pillars.map((pillar, index) => {
                        const isHovered = hoveredIndex === index;
                        const isAnyHovered = hoveredIndex !== null;

                        return (
                            <motion.div
                                key={index}
                                onMouseEnter={() => setHoveredIndex(index)}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    flex: isHovered ? 3.5 : 1,
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.16, 1, 0.3, 1], // Custom cinematic easing
                                    delay: index * 0.05
                                }}
                                className={cn(
                                    "relative rounded-xl overflow-hidden border transition-colors duration-500 cursor-default",
                                    isHovered ? "border-white/40 shadow-2xl z-10" : "border-white/10 bg-zinc-900/50",
                                    isAnyHovered && !isHovered ? "opacity-50 blur-[1px]" : "opacity-100"
                                )}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={pillar.image}
                                        alt={pillar.title}
                                        fill
                                        className={cn(
                                            "object-cover transition-all duration-700",
                                            isHovered ? "scale-105 opacity-60 saturate-100" : "scale-100 opacity-20 grayscale saturate-0"
                                        )}
                                        sizes="(max-width: 768px) 100vw, 20vw"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-t via-black/50 to-transparent transition-opacity duration-500",
                                        isHovered ? "from-black/90 opacity-100" : "from-black/80 opacity-80"
                                    )} />

                                    {/* Color Tint on Hover */}
                                    <div className={cn(
                                        "absolute inset-0 bg-gradient-to-b opacity-0 transition-opacity duration-500",
                                        pillar.color,
                                        isHovered ? "opacity-30" : "opacity-0"
                                    )} />
                                </div>

                                {/* Content */}
                                <div className="absolute inset-0 z-10 flex flex-col justify-end p-5">
                                    {/* Number */}
                                    <div className={cn(
                                        "absolute top-4 right-4 text-xs font-mono transition-colors duration-300",
                                        isHovered ? "text-white" : "text-zinc-600"
                                    )}>
                                        0{index + 1}
                                    </div>

                                    {/* Icon/Title Group */}
                                    <div className="transform transition-transform duration-500 translate-y-0">
                                        <div className={cn(
                                            "h-0.5 bg-white/50 mb-3 transition-all duration-500",
                                            isHovered ? "w-12 bg-indigo-400" : "w-6 bg-zinc-700"
                                        )} />

                                        <h4 className={cn(
                                            "text-xl font-medium text-white mb-1 transition-all duration-300",
                                            isHovered ? "scale-105 origin-left" : ""
                                        )}>
                                            {pillar.title}
                                        </h4>

                                        <p className={cn(
                                            "text-xs font-mono mb-2 transition-colors duration-300",
                                            isHovered ? "text-indigo-300" : "text-zinc-500"
                                        )}>
                                            {pillar.subtitle}
                                        </p>

                                        {/* Expanded Description */}
                                        <div className={cn(
                                            "overflow-hidden transition-all duration-500 ease-in-out",
                                            isHovered ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0"
                                        )}>
                                            <p className="text-[13px] text-zinc-300 leading-snug">
                                                {pillar.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Filter Section Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-8 flex-none"
                >
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center">
                            <Filter className="h-3 w-3 text-zinc-500" />
                        </div>
                        <div className="text-sm text-zinc-400">
                            <span className="text-zinc-200 font-medium">The Filter:</span> What fits vs. what doesn't.
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-900/30 bg-emerald-900/10">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                            <span className="text-[10px] text-emerald-300 font-mono tracking-wide uppercase">On Brand</span>
                        </div>
                        <div className="h-px w-8 bg-zinc-800" />
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-900/30 bg-rose-900/10">
                            <XCircle className="h-3.5 w-3.5 text-rose-500" />
                            <span className="text-[10px] text-rose-300 font-mono tracking-wide uppercase">Noise</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
