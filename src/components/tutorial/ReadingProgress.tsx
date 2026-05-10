"use client"

import { useEffect, useState } from "react"

/**
 * Razor-thin coral progress bar fixed to the very top of the viewport.
 * Tracks scroll progress through the document. Uses rAF + transform for
 * smooth animation and zero layout cost.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame: number | null = null

    const update = () => {
      const doc = document.documentElement
      const scrolled = doc.scrollTop || document.body.scrollTop
      const max = doc.scrollHeight - doc.clientHeight
      const ratio = max > 0 ? Math.min(1, Math.max(0, scrolled / max)) : 0
      setProgress(ratio)
      frame = null
    }

    const onScroll = () => {
      if (frame !== null) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-[#E5866F] via-[#F0967F] to-[#E5866F] shadow-[0_0_8px_rgba(229,134,111,0.6)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
