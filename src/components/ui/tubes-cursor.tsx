"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

const CLICK_CYCLE_PALETTES = [
  ["#FF006E", "#FB5607", "#FFBE0B"],
  ["#8338EC", "#3A86FF", "#06FFB4"],
  ["#F72585", "#7209B7", "#4CC9F0"],
  ["#E63946", "#F77F00", "#FCBF49"],
];

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

interface TubesCursorProps {
  autoCycleActive?: boolean;
  cycleIntervalSeconds?: number;
  cycleStartDelaySeconds?: number;
}

export default function TubesCursor({
  autoCycleActive = false,
  cycleIntervalSeconds = 0.9,
  cycleStartDelaySeconds = 0,
}: TubesCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<{ tubes?: { setColors: (colors: string[]) => void; setLightsColors: (colors: string[]) => void }; dispose?: () => void } | null>(null);
  const paletteIndexRef = useRef(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const cyclePalette = useCallback(() => {
    if (!appRef.current?.tubes) {
      return;
    }

    const palette = CLICK_CYCLE_PALETTES[paletteIndexRef.current % CLICK_CYCLE_PALETTES.length];
    paletteIndexRef.current += 1;

    const newTubeColors = palette.slice(0, 3);
    const newLightColors = Array.from({ length: 4 }, (_, index) => palette[index % palette.length]);
    appRef.current.tubes.setColors(newTubeColors);
    appRef.current.tubes.setLightsColors(newLightColors);
  }, []);

  useEffect(() => {
    const isInteractiveTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) {
        return false;
      }
      return Boolean(target.closest("a, button, input, textarea, select, label, [role='button']"));
    };

    const handleGlobalClick = (event: MouseEvent) => {
      if (isInteractiveTarget(event.target)) {
        return;
      }
      cyclePalette();
    };

    window.addEventListener("click", handleGlobalClick, true);
    return () => {
      window.removeEventListener("click", handleGlobalClick, true);
    };
  }, [cyclePalette]);

  useEffect(() => {
    if (!autoCycleActive) {
      return;
    }
    const delayMs = Math.max(cycleStartDelaySeconds, 0) * 1000;
    const intervalMs = Math.max(cycleIntervalSeconds, 0.2) * 1000;
    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      cyclePalette();
      intervalId = window.setInterval(() => {
        cyclePalette();
      }, intervalMs);
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [autoCycleActive, cycleIntervalSeconds, cycleStartDelaySeconds, cyclePalette]);

  return (
    <div
      className="relative h-screen w-screen bg-black overflow-hidden cursor-pointer"
    >
      {/* Film grain overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.035] mix-blend-overlay">
        <svg className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
        </svg>
      </div>

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 z-[5] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Animated corner accents */}
      <div className="absolute top-8 left-8 z-20 flex flex-col gap-2">
        <div className="w-12 h-[1px] bg-white/40 animate-pulse" />
        <div className="w-6 h-[1px] bg-white/20 animate-pulse" style={{ animationDelay: '0.2s' }} />
      </div>
      <div className="absolute bottom-8 right-8 z-20 flex flex-col items-end gap-2">
        <div className="w-6 h-[1px] bg-white/20 animate-pulse" style={{ animationDelay: '0.4s' }} />
        <div className="w-12 h-[1px] bg-white/40 animate-pulse" style={{ animationDelay: '0.6s' }} />
      </div>

      {/* Main canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Ambient glow effect following cursor */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-[1] opacity-20 blur-[120px] transition-transform duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(131,56,236,0.4) 0%, transparent 70%)',
          left: mousePos.x - 300,
          top: mousePos.y - 300,
        }}
      />
    </div>
  );
}
