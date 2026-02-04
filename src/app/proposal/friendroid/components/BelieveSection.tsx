"use client";

import { GlowCard } from '@/components/ui/spotlight-card'

import { HeroSection } from '@/components/ui/hero-section-with-smooth-bg-shader'

import { Section, Stagger, StaggerItem } from "./shared";

export function BelieveSection() {
    return (
        <Section id="believe" className="relative px-0 py-0">
            <HeroSection
                className="min-h-0 py-20"
                veilOpacity="bg-black/40"
                colors={[
                    "#0A0A0A", // black
                    "#141414", // charcoal
                    "#98F4F9", // cyan/teal accent
                    "#000000", // pure black
                    "#FFFFFF"  // white for some mixing
                ]}
                speed={0.2}
            >
                {/* Original content wrapper */}
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
                                <GlowCard customSize className="px-8 py-6 rounded-2xl border-0 !bg-[rgba(255,255,255,0.08)] backdrop-blur-xl" glowColor="cyan">
                                    <span className="text-white/60 text-xs tracking-wider uppercase font-mono">Emotional Value</span>
                                    <p className="text-white text-lg mt-2 relative z-10">status · affiliation · connection</p>
                                </GlowCard>
                                <GlowCard customSize className="px-8 py-6 rounded-2xl border-0 !bg-[rgba(255,255,255,0.08)] backdrop-blur-xl" glowColor="purple">
                                    <span className="text-white/60 text-xs tracking-wider uppercase font-mono">Practical Value</span>
                                    <p className="text-white text-lg mt-2 relative z-10">knowledge · skills · insight</p>
                                </GlowCard>
                            </div>
                        </StaggerItem>
                    </Stagger>
                </div>
            </HeroSection>
        </Section>
    );
}
