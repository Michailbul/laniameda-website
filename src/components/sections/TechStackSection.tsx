"use client";

import { motion } from "framer-motion";
import { DotScreenShader } from "@/components/ui/dot-shader-background";
import HyperTextParagraph from "@/components/ui/hyper-text-with-decryption";
import { techStack } from "@/data/portfolio";

export function TechStackSection() {
  return (
    <section className="dark relative z-40 h-screen overflow-hidden text-white">
      {/* DotShaderBackground */}
      <div className="absolute inset-0 z-0">
        <DotScreenShader />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="mx-auto max-w-5xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.55 }}
            className="mb-8 text-[clamp(2.5rem,6vw,5rem)] font-medium uppercase leading-[0.9] tracking-[0.08em]"
          >
            Our Tech Stack
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <HyperTextParagraph
              text="Runway Midjourney Stable-Diffusion GSAP Three.js Spline After-Effects Figma"
              highlightWords={[
                "Runway",
                "Midjourney",
                "GSAP",
                "Three.js",
                "Spline",
              ]}
              theme="dark"
            />
          </motion.div>

          {/* Floating Tech Cards */}
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                animate={{
                  y: [-10, 10, -10],
                  rotate: [
                    index % 2 ? -2 : 2,
                    index % 2 ? 2 : -2,
                    index % 2 ? -2 : 2,
                  ],
                }}
                // @ts-ignore - multiple transition objects
                transition={{
                  y: {
                    duration: 4 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotate: {
                    duration: 4 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="glass rounded-lg px-4 py-2"
              >
                <p className="text-sm font-medium text-white/90">{tech.name}</p>
                <p className="text-xs text-white/50">{tech.category}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
