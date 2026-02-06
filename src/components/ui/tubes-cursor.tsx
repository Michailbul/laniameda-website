"use client";

import React, { useEffect, useRef, useState } from "react";

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

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<{ tubes?: { setColors: (colors: string[]) => void; setLightsColors: (colors: string[]) => void }; dispose?: () => void } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

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
    <div
      onClick={handleClick}
      className="relative h-screen w-screen bg-black overflow-hidden cursor-pointer"
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
        className="fixed inset-0 z-[5] pointer-events-none opacity-[0.03]"
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
        <div className="w-12 h-[1px] bg-white/40 animate-pulse" />
        <div className="w-6 h-[1px] bg-white/20 animate-pulse" style={{ animationDelay: '0.2s' }} />
      </div>
      <div className="fixed bottom-8 right-8 z-20 flex flex-col items-end gap-2">
        <div className="w-6 h-[1px] bg-white/20 animate-pulse" style={{ animationDelay: '0.4s' }} />
        <div className="w-12 h-[1px] bg-white/40 animate-pulse" style={{ animationDelay: '0.6s' }} />
      </div>

      {/* Floating geometric shapes - respond to mouse */}
      {windowSize.width > 0 && (
        <>
          <div 
            className="fixed top-[15%] right-[10%] w-24 h-24 border border-white/10 rounded-full z-[5] pointer-events-none transition-transform duration-700 ease-out"
            style={{ transform: `translate(${(mousePos.x - windowSize.width/2) * 0.02}px, ${(mousePos.y - windowSize.height/2) * 0.02}px)` }}
          />
          <div 
            className="fixed bottom-[20%] left-[8%] w-16 h-16 border border-white/5 rotate-45 z-[5] pointer-events-none transition-transform duration-500 ease-out"
            style={{ transform: `translate(${(mousePos.x - windowSize.width/2) * -0.015}px, ${(mousePos.y - windowSize.height/2) * -0.015}px) rotate(45deg)` }}
          />
        </>
      )}

      {/* Main canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

      {/* Ambient glow effect following cursor */}
      <div 
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none z-[1] opacity-20 blur-[120px] transition-transform duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(131,56,236,0.4) 0%, transparent 70%)',
          left: mousePos.x - 300,
          top: mousePos.y - 300,
        }}
      />
    </div>
  );
}
