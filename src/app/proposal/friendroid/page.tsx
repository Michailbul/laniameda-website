"use client";

import { useRef, useState, useEffect } from "react";
import { GradientBackground } from "@/components/ui/noisy-gradient-backgrounds";

// Shared components
import { NavDots, ScrollProvider } from "./components/shared";
import { ThemeProvider } from "./components/ThemeContext";

// Section components
import { HeroSection } from "./components/HeroSection";
import { CanvasPageSection } from "./components/NextPageSection";
import { OutcomeSection } from "./components/OutcomeSection";
import { PricingSection } from "./components/PricingSection";

// Theme script to prevent flash - runs before hydration
const themeScript = `
  (function() {
    const theme = localStorage.getItem("friendroid-theme");
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  })();
`;

const sections = [
  "hero",
  "next-page",
  "deliverables",
  "pricing",
];

export default function FriendroidProposal() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sectionElements = sections
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => node instanceof HTMLElement);

    if (sectionElements.length === 0) return;

    let rafId: number | null = null;

    const updateActiveSection = () => {
      const currentScrollTop = container.scrollTop;
      let nextIndex = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      for (const [index, section] of sectionElements.entries()) {
        const distance = Math.abs(section.offsetTop - currentScrollTop);

        if (distance < minDistance) {
          minDistance = distance;
          nextIndex = index;
        }
      }

      setActiveSection((prev) => (prev === nextIndex ? prev : nextIndex));
    };

    const scheduleUpdate = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateActiveSection();
      });
    };

    container.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      container.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <ThemeProvider>
        <div className="fixed inset-0 -z-10">
          <GradientBackground
            gradientOrigin="left-middle"
            colors={[
              { color: "rgba(50,0,0,1)", stop: "0%" },
              { color: "rgba(183,28,28,1)", stop: "30%" },
              { color: "rgba(244,67,54,1)", stop: "60%" },
              { color: "rgba(255,152,0,1)", stop: "85%" },
              { color: "rgba(255,235,59,1)", stop: "100%" }
            ]}
            noiseIntensity={1.5}
            noisePatternSize={70}
            noisePatternRefreshInterval={1}
          />
        </div>
        <div ref={containerRef} className="snap-container relative z-0">
          <ScrollProvider containerRef={containerRef}>
            <NavDots sections={sections} activeIndex={activeSection} />

            {/* Stage 1: Hero + Parallax Expand + Next Page */}
            <HeroSection />
            <CanvasPageSection />
            <OutcomeSection />
            <PricingSection />
          </ScrollProvider>
        </div>
      </ThemeProvider>
    </>
  );
}
