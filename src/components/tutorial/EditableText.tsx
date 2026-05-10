"use client"

import {
  Fragment,
  useEffect,
  useRef,
  type ElementType,
  type KeyboardEvent,
  type ReactNode,
} from "react"
import { useEditor } from "./EditorContext"

interface EditableTextProps {
  /** Stable key matching `data-edit-key`. Required for editing. */
  editKey: string
  /** Canonical text — the page's source-of-truth value. */
  initial: string
  /** Tag to render as. Default: `span`. */
  as?: ElementType
  /** Allow line breaks. Default: false (Enter blurs the field). */
  multiline?: boolean
  /** Class names applied in both modes. */
  className?: string
  /** When true, view mode parses inline `[label](url)` markdown-style
   *  links and renders them as proper `<a>` tags. Edit mode always
   *  shows the raw text so the syntax can be edited. */
  parseLinks?: boolean
}

/** Parse `[label](url)` patterns into a stream of strings + `<a>` nodes.
 *  External `http(s)` URLs open in a new tab. Anything else is left as
 *  plain text — keeps drive-by injection of weird schemes from working. */
function renderTextWithLinks(text: string): ReactNode {
  const linkRe = /\[([^\]]+)\]\(([^)\s]+)\)/g
  const parts: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let n = 0
  while ((match = linkRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    const [, label, href] = match
    const isExternal = /^https?:\/\//i.test(href)
    if (isExternal) {
      parts.push(
        <a
          key={`link-${n++}`}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-[#E5866F] underline decoration-[#E5866F]/40 decoration-[1px] underline-offset-[3px] transition-colors duration-150 hover:text-[#F4A48F] hover:decoration-[#E5866F]/85"
        >
          {label}
        </a>
      )
    } else {
      parts.push(match[0])
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  if (parts.length === 0) return text
  return parts.map((part, i) =>
    typeof part === "string" ? <Fragment key={`t-${i}`}>{part}</Fragment> : part
  )
}

/**
 * Drop-in replacement for static text. In view mode (no editor provider)
 * it renders a normal element with `data-edit-key` so the public-page
 * `DraftOverlay` can patch it client-side.
 *
 * In edit mode it becomes contentEditable, captures changes on blur, and
 * shows a coral hover/focus halo. Esc cancels the in-flight edit, Enter
 * commits (single-line) or breaks (multiline).
 */
export function EditableText({
  editKey,
  initial,
  as,
  multiline = false,
  className,
  parseLinks = false,
}: EditableTextProps) {
  const Tag = (as ?? "span") as ElementType
  const ctx = useEditor()
  const ref = useRef<HTMLElement>(null)

  const value = ctx.inEditor
    ? (ctx.draft.fields[editKey] ?? initial)
    : initial

  // Keep DOM textContent in sync if external state changes (e.g. reset
  // while in edit mode, or value changes during preview toggle).
  useEffect(() => {
    if (!ctx.isEditing) return
    if (!ref.current) return
    if (ref.current.textContent !== value) {
      ref.current.textContent = value
    }
  }, [value, ctx.isEditing])

  // VIEW (public) and PREVIEW (in-editor preview toggle) both render plain.
  // Public route uses `data-edit-key` for the DraftOverlay text patcher.
  if (!ctx.isEditing) {
    return (
      <Tag data-edit-key={ctx.inEditor ? undefined : editKey} className={className}>
        {parseLinks ? renderTextWithLinks(value) : value}
      </Tag>
    )
  }

  const isEdited = ctx.draft.fields[editKey] !== undefined

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    const text = e.currentTarget.textContent ?? ""
    ctx.updateField(editKey, text, initial)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape") {
      e.preventDefault()
      if (ref.current) ref.current.textContent = value
      ;(e.currentTarget as HTMLElement).blur()
      return
    }
    if (e.key === "Enter" && !multiline) {
      e.preventDefault()
      ;(e.currentTarget as HTMLElement).blur()
    }
  }

  return (
    <Tag
      ref={ref}
      data-edit-key={editKey}
      data-edited={isEdited ? "true" : undefined}
      contentEditable
      suppressContentEditableWarning
      spellCheck
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${className ?? ""} editable-text relative cursor-text rounded-sm outline-none transition-colors`}
      style={{
        boxShadow: isEdited
          ? "inset 0 0 0 1px rgba(229,134,111,0.35)"
          : undefined,
      }}
    >
      {value}
    </Tag>
  )
}
