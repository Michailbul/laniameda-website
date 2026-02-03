"use client";

import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Hero() {
    return (
        <section className="h-screen w-full relative overflow-hidden hero-gradient snap-start flex flex-col items-center justify-center text-center px-4">
            <Navbar />

            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative z-10 max-w-4xl mx-auto space-y-8"
            >
                <div className="flex justify-center mb-6">
                    <span className="glass px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase text-white/80 border border-white/20">
                        Proposal for Client
                    </span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-tight drop-shadow-2xl">
                    CREATIVE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
                        TREATMENT
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                    Building a connected, trusted audience in the robotics niche.
                </p>

                <div className="pt-8">
                    <div className="inline-flex flex-col items-center gap-2">
                        <span className="text-sm font-mono text-white/60 uppercase tracking-widest">Fixed Price</span>
                        <span className="text-5xl font-bold text-white">$1,000</span>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Scroll to Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-50"></div>
            </motion.div>
        </section>
    );
}
