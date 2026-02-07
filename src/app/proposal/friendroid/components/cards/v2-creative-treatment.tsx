"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Layers, BarChart3, ChevronDown } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { RoadmapCard } from "@/components/ui/roadmap-card";

/* ─── Reveal Wrapper ─── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated Counter ─── */
function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
  return (
    <span className="font-mono tabular-nums text-teal-600 dark:text-teal-400 font-bold">
      {value}<span className="text-teal-500/60">{suffix}</span>
    </span>
  );
}

/* ─── Data ─── */

const contentLibraryRows = [
  { rank: 1, format: "Reel", type: "News Breakdown", description: "Quick breakdown of robotics announcements with consumer impact angle", reference: "Tech creators on IG", adjust: "Frame through \u2018time-back\u2019 lens", complexity: "Low", impressions: "15K\u201340K" },
  { rank: 2, format: "Reel", type: "Product Review", description: "30-day test results with honest verdict and family use cases", reference: "MKBHD-style shorts", adjust: "Add family routine context", complexity: "Medium", impressions: "20K\u201360K" },
  { rank: 3, format: "Carousel", type: "Comparison", description: "Side-by-side feature breakdown helping buyers decide", reference: "Tech carousel accounts", adjust: "Focus on lifestyle fit", complexity: "Low", impressions: "8K\u201325K" },
  { rank: 4, format: "Reel", type: "Day in Life", description: "How a robot saves 2 hours daily \u2014 emotional + practical", reference: "Lifestyle creators", adjust: "Show real home environments", complexity: "Medium", impressions: "25K\u201380K" },
  { rank: 5, format: "Carousel", type: "Meme / Trend", description: "Trending format adapted to robotics niche", reference: "Viral trend accounts", adjust: "Keep brand voice consistent", complexity: "Low", impressions: "30K\u2013100K" },
  { rank: 6, format: "Reel", type: "Tutorial", description: "Setup guides and automation workflows", reference: "Smart home channels", adjust: "Simplify for non-tech audience", complexity: "Medium", impressions: "10K\u201330K" },
  { rank: 7, format: "Reel", type: "Myth Buster", description: "Debunking common fears about home robots", reference: "Science communicators", adjust: "Use humor + data", complexity: "Low", impressions: "15K\u201350K" },
  { rank: 8, format: "Carousel", type: "Listicle", description: "Curated picks \u2014 5 robots under $500 that actually work", reference: "Buying guide accounts", adjust: "Link to e-shop selections", complexity: "Low", impressions: "12K\u201335K" },
];

const contentPillars = [
  { name: "Robotics News Decoded", role: "Authority", description: "Fast news breakdowns focused on real consumer impact." },
  { name: "Time-Back Tutorials", role: "Utility", description: "Practical guides built to save time, not showcase specs." },
  { name: "Real-Life Use Cases", role: "Trust", description: "Proof stories that show robotics in real homes and routines." },
  { name: "Smart Buying Intelligence", role: "Conversion", description: "Clear comparisons and reviews that drive confident choices." },
];

const deliverables = [
  "Hypotheses Content Library (10\u201320 ranked ideas)",
  "Brand Narrative & Positioning (Brand Kernel)",
  "Prioritization System (hero platform/format strategy)",
  "Content Pillars (4\u20136 repeatable themes)",
  "Visual Direction (Figma reference board)",
  "Repurposing Blueprint (1 idea \u2192 7 pieces)",
  "Metrics & Decision Rules",
  "Pilot \u2192 Scale Roadmap (90-day plan)",
];

const roadmapItems = [
  { quarter: "Days 1\u201310", title: "Niche Intelligence", description: "Research robotics, AI, consumer tech patterns", status: "in-progress" as const },
  { quarter: "Days 11\u201320", title: "Brand Kernel", description: "Define narrative, positioning, ICP, messaging", status: "upcoming" as const },
  { quarter: "Days 21\u201330", title: "System Design", description: "Prioritization, pillars, repurposing, metrics", status: "upcoming" as const },
  { quarter: "Days 31\u201390", title: "Pilot to Scale", description: "Execute Win #1 with expansion triggers", status: "upcoming" as const },
];

