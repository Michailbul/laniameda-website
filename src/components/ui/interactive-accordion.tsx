"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AccordionItem {
  id: string
  number: string
  title: string
  content: string
}

const items: AccordionItem[] = [
  {
    id: "ai-filmmaking",
    number: "01",
    title: "AI Filmmaking",
    content:
      "Generative video production that blurs the line between reality and imagination, creating cinematic experiences impossible to film traditionally.",
  },
  {
    id: "ai-ugc",
    number: "02",
    title: "AI UGC Creatorship",
    content: "Authentic, data-driven content creation at scale for the algorithm age, designed to engage and convert modern audiences.",
  },
  {
    id: "ai-design",
    number: "03",
    title: "AI Design",
    content: "Next-generation visual aesthetics powered by neural networks and human curation, redefining brand identities.",
  },
  {
    id: "vfx",
    number: "04",
    title: "VFX",
    content: "Seamless integration of computer-generated imagery to elevate storytelling and create impossible worlds.",
  },
  {
    id: "motion-design",
    number: "05",
    title: "Motion Design",
    content: "Fluid, kinetic typography and graphics that bring static concepts to life with rhythm and purpose.",
  },
  {
    id: "sound-design",
    number: "06",
    title: "Sound Design",
    content: "Immersive sonic landscapes and bespoke audio branding that add emotional depth to visual experiences.",
  },
]

export function UniqueAccordion() {
  const [activeId, setActiveId] = useState<string | null>("design")
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="w-full max-w-xl">
      <div className="space-y-0">
        {items.map((item, index) => {
          const isActive = activeId === item.id
          const isHovered = hoveredId === item.id
          const isLast = index === items.length - 1

          return (
            <div key={item.id}>
              <motion.button
                onClick={() => setActiveId(isActive ? null : item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="w-full group relative"
                initial={false}
              >
                <div className="flex items-center gap-6 py-5 px-1">
                  {/* Number with animated circle */}
                  <div className="relative flex items-center justify-center w-10 h-10">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white"
                      initial={false}
                      animate={{
                        scale: isActive ? 1 : isHovered ? 0.85 : 0,
                        opacity: isActive ? 1 : isHovered ? 0.1 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    />
                    <motion.span
                      className="relative z-10 text-sm font-medium tracking-wide"
                      animate={{
                        color: isActive ? "black" : "rgba(255,255,255,0.5)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.number}
                    </motion.span>
                  </div>

                  {/* Title */}
                  <motion.h3
                    className="text-2xl font-medium tracking-tight"
                    animate={{
                      x: isActive || isHovered ? 4 : 0,
                      color: isActive
                        ? "#ffffff"
                        : isHovered
                          ? "#ffffff"
                          : "rgba(255,255,255,0.5)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  >
                    {item.title}
                  </motion.h3>

                  {/* Animated indicator */}
                  <div className="ml-auto flex items-center gap-3">
                    <motion.div
                      className="flex items-center justify-center w-8 h-8"
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="text-white"
                        animate={{
                          opacity: isActive || isHovered ? 1 : 0.4,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.path
                          d="M8 1V15M1 8H15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          initial={false}
                        />
                      </motion.svg>
                    </motion.div>
                  </div>
                </div>

                {/* Animated underline */}
                <motion.div className="absolute bottom-0 left-0 right-0 h-px bg-white/20 origin-left" initial={false} />
                <motion.div
                  className="absolute bottom-0 left-0 h-px bg-white origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: isActive ? 1 : isHovered ? 0.3 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                />
              </motion.button>

              {/* Content */}
              <AnimatePresence mode="wait">
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                      transition: {
                        height: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2, delay: 0.1 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.1 },
                      },
                    }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      className="pl-16 pr-12 py-6 text-white/70 leading-relaxed"
                      initial={{ y: -10 }}
                      animate={{ y: 0 }}
                      exit={{ y: -10 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    >
                      {item.content}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </div>
  )
}
