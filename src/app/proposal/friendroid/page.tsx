"use client";

import { useEffect, useRef, useState } from "react";

import { NavDots, TopNav } from "./components/shared";

import { HeroSection } from "./components/HeroSection";
import { CurrentStateSection } from "./components/CurrentStateSection";
import { BelieveSection } from "./components/BelieveSection";
import { ProblemSection } from "./components/ProblemSection";
import { PackageSection } from "./components/PackageSection";
import { DeliverablesSection } from "./components/DeliverablesSection";
import { OutcomeSection } from "./components/OutcomeSection";
import { WhyUsSection } from "./components/WhyUsSection";
import { MethodSection } from "./components/MethodSection";
import { TimelineSection } from "./components/TimelineSection";
import { PricingSection } from "./components/PricingSection";
import { ThankYouSection } from "./components/ThankYouSection";

const sections = [
  "hero",
  "current-state",
  "believe",
  "problem",
  "package",
  "deliverables",
  "outcome",
  "why-us",
  "method",
  "timeline",
  "pricing",
  "thank-you",
];

export default function FriendroidProposal() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastIndexRef = useRef(-1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;
        const windowHeight = window.innerHeight || 1;
        const index = Math.round(container.scrollTop / windowHeight);
        const clampedIndex = Math.min(Math.max(index, 0), sections.length - 1);
        if (clampedIndex === lastIndexRef.current) return;
        lastIndexRef.current = clampedIndex;
        setActiveSection(clampedIndex);
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="snap-container">
      <NavDots sections={sections} activeIndex={activeSection} />
      <TopNav activeSection={activeSection} />

      <HeroSection />
      <CurrentStateSection />
      <BelieveSection />
      <ProblemSection />
      <PackageSection />
      <DeliverablesSection />
      <OutcomeSection />
      <WhyUsSection />
      <MethodSection />
      <TimelineSection />
      <PricingSection />
      <ThankYouSection />
    </div>
  );
}
