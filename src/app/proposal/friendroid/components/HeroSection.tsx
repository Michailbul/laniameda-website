"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/splite";
import { useScrollProgress } from "./shared";
import { useTheme } from "./ThemeContext";
import { Sun, Moon } from "lucide-react";
import HyperTextParagraph from "@/components/ui/hyper-text-with-decryption";
import { ProposalBadge } from "@/components/ui/proposal-badge";

export function HeroSection() {
  const [shouldRenderSpline, setShouldRenderSpline] = useState(false);
  const [vh, setVh] = useState(800);
  const { scrollY } = useScrollProgress();
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  const splineAppRef = useRef<any>(null);

  
  // Key words to trigger the effect
  const triggers = ["Treatment"];

  const bio = "Creative Treatment Package";

  useEffect(() => {
    setVh(window.innerHeight);
  }, []);

  // Scale from smaller card to fullscreen over the scroll
  const scale = useTransform(scrollY, [0, vh], [0.85, 1.35]);

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
    <section
      id="hero"
      className={`snap-section relative flex items-center justify-center px-6 md:px-16 py-20 overflow-hidden bg-transparent`}
    >
      {/* Fixed Logo - Top Left */}
      <Link
        href="/"
        className="fixed top-6 left-6 md:left-10 z-50 group"
      >
        <span className={`text-base font-semibold tracking-[0.15em] transition-colors duration-300 ${
          isLight ? "text-gray-900" : "text-white"
        }`}>
          LANIAMEDA
        </span>
      </Link>

      {/* Navbar */}
      <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-8 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300 ${
        isLight 
          ? "bg-white/70 border border-gray-200/50 shadow-lg shadow-gray-200/30" 
          : "bg-white/5 border border-white/10"
      }`}>
        {["Package", "Deliverables", "Pricing"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`text-sm font-medium transition-colors duration-200 ${
              isLight 
                ? "text-gray-600 hover:text-gray-900" 
                : "text-white/70 hover:text-white"
            }`}
          >
            {item}
          </a>
        ))}
        <a
          href="#pricing"
          className="text-sm font-medium text-teal-500 hover:text-teal-400 transition-colors duration-200"
        >
          Start Project
        </a>
      </nav>

      {/* Theme Toggle - Top Right */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 md:right-10 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
          isLight
            ? "bg-white border border-gray-200 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:border-teal-300"
            : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-teal-500/30"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isLight ? 0 : 180 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {isLight ? (
            <Moon className="w-5 h-5 text-gray-700" />
          ) : (
            <Sun className="w-5 h-5 text-teal-400" />
          )}
        </motion.div>
      </motion.button>

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
            : "bg-gradient-radial from-teal-500/10 via-transparent to-transparent"
        }`} 
        aria-hidden 
      />

      {/* Secondary glow - Tesla style accent */}
      <div 
        className={`absolute bottom-0 right-0 w-[600px] h-[400px] blur-3xl ${
          isLight 
            ? "bg-gradient-radial from-gray-200/15 via-transparent to-transparent" 
            : "bg-gradient-radial from-cyan-500/8 via-transparent to-transparent"
        }`} 
        aria-hidden 
      />

      <motion.div style={{ scale }} className="w-full max-w-6xl will-change-transform">
        <Card className={`w-full h-[620px] rounded-3xl relative overflow-hidden ${
          isLight
            ? "bg-gradient-to-br from-[#fefefe] to-[#f5f5f5] border border-gray-200/80 shadow-2xl shadow-gray-400/20"
            : "bg-gradient-to-br from-[#141414] to-[#0a0a0a] border border-white/[0.08] shadow-2xl shadow-black/50"
        }`}>
        
        {/* Inner glow edge */}
        <div className={`absolute inset-0 rounded-3xl pointer-events-none ${
          isLight
            ? "bg-gradient-to-b from-gray-100/50 to-transparent"
            : "bg-gradient-to-b from-white/[0.04] to-transparent"
        }`} />

        {/* Animated corner accent - Tesla style */}
        <div className={`absolute top-0 right-0 w-32 h-32 ${
          isLight ? "opacity-50" : "opacity-40"
        }`}>
          <div className={`absolute top-4 right-4 w-px h-16 bg-gradient-to-b ${
            isLight ? "from-gray-400" : "from-teal-500"
          } to-transparent`} />
          <div className={`absolute top-4 right-4 w-16 h-px bg-gradient-to-l ${
            isLight ? "from-gray-400" : "from-teal-500"
          } to-transparent`} />
        </div>
        
        <div className="flex h-full flex-col md:flex-row">
          <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
            <ProposalBadge text="Proposal for Friendroid" isLight={isLight} />

            <h1 className={`mt-8 text-4xl md:text-6xl font-medium tracking-tight ${
              isLight ? "text-gray-900" : "text-white"
            }`}>
              Creative Treatment
              <br />
              <span className={`bg-clip-text text-transparent ${
                isLight
                  ? "bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800"
                  : "bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400"
              }`}>
                Package
              </span>
            </h1>

            <p className={`mt-5 max-w-xl text-[15px] leading-relaxed font-light ${
              isLight ? "text-gray-500" : "text-white/70"
            }`}>
              <HyperTextParagraph
                text={"Build a connected, trusted audience in the robotics niche"}
                highlightWords={["robotics"]}
                className="text-[15px] font-light leading-relaxed"
                theme={isLight ? "light" : "dark"}
              />
            </p>

            <div className="mt-10 flex items-baseline gap-3">
              <span className={`text-4xl md:text-5xl font-extralight tracking-tight ${
                isLight ? "text-gray-900" : "text-white"
              }`}>$2,000</span>
              <span className={`text-xl ${
                isLight ? "text-gray-300" : "text-white/50"
              }`}>/</span>
              <span className={`text-lg font-light ${
                isLight ? "text-gray-400" : "text-white/70"
              }`}>5 days</span>
            </div>

            {/* Accent line - Tesla style */}
            <div className={`mt-8 h-px ${
              isLight
                ? "w-20 bg-gradient-to-r from-gray-400 to-transparent"
                : "w-16 bg-gradient-to-r from-teal-500 to-transparent"
            }`} />

            {/* Key Benefits */}
            <div className="mt-8 flex flex-wrap gap-3">
              {["Brand Strategy", "Visual Identity", "Content Framework"].map((benefit) => (
                <span
                  key={benefit}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border ${
                    isLight
                      ? "bg-white/60 border-gray-200/60 text-gray-600"
                      : "bg-white/5 border-white/10 text-white/60"
                  }`}
                >
                  {benefit}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#deliverables"
              className={`mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                isLight
                  ? "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
                  : "bg-teal-500 text-gray-900 hover:bg-teal-400 hover:shadow-lg hover:shadow-teal-500/20"
              }`}
            >
              Explore Package
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          <div className="flex-1 relative">
            {/* Glow behind 3D scene - neutral for light, cool for dark */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-[100px] ${
              isLight ? "bg-gradient-radial from-gray-300/30 via-gray-200/20 to-transparent" : "bg-gradient-radial from-teal-400/15 via-cyan-500/10 to-transparent"
            }`} aria-hidden />
            
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
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full border grid place-items-center ${
                    isLight ? "border-teal-400/40" : "border-teal-500/30"
                  }`}>
                    <div className={`w-2 h-2 rounded-full animate-pulse ${
                      isLight ? "bg-teal-500/80" : "bg-teal-500/60"
                    }`} />
                  </div>
                  <p className={`text-sm font-light ${
                    isLight ? "text-gray-400" : "text-white/60"
                  }`}>3D preview</p>
                  <p className={`mt-1 text-xs ${
                    isLight ? "text-gray-300" : "text-white/40"
                  }`}>
                    Enabled on desktop when motion is allowed.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        </Card>
      </motion.div>
    </section>
  );
}
