"use client";

import { motion } from "framer-motion";
import { Section, Stagger, StaggerItem } from "./shared";

export function SolutionSection() {
    return (
        <Section id="solution" className="relative px-6 py-32 bg-[#0A0A0A] flex flex-col justify-center min-h-screen">
            <div className="max-w-[1000px] mx-auto w-full text-center">
                <Stagger>
                    <StaggerItem>
                        <span className="text-white/40 text-xs font-medium tracking-[0.2em] uppercase">
                            The Solution
                        </span>
                    </StaggerItem>

                    <StaggerItem>
                        <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-light mt-12 mb-8 tracking-tight">
                            Short term goal
                        </h2>
                    </StaggerItem>

                    <StaggerItem>
                        <p className="text-white/70 text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
                            Create a content engine that drives engagement and reach while maintaining a high-quality brand style.
                        </p>
                    </StaggerItem>

                    <StaggerItem>
                        <div className="mt-20 pt-16 border-t border-white/10">
                            <span className="text-white/40 text-xs tracking-[0.2em] uppercase font-mono">
                                To do this we offer
                            </span>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="mt-8"
                            >
                                <h3 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter">
                                    <span className="text-white">Creative Treatment</span>
                                    <br />
                                    <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                                        Discovery Package
                                    </span>
                                </h3>
                            </motion.div>
                        </div>
                    </StaggerItem>
                </Stagger>
            </div>
        </Section>
    );
}
