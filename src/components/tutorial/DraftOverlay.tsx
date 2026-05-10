"use client"

import { useEffect, useState } from "react"

interface DraftOverlayProps {
  /** localStorage key the admin editor writes to. */
  storageKey: string
}

/**
 * Reads a draft map (key → text) from localStorage and patches matching
 * elements on the page using `data-edit-key` attributes. Lets the admin
 * editor preview their text edits live on the public page in the same
 * browser, without affecting the server-rendered HTML for other visitors.
 *
 * Renders a small banner at the top so the editor knows they are seeing
 * a draft, with a one-click reset.
 */
export function DraftOverlay({ storageKey }: DraftOverlayProps) {
  const [activeCount, setActiveCount] = useState(0)

  useEffect(() => {
    const apply = () => {
      let raw: string | null = null
      try {
        raw = localStorage.getItem(storageKey)
      } catch {
        return
      }
      if (!raw) {
        setActiveCount(0)
        return
      }
      let parsed: unknown
      try {
        parsed = JSON.parse(raw)
      } catch {
        return
      }
      // Support both v1 (flat record) and v2 ({ fields, additions, promptRefs }).
      const obj = parsed as Record<string, unknown>
      const fields = (obj && typeof obj === "object" && "fields" in obj
        ? obj.fields
        : obj) as Record<string, string> | undefined
      if (!fields || typeof fields !== "object") {
        setActiveCount(0)
        return
      }
      const keys = Object.keys(fields)
      let applied = 0
      for (const key of keys) {
        const value = fields[key]
        if (typeof value !== "string") continue
        const el = document.querySelector(`[data-edit-key="${cssEscape(key)}"]`)
        if (el) {
          el.textContent = value
          applied++
        }
      }
      setActiveCount(applied)
    }

    apply()

    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey) apply()
    }
    window.addEventListener("storage", onStorage)
    // Same-tab updates won't fire 'storage', so re-apply on focus.
    window.addEventListener("focus", apply)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("focus", apply)
    }
  }, [storageKey])

  if (activeCount === 0) return null

  return (
    <div className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-full border border-[#E5866F]/40 bg-black/80 px-4 py-2 backdrop-blur-md">
        <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E5866F]" />
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/85">
          Draft preview · {activeCount} override{activeCount === 1 ? "" : "s"}
        </span>
        <a
          href="/admin"
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#E5866F] hover:text-[#F0967F] transition-colors"
        >
          Edit
        </a>
      </div>
    </div>
  )
}

/** Minimal CSS attribute selector escaper. */
function cssEscape(value: string): string {
  return value.replace(/(["\\])/g, "\\$1")
}
