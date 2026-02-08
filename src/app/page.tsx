"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import TubesCursor from "@/components/ui/tubes-cursor"
import Loader from "@/components/ui/loader-15"
import MusicArtwork from "@/components/ui/music-artwork"

function BottomRightLoader() {
  return (
    <div className="origin-bottom-right scale-[0.34] sm:scale-[0.5]">
      <Loader />
    </div>
  )
}

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
            <BottomRightLoader />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function HeroContent({ onHowWeWorkClick }: { onHowWeWorkClick: () => void }) {
  return (
    <main className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-8 relative"
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
          We actually care about Art
        </motion.p>

        {/* Buttons */}
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

const MANTRA_AUDIO_SRC = "/assets/mantra.mp3"
const MANTRA_TARGET_VOLUME = 0.9
const MANTRA_START_AT_SECONDS = 207.2
const MANTRA_TUBES_CYCLE_SECONDS = 0.67
const MANTRA_TUBES_START_DELAY_SECONDS = 0.3
const SECTION_TRANSITION_SECONDS = 0.72
const SECTION_LOCK_MS = 760
const WHEEL_TRIGGER_THRESHOLD = 24
const SWIPE_TRIGGER_THRESHOLD = 42
const MANTRA_TRACK_ARTIST = "Drake"
const MANTRA_TRACK_TITLE = "Search & Rescue"
const MANTRA_TRACK_ALBUM_ART =
  "/assets/mantra.jpeg"

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
      if (!audio) {
        return
      }

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
    if (hasPreparedStartRef.current) {
      return
    }
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

    if (isActivated) {
      return
    }

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
    if (!audio) {
      return
    }

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
    if (!audio || !isActivated) {
      return
    }

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
    <div className="mb-6">
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
        className="group relative inline-flex cursor-pointer select-none items-end gap-4 rounded-full px-2 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/45"
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
  return (
    <section id="manifesto-section" className="relative z-40 h-screen overflow-hidden px-6 py-20 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-black/45 to-black/75"
      />
      <div className="relative mx-auto flex h-full w-full max-w-6xl items-center">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, amount: 0.55 }}
            className="self-start"
          >
            <MantraAudioBadgeWithHover
              onAudioActivityChange={onMantraAudioActivityChange}
              onActivationChange={onMantraActivationChange}
              onHoverChange={onMantraHoverChange}
            />
            <h2 className="text-[clamp(2.2rem,6.5vw,5.8rem)] font-medium uppercase leading-[0.88] tracking-[0.09em]">
              what we beleive in
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
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6 border-b border-white/15 py-5 sm:py-6 last:border-b-0"
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
          Mantra
        </button>
      </nav>

      {/* Lets create Button Group with Arrow */}
      <div className="relative flex items-center group">
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
  const currentSectionRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const unlockTimerRef = useRef<number | null>(null)
  const touchStartYRef = useRef<number | null>(null)
  const [activeSection, setActiveSection] = useState(0)
  const [isMantraAudioActive, setIsMantraAudioActive] = useState(false)
  const [hasMantraActivated, setHasMantraActivated] = useState(false)
  const [isMantraHovered, setIsMantraHovered] = useState(false)

  const scrollToSection = useCallback((sectionIndex: number) => {
    if (isAnimatingRef.current) {
      return
    }
    const maxIndex = 1
    const nextIndex = Math.max(0, Math.min(sectionIndex, maxIndex))
    if (nextIndex === currentSectionRef.current) {
      return
    }

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
      if (Math.abs(event.deltaY) < WHEEL_TRIGGER_THRESHOLD) {
        return
      }
      event.preventDefault()
      if (isAnimatingRef.current) {
        return
      }
      const direction = event.deltaY > 0 ? 1 : -1
      scrollToSection(currentSectionRef.current + direction)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAnimatingRef.current) {
        return
      }

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
      if (Math.abs(delta) < SWIPE_TRIGGER_THRESHOLD) {
        return
      }
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
          <section className="relative h-screen w-screen overflow-hidden">
            {/* Layout Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col pointer-events-none">
              <div className="pointer-events-auto">
                <Header onManifestoClick={scrollToManifesto} />
              </div>
              <div className="flex-1 relative pointer-events-none">
                <HeroContent onHowWeWorkClick={scrollToManifesto} />
              </div>
            </div>
          </section>
          <div className="h-screen w-screen">
            <ManifestoSection
              onMantraAudioActivityChange={setIsMantraAudioActive}
              onMantraActivationChange={setHasMantraActivated}
              onMantraHoverChange={setIsMantraHovered}
            />
          </div>
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
