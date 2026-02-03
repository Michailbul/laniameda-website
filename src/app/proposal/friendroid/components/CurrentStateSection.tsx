"use client";

import { Section, Stagger, StaggerItem } from "./shared";

export function CurrentStateSection() {
    return (
        <Section id="current-state" className="bg-black relative px-6">
            <div className="relative z-10 max-w-[1000px] mx-auto text-center">
                <Stagger>
                    <StaggerItem>
                        <span className="text-white/40 text-xs tracking-[0.3em] uppercase font-medium">
                            The Reality
                        </span>
                    </StaggerItem>

                    <StaggerItem>
                        <h2 className="text-white text-[clamp(24px,4vw,48px)] font-extralight leading-[1.2] mt-8 mb-16">
                            You have the <span className="font-light text-blue-400">product</span> and <span className="font-light text-blue-400">conviction</span>.
                            <br />
                            <span className="text-white/50">You're missing the audience engine.</span>
                        </h2>
                    </StaggerItem>

                    <StaggerItem>
                        <div className="grid md:grid-cols-2 gap-8 text-left max-w-2xl mx-auto">
                            <div className="glass p-8 rounded-2xl border-l border-white/10">
                                <h3 className="text-white/60 text-xs tracking-wider uppercase mb-4">Without a system</h3>
                                <ul className="space-y-4">
                                    <li className="text-white/80 font-light flex gap-3">
                                        <span className="text-red-400/80">x</span>
                                        <span>Posting feels like guessing</span>
                                    </li>
                                    <li className="text-white/80 font-light flex gap-3">
                                        <span className="text-red-400/80">x</span>
                                        <span>Growth is sporadic, not reliable</span>
                                    </li>
                                    <li className="text-white/80 font-light flex gap-3">
                                        <span className="text-red-400/80">x</span>
                                        <span>Great products get ignored</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-2xl border border-white/5">
                                <h3 className="text-blue-300/80 text-xs tracking-wider uppercase mb-4">With this package</h3>
                                <p className="text-white/90 text-lg font-light leading-relaxed">
                                    We provide the system, the backlog, and the decision rules to execute flawlessly.
                                </p>
                            </div>
                        </div>
                    </StaggerItem>
                </Stagger>
            </div>
        </Section>
    );
}
