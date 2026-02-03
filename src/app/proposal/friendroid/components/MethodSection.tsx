"use client";

import { motion } from "framer-motion";
import { Section } from "./shared";

const methodItems = [
    { num: 70, label: "Repeat", desc: "Scale winners", color: "cyan" },
    { num: 20, label: "Improve", desc: "Iterate structure", color: "white" },
    { num: 10, label: "Test", desc: "Experiments only", color: "orange" },
];

export function MethodSection() {
    return (
        <Section id="method" className="bg-charcoal space-grid px-6">
            <div className="max-w-[1100px] mx-auto">
                <span className="text-cyan text-xs tracking-[0.3em] uppercase font-medium">
                    Prioritization
                </span>
                <h2 className="text-white text-[clamp(40px,5vw,64px)] font-extralight leading-[1] mt-6 mb-20">
                    The 70 / 20 / 10 rule
                </h2>

                <div className="flex items-end justify-between gap-8">
                    {methodItems.map((item, i) => (
                        <motion.div
                            key={item.num}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="flex-1 text-center"
                        >
                            <span
                                className="text-[clamp(80px,15vw,160px)] font-extralight leading-none"
                                style={{ color: `var(--${item.color})` }}
                            >
                                {item.num}
                            </span>
                            <p className="text-white font-medium text-lg mt-4">{item.label}</p>
                            <p className="text-white/40 text-sm mt-1">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
