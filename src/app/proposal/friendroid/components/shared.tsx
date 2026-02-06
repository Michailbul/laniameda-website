"use client";

import { motion, useScroll, MotionValue } from "framer-motion";
import { createContext, useContext, RefObject } from "react";

// Scroll progress context for parallax animations
interface ScrollContextValue {
    scrollY: MotionValue<number>;
    containerRef: RefObject<HTMLDivElement | null>;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

export function ScrollProvider({ children, containerRef }: { children: React.ReactNode; containerRef: RefObject<HTMLDivElement | null> }) {
    const { scrollY } = useScroll({ container: containerRef });
    return (
        <ScrollContext.Provider value={{ scrollY, containerRef }}>
            {children}
        </ScrollContext.Provider>
    );
}

export function useScrollProgress() {
    const context = useContext(ScrollContext);
    if (!context) throw new Error("useScrollProgress must be used within ScrollProvider");
    return context;
}

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
    return (
        <section
            id={id}
            className={`snap-section flex flex-col justify-center ${className}`}
        >
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8 }}
                className="w-full"
            >
                {children}
            </motion.div>
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
    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        event.preventDefault();

        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;

        const snapContainer = targetSection.closest(".snap-container");
        if (snapContainer instanceof HTMLElement) {
            snapContainer.scrollTo({ top: targetSection.offsetTop, behavior: "smooth" });
        } else {
            targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        window.history.replaceState(null, "", `#${sectionId}`);
    };

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
            {sections.map((section, i) => (
                <a
                    key={section}
                    href={`#${section}`}
                    onClick={(event) => handleNavClick(event, section)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === i
                        ? "bg-cyan scale-150"
                        : "bg-white/30 hover:bg-white/60"
                        }`}
                    title={section}
                    aria-current={activeIndex === i ? "true" : undefined}
                />
            ))}
        </div>
    );
}

// Top navigation bar
export function TopNav({ activeSection = 0 }: { activeSection?: number }) {
    const isHero = activeSection === 0;

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
        >
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                <span className={`text-sm font-medium tracking-wider transition-all duration-300 ${isHero ? "text-black opacity-100" : "text-white opacity-0"
                    }`}>
                    LANIAMEDA
                </span>
                <div
                    className={`glass pill px-6 py-2.5 flex items-center gap-8 transition-all duration-300 ${isHero
                        ? "opacity-100 translate-y-0 pointer-events-auto bg-white/50 border-black/5"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                        }`}
                >
                    {["Package", "Deliverables", "Pricing"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-black/70 text-sm hover:text-black transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                    <a
                        href="#pricing"
                        className="text-cyan-600 text-sm font-medium hover:text-black transition-colors"
                    >
                        Start Project
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}
