import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { DeliverableTab } from "./types";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

interface DeliverablesNavbarProps {
    tabs: DeliverableTab[];
    activeIndex: number;
    onTabClick: (index: number) => void;
}

export function DeliverablesNavbar({
    tabs,
    activeIndex,
    onTabClick,
}: DeliverablesNavbarProps) {
    return (
        <div className="absolute inset-x-0 top-0 z-50 pointer-events-none">
            {/* Minimal Header - Just Branding + Tabs */}
            <div className="w-full pointer-events-auto bg-black/90 backdrop-blur-md border-b border-white/5">
                <div className="w-full px-6 h-11 flex items-center justify-between gap-4">
                    {/* Left: Branding */}
                    <div className="w-[120px] shrink-0 text-[10px] font-medium tracking-[0.2em] text-white/70 uppercase select-none">
                        Laniameda
                    </div>

                    {/* Tabs */}
                    <div className="flex-1 flex items-center justify-center min-w-0">
                        <ExpandableTabs
                            tabs={tabs.map(tab => ({ title: tab.label, icon: tab.Icon }))}
                            selectedIndex={activeIndex}
                            onChange={(index) => index !== null && onTabClick(index)}
                            className="bg-transparent border-0 shadow-none p-0 gap-1 md:gap-2"
                            activeColor="text-black bg-white"
                        />
                    </div>

                    {/* Right: Counter */}
                    <div className="w-[120px] shrink-0 flex justify-end font-mono text-[10px] text-zinc-600">
                        {(activeIndex + 1).toString().padStart(2, '0')}
                        <span className="text-zinc-700 mx-1">/</span>
                        {tabs.length.toString().padStart(2, '0')}
                    </div>
                </div>
            </div>

            {/* Scroll Hint (Bottom)
            <AnimatePresence>
                {activeIndex < tabs.length - 1 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Scroll</span>
                            <motion.div
                                animate={{ height: [20, 40, 20], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-px bg-gradient-to-b from-transparent via-white/50 to-transparent"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence> */}
        </div>
    );
}
