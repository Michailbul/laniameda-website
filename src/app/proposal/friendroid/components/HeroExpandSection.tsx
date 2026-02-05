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

  // This section starts after hero (1vh), card scales from 1 to fill viewport
  const scaleX = useTransform(scrollY, [vh * 0.5, vh * 1.5], [1, 1.5]);
  const scaleY = useTransform(scrollY, [vh * 0.5, vh * 1.5], [1, 1.8]);
  const borderRadius = useTransform(scrollY, [vh * 0.5, vh * 1.5], [12, 0]);
  const opacity = useTransform(scrollY, [vh * 0.5, vh * 0.8], [0, 1]);

  return (
    <section
      id="hero-expand"
      className="snap-section relative flex items-center justify-center overflow-hidden bg-black"
    >
      <motion.div
        style={{ scaleX, scaleY, borderRadius, opacity }}
        className="w-full max-w-6xl h-[620px] origin-center"
      >
        <Card className="w-full h-full bg-black/[0.96] border-white/10 relative overflow-hidden" />
      </motion.div>
    </section>
  );
}
