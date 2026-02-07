"use client";

import { motion, useInView, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Layers, BarChart3, ChevronRight, ArrowUpRight } from "lucide-react";
import { PatternCard } from "@/components/ui/pattern-card";
import { RoadmapCard } from "@/components/ui/roadmap-card";

/* ─── Reveal ─── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated progress bar in table rows ─── */
function ImpressionsBar({ value, max = 100000 }: { value: string; max?: number }) {
  const match = value.match(/(\d+)K/);
  const numericMax = match ? parseInt(match[1]) * 1000 : 0;
  const width = Math.min((numericMax / max) * 100, 100);

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400"
        />
      </div>
      <span className="text-[11px] text-zinc-500 dark:text-zinc-400 tabular-nums whitespace-nowrap w-16 text-right">{value}</span>
    </div>
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
  { rank: 8, format: "Carousel", type: "Listicle", description: "5 robots under $500 that actually work", reference: "Buying guides", adjust: "Link to e-shop", complexity: "Low", impressions: "12K\u201335K" },
];

const contentPillars = [
  { name: "Robotics News Decoded", role: "Authority", description: "Fast news breakdowns focused on real consumer impact.", color: "border-l-blue-500" },
  { name: "Time-Back Tutorials", role: "Utility", description: "Practical guides built to save time, not showcase specs.", color: "border-l-teal-500" },
  { name: "Real-Life Use Cases", role: "Trust", description: "Proof stories that show robotics in real homes and routines.", color: "border-l-amber-500" },
  { name: "Smart Buying Intelligence", role: "Conversion", description: "Clear comparisons and reviews that drive confident choices.", color: "border-l-violet-500" },
];

const deliverables = [
  { label: "Hypotheses Content Library", detail: "10\u201320 ranked ideas" },
  { label: "Brand Narrative & Positioning", detail: "Brand Kernel" },
  { label: "Prioritization System", detail: "Hero platform/format" },
  { label: "Content Pillars", detail: "4\u20136 themes" },
  { label: "Visual Direction", detail: "Figma board" },
  { label: "Repurposing Blueprint", detail: "1 \u2192 7 pieces" },
  { label: "Metrics & Decision Rules", detail: "Track + pivot" },
  { label: "Pilot \u2192 Scale Roadmap", detail: "90-day plan" },
];

const roadmapItems = [
  { quarter: "Days 1\u201310", title: "Niche Intelligence", description: "Research robotics, AI, consumer tech patterns", status: "in-progress" as const },
  { quarter: "Days 11\u201320", title: "Brand Kernel", description: "Define narrative, positioning, ICP, messaging", status: "upcoming" as const },
  { quarter: "Days 21\u201330", title: "System Design", description: "Prioritization, pillars, repurposing, metrics", status: "upcoming" as const },
  { quarter: "Days 31\u201390", title: "Pilot to Scale", description: "Execute Win #1 with expansion triggers", status: "upcoming" as const },
];

