"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/spotlight-card";

export function CTASection() {
  return (
    <section className="dark relative z-40 h-screen overflow-hidden px-6 py-20 text-white">
      <div className="flex h-full items-center justify-center">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.55 }}
            className="mb-8 text-[clamp(2.5rem,6vw,5rem)] font-medium uppercase leading-[0.9] tracking-[0.08em]"
          >
            Ready to Create Something Extraordinary?
          </motion.h2>

          {/* Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10"
          >
            <GlowCard glowColor="cyan" customSize className="p-8">
              <p className="mb-4 text-lg italic text-white/80">
                "Laniameda transformed our vision into reality with stunning
                AI-generated content. Their technical expertise is unmatched."
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="h-12 w-12 rounded-full bg-cyan-500/20" />
                <div className="text-left">
                  <p className="font-semibold">Sarah Chen</p>
                  <p className="text-sm text-white/50">CEO, TechVision</p>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="https://cal.com/michael-buloichyk-zwzdvl/30min"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-8 py-3 text-xs font-normal text-black transition-all duration-200 hover:bg-white/90"
            >
              Book a meeting
            </a>
            <button
              type="button"
              className="rounded-full border border-white/30 bg-transparent px-8 py-3 text-xs font-normal text-white transition-all duration-200 hover:border-white/50 hover:bg-white/10"
              onClick={() => {
                // Scroll to portfolio section (section 2)
                const sections = document.querySelectorAll('section');
                if (sections[2]) {
                  sections[2].scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              View our work
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
