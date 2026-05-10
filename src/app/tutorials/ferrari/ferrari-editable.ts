/**
 * Editable-content schema for the Ferrari tutorial.
 *
 * Defines which fields the /admin editor can change, and provides helpers
 * to:
 *   - flatten the structured content into a draft map (key → text)
 *   - apply a draft map back onto the structured content
 *   - generate the updated `ferrari-content.ts` source for export
 *
 * Only TEXT fields are editable here — the document structure (which
 * blocks exist, in what order, what type) stays in code. References,
 * media URLs, and metadata are also not edited via this UI.
 */

import {
  FERRARI_META,
  FERRARI_SECTIONS,
  type MediaBlock,
  type PromptBlock,
  type SectionContent,
} from "./ferrari-content"

export const DRAFT_STORAGE_KEY = "laniameda.ferrari-draft.v2"

/** Reference attached to a prompt (image or video thumbnail). */
export type PromptRef = NonNullable<PromptBlock["references"]>[number]

/**
 * Draft v2 — supports text edits + media block additions + prompt reference
 * additions. Backward-compatible read of v1 (flat field map) via
 * `normalizeDraft`.
 */
export interface DraftV2 {
  /** Field-level text overrides (key → text). Also stores per-reference
   *  label overrides under keys like `${promptKey}.refs.${idx}.label`. */
  fields: Record<string, string>
  /** Extra media blocks appended to a section's body, by section id. */
  additions: Record<string, MediaBlock[]>
  /** Extra references appended to a prompt, by prompt's edit-key (the
   *  `promptEditKey` prop value, e.g. `section.foo.body.2.prompt`). */
  promptRefs: Record<string, PromptRef[]>
  /** Output media (generated results) per prompt, keyed by promptEditKey. */
  promptOutputs: Record<string, MediaBlock[]>
  /** Reference inheritance: target promptKey → source promptKey. When set,
   *  the target prompt displays the source prompt's resolved references
   *  (canonical + extras) instead of its own. */
  inheritRefs: Record<string, string>
}

export const EMPTY_DRAFT: DraftV2 = {
  fields: {},
  additions: {},
  promptRefs: {},
  promptOutputs: {},
  inheritRefs: {},
}

/** Coerce any stored shape (legacy v1 or v2) into a DraftV2. */
export function normalizeDraft(raw: unknown): DraftV2 {
  if (!raw || typeof raw !== "object") return { ...EMPTY_DRAFT }
  const obj = raw as Record<string, unknown>
  const hasV2Keys =
    "fields" in obj || "additions" in obj || "promptRefs" in obj
  if (hasV2Keys) {
    return {
      fields:
        obj.fields && typeof obj.fields === "object"
          ? (obj.fields as Record<string, string>)
          : {},
      additions:
        obj.additions && typeof obj.additions === "object"
          ? (obj.additions as Record<string, MediaBlock[]>)
          : {},
      promptRefs:
        obj.promptRefs && typeof obj.promptRefs === "object"
          ? (obj.promptRefs as Record<string, PromptRef[]>)
          : {},
      promptOutputs:
        obj.promptOutputs && typeof obj.promptOutputs === "object"
          ? (obj.promptOutputs as Record<string, MediaBlock[]>)
          : {},
      inheritRefs:
        obj.inheritRefs && typeof obj.inheritRefs === "object"
          ? (obj.inheritRefs as Record<string, string>)
          : {},
    }
  }
  // Legacy v1 — just a flat record of text overrides
  return {
    fields: obj as Record<string, string>,
    additions: {},
    promptRefs: {},
    promptOutputs: {},
    inheritRefs: {},
  }
}

/** Whether a draft has any actual edits. */
export function isDraftEmpty(draft: DraftV2): boolean {
  return (
    Object.keys(draft.fields).length === 0 &&
    Object.keys(draft.additions).length === 0 &&
    Object.keys(draft.promptRefs).length === 0 &&
    Object.keys(draft.promptOutputs).length === 0 &&
    Object.keys(draft.inheritRefs).length === 0
  )
}

/** Total number of edits across the whole draft. */
export function countDraftEdits(draft: DraftV2): number {
  const adds = Object.values(draft.additions).reduce((n, arr) => n + arr.length, 0)
  const refs = Object.values(draft.promptRefs).reduce((n, arr) => n + arr.length, 0)
  const outs = Object.values(draft.promptOutputs).reduce((n, arr) => n + arr.length, 0)
  const inh = Object.keys(draft.inheritRefs).length
  return Object.keys(draft.fields).length + adds + refs + outs + inh
}

