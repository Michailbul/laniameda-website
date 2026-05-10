"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { FerrariView } from "@/components/tutorial/FerrariView"
import {
  EditorProvider,
  useEditor,
} from "@/components/tutorial/EditorContext"

interface EditorShellProps {
  markdown: string
}

/**
 * Wraps the public Ferrari view in `<EditorProvider>` so every tutorial
 * component switches to inline-edit mode, and overlays a floating
 * editor dock (bottom-right) with status, export, and logout.
 */
export function EditorShell({ markdown }: EditorShellProps) {
  return (
    <EditorProvider>
      <FerrariView markdown={markdown} />
      <EditorDock />
    </EditorProvider>
  )
}

function EditorDock() {
  const router = useRouter()
  const {
    isEditing,
    togglePreview,
    editCount,
    savedAt,
    exportSnippet,
    exportJson,
    resetAll,
    applyChanges,
    applying,
    appliedAt,
  } = useEditor()
  const [stale, setStale] = useState(false)
  const [applyError, setApplyError] = useState<string | null>(null)
  const [appliedFlash, setAppliedFlash] = useState(false)

  useEffect(() => {
    if (savedAt === null) return
    setStale(false)
    const t = window.setTimeout(() => setStale(true), 1500)
    return () => window.clearTimeout(t)
  }, [savedAt])

  // Flash "applied" confirmation for ~1.6s after a successful apply.
  useEffect(() => {
    if (appliedAt === null) return
    setAppliedFlash(true)
    setApplyError(null)
    const t = window.setTimeout(() => setAppliedFlash(false), 1600)
    return () => window.clearTimeout(t)
  }, [appliedAt])

  const handleApply = async () => {
    setApplyError(null)
    const result = await applyChanges()
    if (!result.ok) {
      setApplyError(result.error)
      window.setTimeout(() => setApplyError(null), 4000)
    }
  }

  // Keyboard shortcut: ⌘/Ctrl+P toggles preview
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "p") {
        e.preventDefault()
        togglePreview()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [togglePreview])

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
    } catch {
      /* ignore */
    }
    router.refresh()
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-end gap-2">
      <AnimatePresence mode="wait" initial={false}>
        {isEditing ? (
          <motion.div
            key="full-dock"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-4 py-2.5 shadow-[0_8px_28px_rgba(0,0,0,0.4)]"
            style={{
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
            }}
          >
            <span aria-hidden className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E5866F]/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E5866F]" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/85">
              Editing
            </span>

            <AnimatePresence mode="wait">
              {editCount > 0 ? (
                <motion.span
                  key="count"
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -4 }}
                  className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-[#E5866F]/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#E5866F]"
                >
                  {editCount} edit{editCount === 1 ? "" : "s"}
                  {savedAt !== null && !stale ? " · saved" : ""}
                </motion.span>
              ) : null}
            </AnimatePresence>

            <span aria-hidden className="mx-1 inline-block h-3 w-px bg-white/15" />

            <button
              type="button"
              onClick={togglePreview}
              title="Preview (⌘P)"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/75 transition-all hover:bg-white/[0.08] hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Preview
            </button>

            {editCount > 0 ? (
              <button
                type="button"
                onClick={resetAll}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-white/85"
              >
                Reset
              </button>
            ) : null}

            {/* Tertiary downloads — the safety nets (JSON backup, manual
                .ts snippet for prod where the apply API is disabled). */}
            <button
              type="button"
              onClick={exportJson}
              className="hidden sm:inline-flex font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-white/85"
              title="Download draft as JSON (backup)"
            >
              JSON
            </button>
            <button
              type="button"
              onClick={exportSnippet}
              disabled={editCount === 0}
              className="hidden sm:inline-flex font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-white/85 disabled:cursor-not-allowed disabled:opacity-40"
              title="Download .ts snippet (manual paste fallback)"
            >
              .ts
            </button>

            {/* Primary action — write the draft straight into
                ferrari-content.ts via the dev API. Disabled if there's
                nothing to apply, while a request is in flight, or
                briefly after a successful apply (with a check icon). */}
            <button
              type="button"
              onClick={handleApply}
              disabled={editCount === 0 || applying}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all disabled:cursor-not-allowed disabled:opacity-40 ${
                appliedFlash
                  ? "bg-[#79B791] text-black"
                  : applyError
                    ? "bg-red-500 text-white"
                    : "bg-[#E5866F] text-black hover:bg-[#F0967F]"
              }`}
              title={
                applyError ?? "Write all edits into ferrari-content.ts"
              }
            >
              {applying ? (
                <>
                  <svg
                    aria-hidden
                    className="h-3 w-3 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="9" strokeWidth={2} opacity={0.25} />
                    <path
                      strokeLinecap="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 00-9-9"
                    />
                  </svg>
                  Applying
                </>
              ) : appliedFlash ? (
                <>
                  <svg
                    aria-hidden
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.4}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Applied
                </>
              ) : applyError ? (
                <>Failed — retry</>
              ) : (
                <>Apply changes</>
              )}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 transition-colors hover:text-white/70"
              aria-label="Logout"
              title="Logout"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l5-5-5-5M21 12H9M13 21H6a2 2 0 01-2-2V5a2 2 0 012-2h7" />
              </svg>
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="preview-pill"
            type="button"
            onClick={togglePreview}
            title="Back to edit (⌘P)"
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/80 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85 shadow-[0_8px_28px_rgba(0,0,0,0.4)] transition-colors hover:text-white"
            style={{
              backdropFilter: "blur(20px) saturate(160%)",
              WebkitBackdropFilter: "blur(20px) saturate(160%)",
            }}
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Back to edit
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
