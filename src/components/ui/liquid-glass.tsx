"use client"

import {
  type CSSProperties,
  type HTMLAttributes,
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react"

interface LiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  /** Corner radius of the glass shape. Drives both the visual border-radius
   *  and the displacement map's lens curvature. */
  radius?: number
  /** Displacement intensity. Negative = inward lens (refraction toward center).
   *  Keep small (-30 to -80) — high values produce stripe artifacts on text. */
  scale?: number
  /** How wide the refractive edge band is (0 = razor edge, 1 = whole surface).
   *  0.18–0.3 gives a beautiful edge-only lens with a clear center. */
  border?: number
  /** Inner light bleed (0 = no fill, 0.1 = strong frost). */
  frost?: number
  /** Backdrop pre-blur (px). Applied BEFORE displacement so the lens samples
   *  a smooth image — this is the key to non-buggy glass over text. */
  blur?: number
  /** Backdrop brightness multiplier applied after the displacement. */
  brightness?: number
  /** Backdrop saturation multiplier applied after the displacement. */
  saturate?: number
  /** Optional tint laid over the backdrop after refraction. */
  tint?: string
}

/**
 * Liquid glass surface — refracts content behind it via SVG displacement map.
 * Chromium-only (Firefox/Safari fall back to backdrop-filter: blur).
 *
 * Each instance ships its own SVG filter and rebuilds the displacement map
 * when the element resizes, so the lens curvature always matches the box.
 */
export const LiquidGlass = forwardRef<HTMLDivElement, LiquidGlassProps>(function LiquidGlass(
  {
    radius = 28,
    scale = -50,
    border = 0.22,
    frost = 0.06,
    blur = 10,
    brightness = 1.04,
    saturate = 1.6,
    tint,
    className = "",
    style,
    children,
    ...rest
  },
  forwardedRef
) {
  const reactId = useId().replace(/:/g, "")
  const filterId = `lg-${reactId}`
  const mapId = `lg-map-${reactId}`

  // Defer the SVG filter + displacement-based backdrop-filter to after
  // hydration. React 19's `useId` is tree-position-deterministic *within
  // a render*, but Next/React's streaming SSR can produce different
  // values between the server pass and the client hydration pass — that
  // mismatch shows up as a hydration warning here because the filterId
  // is embedded in the server HTML (style + svg id) before the client
  // renders. Until mount, render with just the fallback blur (which is
  // what Safari/Firefox see anyway), then upgrade to the lens on the
  // client. No visual flicker because the fallback is already a real
  // glass surface.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const localRef = useRef<HTMLDivElement>(null)
  const setRef = (node: HTMLDivElement | null) => {
    localRef.current = node
    if (typeof forwardedRef === "function") forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const el = localRef.current
    if (!el) return
    const update = () => setSize({ w: el.offsetWidth, h: el.offsetHeight })
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (size.w === 0 || size.h === 0) return
    const map = buildDisplacementMap({
      width: size.w,
      height: size.h,
      radius,
      border,
    })
    const feImage = document.getElementById(mapId)
    if (feImage) {
      // SVG href + xlink:href for older Chromium quirks
      feImage.setAttribute("href", map)
      feImage.setAttributeNS("http://www.w3.org/1999/xlink", "href", map)
    }
  }, [size.w, size.h, radius, border, mapId])

  // Pre-blur THEN displace THEN enhance. The pre-blur is what makes the
  // lens look smooth instead of stripey when it sits over text or
  // high-frequency content. The displacement filter only sees the
  // already-blurred image, so it warps gradients of color rather than
  // mirroring sharp edges into bands.
  const safariFallbackChain = `blur(${blur + 8}px) saturate(${saturate}) brightness(${brightness})`
  const filterChain = mounted
    ? `blur(${blur}px) url(#${filterId}) saturate(${saturate}) brightness(${brightness})`
    : safariFallbackChain

  const glassStyle: CSSProperties = {
    borderRadius: radius,
    backdropFilter: filterChain,
    WebkitBackdropFilter: safariFallbackChain,
    background: tint ?? `hsl(0 0% 100% / ${frost})`,
    boxShadow: [
      // hairline border
      "0 0 0 0.5px rgba(255,255,255,0.12)",
      // top inner highlight — the "lifted" specular
      "0 1px 0 0 rgba(255,255,255,0.18) inset",
      // bottom inner shadow — gives the glass thickness
      "0 -1px 0 0 rgba(0,0,0,0.25) inset",
      // ambient drop shadow
      "0 14px 36px rgba(0,0,0,0.32)",
      "0 3px 8px rgba(0,0,0,0.18)",
    ].join(", "),
    ...style,
  }

  return (
    <div ref={setRef} className={`relative ${className}`} style={glassStyle} {...rest}>
      {/* Hidden filter SVG — must be in light DOM for backdrop-filter to
          resolve. Only rendered after mount so the `useId`-based filter
          id never lands in SSR HTML (where it can mismatch the client
          pass under streaming SSR). */}
      {mounted ? (
        <svg
          aria-hidden
          className="pointer-events-none absolute -z-10 h-0 w-0 overflow-hidden"
          focusable="false"
        >
          <defs>
            <filter id={filterId} colorInterpolationFilters="sRGB">
              <feImage id={mapId} x="0" y="0" width="100%" height="100%" result="map" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={scale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      ) : null}
      {children}
    </div>
  )
})

interface DisplacementParams {
  width: number
  height: number
  radius: number
  border: number
  lightness?: number
  alpha?: number
  blur?: number
  blend?: string
}

function buildDisplacementMap({
  width,
  height,
  radius,
  border,
  lightness = 50,
  alpha = 0.93,
  blur = 11,
  blend = "difference",
}: DisplacementParams): string {
  const b = Math.min(width, height) * (border * 0.5)
  const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="r" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#0000"/>
        <stop offset="100%" stop-color="red"/>
      </linearGradient>
      <linearGradient id="b" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0000"/>
        <stop offset="100%" stop-color="blue"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="black"/>
    <rect width="${width}" height="${height}" rx="${radius}" fill="url(#r)"/>
    <rect width="${width}" height="${height}" rx="${radius}" fill="url(#b)" style="mix-blend-mode:${blend}"/>
    <rect x="${b}" y="${b}" width="${width - b * 2}" height="${height - b * 2}" rx="${radius}"
      fill="hsl(0 0% ${lightness}% / ${alpha})" style="filter:blur(${blur}px)"/>
  </svg>`
  return "data:image/svg+xml," + encodeURIComponent(svg)
}