export interface EditableField {
  key: string
  label: string
  multiline: boolean
  initial: string
  /** Hint about where this field sits in the page hierarchy. */
  group: string
}

/** Flatten the canonical content into a list of editable fields. */
export function buildEditableFields(): EditableField[] {
  const out: EditableField[] = []

  out.push({
    key: "hero.title",
    label: "Title",
    multiline: true,
    initial: FERRARI_META.title,
    group: "Hero",
  })
  out.push({
    key: "hero.lede",
    label: "Lede",
    multiline: true,
    initial: FERRARI_META.lede,
    group: "Hero",
  })
  out.push({
    key: "finalVideo.title",
    label: "Final video — title",
    multiline: false,
    initial: FERRARI_META.finalVideoTitle,
    group: "Outro",
  })
  out.push({
    key: "skillFooter.title",
    label: "Skill footer — title",
    multiline: true,
    initial: FERRARI_META.skillFooterTitle,
    group: "Outro",
  })
  out.push({
    key: "skillFooter.body",
    label: "Skill footer — body",
    multiline: true,
    initial: FERRARI_META.skillFooterBody,
    group: "Outro",
  })
  out.push({
    key: "newsletter.title",
    label: "Newsletter — title",
    multiline: true,
    initial: FERRARI_META.newsletterTitle,
    group: "Outro",
  })
  out.push({
    key: "newsletter.body",
    label: "Newsletter — body",
    multiline: true,
    initial: FERRARI_META.newsletterBody,
    group: "Outro",
  })

  for (const section of FERRARI_SECTIONS) {
    out.push({
      key: `section.${section.id}.title`,
      label: "Section title",
      multiline: false,
      initial: section.title,
      group: `${section.index} · ${section.label}`,
    })

    section.body.forEach((block, blockIdx) => {
      const baseKey = `section.${section.id}.body.${blockIdx}`
      switch (block.kind) {
        case "p":
          out.push({
            key: `${baseKey}.text`,
            label: `Paragraph ${blockIdx + 1}`,
            multiline: true,
            initial: block.text,
            group: `${section.index} · ${section.label}`,
          })
          break
        case "quote":
          out.push({
            key: `${baseKey}.text`,
            label: `Quote ${blockIdx + 1}`,
            multiline: true,
            initial: block.text,
            group: `${section.index} · ${section.label}`,
          })
          break
        case "callout":
          out.push({
            key: `${baseKey}.text`,
            label: `Callout ${blockIdx + 1}`,
            multiline: true,
            initial: block.text,
            group: `${section.index} · ${section.label}`,
          })
          break
        case "prompt":
          out.push({
            key: `${baseKey}.label`,
            label: `Model name`,
            multiline: false,
            initial: block.data.label,
            group: `${section.index} · ${section.label}`,
          })
          out.push({
            key: `${baseKey}.prompt`,
            label: `Prompt — ${block.data.label}`,
            multiline: true,
            initial: block.data.prompt,
            group: `${section.index} · ${section.label}`,
          })
          if (block.data.note !== undefined) {
            out.push({
              key: `${baseKey}.note`,
              label: `Prompt note — ${block.data.label}`,
              multiline: true,
              initial: block.data.note,
              group: `${section.index} · ${section.label}`,
            })
          }
          break
        case "media":
          if (block.data.caption !== undefined) {
            out.push({
              key: `${baseKey}.caption`,
              label: `Media caption ${blockIdx + 1}`,
              multiline: false,
              initial: block.data.caption,
              group: `${section.index} · ${section.label}`,
            })
          }
          break
        case "ul":
        case "ol":
          block.items.forEach((item, i) => {
            out.push({
              key: `${baseKey}.items.${i}`,
              label: `${block.kind === "ol" ? "List item" : "Bullet"} ${i + 1}`,
              multiline: false,
              initial: item,
              group: `${section.index} · ${section.label}`,
            })
          })
          break
      }
    })
  }

  return out
}

/** @deprecated Kept for compatibility with code that still expects a flat
 *  field map. Prefer `DraftV2`. */
export type Draft = Record<string, string>

/** Apply text-field edits onto the canonical sections, returning new
 *  objects. Media additions and prompt-reference additions are NOT applied
 *  here — they're rendered client-side as separate components so the
 *  server render stays canonical. */
