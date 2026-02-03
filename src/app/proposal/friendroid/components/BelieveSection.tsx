"use client";

import { Section, Stagger, StaggerItem } from "./shared";

export function BelieveSection() {
    return (
        <Section id="believe" className="hero-gradient relative px-6">
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
            <div className="relative z-10 max-w-[900px] mx-auto text-center">
                <Stagger>
                    <StaggerItem>
                        <span className="text-white/80 text-xs tracking-[0.3em] uppercase font-medium">
                            We Believe
                        </span>
                    </StaggerItem>
                    <StaggerItem>
                        <h2 className="text-white text-[clamp(32px,5vw,56px)] font-extralight leading-[1.2] mt-8 mb-8">
                            The right way to build a brand is to{" "}
                            <span className="font-light">provide value</span> to the audience.
                        </h2>
                    </StaggerItem>
                    <StaggerItem>
                        <div className="flex flex-col md:flex-row gap-8 justify-center mt-12">
                            <div className="glass px-8 py-6 rounded-2xl">
                                <span className="text-white/60 text-xs tracking-wider uppercase font-mono">Emotional Value</span>
                                <p className="text-white text-lg mt-2">status · affiliation · connection</p>
                            </div>
                            <div className="glass px-8 py-6 rounded-2xl">
                                <span className="text-white/60 text-xs tracking-wider uppercase font-mono">Practical Value</span>
                                <p className="text-white text-lg mt-2">knowledge · skills · insight</p>
                            </div>
                        </div>
                    </StaggerItem>
                </Stagger>
            </div>
        </Section>
    );
}
