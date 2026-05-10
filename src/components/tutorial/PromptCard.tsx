"use client"

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useEditor } from "./EditorContext"
import { EditableText } from "./EditableText"
import { InlineUploadButton } from "./InlineUploadButton"
import { MediaCarousel } from "./MediaCarousel"
import { LiquidGlass } from "@/components/ui/liquid-glass"
import {
  DRAFT_STORAGE_KEY,
  EMPTY_DRAFT,
  listAllPrompts,
  normalizeDraft,
  resolveRefsForPrompt,
  type DraftV2,
  type PromptDescriptor,
} from "@/app/tutorials/ferrari/ferrari-editable"
import type { MediaBlock } from "@/app/tutorials/ferrari/ferrari-content"

export interface PromptReference {
  type: "image" | "video"
  src: string
  label?: string
}

interface PromptCardProps {
  /** Model / generation surface name. Renders prominently in the header. */
  label?: string
  /** @deprecated No longer rendered — kept for back-compat with callers. */
  title?: string
  prompt: string
  /**
   * Optional templatized version of the prompt with `[BLANKS]` for variables.
   * When provided, a small toggle in the header lets the reader switch
   * between the actual filled-in prompt and the reusable template, and
   * Copy copies whichever is active.
   */
  templatePrompt?: string
  references?: PromptReference[]
  outputs?: MediaBlock[]
  note?: string
  /** Editor data-edit-key for the prompt text. Also keys extras in draft. */
  promptEditKey?: string
  /** Editor data-edit-key for the note text. */
  noteEditKey?: string
  /** Editor data-edit-key for the model name. */
  labelEditKey?: string
  /** @deprecated Title no longer renders; kept for back-compat. */
  titleEditKey?: string
}

/**
 * Generation card — visual representation of a single AI generation step.
 *
 * Top: model + title + copy
 * Inputs panel: prompt + reference carousel
 * Flow connector: hairline + "generated" indicator
 * Output panel: hero-sized result(s) in a cinematic carousel
 * Footer note (optional)
 */
