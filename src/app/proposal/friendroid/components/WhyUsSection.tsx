"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

export function WhyUsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.2 });
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section
            id="why-us"
            ref={containerRef}
            className="relative h-screen w-full bg-[#050505] snap-start snap-always overflow-hidden flex flex-col items-center justify-center p-6 md:p-12"
            aria-label="Why Us"
        >
            {/* ────────────────────────────────────────────────────────────────────────
          ENHANCED BACKGROUND: AURORA / NEBULA EFFECT
      ────────────────────────────────────────────────────────────────────────── */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Deep Field Base */}
                <div className="absolute inset-0 bg-black" />

                {/* Moving Aurora Gradients */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[50%] -left-[20%] w-[100vw] h-[100vh] bg-teal-900/20 rounded-full blur-[120px] mix-blend-screen"
                />
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, 50, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] right-[10%] w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[150px] mix-blend-screen"
                />
                <motion.div
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-[20%] left-[20%] w-[900px] h-[600px] bg-cyan-900/20 rounded-full blur-[130px] mix-blend-screen"
                />

                {/* Cinematic Noise Overlay */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
                    <svg className="w-full h-full">
                        <filter id="cinematicNoise">
                            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#cinematicNoise)" />
                    </svg>
                </div>
            </div>

            <div className="relative z-10 w-full max-w-[1400px] h-full flex flex-col gap-12 md:gap-16 items-center justify-center">

                {/* ────────────────────────────────────────────────────────────────────
            SECTION TITLE: WHY US
        ────────────────────────────────────────────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center text-center"
                >
                    {/* Decorative line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="w-16 h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent mb-6"
                    />

                    {/* Title with gradient */}
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
                        <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                            Why
                        </span>
                        <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent ml-3">
                            Us
                        </span>
                    </h2>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="mt-4 text-lg md:text-xl text-zinc-500 font-light max-w-md"
                    >
                        The expertise behind your content transformation
                    </motion.p>
                </motion.div>

                {/* Content row */}
                <div className="w-full flex flex-col md:flex-row gap-12 md:gap-24 items-center justify-center">

                    {/* ────────────────────────────────────────────────────────────────────
            ITEM 1: 180M VIEWS
        ────────────────────────────────────────────────────────────────────── */}
                <motion.div
                    style={{ y: y1 }}
                    className="flex-1 w-full flex flex-col justify-center items-start border-l border-white/10 pl-8 md:pl-12 py-8 group"
                >
                    {/* Highlight Line */}
                    <div className="w-12 h-1 bg-teal-500 mb-8 group-hover:w-24 transition-all duration-700 ease-out" />

                    {/* Metric */}
                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white mb-6 leading-[0.9]">
                        180M <br />
                        <span className="text-zinc-500 font-light">monthly views</span>
                    </h2>

                    {/* Subtext */}
                    <p className="text-xl md:text-2xl font-light text-zinc-400 max-w-md">
                        across short-form platforms <br />
                        <span className="text-teal-400/80 font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            (distribution experience)
                        </span>
                    </p>
                </motion.div>

                {/* ────────────────────────────────────────────────────────────────────
            ITEM 2: INTERSECTION
        ────────────────────────────────────────────────────────────────────── */}
                <motion.div
                    style={{ y: y2 }}
                    className="flex-1 w-full flex flex-col justify-center items-start border-l border-white/10 pl-8 md:pl-12 py-8 group"
                >
                    {/* Highlight Line */}
                    <div className="w-12 h-1 bg-indigo-500 mb-8 group-hover:w-24 transition-all duration-700 ease-out" />

                    {/* The Content */}
                    <p className="text-xl md:text-2xl font-light text-zinc-400 mb-4 max-w-sm">
                        deep background at the <br /> intersection of
                    </p>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                        <span className="block group-hover:text-indigo-300 transition-colors duration-500">
                            AI engineering
                        </span>
                        <span className="block text-zinc-700 text-4xl my-2">+</span>
                        <span className="block group-hover:text-pink-300 transition-colors duration-500">
                            generative production
                        </span>
                    </h2>
                </motion.div>

                </div>
            </div>
        </section>
    );
}
