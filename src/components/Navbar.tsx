"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Show navbar only on the first screen (hero section)
            // or we can make it sticky. Request was "nav bar should be only on the hero section"
            // So ensuring it disappears when we scroll past hero.
            if (window.scrollY > window.innerHeight * 0.8) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6"
                >
                    <div className="text-white font-bold text-xl tracking-tighter">
                        LANIAMEDA <span className="text-white/50 font-normal">AGENCY</span>
                    </div>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-white/80">
                        <a href="#purpose" className="hover:text-white transition-colors">Purpose</a>
                        <a href="#strategy" className="hover:text-white transition-colors">Strategy</a>
                        <a href="#deliverables" className="hover:text-white transition-colors">Deliverables</a>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-4 py-2 rounded-full glass text-white text-xs font-mono uppercase tracking-widest">
                            Confidential
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
