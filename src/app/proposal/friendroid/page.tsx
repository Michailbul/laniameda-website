"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GradientBackground } from "@/components/ui/noisy-gradient-backgrounds";

// Shared components
import {
  FRIENDROID_SECTIONS,
  ScrollProvider,
  isFriendroidSectionId,
  type FriendroidSectionId,
} from "./components/shared";
import { ThemeProvider } from "./components/ThemeContext";

// Section components
import { HeroSection } from "./components/HeroSection";
import { CanvasPageSection } from "./components/NextPageSection";
import { OutcomeSection } from "./components/OutcomeSection";
import { PricingSection } from "./components/PricingSection";
import { ScrollSectionRail } from "./components/ScrollSectionRail";

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

const INITIAL_REPLAY_TICKS: Record<FriendroidSectionId, number> = {
  hero: 0,
  "next-page": 0,
  outcome: 0,
  pricing: 0,
};

interface ExpandedCardRailState {
  active: boolean;
  progress: number;
}

export default function FriendroidProposal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInitialHashSyncRef = useRef(false);
  const hasRegisteredInitialSectionRef = useRef(false);
  const navTriggeredSectionRef = useRef<FriendroidSectionId | null>(null);
  const arrivedSectionsRef = useRef<Set<FriendroidSectionId>>(new Set());
  const [hasInitialHashSynced, setHasInitialHashSynced] = useState(false);
  const [activeSection, setActiveSection] = useState<FriendroidSectionId>("hero");
  const [replayTicks, setReplayTicks] =
    useState<Record<FriendroidSectionId, number>>(INITIAL_REPLAY_TICKS);
  const [expandedCardRailState, setExpandedCardRailState] =
    useState<ExpandedCardRailState>({
      active: false,
      progress: 0,
    });
  const [isMobile, setIsMobile] = useState(false);
  const [isHeroReady, setIsHeroReady] = useState(false);

  const jumpToSection = useCallback(
    (
      sectionId: FriendroidSectionId,
      historyMode: "push" | "replace" | "none" = "push"
    ) => {
      const container = containerRef.current;
      const targetSection = document.getElementById(sectionId);
      if (!container || !targetSection) return;

      const isNavJump = historyMode === "push";
      if (isNavJump) {
        navTriggeredSectionRef.current = sectionId;
        arrivedSectionsRef.current.add(sectionId);
        setReplayTicks((current) => ({
          ...current,
          [sectionId]: current[sectionId] + 1,
        }));
      }

      container.scrollTo({ top: targetSection.offsetTop, behavior: "auto" });
      setActiveSection(sectionId);

      const hash = `#${sectionId}`;
      if (historyMode === "push") {
        if (window.location.hash !== hash) {
          window.history.pushState(null, "", hash);
        } else {
          window.history.replaceState(null, "", hash);
        }
      } else if (historyMode === "replace") {
        window.history.replaceState(null, "", hash);
      }
    },
    []
  );

  const navigateToSection = useCallback(
    (sectionId: FriendroidSectionId) => {
      jumpToSection(sectionId, "push");
    },
    [jumpToSection]
  );

  const handleExpandedCardScrollSyncChange = useCallback(
    (state: ExpandedCardRailState) => {
      setExpandedCardRailState({
        active: state.active,
        progress: Math.min(1, Math.max(0, state.progress)),
      });
    },
    []
  );

  useEffect(() => {
    const syncFromHash = () => {
      const hashSection = window.location.hash.slice(1);
      if (isFriendroidSectionId(hashSection)) {
        jumpToSection(hashSection, "none");
        hasInitialHashSyncRef.current = true;
        setHasInitialHashSynced(true);
        return;
      }

      jumpToSection("hero", "none");
      hasInitialHashSyncRef.current = true;
      setHasInitialHashSynced(true);
    };

    const timer = window.setTimeout(() => {
      const hashSection = window.location.hash.slice(1);
      if (isFriendroidSectionId(hashSection)) {
        jumpToSection(hashSection, "replace");
      } else {
        jumpToSection("hero", "none");
      }
      hasInitialHashSyncRef.current = true;
      setHasInitialHashSynced(true);
    }, 80);

    window.addEventListener("hashchange", syncFromHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [jumpToSection]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const SECTION_SWITCH_BUFFER_PX = 12;
    let frameId: number | null = null;

    const getTrackedSections = () =>
      FRIENDROID_SECTIONS.map((sectionId) => ({
        sectionId,
        element: document.getElementById(sectionId),
      })).filter(
        (
          section
        ): section is { sectionId: FriendroidSectionId; element: HTMLElement } =>
          section.element instanceof HTMLElement
      );

    const getSectionDistanceFromAnchor = (
      sectionId: FriendroidSectionId,
      anchorY: number
    ) => {
      const element = document.getElementById(sectionId);
      if (!(element instanceof HTMLElement)) return Number.POSITIVE_INFINITY;
      const rect = element.getBoundingClientRect();
      const sectionCenterY = rect.top + rect.height * 0.5;
      return Math.abs(sectionCenterY - anchorY);
    };

    const resolveActiveSection = () => {
      const trackedSections = getTrackedSections();
      if (trackedSections.length === 0) return;

      const viewportHeight = window.innerHeight || container.clientHeight || 0;
      const anchorY = viewportHeight * 0.4;

      let nearestSection = trackedSections[0].sectionId;
      let nearestDistance = Number.POSITIVE_INFINITY;

      for (const section of trackedSections) {
        const rect = section.element.getBoundingClientRect();
        const sectionCenterY = rect.top + rect.height * 0.5;
        const distance = Math.abs(sectionCenterY - anchorY);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestSection = section.sectionId;
        }
      }

      setActiveSection((current) => {
        if (current === nearestSection) return current;

        const currentDistance = getSectionDistanceFromAnchor(current, anchorY);
        const shouldSwitch =
          nearestDistance + SECTION_SWITCH_BUFFER_PX < currentDistance;

        if (!shouldSwitch && Number.isFinite(currentDistance)) {
          return current;
        }

        return nearestSection;
      });
    };

    const tick = () => {
      resolveActiveSection();
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasInitialHashSynced) return;

    if (navTriggeredSectionRef.current === activeSection) {
      navTriggeredSectionRef.current = null;
      if (!hasRegisteredInitialSectionRef.current) {
        hasRegisteredInitialSectionRef.current = true;
      }
      arrivedSectionsRef.current.add(activeSection);
      return;
    }

    if (!hasRegisteredInitialSectionRef.current) {
      hasRegisteredInitialSectionRef.current = true;
      arrivedSectionsRef.current.add(activeSection);
      return;
    }

    if (arrivedSectionsRef.current.has(activeSection)) return;
    arrivedSectionsRef.current.add(activeSection);

    const timerId = window.setTimeout(() => {
      setReplayTicks((current) => ({
        ...current,
        [activeSection]: current[activeSection] + 1,
      }));
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [activeSection, hasInitialHashSynced]);

  useEffect(() => {
    if (!hasInitialHashSyncRef.current) return;

    const nextHash = `#${activeSection}`;
    if (window.location.hash === nextHash) return;
    window.history.replaceState(null, "", nextHash);
  }, [activeSection]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const syncMobileState = (event?: MediaQueryListEvent) => {
      const mobileViewport = event ? event.matches : mediaQuery.matches;
      setIsMobile(mobileViewport);
    };

    syncMobileState();
    mediaQuery.addEventListener("change", syncMobileState);

    return () => mediaQuery.removeEventListener("change", syncMobileState);
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
              { color: "rgba(255,235,59,1)", stop: "100%" },
            ]}
            noiseIntensity={1.5}
            noisePatternSize={70}
            noisePatternRefreshInterval={1}
          />
        </div>
        <div ref={containerRef} className="snap-container relative z-0">
          <ScrollProvider containerRef={containerRef}>
            <HeroSection
              activeSection={activeSection}
              onNavSelect={navigateToSection}
              replayTick={replayTicks.hero}
              onReadyStateChange={setIsHeroReady}
            />
            <CanvasPageSection
              replayTick={replayTicks["next-page"]}
              onExpandedCardScrollSyncChange={handleExpandedCardScrollSyncChange}
            />
            <OutcomeSection replayTick={replayTicks.outcome} />
            <PricingSection replayTick={replayTicks.pricing} />
            {isHeroReady && !isMobile ? (
              <ScrollSectionRail
                activeSection={activeSection}
                onNavSelect={navigateToSection}
                expandedCardState={
                  activeSection === "next-page"
                    ? expandedCardRailState
                    : { active: false, progress: 0 }
                }
              />
            ) : null}
          </ScrollProvider>
        </div>
      </ThemeProvider>
    </>
  );
}
