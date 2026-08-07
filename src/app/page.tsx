"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import TubesCursor from "@/components/ui/tubes-cursor"

function HeroContent() {
  return (
    <main className="pointer-events-none absolute inset-0 z-20">
      <div className="absolute bottom-8 left-6 sm:bottom-12 sm:left-10 max-w-md">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(0.95rem,1.4vw,1.2rem)] font-light tracking-[0.04em] text-white/80 lowercase leading-[1.3]"
        >
          ai native creative studio
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.6 }}
          className="mt-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-white/45 flex flex-wrap items-center gap-x-2.5 gap-y-1.5"
        >
          <span>AI Filmmaking</span>
          <span aria-hidden className="text-[#E5866F]/40">·</span>
          <span>AI Content Production</span>
          <span aria-hidden className="text-[#E5866F]/40">·</span>
          <span>AI Education</span>
        </motion.p>
      </div>
    </main>
  )
}

// Text-only link with a left-anchored underline that draws in on hover. No
// button chrome, no fill. An absolute href gets the arrow nudge, since that
// link leaves laniameda.space — the ecosystem subdomains keep the same tab,
// only third-party destinations open a new one.
function NavLink({
  href,
  label,
  newTab = false,
}: {
  href: string
  label: string
  newTab?: boolean
}) {
  const leavesSite = href.startsWith("http")
  const className =
    "group/nav inline-flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/65 transition-colors duration-200 hover:text-white"

  const body = (
    <>
      <span className="relative">
        {label}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#E5866F] transition-transform duration-300 ease-out group-hover/nav:scale-x-100"
        />
      </span>
      {leavesSite && (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-3 w-3 shrink-0 self-center text-white/35 transition-all duration-200 group-hover/nav:translate-x-0.5 group-hover/nav:-translate-y-0.5 group-hover/nav:text-[#E5866F]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
        </svg>
      )}
    </>
  )

  if (leavesSite) {
    return (
      <a
        href={href}
        className={className}
        {...(newTab ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {body}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {body}
    </Link>
  )
}

function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-30 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 px-6 sm:px-8 py-7"
    >
      <motion.div
        className="text-white font-semibold text-base tracking-tight"
        whileHover={{ opacity: 0.75 }}
        transition={{ duration: 0.2 }}
      >
        Laniameda
      </motion.div>

      {/* Products first, then what to read, then how to reach us. These are
          linked direct rather than through the /gallery and /studio redirects
          in vercel.json — those exist for typed and shared URLs; a link in the
          UI shouldn't pay for a hop. Wraps on narrow screens: four mono items
          plus the wordmark overflow a phone on one line. */}
      <nav className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-7 md:gap-x-9">
        <NavLink href="https://gallery.laniameda.space" label="Gallery" />
        <NavLink href="https://studio.laniameda.space" label="Studio" />
        <NavLink href="/tutorials" label="Tutorials" />
        <NavLink
          href="https://cal.com/michael-buloichyk-zwzdvl/30min"
          label="Let's Talk"
          newTab
        />
      </nav>
    </motion.header>
  )
}

export default function Home() {
  return (
    <div className="relative min-h-screen w-screen bg-black select-none">
      <div className="fixed inset-0 z-0">
        <TubesCursor />
      </div>

      <div className="relative z-20 h-screen w-screen overflow-hidden">
        <section className="relative h-screen w-screen overflow-hidden">
          <div className="absolute inset-0 z-20 flex flex-col pointer-events-none">
            <div className="pointer-events-auto">
              <Header />
            </div>
            <div className="flex-1 relative pointer-events-none">
              <HeroContent />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
