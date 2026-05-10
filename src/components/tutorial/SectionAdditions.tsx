"use client"

import { useEffect, useState } from "react"
import { MediaEmbed } from "./MediaEmbed"
import { MediaCarousel } from "./MediaCarousel"
import { InlineUploadButton } from "./InlineUploadButton"
import { useEditor } from "./EditorContext"
import {
  DRAFT_STORAGE_KEY,
  normalizeDraft,
} from "@/app/tutorials/ferrari/ferrari-editable"
import type { MediaBlock } from "@/app/tutorials/ferrari/ferrari-content"

interface SectionAdditionsProps {
  sectionId: string
}

/**
 * Renders any media blocks the editor has appended to this section.
 *
 * - In view mode (no provider): reads localStorage on mount so visitors
 *   in the editor's browser see the same content the editor is drafting.
 * - In edit mode (inside `<EditorProvider>`): reads from context state
 *   (so additions appear instantly), wraps each item with a delete chip,
 *   and shows an inline `+ Add` button at the end.
 */
export function SectionAdditions({ sectionId }: SectionAdditionsProps) {
  const ctx = useEditor()
  const [storedAdditions, setStoredAdditions] = useState<MediaBlock[]>([])

  // For PUBLIC view only — pull additions from localStorage on mount.
  // Inside the editor (edit OR preview) we read directly from ctx.draft.
  useEffect(() => {
    if (ctx.inEditor) return
    const reload = () => {
      try {
        const raw = localStorage.getItem(DRAFT_STORAGE_KEY)
        if (!raw) {
          setStoredAdditions([])
          return
        }
        const draft = normalizeDraft(JSON.parse(raw))
        setStoredAdditions(draft.additions[sectionId] ?? [])
      } catch {
        setStoredAdditions([])
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
  }, [sectionId, ctx.inEditor])

  const additions = ctx.inEditor
    ? (ctx.draft.additions[sectionId] ?? [])
    : storedAdditions

  if (!ctx.isEditing && additions.length === 0) return null

  // 2+ additions render as a horizontal carousel — image-heavy workflows
  // stay scannable. A single addition gets the full-column MediaEmbed
  // treatment so it feels like a hero shot.
  const renderAsCarousel = additions.length > 1

  return (
    <>
      {renderAsCarousel ? (
        <div className="my-12">
          <MediaCarousel
            items={additions.map((m) => ({
              type: m.type,
              src: m.src,
              alt: m.alt,
              caption: m.caption,
              aspectRatio: m.aspectRatio,
            }))}
            size="md"
            cinematic
            renderItemOverlay={(_item, i) => {
              if (!ctx.isEditing) return null
              return (
                <button
                  type="button"
                  onClick={() => ctx.removeSectionMedia(sectionId, i)}
                  className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/85 opacity-0 backdrop-blur-md transition-all duration-200 group-hover/citem:opacity-100 hover:bg-red-500/95 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
                  </svg>
                  Remove
                </button>
              )
            }}
          />
        </div>
      ) : (
        additions.map((block, i) => (
          <div key={`${sectionId}-add-${i}`} className="relative group/added">
            <MediaEmbed
              type={block.type}
              src={block.src}
              alt={block.alt}
              caption={block.caption}
              aspectRatio={block.aspectRatio}
            />
            {ctx.isEditing ? (
              <button
                type="button"
                onClick={() => ctx.removeSectionMedia(sectionId, i)}
                className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/85 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/85 opacity-0 backdrop-blur-md transition-all duration-200 group-hover/added:opacity-100 hover:bg-red-500/95 hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
                </svg>
                Remove
              </button>
            ) : null}
          </div>
        ))
      )}

      {ctx.isEditing ? (
        <div className="my-8 flex items-center justify-center gap-3 rounded-xl border border-dashed border-white/[0.08] bg-white/[0.01] py-5 transition-colors hover:border-[#E5866F]/30">
          <span aria-hidden className="h-px w-6 bg-white/15" />
          <InlineUploadButton
            label="Add image or video"
            variant="ghost"
            onUpload={(result) =>
              ctx.addSectionMedia(sectionId, {
                type: result.kind,
                src: result.path,
                aspectRatio: "16/9",
              })
            }
          />
          <span aria-hidden className="h-px w-6 bg-white/15" />
        </div>
      ) : null}
    </>
  )
}
