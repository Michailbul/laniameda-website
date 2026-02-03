"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Section } from "./shared";

const deliverables = [
    { id: "A", title: "Content Experiments Table", desc: "Notion database with hypotheses" },
    { id: "B", title: "Hook Bank", desc: "20-40 ready variations" },
    { id: "C", title: "Hero + Support Formats", desc: "Growth driver + trust builder" },
    { id: "D", title: "Repurpose Map", desc: "1 topic → 3 formats" },
    { id: "E", title: "Content Mix 7/2/1", desc: "Core, support, experiment" },
    { id: "F", title: "Brand Kernel", desc: "Voice & soundbites" },
    { id: "G", title: "Visual Direction", desc: "References & rules" },
    { id: "H", title: "Decision Rules", desc: "Metrics system" },
];

export function DeliverablesSection() {
    const [hoveredDeliverable, setHoveredDeliverable] = useState<string | null>(null);

    return (
        <Section id="deliverables" className="gradient-orange px-6">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 max-w-[1200px] mx-auto">
                <span className="text-white/80 text-xs tracking-[0.3em] uppercase font-medium">
                    Deliverables
                </span>
                <h2 className="text-white text-[clamp(40px,5vw,64px)] font-extralight leading-[1] mt-6 mb-16">
                    What you get
                </h2>

                <div className="grid grid-cols-4 gap-4">
                    {deliverables.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            onMouseEnter={() => setHoveredDeliverable(item.id)}
                            onMouseLeave={() => setHoveredDeliverable(null)}
                            className={`glass p-6 cursor-default transition-all duration-300 ${hoveredDeliverable === item.id ? "scale-105 bg-white/20" : ""
                                }`}
                        >
                            <span className="text-white/60 font-mono text-xs">{item.id}</span>
                            <h3 className="text-white text-lg font-medium mt-3 leading-tight">
                                {item.title}
                            </h3>
                            <p className="text-white/60 text-sm mt-2">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
