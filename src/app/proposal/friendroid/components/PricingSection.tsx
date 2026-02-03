"use client";

import { motion } from "framer-motion";
import { Section } from "./shared";

export function PricingSection() {
    return (
        <Section id="pricing" className="bg-black space-grid px-6">
            <div className="max-w-[900px] mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="border border-cyan/30 rounded-3xl p-16 border-pulse"
                >
                    <span className="text-cyan text-xs tracking-[0.3em] uppercase font-medium">
                        Let's Build
                    </span>
                    <h2 className="text-white text-[clamp(48px,8vw,96px)] font-extralight leading-[0.9] mt-6">
                        Ready to
                        <br />
                        <span className="text-glow">launch?</span>
                    </h2>

                    <div className="flex items-baseline justify-center gap-4 mt-12">
                        <span className="text-white text-7xl font-extralight">$2,000</span>
                        <span className="text-white/40 text-xl">fixed</span>
                    </div>
                    <p className="text-white/40 text-lg mt-2">5 working days</p>

                    <motion.a
                        href="mailto:hello@laniameda.com?subject=Friendroid%20Creative%20Treatment%20Package"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-block mt-12 bg-cyan text-black font-medium tracking-wide px-12 py-4 rounded-full glow-cyan"
                    >
                        Start Project
                    </motion.a>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="max-w-[1100px] mx-auto mt-20 pt-8 border-t border-white/10 flex items-center justify-between">
                <span className="text-white/60 text-sm">LANIAMEDA</span>
                <span className="text-white/40 text-sm">AI Creative Marketing Studio</span>
                <span className="text-white/40 text-sm">2025</span>
            </div>
        </Section>
    );
}
