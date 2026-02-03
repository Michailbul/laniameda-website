"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function Section({ children, className, id }: SectionProps) {
    return (
        <section
            id={id}
            className={cn(
                "snap-section flex flex-col justify-center items-center w-full min-h-screen px-4 py-20 relative overflow-hidden",
                className
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-6xl mx-auto relative z-10"
            >
                {children}
            </motion.div>
        </section>
    );
}
