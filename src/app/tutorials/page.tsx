import type { Metadata } from "next"
import Link from "next/link"
import { TutorialCard, type TutorialCardData } from "@/components/tutorial/TutorialCard"

export const metadata: Metadata = {
  title: "Tutorials · Laniameda",
  description:
    "Production-grade AI workflows, fully annotated. Reverse-engineered AI filmmaking and content production techniques — the prompts, the references, the failures, and a packaged skill you can hand to your agent.",
}

const tutorials: TutorialCardData[] = [
  {
    href: "/ferrari",
    eyebrow: "Tutorial · 01 · Cinematography",
    title: "50-second continuous one-take shots in Seedance 2.0",
    description:
      "Past the 15-second per-generation cap. Chain takes that share a starting frame, character sheet, and previous-take video to build cinematic continuous shots for any subject.",
    meta: [
      { label: "Read", value: "14 min" },
      { label: "Skill", value: "Available", highlight: true },
    ],
    media: { kind: "video", src: "/tutorials/ferrari/hero-bg.mp4" },
    status: "live",
  },
  {
    href: null,
    eyebrow: "Tutorial · 02 · Storyboarding",
    title: "Seedance 2.0 + GPT storyboards",
    description:
      "Use a vision-language model as a storyboard pre-pass: lay out beats, lock continuity hooks, and feed the result straight into Seedance prompts. Less re-rolling, more directing.",
    meta: [{ label: "Status", value: "Coming soon" }],
    media: { kind: "placeholder" },
    status: "coming-soon",
  },
]

export default function TutorialsPage() {
  return (
    <div className="dark relative min-h-screen bg-[#0A0A0A] text-white antialiased selection:bg-[#E5866F]/30 selection:text-white">
      {/* Ambient grain — same vocabulary as the tutorial reading view */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Coral atmospheric halo at top — ties the page to the brand and
          gives the eye a focal point on first scroll. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[80vh] mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(229,134,111,0.16) 0%, rgba(229,134,111,0.04) 38%, transparent 70%)",
        }}
      />

      {/* Grid + white-dots pattern — fixed full-viewport so it parallaxes
          beneath the scrolling content. Grid lines at 20px on rgba white
          0.06 give the structural lattice; the centered dot at each cell
          (radial-gradient at 0.45 opacity) adds texture without going
          loud. Slightly toned down from the snippet's 0.6 dot opacity
          so the cards still read as the focal point. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: "#0A0A0A",
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px),
            radial-gradient(circle, rgba(255,255,255,0.45) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px, 20px 20px, 20px 20px",
          backgroundPosition: "0 0, 0 0, 0 0",
        }}
      />

      {/* Top fade — softens the grid right where the page hero sits so
          the title doesn't fight the lattice. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-72"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.45) 55%, transparent 100%)",
        }}
      />

      <div className="relative z-10">
        <SiteHeader />

        <main className="mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-12">
          {/* Page hero */}
          <section className="pt-12 pb-20 sm:pt-20 sm:pb-28">
            <div className="max-w-3xl">
              <div className="mb-7 flex items-center gap-3">
                <span aria-hidden className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E5866F]/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E5866F]" />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5866F]">
                  // TUTORIALS
                </p>
              </div>

              <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-white">
                Production-grade AI workflows, fully annotated.
              </h1>

              <p className="mt-7 max-w-2xl text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.65] text-white/65">
                Reverse-engineered AI filmmaking and content production
                techniques. Each one comes with the prompts, the references, the
                failures, and a packaged skill you can hand to your agent.
              </p>
            </div>
          </section>

          {/* Cards grid */}
          <section className="pb-32 sm:pb-44">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">
              {tutorials.map((t) => (
                <TutorialCard key={t.title} data={t} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function SiteHeader() {
  return (
    <header className="mx-auto max-w-[1200px] px-4 sm:px-8 lg:px-12 pt-8 pb-6">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-white transition-opacity duration-200 hover:opacity-75"
        >
          Laniameda
        </Link>
        <nav className="flex items-center gap-7 sm:gap-9 font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
          <span className="text-white/85">Tutorials</span>
          <a
            href="https://cal.com/michael-buloichyk-zwzdvl/30min"
            target="_blank"
            rel="noreferrer"
            className="group/talk inline-flex items-baseline gap-2 transition-colors duration-200 hover:text-white"
          >
            <span className="relative">
              Let&apos;s Talk
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#E5866F] transition-transform duration-300 ease-out group-hover/talk:scale-x-100"
              />
            </span>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-3 w-3 shrink-0 self-center text-white/35 transition-all duration-200 group-hover/talk:translate-x-0.5 group-hover/talk:-translate-y-0.5 group-hover/talk:text-[#E5866F]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  )
}
