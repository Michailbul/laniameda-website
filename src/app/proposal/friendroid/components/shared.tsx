"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";

// Section wrapper with snap and entrance animation
export function Section({
    children,
    className = "",
    id,
}: {
    children: React.ReactNode;
    className?: string;
    id?: string;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.3 });

    return (
        <section
            ref={ref}
            id={id}
            className={`snap-section flex flex-col justify-center ${className}`}
        >
            <AnimatePresence>
                {isInView && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="w-full"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

// Staggered children animation container
export function Stagger({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: delay },
                },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Staggered item (child of Stagger)
export function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// Navigation dots for scroll-snap sections
export function NavDots({ sections, activeIndex }: { sections: string[]; activeIndex: number }) {
    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
            {sections.map((section, i) => (
                <a
                    key={section}
                    href={`#${section}`}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === i
                            ? "bg-cyan scale-150"
                            : "bg-white/30 hover:bg-white/60"
                        }`}
                    title={section}
                />
            ))}
        </div>
    );
}

// Top navigation bar
export function TopNav() {
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
        >
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                <span className="text-white text-sm font-medium tracking-wider">
                    LANIAMEDA
                </span>
                <div className="glass pill px-6 py-2.5 flex items-center gap-8">
                    {["Package", "Deliverables", "Pricing"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-white/70 text-sm hover:text-white transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                    <a
                        href="#pricing"
                        className="text-cyan text-sm font-medium hover:text-white transition-colors"
                    >
                        Start Project
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
