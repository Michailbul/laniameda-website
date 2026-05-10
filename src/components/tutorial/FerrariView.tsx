"use client"

import { Fragment, useState } from "react"
import Link from "next/link"
import { GridDotsBackground } from "@/components/ui/ferrari-page-backgrounds"
import { StickyActions } from "@/components/tutorial/StickyActions"
import { DynamicIslandTOC } from "@/components/ui/dynamic-island-toc"
import { TutorialSection } from "@/components/tutorial/TutorialSection"
import { PromptCard } from "@/components/tutorial/PromptCard"
import { MediaEmbed } from "@/components/tutorial/MediaEmbed"
import { DraftOverlay } from "@/components/tutorial/DraftOverlay"
import { ReadingProgress } from "@/components/tutorial/ReadingProgress"
import { SectionAdditions } from "@/components/tutorial/SectionAdditions"
import { EditableText } from "@/components/tutorial/EditableText"
import { useEditor } from "@/components/tutorial/EditorContext"
import { HoverPreview } from "@/components/ui/hover-preview"
import {
  FERRARI_META,
  FERRARI_SECTIONS,
  FERRARI_SKILL_FILENAME,
  FERRARI_SKILL_HREF,
} from "@/app/tutorials/ferrari/ferrari-content"
import { DRAFT_STORAGE_KEY } from "@/app/tutorials/ferrari/ferrari-editable"

interface FerrariViewProps {
  markdown: string
}

/**
 * Shared rendering of the Ferrari tutorial. Used by:
 *  - `/tutorials/ferrari` (public, no editor provider — read-only)
 *  - `/admin` (wrapped in `<EditorProvider>` — inline editing)
 *
 * Components inside read `useEditor()` and render edit affordances when
 * `isEditing === true`. The DraftOverlay only mounts on the public route
 * to patch text from any localStorage draft (so the editor can preview
 * their edits in the same browser even on the public URL).
 */
