"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    BookOpen,
    LayoutPanelLeft,
    Layers,
    Palette,
    Fingerprint,
    Map,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DeliverableTab } from "./deliverables/types";
import { HypothesesLibraryCard } from "./deliverables/HypothesesLibraryCard";
import { VisualDesignSystemCard } from "./deliverables/VisualDesignSystemCard";
import { ContentPillarsCard } from "./deliverables/ContentPillarsCard";
import { BrandClarityCard } from "./deliverables/BrandClarityCard";
import { RepurposingBlueprintCard } from "./deliverables/RepurposingBlueprintCard";
import { PilotScaleRoadmapCard } from "./deliverables/PilotScaleRoadmapCard";
import { DefaultPanel } from "./deliverables/DefaultPanel";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

// ─────────────────────────────────────────────────────────────────────────────
// Default Deliverables Data
// ─────────────────────────────────────────────────────────────────────────────

const defaultTabs: DeliverableTab[] = [
    {
        id: "hypotheses",
        label: "Hypotheses Library",
        eyebrow: "CONTENT",
        headline: "Know exactly what to post.",
        description:
            "A ranked library of content hypotheses: formats, angles, examples, KPIs, and priority order — so you never stare at a blank page again.",
        Icon: BookOpen,
        ContentComponent: HypothesesLibraryCard,
    },
    {
        id: "design",
        label: "Visual Design System",
        eyebrow: "DESIGN",
        headline: "A look that earns trust before you speak.",
        description:
            "Cohesive visual language: typography, color, layout, and motion that feels premium and intentional.",
        Icon: Palette,
        ContentComponent: VisualDesignSystemCard,
    },
    {
        id: "deck",
        label: "Content Pillars",
        eyebrow: "CONTENT",
        headline: "4–6 Repeatable Topics.",
        description:
            "You always know what to talk about. You stop overthinking. Posting becomes a repeatable routine.",
        Icon: LayoutPanelLeft,
        ContentComponent: ContentPillarsCard,
    },
    {
        id: "brand",
        label: "Brand Kernel",
        eyebrow: "STRATEGY",
        headline: "Brand Clarity Block",
        description:
            "Clarity on what the brand stands for, an elevator pitch that can lean a person in amount of 30 seconds.",
        Icon: Fingerprint,
        ContentComponent: BrandClarityCard,
    },
    {
        id: "repurposing",
        label: "Repurposing Blueprint",
        eyebrow: "EFFICIENCY",
        headline: "One topic, multiple posts.",
        description:
            "A simple method to turn one topic into multiple pieces across platforms — more content with less effort.",
        Icon: Layers,
        ContentComponent: RepurposingBlueprintCard,
    },
    {
        id: "roadmap",
        label: "Pilot → Scale Roadmap",
        eyebrow: "EXECUTION",
        headline: "Pilot → Scale Roadmap",
        description:
            "A ready-to-execute action plan that distills findings into clear steps. No ambiguity, just execution.",
        Icon: Map,
        ContentComponent: PilotScaleRoadmapCard,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Scroll Hijacking State Machine
// ─────────────────────────────────────────────────────────────────────────────
type ScrollState = "inactive" | "active" | "exiting";

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export function DeliverablesSection({
    tabs = defaultTabs,
}: {
    tabs?: DeliverableTab[];
}) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollStateRef = React.useRef<ScrollState>("inactive");
    const isVisibleRef = React.useRef(false);
    const entryCooldownRef = React.useRef<number>(0);

    const activeIndexRef = React.useRef(activeIndex);
    const tabsLengthRef = React.useRef(tabs.length);
    
    const setActiveIndexImmediate = React.useCallback((index: number) => {
        activeIndexRef.current = index;
        setActiveIndex(index);
    }, []);
    
    React.useEffect(() => {
        activeIndexRef.current = activeIndex;
    }, [activeIndex]);
    
    React.useEffect(() => {
        tabsLengthRef.current = tabs.length;
    }, [tabs.length]);

    const wheelGestureRef = React.useRef<{
        lastWheelAt: number;
        accumDeltaY: number;
        lastSwitchAt: number;
    }>({
        lastWheelAt: 0,
        accumDeltaY: 0,
        lastSwitchAt: 0,
    });

    // Helper functions for scroll lock
    const lockParentScroll = React.useCallback(() => {
        const container = document.querySelector('.snap-container');
        container?.classList.add('snap-disabled');
    }, []);

    const unlockParentScroll = React.useCallback(() => {
        const container = document.querySelector('.snap-container');
        container?.classList.remove('snap-disabled');
    }, []);

    // IntersectionObserver to detect when section is fully visible
    React.useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                const isFullyVisible = entry.intersectionRatio > 0.9;
                
                if (isFullyVisible && !isVisibleRef.current) {
                    // Section just became fully visible - activate scroll hijacking
                    isVisibleRef.current = true;
                    scrollStateRef.current = "active";
                    lockParentScroll();
                    
                    // Set cooldown to ignore residual scroll momentum from CSS snap
                    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
                    entryCooldownRef.current = now;
                    
                    // Reset gesture state completely
                    wheelGestureRef.current = {
                        lastWheelAt: 0,
                        accumDeltaY: 0,
                        lastSwitchAt: 0,
                    };
                } else if (!isFullyVisible && isVisibleRef.current) {
                    // Section is leaving view - deactivate
                    isVisibleRef.current = false;
                    scrollStateRef.current = "inactive";
                    unlockParentScroll();
                }
            },
            {
                threshold: [0, 0.5, 0.9, 1],
                root: document.querySelector('.snap-container'),
            }
        );

        observer.observe(container);

        return () => {
            observer.disconnect();
            unlockParentScroll();
        };
    }, [lockParentScroll, unlockParentScroll]);

    // Document-level wheel handler for scroll hijacking
    React.useEffect(() => {
        const SWITCH_THRESHOLD = 150;
        const ENTRY_COOLDOWN_MS = 600;
        const SWITCH_COOLDOWN_MS = 700;
        const GESTURE_RESET_GAP_MS = 400;

        const handleWheel = (e: WheelEvent) => {
            // Only handle if section is active
            if (scrollStateRef.current !== "active" || !isVisibleRef.current) {
                return;
            }

            // Always prevent default when section is active to avoid any page scroll
            e.preventDefault();
            e.stopPropagation();

            // Ignore horizontal scrolling
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

            const now = typeof performance !== "undefined" ? performance.now() : Date.now();
            const gesture = wheelGestureRef.current;
            
            // Ignore scroll events during entry cooldown (residual momentum from CSS snap)
            if (now - entryCooldownRef.current < ENTRY_COOLDOWN_MS) {
                return;
            }

            // Primary guard: cooldown after any tab switch - prevents double-scroll
            if (now - gesture.lastSwitchAt < SWITCH_COOLDOWN_MS) {
                return;
            }

            // Reset accumulated delta if there's a gap (new gesture)
            if (now - gesture.lastWheelAt > GESTURE_RESET_GAP_MS) {
                gesture.accumDeltaY = 0;
            }
            
            gesture.lastWheelAt = now;
            gesture.accumDeltaY += e.deltaY;

            const currentIndex = activeIndexRef.current;
            const tabsLength = tabsLengthRef.current;
            if (tabsLength <= 1) return;

            const isAtFirstTab = currentIndex === 0;
            const isAtLastTab = currentIndex === tabsLength - 1;
            const isScrollingDown = gesture.accumDeltaY > 0;
            const isScrollingUp = gesture.accumDeltaY < 0;

            // Check if trying to exit the section
            const isTryingToExitDown = isScrollingDown && isAtLastTab;
            const isTryingToExitUp = isScrollingUp && isAtFirstTab;

            if (isTryingToExitDown || isTryingToExitUp) {
                if (Math.abs(gesture.accumDeltaY) >= SWITCH_THRESHOLD) {
                    // User wants to exit - unlock and allow scroll
                    scrollStateRef.current = "exiting";
                    unlockParentScroll();
                    gesture.lastSwitchAt = now;
                    gesture.accumDeltaY = 0;
                    
                    setTimeout(() => {
                        if (!isVisibleRef.current) {
                            scrollStateRef.current = "inactive";
                        }
                    }, 800);
                }
                return;
            }

            // Not at boundary - check if we should switch tabs
            if (Math.abs(gesture.accumDeltaY) < SWITCH_THRESHOLD) return;

            const direction = gesture.accumDeltaY > 0 ? 1 : -1;
            const nextIndex = Math.min(Math.max(currentIndex + direction, 0), tabsLength - 1);
            if (nextIndex === currentIndex) {
                gesture.accumDeltaY = 0;
                return;
            }

            // Switch tab and reset
            gesture.lastSwitchAt = now;
            gesture.accumDeltaY = 0;
            setActiveIndexImmediate(nextIndex);
        };

        // Add non-passive listener at document level to intercept all wheel events
        document.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            document.removeEventListener("wheel", handleWheel);
        };
    }, [setActiveIndexImmediate, unlockParentScroll]);

    const activeTab = tabs[activeIndex];

    return (
        <section
            id="deliverables"
            ref={containerRef}
            aria-label="What you get"
            className="snap-section relative w-full bg-black"
        >
            {/* Background - Fixed behind content */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
                <div className="absolute left-1/2 top-1/4 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.06),transparent)] blur-3xl" />
                <div className="absolute bottom-1/4 right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.04),transparent)] blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto flex h-screen w-full max-w-[1280px] flex-col px-6 pt-16">
                {/* Section Header */}
                <div className="pointer-events-none text-center flex-none">
                    <p className="text-[10px] font-mono uppercase tracking-[0.34em] text-zinc-500">
                        What you get
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        Deliverables
                    </h2>
                </div>

                {/* Tabs */}
                <div className="mt-4 flex justify-center flex-none">
                    <ExpandableTabs
                        tabs={tabs.map((tab) => ({ title: tab.label, icon: tab.Icon }))}
                        selectedIndex={activeIndex}
                        onChange={(index) => index !== null && setActiveIndexImmediate(index)}
                        className={cn(
                            "bg-black/40 border-white/10 text-white shadow-[0_16px_50px_rgba(0,0,0,0.6)]",
                            "backdrop-blur-md",
                            "gap-1.5"
                        )}
                        activeColor="text-black bg-white"
                    />
                </div>

                {/* Active Panel */}
                <div className="mt-6 flex flex-1 items-center justify-center pb-6 min-h-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab?.id ?? "empty"}
                            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            {activeTab?.ContentComponent ? (
                                <activeTab.ContentComponent isActive />
                            ) : activeTab ? (
                                <DefaultPanel tab={activeTab} isActive />
                            ) : null}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