export function PromptCard({
  label = "Prompt",
  prompt,
  templatePrompt,
  references = [],
  outputs = [],
  note,
  promptEditKey,
  noteEditKey,
  labelEditKey,
}: PromptCardProps) {
  const ctx = useEditor()
  // Per-instance ID — used to namespace Framer Motion `layoutId`s so the
  // mode-switch pill (and any other shared-element transitions) animate
  // within THIS card only. Without this, multiple cards on the same page
  // share one `layoutId`, and toggling Input/Output in card A makes the
  // pill fly across the screen from card B's last-known position.
  const instanceId = useId()
  const [copiedKind, setCopiedKind] = useState<"prompt" | "template" | null>(null)
  // Full normalized draft from localStorage — used on the public route
  // to drive extras, label overrides, and inheritance just like the
  // editor does. In the editor, we read from `ctx.draft` instead.
  const [storedDraft, setStoredDraft] = useState<DraftV2>(EMPTY_DRAFT)
  const [headerStuck, setHeaderStuck] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<number | null>(null)

  // Track when the in-card sticky header has actually engaged. Drives the
  // upward bg mask that hides the prompt from leaking through the page-
  // level StickyActions glass bar above. Sentinel sits at the figure's
  // top edge; rootMargin -78px aligns the trigger with the header's
  // sticky top:78 threshold, so mask + header engage together.
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => setHeaderStuck(!entry.isIntersecting),
      { rootMargin: "-78px 0px 0px 0px", threshold: 0 }
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  // Hydrate the localStorage draft on the public route. Re-reads on
  // storage events (other tab) and on focus (same tab).
  useEffect(() => {
    if (ctx.inEditor) return
    const reload = () => {
      try {
        const raw = localStorage.getItem(DRAFT_STORAGE_KEY)
        if (!raw) {
          setStoredDraft(EMPTY_DRAFT)
          return
        }
        setStoredDraft(normalizeDraft(JSON.parse(raw)))
      } catch {
        setStoredDraft(EMPTY_DRAFT)
      }
    }
    reload()
    const onStorage = (e: StorageEvent) => {
      if (e.key === DRAFT_STORAGE_KEY) reload()
    }
    window.addEventListener("storage", onStorage)
    window.addEventListener("focus", reload)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("focus", reload)
    }
  }, [ctx.inEditor])

  // Single source of truth for everything we need to look up in the
  // draft (extras, label overrides, inheritance, outputs).
  const effectiveDraft = ctx.inEditor ? ctx.draft : storedDraft

  const extraRefs: PromptReference[] = promptEditKey
    ? (effectiveDraft.promptRefs[promptEditKey] ?? [])
    : []

  const extraOutputs = promptEditKey
    ? (effectiveDraft.promptOutputs[promptEditKey] ?? [])
    : []

  const inheritedFromKey = promptEditKey
    ? effectiveDraft.inheritRefs[promptEditKey]
    : undefined

  // If this card inherits refs from another prompt, swap them in entirely.
  // Otherwise: canonical refs (with per-index label overrides applied) +
  // any extras the editor uploaded.
  const inheritedRefs: PromptReference[] | null = inheritedFromKey
    ? (resolveRefsForPrompt(inheritedFromKey, effectiveDraft) as PromptReference[])
    : null

  const ownRefs: PromptReference[] = useMemo(() => {
    if (!promptEditKey) return references
    return references.map((ref, idx) => {
      const override =
        effectiveDraft.fields[`${promptEditKey}.refs.${idx}.label`]
      if (override === undefined) return ref
      if (override.trim().length === 0) {
        const next = { ...ref }
        delete next.label
        return next
      }
      return { ...ref, label: override }
    })
  }, [references, promptEditKey, effectiveDraft.fields])

  const allReferences = inheritedRefs ?? [...ownRefs, ...extraRefs]
  const ownReferenceCount = inheritedRefs ? 0 : references.length

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [])

  const actualPromptValue =
    ctx.inEditor && promptEditKey
      ? (ctx.draft.fields[promptEditKey] ?? prompt)
      : prompt

  const copyValue = async (value: string, kind: "prompt" | "template") => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedKind(kind)
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
      timerRef.current = window.setTimeout(() => setCopiedKind(null), 1600)
    } catch {
      /* ignore */
    }
  }

  const allOutputs = [...outputs, ...extraOutputs]

  const showRefsBlock = allReferences.length > 0 || ctx.isEditing
  const showOutputsBlock = allOutputs.length > 0 || ctx.isEditing

  // Build the picker list once. Excludes self so a prompt can't inherit
  // from itself (which would be a no-op anyway).
  const promptInventory: PromptDescriptor[] = useMemo(
    () => listAllPrompts().filter((p) => p.key !== promptEditKey),
    [promptEditKey]
  )

  // Find descriptor for the currently inherited-from prompt so we can
  // surface its label in the UI.
  const inheritedFromDescriptor = useMemo(() => {
    if (!inheritedFromKey) return null
    return listAllPrompts().find((p) => p.key === inheritedFromKey) ?? null
  }, [inheritedFromKey])
  // Tabs only make sense when there's an output side to switch to.
  const showTabs = showOutputsBlock

  // Default to the Output tab — the generated result is the payoff and
  // most readers want to see it first. The fallback effect below switches
  // to Input if a card genuinely has no outputs (page-defined or extras),
  // so empty edit-mode cards still land somewhere usable.
  const [activeTab, setActiveTab] = useState<"input" | "output">("output")

  // If outputs disappear (e.g. user removes the last one in editor and exits
  // edit mode), gracefully fall back to the input tab so the card never sits
  // on an empty panel.
  useEffect(() => {
    if (activeTab === "output" && !showOutputsBlock) {
      setActiveTab("input")
    }
  }, [activeTab, showOutputsBlock])

  return (
    <figure className="group relative my-14 rounded-2xl">
      {/* Liquid glass surface — refracts the page background (grid + dots)
          through the card edges. Sits BEHIND all card content because
          backdrop-filter only refracts what's painted behind the element.
          The figure's other absolute layers (decoration, sticky header
          with its own opaque bg) still paint on top in DOM order. */}
      <LiquidGlass
        aria-hidden
        radius={16}
        frost={0.025}
        blur={12}
        scale={-32}
        border={0.18}
        saturate={1.35}
        brightness={1.02}
        className="pointer-events-none absolute inset-0"
      />

      {/* Stuck-state sentinel — see the IntersectionObserver effect above. */}
      <div
        ref={sentinelRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-px w-px"
      />

      {/* Decoration layer — clipped to rounded corners. Held in its own
          overflow-hidden box so the figure itself can keep `overflow:visible`
          (required for `position: sticky` on the header + refs to work). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
      >
        {/* Ambient corner glows */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(circle at 0% 0%, rgba(229,134,111,0.08) 0%, transparent 45%), radial-gradient(circle at 100% 100%, rgba(229,134,111,0.05) 0%, transparent 55%)",
          }}
        />
        {/* Subtle top inner highlight */}
        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
      </div>

      {/* === STICKY HEADER ===
          Pins at top-[78px] (just below the page-level StickyActions bar)
          while the prompt scrolls inside the card. Self-contained opaque
          bg so the prompt body can scroll cleanly behind it. */}
      <div className="sticky top-[78px] z-20 rounded-t-2xl border-b border-white/[0.06] bg-[#0A0A0A]/85 backdrop-blur-xl">
        {/* Upward bg extension — only visible while the header is stuck.
            Covers the 0–78px viewport band that sits BEHIND the page-
            level StickyActions glass, so the LiquidGlass blurs solid
            page bg (#0A0A0A) instead of scrolling prompt text. Opacity
            is gated on `headerStuck` so the mask is invisible at the
            header's natural position (which sits inside the my-14
            margin above the figure, where it could otherwise leak over
            a preceding callout/quote). */}
        <div
          aria-hidden
          className={`pointer-events-none absolute -top-[78px] left-0 right-0 h-[78px] bg-[#0A0A0A] transition-opacity duration-200 ${
            headerStuck ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Header row — stacks vertically on narrow widths so the model
            label and the copy buttons each get their own row instead of
            colliding. Side-by-side returns at sm and up where there's
            enough horizontal slack. */}
        <div className="relative flex flex-col items-stretch gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-7 sm:py-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 min-w-0">
            <span aria-hidden className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5866F]/85">
              // GENERATION
            </span>
            <span aria-hidden className="h-3 w-px bg-white/15" />
            {labelEditKey ? (
              <EditableText
                editKey={labelEditKey}
                initial={label}
                className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/75"
              />
            ) : (
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/75">
                {label}
              </span>
            )}
          </div>

          {/* Right: copy buttons — prompt + (optional) template. Wraps on
              very narrow widths (template label is long) so a 380px
              viewport never overflows. */}
          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:flex-nowrap sm:justify-end">
            <CopyButton
              label="Copy prompt"
              onClick={() => copyValue(actualPromptValue, "prompt")}
              variant="default"
            />
            {templatePrompt ? (
              <CopyButton
                label="Copy template prompt"
                onClick={() => copyValue(templatePrompt, "template")}
                variant="accent"
              />
            ) : null}
          </div>
        </div>
      </div>

      {/* === MODE SWITCH (centered, no enclosing row container) === */}
      {showTabs ? (
        <div className="relative flex items-center justify-center pt-5 pb-1">
          <ModeSwitch
            active={activeTab}
            onChange={setActiveTab}
            instanceId={instanceId}
            modes={[
              { id: "input", label: "Input", count: allReferences.length || undefined },
              { id: "output", label: "Output", count: allOutputs.length || undefined, accent: true },
            ]}
          />
        </div>
      ) : null}

      {/* === TAB CONTENT === */}
      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === "input" ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="relative px-6 sm:px-8 pt-6 pb-7"
            >
              {/* Two-column layout: prompt LEFT, references RIGHT (lg+) */}
              <div
                className={`grid gap-5 lg:gap-6 ${
                  showRefsBlock
                    ? "lg:grid-cols-[minmax(0,1fr)_minmax(220px,300px)]"
                    : "grid-cols-1"
                }`}
              >
                {/* === LEFT: Prompt — flat, no nested box. Left rule + text === */}
                <div className="flex flex-col">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                    Prompt
                  </p>
                  <div className="relative flex-1 pl-4">
                    {/* Left accent rail */}
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 bottom-0 w-px bg-white/10"
                    />
                    {promptEditKey ? (
                      <EditableText
                        editKey={promptEditKey}
                        initial={prompt}
                        as="pre"
                        multiline
                        className="block h-full overflow-x-auto whitespace-pre-wrap break-words font-mono text-[12.5px] sm:text-[13px] leading-[1.65] text-white/85"
                      />
                    ) : (
                      <pre className="block h-full overflow-x-auto whitespace-pre-wrap break-words font-mono text-[12.5px] sm:text-[13px] leading-[1.65] text-white/85">
                        {actualPromptValue}
                      </pre>
                    )}
                  </div>
                </div>

                {/* === RIGHT: Reference thumbnails — STICKY ===
                    Pins below the sticky header while the prompt column
                    scrolls. `self-start` keeps the grid item sized to its
                    content (without it, grid would stretch the item to
                    match the row height and sticky has no slack to engage). */}
                {showRefsBlock ? (
                  <div className="sticky top-[150px] self-start">
                    <div className="mb-2.5 flex items-center justify-between gap-2">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                        Refs
                        {allReferences.length > 0 ? (
                          <span className="ml-1.5 text-white/25">· {allReferences.length}</span>
                        ) : null}
                        {inheritedFromDescriptor ? (
                          <span
                            className="ml-2 inline-flex items-center gap-1 rounded-full border border-[#E5866F]/30 bg-[#E5866F]/[0.08] px-1.5 py-0.5 text-[9px] tracking-[0.18em] text-[#E5866F]/85"
                            title={`Inherited from ${inheritedFromDescriptor.label}`}
                          >
                            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l5 5-5 5M14 7l5 5-5 5" />
                            </svg>
                            Inherited
                          </span>
                        ) : null}
                      </p>
                      {ctx.isEditing && promptEditKey ? (
                        <div className="flex items-center gap-2">
                          <InheritFromMenu
                            currentValue={inheritedFromKey ?? null}
                            options={promptInventory}
                            onSelect={(sourceKey) =>
                              ctx.setRefInheritance(promptEditKey, sourceKey)
                            }
                          />
                          {/* Hide upload while inheriting — extras would
                              be ignored anyway. */}
                          {!inheritedFromKey ? (
                            <InlineUploadButton
                              label="Add"
                              size="sm"
                              variant="ghost"
                              onUpload={(result) =>
                                ctx.addPromptRef(promptEditKey, {
                                  type: result.kind,
                                  src: result.path,
                                })
                              }
                            />
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                    {allReferences.length > 0 ? (
                      <ReferenceThumbnailGrid
                        references={allReferences}
                        // Label override is keyed differently for canonical
                        // refs (field override) vs extras (PromptRef.label).
                        // The grid only needs to know which write action to
                        // call per index, so we hand it both the count of
                        // own canonical refs and the extras count.
                        ownCount={ownReferenceCount}
                        promptEditKey={promptEditKey}
                        readOnly={inheritedFromKey != null}
                        onRemove={
                          ctx.isEditing && promptEditKey && !inheritedFromKey
                            ? (idx) => {
                                const isExtra = idx >= references.length
                                if (!isExtra) return
                                ctx.removePromptRef(promptEditKey, idx - references.length)
                              }
                            : undefined
                        }
                        canRemoveAt={(idx) =>
                          !inheritedFromKey && idx >= references.length
                        }
                      />
                    ) : ctx.isEditing ? (
                      <div className="flex aspect-square w-full items-center justify-center rounded-lg border border-dashed border-white/10 bg-black/20 px-3 text-center">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                          {inheritedFromKey ? "Source has no refs" : "No refs"}
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="output"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              <div className="relative px-6 sm:px-8 pt-6 pb-7">
                {ctx.isEditing && promptEditKey ? (
                  <div className="mb-5 flex items-center justify-end">
                    <InlineUploadButton
                      label="Add output"
                      size="sm"
                      variant="primary"
                      onUpload={(result) =>
                        ctx.addPromptOutput(promptEditKey, {
                          type: result.kind,
                          src: result.path,
                          aspectRatio: "16/9",
                        })
                      }
                    />
                  </div>
                ) : null}
                {allOutputs.length === 1 ? (
                  // SINGLE OUTPUT — hero treatment, full panel width, natural aspect
                  <SingleOutputHero
                    output={allOutputs[0]}
                    isExtra={extraOutputs.length > 0}
                    onRemove={() => promptEditKey && ctx.removePromptOutput(promptEditKey, 0)}
                    showRemove={ctx.isEditing && extraOutputs.length > 0}
                  />
                ) : allOutputs.length > 1 ? (
                  <MediaCarousel
                    items={allOutputs.map((o) => ({
                      type: o.type,
                      src: o.src,
                      alt: o.alt,
                      caption: o.caption,
                      aspectRatio: o.aspectRatio,
                    }))}
                    size="lg"
                    cinematic
                    renderItemOverlay={(_item, i) => {
                      if (!ctx.isEditing || !promptEditKey) return null
                      const isExtra = i >= outputs.length
                      if (!isExtra) return null
                      const extraIndex = i - outputs.length
                      return (
                        <button
                          type="button"
                          onClick={() => ctx.removePromptOutput(promptEditKey, extraIndex)}
                          className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/85 opacity-0 backdrop-blur-md transition-all duration-200 hover:bg-red-500/95 hover:text-white group-hover/citem:opacity-100"
                        >
                          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
                          </svg>
                          Remove
                        </button>
                      )
                    }}
                  />
                ) : ctx.isEditing ? (
                  <div className="rounded-xl border border-dashed border-white/10 bg-black/30 px-6 py-12 text-center">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
                      No output yet
                    </p>
                    <p className="mt-2 text-xs text-white/45">
                      Add the image or video this prompt generated.
                    </p>
                  </div>
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating "copied to clipboard" toast — portal'd to body */}
      <CopyToast kind={copiedKind} />

      {/* === NOTE — important learning, render prominently ===
          rounded-b-2xl matches the figure's rounded corners (the figure
          itself no longer clips with overflow-hidden — see top of file).
          Only renders on public/preview when there's actual note text;
          empty/whitespace notes shouldn't leave a `// Note` shell behind.
          In edit mode, always renders so the field is reachable.

          We compare the EFFECTIVE value (draft override falling back to
          the canonical prop) rather than the prop alone — otherwise a
          note that was edited down to empty in localStorage would still
          render the shell because the prop is still non-empty. */}
      {(() => {
        const effectiveNote = noteEditKey
          ? (effectiveDraft.fields[noteEditKey] ?? note ?? "")
          : (note ?? "")
        return effectiveNote.trim().length > 0 || (ctx.isEditing && noteEditKey)
      })() ? (
        <aside className="relative overflow-hidden rounded-b-2xl border-t border-[#E5866F]/15 bg-gradient-to-r from-[#E5866F]/[0.06] via-[#E5866F]/[0.02] to-transparent px-6 sm:px-8 py-5 sm:py-6">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="mt-2 inline-block h-1 w-7 shrink-0 rounded-full bg-[#E5866F]/70"
            />
            <div className="min-w-0 flex-1">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5866F]">
                // Note
              </span>
              <div className="text-[14.5px] sm:text-[15px] leading-[1.65] text-white/85 font-light">
                {noteEditKey ? (
                  <EditableText editKey={noteEditKey} initial={note ?? ""} multiline />
                ) : (
                  note
                )}
              </div>
            </div>
          </div>
        </aside>
      ) : null}
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/* Floating "Copied to clipboard" toast                                */
/* ------------------------------------------------------------------ */

