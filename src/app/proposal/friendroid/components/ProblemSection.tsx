"use client";

import { useState } from "react";
import { Section } from "./shared";
import { cn } from "@/lib/utils";

interface RevealCardProps {
    number: string;
    text: string;
}

function RevealCard({ number, text }: RevealCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative w-full cursor-default select-none py-8 md:py-12"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative text-center">
                <span
                    className={cn(
                        "font-mono text-xs tracking-wider block mb-6 transition-colors duration-500",
                        isHovered ? "text-white/60" : "text-white/30"
                    )}
                >
                    {number}
                </span>

                {/* The text with explicit transition styles based on state */}
                <h3
                    style={{
                        filter: isHovered ? 'blur(0px)' : 'blur(12px)',
                        opacity: isHovered ? 1 : 0.4,
                        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
                    }}
                    className={cn(
                        "text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tighter leading-[0.95]",
                        "transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" // Smooth easing
                    )}
                >
                    {text}
                </h3>
            </div>
        </div>
    );
}

export function ProblemSection() {
    const problems = [
        { id: "problem-1", number: "01", text: "No audience" },
        { id: "problem-2", number: "02", text: "No value delivery content strategy" }
    ];

    return (
        <Section
            id="problem"
            className="relative px-6 py-32 flex flex-col justify-center min-h-screen overflow-hidden bg-gradient-to-br from-orange-600 via-red-500 to-orange-700"
        >
            {/* White grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, white 1px, transparent 1px),
                        linear-gradient(to bottom, white 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            />

            <div className="relative z-10 max-w-[1200px] mx-auto w-full">
                <h2 className="text-white text-xs font-medium tracking-[0.2em] uppercase mb-20 text-center opacity-60">
                    Two Problems
                </h2>

                <div className="flex flex-col gap-4 md:gap-8 items-center w-full">
                    {problems.map((problem) => (
                        <RevealCard
                            key={problem.id}
                            number={problem.number}
                            text={problem.text}
                        />
                    ))}
                </div>
            </div>
        </Section>
    );
}
