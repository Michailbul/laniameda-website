"use client"

import { useState } from "react"
import { EditableText } from "./EditableText"
import { useEditor } from "./EditorContext"

interface MediaEmbedProps {
  type: "image" | "video"
  src: string
  alt?: string
  caption?: string
  /** No longer used for cropping — kept for API compat. Images render at
   *  their natural aspect ratio. */
  aspectRatio?: string
  poster?: string
  captionEditKey?: string
}

/**
 * Single full-column media display. Image renders at its natural aspect
 * ratio (no cropping, no fixed-ratio frame). Width is the column width;
 * height auto-scales. No drop shadow.
 */
export function MediaEmbed({
  type,
  src,
  alt,
  caption,
  poster,
  captionEditKey,
}: MediaEmbedProps) {
  const ctx = useEditor()
  const [failed, setFailed] = useState(false)

  if (failed && !ctx.inEditor) return null

  return (
    <figure className="my-12 sm:my-14">
      <div className="group relative w-full overflow-hidden rounded-xl border border-white/[0.07] bg-black/30 flex items-center justify-center">
        {failed ? (
          <MediaPlaceholder type={type} src={src} />
        ) : type === "video" ? (
          <video
            src={src}
            poster={poster}
            controls
            playsInline
            preload="metadata"
            onError={() => setFailed(true)}
            className="block max-w-full h-auto"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? caption ?? "Tutorial image"}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="block max-w-full h-auto select-none"
          />
        )}

        <CornerBrackets />
      </div>
      {caption ? (
        captionEditKey ? (
          <EditableText
            editKey={captionEditKey}
            initial={caption}
            as="figcaption"
            className="mt-4 block text-center font-mono text-[10px] uppercase tracking-[0.22em] text-white/40"
          />
        ) : (
          <figcaption className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
            {caption}
          </figcaption>
        )
      ) : null}
    </figure>
  )
}

function MediaPlaceholder({ type, src }: { type: "image" | "video"; src: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-black/60 via-black/20 to-black/60 p-8 text-center"
      style={{ minHeight: 240 }}
    >
      <span aria-hidden className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5866F]/60">
        {type === "video" ? "// VIDEO PENDING" : "// IMAGE PENDING"}
      </span>
      <code className="max-w-full truncate font-mono text-[11px] text-white/30">{src}</code>
    </div>
  )
}

function CornerBrackets() {
  return (
    <>
      <span aria-hidden className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t border-white/15" />
      <span aria-hidden className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-white/15" />
      <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-l border-b border-white/15" />
      <span aria-hidden className="pointer-events-none absolute right-2 bottom-2 h-3 w-3 border-r border-b border-white/15" />
    </>
  )
}