function CopyToast({ kind }: { kind: "prompt" | "template" | null }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const accent = kind === "template"

  return createPortal(
    <AnimatePresence>
      {kind ? (
        <motion.div
          key={kind}
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          className="pointer-events-none fixed bottom-8 left-1/2 z-[10000] -translate-x-1/2"
          role="status"
          aria-live="polite"
        >
          <div
            className={`pointer-events-auto inline-flex items-center gap-3 rounded-full border bg-[#0A0A0A]/85 px-4 py-2.5 backdrop-blur-xl ${
              accent ? "border-[#E5866F]/45" : "border-white/15"
            }`}
            style={{
              boxShadow: accent
                ? "0 12px 40px rgba(0,0,0,0.5), 0 0 28px rgba(229,134,111,0.35), inset 0 1px 0 rgba(229,134,111,0.18)"
                : "0 12px 40px rgba(0,0,0,0.5), 0 0 16px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Check icon in a coral / neutral chip */}
            <span
              className={`relative inline-flex h-6 w-6 items-center justify-center rounded-full ${
                accent ? "bg-[#E5866F]/20 text-[#E5866F]" : "bg-white/10 text-white"
              }`}
              aria-hidden
            >
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.28, ease: "easeOut", delay: 0.05 }}
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.4}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </span>

            <div className="flex flex-col">
              <span
                className={`font-mono text-[9px] uppercase tracking-[0.28em] ${
                  accent ? "text-[#E5866F]/80" : "text-white/50"
                }`}
              >
                // {kind === "template" ? "Template" : "Prompt"}
              </span>
              <span className="text-[12.5px] font-medium leading-tight text-white">
                Copied to clipboard
              </span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  )
}

/* ------------------------------------------------------------------ */
/* Copy button — pill with animated check, two visual variants        */
/* ------------------------------------------------------------------ */

function CopyButton({
  label,
  onClick,
  variant,
}: {
  label: string
  onClick: () => void
  /** "default" = neutral pill (filled prompt), "accent" = coral-tinted (template) */
  variant: "default" | "accent"
}) {
  const accent = variant === "accent"
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-200 cursor-pointer active:scale-[0.97] ${
        accent
          ? "border-[#E5866F]/30 bg-[#E5866F]/[0.08] text-[#E5866F] hover:bg-[#E5866F]/[0.16] hover:text-[#F4A48F]"
          : "border-white/10 bg-white/[0.02] text-white/70 hover:bg-white/[0.06] hover:text-white"
      }`}
      style={
        accent
          ? { boxShadow: "0 0 12px rgba(229,134,111,0.18), inset 0 1px 0 rgba(229,134,111,0.18)" }
          : undefined
      }
    >
      <svg
        aria-hidden
        className="h-3 w-3 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3"
        />
      </svg>
      <span>{label}</span>
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Mode switch — segmented pill toggle with sliding indicator         */
/* ------------------------------------------------------------------ */

interface ModeDef {
  id: "input" | "output"
  label: string
  count?: number
  /** Highlight this mode in coral when active (used for Output). */
  accent?: boolean
}

function ModeSwitch({
  active,
  onChange,
  modes,
  instanceId,
}: {
  active: "input" | "output"
  onChange: (id: "input" | "output") => void
  modes: ModeDef[]
  /** Unique key per parent PromptCard so the sliding pill is scoped to
   *  this switch and doesn't morph from another card's pill on the page. */
  instanceId: string
}) {
  return (
    <div
      role="tablist"
      aria-label="Switch view"
      className="relative inline-flex items-center rounded-full border border-white/[0.08] bg-black/55 p-1 backdrop-blur-md"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.4)" }}
    >
      {modes.map((mode) => {
        const isActive = active === mode.id
        const accentActive = isActive && mode.accent
        return (
          <button
            key={mode.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(mode.id)}
            className="group/seg relative inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 cursor-pointer transition-colors duration-200"
          >
            {/* Sliding indicator — single shared pill that morphs between segments */}
            {isActive ? (
              <motion.span
                layoutId={`prompt-card-mode-pill-${instanceId}`}
                aria-hidden
                className={`absolute inset-0 rounded-full ${
                  accentActive ? "bg-[#E5866F]" : "bg-white/[0.10]"
                }`}
                style={{
                  boxShadow: accentActive
                    ? "0 0 22px rgba(229,134,111,0.45), inset 0 1px 0 rgba(255,255,255,0.18)"
                    : "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.04)",
                }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}

            <span
              className={`relative font-mono text-[10.5px] uppercase tracking-[0.24em] transition-colors duration-200 ${
                isActive
                  ? accentActive
                    ? "text-[#0A0A0A]"
                    : "text-white"
                  : "text-white/45 group-hover/seg:text-white/75"
              }`}
            >
              {mode.label}
            </span>

            {typeof mode.count === "number" ? (
              <motion.span
                key={`${mode.id}-${mode.count}`}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 380, damping: 24 }}
                className={`relative inline-flex h-[16px] min-w-[16px] items-center justify-center rounded-full px-1 font-mono text-[9.5px] tabular-nums leading-none transition-colors duration-200 ${
                  isActive
                    ? accentActive
                      ? "bg-[#0A0A0A]/25 text-[#0A0A0A]"
                      : "bg-white/15 text-white"
                    : "bg-white/[0.06] text-white/40 group-hover/seg:bg-white/[0.10] group-hover/seg:text-white/65"
                }`}
              >
                {mode.count}
              </motion.span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* "Inherit refs from…" picker — admin only                            */
/* ------------------------------------------------------------------ */

function InheritFromMenu({
  currentValue,
  options,
  onSelect,
}: {
  currentValue: string | null
  options: PromptDescriptor[]
  onSelect: (sourceKey: string | null) => void
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  // Close on outside click / Esc
  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return
      if (!rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDocClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDocClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const isInheriting = currentValue !== null

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-200 cursor-pointer ${
          isInheriting
            ? "border-[#E5866F]/35 bg-[#E5866F]/[0.10] text-[#E5866F]"
            : "border-dashed border-white/15 bg-white/[0.02] text-white/65 hover:border-[#E5866F]/40 hover:bg-[#E5866F]/[0.04] hover:text-white"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        title={isInheriting ? "Currently inheriting — click to change" : "Inherit refs from another prompt"}
      >
        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l5 5-5 5M14 7l5 5-5 5" />
        </svg>
        {isInheriting ? "Inheriting" : "Inherit"}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute right-0 top-full z-30 mt-1 w-[280px] max-h-[360px] overflow-y-auto rounded-xl border border-white/[0.08] bg-[#0A0A0A]/95 p-1 shadow-[0_18px_44px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            role="listbox"
          >
            {/* "Use own refs" entry — clears inheritance */}
            <button
              type="button"
              onClick={() => {
                onSelect(null)
                setOpen(false)
              }}
              className={`flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left transition-colors ${
                currentValue === null
                  ? "bg-white/[0.06] text-white"
                  : "text-white/70 hover:bg-white/[0.04] hover:text-white"
              }`}
              role="option"
              aria-selected={currentValue === null}
            >
              <span className="mt-0.5 inline-flex h-3 w-3 shrink-0 items-center justify-center">
                {currentValue === null ? (
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : null}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                Use own refs
              </span>
            </button>

            {options.length > 0 ? (
              <div className="my-1 h-px bg-white/[0.06]" />
            ) : null}

            {options.length === 0 ? (
              <p className="px-2.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                No other prompts on this page
              </p>
            ) : (
              options.map((p) => {
                const isSelected = currentValue === p.key
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => {
                      onSelect(p.key)
                      setOpen(false)
                    }}
                    className={`flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left transition-colors ${
                      isSelected
                        ? "bg-[#E5866F]/[0.10] text-white"
                        : "text-white/75 hover:bg-white/[0.04] hover:text-white"
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span className="mt-0.5 inline-flex h-3 w-3 shrink-0 items-center justify-center text-[#E5866F]">
                      {isSelected ? (
                        <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.4}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : null}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[#E5866F]/85">
                          {p.sectionIndex}
                        </span>
                        <span className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-white/85">
                          {p.label}
                        </span>
                        <span className="ml-auto rounded-full bg-white/[0.06] px-1.5 py-0.5 font-mono text-[9px] tabular-nums leading-none text-white/55">
                          {p.refCount}
                        </span>
                      </span>
                      <span className="mt-1 block truncate text-[11px] font-light leading-[1.35] text-white/55">
                        {p.preview || p.sectionTitle}
                      </span>
                    </span>
                  </button>
                )
              })
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Reference thumbnail grid + lightbox                                */
/* ------------------------------------------------------------------ */

function ReferenceThumbnailGrid({
  references,
  onRemove,
  canRemoveAt,
  ownCount,
  promptEditKey,
  readOnly = false,
}: {
  references: PromptReference[]
  onRemove?: (index: number) => void
  canRemoveAt: (index: number) => boolean
  /** Count of canonical (page-defined) refs at the start of `references`.
   *  Indices < ownCount go through field-override label edits; indices
   *  >= ownCount go through `updatePromptRefLabel` on the extras list. */
  ownCount: number
  /** The owning PromptCard's edit key — used to scope label-edit fields.
   *  Optional only for back-compat; label editing is disabled if absent. */
  promptEditKey?: string
  /** True when refs are inherited from another prompt — disables label
   *  editing here so edits go to the source instead. */
  readOnly?: boolean
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  // Single ref → one square tile filling column width.
  // Multi → 2-col compact grid that scales with the column.
  const gridCols = references.length === 1 ? "grid-cols-1" : "grid-cols-2"

  return (
    <>
      <div className={`grid gap-2 ${gridCols}`}>
        {references.map((ref, i) => {
          const isExtra = i >= ownCount
          // Stable identifier for the label edit slot. Canonical refs go
          // through a draft.fields override; extras go through the
          // PromptRef.label on the draft.promptRefs entry directly.
          const labelEditDescriptor =
            promptEditKey && !readOnly
              ? isExtra
                ? ({
                    kind: "extra" as const,
                    promptKey: promptEditKey,
                    extraIndex: i - ownCount,
                  })
                : ({
                    kind: "canonical" as const,
                    promptKey: promptEditKey,
                    refIndex: i,
                  })
              : null
          return (
            <ReferenceThumbnail
              key={`${ref.src}-${i}`}
              reference={ref}
              onOpen={() => setActiveIndex(i)}
              onRemove={
                onRemove && canRemoveAt(i) ? () => onRemove(i) : undefined
              }
              labelEdit={labelEditDescriptor}
            />
          )
        })}
      </div>
      <MediaLightbox
        items={references}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={(next) => setActiveIndex(next)}
      />
    </>
  )
}

type LabelEditDescriptor =
  | { kind: "canonical"; promptKey: string; refIndex: number }
  | { kind: "extra"; promptKey: string; extraIndex: number }

function ReferenceThumbnail({
  reference,
  onOpen,
  onRemove,
  labelEdit,
}: {
  reference: PromptReference
  onOpen: () => void
  onRemove?: () => void
  /** When set + we're in editing mode, render an inline label editor
   *  under the thumbnail. When unset (or in view mode), the existing
   *  reference.label renders as a static caption (or nothing if empty). */
  labelEdit?: LabelEditDescriptor | null
}) {
  const ctx = useEditor()
  const [failed, setFailed] = useState(false)
  if (failed && !ctx.inEditor) return null
  const labelText = reference.label?.trim() ?? ""
  const showLabelSlot =
    (ctx.isEditing && labelEdit) || labelText.length > 0
  return (
    <div className="group/thumb-wrapper">
    <div className="group/thumb relative aspect-square overflow-hidden rounded-lg bg-black/30">
      <button
        type="button"
        onClick={onOpen}
        className="block h-full w-full cursor-zoom-in"
        aria-label="Expand reference"
      >
        {failed ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-black/60 via-black/20 to-black/60 p-3 text-center">
            <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#E5866F]/60">
              {reference.type === "video" ? "// MOV" : "// IMG"}
            </span>
            <span className="font-mono text-[9px] text-white/30">pending</span>
          </div>
        ) : reference.type === "video" ? (
          <video
            src={reference.src}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
            className="block h-full w-full object-cover transition-transform duration-500 ease-out group-hover/thumb:scale-105"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={reference.src}
            alt={reference.label ?? "Reference"}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="block h-full w-full object-cover transition-transform duration-500 ease-out group-hover/thumb:scale-105"
          />
        )}

        {/* Hover scrim + zoom hint */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover/thumb:opacity-100" />
        <div className="pointer-events-none absolute bottom-2 left-2 right-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-white/85 opacity-0 transition-opacity duration-200 group-hover/thumb:opacity-100">
          <span className="rounded-md bg-black/70 px-1.5 py-0.5 backdrop-blur-md">
            {reference.type === "video" ? "MOV" : "IMG"}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 backdrop-blur-md">
            <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 8v6M8 11h6M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
            Expand
          </span>
        </div>

        {/* Static type badge when not hovering (always-on visibility) */}
        <div className="pointer-events-none absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-md bg-black/70 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-md transition-opacity duration-200 group-hover/thumb:opacity-0">
          {reference.type === "video" ? "MOV" : "IMG"}
        </div>

        {/* Corner brackets */}
        <span aria-hidden className="pointer-events-none absolute left-1.5 top-1.5 h-2.5 w-2.5 border-l border-t border-white/20 opacity-0 transition-opacity duration-200 group-hover/thumb:opacity-100" />
        <span aria-hidden className="pointer-events-none absolute right-1.5 top-1.5 h-2.5 w-2.5 border-r border-t border-white/20 opacity-0 transition-opacity duration-200 group-hover/thumb:opacity-100" />
        <span aria-hidden className="pointer-events-none absolute bottom-1.5 left-1.5 h-2.5 w-2.5 border-l border-b border-white/20 opacity-0 transition-opacity duration-200 group-hover/thumb:opacity-100" />
        <span aria-hidden className="pointer-events-none absolute right-1.5 bottom-1.5 h-2.5 w-2.5 border-r border-b border-white/20 opacity-0 transition-opacity duration-200 group-hover/thumb:opacity-100" />
      </button>

      {/* Editor remove button — overlaid */}
      {onRemove ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="absolute right-1.5 top-1.5 z-10 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/85 text-white/85 opacity-0 backdrop-blur-md transition-all duration-200 hover:bg-red-500/95 hover:text-white group-hover/thumb:opacity-100"
          aria-label="Remove reference"
        >
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.4}>
            <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      ) : null}
    </div>

    {/* Label slot — inline-editable in admin, static caption in public.
        Hidden entirely if there's nothing to show and we're not editing. */}
    {showLabelSlot ? (
      ctx.isEditing && labelEdit ? (
        <ReferenceLabelEditor
          descriptor={labelEdit}
          initial={reference.label ?? ""}
        />
      ) : (
        <p className="mt-1.5 line-clamp-2 break-words font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
          {labelText}
        </p>
      )
    ) : null}
  </div>
  )
}

