"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
// motion import removed - animations disabled for performance testing
import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/splite";
import { GradientSlideButton } from "@/components/ui/gradient-slide-button";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useTheme } from "./ThemeContext";
import HyperTextParagraph from "@/components/ui/hyper-text-with-decryption";
import { ProposalBadge } from "@/components/ui/proposal-badge";
import { MagneticCursor } from "@/components/ui/magnetic-cursor";

export function HeroSection() {
  const [shouldRenderSpline, setShouldRenderSpline] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";
  const splineAppRef = useRef<any>(null);


  // Key words to trigger the effect
  const triggers = ["Treatment"];

  const bio = "Creative Treatment Package";

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setShouldRenderSpline(desktop.matches && !reducedMotion.matches);
    update();

    desktop.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      desktop.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  // Global mouse tracking for Spline robot
  useEffect(() => {
    if (!shouldRenderSpline || !splineAppRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Find the head object and make it look at mouse
      const head = splineAppRef.current.findObjectByName?.('Head') 
                || splineAppRef.current.findObjectByName?.('head')
                || splineAppRef.current.findObjectByName?.('Robot');
      
      if (head) {
        // Get robot's screen position
        const rect = head.getBoundingClientRect?.() || { left: 0, top: 0 };
        const headX = rect.left + (rect.width || 0) / 2;
        const headY = rect.top + (rect.height || 0) / 2;
        
        // Calculate angle to mouse
        const angleX = (e.clientY - headY) * 0.001;
        const angleY = (e.clientX - headX) * 0.001;
        
        // Apply rotation (clamp to reasonable range)
        head.rotation.x = Math.max(-0.5, Math.min(0.5, angleX));
        head.rotation.y = Math.max(-0.5, Math.min(0.5, angleY));
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [shouldRenderSpline]);

  return (
    <>
      {/* Unified Header Bar - Tesla/Robotics Style - Outside MagneticCursor */}
      <header className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 md:px-10 h-16">
        {/* Logo */}
        <Link
          href="/"
          className="text-[11px] font-medium tracking-[0.25em] uppercase text-white/90 hover:text-white transition-colors duration-300"
        >
          Laniameda
        </Link>

        {/* Center Nav - Sharp geometric Tesla style */}
        <nav className="flex items-center gap-0 bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
          {["Offer", "What you get", "Spin it up"].map((item, index) => (
            <a
              key={item}
              href="#"
              className={`relative px-6 py-3 text-[11px] font-normal tracking-[0.12em] uppercase text-white/50 hover:text-white hover:bg-white/[0.05] transition-all duration-200 ${
                index > 0 ? "border-l border-white/[0.06]" : ""
              }`}
            >
              {item}
            </a>
          ))}

          {/* CTA button - sharp, minimal */}
          <a
            href="#"
            className="px-6 py-3 text-[11px] font-medium tracking-[0.12em] uppercase text-black bg-white hover:bg-white/90 transition-all duration-200 border-l border-white/[0.06]"
          >
            Start Project
          </a>
        </nav>

        {/* Right spacer for balance */}
        <div className="w-20" />
      </header>

      <MagneticCursor
        magneticFactor={0.3}
        hoverPadding={4}
        blendMode="exclusion"
        cursorSize={40}
      >
      <section
        id="hero"
        className={`snap-section relative flex items-center justify-center px-6 md:px-16 py-20 bg-transparent`}
      >

      {/* Subtle grid pattern - SpaceX style - Always visible */}
      <div 
        className={`absolute inset-0 bg-[size:60px_60px] ${
          isLight 
            ? "bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)]" 
            : "bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]"
        }`} 
        aria-hidden 
      />
      
      {/* Radial glow from top center */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] blur-3xl ${
          isLight
            ? "bg-gradient-radial from-gray-300/20 via-gray-200/10 to-transparent"
            : "bg-gradient-radial from-white/8 via-white/3 to-transparent"
        }`}
        aria-hidden
      />

      {/* Secondary glow */}
      <div
        className={`absolute bottom-0 right-0 w-[600px] h-[400px] blur-3xl ${
          isLight
            ? "bg-gradient-radial from-gray-200/15 via-transparent to-transparent"
            : "bg-gradient-radial from-white/5 via-transparent to-transparent"
        }`}
        aria-hidden
      />

      <div className="w-full max-w-7xl">
        <Card className="w-full h-[720px] rounded-3xl relative bg-transparent border-0 shadow-none">
        
        <div className="flex h-full flex-col md:flex-row relative rounded-3xl">
          {/* Left section - Black background with curved right edge */}
          <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col bg-[#0a0a0a] md:rounded-r-[40px] md:mr-[-50px] shadow-[8px_0_40px_rgba(0,0,0,0.4)]">
            <div className="flex-1 flex flex-col justify-center">
            <ProposalBadge
              data-magnetic  
              data-magnetic-blend-mode="screen"
              text="Proposal for Friendroid"
              isLight={false}
            />

            <h1 className="mt-8 text-4xl md:text-6xl font-medium tracking-tight text-white">
              Creative Treatment
              <br />
              <span className="text-white/60">
                Package
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-relaxed font-light text-white/70">
              <HyperTextParagraph
                text={"Build a connected, trusted audience in the robotics niche"}
                highlightWords={["robotics"]}
                className="text-[15px] font-light leading-relaxed"
                theme="dark"
              />
            </p>

            <div className="mt-10 flex items-baseline gap-3">
              <span className="text-4xl md:text-5xl font-extralight tracking-tight text-white">$2,000</span>
              <span className="text-xl text-white/50">/</span>
              <span className="text-lg font-light text-white/70">5 days</span>
            </div>

            {/* Accent line - Tesla style */}
            <div className="mt-8 h-px w-16 bg-gradient-to-r from-white/60 to-transparent" />

            {/* Key Benefits */}
            <div className="mt-8 flex flex-wrap gap-3">
              {["Brand Strategy", "Visual Identity", "Content Framework"].map((benefit) => (
                <span
                  key={benefit}
                  className="px-3 py-1.5 text-xs font-medium rounded-full border bg-white/5 border-white/10 text-white/60"
                >
                  {benefit}
                </span>
              ))}
            </div>

            {/* High Contrast Demo Block */}
            <div 
              data-magnetic              
              className="mt-8 relative flex h-28 w-full max-w-sm items-center justify-between overflow-hidden rounded-2xl bg-white px-6 text-gray-900 shadow-2xl transition-transform hover:scale-[1.02]"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-widest opacity-60">
                  Explore 
                </span>
                <span className="text-xl font-bold tracking-tight">
                  The offer
                </span>
              </div>
              {/* Inverted icon circle */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white">
                 <ArrowUpRight className="h-5 w-5 pointer-events-none" />
              </div>
            </div>
            </div>
          </div>

          {/* Mobile divider */}
          <div className="md:hidden w-full h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          {/* Right section - White background with curved left edge */}
          <div className="flex-1 relative bg-white md:rounded-l-[60px] md:ml-[-40px] z-0">
            {/* Glow behind 3D scene - neutral for light background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[100px] bg-gradient-radial from-gray-300/40 via-gray-200/30 to-transparent" aria-hidden />
            
            {shouldRenderSpline ? (
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
                onLoad={(spline) => {
                  splineAppRef.current = spline;
                }}
              />
            ) : (
              <div className="w-full h-full grid place-items-center">
                <div className="text-center px-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full border grid place-items-center border-white/20">
                    <div className="w-2 h-2 rounded-full animate-pulse bg-white/60" />
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
    </section>
    </MagneticCursor>
    </>
  );
}