/* ─── Section Header ─── */
function SectionNumber({ n, label, sub }: { n: string; label: string; sub?: string }) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <span className="font-mono text-[32px] leading-none font-extralight text-zinc-300 dark:text-zinc-700 select-none tabular-nums">
        {n}
      </span>
      <div>
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight leading-tight">
          {label}
        </h2>
        {sub && <p className="text-[12px] text-zinc-400 dark:text-zinc-600 mt-0.5 font-mono uppercase tracking-wider">{sub}</p>}
      </div>
    </div>
  );
}

/* ─── Expandable Block ─── */
function ExpandBlock({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-zinc-200 dark:border-zinc-800 rounded-lg transition-all ${open ? "border-teal-300/50 dark:border-teal-700/50" : ""}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left cursor-pointer"
      >
        <span className="text-[12px] uppercase tracking-[0.15em] font-semibold text-zinc-600 dark:text-zinc-400">
          {title}
        </span>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-[10px] font-mono px-2 py-0.5 border border-teal-300/50 dark:border-teal-700/50 text-teal-700 dark:text-teal-300 rounded">
              {badge}
            </span>
          )}
          <ChevronDown className={`size-3.5 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-3"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

/* ─── Complexity Badge ─── */
function ComplexityBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Low: "text-emerald-600 dark:text-emerald-400 bg-emerald-500",
    Medium: "text-amber-600 dark:text-amber-400 bg-amber-500",
    High: "text-rose-600 dark:text-rose-400 bg-rose-500",
  };
  const [textColor, dotColor] = (colors[level] || colors.Low).split(" bg-");
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${textColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-${dotColor}`} />
      {level}
    </span>
  );
}

/* ─── Main Component ─── */