/** Inline contentEditable for a reference label. Routes the write
 *  through the right context action depending on whether this ref is
 *  canonical (field override) or extra (PromptRef.label on the draft). */
function ReferenceLabelEditor({
  descriptor,
  initial,
}: {
  descriptor: LabelEditDescriptor
  initial: string
}) {
  const ctx = useEditor()
  const ref = useRef<HTMLParagraphElement>(null)

  // For canonical refs we treat the field map as the source of truth so
  // EditableText-style override semantics apply. For extras the canonical
  // value lives on the PromptRef itself, so we just commit on blur.
  const fieldKey =
    descriptor.kind === "canonical"
      ? `${descriptor.promptKey}.refs.${descriptor.refIndex}.label`
      : null

  const value =
    fieldKey !== null
      ? (ctx.draft.fields[fieldKey] ?? initial)
      : initial

  // Keep DOM textContent in sync if external state changes.
  useEffect(() => {
    if (!ref.current) return
    if (ref.current.textContent !== value) {
      ref.current.textContent = value
    }
  }, [value])

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const text = (e.currentTarget.textContent ?? "").trim()
    if (descriptor.kind === "canonical") {
      ctx.updateField(fieldKey!, text, initial)
    } else {
      ctx.updatePromptRefLabel(
        descriptor.promptKey,
        descriptor.extraIndex,
        text
      )
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      ;(e.currentTarget as HTMLElement).blur()
    }
    if (e.key === "Escape") {
      e.preventDefault()
      if (ref.current) ref.current.textContent = value
      ;(e.currentTarget as HTMLElement).blur()
    }
  }

  const isOverridden =
    descriptor.kind === "canonical" &&
    fieldKey !== null &&
    ctx.draft.fields[fieldKey] !== undefined

  return (
    <p
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      spellCheck
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      data-placeholder="Add label…"
      className="editable-text mt-1.5 min-h-[16px] cursor-text break-words rounded-sm font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 outline-none transition-colors empty:before:text-white/25 empty:before:content-[attr(data-placeholder)]"
      style={{
        boxShadow: isOverridden
          ? "inset 0 0 0 1px rgba(229,134,111,0.35)"
          : undefined,
      }}
    >
      {value}
    </p>
  )
}

