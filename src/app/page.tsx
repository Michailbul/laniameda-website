"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import TubesCursor from "@/components/ui/tubes-cursor"
import MusicArtwork from "@/components/ui/music-artwork"
import BlurText from "@/components/ui/blur-text"

function BottomRightPlaybackDock({
  isPlaying,
  isMantraHovered,
  hasMantraActivated,
}: {
  isPlaying: boolean
  isMantraHovered: boolean
  hasMantraActivated: boolean
}) {
  const showArtwork = isPlaying || isMantraHovered
  const shouldAnimateVinyl = hasMantraActivated && (isPlaying || isMantraHovered)

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[70] pointer-events-none">
      <AnimatePresence mode="wait" initial={false}>
        {showArtwork ? (
          <motion.div
            key="artwork"
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="origin-bottom-right pointer-events-none"
          >
            <MusicArtwork
              artist={MANTRA_TRACK_ARTIST}
              music={MANTRA_TRACK_TITLE}
              albumArt={MANTRA_TRACK_ALBUM_ART}
              isSong={true}
              isLoading={false}
              dockMode={true}
              showHoverExtras={false}
              sizePreset="dock"
              showVinyl={hasMantraActivated}
              isPlaying={shouldAnimateVinyl}
            />
          </motion.div>
        ) : (
          <motion.div
            key="loader"
            initial={{ opacity: 0, scale: 1.04, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none"
          >
            {/* Spinner removed as requested */}
            <div className="w-8 h-8" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function HeroContent({ onHowWeWorkClick }: { onHowWeWorkClick: () => void }) {
  return (
    <main className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
      <div className="text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-8 relative"
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-linear-to-r from-transparent via-white/20 to-transparent rounded-full" />
          <span className="text-white/90 text-xs font-light relative z-10">Creative studio</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-[clamp(3rem,10vw,9.5rem)] leading-[0.9] uppercase font-semibold tracking-[0.15em] text-white mb-4"
        >
          Laniameda
        </motion.h1>

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
          className="mx-auto max-w-2xl text-sm font-light text-white/70 mb-8 leading-relaxed flex flex-col items-center gap-1"
        >
          <span>we actually do art</span>
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-40">no fucking slop content</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="pointer-events-auto flex items-center justify-center gap-4 flex-wrap"
        >
          <button
            type="button"
            onClick={onHowWeWorkClick}
            className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer"
          >
            How we work
          </button>
          <a
            href="https://cal.com/michael-buloichyk-zwzdvl/30min"
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
  { title: "Attention to Details", desc: "Excellence lives in the micro-interactions" },
  { title: "Never Settle for Mediocrity", desc: "middleground where everyone dies" },
  { title: "Begin with the End in mind", desc: "Vision first, execution follows" },
  { title: "Approach everything as Art", desc: "Approach every pixel with intention" },
]

const MANTRA_AUDIO_SRC = "/assets/mantra.mp3"
const MANTRA_TARGET_VOLUME = 0.9
const MANTRA_START_AT_SECONDS = 207.2
const MANTRA_TUBES_CYCLE_SECONDS = 0.67
const MANTRA_TUBES_START_DELAY_SECONDS = 0.3
const SECTION_TRANSITION_SECONDS = 0.9
const SECTION_LOCK_MS = 940
const WHEEL_TRIGGER_THRESHOLD = 24
const SWIPE_TRIGGER_THRESHOLD = 42
const MANTRA_TRACK_ARTIST = "Drake"
const MANTRA_TRACK_TITLE = "Search & Rescue"
const MANTRA_TRACK_ALBUM_ART = "/assets/mantra.jpeg"

const SERVICES = [
  {
    number: "01",
    title: "AI Creatives",
    description: "Brand visuals that look crafted, not generated.",
    link: "https://cal.com/michael-buloichyk-zwzdvl/30min",
  },
  {
    number: "02",
    title: "AI UGC",
    description: "AI-generated creator content that converts, not cringes.",
    link: "https://cal.com/michael-buloichyk-zwzdvl/30min",
  },
  {
    number: "03",
    title: "AI Filmmaking",
    description: "Short-form cinematic production. AI-powered, human-directed.",
    link: "https://cal.com/michael-buloichyk-zwzdvl/30min",
  },
  {
    number: "04",
    title: "Products Development",
    description: "Websites, apps, and products — from concept to production.",
    link: "https://cal.com/michael-buloichyk-zwzdvl/30min",
  },
  {
    number: "05",
    title: "Agents",
    description: "Custom AI agents that remove the work you hate.",
    link: "https://cal.com/michael-buloichyk-zwzdvl/30min",
  },
  {
    number: "06",
    title: "AI Consultancy",
    description: "Strategic AI direction for creative brands.",
    link: "https://cal.com/michael-buloichyk-zwzdvl/30min",
  },
]

function MantraAudioBadge({
  onAudioActivityChange,
  onActivationChange,
}: {
  onAudioActivityChange: (isActive: boolean) => void
  onActivationChange: (isActivated: boolean) => void
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const rampFrameRef = useRef<number | null>(null)
  const pauseTimerRef = useRef<number | null>(null)
  const hasPreparedStartRef = useRef(false)
  const [isActivated, setIsActivated] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [clickPulse, setClickPulse] = useState(0)
  const [hasAudioError, setHasAudioError] = useState(false)

  const stopVolumeRamp = useCallback(() => {
    if (rampFrameRef.current !== null) {
      cancelAnimationFrame(rampFrameRef.current)
      rampFrameRef.current = null
    }
  }, [])

  const stopPauseTimer = useCallback(() => {
    if (pauseTimerRef.current !== null) {
      window.clearTimeout(pauseTimerRef.current)
      pauseTimerRef.current = null
    }
  }, [])

  const rampVolume = useCallback(
    (targetVolume: number, durationMs: number, easing: "in" | "out") => {
      const audio = audioRef.current
      if (!audio) return

      const clampVolume = (value: number) => Math.min(1, Math.max(0, value))
      stopVolumeRamp()
      const fromVolume = clampVolume(audio.volume)
      const normalizedTarget = clampVolume(targetVolume)
      const start = performance.now()

      const animate = (time: number) => {
        const progress = Math.min((time - start) / durationMs, 1)
        const eased = easing === "in" ? progress ** 3 : 1 - (1 - progress) ** 3
        const nextVolume = fromVolume + (normalizedTarget - fromVolume) * eased
        audio.volume = clampVolume(nextVolume)

        if (progress < 1) {
          rampFrameRef.current = requestAnimationFrame(animate)
          return
        }
        rampFrameRef.current = null
      }

      rampFrameRef.current = requestAnimationFrame(animate)
    },
    [stopVolumeRamp]
  )

  const prepareStartPoint = useCallback((audio: HTMLAudioElement) => {
    if (hasPreparedStartRef.current) return
    const duration = Number.isFinite(audio.duration) ? audio.duration : NaN
    audio.currentTime =
      Number.isFinite(duration) && duration > 0
        ? Math.min(MANTRA_START_AT_SECONDS, Math.max(duration - 0.05, 0))
        : MANTRA_START_AT_SECONDS
    hasPreparedStartRef.current = true
  }, [])

  const activateAudio = useCallback(async () => {
    setClickPulse((value) => value + 1)
    setHasAudioError(false)

    if (isActivated) return

    const audio = audioRef.current
    if (audio) {
      prepareStartPoint(audio)
      audio.volume = 0
      audio.muted = false
    }

    setIsActivated(true)
    onActivationChange(true)
  }, [isActivated, onActivationChange, prepareStartPoint])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        void activateAudio()
      }
    },
    [activateAudio]
  )

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.loop = true
    audio.volume = 0

    const handlePlay = () => {
      setIsPlaying(true)
      onAudioActivityChange(true)
    }

    const handlePause = () => {
      setIsPlaying(false)
      onAudioActivityChange(false)
    }

    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)

    return () => {
      stopVolumeRamp()
      stopPauseTimer()
      audio.pause()
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      onAudioActivityChange(false)
    }
  }, [onAudioActivityChange, stopPauseTimer, stopVolumeRamp])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isActivated) return

    let disposed = false

    const syncPlaybackToHover = async () => {
      if (isHovered) {
        stopPauseTimer()
        audio.muted = false

        if (audio.paused) {
          try {
            await audio.play()
          } catch {
            if (!disposed) {
              setHasAudioError(true)
              onAudioActivityChange(false)
            }
            return
          }
        }

        if (!disposed) {
          rampVolume(MANTRA_TARGET_VOLUME, 520, "in")
        }
        return
      }

      rampVolume(0, 380, "out")
      stopPauseTimer()
      pauseTimerRef.current = window.setTimeout(() => {
        audio.pause()
      }, 420)
    }

    void syncPlaybackToHover()

    return () => {
      disposed = true
    }
  }, [isActivated, isHovered, onAudioActivityChange, rampVolume, stopPauseTimer])

  const isIdle = !isActivated
  const isHoverGlow = isHovered && !isActivated
  const isEngaged = isPlaying || (isActivated && isHovered)
  const isReactive = isPlaying

  return (
    <div className="mb-8">
      <motion.div
        role="button"
        tabIndex={0}
        onClick={() => void activateAudio()}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        whileHover={{ x: 1.5 }}
        whileTap={{ scale: 0.992 }}
        className="group relative inline-flex cursor-pointer select-none items-end gap-4 rounded-full px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/45"
      >
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -left-4 -right-4 -top-3 -bottom-3 rounded-full"
          animate={{
            opacity: isEngaged ? [0.32, 0.6, 0.32] : isHoverGlow ? [0.16, 0.34, 0.16] : [0.08, 0.18, 0.08],
            scale: isEngaged ? [0.96, 1.05, 0.96] : isHoverGlow ? [0.98, 1.03, 0.98] : [0.99, 1.015, 0.99],
          }}
          transition={{ duration: isEngaged ? 1.35 : 2.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle at 42% 50%, rgba(255,138,61,0.33) 0%, rgba(255,67,157,0.14) 42%, rgba(255,255,255,0) 75%)",
            filter: "blur(8px)",
          }}
        />
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -left-2 -right-2 -top-1 -bottom-1 rounded-full"
          animate={{
            opacity: isHoverGlow ? 0.4 : isEngaged ? 0.52 : 0.2,
            scale: isHoverGlow ? 1.04 : isEngaged ? 1.06 : 1,
          }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          style={{
            background:
              "linear-gradient(112deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.18) 36%, rgba(255,153,84,0.34) 58%, rgba(255,58,144,0.24) 76%, rgba(255,255,255,0.02) 100%)",
            filter: "blur(14px)",
          }}
        />
        {clickPulse > 0 ? (
          <motion.span
            key={clickPulse}
            aria-hidden="true"
            className="pointer-events-none absolute -left-3 -right-3 -top-2 -bottom-2 rounded-full border border-white/40"
            initial={{ opacity: 0.85, scale: 0.86 }}
            animate={{ opacity: 0, scale: 1.16 }}
            transition={{ duration: 0.72, ease: [0.18, 1, 0.3, 1] }}
          />
        ) : null}

        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -left-2 -right-2 top-1/2 h-[1px] -translate-y-1/2 rounded-full"
          initial={false}
          animate={{ x: isHoverGlow ? ["-95%", "100%"] : "-110%", opacity: isHoverGlow ? [0, 0.55, 0] : 0 }}
          transition={
            isHoverGlow
              ? { duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: [0.28, 0.05, 0.32, 1] }
              : { duration: 0.3 }
          }
          style={{
            background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.95), rgba(255,255,255,0))",
            filter: "blur(0.3px)",
          }}
        />

        <div className="relative flex items-baseline gap-2.5">
          <motion.span
            className="text-[10px] uppercase tracking-[0.24em]"
            animate={{
              color: isEngaged
                ? "rgba(255,255,255,0.74)"
                : isHoverGlow
                  ? "rgba(255,255,255,0.64)"
                  : "rgba(255,255,255,0.28)",
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            OUR
          </motion.span>
          <motion.h3
            className="text-[clamp(1.45rem,3vw,2.3rem)] uppercase leading-[0.92] tracking-[0.14em]"
            animate={{
              color: isEngaged
                ? "rgba(255,255,255,0.96)"
                : isHoverGlow
                  ? "rgba(255,255,255,0.88)"
                  : "rgba(255,255,255,0.42)",
              textShadow: isEngaged
                ? "0 0 16px rgba(255,90,160,0.45), 0 0 34px rgba(255,130,20,0.3), 0 0 48px rgba(255,255,255,0.15)"
                : isHoverGlow
                  ? "0 0 12px rgba(255,90,160,0.36), 0 0 24px rgba(255,130,20,0.22)"
                  : "0 0 0px rgba(255,255,255,0)",
              letterSpacing: isEngaged ? "0.165em" : "0.14em",
              scale: isEngaged ? [1, 1.045, 1] : isHoverGlow ? [1, 1.03, 1] : 1,
            }}
            transition={{
              color: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              textShadow: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              letterSpacing: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              scale: isEngaged
                ? { duration: 0.95, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                : isHoverGlow
                  ? { duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                  : { duration: 0.35 },
            }}
          >
            MANTRA
          </motion.h3>
        </div>

        <div aria-hidden="true" className="mb-1.5 flex h-8 items-end gap-[3px]">
          {[0, 1, 2, 3, 4, 5].map((bar) => (
            <motion.span
              key={bar}
              className="block w-[2px] rounded-full bg-white"
              animate={
                isReactive
                  ? { height: [5, 18, 7, 15, 6], opacity: [0.45, 1, 0.72, 1, 0.6] }
                  : isHoverGlow
                    ? { height: [4, 11, 5, 9, 4], opacity: [0.25, 0.75, 0.35, 0.75, 0.25] }
                    : isIdle
                      ? { height: 3, opacity: [0.12, 0.3, 0.12] }
                      : { height: 4, opacity: 0.2 }
              }
              transition={
                isReactive
                  ? { duration: 0.85, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: bar * 0.06 }
                  : isHoverGlow
                    ? { duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: bar * 0.08 }
                    : isIdle
                      ? { duration: 2.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: bar * 0.1 }
                      : { duration: 0.5, ease: "easeOut" }
              }
            />
          ))}
        </div>
      </motion.div>
      <audio ref={audioRef} src={MANTRA_AUDIO_SRC} preload="auto" playsInline onError={() => setHasAudioError(true)} />
      {hasAudioError ? <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-white/45">Audio unavailable</p> : null}
    </div>
  )
}

function MantraAudioBadgeWithHover({
  onAudioActivityChange,
  onActivationChange,
  onHoverChange,
}: {
  onAudioActivityChange: (isActive: boolean) => void
  onActivationChange: (isActivated: boolean) => void
  onHoverChange: (isHovered: boolean) => void
}) {
  return (
    <div
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onFocus={() => onHoverChange(true)}
      onBlur={() => onHoverChange(false)}
    >
      <MantraAudioBadge onAudioActivityChange={onAudioActivityChange} onActivationChange={onActivationChange} />
    </div>
  )
}

function ManifestoSection({
  onMantraAudioActivityChange,
  onMantraActivationChange,
  onMantraHoverChange,
}: {
  onMantraAudioActivityChange: (isActive: boolean) => void
  onMantraActivationChange: (isActivated: boolean) => void
  onMantraHoverChange: (isHovered: boolean) => void
}) {
  const [hoveredRule, setHoveredRule] = useState<number | null>(null)

  return (
    <section id="manifesto-section" className="relative z-40 h-screen overflow-hidden px-6 py-20 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/80"
      />
      <div className="relative mx-auto flex h-full w-full max-w-6xl items-center">
        <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.55 }}
            className="self-start lg:self-center"
          >
            <MantraAudioBadgeWithHover
              onAudioActivityChange={onMantraAudioActivityChange}
              onActivationChange={onMantraActivationChange}
              onHoverChange={onMantraHoverChange}
            />
            <h2 className="text-[clamp(2rem,6vw,5rem)] font-semibold uppercase leading-[0.9] tracking-[0.06em]">
              What We<br />
              <span className="text-white/40">Believe In</span>
            </h2>
            <p className="mt-6 text-white/40 text-sm leading-relaxed max-w-sm">
              These principles guide every decision we make. They are the foundation of our craft.
            </p>
          </motion.div>

          <div
            className="space-y-0"
            onMouseLeave={() => setHoveredRule(null)}
          >
            {manifestoRules.map((rule, index) => (
              <motion.div
                key={rule.title}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, amount: 0.6 }}
                className="group relative border-t border-white/10 first:border-t-0"
                onMouseEnter={() => setHoveredRule(index)}
              >
                {/* Left accent bar */}
                <motion.div
                  className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full origin-top"
                  animate={{
                    scaleY: hoveredRule === index ? 1 : 0,
                    opacity: hoveredRule === index ? 0.8 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.08))" }}
                />

                {/* Background glow */}
                <motion.div
                  className="absolute -inset-x-3 inset-y-0 rounded-lg pointer-events-none"
                  animate={{ opacity: hoveredRule === index ? 1 : 0 }}
                  transition={{ duration: 0.35 }}
                  style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.03), transparent 70%)" }}
                />

                <div className="relative flex items-start gap-5 py-7 pl-4">
                  <motion.span
                    className="text-[1.8rem] font-mono leading-none tracking-tight shrink-0 w-10 tabular-nums select-none"
                    animate={{
                      color:
                        hoveredRule === null
                          ? "rgba(255,255,255,0.1)"
                          : hoveredRule === index
                            ? "rgba(255,255,255,0.3)"
                            : "rgba(255,255,255,0.04)",
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.span>
                  <div className="flex-1 pt-0.5">
                    <motion.h3
                      className="text-[clamp(1.1rem,2.5vw,1.5rem)] uppercase tracking-[0.08em] mb-1.5"
                      animate={{
                        color:
                          hoveredRule === null
                            ? "rgba(255,255,255,0.85)"
                            : hoveredRule === index
                              ? "rgba(255,255,255,1)"
                              : "rgba(255,255,255,0.25)",
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      {rule.title}
                    </motion.h3>
                    <motion.p
                      className="text-sm leading-relaxed"
                      animate={{
                        color:
                          hoveredRule === null
                            ? "rgba(255,255,255,0.35)"
                            : hoveredRule === index
                              ? "rgba(255,255,255,0.6)"
                              : "rgba(255,255,255,0.12)",
                        y: hoveredRule === index ? 0 : 2,
                      }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      {rule.desc}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WhatWeDoSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="what-we-do-section" className="relative z-40 h-screen w-screen overflow-hidden text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(160deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6">
        {/* Editorial header — asymmetric split */}
        <motion.div
          className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] font-mono text-white/30">
              What We Do
            </span>
            <h2 className="mt-2 text-[clamp(1.8rem,5vw,3.5rem)] font-semibold uppercase leading-[0.92] tracking-[0.04em]">
              The Work
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/35 sm:text-right">
            Art, engineering, and emotional depth — applied to the things brands actually need.
          </p>
        </motion.div>

        {/* Service List */}
        <div
          className="border-b border-white/10"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {SERVICES.map((service, index) => (
            <motion.a
              key={service.number}
              href={service.link}
              target="_blank"
              rel="noreferrer"
              className="group relative flex items-center border-t border-white/10 no-underline"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              {/* Left accent bar */}
              <motion.div
                className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full origin-top"
                animate={{
                  scaleY: hoveredIndex === index ? 1 : 0,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.12))" }}
              />

              {/* Background glow */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.04) 0%, transparent 60%)" }}
              />

              <div className="relative flex items-center gap-4 sm:gap-5 w-full py-3.5 sm:py-4 pl-4">
                {/* Oversized number */}
                <motion.span
                  className="text-[1.4rem] sm:text-[1.8rem] font-mono leading-none tracking-tight tabular-nums shrink-0 w-8 sm:w-10 select-none"
                  animate={{
                    color:
                      hoveredIndex === null
                        ? "rgba(255,255,255,0.1)"
                        : hoveredIndex === index
                          ? "rgba(255,255,255,0.3)"
                          : "rgba(255,255,255,0.04)",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {service.number}
                </motion.span>

                {/* Title */}
                <motion.span
                  className="text-[clamp(1rem,2.5vw,1.5rem)] uppercase tracking-[0.06em] shrink-0"
                  animate={{
                    color:
                      hoveredIndex === null
                        ? "rgba(255,255,255,0.55)"
                        : hoveredIndex === index
                          ? "rgba(255,255,255,0.95)"
                          : "rgba(255,255,255,0.18)",
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {service.title}
                </motion.span>

                {/* Description — always visible on mobile, hover-reveal on desktop */}
                <span className="block text-xs text-white/30 sm:hidden flex-1 text-right leading-snug">
                  {service.description}
                </span>
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      className="hidden sm:block text-sm text-white/40 ml-auto flex-1 text-right pr-2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {service.description}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Arrow in circle */}
                <motion.span
                  className="hidden sm:flex items-center justify-center shrink-0 w-7 h-7 rounded-full"
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    scale: hoveredIndex === index ? 1 : 0.6,
                    backgroundColor: hoveredIndex === index ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
                  }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </motion.span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA — elevated with availability indicator */}
        <motion.div
          className="mt-8 flex items-center gap-5"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <a
            href="https://cal.com/michael-buloichyk-zwzdvl/30min"
            target="_blank"
            rel="noreferrer"
            className="group/cta relative px-7 py-3 rounded-full border border-white/20 text-white text-xs font-normal transition-all duration-300 hover:border-white/40 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              Start a conversation
              <svg className="w-3 h-3 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/0 group-hover/cta:bg-white/5 transition-colors duration-300 rounded-full" />
          </a>
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400/70" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.24em] font-mono text-white/25">
              30 min / free
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ManifestoTextSection() {
  return (
    <section id="manifesto-text-section" className="relative z-40 h-screen overflow-hidden px-6 text-white flex items-center justify-center font-mono">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/40"
      />
      <div className="relative mx-auto max-w-lg text-center">
        <div className="space-y-6">
          <div className="text-xs font-medium uppercase tracking-widest text-white/50 mb-8 border-b border-white/10 pb-4 inline-block px-4">
            / thoughts / manifesto
          </div>

          <div className="text-sm leading-7 text-white/80 font-light space-y-6">
            <p>
              The modern world is noisy. AI changed things. It made it even noisier.
              The social networks and web are filled with slop content, the one that was born just to get attention and views,
              because it became so easy to do with AI nowadays.
            </p>
            <p>
              Every person who can type now is a &quot;AI creator&quot;. <br />
              <span className="text-white font-normal bg-white/10 px-1 py-0.5 rounded-sm">FUCK THAT.</span>
            </p>
            <p>
              We do believe in technology.<br />
              We do feel art.<br />
              We know what differs Art from commerce.
            </p>
            <p className="italic text-white/50 border-l-2 border-white/20 pl-4 ml-8 text-left">
              The feeling from number on a screen
            </p>
            <p>
              Here at Laniameda we do everything with a touch of a soul.
              We stay on frontier of AI revolution but we actually care about art.
            </p>
          </div>

          <div className="pt-12 border-t border-white/10 mt-12">
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3">But what implies Art?</p>
            <p className="text-base font-normal tracking-wide text-white/90">
              It&apos;s how you <span className="text-white/40 opacity-50">&lt;</span> see the world <span className="text-white/40 opacity-50">&gt;</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Header({ onManifestoClick, onWhatWeDoClick }: { onManifestoClick: () => void; onWhatWeDoClick: () => void }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-30 flex items-center justify-between p-6"
    >
      <motion.div
        className="text-white font-semibold text-lg tracking-tight"
        whileHover={{ opacity: 0.8 }}
        transition={{ duration: 0.2 }}
      >
        Laniameda
      </motion.div>

      <nav className="hidden sm:flex items-center gap-1">
        <button
          type="button"
          onClick={onManifestoClick}
          className="text-white/60 hover:text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-white/5 transition-all duration-200 tracking-wide"
        >
          Mantra
        </button>
        <button
          type="button"
          onClick={onWhatWeDoClick}
          className="text-white/60 hover:text-white text-xs font-medium px-4 py-2 rounded-full hover:bg-white/5 transition-all duration-200 tracking-wide"
        >
          What We Do
        </button>
      </nav>

      <div className="relative flex items-center group">
        <a
          href="https://cal.com/michael-buloichyk-zwzdvl/30min"
          target="_blank"
          rel="noreferrer"
          className="absolute right-0 px-3 py-2 rounded-full bg-white text-black font-medium text-[10px] transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-[70px] z-0"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
        <a
          href="https://cal.com/michael-buloichyk-zwzdvl/30min"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2 rounded-full bg-white text-black font-medium text-[11px] transition-all duration-300 hover:bg-white/90 cursor-pointer h-8 flex items-center z-10 tracking-wide"
        >
          Let&apos;s Talk
        </a>
      </div>
    </motion.header>
  )
}

export default function Home() {
  const currentSectionRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const unlockTimerRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [isMantraAudioActive, setIsMantraAudioActive] = useState(false)
  const [hasMantraActivated, setHasMantraActivated] = useState(false)
  const [isMantraHovered, setIsMantraHovered] = useState(false)

  const scrollToSection = useCallback((sectionIndex: number) => {
    if (isAnimatingRef.current) return
    const maxIndex = 3
    const nextIndex = Math.max(0, Math.min(sectionIndex, maxIndex))
    if (nextIndex === currentSectionRef.current) return

    isAnimatingRef.current = true
    currentSectionRef.current = nextIndex
    setActiveSection(nextIndex)

    if (unlockTimerRef.current) {
      window.clearTimeout(unlockTimerRef.current)
    }
    unlockTimerRef.current = window.setTimeout(() => {
      isAnimatingRef.current = false
    }, SECTION_LOCK_MS)
  }, [])

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < WHEEL_TRIGGER_THRESHOLD) return
      event.preventDefault()
      if (isAnimatingRef.current) return
      const direction = event.deltaY > 0 ? 1 : -1
      scrollToSection(currentSectionRef.current + direction)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAnimatingRef.current) return

      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault()
        scrollToSection(currentSectionRef.current + 1)
      }
      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault()
        scrollToSection(currentSectionRef.current - 1)
      }
    }

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.changedTouches[0]?.clientY ?? null
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (isAnimatingRef.current || touchStartYRef.current === null) {
        touchStartYRef.current = null
        return
      }
      const endY = event.changedTouches[0]?.clientY
      if (typeof endY !== "number") {
        touchStartYRef.current = null
        return
      }
      const delta = touchStartYRef.current - endY
      touchStartYRef.current = null
      if (Math.abs(delta) < SWIPE_TRIGGER_THRESHOLD) return
      scrollToSection(currentSectionRef.current + (delta > 0 ? 1 : -1))
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
      if (unlockTimerRef.current) {
        window.clearTimeout(unlockTimerRef.current)
      }
    }
  }, [scrollToSection])

  const scrollToManifesto = useCallback(() => {
    scrollToSection(1)
  }, [scrollToSection])

  const scrollToWhatWeDo = useCallback(() => {
    scrollToSection(3)
  }, [scrollToSection])

  return (
    <div className="relative min-h-screen w-screen bg-black select-none">
      <div className="fixed inset-0 z-0">
        <TubesCursor
          autoCycleActive={isMantraAudioActive}
          cycleIntervalSeconds={MANTRA_TUBES_CYCLE_SECONDS}
          cycleStartDelaySeconds={MANTRA_TUBES_START_DELAY_SECONDS}
        />
      </div>

      <div className="relative z-20 h-screen overflow-hidden overscroll-none" style={{ touchAction: "pan-x" }}>
        <motion.div
          className="relative h-full w-full will-change-transform"
          animate={{ y: `${activeSection * -100}vh` }}
          transition={{ duration: SECTION_TRANSITION_SECONDS, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Section 0: Hero */}
          <section className="relative h-screen w-screen overflow-hidden">
            <div className="absolute inset-0 z-20 flex flex-col pointer-events-none">
              <div className="pointer-events-auto">
                <Header onManifestoClick={scrollToManifesto} onWhatWeDoClick={scrollToWhatWeDo} />
              </div>
              <div className="flex-1 relative pointer-events-none">
                <HeroContent onHowWeWorkClick={scrollToManifesto} />
              </div>
            </div>
          </section>

          {/* Section 1: Mantra (Old Manifesto) */}
          <motion.div
            className="h-screen w-screen origin-center will-change-transform"
            animate={{
              opacity: activeSection === 1 ? 1 : activeSection === 2 ? 0.26 : activeSection > 2 ? 0.12 : 1,
              scale: activeSection === 2 ? 0.986 : 1,
              y: activeSection === 2 ? -18 : 0,
            }}
            transition={{ duration: 0.84, ease: [0.22, 1, 0.36, 1] }}
          >
            <ManifestoSection
              onMantraAudioActivityChange={setIsMantraAudioActive}
              onMantraActivationChange={setHasMantraActivated}
              onMantraHoverChange={setIsMantraHovered}
            />
          </motion.div>

          {/* Section 2: Manifesto Text Section */}
          <motion.div
            className="h-screen w-screen origin-center will-change-transform"
            animate={{
              opacity: activeSection === 2 ? 1 : activeSection === 1 ? 0.42 : activeSection === 3 ? 0.24 : 1,
              scale: activeSection === 1 ? 1.018 : activeSection === 3 ? 0.975 : 1,
              y: activeSection === 1 ? 24 : activeSection === 3 ? -6 : 0,
              filter: activeSection === 3 ? "blur(6px)" : "blur(0px)",
            }}
            transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
          >
            <ManifestoTextSection />
          </motion.div>

          {/* Section 3: What We Do */}
          <motion.div
            className="h-screen w-screen origin-center will-change-transform"
            animate={{
              opacity: activeSection === 3 ? 1 : activeSection === 2 ? 0.3 : 1,
              scale: activeSection === 3 ? 1 : activeSection === 2 ? 1.045 : 1,
              filter: activeSection === 3 ? "blur(0px)" : activeSection === 2 ? "blur(8px)" : "blur(0px)",
            }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <WhatWeDoSection />
          </motion.div>
        </motion.div>
      </div>

      <BottomRightPlaybackDock
        isPlaying={isMantraAudioActive}
        isMantraHovered={isMantraHovered}
        hasMantraActivated={hasMantraActivated}
      />
    </div>
  )
}
