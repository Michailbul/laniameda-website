"use client";

import { useEffect } from "react";
import { useAnimationControls, useReducedMotion } from "framer-motion";

interface UseReplayAnimationOptions {
  replayTick: number;
  delay?: number;
  duration?: number;
  fromX?: number;
  fromY?: number;
  fromScale?: number;
}

export function useReplayAnimation({
  replayTick,
  delay = 0,
  duration = 0.75,
  fromX = 0,
  fromY = 24,
  fromScale = 1,
}: UseReplayAnimationOptions) {
  const controls = useAnimationControls();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const hidden = prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, x: fromX, y: fromY, scale: fromScale };

    controls.set(hidden);

    const frameId = window.requestAnimationFrame(() => {
      controls.start({
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
          delay,
          duration: prefersReducedMotion ? Math.min(duration, 0.25) : duration,
          ease: [0.16, 1, 0.3, 1],
        },
      });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [
    controls,
    delay,
    duration,
    fromScale,
    fromX,
    fromY,
    prefersReducedMotion,
    replayTick,
  ]);

  return controls;
}

