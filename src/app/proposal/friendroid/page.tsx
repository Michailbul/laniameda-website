"use client";

import { useRef, useState, useEffect } from "react";

// Shared components
import { NavDots, TopNav } from "./components/shared";

// Section components
import { HeroSection } from "./components/HeroSection";
import { CurrentStateSection } from "./components/CurrentStateSection";
import { BelieveSection } from "./components/BelieveSection";
import { PackageSection } from "./components/PackageSection";
import { DeliverablesSection } from "./components/DeliverablesSection";
import { MethodSection } from "./components/MethodSection";
import { TimelineSection } from "./components/TimelineSection";
import { PricingSection } from "./components/PricingSection";

const sections = [
  "hero",
  "current-state",
  "believe",
  "package",
  "deliverables",
  "method",
  "timeline",
  "pricing",
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
    <div ref={containerRef} className="snap-container">
      <NavDots sections={sections} activeIndex={activeSection} />
      <TopNav />

      {/* Stage 1: Hero + Current State + We Believe */}
      <HeroSection />
      <CurrentStateSection />
      <BelieveSection />

      {/* Stage 2: Package + Deliverables */}
      <PackageSection />
      <DeliverablesSection />

      {/* Stage 3: Method + Timeline */}
      <MethodSection />
      <TimelineSection />

      {/* Stage 4: Pricing + CTA */}
      <PricingSection />
    </div>
  );
}
