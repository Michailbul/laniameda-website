"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import {
  DRAFT_STORAGE_KEY,
  EMPTY_DRAFT,
  countDraftEdits,
  exportContentSnippet,
  exportDraftJson,
  isDraftEmpty,
  normalizeDraft,
  type DraftV2,
  type PromptRef,
} from "@/app/tutorials/ferrari/ferrari-editable"
import type { MediaBlock } from "@/app/tutorials/ferrari/ferrari-content"

interface EditorContextValue {
  /** True when wrapped by `<EditorProvider>` (i.e. on /admin). Components
   *  use this to decide whether to read from the in-memory draft instead
   *  of the canonical `initial` values. */
  inEditor: boolean
  /** True when the editor is in EDIT mode (affordances visible).
   *  In PREVIEW mode this is false but `inEditor` stays true. */
  isEditing: boolean
  /** Toggle between edit mode and preview mode. */
  togglePreview: () => void
  /** Current draft (fields + additions + promptRefs). */
  draft: DraftV2
  /** True after first hydration from localStorage. */
  hydrated: boolean
  /** Timestamp of last successful save (for the "saved" indicator). */
  savedAt: number | null
  /** Total edit count across fields, additions, and references. */
  editCount: number

  // Field-level
  updateField: (key: string, value: string, initial: string) => void
  resetField: (key: string) => void

  // Section media additions
  addSectionMedia: (sectionId: string, media: MediaBlock) => void
  updateSectionMediaCaption: (sectionId: string, index: number, caption: string) => void
  removeSectionMedia: (sectionId: string, index: number) => void

  // Prompt references (input thumbnails)
  addPromptRef: (promptKey: string, ref: PromptRef) => void
  removePromptRef: (promptKey: string, index: number) => void
  /** Update the label on an EXTRA reference (one added via the editor,
   *  stored in `draft.promptRefs`). Pass extraIndex (0-based within the
   *  prompt's extras list, NOT the combined canonical+extras index). */
  updatePromptRefLabel: (
    promptKey: string,
    extraIndex: number,
    label: string
  ) => void
  /** Set/clear ref inheritance for a prompt. Pass `null` to stop
   *  inheriting (the prompt reverts to its own canonical+extra refs). */
  setRefInheritance: (targetPromptKey: string, sourcePromptKey: string | null) => void

  // Prompt outputs (large generated results)
  addPromptOutput: (promptKey: string, output: MediaBlock) => void
  updatePromptOutputCaption: (promptKey: string, index: number, caption: string) => void
  removePromptOutput: (promptKey: string, index: number) => void

  // Whole-draft operations
  resetAll: () => void
  exportSnippet: () => void
  exportJson: () => void
  /** Write the draft directly into `ferrari-content.ts` via the dev API.
   *  Returns `{ ok: true }` on success or `{ ok: false, error }` on
   *  failure. On success the local draft is cleared automatically. */
  applyChanges: () => Promise<{ ok: true } | { ok: false; error: string }>
  /** True while an apply request is in flight. */
  applying: boolean
  /** Timestamp of the last successful apply (drives a brief UI state). */
  appliedAt: number | null
}

const noop = () => {}

const DEFAULT: EditorContextValue = {
  inEditor: false,
  isEditing: false,
  togglePreview: noop,
  draft: EMPTY_DRAFT,
  hydrated: false,
  savedAt: null,
  editCount: 0,
  updateField: noop,
  resetField: noop,
  addSectionMedia: noop,
  updateSectionMediaCaption: noop,
  removeSectionMedia: noop,
  addPromptRef: noop,
  removePromptRef: noop,
  updatePromptRefLabel: noop,
  setRefInheritance: noop,
  addPromptOutput: noop,
  updatePromptOutputCaption: noop,
  removePromptOutput: noop,
  resetAll: noop,
  exportSnippet: noop,
  exportJson: noop,
  applyChanges: async () => ({ ok: false, error: "No editor mounted" }),
  applying: false,
  appliedAt: null,
}

const EditorCtx = createContext<EditorContextValue>(DEFAULT)