export function FerrariView({ markdown }: FerrariViewProps) {
  const ctx = useEditor()

  return (
    <div
      data-editor-mode={ctx.isEditing ? "on" : "off"}
      data-in-editor={ctx.inEditor ? "true" : undefined}
      className="dark relative min-h-screen bg-[#0A0A0A] text-white antialiased selection:bg-[#E5866F]/30 selection:text-white [scroll-behavior:smooth]"
    >
      <ReadingProgress />

      {/* Ambient grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Hero video background.
          Container is intentionally taller than the visible "hero zone"
          so the bottom fade has plenty of runway and never ends at the
          same pixel where the next section begins (which produced the
          visible seam). All darkening happens via a single multi-stop
          gradient with a cubic-ease curve — eight stops smooth out the
          banding that 3-stop dark gradients always show. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(960px,110vh)] overflow-hidden"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ filter: "saturate(1.1) contrast(1.05)" }}
        >
          <source src="/tutorials/ferrari/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Base wash — slightly lighter than before so the video shows
            through the legible part of the hero. The bottom gradient
            now does all the heavy darkening. */}
        <div className="absolute inset-0 bg-[#0A0A0A]/45" />

        {/* Top fade — keeps SiteHeader + sticky actions readable over
            any bright area in the source video. */}
        <div
          className="absolute inset-x-0 top-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.18) 78%, transparent 100%)",
          }}
        />

        {/* Bottom fade — covers ~78% of the container with a cubic-ease
            curve. Eight stops kill the banding that dark 3-stop
            gradients always show, and the final solid stop lands well
            inside the container so any subpixel seam is hidden. */}
        <div
          className="absolute inset-x-0 bottom-0 h-[78%]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.04) 14%, rgba(10,10,10,0.14) 28%, rgba(10,10,10,0.30) 42%, rgba(10,10,10,0.50) 56%, rgba(10,10,10,0.72) 70%, rgba(10,10,10,0.88) 82%, rgba(10,10,10,0.97) 92%, #0A0A0A 100%)",
          }}
        />
      </div>

      {/* Feather strip — paints a soft #0A0A0A → transparent fade that
          STARTS just inside the bottom of the video container and runs
          past it into the content area. Guarantees there is no single
          pixel row where the source bg changes from "video container
          gradient end" to "page bg" — both sides are already painted
          solid #0A0A0A across this band. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 z-0 h-48"
        style={{
          top: "min(880px, 95vh)",
          background:
            "linear-gradient(to bottom, #0A0A0A 0%, rgba(10,10,10,0.92) 30%, rgba(10,10,10,0.5) 70%, transparent 100%)",
        }}
      />

      {/* Coral ambient halo — pulled up so it doesn't compete with the
          fade zone. Same mix-blend behaviour as before. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[80vh] mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(229,134,111,0.18) 0%, transparent 70%)",
        }}
      />

      {/* Page background — grid + dotted pattern that sits behind the
          content from the bottom of the hero zone downward. The hero's
          fade lands on solid #0A0A0A; the background's own top mask
          fades in from that same color so the seam stays invisible. */}
      <GridDotsBackground />

      <div className="relative z-10">
        <SiteHeader />

        <div className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12">
          <StickyActions
            eyebrow={FERRARI_META.eyebrow}
            title={FERRARI_META.title}
            markdown={markdown}
            skillHref={FERRARI_SKILL_HREF}
            skillFilename={FERRARI_SKILL_FILENAME}
          />

          <Hero />

          <div className="pb-32">
            <main className="mx-auto min-w-0 max-w-[920px]">
              {FERRARI_SECTIONS.map((section) => (
                <Fragment key={section.id}>
                  {/* Drop the final video in just before the closing
                      ("Regards") section so it appears between the last
                      tutorial step and the wrap-up — and the TOC reflects
                      that same order: Final video → Regards. */}
                  {section.id === "closing" ? <FinalVideo /> : null}
                <TutorialSection
                  id={section.id}
                  index={section.index}
                  label={section.label}
                  title={section.title}
                  tocLabel={section.tocLabel}
                  titleEditKey={`section.${section.id}.title`}
                >
                  {section.body.map((block, idx) => {
                    const baseKey = `section.${section.id}.body.${idx}`
                    switch (block.kind) {
                      case "p":
                        return (
                          <EditableText
                            key={idx}
                            editKey={`${baseKey}.text`}
                            initial={block.text}
                            as="p"
                            multiline
                            parseLinks
                            className="my-5 text-[15.5px] leading-[1.78] text-white/80"
                          />
                        )
                      case "ul":
                        return (
                          <ul key={idx} className="my-6 space-y-3">
                            {block.items.map((item, i) => (
                              <li
                                key={i}
                                className="relative pl-6 text-[15px] leading-[1.72] text-white/75"
                              >
                                <span
                                  aria-hidden
                                  className="absolute left-0 top-[0.62em] h-1 w-1 rounded-full bg-[#E5866F]/85"
                                />
                                <EditableText
                                  editKey={`${baseKey}.items.${i}`}
                                  initial={item}
                                />
                              </li>
                            ))}
                          </ul>
                        )
                      case "ol":
                        return (
                          <ol key={idx} className="my-6 space-y-3">
                            {block.items.map((item, i) => (
                              <li
                                key={i}
                                className="relative grid grid-cols-[32px_1fr] gap-3 text-[15px] leading-[1.72] text-white/75"
                              >
                                <span
                                  aria-hidden
                                  className="font-mono text-[11px] leading-[1.92] text-[#E5866F]/85 tabular-nums tracking-[0.1em]"
                                >
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <EditableText
                                  editKey={`${baseKey}.items.${i}`}
                                  initial={item}
                                />
                              </li>
                            ))}
                          </ol>
                        )
                      case "quote":
                        return (
                          <figure key={idx} className="my-12 sm:my-16 relative">
                            <span
                              aria-hidden
                              className="pointer-events-none absolute -left-1 -top-6 select-none font-serif text-[6rem] leading-none text-[#E5866F]/20"
                            >
                              “
                            </span>
                            <blockquote className="relative pl-8 text-[clamp(1.1rem,1.9vw,1.45rem)] italic font-light leading-[1.45] tracking-[-0.005em] text-white/90">
                              <span aria-hidden>“</span>
                              <EditableText
                                editKey={`${baseKey}.text`}
                                initial={block.text}
                                multiline
                              />
                              <span aria-hidden>”</span>
                            </blockquote>
                            {block.cite ? (
                              <figcaption className="mt-3 pl-8 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                                — {block.cite}
                              </figcaption>
                            ) : null}
                          </figure>
                        )
                      case "callout":
                        return (
                          <aside
                            key={idx}
                            className="my-8 flex items-start gap-4 rounded-xl border border-[#E5866F]/20 bg-[#E5866F]/[0.04] px-5 py-4"
                          >
                            <span
                              aria-hidden
                              className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#E5866F]"
                            />
                            <EditableText
                              editKey={`${baseKey}.text`}
                              initial={block.text}
                              as="p"
                              multiline
                              parseLinks
                              className="text-[14px] leading-[1.65] text-white/85"
                            />
                          </aside>
                        )
                      case "prompt":
                        return (
                          <PromptCard
                            key={idx}
                            label={block.data.label}
                            prompt={block.data.prompt}
                            templatePrompt={block.data.templatePrompt}
                            references={block.data.references}
                            outputs={block.data.outputs}
                            note={block.data.note}
                            promptEditKey={`${baseKey}.prompt`}
                            noteEditKey={`${baseKey}.note`}
                            labelEditKey={`${baseKey}.label`}
                          />
                        )
                      case "media":
                        return (
                          <MediaEmbed
                            key={idx}
                            type={block.data.type}
                            src={block.data.src}
                            alt={block.data.alt}
                            caption={block.data.caption}
                            aspectRatio={block.data.aspectRatio}
                            captionEditKey={`${baseKey}.caption`}
                          />
                        )
                      default:
                        return null
                    }
                  })}
                  <SectionAdditions sectionId={section.id} />
                </TutorialSection>
                </Fragment>
              ))}

              <SkillFooter />
            </main>
          </div>
        </div>
      </div>

      {/* DraftOverlay only on the public page — inside the editor (edit
          OR preview), components already read from the context. */}
      {!ctx.inEditor ? <DraftOverlay storageKey={DRAFT_STORAGE_KEY} /> : null}

      {/* Dynamic Island TOC — public route only; the editor has its own chrome. */}
      {!ctx.inEditor ? <DynamicIslandTOC selector="[data-toc]" /> : null}
    </div>
  )
}

