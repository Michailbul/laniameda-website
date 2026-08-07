"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"

interface HoverPreviewProps {
  /** Link target. When omitted, the wrapper renders as a `<span>` so
   *  this component can decorate non-link content (e.g. a table header
   *  label) with the same hover-card behaviour. */
  href?: string
  /** Visible content (text + icons + animations). The component wraps
   *  it in an anchor (or span, if `href` is absent) and attaches the
   *  hover/leave handlers — your inner styling stays exactly as authored. */
  children: ReactNode
  /** Preview thumbnail. Pass a static `image`, an autoplaying `video`, a
   *  live `iframe` of the destination, or omit `src` entirely to show a
   *  text-only card. */
  preview: {
    /** Headline shown in the card. */
    title: string
    /** Smaller line under the headline. Optional. */
    subtitle?: string
    /** Image / video URL, or the page to frame when kind is "iframe". */
    src?: string
    /** Defaults to "image". "video" is a muted autoplay loop; "iframe"
     *  renders the live page, scaled down to thumbnail size. */
    kind?: "image" | "video" | "iframe"
    /** Card pixel width — defaults to 320. Height auto from aspect. */
    width?: number
    /** Optional aspect ratio for the media frame ("16/9" by default).
     *  Ignored for "iframe", whose height follows frameWidth/frameHeight. */
    aspectRatio?: string
    /** iframe only — the viewport the page is rendered at before being
     *  scaled into the card. Framing a site at card width would trip its
     *  mobile breakpoints and show a cramped phone layout, so render it
     *  at desktop size and shrink the result. Defaults to 1280x800. */
    frameWidth?: number
    frameHeight?: number
  }
  /** Standard anchor attributes. */
  target?: string
  rel?: string
  className?: string
  /** Disable the hover preview entirely (e.g. on touch devices via
   *  `pointer-events: coarse` upstream). The link still works. */
  disabled?: boolean
  /** iframe only — start loading the framed page before the link itself is
   *  hovered. Hang this off a coarser signal that the reader is heading for
   *  the link (entering the nav, say): a client-rendered app can take
   *  seconds to paint, and the first hover shouldn't pay for all of it. */
  warm?: boolean
}

/**
 * Wraps any link with a cursor-following preview card that appears on
 * hover. Card is portal-mounted to `document.body` so it can never be
 * clipped by an ancestor with `overflow: hidden` (e.g. a sticky header
 * region or a card with rounded clipping). Position is recomputed on
 * every mouse move and clamped to viewport edges.
 *
 * The link's own visual treatment (underlines, arrows, color shifts,
 * icons) is fully preserved — pass it as `children`.
 */
