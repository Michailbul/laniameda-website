"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradualSpacingProps {
    text: string;
    duration?: number;
    delayMultiple?: number;
    framerProps?: Variants;
    className?: string;
}

export function GradualSpacing({
    text,
    duration = 0.5,
    delayMultiple = 0.04,
    framerProps = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
    },
    className,
}: GradualSpacingProps) {
    const words = text.split(" ");
    let runningLength = 0;

    return (
        <div className="flex flex-wrap gap-[0.3em] max-w-full">
            <AnimatePresence>
                {words.map((word, i) => {
                    const startDelay = runningLength * delayMultiple;
                    runningLength += word.length + 1; // +1 to account for the space we skipped

                    return (
                        <div key={i} className="flex whitespace-nowrap">
                            {word.split("").map((char, j) => (
                                <motion.div
                                    key={j}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    variants={framerProps}
                                    transition={{ duration, delay: startDelay + j * delayMultiple }}
                                    className={cn("drop-shadow-sm", className)}
                                >
                                    {char}
                                </motion.div>
                            ))}
                        </div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
