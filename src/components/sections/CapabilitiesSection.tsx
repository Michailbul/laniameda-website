"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Video, Image, Sparkles, Code } from "lucide-react";
import { capabilities } from "@/data/portfolio";

const iconMap = {
  Video: Video,
  Image: Image,
  Sparkles: Sparkles,
  Code: Code,
};

export function CapabilitiesSection() {
  return (
    <section className="dark relative z-40 h-screen overflow-y-auto px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.55 }}
          className="mb-12 text-center text-4xl font-medium tracking-tight"
        >
          What We Do Best
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
          {capabilities.map((cap, index) => {
            const Icon = iconMap[cap.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, amount: 0.3 }}
                className={
                  cap.size === "large"
                    ? "md:row-span-2"
                    : cap.size === "wide"
                      ? "md:col-span-2"
                      : ""
                }
              >
                <GlowCard
                  glowColor={cap.glowColor}
                  customSize
                  className="h-full min-h-[280px] p-8"
                >
                  <Icon className="mb-4 h-12 w-12 text-white/80" />
                  <h3 className="mb-2 text-2xl font-semibold">{cap.title}</h3>
                  <p className="mb-4 text-white/60">{cap.description}</p>
                  <ul className="space-y-2 text-sm text-white/50">
                    {cap.features.map((feature) => (
                      <li key={feature}>• {feature}</li>
                    ))}
                  </ul>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