export function applyDraft(
  draft: Draft | DraftV2 | null
): { meta: { title: string; lede: string }; sections: SectionContent[] } {
  const fields = isDraftV2(draft) ? draft.fields : (draft ?? {})

  const meta = {
    title: fields["hero.title"] ?? FERRARI_META.title,
    lede: fields["hero.lede"] ?? FERRARI_META.lede,
  }

  if (Object.keys(fields).length === 0) {
    return { meta, sections: FERRARI_SECTIONS }
  }

  const sections = FERRARI_SECTIONS.map((section) => {
    const titleKey = `section.${section.id}.title`
    const newTitle = fields[titleKey] ?? section.title

    const newBody = section.body.map((block, blockIdx) => {
      const baseKey = `section.${section.id}.body.${blockIdx}`
      switch (block.kind) {
        case "p":
        case "quote":
        case "callout": {
          const v = fields[`${baseKey}.text`]
          return v !== undefined ? { ...block, text: v } : block
        }
        case "prompt": {
          const promptKey = `${baseKey}.prompt`
          const promptText = fields[promptKey]
          const noteText = fields[`${baseKey}.note`]
          const labelText = fields[`${baseKey}.label`]
          const data = { ...block.data }
          if (promptText !== undefined) data.prompt = promptText
          if (noteText !== undefined) data.note = noteText
          if (labelText !== undefined) data.label = labelText
          // Bake per-reference label overrides into the canonical refs.
          // Field key shape: `${promptKey}.refs.${idx}.label`.
          if (data.references && data.references.length > 0) {
            data.references = data.references.map((ref, refIdx) => {
              const labelOverride = fields[`${promptKey}.refs.${refIdx}.label`]
              if (labelOverride === undefined) return ref
              if (labelOverride === "") {
                const next = { ...ref }
                delete next.label
                return next
              }
              return { ...ref, label: labelOverride }
            })
          }
          return { ...block, data }
        }
        case "media": {
          const v = fields[`${baseKey}.caption`]
          if (v === undefined) return block
          return { ...block, data: { ...block.data, caption: v } }
        }
        case "ul":
        case "ol": {
          const items = block.items.map((item, i) => fields[`${baseKey}.items.${i}`] ?? item)
          return { ...block, items }
        }
      }
    })

    return { ...section, title: newTitle, body: newBody }
  })

  return { meta, sections }
}

function isDraftV2(d: Draft | DraftV2 | null): d is DraftV2 {
  return !!d && typeof d === "object" && "fields" in d && "additions" in d
}

/** Re-emit a JSON draft you can paste into the editor on another machine,
 *  or commit alongside the source as a record of edits. */
export function exportDraftJson(draft: Draft | DraftV2 | null): string {
  return JSON.stringify(draft ?? EMPTY_DRAFT, null, 2)
}

/** Bake draft additions, prompt refs, prompt outputs, AND ref
 *  inheritance into the canonical section structure so the exported
 *  source already reflects every editor decision. */
function bakeDraftIntoSections(draft: Draft | DraftV2 | null): SectionContent[] {
  const { sections } = applyDraft(draft)
  const v2 = draft && isDraftV2(draft) ? draft : null
  // Pre-compute resolved refs for every prompt key so inheritance can be
  // baked in one pass. Uses the post-applyDraft sections so canonical
  // ref labels (overridden via fields) are already present.
  const refsByKey = buildRefsRegistry(sections, v2)
  return sections.map((section) => {
    const additions = v2?.additions?.[section.id] ?? []
    const newBody = section.body.map((block, blockIdx) => {
      if (block.kind === "prompt") {
        const promptKey = `section.${section.id}.body.${blockIdx}.prompt`
        const inheritFrom = v2?.inheritRefs?.[promptKey]
        const extras = v2?.promptRefs?.[promptKey] ?? []
        const outputs = v2?.promptOutputs?.[promptKey] ?? []
        const data = { ...block.data }
        if (inheritFrom && refsByKey[inheritFrom]) {
          // Inherited refs replace this prompt's own refs entirely.
          data.references = refsByKey[inheritFrom]
        } else if (extras.length > 0) {
          data.references = [...(block.data.references ?? []), ...extras]
        }
        if (outputs.length > 0) {
          data.outputs = [...(block.data.outputs ?? []), ...outputs]
        }
        return { ...block, data }
      }
      return block
    })
    return {
      ...section,
      body: [
        ...newBody,
        ...additions.map((m) => ({ kind: "media" as const, data: m })),
      ],
    }
  })
}

/** Build a `{ promptKey → resolved refs }` map by walking sections. The
 *  sections passed in should already have field overrides applied (via
 *  `applyDraft`), so canonical ref labels are baked in. Extras from the
 *  draft are appended. Used to resolve `inheritRefs` references. */
