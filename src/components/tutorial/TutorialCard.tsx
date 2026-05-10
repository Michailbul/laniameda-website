"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef } from "react"

export interface MetaItem {
  label: string
  value: string
  highlight?: boolean
}

export interface TutorialCardData {
  href: string | null
  eyebrow: string
  title: string
  description: string
  meta: MetaItem[]
  media: { kind: "video"; src: string } | { kind: "placeholder" }
  status: "live" | "coming-soon"
}

/**
 * Tutorial card with cursor-driven parallax tilt + spotlight on hover.
 *
 * Tilt math:
 *  - Cursor position is normalized to (0..1, 0..1) relative to the card.
 *  - rotateX is driven from `y` (negated so cursor up = card tips toward you).
 *  - rotateY is driven from `x` (cursor right = card tips its right edge away).
 *  - Inner media layer translates +Z and shifts opposite the cursor so the
 *    foreground reads as floating above the card surface.
 *
 * State stays in refs (no React re-renders during mouse movement); we touch
 * inline `style` directly inside an rAF callback to keep the handler cheap
 * even at 240Hz.
 */
export function TutorialCard({ data }: { data: TutorialCardData }) {
  const isComingSoon = data.status === "coming-soon"

  const articleRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | null>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isComingSoon) return
      const article = articleRef.current
      if (!article) return

      const x = e.clientX
      const y = e.clientY

      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rect = article.getBoundingClientRect()
        // Normalised 0..1 cursor position over the card.
        const cx = Math.min(Math.max((x - rect.left) / rect.width, 0), 1)
        const cy = Math.min(Math.max((y - rect.top) / rect.height, 0), 1)
        // Centre-relative -0.5..0.5 for tilt math.
        const dx = cx - 0.5
        const dy = cy - 0.5

        // Subtle tilt — anything stronger than ~6° starts to feel gimmicky
        // on flat content cards.
        const rotateX = -dy * 5.5
        const rotateY = dx * 7

        article.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, -4px, 0)`

        if (mediaRef.current) {
          // Media layer rides 30px above the card surface and shifts
          // opposite the cursor — classic parallax depth cue.
          mediaRef.current.style.transform = `translate3d(${dx * -12}px, ${dy * -12}px, 30px)`
        }

        if (spotlightRef.current) {
          spotlightRef.current.style.opacity = "1"
          spotlightRef.current.style.background = `radial-gradient(circle 320px at ${cx * 100}% ${cy * 100}%, rgba(229,134,111,0.16), rgba(229,134,111,0.04) 35%, transparent 65%)`
        }
      })
    },
    [isComingSoon],
  )

  const handleMouseLeave = useCallback(() => {
    if (isComingSoon) return
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)

    const article = articleRef.current
    if (article) article.style.transform = ""
    if (mediaRef.current) mediaRef.current.style.transform = ""
    if (spotlightRef.current) spotlightRef.current.style.opacity = "0"
  }, [isComingSoon])

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const cardInner = (
    <article
      ref={articleRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // `will-change: transform` keeps the GPU layer warm so the first
      // frame after mouse-enter doesn't promote-flicker.
      style={{
        transformStyle: "preserve-3d",
        willChange: !isComingSoon ? "transform" : undefined,
      }}
      className={`group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.10] bg-white/[0.04] backdrop-blur-2xl transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out ${
        !isComingSoon
          ? "shadow-[0_8px_28px_rgba(0,0,0,0.35)] hover:border-[#E5866F]/40 hover:bg-white/[0.06] hover:shadow-[0_24px_60px_-12px_rgba(229,134,111,0.32),0_0_44px_-8px_rgba(229,134,111,0.22),0_8px_28px_rgba(0,0,0,0.4)]"
          : "shadow-[0_6px_22px_rgba(0,0,0,0.3)]"
      }`}
    >
      {/* Inner top-edge highlight — the "lifted" specular line that makes
          the glass card feel physical rather than flat. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 inset-y-12 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
      />

      {/* Cursor-following spotlight — a soft coral glow that tracks the
          mouse over the card surface. Sits above the glass, below the
          content so it tints rather than washes. */}
      {!isComingSoon ? (
        <div
          ref={spotlightRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 ease-out"
          style={{ mixBlendMode: "screen" }}
        />
      ) : null}

      {/* Media — 16:9 preview at the top of the card. The wrapper is the
          parallax-translated layer; the video itself doesn't transform. */}
      <div
        ref={mediaRef}
        className="relative aspect-[16/9] w-full overflow-hidden transition-transform duration-300 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {data.media.kind === "video" ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
            style={{ filter: "saturate(1.05) contrast(1.05)" }}
          >
            <source src={data.media.src} type="video/mp4" />
          </video>
        ) : (
          <ComingSoonPlaceholder />
        )}

        {/* Vignette for legibility of the eyebrow that overlays the media */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.05) 28%, rgba(10,10,10,0.05) 65%, rgba(10,10,10,0.85) 100%)",
          }}
        />

        {/* Eyebrow — pinned to the top-left of the media */}
        <p className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/85">
          {data.eyebrow}
        </p>

        {/* Status badge — top right */}
        {isComingSoon ? (
          <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/75 backdrop-blur-sm">
            <span aria-hidden className="h-1 w-1 rounded-full bg-white/45" />
            Coming soon
          </div>
        ) : (
          <div className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-[#E5866F]/35 bg-[#E5866F]/[0.12] px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#E5866F] backdrop-blur-sm">
            <span aria-hidden className="relative flex h-1 w-1">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E5866F]/60" />
              <span className="relative inline-flex h-1 w-1 rounded-full bg-[#E5866F]" />
            </span>
            Live
          </div>
        )}

        {/* Cinematic corner brackets — only on live cards */}
        {!isComingSoon ? (
          <>
            <span aria-hidden className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 border-l border-t border-white/30 transition-colors duration-300 group-hover/card:border-[#E5866F]/70" />
            <span aria-hidden className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 border-r border-t border-white/30 transition-colors duration-300 group-hover/card:border-[#E5866F]/70" />
            <span aria-hidden className="pointer-events-none absolute bottom-3 left-3 h-3.5 w-3.5 border-l border-b border-white/30 transition-colors duration-300 group-hover/card:border-[#E5866F]/70" />
            <span aria-hidden className="pointer-events-none absolute right-3 bottom-3 h-3.5 w-3.5 border-r border-b border-white/30 transition-colors duration-300 group-hover/card:border-[#E5866F]/70" />
          </>
        ) : null}
      </div>

      {/* Body */}
      <div className="relative z-[2] flex flex-1 flex-col px-7 pb-8 pt-7 sm:px-8 sm:pb-9 sm:pt-8">
        <h2
          className={`text-[clamp(1.35rem,2vw,1.65rem)] font-semibold leading-[1.18] tracking-[-0.01em] ${
            isComingSoon ? "text-white/55" : "text-white"
          }`}
        >
          {data.title}
        </h2>

        <p
          className={`mt-4 text-[14.5px] leading-[1.65] ${
            isComingSoon ? "text-white/40" : "text-white/65"
          }`}
        >
          {data.description}
        </p>

        {/* Meta row + arrow CTA — pushed to the bottom of the card */}
        <div className="mt-7 flex items-end justify-between gap-4 pt-5 border-t border-white/[0.06]">
          <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            {data.meta.map((m) => (
              <li key={m.label} className="flex items-baseline gap-1.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                  {m.label}
                </span>
                <span
                  className={`text-[12.5px] font-light ${
                    m.highlight
                      ? "text-[#E5866F]"
                      : isComingSoon
                        ? "text-white/55"
                        : "text-white/85"
                  }`}
                >
                  {m.value}
                </span>
              </li>
            ))}
          </ul>

          {!isComingSoon ? (
            <span
              aria-hidden
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/55 transition-all duration-300 group-hover/card:border-[#E5866F]/40 group-hover/card:bg-[#E5866F]/[0.08] group-hover/card:text-[#E5866F]"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          ) : null}
        </div>
      </div>
    </article>
  )

  if (data.href) {
    return (
      <Link
        href={data.href}
        aria-label={data.title}
        // The Link is the perspective host so the article can rotate within
        // it without dragging neighbouring grid cells in the layout.
        className="block rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E5866F]/40 focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
        style={{ perspective: "1200px" }}
      >
        {cardInner}
      </Link>
    )
  }
  return (
    <div aria-disabled className="cursor-default opacity-90" style={{ perspective: "1200px" }}>
      {cardInner}
    </div>
  )
}

/** Static placeholder for the coming-soon card — uses CSS only so the
 *  card slot has visual presence without needing an asset. */
function ComingSoonPlaceholder() {
  return (
    <div className="absolute inset-0 bg-[#101010]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.4) 0 1px, transparent 1px 14px)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(229,134,111,0.10) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span aria-hidden className="font-mono text-[42px] leading-none tracking-[0.12em] text-white/15">
            02
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/35">
            In production
          </span>
        </div>
      </div>
    </div>
  )
}
