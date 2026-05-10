import type { ReactNode } from "react"
import { EditableText } from "./EditableText"

interface TutorialSectionProps {
  id: string
  index: string
  label: string
  title: string
  /** Short label for the dynamic-island TOC. Falls back to `title`. */
  tocLabel?: string
  /** Editor data-edit-key for the title text. */
  titleEditKey?: string
  children: ReactNode
}

export function TutorialSection({
  id,
  index,
  label,
  title,
  tocLabel,
  titleEditKey,
  children,
}: TutorialSectionProps) {
  return (
    <section
      id={id}
      data-toc
      data-toc-title={tocLabel ?? title}
      data-toc-depth={2}
      className="scroll-mt-28 pt-16 sm:pt-20 first:pt-8"
    >
      <div className="mb-9 flex items-end justify-between gap-6 border-b border-white/[0.07] pb-6">
        <div className="flex items-end gap-5 sm:gap-7">
          {/* Coral chapter numeral — high enough contrast to read */}
          <span
            aria-hidden
            className="hidden sm:block font-mono text-[clamp(2.6rem,3.8vw,3.6rem)] leading-none tabular-nums tracking-[-0.04em] text-[#E5866F]/35"
            style={{ textShadow: "0 0 28px rgba(229,134,111,0.25)" }}
          >
            {index}
          </span>
          <div>
            <div className="mb-2.5 flex items-center gap-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5866F]/85 sm:hidden">
                // {index}
              </span>
              <span aria-hidden className="hidden sm:block h-px w-5 bg-[#E5866F]/60" />
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
                {label}
              </span>
            </div>
            {titleEditKey ? (
              <EditableText
                editKey={titleEditKey}
                initial={title}
                as="h2"
                className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-[1.08] tracking-[-0.012em] text-white"
              />
            ) : (
              <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold leading-[1.08] tracking-[-0.012em] text-white">
                {title}
              </h2>
            )}
          </div>
        </div>
      </div>
      <div className="prose-tutorial">{children}</div>
    </section>
  )
}
