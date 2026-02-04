"use client";

import { Section, Stagger, StaggerItem } from "./shared";
import { GradualSpacing } from "@/components/ui/gradual-spacing";

export function CurrentStateSection() {
    return (
        <Section id="current-state" className="relative px-6 py-24 md:py-32 bg-[#0A0A0A]">
            <div className="max-w-[1000px] mx-auto">
                <Stagger>
                    <StaggerItem>
                        <h2 className="text-white text-md font-light tracking-[0.2em] uppercase mb-16 opacity-60">
                            Current state (today)
                        </h2>
                    </StaggerItem>

                    <StaggerItem>
                        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                            {/* Left: What you have */}
                            <div className="relative group h-full">
                                <div className="absolute -inset-4 bg-gradient-to-b from-blue-500/10 to-transparent rounded-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
                                <div className="relative border-l border-white/10 pl-8 md:pl-10 py-2 h-full flex flex-col justify-center">
                                    <span className="block text-white/40 font-light text-lg mb-4">
                                        What you have
                                    </span>
                                    <div className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight">
                                        e-shop
                                    </div>
                                </div>
                            </div>

                            {/* Right: What you don't have */}
                            <div className="relative group h-full">
                                <div className="absolute -inset-4 bg-gradient-to-b from-red-600/10 to-transparent rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 blur-2xl" />
                                <div className="relative border-l border-white/10 pl-8 md:pl-10 py-2 h-full flex flex-col justify-center">
                                    <span className="block text-white/40 font-light text-lg mb-4">
                                        What you don't have
                                    </span>
                                    <div className="text-2xl md:text-3xl font-light leading-relaxed text-white/90">
                                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                            <GradualSpacing
                                                text="audience"
                                                className="font-semibold text-white"
                                            />
                                            <span className="text-white/30 font-light">+</span>
                                            <GradualSpacing
                                                text="repeatable branded high quality content engine"
                                                className="font-semibold text-white"
                                            />
                                        </div>
                                        <span className="block mt-2 text-white/50 text-xl md:text-2xl">
                                            to monetize the audience
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </StaggerItem>
                </Stagger>
            </div>
        </Section>
    );
}