export function HoverPreview({
  href,
  children,
  preview,
  target,
  rel,
  className,
  disabled = false,
  warm = false,
}: HoverPreviewProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [imgError, setImgError] = useState(false)
  // An iframe is only created once the link is actually hovered — a live
  // page costs a real page load, and the header would otherwise pay for
  // every preview on the site before anyone asks for one. Once armed it
  // stays mounted, so the second hover is instant.
  const [armed, setArmed] = useState(false)
  const [frameLoaded, setFrameLoaded] = useState(false)
  // Touch devices have no hover. The card would either never open or, worse,
  // open on tap and swallow the navigation — so it is switched off entirely
  // and the link behaves like a plain link.
  const [coarsePointer, setCoarsePointer] = useState(false)
  // Show / hide are debounced slightly so brushing the link doesn't
  // flash the card. Hide is the longer of the two so a fast move from
  // link → card doesn't cause a flicker (the card itself has
  // pointer-events: none — but the timing still benefits readers who
  // hover briefly).
  const showTimerRef = useRef<number | null>(null)
  const hideTimerRef = useRef<number | null>(null)
  const settleTimerRef = useRef<number | null>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const query = window.matchMedia("(hover: none)")
    const sync = () => setCoarsePointer(query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    return () => {
      if (showTimerRef.current !== null) window.clearTimeout(showTimerRef.current)
      if (hideTimerRef.current !== null) window.clearTimeout(hideTimerRef.current)
      if (settleTimerRef.current !== null) window.clearTimeout(settleTimerRef.current)
    }
  }, [])

  const inert = disabled || coarsePointer
  const isFrame = preview.kind === "iframe" && preview.src !== undefined

  const cardWidth = preview.width ?? 320
  // The media frame sits inside the card's p-2, so it is 8px narrower per side.
  const mediaWidth = cardWidth - 16
  const frameWidth = preview.frameWidth ?? 1280
  const frameHeight = preview.frameHeight ?? 800
  const frameScale = mediaWidth / frameWidth
  const frameCardHeight = Math.round(frameHeight * frameScale)

  // Approximate card height for above-cursor positioning. Real height
  // varies with image aspect + caption length; we re-clamp on render
  // anyway so being slightly off here only affects the initial frame.
  const approxHeight = isFrame
    ? frameCardHeight + 72
    : Math.round(cardWidth * 0.66) + 64

  const updatePosition = useCallback(
    (clientX: number, clientY: number) => {
      const offset = 18
      let x = clientX - cardWidth / 2
      let y = clientY - approxHeight - offset

      // Clamp to viewport with a small inner gutter
      const gutter = 16
      if (x + cardWidth > window.innerWidth - gutter) {
        x = window.innerWidth - cardWidth - gutter
      }
      if (x < gutter) x = gutter
      // Flip below cursor if it would clip the top
      if (y < gutter) y = clientY + offset

      setPos({ x, y })
    },
    [cardWidth, approxHeight]
  )

  // Opening the card is also what creates the iframe, the first time.
  const reveal = useCallback(() => {
    setArmed(true)
    setVisible(true)
  }, [])

  const handleEnter = (e: React.MouseEvent) => {
    if (inert) return
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current)
      hideTimerRef.current = null
    }
    updatePosition(e.clientX, e.clientY)
    // Tiny delay so brushing past the link doesn't flash the card — and so a
    // framed page isn't fetched for a cursor that was only passing through.
    showTimerRef.current = window.setTimeout(reveal, 60)
  }

  const handleMove = (e: React.MouseEvent) => {
    // A framed page is a live document — dragging it around under the cursor
    // repaints the whole subtree on every mouse move and reads as jittery
    // besides. Thumbnails are cheap enough to follow; iframes stay put where
    // they opened.
    if (inert || isFrame) return
    updatePosition(e.clientX, e.clientY)
  }

  const handleLeave = () => {
    if (inert) return
    if (showTimerRef.current !== null) {
      window.clearTimeout(showTimerRef.current)
      showTimerRef.current = null
    }
    hideTimerRef.current = window.setTimeout(() => setVisible(false), 80)
  }

  const showMedia = preview.src !== undefined && !imgError

  // Shared interaction props for both anchor + span renderings.
  const interactionProps = {
    className,
    onMouseEnter: handleEnter,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      // Keyboard focus also surfaces the preview, anchored above the
      // element so it sits in roughly the same spot a mouse hover would.
      if (inert) return
      const rect = e.currentTarget.getBoundingClientRect()
      updatePosition(rect.left + rect.width / 2, rect.top)
      reveal()
    },
    onBlur: handleLeave,
  }

  return (
    <>
      {href !== undefined ? (
        <a href={href} target={target} rel={rel} {...interactionProps}>
          {children}
        </a>
      ) : (
        // Non-link wrapper — `tabIndex={0}` so keyboard users still get
        // the hover preview via focus.
        <span role="button" tabIndex={0} {...interactionProps}>
          {children}
        </span>
      )}

      {mounted
        ? createPortal(
            <div
              aria-hidden
              className={`pointer-events-none fixed z-[1200] transition-all duration-200 ease-out ${
                visible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "translate-y-1.5 scale-[0.97] opacity-0"
              }`}
              style={{
                left: pos.x,
                top: pos.y,
                width: cardWidth,
                willChange: "transform, opacity",
              }}
            >
              <div
                className="relative overflow-hidden rounded-xl border border-white/[0.10] bg-[#141414]/95 p-2 backdrop-blur-xl"
                style={{
                  boxShadow:
                    "0 24px 48px -16px rgba(0,0,0,0.72), 0 0 0 1px rgba(255,255,255,0.04), 0 0 36px rgba(229,134,111,0.12)",
                }}
              >
                {/* Top-edge specular highlight */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                {/* Media frame */}
                {isFrame ? (
                  <div
                    className="relative w-full overflow-hidden rounded-lg bg-black"
                    style={{ height: frameCardHeight }}
                  >
                    {/* `inert` is re-checked here, not just on the handlers: a
                        tap on a touch device still fires mouseenter, and a
                        warm signal wired to that would load the framed app for
                        a card the reader can never see. */}
                    {(armed || warm) && !inert ? (
                      <iframe
                        src={preview.src}
                        title={preview.title}
                        // Decorative: the card is aria-hidden, and the real
                        // destination is the link this preview belongs to.
                        tabIndex={-1}
                        loading="lazy"
                        // The framed page is ours, so it needs its own scripts
                        // and origin to render at all. It stays sandboxed out
                        // of top-level navigation, popups, downloads and forms.
                        sandbox="allow-scripts allow-same-origin"
                        referrerPolicy="no-referrer"
                        // `load` means the document and its subresources
                        // arrived — not that anything is on screen. A
                        // client-rendered app mounts after that, and a
                        // cross-origin frame gives us no way to watch for its
                        // first paint, so hold the placeholder a beat longer
                        // rather than reveal an empty rectangle.
                        onLoad={() => {
                          settleTimerRef.current = window.setTimeout(
                            () => setFrameLoaded(true),
                            600,
                          )
                        }}
                        className="absolute left-0 top-0 origin-top-left border-0"
                        style={{
                          width: frameWidth,
                          height: frameHeight,
                          transform: `scale(${frameScale})`,
                        }}
                      />
                    ) : null}

                    {/* Held until the page paints, so the card never opens
                        onto a white flash or an empty black rectangle. */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1f1f1f] via-[#171717] to-[#0e0e0e] transition-opacity duration-500 ${
                        frameLoaded ? "pointer-events-none opacity-0" : "opacity-100"
                      }`}
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5866F]/70">
                        Loading
                      </span>
                    </div>
                  </div>
                ) : showMedia ? (
                  <div
                    className="relative w-full overflow-hidden rounded-lg bg-black/60"
                    style={{ aspectRatio: preview.aspectRatio ?? "16 / 9" }}
                  >
                    {preview.kind === "video" ? (
                      <video
                        src={preview.src}
                        muted
                        loop
                        autoPlay
                        playsInline
                        preload="metadata"
                        onError={() => setImgError(true)}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={preview.src}
                        alt=""
                        loading="eager"
                        decoding="async"
                        onError={() => setImgError(true)}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                ) : (
                  // Text-only fallback if no image OR image failed to
                  // load. Keeps the hover behaviour useful even before
                  // a real preview asset has been added.
                  <div
                    className="flex w-full items-center justify-center rounded-lg bg-gradient-to-br from-[#1f1f1f] via-[#171717] to-[#0e0e0e] px-4"
                    style={{ aspectRatio: preview.aspectRatio ?? "16 / 9" }}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5866F]/70">
                      Preview
                    </span>
                  </div>
                )}

                {/* Caption */}
                <div className="px-2 pb-1.5 pt-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E5866F]/85">
                    {preview.title}
                  </p>
                  {preview.subtitle ? (
                    <p className="mt-1 text-[12px] font-light leading-[1.35] text-white/65">
                      {preview.subtitle}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  )
}
