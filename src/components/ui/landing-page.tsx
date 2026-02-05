"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

declare module "threejs-components/build/cursors/tubes1.min.js" {
  export default function TubesCursor(
    canvas: HTMLCanvasElement,
    options: {
      tubes: {
        colors: string[];
        lights: {
          intensity: number;
          colors: string[];
        };
      };
    }
  ): {
    tubes: {
      setColors: (colors: string[]) => void;
      setLightsColors: (colors: string[]) => void;
    };
    dispose: () => void;
  };
}

// Mantras data
const MANTRAS = [
  {
    number: "01",
    title: "Attention to Details",
    description: "Every pixel, every interaction, every word matters. We obsess over the details others overlook.",
  },
  {
    number: "02",
    title: "Never Settle for Mediocrity",
    description: "Good enough is the enemy of great. We push boundaries until exceptional becomes standard.",
  },
  {
    number: "03",
    title: "Begin with the End in Mind",
    description: "We reverse-engineer success. Clear vision drives every decision from day one.",
  },
  {
export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<{ tubes?: { setColors: (colors: string[]) => void; setLightsColors: (colors: string[]) => void }; dispose?: () => void } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);

  const randomColors = (count: number): string[] => {
    const palettes = [
      ["#FF006E", "#FB5607", "#FFBE0B"],
      ["#8338EC", "#3A86FF", "#06FFB4"],
      ["#F72585", "#7209B7", "#4CC9F0"],
      ["#E63946", "#F77F00", "#FCBF49"],
    ];
    return palettes[Math.floor(Math.random() * palettes.length)].slice(0, count);
  };

  useEffect(() => {
    const initTimer = setTimeout(() => {
      import("threejs-components/build/cursors/tubes1.min.js")
        .then((module) => {
          const TubesCursor = module.default;
          
          if (canvasRef.current) {
            const app = TubesCursor(canvasRef.current, {
              tubes: {
                colors: ["#FF006E", "#8338EC", "#3A86FF"],
                lights: {
                  intensity: 180,
                  colors: ["#FF006E", "#FB5607", "#FFBE0B", "#06FFB4"]
                }
              }
            });
            appRef.current = app;
            setIsLoaded(true);
          }
        })
        .catch(err => console.error("Failed to load TubesCursor module:", err));
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (appRef.current && typeof appRef.current.dispose === "function") {
        appRef.current.dispose();
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    handleResize();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    if (appRef.current) {
      const newTubeColors = randomColors(3);
      const newLightColors = randomColors(4);
      
      if (appRef.current.tubes) {
        appRef.current.tubes.setColors(newTubeColors);
        appRef.current.tubes.setLightsColors(newLightColors);
      }
    }
  };

  return (
    <div className="relative bg-black">
      {/* HERO SECTION */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen w-full overflow-hidden cursor-pointer sticky top-0"
        onClick={handleClick}
      >
        {/* Film grain overlay */}
        <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.035] mix-blend-overlay">
          <svg className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
          </svg>
        </div>

        {/* Subtle grid overlay */}
        <div 
          className="fixed inset-0 z-5 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Animated corner accents */}
        <div className="fixed top-8 left-8 z-20 flex flex-col gap-2">
          <div className="w-12 h-px bg-white/40 animate-pulse" />
          <div className="w-6 h-px bg-white/20 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </div>
        <div className="fixed bottom-8 right-8 z-20 flex flex-col items-end gap-2">
          <div className="w-6 h-px bg-white/20 animate-pulse" style={{ animationDelay: '0.4s' }} />
          <div className="w-12 h-px bg-white/40 animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>

        {/* Floating geometric shapes */}
        {windowSize.width > 0 && (
          <>
            <div 
              className="fixed top-[15%] right-[10%] w-24 h-24 border border-white/10 rounded-full z-5 pointer-events-none transition-transform duration-700 ease-out"
              style={{ transform: `translate(${(mousePos.x - windowSize.width/2) * 0.02}px, ${(mousePos.y - windowSize.height/2) * 0.02}px)` }}
            />
            <div 
              className="fixed bottom-[20%] left-[8%] w-16 h-16 border border-white/5 rotate-45 z-5 pointer-events-none transition-transform duration-500 ease-out"
              style={{ transform: `translate(${(mousePos.x - windowSize.width/2) * -0.015}px, ${(mousePos.y - windowSize.height/2) * -0.015}px) rotate(45deg)` }}
            />
          </>
        )}

        {/* Main canvas */}
        <canvas ref={canvasRef} className="fixed inset-0 z-0" />
        
        {/* Hero content - Marketing focused */}
        <div className="relative h-full flex flex-col items-center justify-center z-10 px-6">
          {/* Trust indicator */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full text-[10px] tracking-[0.2em] uppercase text-white/40 bg-white/[0.02]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Available for Partnerships
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 1 }}
            className="m-0 p-0 text-white text-base font-semibold tracking-[0.15em] uppercase select-none"
            style={{ 
              fontSize: 'clamp(48px, 12vw, 140px)',
              textShadow: '0 0 60px rgba(255,255,255,0.15), 0 2px 10px rgba(0,0,0,0.5)'
            }}
          >
            LANIAMEDA
          </motion.h1>

          {/* Value proposition - Marketing focused */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6 max-w-xl text-center"
          >
            <p className="m-0 p-0 text-lg md:text-xl font-light text-white/70 leading-relaxed">
              We transform ambitious visions into
              <span className="block mt-1 bg-gradient-to-r from-purple-400 via-white to-orange-400 bg-clip-text text-transparent font-normal">
                unforgettable digital experiences
              </span>
            </p>
          </motion.div>

          {/* Social proof / CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <button className="px-8 py-3 bg-white text-black text-sm font-medium tracking-wide rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105">
              Start a Project
            </button>
            <button className="px-8 py-3 border border-white/20 text-white text-sm font-medium tracking-wide rounded-full hover:bg-white/5 transition-all duration-300">
              View Our Work
            </button>
          </motion.div>

          {/* Decorative line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isLoaded ? { scaleX: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 w-24 h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />

          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 0.4 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">
              Scroll to explore
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
          </motion.div>
        </div>

        {/* Ambient glow effect */}
        <div 
          className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-1 opacity-20 blur-[120px] transition-transform duration-300 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(131,56,236,0.4) 0%, transparent 70%)',
            left: mousePos.x - 300,
            top: mousePos.y - 300,
          }}
        />
      </motion.div>

      {/* HOW WE WORK SECTION */}
      <section className="relative z-20 bg-black min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-32">
          {/* Section header */}
          <div className="mb-20 md:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 font-mono block mb-4">
                Our Philosophy
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white/90">
                How We Work
              </h2>
              <p className="mt-6 text-lg text-white/50 max-w-2xl leading-relaxed">
                Four principles that guide every decision, every pixel, every line of code. This is our bible.
              </p>
            </motion.div>
          </div>

          {/* Mantras grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {MANTRAS.map((mantra, index) => (
              <MantraCard key={mantra.number} mantra={mantra} index={index} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-24 md:mt-32 text-center"
          >
            <div className="inline-flex flex-col items-center gap-6">
              <p className="text-white/40 text-sm tracking-wide">
                Ready to create something extraordinary?
              </p>
              <button className="group px-10 py-4 bg-gradient-to-r from-purple-600 to-orange-500 text-white text-sm font-medium tracking-wide rounded-full hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                Let&apos;s Build Together
              </button>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-white/60">
              LANIAMEDA
            </span>
            <span className="text-xs text-white/30">
              AI-native creative studio © 2026
            </span>
          </div>
        </footer>
      </section>
    </div>
  );
}