function SiteHeader() {
  return (
    <header className="mx-auto max-w-[1400px] px-4 sm:px-8 lg:px-12 pt-8 pb-6">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-white transition-opacity duration-200 hover:opacity-75"
        >
          Laniameda
        </Link>
        <nav className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.24em] text-white/50">
          <Link href="/tutorials" className="hover:text-white/80 transition-colors">
            Tutorials
          </Link>
          <span aria-hidden className="px-2 text-white/20">/</span>
          <span className="text-white/85">Ferrari</span>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="pt-12 pb-16 sm:pt-20 sm:pb-24">
      <div className="max-w-3xl">
        <div className="mb-7 flex items-center gap-3">
          <span aria-hidden className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E5866F]/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E5866F]" />
          </span>
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5866F]">
            {FERRARI_META.eyebrow}
          </p>
        </div>

        <EditableText
          editKey="hero.title"
          initial={FERRARI_META.title}
          as="h1"
          multiline
          className="text-[clamp(2.25rem,5.2vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-white"
        />

        {/* Tools used — sits directly under the title as a typographic
            credit strip: who/what made this. No card chrome, no border
            box. A faint top hairline + lowercase-monospace label keeps it
            calm; the tool names ride the same line, separated by mid-dots,
            slightly brighter than the surrounding lede so it reads at a
            glance without competing with the title. */}
        <p className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[13.5px] leading-[1.55] text-white/80">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5866F]/75">
            Tools used
          </span>
          <span aria-hidden className="text-white/20">/</span>
          <span className="font-light text-white/90">
            Magnific (Freepik) · Krea.ai · Midjourney v8.1 · Seedance 2.0 · Nano Banana Pro · DaVinci Resolve.
          </span>
        </p>

        <EditableText
          editKey="hero.lede"
          initial={FERRARI_META.lede}
          as="p"
          multiline
          className="mt-7 max-w-2xl text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.65] text-white/70"
        />

        <div className="mt-10 flex flex-wrap items-center gap-y-4 border-t border-white/[0.07] pt-6 text-[13px]">
          <Meta label="Read time" value={`${FERRARI_META.readMinutes} min`} />
          <MetaSep />
          <Meta label="Updated" value={FERRARI_META.updated} />
          <MetaSep />
          <Meta label="Skill" value="Available" highlight />
        </div>

        {/* Krea workflow link — pure text link, no button chrome.
            The small white Krea mark sits inline like a favicon-style
            attribution; the underline draws in from left on hover, and
            the arrow nudges to telegraph the new-tab open. Wrapped in
            <HoverPreview> so a thumbnail of the actual node graph
            appears next to the cursor on hover. */}
        <p className="mt-5 text-[13px] text-white/55">
          <HoverPreview
            href="https://www.krea.ai/nodes/019d97f4-a851-733a-85bb-c30cb82325ee"
            target="_blank"
            rel="noreferrer"
            className="group/krealink inline-flex items-center gap-2 align-baseline text-white/65 transition-colors duration-200 hover:text-white"
            preview={{
              // Drop a screenshot of the Krea node graph here. If the
              // file is missing the card falls back to a tasteful
              // text-only treatment automatically.
              src: "/tutorials/ferrari/krea-workflow-preview.webp",
              kind: "image",
              title: "Krea · Node workflow",
              subtitle: "Open the full graph for this exact project",
              width: 360,
              aspectRatio: "16 / 10",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brands/krea-logo.svg"
              alt=""
              width={14}
              height={14}
              className="h-[14px] w-[14px] translate-y-[1px] opacity-80 transition-all duration-200 group-hover/krealink:opacity-100"
            />
            <span className="relative">
              See the full workflow on Krea
              {/* Hover underline — draws in from left, sits below the
                  baseline so it doesn't crowd descenders. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#E5866F] transition-transform duration-300 ease-out group-hover/krealink:scale-x-100"
              />
            </span>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-3 w-3 shrink-0 text-white/35 transition-all duration-200 group-hover/krealink:translate-x-0.5 group-hover/krealink:-translate-y-0.5 group-hover/krealink:text-[#E5866F]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </HoverPreview>
        </p>
      </div>
    </section>
  )
}

function Meta({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35">
        {label}
      </span>
      <span
        className={`text-[13px] font-light ${highlight ? "text-[#E5866F]" : "text-white/85"}`}
      >
        {value}
      </span>
    </div>
  )
}

function MetaSep() {
  return (
    <span aria-hidden className="mx-5 inline-block h-3 w-px bg-white/10 self-center" />
  )
}

/** Final video — replays the same source as the hero so the page closes
 *  on the result the entire tutorial builds toward. Inline-autoplay,
 *  muted + loop, cinematic corner brackets to match the rest of the
 *  page's editorial vocabulary. */
function FinalVideo() {
  return (
    <section className="relative mt-28 sm:mt-36" data-toc data-toc-title="Final video">
      <div className="mb-7 flex items-center gap-3">
        <span aria-hidden className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5866F]">
          // FINAL VIDEO
        </span>
        <span aria-hidden className="h-px w-12 bg-[#E5866F]/40" />
      </div>

      <EditableText
        editKey="finalVideo.title"
        initial={FERRARI_META.finalVideoTitle}
        as="h2"
        className="mb-6 text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.015em] text-white"
      />

      <figure className="group/finalvid relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/30">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="block h-auto w-full"
          style={{ filter: "saturate(1.1) contrast(1.05)" }}
        >
          <source src="/tutorials/ferrari/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Cinematic corner brackets */}
        <span aria-hidden className="pointer-events-none absolute left-3 top-3 h-3.5 w-3.5 border-l border-t border-white/30" />
        <span aria-hidden className="pointer-events-none absolute right-3 top-3 h-3.5 w-3.5 border-r border-t border-white/30" />
        <span aria-hidden className="pointer-events-none absolute bottom-3 left-3 h-3.5 w-3.5 border-l border-b border-white/30" />
        <span aria-hidden className="pointer-events-none absolute right-3 bottom-3 h-3.5 w-3.5 border-r border-b border-white/30" />
      </figure>
    </section>
  )
}

function SkillFooter() {
  return (
    <section className="relative mt-28 sm:mt-36">
      {/* Hairline separator — anchors the section in the page rhythm */}
      <div
        aria-hidden
        className="pointer-events-none mx-auto mb-12 h-px w-24 bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="max-w-2xl">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5866F]">
          // PACKAGED SKILL
        </p>
        <EditableText
          editKey="skillFooter.title"
          initial={FERRARI_META.skillFooterTitle}
          as="h3"
          multiline
          className="text-[clamp(1.5rem,2.8vw,2rem)] font-semibold leading-[1.12] tracking-[-0.01em] text-white"
        />
        <EditableText
          editKey="skillFooter.body"
          initial={FERRARI_META.skillFooterBody}
          as="p"
          multiline
          parseLinks
          className="mt-5 text-[15px] leading-[1.7] text-white/65"
        />

        <div className="mt-8">
          <a
            href={FERRARI_SKILL_HREF}
            download={FERRARI_SKILL_FILENAME}
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#E5866F] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-black transition-all duration-200 hover:bg-[#F0967F]"
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
              />
            </svg>
            Download skill.md
          </a>
        </div>
      </div>

      <NewsletterCapture />
      <ConnectLinks />
    </section>
  )
}

/** Email capture for future AI filmmaking guides. Plain inline form —
 *  no card chrome, no modal, no extra copy. Submits to
 *  `/api/newsletter` (currently logs server-side; swap for a real
 *  provider when one is wired up). States: idle / submitting / done /
 *  error, with the input + button collapsing into a single confirmation
 *  line on success so the page rhythm stays calm. */
function NewsletterCapture() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">(
    "idle"
  )
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === "submitting" || status === "done") return
    const trimmed = email.trim()
    if (!trimmed) {
      setStatus("error")
      setErrorMsg("Enter your email to subscribe")
      return
    }
    setStatus("submitting")
    setErrorMsg(null)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source: "ferrari-tutorial" }),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        setStatus("error")
        setErrorMsg(data.error ?? "Something went wrong. Try again.")
        return
      }
      setStatus("done")
    } catch {
      setStatus("error")
      setErrorMsg("Network error. Try again.")
    }
  }

  return (
    <div className="mt-16 max-w-2xl">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5866F]">
        // MORE GUIDES
      </p>
      <EditableText
        editKey="newsletter.title"
        initial={FERRARI_META.newsletterTitle}
        as="h3"
        multiline
        className="text-[clamp(1.25rem,2.4vw,1.6rem)] font-semibold leading-[1.18] tracking-[-0.01em] text-white"
      />
      <EditableText
        editKey="newsletter.body"
        initial={FERRARI_META.newsletterBody}
        as="p"
        multiline
        parseLinks
        className="mt-4 text-[14px] leading-[1.65] text-white/60"
      />

      {status === "done" ? (
        <p className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#79B791]">
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          You&apos;re on the list — talk soon.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch"
          noValidate
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (status === "error") {
                setStatus("idle")
                setErrorMsg(null)
              }
            }}
            placeholder="you@studio.com"
            disabled={status === "submitting"}
            className="flex-1 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[14px] text-white placeholder:text-white/30 transition-colors duration-200 focus:border-[#E5866F]/50 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-[#E5866F]/30 disabled:opacity-60"
            aria-invalid={status === "error"}
            aria-describedby={status === "error" ? "newsletter-error" : undefined}
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#E5866F] px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-black transition-all duration-200 hover:bg-[#F0967F] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
      )}

      {status === "error" && errorMsg ? (
        <p
          id="newsletter-error"
          className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#E5866F]"
        >
          {errorMsg}
        </p>
      ) : null}
    </div>
  )
}

