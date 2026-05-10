"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { useEditor } from "./EditorContext"

export interface CarouselItem {
  type: "image" | "video"
  src: string
  alt?: string
  caption?: string
  aspectRatio?: string
}

interface MediaCarouselProps {
  items: CarouselItem[]
  /** Visual size preset — sets the row height. Each item's width adapts
   *  to its natural aspect ratio. */
  size?: "sm" | "md" | "lg"
  /** Optional render slot per item — overlay buttons (e.g. remove). */
  renderItemOverlay?: (item: CarouselItem, index: number) => ReactNode
  /** Optional render slot inserted at the END of the scroller — e.g. an
   *  upload tile in edit mode. */
  trailingSlot?: ReactNode
  /** When true, render with corner brackets (output style). */
  cinematic?: boolean
  /** @deprecated Kept for API compatibility. Items now respect their own
   *  natural aspect ratio. */
  defaultAspectRatio?: string
}

/**
 * Horizontal carousel for image-heavy workflows. Items snap into place,
 * scrollbar is hidden, scroll is mouse-wheel + drag friendly. Three sizes
 * cover the use cases: small reference thumbs, medium step results, large
 * single-image showcases.
 */
export function MediaCarousel({
  items,
  size = "md",
  renderItemOverlay,
  trailingSlot,
  cinematic = false,
}: MediaCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const dimsClass =
    size === "sm"
      ? "h-60 sm:h-72"
      : size === "lg"
        ? "h-[clamp(420px,62vh,640px)]"
        : "h-[clamp(320px,46vh,500px)]"

  const placeholderMinW =
    size === "sm" ? 240 : size === "lg" ? 560 : 380

  // Track scroll position for showing nav arrows
  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 8)
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
    }
    update()
    el.addEventListener("scroll", update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener("scroll", update)
      ro.disconnect()
    }
  }, [items.length])

  const scrollByAmount = (direction: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const step = el.clientWidth * 0.85
    el.scrollBy({ left: direction * step, behavior: "smooth" })
  }

  if (items.length === 0 && !trailingSlot) return null

  return (
    <div className="relative">
      {/* Edge fades — only show when scrollable in that direction */}
      <div
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent transition-opacity duration-200 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent transition-opacity duration-200 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Nav arrows */}
      {canScrollLeft ? (
        <button
          type="button"
          onClick={() => scrollByAmount(-1)}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/80 text-white/85 backdrop-blur-md transition-colors hover:bg-black/95 hover:text-white"
          aria-label="Scroll left"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      ) : null}
      {canScrollRight ? (
        <button
          type="button"
          onClick={() => scrollByAmount(1)}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/80 text-white/85 backdrop-blur-md transition-colors hover:bg-black/95 hover:text-white"
          aria-label="Scroll right"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      ) : null}

      <div
        ref={scrollerRef}
        className="flex items-center gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x"
      >
        {items.map((item, i) => (
          <CarouselItemFrame
            key={`${item.src}-${i}`}
            item={item}
            cinematic={cinematic}
            heightClass={dimsClass}
            placeholderMinW={placeholderMinW}
            overlay={renderItemOverlay?.(item, i)}
          />
        ))}
        {trailingSlot ? (
          <div className={`shrink-0 snap-start ${dimsClass}`}>{trailingSlot}</div>
        ) : null}
      </div>
    </div>
  )
}

function CarouselItemFrame({
  item,
  cinematic,
  heightClass,
  placeholderMinW,
  overlay,
}: {
  item: CarouselItem
  cinematic: boolean
  heightClass: string
  placeholderMinW: number
  overlay?: ReactNode
}) {
  const ctx = useEditor()
  const [failed, setFailed] = useState(false)
  // In production view, hide failed assets entirely. In editor, show the
  // placeholder so the author knows something is missing.
  if (failed && !ctx.inEditor) return null
  return (
    <figure
      className={`group/citem relative shrink-0 snap-start ${heightClass}`}
    >
      <div className="relative h-full w-auto overflow-hidden rounded-xl border border-white/[0.07] bg-black/30">
        {failed ? (
          <div className="flex h-full" style={{ minWidth: placeholderMinW }}>
            <PendingPlaceholder type={item.type} src={item.src} />
          </div>
        ) : item.type === "video" ? (
          <video
            src={item.src}
            controls
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
            className="block h-full w-auto"
          />
        ) : (
          // Plain <img> so the image renders at its NATURAL aspect ratio
          // within the fixed row height. Width adapts; nothing is cropped.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt={item.alt ?? item.caption ?? "Media"}
            onError={() => setFailed(true)}
            loading="lazy"
            decoding="async"
            className="block h-full w-auto select-none"
          />
        )}

        {/* Type badge — bottom-left so corner brackets get the top corners */}
        <div className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
          {item.type === "video" ? "MOV" : "IMG"}
        </div>

        {/* Cinematic corner brackets — sit on the visible image edges */}
        {cinematic ? (
          <>
            <span aria-hidden className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-white/20" />
            <span aria-hidden className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-white/20" />
            <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-l border-b border-white/20" />
            <span aria-hidden className="pointer-events-none absolute right-2 bottom-2 h-3 w-3 border-r border-b border-white/20" />
          </>
        ) : null}

        {overlay}
      </div>
      {item.caption ? (
        <figcaption className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
          {item.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

function PendingPlaceholder({ type, src }: { type: "image" | "video"; src: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-black/60 via-black/20 to-black/60 p-4 text-center">
      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5866F]/60">
        // {type === "video" ? "VIDEO" : "IMAGE"} PENDING
      </span>
      <code className="max-w-full truncate font-mono text-[10px] text-white/30">{src}</code>
    </div>
  )
}
