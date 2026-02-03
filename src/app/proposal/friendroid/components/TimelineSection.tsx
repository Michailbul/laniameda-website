"use client";

import { motion } from "framer-motion";
import { Section } from "./shared";

const timelineItems = [
    { day: "01", title: "Foundation", desc: "Data & structure" },
    { day: "02", title: "Build", desc: "Hooks & hypotheses" },
    { day: "03", title: "Build", desc: "Refine priorities" },
    { day: "04", title: "Systematize", desc: "Maps & metrics" },
    { day: "05", title: "Deliver", desc: "Notion + call" },
];

export function TimelineSection() {
    return (
        <Section id="timeline" className="bg-white px-6">
            <div className="max-w-[1100px] mx-auto">
                <span className="text-indigo text-xs tracking-[0.3em] uppercase font-medium">
                    Timeline
                </span>
                <h2 className="text-black text-[clamp(40px,5vw,64px)] font-extralight leading-[1] mt-6 mb-16">
                    5 days to system
                </h2>

                <div className="flex gap-4">
                    {timelineItems.map((item, i) => (
                        <motion.div
                            key={item.day}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex-1 border border-border p-6 rounded-2xl hover:border-indigo hover:shadow-lg transition-all group"
                        >
                            <span className="font-mono text-indigo text-2xl">{item.day}</span>
                            <h3 className="text-black text-lg font-medium mt-4 group-hover:text-indigo transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-muted text-sm mt-1">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