function MediaLightbox({
  items,
  activeIndex,
  onClose,
  onNavigate,
}: {
  items: PromptReference[]
  activeIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isOpen = activeIndex !== null
  const total = items.length

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight" && activeIndex !== null && total > 1) {
        onNavigate((activeIndex + 1) % total)
      }
      if (e.key === "ArrowLeft" && activeIndex !== null && total > 1) {
        onNavigate((activeIndex - 1 + total) % total)
      }
    },
    [isOpen, activeIndex, total, onClose, onNavigate]
  )

  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", handleKey)
    }
  }, [isOpen, handleKey])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && activeIndex !== null ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/92 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/85 backdrop-blur-md transition-colors hover:bg-black/85 hover:text-white"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7}>
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>

          {/* Counter */}
          {total > 1 ? (
            <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70 backdrop-blur-md">
              {activeIndex + 1} / {total}
            </div>
          ) : null}

          {/* Prev */}
          {total > 1 ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onNavigate((activeIndex - 1 + total) % total)
              }}
              className="absolute left-5 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/85 backdrop-blur-md transition-colors hover:bg-black/85 hover:text-white"
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : null}

          {/* Next */}
          {total > 1 ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onNavigate((activeIndex + 1) % total)
              }}
              className="absolute right-5 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/85 backdrop-blur-md transition-colors hover:bg-black/85 hover:text-white"
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : null}

          {/* Media — natural aspect, capped to viewport */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative flex max-h-[88vh] max-w-[92vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {items[activeIndex].type === "video" ? (
              <video
                src={items[activeIndex].src}
                controls
                autoPlay
                playsInline
                className="block max-h-[88vh] max-w-[92vw] rounded-xl shadow-2xl"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={items[activeIndex].src}
                alt={items[activeIndex].label ?? "Reference"}
                className="block max-h-[88vh] max-w-[92vw] rounded-xl shadow-2xl"
              />
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  )
}

function SingleOutputHero({
  output,
  isExtra,
  onRemove,
  showRemove,
}: {
  output: MediaBlock
  isExtra: boolean
  onRemove: () => void
  showRemove: boolean
}) {
  const ctx = useEditor()
  const [failed, setFailed] = useState(false)
  if (failed && !ctx.inEditor) return null
  return (
    <figure className="relative">
      <AmbientImageHero
        type={output.type}
        src={output.src}
        alt={output.alt ?? output.caption}
        maxHeight={700}
        minHeight={360}
        borderClass="border-white/[0.08]"
        cinematic
        onFailed={() => setFailed(true)}
        failed={failed}
        removable={showRemove && isExtra}
        onRemove={onRemove}
        removeLabel="output"
      />
      {output.caption ? (
        <figcaption className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
          {output.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

/* ------------------------------------------------------------------ */
/* Ambient blur-backdrop hero — same image blurred behind the actual  */
/* image, so portraits & odd ratios feel cohesive instead of stranded */
/* ------------------------------------------------------------------ */

function AmbientImageHero({
  type,
  src,
  alt,
  maxHeight,
  minHeight,
  borderClass,
  cinematic = false,
  autoPlayVideo = false,
  onFailed,
  failed,
  removable,
  onRemove,
  removeLabel,
}: {
  type: "image" | "video"
  src: string
  alt?: string
  maxHeight: number
  minHeight: number
  borderClass: string
  cinematic?: boolean
  autoPlayVideo?: boolean
  onFailed: () => void
  failed: boolean
  removable: boolean
  onRemove: () => void
  removeLabel: string
}) {
  return (
    <div
      className={`group/ambient relative w-full overflow-hidden rounded-xl border ${borderClass}`}
      style={{ minHeight }}
    >
      {/* Ambient blurred backdrop — same image bleeding into the empty
          space around the centered foreground. For landscapes that fill
          the container, the foreground covers it completely. */}
      {!failed && type === "image" ? (
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover scale-110"
            style={{ filter: "blur(48px) saturate(140%)" }}
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
      ) : (
        <div aria-hidden className="absolute inset-0 bg-black/40" />
      )}

      {/* Foreground — actual media at its natural aspect, centered */}
      <div
        className="relative flex items-center justify-center"
        style={{ minHeight, maxHeight }}
      >
        {failed ? (
          <div className="flex w-full flex-col items-center justify-center gap-2 p-10 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5866F]/60">
              {type === "video" ? "// VIDEO PENDING" : "// IMAGE PENDING"}
            </span>
            <code className="max-w-full truncate font-mono text-[11px] text-white/30">{src}</code>
          </div>
        ) : type === "video" ? (
          <video
            src={src}
            controls={!autoPlayVideo}
            muted={autoPlayVideo}
            loop={autoPlayVideo}
            autoPlay={autoPlayVideo}
            playsInline
            preload="metadata"
            onError={onFailed}
            className="relative block w-auto h-auto max-w-full"
            style={{ maxHeight }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? "Generation media"}
            loading="lazy"
            decoding="async"
            onError={onFailed}
            className="relative block w-auto h-auto max-w-full select-none"
            style={{ maxHeight }}
          />
        )}
      </div>

      {/* Type badge */}
      <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-black/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
        {type === "video" ? "MOV" : "IMG"}
      </div>

      {/* Cinematic corner brackets — for outputs */}
      {cinematic ? (
        <>
          <span aria-hidden className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 border-l border-t border-white/25" />
          <span aria-hidden className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 border-r border-t border-white/25" />
          <span aria-hidden className="pointer-events-none absolute bottom-3 left-3 h-3.5 w-3.5 border-l border-b border-white/25" />
          <span aria-hidden className="pointer-events-none absolute right-3 bottom-3 h-3.5 w-3.5 border-r border-b border-white/25" />
        </>
      ) : null}

      {removable ? (
        <button
          type="button"
          onClick={onRemove}
          className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/85 opacity-0 backdrop-blur-md transition-all duration-200 hover:bg-red-500/95 hover:text-white group-hover/ambient:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
          Remove {removeLabel}
        </button>
      ) : null}
    </div>
  )
}

