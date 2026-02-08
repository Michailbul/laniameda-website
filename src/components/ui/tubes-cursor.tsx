"use client";

import React, { useCallback, useEffect, useRef } from "react";

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
  const glowRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<{ tubes?: { setColors: (colors: string[]) => void; setLightsColors: (colors: string[]) => void }; dispose?: () => void } | null>(null);
  const paletteIndexRef = useRef(0);
  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerRenderRef = useRef({ x: 0, y: 0 });
  const pointerRafRef = useRef<number | null>(null);

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
    const stopPointerLoop = () => {
      if (pointerRafRef.current !== null) {
        cancelAnimationFrame(pointerRafRef.current);
        pointerRafRef.current = null;
      }
    };

    const animateGlow = () => {
      const target = pointerTargetRef.current;
      const current = pointerRenderRef.current;
      const easing = 0.16;

      current.x += (target.x - current.x) * easing;
      current.y += (target.y - current.y) * easing;

      if (glowRef.current) {
        const x = current.x - 300;
        const y = current.y - 300;
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      const dx = Math.abs(target.x - current.x);
      const dy = Math.abs(target.y - current.y);
      if (dx < 0.2 && dy < 0.2) {
        pointerRafRef.current = null;
        return;
      }
      pointerRafRef.current = requestAnimationFrame(animateGlow);
    };

    const handleMouseMove = (e: MouseEvent) => {
      pointerTargetRef.current = { x: e.clientX, y: e.clientY };
      if (pointerRafRef.current === null) {
        pointerRafRef.current = requestAnimationFrame(animateGlow);
      }
    };

    const centerX = window.innerWidth * 0.5;
    const centerY = window.innerHeight * 0.5;
    pointerTargetRef.current = { x: centerX, y: centerY };
    pointerRenderRef.current = { x: centerX, y: centerY };
    if (glowRef.current) {
      glowRef.current.style.transform = `translate3d(${centerX - 300}px, ${centerY - 300}px, 0)`;
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      stopPointerLoop();
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
    const handleGlobalClick = () => {
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
      <div
        className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.14) 0.45px, transparent 0.45px), radial-gradient(rgba(255,255,255,0.08) 0.35px, transparent 0.35px)",
          backgroundSize: "4px 4px, 3px 3px",
          backgroundPosition: "0 0, 1px 1px",
        }}
      >
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

      {/* Main canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Ambient glow effect following cursor */}
      <div 
        ref={glowRef}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-[1] opacity-20 blur-[120px] will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(131,56,236,0.4) 0%, transparent 70%)',
          transform: "translate3d(-300px, -300px, 0)",
        }}
      />
    </div>
  );
}
