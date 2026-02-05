"use client";

import dynamic from "next/dynamic";
import * as React from "react";

import { NavDots, TopNav } from "./components/shared";

const HeroSection = dynamic(
  () => import("./components/HeroSection").then((m) => m.HeroSection)
);
const CurrentStateSection = dynamic(
  () => import("./components/CurrentStateSection").then((m) => m.CurrentStateSection)
);
const BelieveSection = dynamic(
  () => import("./components/BelieveSection").then((m) => m.BelieveSection)
);
const ProblemSection = dynamic(
  () => import("./components/ProblemSection").then((m) => m.ProblemSection)
);
const PackageSection = dynamic(
  () => import("./components/PackageSection").then((m) => m.PackageSection)
);
const DeliverablesSection = dynamic(
  () => import("./components/DeliverablesSection").then((m) => m.DeliverablesSection)
);
const OutcomeSection = dynamic(
  () => import("./components/OutcomeSection").then((m) => m.OutcomeSection)
);
const WhyUsSection = dynamic(
  () => import("./components/WhyUsSection").then((m) => m.WhyUsSection)
);
const MethodSection = dynamic(
  () => import("./components/MethodSection").then((m) => m.MethodSection)
);
const TimelineSection = dynamic(
  () => import("./components/TimelineSection").then((m) => m.TimelineSection)
);
const PricingSection = dynamic(
  () => import("./components/PricingSection").then((m) => m.PricingSection)
);
const ThankYouSection = dynamic(
  () => import("./components/ThankYouSection").then((m) => m.ThankYouSection)
);

const navSections = [
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

function DeferredMount({
  id,
  rootRef,
  children,
  rootMargin = "200% 0px",
}: {
  id: string;
  rootRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  rootMargin?: string;
}) {
  const [mounted, setMounted] = React.useState(false);
  const placeholderRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (mounted) return;
    const root = rootRef.current;
    const el = placeholderRef.current;
    if (!root || !el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (!entry.isIntersecting) return;
        setMounted(true);
        observer.disconnect();
      },
      { root, rootMargin, threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, rootMargin, rootRef]);

  if (mounted) return children;

  return (
    <section
      ref={(node) => {
        placeholderRef.current = node;
      }}
      id={id}
      aria-label={`${id} (loading)`}
      className="snap-section"
      style={{ minHeight: "100vh" }}
    />
  );
}

export default function FriendroidProposalClient() {
  const [activeSection, setActiveSection] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lastIndexRef = React.useRef(-1);

  React.useEffect(() => {
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
        if (index === lastIndexRef.current) return;
        lastIndexRef.current = index;
        setActiveSection(index);
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="snap-container">
      <NavDots sections={navSections} activeIndex={activeSection} />
      <TopNav activeSection={activeSection} />

      <HeroSection />
      <CurrentStateSection />

      <DeferredMount id="believe" rootRef={containerRef}>
        <BelieveSection />
      </DeferredMount>
      <DeferredMount id="problem" rootRef={containerRef}>
        <ProblemSection />
      </DeferredMount>
      <DeferredMount id="package" rootRef={containerRef}>
        <PackageSection />
      </DeferredMount>
      <DeferredMount id="deliverables" rootRef={containerRef}>
        <DeliverablesSection />
      </DeferredMount>
      <DeferredMount id="outcome" rootRef={containerRef}>
        <OutcomeSection />
      </DeferredMount>
      <DeferredMount id="why-us" rootRef={containerRef}>
        <WhyUsSection />
      </DeferredMount>
      <DeferredMount id="method" rootRef={containerRef}>
        <MethodSection />
      </DeferredMount>
      <DeferredMount id="timeline" rootRef={containerRef}>
        <TimelineSection />
      </DeferredMount>
      <DeferredMount id="pricing" rootRef={containerRef}>
        <PricingSection />
      </DeferredMount>
      <DeferredMount id="thank-you" rootRef={containerRef}>
        <ThankYouSection />
      </DeferredMount>
    </div>
  );
}
