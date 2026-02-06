"use client";

import { useRef, useState, useEffect } from "react";
import { GradientBackground } from "@/components/ui/noisy-gradient-backgrounds";

// Shared components
import { NavDots, TopNav, ScrollProvider } from "./components/shared";
import { ThemeProvider } from "./components/ThemeContext";

// Section components
import { HeroSection } from "./components/HeroSection";
import { CanvasPageSection } from "./components/NextPageSection";
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
  "pricing",
];

export default function FriendroidProposal() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let lastIndex = 0;

    const handleScroll = () => {
      // Throttle with RAF to prevent excessive updates during rapid scrolling
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollPos = container.scrollTop;
        const windowHeight = window.innerHeight;
        const index = Math.round(scrollPos / windowHeight);

        // Only update state if index changed
        if (index !== lastIndex) {
          lastIndex = index;
          setActiveSection(index);
        }
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      container.removeEventListener("scroll", handleScroll);
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
            <PricingSection />
          </ScrollProvider>
        </div>
      </ThemeProvider>
    </>
  );
}