/** Plain-text social row — no card chrome. Each link gets a subtle
 *  bottom-border underline that brightens to coral on hover, plus the
 *  arrow-nudge pattern the rest of the page already uses. */
function ConnectLinks() {
  const links: Array<{ href: string; handle: string; platform: string }> = [
    { href: "https://x.com/misha_buloy", platform: "X", handle: "@misha_buloy" },
    {
      href: "https://instagram.com/misha.buloy",
      platform: "Instagram",
      handle: "@misha.buloy",
    },
    {
      href: "https://www.linkedin.com/in/michael-buloichyk/",
      platform: "LinkedIn",
      handle: "michael-buloichyk",
    },
  ]

  return (
    <div className="mt-16 border-t border-white/[0.06] pt-8">
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
        // Connect
      </p>
      <ul className="flex flex-wrap items-baseline gap-x-7 gap-y-3 text-[14px]">
        {links.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group/social inline-flex items-baseline gap-2 text-white/60 transition-colors duration-200 hover:text-white"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/35 transition-colors duration-200 group-hover/social:text-white/70">
                {item.platform}
              </span>
              <span className="relative font-light">
                {item.handle}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#E5866F] transition-transform duration-300 ease-out group-hover/social:scale-x-100"
                />
              </span>
              <svg
                aria-hidden
                viewBox="0 0 24 24"
                className="h-2.5 w-2.5 shrink-0 self-center text-white/25 transition-all duration-200 group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5 group-hover/social:text-[#E5866F]"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M17 7H7M17 7V17"
                />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