function buildRefsRegistry(
  sections: SectionContent[],
  v2: DraftV2 | null
): Record<string, NonNullable<PromptBlock["references"]>> {
  const out: Record<string, NonNullable<PromptBlock["references"]>> = {}
  for (const section of sections) {
    section.body.forEach((block, blockIdx) => {
      if (block.kind !== "prompt") return
      const key = `section.${section.id}.body.${blockIdx}.prompt`
      const canonical = block.data.references ?? []
      const extras = v2?.promptRefs?.[key] ?? []
      out[key] = [...canonical, ...extras]
    })
  }
  return out
}

/** Public: resolve the full reference list for a prompt key, honouring
 *  field-level label overrides on canonical refs and any extras the
 *  editor added. Used by `<PromptCard>` to look up source refs when
 *  this card inherits from another. */
export function resolveRefsForPrompt(
  promptKey: string,
  draft: DraftV2 | null
): NonNullable<PromptBlock["references"]> {
  const { sections } = applyDraft(draft)
  const registry = buildRefsRegistry(sections, draft)
  return registry[promptKey] ?? []
}

/** Description of a single prompt block on the page. Drives the
 *  "Inherit refs from…" picker in the editor. */
export interface PromptDescriptor {
  /** Stable promptEditKey for this block. */
  key: string
  /** Section index (e.g. "03"). */
  sectionIndex: string
  /** Section title. */
  sectionTitle: string
  /** Prompt label (e.g. "SEEDANCE 2.0"). */
  label: string
  /** First non-empty line of the prompt — short preview. */
  preview: string
  /** Number of references this prompt currently has. */
  refCount: number
}

/** Walk every section once and return a flat list of all prompt blocks
 *  on the page, with enough metadata to render an "inherit from" menu. */
export function listAllPrompts(): PromptDescriptor[] {
  const out: PromptDescriptor[] = []
  for (const section of FERRARI_SECTIONS) {
    section.body.forEach((block, blockIdx) => {
      if (block.kind !== "prompt") return
      const firstLine =
        block.data.prompt.split("\n").find((line) => line.trim().length > 0) ?? ""
      out.push({
        key: `section.${section.id}.body.${blockIdx}.prompt`,
        sectionIndex: section.index,
        sectionTitle: section.title,
        label: block.data.label,
        preview: firstLine.length > 70 ? firstLine.slice(0, 67) + "…" : firstLine,
        refCount: block.data.references?.length ?? 0,
      })
    })
  }
  return out
}

/** The `export const FERRARI_META = { ... } as const` block as a string. */
export function buildMetaCode(draft: Draft | DraftV2 | null): string {
  const { meta } = applyDraft(draft)
  const fields = isDraftV2(draft) ? draft.fields : (draft ?? {})
  const pick = (key: string, fallback: string): string =>
    JSON.stringify(fields[key] ?? fallback)
  return `export const FERRARI_META = {
  eyebrow: ${JSON.stringify(FERRARI_META.eyebrow)},
  label: ${JSON.stringify(FERRARI_META.label)},
  title: ${JSON.stringify(meta.title)},
  lede: ${JSON.stringify(meta.lede)},
  readMinutes: ${FERRARI_META.readMinutes},
  updated: ${JSON.stringify(FERRARI_META.updated)},
  skillName: ${JSON.stringify(FERRARI_META.skillName)},
  finalVideoTitle: ${pick("finalVideo.title", FERRARI_META.finalVideoTitle)},
  skillFooterTitle: ${pick("skillFooter.title", FERRARI_META.skillFooterTitle)},
  skillFooterBody: ${pick("skillFooter.body", FERRARI_META.skillFooterBody)},
  newsletterTitle: ${pick("newsletter.title", FERRARI_META.newsletterTitle)},
  newsletterBody: ${pick("newsletter.body", FERRARI_META.newsletterBody)},
} as const`
}

/** The `export const FERRARI_SECTIONS: SectionContent[] = [ ... ]` block. */
export function buildSectionsCode(draft: Draft | DraftV2 | null): string {
  const baked = bakeDraftIntoSections(draft)
  return `export const FERRARI_SECTIONS: SectionContent[] = ${JSON.stringify(baked, null, 2)}`
}

/** Regenerate META + SECTIONS only as a TypeScript snippet, with text
 *  edits AND any added media blocks / prompt references baked in. Used
 *  by the manual "Export TS" download fallback when filesystem write
 *  isn't available (e.g. production). */
export function exportContentSnippet(draft: Draft | DraftV2 | null): string {
  return `// === Replace FERRARI_META and FERRARI_SECTIONS in ferrari-content.ts with these ===
// Generated by /admin editor.

${buildMetaCode(draft)}

${buildSectionsCode(draft)}
`
}
