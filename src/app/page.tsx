"use client"

import { motion } from "framer-motion"
import TubesCursor from "@/components/ui/tubes-cursor"
import Loader from "@/components/ui/loader-15"

function BottomRightLoader() {
  return (
    <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-30 pointer-events-none">
      <div className="origin-bottom-right scale-[0.35] sm:scale-[0.5]">
        <Loader />
      </div>
    </div>
  )
}

function HeroContent() {
  return (
    <main className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-8 relative"
          style={{ filter: "url(#glass-effect)" }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-linear-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="text-white/90 text-xs font-light relative z-10">Creative studio</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[clamp(3rem,10vw,9.5rem)] leading-[0.9] uppercase font-semibold tracking-[0.15em] text-white mb-4"
        >
          Laniameda
        </motion.h1>

        {/* Description */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto text-[clamp(1rem,2.6vw,2rem)] font-light tracking-[0.12em] uppercase text-white/85 mb-6"
        >
          AI native creative studio
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.82 }}
          className="mx-auto max-w-2xl text-sm font-light text-white/70 mb-8 leading-relaxed"
        >
          We build cinematic brand experiences with obsessive craft, strategic clarity, and AI-powered execution.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="pointer-events-auto flex items-center justify-center gap-4 flex-wrap"
        >
          <button className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
            How we work
          </button>
          <a
            href="https://cal.com"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer"
          >
            Book a meeting
          </a>
        </motion.div>
      </div>
    </main>
  )
}

const manifestoRules = [
  "Attention to details",
  "Never settle for mediocrity",
  "Begin with the end in mind",
  "Approach everything as art",
]

function ManifestoSection() {
  return (
    <section id="manifesto-section" className="relative z-40 min-h-screen overflow-hidden px-6 py-24 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-black/45 to-black/75"
      />
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.55 }}
            className="lg:sticky lg:top-20"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.34em] text-white/70">Manifesto</p>
            <h2 className="text-[clamp(2.2rem,6.5vw,5.8rem)] font-medium uppercase leading-[0.88] tracking-[0.09em]">
              Four rules.
              <br />
              No excuses.
            </h2>
          </motion.div>

          <ol className="relative border-y border-white/20">
            {manifestoRules.map((rule, index) => (
              <motion.li
                key={rule}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, amount: 0.6 }}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-white/15 py-7 last:border-b-0"
              >
                <span className="font-mono text-sm tracking-[0.2em] text-white/55">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[clamp(1.15rem,3vw,2rem)] uppercase leading-tight tracking-[0.07em]">{rule}</h3>
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-white/25 transition-all duration-300 group-hover:scale-125 group-hover:bg-white/90"
                />
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Header({ onManifestoClick }: { onManifestoClick: () => void }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-30 flex items-center justify-end p-6"
    >
      {/* Navigation */}
      <nav className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-2">
        <button
          type="button"
          onClick={onManifestoClick}
          className="text-white/80 hover:text-white text-xs font-light px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
        >
          Manifesto
        </button>
      </nav>

      {/* Lets create Button Group with Arrow */}
      <div className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
        <a
          href="https://cal.com"
          target="_blank"
          rel="noreferrer"
          className="absolute right-0 px-2.5 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-[76px] z-0"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
        <a
          href="https://cal.com"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2 rounded-full bg-white text-black font-normal text-xs transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center z-10"
        >
          lets create
        </a>
      </div>
    </motion.header>
  )
}

export default function Home() {
  const scrollToManifesto = () => {
    document.getElementById("manifesto-section")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="relative min-h-screen w-screen bg-black">
      <div className="fixed inset-0 z-0">
        <TubesCursor />
      </div>

      <section className="relative z-20 h-screen w-screen overflow-hidden">
        {/* SVG Filters */}
        <svg className="absolute inset-0 w-0 h-0">
          <defs>
            <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence baseFrequency="0.005" numOctaves="1" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.3" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0.02
                      0 1 0 0 0.02
                      0 0 1 0 0.05
                      0 0 0 0.9 0"
                result="tint"
              />
            </filter>
            <filter id="gooey-filter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="gooey"
              />
              <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* Layout Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col pointer-events-none">
          <div className="pointer-events-auto">
            <Header onManifestoClick={scrollToManifesto} />
          </div>
          <div className="flex-1 relative pointer-events-none">
            <HeroContent />
            <BottomRightLoader />
          </div>
        </div>
      </section>
      <ManifestoSection />
    </div>
  )
}
