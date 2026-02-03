"use client";

import { Section } from "./shared";

export function PackageSection() {
    return (
        <Section id="package" className="bg-white px-6">
            <div className="max-w-[1100px] mx-auto">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <div>
                        <span className="text-indigo text-xs tracking-[0.3em] uppercase font-medium">
                            What You're Buying
                        </span>
                        <h2 className="text-black text-[clamp(48px,6vw,80px)] font-extralight leading-[0.95] mt-6">
                            Creative
                            <br />
                            Treatment
                        </h2>
                        <p className="text-muted text-lg mt-8 max-w-[400px]">
                            Not ideas for the sake of ideas. A{" "}
                            <span className="text-black font-medium">concrete action plan</span> +
                            decision rules for the first 30 days.
                        </p>
                        <div className="flex gap-3 mt-8">
                            {["Notion", "Database", "Strategy Call"].map((tag) => (
                                <span
                                    key={tag}
                                    className="pill border border-border text-muted text-sm px-4 py-2"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                        <span className="text-[clamp(80px,12vw,140px)] font-extralight text-black leading-none">
                            $2,000
                        </span>
                        <div className="flex items-center gap-4 justify-center md:justify-end mt-4">
                            <span className="text-muted">fixed</span>
                            <span className="w-12 h-px bg-border" />
                            <span className="text-muted">5 days</span>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
