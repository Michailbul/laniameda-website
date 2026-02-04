import * as React from "react";
import { cn } from "@/lib/utils";
import { DeliverableTab } from "./types";

export function DefaultPanel({
    tab,
    isActive,
}: {
    tab: DeliverableTab;
    isActive: boolean;
}) {
    return (
        <div className="flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
            <div
                className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-2xl border transition-all duration-500",
                    isActive
                        ? "border-white/20 bg-white/10"
                        : "border-white/10 bg-white/5"
                )}
            >
                <tab.Icon
                    className={cn(
                        "h-7 w-7 transition-colors duration-300",
                        isActive ? "text-white" : "text-zinc-400"
                    )}
                />
            </div>

            <p className="mt-6 text-xs font-semibold tracking-[0.18em] text-zinc-400">
                {tab.eyebrow}
            </p>

            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {tab.headline}
            </h3>

            <div className="mt-4 h-px w-16 bg-white/20" />

            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
                {tab.description}
            </p>

            <div
                className={cn(
                    "mt-10 flex h-48 w-full max-w-3xl items-center justify-center rounded-2xl border border-dashed transition-colors duration-500",
                    isActive
                        ? "border-white/20 bg-white/5"
                        : "border-white/10 bg-white/[0.02]"
                )}
            >
                <p className="text-sm text-zinc-500">Content canvas</p>
            </div>
        </div>
    );
}