export function V2CreativeTreatment() {
  return (
    <div data-magnetic="false">
      <div className="space-y-20">

        {/* ═══ HEADER ═══ */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          {/* Top rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-[1px] bg-zinc-900 dark:bg-white origin-left"
          />

          <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-mono text-[11px] uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-500"
              >
                Creative Treatment Package
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-zinc-900 dark:text-white leading-[1.1]"
              >
                Discovery &<br />
                <span className="font-semibold">execution blueprint</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-end gap-1 text-right font-mono text-[12px]"
            >
              <span className="text-zinc-400 dark:text-zinc-600">Timeline</span>
              <span className="text-zinc-900 dark:text-white font-medium">10 days</span>
              <span className="text-zinc-400 dark:text-zinc-600 mt-2">Investment</span>
              <span className="text-zinc-900 dark:text-white font-medium">$2,000</span>
              <span className="text-zinc-400 dark:text-zinc-600 mt-2">Deliverables</span>
              <span className="text-zinc-900 dark:text-white font-medium">Notion + Figma</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-[15px] leading-[1.8] text-zinc-600 dark:text-zinc-400 max-w-xl"
          >
            <p>
              A strategy document that tells you <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">what to create</strong>, <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">how to position it</strong>, and <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">what to prioritize first</strong> — so you spend zero time ideating and all time executing.
            </p>
          </motion.div>

          {/* Bottom rule */}
          <div className="h-[1px] bg-zinc-200 dark:bg-zinc-800" />
        </motion.header>

        {/* ═══ #1 CONTENT LIBRARY ═══ */}
        <Reveal>
          <SectionNumber n="01" label="Hypotheses Content Library" sub="10\u201320 ranked directions" />

          <div className="space-y-6">
            <div className="text-[15px] leading-[1.8] text-zinc-600 dark:text-zinc-400">
              <p>
                A ranked library of content directions from robotics and adjacent niches. Each idea is scored by probability of success and ready to execute. <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">This becomes your Win #1 backlog</strong> — start at the top, test, track, iterate.
              </p>
            </div>

            {/* ─── TABLE ─── */}
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">
                  Sample entries
                </span>
                <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-600">
                  8 of 10\u201320
                </span>
              </div>

              <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] min-w-[920px]">
                    <thead>
                      <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50">
                        <th className="py-2.5 px-3 text-left font-mono font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-[9px] w-8">#</th>
                        <th className="py-2.5 px-3 text-left font-mono font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-[9px] w-16">FMT</th>
                        <th className="py-2.5 px-3 text-left font-mono font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-[9px] w-28">TYPE</th>
                        <th className="py-2.5 px-3 text-left font-mono font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-[9px] min-w-[180px]">DESCRIPTION</th>
                        <th className="py-2.5 px-3 text-left font-mono font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-[9px] w-32">REF</th>
                        <th className="py-2.5 px-3 text-left font-mono font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-[9px] w-40">ADAPTATION</th>
                        <th className="py-2.5 px-3 text-left font-mono font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-[9px] w-16">LVL</th>
                        <th className="py-2.5 px-3 text-right font-mono font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-[9px] w-24">EST.</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
                      {contentLibraryRows.map((row, i) => (
                        <motion.tr
                          key={row.rank}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 + i * 0.05 }}
                          className="group hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50 transition-colors"
                        >
                          <td className="py-2.5 px-3 font-mono font-bold text-teal-600 dark:text-teal-400">{String(row.rank).padStart(2, "0")}</td>
                          <td className="py-2.5 px-3">
                            <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                              row.format === "Reel"
                                ? "bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400"
                                : "bg-sky-100 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400"
                            }`}>
                              {row.format.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-medium text-zinc-800 dark:text-zinc-200 text-[12px]">{row.type}</td>
                          <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400 text-[12px]">{row.description}</td>
                          <td className="py-2.5 px-3 text-zinc-400 dark:text-zinc-500 text-[11px]">{row.reference}</td>
                          <td className="py-2.5 px-3 text-zinc-400 dark:text-zinc-500 text-[11px] italic">{row.adjust}</td>
                          <td className="py-2.5 px-3">
                            <ComplexityBadge level={row.complexity} />
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono text-zinc-700 dark:text-zinc-300 text-[11px]">{row.impressions}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <ExpandBlock title="What each entry includes" badge="9 components">
              <ul className="grid gap-1.5 sm:grid-cols-2 text-[12px] text-zinc-600 dark:text-zinc-400 font-mono">
                {[
                  "Content type classification",
                  "Platform fit analysis",
                  "Reference links (working examples)",
                  "Adaptation notes for brand voice",
                  "Complexity rating",
                  "AI stack (Runway, Midjourney, GPT)",
                  "Success metrics per format",
                  "Efficiency projections",
                  "Priority queue (ranked 1\u201320)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-500 mt-0.5">\u2192</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ExpandBlock>
          </div>
        </Reveal>

        {/* ═══ #2 BRAND POSITIONING ═══ */}
        <Reveal>
          <SectionNumber n="02" label="Brand Narrative & Positioning" sub="Brand Kernel" />

          <div className="space-y-6">
            <div className="text-[15px] leading-[1.8] text-zinc-600 dark:text-zinc-400">
              <p>
                A tight brand identity document that defines who you are, what you believe, and how you communicate. Every piece of content reinforces <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">your brand</strong> and attracts <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">your ideal customers</strong>.
              </p>
            </div>

            {/* Brand quote */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-teal-500 via-teal-400 to-transparent" />
              <div className="pl-6 py-2">
                <p className="text-[16px] italic text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  &ldquo;Most robotics brands sell specs. We sell time back. Robots should create more room for family, creativity, and life. We make robotics human.&rdquo;
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">
                  Sample brand narrative
                </p>
              </div>
            </div>

            <div className="grid gap-px bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden">
              {[
                { label: "Stand for", value: "Accessible, human-centered robotics for everyday families" },
                { label: "Against", value: "Overly technical, intimidating tech that requires an engineering degree" },
                { label: "Promise", value: "Robots that work for you, not the other way around" },
              ].map((item) => (
                <div key={item.label} className="bg-white dark:bg-zinc-950 p-4 flex items-start gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400 w-20 shrink-0 pt-0.5">
                    {item.label}
                  </span>
                  <p className="text-[13px] text-zinc-700 dark:text-zinc-300">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ═══ #3 PRIORITIZATION ═══ */}
        <Reveal>
          <SectionNumber n="03" label="Prioritization System" sub="Focus engine" />

          <div className="space-y-6">
            <div className="text-[15px] leading-[1.8] text-zinc-600 dark:text-zinc-400">
              <p>
                A focused execution plan that tells you exactly where to concentrate effort. <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">Prove ONE system works instead of testing ten ideas and proving nothing.</strong>
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-4 rounded-lg border-2 border-teal-200 dark:border-teal-800/50 bg-teal-50/30 dark:bg-teal-900/10">
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400 mb-2">Hero</div>
                <p className="text-zinc-900 dark:text-white font-semibold">Instagram Reels</p>
                <p className="text-[12px] text-zinc-600 dark:text-zinc-400 mt-1">AI talking head + robotics news \u2014 5x/week</p>
              </div>
              <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-2">Support</div>
                <p className="text-zinc-900 dark:text-white font-semibold">Instagram Carousels</p>
                <p className="text-[12px] text-zinc-600 dark:text-zinc-400 mt-1">Key takeaway carousels \u2014 3x/week</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ #4 CONTENT PILLARS ═══ */}
        <Reveal>
          <SectionNumber n="04" label="Content Pillars" sub="4 repeatable themes" />

          <div className="space-y-6">
            <div className="text-[15px] leading-[1.8] text-zinc-600 dark:text-zinc-400">
              <p>
                Pillars are not topics. They are recurring narrative lanes that compound trust, relevance, and conversion over time.
              </p>
            </div>

            <div className="grid gap-px bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden">
              {contentPillars.map((pillar, i) => (
                <div key={i} className="bg-white dark:bg-zinc-950 p-4 flex items-start gap-4 group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                  <span className="font-mono text-[24px] font-extralight text-zinc-300 dark:text-zinc-700 w-8 text-right shrink-0 leading-none pt-1">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">{pillar.name}</span>
                      <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600">
                        {pillar.role}
                      </span>
                    </div>
                    <p className="text-[13px] text-zinc-600 dark:text-zinc-400">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ═══ #5 VISUAL DIRECTION ═══ */}
        <Reveal>
          <SectionNumber n="05" label="Visual Direction" sub="Reference system" />

          <div className="space-y-6">
            <div className="text-[15px] leading-[1.8] text-zinc-600 dark:text-zinc-400">
              <p>
                Turns abstract art direction into something the team can feel: editing rhythm, typography behavior, layout logic, and premium consistency cues.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-4 rounded-lg border border-emerald-200/60 dark:border-emerald-900/40">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400 block mb-2">Do</span>
                <ul className="space-y-1 text-[12px] text-zinc-600 dark:text-zinc-400">
                  {["Clean typography", "High contrast", "Smooth transitions"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><span className="text-emerald-500 font-mono text-[10px]">+</span> {item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-rose-200/60 dark:border-rose-900/40">
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-rose-600 dark:text-rose-400 block mb-2">Don&apos;t</span>
                <ul className="space-y-1 text-[12px] text-zinc-600 dark:text-zinc-400">
                  {["Overuse of effects", "Cluttered text", "Low-quality stock footage"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><span className="text-rose-500 font-mono text-[10px]">\u2013</span> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ #6 REPURPOSING + METRICS ═══ */}
        <Reveal>
          <SectionNumber n="06" label="Repurposing + Metrics" />

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="group p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-teal-300/50 dark:hover:border-teal-700/50 transition-colors">
              <Layers className="size-4 text-teal-500 dark:text-teal-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-[14px] font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Repurposing Blueprint</p>
              <p className="text-[13px] text-zinc-600 dark:text-zinc-400">1 idea \u2192 7 platform-native assets using predefined adaptation rules.</p>
            </div>
            <div className="group p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-teal-300/50 dark:hover:border-teal-700/50 transition-colors">
              <BarChart3 className="size-4 text-teal-500 dark:text-teal-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-[14px] font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Metrics & Decision Rules</p>
              <p className="text-[13px] text-zinc-600 dark:text-zinc-400">Clear scorecard: what to scale, improve, or kill each week.</p>
            </div>
          </div>
        </Reveal>

        {/* ═══ #7 ROADMAP ═══ */}
        <Reveal>
          <SectionNumber n="07" label="Pilot \u2192 Scale Roadmap" sub="90-day plan" />

          <div className="space-y-6">
            <div className="text-[15px] leading-[1.8] text-zinc-600 dark:text-zinc-400">
              <p>
                A 90-day execution roadmap for Win #1 with explicit transition criteria for subsequent wins.
              </p>
            </div>

            <RoadmapCard
              title="Discovery to Execution"
              description="From research to repeatable results"
              items={roadmapItems}
            />
          </div>
        </Reveal>

        {/* ═══ WHY DISCOVERY ═══ */}
        <Reveal>
          <div className="h-[1px] bg-zinc-200 dark:bg-zinc-800 mb-10" />

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-rose-600 dark:text-rose-400 font-semibold">Skip Discovery</span>
              </div>
              <div className="text-[13px] text-zinc-600 dark:text-zinc-400 space-y-2">
                <p><strong className="text-zinc-700 dark:text-zinc-300">Month 1\u20133:</strong> Random content, diluted effort \u2192 2K followers</p>
                <p><strong className="text-zinc-700 dark:text-zinc-300">Month 4\u20136:</strong> No proven format \u2192 burned out</p>
                <p className="font-medium text-rose-600 dark:text-rose-400">$5\u201310K spent, 6 months lost</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400 font-semibold">With Discovery</span>
              </div>
              <div className="text-[13px] text-zinc-600 dark:text-zinc-400 space-y-2">
                <p><strong className="text-zinc-700 dark:text-zinc-300">Week 1\u20132:</strong> $2K \u2192 full strategy, ranked library</p>
                <p><strong className="text-zinc-700 dark:text-zinc-300">Month 1\u20133:</strong> 70% focus on working format \u2192 12K followers</p>
                <p className="font-medium text-teal-600 dark:text-teal-400">Win #1 achieved, 200 e-shop clicks</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ SUMMARY ═══ */}
        <Reveal>
          <div className="h-[1px] bg-zinc-900 dark:bg-white mb-10" />

          <div className="space-y-6">
            <div className="flex items-baseline gap-6 font-mono text-[12px]">
              <div>
                <span className="text-zinc-400 dark:text-zinc-600 block text-[10px] uppercase tracking-wider">Timeline</span>
                <span className="text-zinc-900 dark:text-white font-medium">5 business days</span>
              </div>
              <div>
                <span className="text-zinc-400 dark:text-zinc-600 block text-[10px] uppercase tracking-wider">Investment</span>
                <span className="text-zinc-900 dark:text-white font-medium">$2,000</span>
              </div>
              <div>
                <span className="text-zinc-400 dark:text-zinc-600 block text-[10px] uppercase tracking-wider">Format</span>
                <span className="text-zinc-900 dark:text-white font-medium">Notion + Figma</span>
              </div>
            </div>

            <div className="grid gap-1.5 sm:grid-cols-2 text-[13px] text-zinc-600 dark:text-zinc-400">
              {deliverables.map((item, i) => (
                <div key={i} className="flex items-start gap-2 group hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
                  <span className="font-mono text-teal-500 mt-0.5 text-[10px]">\u2713</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <GlowCard
              customSize
              glowColor="cyan"
              className="w-full rounded-lg border-0 px-5 py-4 !bg-[rgba(20,184,166,0.06)] dark:!bg-[rgba(20,184,166,0.10)]"
            >
              <p className="text-lg font-medium text-teal-700 dark:text-teal-300">
                Discovery first. Then scale with confidence.
              </p>
            </GlowCard>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
