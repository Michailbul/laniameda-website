"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Spline from '@splinetool/react-spline';
import KineticDotsLoader from "@/components/ui/kinetic-dots-loader";

export function HeroSection() {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <section id="hero" className="snap-section bg-white relative flex flex-col justify-between px-8 md:px-16 py-20 overflow-hidden">
            {/* Loading indicator */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-50 bg-white flex items-center justify-center"
                    >
                        <div className="scale-75">
                            <KineticDotsLoader />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spline 3D Robot - centered */}
            <div className="absolute inset-0 z-[5] pointer-events-none flex items-center justify-center">
                <div className="w-full h-full max-w-[900px]">
                    <Spline
                        scene="https://prod.spline.design/2gAWIkpkliN0GKg8/scene.splinecode"
                        style={{ width: '100%', height: '100%' }}
                        onLoad={() => setIsLoaded(true)}
                    />
                </div>
            </div>

            {/* Top section - Badge */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative z-20"
            >
                <span className="inline-block text-black/80 text-xs tracking-[0.4em] uppercase font-medium bg-white/80 backdrop-blur-sm border border-black/10 px-4 py-2.5 rounded-full shadow-sm">
                    Proposal for Friendroid
                </span>
            </motion.div>

            {/* Middle section - Main headline (left aligned) */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative z-20 max-w-[600px]"
            >
                <h1
                    className="text-[clamp(48px,8vw,100px)] font-extralight leading-[0.9] tracking-[-0.03em]"
                    style={{
                        color: '#000',
                        textShadow: '0 0 40px rgba(255,255,255,0.95), 0 0 80px rgba(255,255,255,0.9), 0 0 120px rgba(255,255,255,0.8)'
                    }}
                >
                    Creative
                    <br />
                    <span className="font-normal bg-[#98F4F9] px-4 py-1 leading-[0.8] inline-block my-1 text-black">Treatment</span>
                    <br />
                    Package
                </h1>
            </motion.div>

            {/* Bottom section - Pricing and info */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="relative z-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
            >
                {/* Left - Description */}
                <div className="max-w-[400px]">
                    <p
                        className="text-lg font-light mb-2"
                        style={{
                            color: 'rgba(0,0,0,0.7)',
                            textShadow: '0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.8)'
                        }}
                    >
                        Build a connected, trusted audience in the robotics niche
                    </p>
                    <p
                        className="text-sm font-light tracking-wide"
                        style={{
                            color: 'rgba(0,0,0,0.5)',
                            textShadow: '0 0 20px rgba(255,255,255,0.9)'
                        }}
                    >
                        strategy + system + decision rules <span className="opacity-50">·</span> not content production
                    </p>
                </div>

                {/* Right - Pricing */}
                <div
                    className="flex items-baseline gap-3"
                    style={{
                        textShadow: '0 0 40px rgba(255,255,255,0.95), 0 0 80px rgba(255,255,255,0.9)'
                    }}
                >
                    <span className="text-black text-5xl md:text-6xl font-extralight">$2,000</span>
                    <span className="text-black/30 text-xl">/</span>
                    <span className="text-black/60 text-xl">5 days</span>
                </div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isLoaded ? { opacity: 1 } : {}}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-black/40 text-xs tracking-widest uppercase">Scroll</span>
                    <div className="w-px h-6 bg-gradient-to-b from-black/20 to-transparent" />
                </motion.div>
            </motion.div>
        </section>
    );
}