export function useEditor(): EditorContextValue {
  return useContext(EditorCtx)
}

interface EditorProviderProps {
  children: ReactNode
}

/**
 * Activates inline editing. Wrap whatever subtree should render with
 * editable text fields + inline add buttons. Outside this provider,
 * components fall back to the read-only default context.
 */
export function EditorProvider({ children }: EditorProviderProps) {
  const [draft, setDraft] = useState<DraftV2>(EMPTY_DRAFT)
  const [hydrated, setHydrated] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)
  const [previewing, setPreviewing] = useState(false)
  const [applying, setApplying] = useState(false)
  const [appliedAt, setAppliedAt] = useState<number | null>(null)
  const saveTimerRef = useRef<number | null>(null)

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY)
      if (raw) setDraft(normalizeDraft(JSON.parse(raw)))
    } catch {
      /* ignore */
    }
    setHydrated(true)
  }, [])

  // Auto-save with debounce
  useEffect(() => {
    if (!hydrated) return
    if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current)
    saveTimerRef.current = window.setTimeout(() => {
      try {
        if (isDraftEmpty(draft)) {
          localStorage.removeItem(DRAFT_STORAGE_KEY)
        } else {
          localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft))
        }
        setSavedAt(Date.now())
      } catch {
        /* ignore */
      }
    }, 450)
    return () => {
      if (saveTimerRef.current !== null) window.clearTimeout(saveTimerRef.current)
    }
  }, [draft, hydrated])

  const updateField = useCallback((key: string, value: string, initial: string) => {
    setDraft((prev) => {
      const fields = { ...prev.fields }
      if (value === initial) delete fields[key]
      else fields[key] = value
      return { ...prev, fields }
    })
  }, [])

  const resetField = useCallback((key: string) => {
    setDraft((prev) => {
      const fields = { ...prev.fields }
      delete fields[key]
      return { ...prev, fields }
    })
  }, [])

  const addSectionMedia = useCallback((sectionId: string, media: MediaBlock) => {
    setDraft((prev) => ({
      ...prev,
      additions: {
        ...prev.additions,
        [sectionId]: [...(prev.additions[sectionId] ?? []), media],
      },
    }))
  }, [])

  const updateSectionMediaCaption = useCallback(
    (sectionId: string, index: number, caption: string) => {
      setDraft((prev) => {
        const list = prev.additions[sectionId] ?? []
        if (index < 0 || index >= list.length) return prev
        const next = list.slice()
        next[index] = { ...next[index], caption: caption || undefined }
        return { ...prev, additions: { ...prev.additions, [sectionId]: next } }
      })
    },
    []
  )

  const removeSectionMedia = useCallback((sectionId: string, index: number) => {
    setDraft((prev) => {
      const list = prev.additions[sectionId] ?? []
      const next = list.filter((_, i) => i !== index)
      const additions = { ...prev.additions }
      if (next.length === 0) delete additions[sectionId]
      else additions[sectionId] = next
      return { ...prev, additions }
    })
  }, [])

  const addPromptRef = useCallback((promptKey: string, ref: PromptRef) => {
    setDraft((prev) => ({
      ...prev,
      promptRefs: {
        ...prev.promptRefs,
        [promptKey]: [...(prev.promptRefs[promptKey] ?? []), ref],
      },
    }))
  }, [])

  const removePromptRef = useCallback((promptKey: string, index: number) => {
    setDraft((prev) => {
      const list = prev.promptRefs[promptKey] ?? []
      const next = list.filter((_, i) => i !== index)
      const refs = { ...prev.promptRefs }
      if (next.length === 0) delete refs[promptKey]
      else refs[promptKey] = next
      return { ...prev, promptRefs: refs }
    })
  }, [])

  const updatePromptRefLabel = useCallback(
    (promptKey: string, extraIndex: number, label: string) => {
      setDraft((prev) => {
        const list = prev.promptRefs[promptKey] ?? []
        if (extraIndex < 0 || extraIndex >= list.length) return prev
        const next = list.slice()
        const trimmed = label.trim()
        const updated = { ...next[extraIndex] }
        if (trimmed.length === 0) delete updated.label
        else updated.label = trimmed
        next[extraIndex] = updated
        return { ...prev, promptRefs: { ...prev.promptRefs, [promptKey]: next } }
      })
    },
    []
  )

  const setRefInheritance = useCallback(
    (targetPromptKey: string, sourcePromptKey: string | null) => {
      setDraft((prev) => {
        const inheritRefs = { ...prev.inheritRefs }
        if (sourcePromptKey === null || sourcePromptKey === targetPromptKey) {
          delete inheritRefs[targetPromptKey]
        } else {
          inheritRefs[targetPromptKey] = sourcePromptKey
        }
        return { ...prev, inheritRefs }
      })
    },
    []
  )

  const addPromptOutput = useCallback((promptKey: string, output: MediaBlock) => {
    setDraft((prev) => ({
      ...prev,
      promptOutputs: {
        ...prev.promptOutputs,
        [promptKey]: [...(prev.promptOutputs[promptKey] ?? []), output],
      },
    }))
  }, [])

  const updatePromptOutputCaption = useCallback(
    (promptKey: string, index: number, caption: string) => {
      setDraft((prev) => {
        const list = prev.promptOutputs[promptKey] ?? []
        if (index < 0 || index >= list.length) return prev
        const next = list.slice()
        next[index] = { ...next[index], caption: caption || undefined }
        return { ...prev, promptOutputs: { ...prev.promptOutputs, [promptKey]: next } }
      })
    },
    []
  )

  const removePromptOutput = useCallback((promptKey: string, index: number) => {
    setDraft((prev) => {
      const list = prev.promptOutputs[promptKey] ?? []
      const next = list.filter((_, i) => i !== index)
      const outs = { ...prev.promptOutputs }
      if (next.length === 0) delete outs[promptKey]
      else outs[promptKey] = next
      return { ...prev, promptOutputs: outs }
    })
  }, [])

  const resetAll = useCallback(() => {
    if (!confirm("Discard all unsaved edits?")) return
    setDraft(EMPTY_DRAFT)
  }, [])

  const downloadFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportSnippet = useCallback(() => {
    downloadFile(
      "ferrari-content.snippet.ts",
      exportContentSnippet(draft),
      "text/typescript"
    )
  }, [draft])

  const exportJson = useCallback(() => {
    downloadFile("ferrari-draft.json", exportDraftJson(draft), "application/json")
  }, [draft])

  const applyChanges = useCallback(async (): Promise<
    { ok: true } | { ok: false; error: string }
  > => {
    setApplying(true)
    try {
      const res = await fetch("/api/admin/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft }),
      })
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
      }
      if (!res.ok || !json.ok) {
        return { ok: false, error: json.error ?? `Apply failed (${res.status})` }
      }
      // Source file now contains everything that was in the draft —
      // clear the draft so the editor reflects the new canonical state
      // on the next render (no more "edits" badge, fresh start).
      setDraft(EMPTY_DRAFT)
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY)
      } catch {
        /* ignore */
      }
      setAppliedAt(Date.now())
      return { ok: true }
    } catch (err) {
      return { ok: false, error: (err as Error).message }
    } finally {
      setApplying(false)
    }
  }, [draft])

  const editCount = countDraftEdits(draft)

  const togglePreview = useCallback(() => {
    setPreviewing((p) => !p)
  }, [])

  return (
    <EditorCtx.Provider
      value={{
        inEditor: true,
        isEditing: !previewing,
        togglePreview,
        draft,
        hydrated,
        savedAt,
        editCount,
        updateField,
        resetField,
        addSectionMedia,
        updateSectionMediaCaption,
        removeSectionMedia,
        addPromptRef,
        removePromptRef,
        updatePromptRefLabel,
        setRefInheritance,
        addPromptOutput,
        updatePromptOutputCaption,
        removePromptOutput,
        resetAll,
        exportSnippet,
        exportJson,
        applyChanges,
        applying,
        appliedAt,
      }}
    >
      {children}
    </EditorCtx.Provider>
  )
}
