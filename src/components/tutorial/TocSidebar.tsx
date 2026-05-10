"use client"

import { useEffect, useState } from "react"

export interface TocItem {
  id: string
  index: string
  label: string
}

interface TocSidebarProps {
  items: TocItem[]
}

export function TocSidebar({ items }: TocSidebarProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "")

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [items])

  const handleClick = (id: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    const offset = 100
    const top = target.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: "smooth" })
    setActiveId(id)
  }

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <p className="mb-5 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
        <span aria-hidden className="h-px w-3 bg-white/15" />
        On this page
      </p>
      <ol className="relative space-y-0.5 pl-px">
        {/* Vertical connector */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-[3px] top-2 bottom-2 w-px bg-white/[0.06]"
        />
        {items.map((item) => {
          const isActive = item.id === activeId
          return (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                onClick={handleClick(item.id)}
                className="group relative flex items-start gap-4 py-2 text-sm"
              >
                {/* Active marker dot — sits on top of the vertical connector */}
                <span
                  aria-hidden
                  className={`absolute left-0 top-[14px] h-1.5 w-1.5 -translate-x-1/2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-[#E5866F] shadow-[0_0_8px_rgba(229,134,111,0.6)] scale-100"
                      : "bg-white/10 group-hover:bg-white/30 scale-75"
                  }`}
                />
                <span
                  className={`pl-4 font-mono text-[10px] tabular-nums tracking-[0.16em] transition-colors duration-200 ${
                    isActive ? "text-[#E5866F]" : "text-white/25 group-hover:text-white/50"
                  }`}
                >
                  {item.index}
                </span>
                <span
                  className={`flex-1 text-[13px] leading-snug transition-colors duration-200 ${
                    isActive ? "text-white" : "text-white/40 group-hover:text-white/75"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
