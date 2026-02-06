"use client";

import { useEffect, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useScrollProgress } from "./shared";

export function HeroExpandSection() {
  const { scrollY } = useScrollProgress();
  const [vh, setVh] = useState(800);

  useEffect(() => {
    setVh(window.innerHeight);
  }, []);

  // Use a unified scale transform instead of separate scaleX/scaleY for better performance
  // This section starts after hero (1vh), card scales from 1 to fill viewport
  const scale = useTransform(scrollY, [vh * 0.5, vh * 1.5], [1, 1.6]);

  // Opacity fades in during the first part of the scroll
  const opacity = useTransform(scrollY, [vh * 0.5, vh * 0.8], [0, 1]);

  return (
    <section
      id="hero-expand"
      className="snap-section relative flex items-center justify-center overflow-hidden bg-black"
    >
      <motion.div
        style={{ scale, opacity }}
        className="w-full max-w-6xl h-[620px] origin-center will-change-transform"
        // GPU acceleration hint
        initial={{ transform: "translateZ(0)" }}
      >
        <Card className="w-full h-full bg-black/[0.96] border-white/10 relative overflow-hidden rounded-2xl" />
      </motion.div>
    </section>
  );
}