/* ─── Sub-components ─── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      <div className="w-5 h-px bg-teal-500 dark:bg-teal-400" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-600 dark:text-teal-400">
        {children}
      </span>
    </div>
  );
}

function DeliverableHeader({ n, title, sub }: { n: number; title: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-[13px] font-bold text-teal-600 dark:text-teal-400 border border-zinc-200 dark:border-zinc-800">
        {n}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight leading-tight">{title}</h2>
        {sub && <p className="text-[12px] text-zinc-400 dark:text-zinc-600">{sub}</p>}
      </div>
    </div>
  );
}

function FreeformBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[15px] leading-[1.85] text-zinc-600 dark:text-zinc-400 [&_strong]:text-zinc-800 dark:[&_strong]:text-zinc-200 [&_strong]:font-semibold space-y-3">
      {children}
    </div>
  );
}

function FormatTag({ format }: { format: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide ${
      format === "Reel"
        ? "bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-950/40 dark:to-purple-950/40 text-violet-700 dark:text-violet-400"
        : "bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-950/40 dark:to-blue-950/40 text-sky-700 dark:text-sky-400"
    }`}>
      {format}
    </span>
  );
}

/* ─── Hover Table Row ─── */
function TableRow({ row, index }: { row: typeof contentLibraryRows[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.tr
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 transition-all ${
        hovered ? "bg-teal-50/50 dark:bg-teal-900/[0.06]" : index % 2 === 0 ? "bg-white dark:bg-zinc-950" : "bg-zinc-50/30 dark:bg-zinc-900/20"
      }`}
    >
      <td className="py-3 px-3">
        <span className={`text-[13px] font-bold tabular-nums transition-colors ${hovered ? "text-teal-500" : "text-zinc-300 dark:text-zinc-700"}`}>
          {String(row.rank).padStart(2, "0")}
        </span>
      </td>
      <td className="py-3 px-3"><FormatTag format={row.format} /></td>
      <td className="py-3 px-3 text-[12px] font-medium text-zinc-800 dark:text-zinc-200">{row.type}</td>
      <td className="py-3 px-3 text-[12px] text-zinc-600 dark:text-zinc-400">{row.description}</td>
      <td className="py-3 px-3 text-[11px] text-zinc-400 dark:text-zinc-500">{row.reference}</td>
      <td className="py-3 px-3 text-[11px] text-zinc-400 dark:text-zinc-500 italic">{row.adjust}</td>
      <td className="py-3 px-3 text-center">
        <span className={`inline-block w-2 h-2 rounded-full ${
          row.complexity === "Low" ? "bg-emerald-400" : row.complexity === "Medium" ? "bg-amber-400" : "bg-rose-400"
        }`} title={row.complexity} />
      </td>
      <td className="py-3 px-3">
        <ImpressionsBar value={row.impressions} />
      </td>
    </motion.tr>
  );
}

/* ─── Main ─── */

export function V4CreativeTreatment() {
  return (
    <div data-magnetic="false">
      <div className="space-y-16">

        {/* ═══ HEADER ═══ */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <SectionLabel>Creative Treatment Package</SectionLabel>

          <h1 className="text-3xl sm:text-[40px] font-light tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
            Discovery &amp;{" "}
            <span className="font-semibold">execution blueprint</span>
          </h1>

          <FreeformBlock>
            <p>
              A comprehensive strategy document that tells you <strong>what to create</strong>, <strong>how to position it</strong>, and <strong>what to prioritize first</strong> — so you spend zero time ideating and all time executing with confidence.
            </p>
          </FreeformBlock>

          {/* Key stats */}
          <div className="flex items-center gap-6 py-4 border-y border-zinc-200 dark:border-zinc-800">
            {[
              { label: "Timeline", value: "10 days" },
              { label: "Investment", value: "$2,000" },
              { label: "Format", value: "Notion + Figma" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600">{stat.label}</p>
                <p className="text-[14px] font-semibold text-zinc-900 dark:text-white mt-0.5">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.header>

        {/* ═══ DELIVERABLES OVERVIEW (compact) ═══ */}
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {deliverables.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.04 }}
                className="group p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-teal-300 dark:hover:border-teal-700 bg-white dark:bg-zinc-950 transition-all hover:-translate-y-0.5"
              >
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold tabular-nums block mb-1">0{i + 1}</span>
                <p className="text-[12px] font-medium text-zinc-800 dark:text-zinc-200 leading-tight">{d.label}</p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-0.5">{d.detail}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* ═══ #1 CONTENT LIBRARY ═══ */}
        <Reveal className="space-y-6">
          <DeliverableHeader n={1} title="Hypotheses Content Library" sub="10\u201320 ranked content directions" />

          <FreeformBlock>
            <p>
              A ranked library of content hypotheses sourced from robotics and adjacent niches (AI, consumer tech, smart home). Each idea is scored by probability of success, mapped to a platform, and ready to execute.
            </p>
            <p>
              <strong>This becomes your Win #1 backlog.</strong> Start at the top, test highest-probability ideas first, track outcomes, iterate. No more guessing what to post next.
            </p>
          </FreeformBlock>

          {/* ─── TABLE ─── */}
          <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            {/* Table gradient top */}
            <div className="h-1 bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400" />

            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[920px]">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-900/60">
                    <th className="py-3 px-3 text-left text-[9px] font-semibold uppercase tracking-wider text-zinc-400 w-10">#</th>
                    <th className="py-3 px-3 text-left text-[9px] font-semibold uppercase tracking-wider text-zinc-400 w-20">Format</th>
                    <th className="py-3 px-3 text-left text-[9px] font-semibold uppercase tracking-wider text-zinc-400 w-28">Type</th>
                    <th className="py-3 px-3 text-left text-[9px] font-semibold uppercase tracking-wider text-zinc-400 min-w-[180px]">Description</th>
                    <th className="py-3 px-3 text-left text-[9px] font-semibold uppercase tracking-wider text-zinc-400 w-28">Reference</th>
                    <th className="py-3 px-3 text-left text-[9px] font-semibold uppercase tracking-wider text-zinc-400 w-36">Adaptation</th>
                    <th className="py-3 px-3 text-center text-[9px] font-semibold uppercase tracking-wider text-zinc-400 w-14" title="Complexity">Lvl</th>
                    <th className="py-3 px-3 text-left text-[9px] font-semibold uppercase tracking-wider text-zinc-400 w-36">Est. Impressions</th>
                  </tr>
                </thead>
                <tbody>
                  {contentLibraryRows.map((row, i) => (
                    <TableRow key={row.rank} row={row} index={i} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900/40 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <span className="text-[10px] text-zinc-400 dark:text-zinc-600">
                Showing 8 sample entries \u2014 full library includes 10\u201320 ranked ideas
              </span>
              <div className="flex items-center gap-3 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Low</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> Medium</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-400" /> High</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ #2 BRAND POSITIONING ═══ */}
        <Reveal className="space-y-6">
          <DeliverableHeader n={2} title="Brand Narrative & Positioning" sub="Brand Kernel" />

          <FreeformBlock>
            <p>
              A tight brand identity document that defines who you are, what you believe, and how you communicate. Every piece of content reinforces <strong>your brand</strong> and attracts <strong>your ideal customers</strong>.
            </p>
          </FreeformBlock>

          {/* Quote card */}
          <PatternCard variant="plus" className="rounded-xl">
            <div className="p-5">
              <p className="text-[16px] italic text-zinc-700 dark:text-zinc-300 leading-relaxed">
                &ldquo;Most robotics brands sell specs. We sell time back. Robots should create more room for family, creativity, and life. We make robotics human.&rdquo;
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400 font-semibold">
                Sample brand narrative
              </p>
            </div>
          </PatternCard>

          <div className="space-y-2">
            {[
              { label: "Stand for", value: "Accessible, human-centered robotics for everyday families" },
              { label: "Against", value: "Overly technical, intimidating tech that requires an engineering degree" },
              { label: "Promise", value: "Robots that work for you, not the other way around" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                <span className="text-[11px] uppercase tracking-wider text-teal-600 dark:text-teal-400 font-semibold w-16 shrink-0 pt-0.5">
                  {item.label}
                </span>
                <p className="text-[14px] text-zinc-700 dark:text-zinc-300">{item.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ═══ #3 PRIORITIZATION ═══ */}
        <Reveal className="space-y-6">
          <DeliverableHeader n={3} title="Prioritization System" sub="Focus engine" />

          <FreeformBlock>
            <p>
              A focused execution plan that tells you exactly where to concentrate effort. <strong>Prove ONE system works instead of testing ten ideas and proving nothing.</strong>
            </p>
          </FreeformBlock>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="relative p-4 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-emerald-50/30 dark:from-teal-950/20 dark:to-emerald-950/10 border border-teal-200/50 dark:border-teal-800/30 rounded-xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-wider text-teal-600 dark:text-teal-400 font-semibold">Hero System</span>
                </div>
                <p className="text-zinc-900 dark:text-white font-semibold text-[15px]">Instagram Reels</p>
                <p className="text-zinc-600 dark:text-zinc-400 text-[12px] mt-1">AI talking head + robotics news \u2014 5x/week</p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-semibold">Support System</span>
              </div>
              <p className="text-zinc-900 dark:text-white font-semibold text-[15px]">Instagram Carousels</p>
              <p className="text-zinc-600 dark:text-zinc-400 text-[12px] mt-1">Key takeaway carousels \u2014 3x/week</p>
            </div>
          </div>
        </Reveal>

        {/* ═══ #4 CONTENT PILLARS ═══ */}
        <Reveal className="space-y-6">
          <DeliverableHeader n={4} title="Content Pillars" sub="4 repeatable themes" />

          <FreeformBlock>
            <p>
              Pillars are not topics. They are recurring narrative lanes that compound trust, relevance, and conversion over time.
            </p>
          </FreeformBlock>

          <div className="space-y-2">
            {contentPillars.map((pillar, i) => (
              <div
                key={i}
                className={`group flex items-start gap-3 p-4 rounded-lg border-l-[3px] ${pillar.color} border border-l-[3px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-sm transition-all`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">{pillar.name}</span>
                    <ChevronRight className="size-3 text-zinc-300 dark:text-zinc-700 group-hover:text-teal-500 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-zinc-400 mb-1">{pillar.role} pillar</p>
                  <p className="text-[13px] text-zinc-600 dark:text-zinc-400">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 text-[12px] text-zinc-500 dark:text-zinc-500">
            <strong className="text-zinc-700 dark:text-zinc-300">Execution rhythm:</strong> Mon News / Tue Tutorial / Wed Use Case / Thu Buying / Fri best-performer remix
          </div>
        </Reveal>

        {/* ═══ #5 VISUAL DIRECTION ═══ */}
        <Reveal className="space-y-6">
          <DeliverableHeader n={5} title="Visual Direction" sub="Reference system" />

          <FreeformBlock>
            <p>
              Turns abstract art direction into something the team can feel: editing rhythm, typography, layout logic, and premium consistency cues.
            </p>
          </FreeformBlock>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-4 rounded-lg border border-emerald-200/60 dark:border-emerald-900/30 bg-emerald-50/20 dark:bg-emerald-900/[0.05]">
              <span className="text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold block mb-2">Do</span>
              <ul className="space-y-1.5 text-[12px] text-zinc-600 dark:text-zinc-400">
                {["Clean typography", "High contrast", "Smooth transitions"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-[10px]">\u2713</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-rose-200/60 dark:border-rose-900/30 bg-rose-50/20 dark:bg-rose-900/[0.05]">
              <span className="text-[10px] uppercase tracking-wider text-rose-600 dark:text-rose-400 font-semibold block mb-2">Don&apos;t</span>
              <ul className="space-y-1.5 text-[12px] text-zinc-600 dark:text-zinc-400">
                {["Overuse of effects", "Cluttered text", "Low-quality stock footage"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center text-rose-600 dark:text-rose-400 text-[10px]">\u2715</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* ═══ #6 REPURPOSING + METRICS ═══ */}
        <Reveal className="space-y-6">
          <DeliverableHeader n={6} title="Repurposing + Metrics" />

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="group p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-teal-300/60 dark:hover:border-teal-700/60 transition-all hover:-translate-y-0.5">
              <Layers className="size-4 text-teal-500 dark:text-teal-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-[14px] font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Repurposing Blueprint</p>
              <p className="text-[13px] text-zinc-600 dark:text-zinc-400">1 idea \u2192 7 platform-native assets using predefined adaptation rules.</p>
            </div>
            <div className="group p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-teal-300/60 dark:hover:border-teal-700/60 transition-all hover:-translate-y-0.5">
              <BarChart3 className="size-4 text-teal-500 dark:text-teal-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-[14px] font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Metrics & Decision Rules</p>
              <p className="text-[13px] text-zinc-600 dark:text-zinc-400">Clear scorecard: what to scale, improve, or kill each week.</p>
            </div>
          </div>
        </Reveal>

        {/* ═══ #7 ROADMAP ═══ */}
        <Reveal className="space-y-6">
          <DeliverableHeader n={7} title="Pilot \u2192 Scale Roadmap" sub="90-day execution plan" />

          <FreeformBlock>
            <p>A 90-day execution roadmap for Win #1 with explicit transition criteria for Wins #2, #3, and #4.</p>
          </FreeformBlock>

          <RoadmapCard title="Discovery to Execution" description="From research to repeatable results" items={roadmapItems} />
        </Reveal>

        {/* ═══ WHY DISCOVERY ═══ */}
        <Reveal className="space-y-6">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />

          <SectionLabel>Why discovery first</SectionLabel>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 rounded-lg border border-rose-200/60 dark:border-rose-900/30 bg-rose-50/10 dark:bg-rose-900/[0.03] space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Skip Discovery</span>
              <div className="text-[13px] text-zinc-600 dark:text-zinc-400 space-y-1.5">
                <p><strong className="text-zinc-700 dark:text-zinc-300">M1\u20133:</strong> Random content, 5 formats on 3 platforms \u2192 2K followers</p>
                <p><strong className="text-zinc-700 dark:text-zinc-300">M4\u20136:</strong> Hire freelancer ($3K), no proven format \u2192 burned out</p>
                <p className="font-medium text-rose-600 dark:text-rose-400 pt-1">$5\u201310K spent, 6 months lost</p>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-teal-200/60 dark:border-teal-900/30 bg-teal-50/10 dark:bg-teal-900/[0.03] space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">With Discovery</span>
              <div className="text-[13px] text-zinc-600 dark:text-zinc-400 space-y-1.5">
                <p><strong className="text-zinc-700 dark:text-zinc-300">W1\u20132:</strong> $2K \u2192 full strategy, ranked library, visual direction</p>
                <p><strong className="text-zinc-700 dark:text-zinc-300">M1\u20133:</strong> Execute #1 hypothesis, 70% focus \u2192 12K followers</p>
                <p className="font-medium text-teal-600 dark:text-teal-400 pt-1">Win #1 achieved, 200 e-shop clicks</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ SUMMARY ═══ */}
        <Reveal className="space-y-6">
          <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />

          <div className="flex items-center gap-6 py-4 border-y border-zinc-200 dark:border-zinc-800 text-[13px]">
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">Timeline</span>
              <span className="text-teal-700 dark:text-teal-300 font-semibold">5 business days</span>
            </div>
            <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">Investment</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-semibold">$2,000</span>
            </div>
            <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />
            <div>
              <span className="text-zinc-400 block text-[10px] uppercase tracking-wider">Format</span>
              <span className="text-zinc-800 dark:text-zinc-200 font-semibold">Notion + Figma</span>
            </div>
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-teal-400/10 to-emerald-500/5 dark:from-teal-500/10 dark:via-teal-400/5 dark:to-emerald-500/10" />
            <div className="absolute inset-0 border border-teal-500/20 dark:border-teal-500/10 rounded-xl" />
            <div className="relative px-6 py-5">
              <p className="text-[18px] font-medium text-teal-700 dark:text-teal-300 leading-relaxed">
                Discovery first. Then scale with confidence.
              </p>
              <p className="text-[13px] text-zinc-500 dark:text-zinc-500 mt-1">
                Every deliverable directly enables Win #1. Without it, you&apos;re guessing.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
