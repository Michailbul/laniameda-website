"use client";

import { useRef, useState, useEffect } from "react";
import { GradientBackground } from "@/components/ui/gradient-background";

// Shared components
import { NavDots, TopNav, ScrollProvider } from "./components/shared";
import { ThemeProvider } from "./components/ThemeContext";

// Section components
import { HeroSection } from "./components/HeroSection";
import { NextPageSection } from "./components/NextPageSection";

// Fiery sun gradient colors
const sunGradients = [
  "linear-gradient(135deg, #FF4500 0%, #FF6B35 50%, #FFB347 100%)",
  "linear-gradient(135deg, #FF6B35 0%, #FF8C42 50%, #FFD700 100%)",
  "linear-gradient(135deg, #E63946 0%, #FF4500 50%, #FF6B35 100%)",
  "linear-gradient(135deg, #FF8C42 0%, #FFB347 50%, #FFA500 100%)",
  "linear-gradient(135deg, #FF4500 0%, #FF6B35 50%, #FFB347 100%)",
];

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
];

export default function FriendroidProposal() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop;
      const windowHeight = window.innerHeight;
      const index = Math.round(scrollPos / windowHeight);
      setActiveSection(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <ThemeProvider>
        <GradientBackground
          gradients={sunGradients}
          animationDuration={10}
          animationDelay={0}
        >
          <div ref={containerRef} className="snap-container relative z-0">
            <ScrollProvider containerRef={containerRef}>
              <NavDots sections={sections} activeIndex={activeSection} />

              {/* Stage 1: Hero + Parallax Expand + Next Page */}
              <HeroSection />
              <NextPageSection />
            </ScrollProvider>
          </div>
        </GradientBackground>
      </ThemeProvider>
    </>
  );
}
