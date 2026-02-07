"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/splite";
import { ArrowUpRight } from "lucide-react";
import { useTheme } from "./ThemeContext";
import HyperTextParagraph from "@/components/ui/hyper-text-with-decryption";
import { ProposalBadge } from "@/components/ui/proposal-badge";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";
import { useScrollProgress, type FriendroidSectionId } from "./shared";
import { useReplayAnimation } from "./useReplayAnimation";

interface SplineObject {
  getBoundingClientRect?: () => {
    left: number;
    top: number;
    width?: number;
    height?: number;
  };
  rotation: {
    x: number;
    y: number;
  };
}

interface SplineApp {
  findObjectByName?: (name: string) => SplineObject | null;
}

interface HeroSectionProps {
  activeSection?: FriendroidSectionId;
  onNavSelect: (sectionId: FriendroidSectionId) => void;
  replayTick: number;
}

const NAV_ITEMS: Array<{ label: string; sectionId: FriendroidSectionId }> = [
  { label: "Offer", sectionId: "hero" },
  { label: "What you get", sectionId: "next-page" },
  { label: "Outcome", sectionId: "outcome" },
];

export function HeroSection({
  activeSection = "hero",
  onNavSelect,
  replayTick,
}: HeroSectionProps) {
  const [shouldRenderSpline, setShouldRenderSpline] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(900);
  const { theme } = useTheme();
  const { scrollY } = useScrollProgress();
  const prefersReducedMotion = useReducedMotion();
  const isLight = theme === "light";
  const splineAppRef = useRef<SplineApp | null>(null);

  const heroShellControls = useReplayAnimation({
    replayTick,
    fromY: 22,
    duration: 0.7,
  });
  const leftPanelControls = useReplayAnimation({
    replayTick,
    fromX: 110,
    fromY: 0,
    duration: 0.95,
    delay: 0.04,
  });
  const rightPanelControls = useReplayAnimation({
    replayTick,
    fromX: -110,
    fromY: 0,
    duration: 0.82,
    delay: 0.12,
  });

  useEffect(() => {
    const updateViewportHeight = () => setViewportHeight(window.innerHeight);
    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    return () => window.removeEventListener("resize", updateViewportHeight);
  }, []);

  const rawScale = useTransform(scrollY, [0, viewportHeight], [0.95, 1.1]);
  const scale = useSpring(rawScale, {
    stiffness: 105,
    damping: 16,
    mass: 0.45,
  });
  const parallaxStyle = prefersReducedMotion ? { scale: 1 } : { scale };

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () =>
      setShouldRenderSpline(desktop.matches && !reducedMotion.matches);
    update();

    desktop.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!shouldRenderSpline || !splineAppRef.current) return;

    const handleMouseMove = (event: MouseEvent) => {
      const head =
        splineAppRef.current?.findObjectByName?.("Head") ||
        splineAppRef.current?.findObjectByName?.("head") ||
        splineAppRef.current?.findObjectByName?.("Robot");

      if (!head) return;

      const rect = head.getBoundingClientRect?.() || { left: 0, top: 0 };
      const headX = rect.left + (rect.width || 0) / 2;
      const headY = rect.top + (rect.height || 0) / 2;

      const angleX = (event.clientY - headY) * 0.001;
      const angleY = (event.clientX - headX) * 0.001;

      head.rotation.x = Math.max(-0.5, Math.min(0.5, angleX));
      head.rotation.y = Math.max(-0.5, Math.min(0.5, angleY));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldRenderSpline]);

  const handleNavClick = useCallback(
    (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      sectionId: FriendroidSectionId
    ) => {
      event.preventDefault();
      onNavSelect(sectionId);
    },
    [onNavSelect]
  );

  return (
    <>
      <MagneticCursor
        magneticFactor={0.3}
        hoverPadding={4}
        blendMode="exclusion"
        cursorSize={40}
      >
        <header className="fixed left-0 right-0 top-0 z-[60] flex h-16 items-center justify-between px-6 md:px-10">
          <Link
            data-magnetic
            href="/"
            className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/90 transition-colors duration-300 hover:text-white"
          >
            Laniameda
          </Link>

          <nav className="flex items-center gap-0 border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  data-magnetic
                  key={item.label}
                  href={`#${item.sectionId}`}
                  onClick={(event) => handleNavClick(event, item.sectionId)}
                  className={`relative px-6 py-3 text-[11px] font-normal uppercase tracking-[0.12em] transition-all duration-200 ${
                    isActive
                      ? "bg-white/[0.12] text-white"
                      : "text-white/50 hover:bg-white/[0.05] hover:text-white"
                  } ${index > 0 ? "border-l border-white/[0.06]" : ""}`}
                >
                  {item.label}
                </a>
              );
            })}

            <a
              data-magnetic
              href="#pricing"
              onClick={(event) => handleNavClick(event, "pricing")}
              className={`border-l border-white/[0.06] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-200 ${
                activeSection === "pricing"
                  ? "bg-white/85 text-black"
                  : "bg-white text-black hover:bg-white/90"
              }`}
            >
              Start Project
            </a>
          </nav>

          <div className="w-20" />
        </header>

        <section
          id="hero"
          className="snap-section relative flex h-[100svh] items-center justify-center overflow-hidden bg-transparent"
        >
          <div
            className={`absolute inset-0 bg-[size:60px_60px] ${
              isLight
                ? "bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)]"
                : "bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
            }`}
            aria-hidden
          />

          <div
            className={`absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 blur-3xl ${
              isLight
                ? "bg-gradient-radial from-gray-300/[0.20] via-gray-200/[0.10] to-transparent"
                : "bg-gradient-radial from-white/[0.08] via-white/[0.03] to-transparent"
            }`}
            aria-hidden
          />

          <div
            className={`absolute bottom-0 right-0 h-[400px] w-[600px] blur-3xl ${
              isLight
                ? "bg-gradient-radial from-gray-200/[0.15] via-transparent to-transparent"
                : "bg-gradient-radial from-white/[0.05] via-transparent to-transparent"
            }`}
            aria-hidden
          />

          <div className="w-full max-w-7xl px-6 pb-8 pt-20 md:px-16 md:pb-6 md:pt-[4.5rem]">
            <motion.div
              style={parallaxStyle}
              animate={heroShellControls}
              initial={false}
              className="origin-center transform-gpu will-change-transform"
            >
              <Card className="relative isolate h-[min(620px,calc(100svh-8.5rem))] w-full overflow-hidden rounded-3xl border-0 bg-transparent shadow-none md:h-[min(660px,calc(100svh-8.5rem))]">
                <div className="relative flex h-full flex-col overflow-hidden rounded-3xl md:flex-row">
                  <motion.div
                    animate={leftPanelControls}
                    initial={false}
                    className="relative z-10 flex flex-1 flex-col bg-[#0a0a0a] p-8 shadow-[8px_0_40px_rgba(0,0,0,0.4)] md:mr-[-50px] md:rounded-r-[40px] md:p-12"
                  >
                    <div className="flex flex-1 flex-col justify-center">
                      <ProposalBadge
                        data-magnetic
                        data-magnetic-blend-mode="screen"
                        text="Proposal for Friendroid"
                        isLight={false}
                      />

                      <h1 className="mt-8 text-4xl font-medium tracking-tight text-white md:text-6xl">
                        Creative Treatment
                        <br />
                        <span className="text-white/60">Package</span>
                      </h1>

                      <p className="mt-5 max-w-xl text-[15px] font-light leading-relaxed text-white/70">
                        <HyperTextParagraph
                          text="Build a connected, trusted audience in the robotics niche"
                          highlightWords={["robotics"]}
                          className="text-[15px] font-light leading-relaxed"
                          theme="dark"
                        />
                      </p>

                      <div className="mt-10 flex items-baseline gap-3">
                        <span className="text-4xl font-extralight tracking-tight text-white md:text-5xl">
                          $2,000
                        </span>
                        <span className="text-xl text-white/50">/</span>
                        <span className="text-lg font-light text-white/70">10 days</span>
                      </div>

                      <div className="mt-8 h-px w-16 bg-gradient-to-r from-white/60 to-transparent" />

                      <div className="mt-8 flex flex-wrap gap-3">
                        {["Brand Strategy", "Visual Identity", "Content Framework"].map(
                          (benefit) => (
                            <span
                              key={benefit}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/60"
                            >
                              {benefit}
                            </span>
                          )
                        )}
                      </div>

                      <div
                        data-magnetic
                        className="relative mt-8 flex h-28 w-full max-w-sm items-center justify-between overflow-hidden rounded-2xl bg-white px-6 text-gray-900 shadow-2xl transition-transform hover:scale-[1.02]"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-medium uppercase tracking-widest opacity-60">
                            Explore
                          </span>
                          <span className="text-xl font-bold tracking-tight">The offer</span>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white">
                          <ArrowUpRight className="pointer-events-none h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/30 to-transparent md:hidden" />

                  <motion.div
                    animate={rightPanelControls}
                    initial={false}
                    className="relative z-0 flex-1 bg-white md:ml-[-40px] md:rounded-l-[60px]"
                  >
                    <div
                      className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-gray-300/40 via-gray-200/30 to-transparent blur-[100px]"
                      aria-hidden
                    />

                    {shouldRenderSpline ? (
                      <SplineScene
                        scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                        className="h-full w-full pointer-events-none"
                        onLoad={(spline) => {
                          splineAppRef.current = spline as SplineApp;
                        }}
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center">
                        <div className="px-6 text-center">
                          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border border-white/20">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-white/60" />
                          </div>
                          <p className="text-sm font-light text-gray-400">3D preview</p>
                          <p className="mt-1 text-xs text-gray-300">
                            Enabled on desktop when motion is allowed.
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </MagneticCursor>
    </>
  );
}
