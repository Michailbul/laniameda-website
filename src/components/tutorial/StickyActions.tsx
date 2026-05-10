"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LiquidGlass } from "@/components/ui/liquid-glass"

interface StickyActionsProps {
  eyebrow: string
  title: string
  markdown: string
  skillHref: string
  skillFilename: string
}

export function StickyActions({ eyebrow, title, markdown, skillHref, skillFilename }: StickyActionsProps) {
  const [copied, setCopied] = useState(false)
  const [showCondensed, setShowCondensed] = useState(false)
  const timerRef = useRef<number | null>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowCondensed(!entry.isIntersecting),
      { rootMargin: "-1px 0px 0px 0px", threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* ignore — older browsers */
    }
  }

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-px w-full" />
      <div className="sticky top-3 z-40 -mx-2 sm:-mx-4 lg:-mx-6 px-2 sm:px-4 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <LiquidGlass
            radius={32}
            scale={-40}
            border={0.28}
            frost={0.04}
            blur={12}
            saturate={1.7}
            brightness={1.04}
            className="px-4 py-2.5 sm:px-5 sm:py-3"
          >
            {/* Top edge specular highlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />
            <div className="relative flex items-center justify-between gap-4">
            <div className="min-w-0 flex items-center gap-3">
              <span className="hidden sm:flex h-1.5 w-1.5 rounded-full bg-[#E5866F]" aria-hidden />
              <AnimatePresence mode="wait" initial={false}>
                {showCondensed ? (
                  <motion.div
                    key="condensed"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="min-w-0"
                  >
                    <p className="truncate text-xs sm:text-sm font-light text-white/85">{title}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="full"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 min-w-0"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/45 truncate">
                      {eyebrow}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href={skillHref}
                download={skillFilename}
                className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-3.5 sm:px-4 py-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-white/75 transition-all duration-200 hover:bg-white/[0.06] hover:border-white/30 hover:text-white"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                <span className="hidden sm:inline">Download skill</span>
                <span className="sm:hidden">Skill</span>
              </a>
              <button
                type="button"
                onClick={handleCopy}
                className="group relative inline-flex items-center gap-2 rounded-full bg-[#E5866F] px-3.5 sm:px-4 py-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-black transition-all duration-200 hover:bg-[#F0967F] cursor-pointer"
              >
                <span className="relative inline-flex h-3 w-3 items-center justify-center" aria-hidden>
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.svg
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    ) : (
                      <motion.svg
                        key="copy"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="absolute inset-0 w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3" />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </span>
                <span>{copied ? "Copied" : "Copy MD for AI"}</span>
              </button>
            </div>
            </div>
          </LiquidGlass>
        </motion.div>
      </div>
    </>
  )
}
