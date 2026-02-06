"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const LavaLamp = dynamic(
  () => import("@/components/ui/fluid-blob").then((mod) => mod.LavaLamp),
  { ssr: false }
);
import { ArrowRight } from "lucide-react";

export function ThankYouSection() {
  return (
    <section id="thank-you" className="snap-section relative overflow-hidden">
      {/* LavaLamp Background */}
      <div className="absolute inset-0 z-0">
        <LavaLamp />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl"
        >
          <h2 className="text-[clamp(48px,8vw,100px)] font-extralight leading-[0.95] tracking-[-0.03em] text-white mix-blend-exclusion mb-8">
            Thank You
          </h2>

          <p className="text-lg md:text-xl text-white/80 mix-blend-exclusion max-w-2xl mx-auto mb-12 leading-relaxed">
            Ready to transform how the world sees robotics?
            <br />
            Let&apos;s build something remarkable together.
          </p>

          {/* CTA */}
          <motion.a
            href="mailto:hello@laniameda.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-medium tracking-tight hover:bg-white/90 transition-colors group"
          >
            <span>Let&apos;s make robots feel humane (again)</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="absolute bottom-8 text-white/40 text-sm mix-blend-exclusion"
        >
          Laniameda · Creative Studio
        </motion.p>
      </div>
    </section>
  );
}
