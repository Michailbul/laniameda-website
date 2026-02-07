"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileText, Target, Palette, Layers, BarChart3, ArrowRight, ExternalLink } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { RoadmapCard } from "@/components/ui/roadmap-card";

/* ─── Animation Primitives ─── */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─── */

const contentLibraryRows = [
  {
    rank: 1,
    format: "Reel",
    type: "News Breakdown",
    description: "Quick breakdown of robotics announcements with consumer impact angle",
    reference: "Tech creators on IG",
    adjust: "Frame through 'time-back' lens",
    complexity: "Low",
    impressions: "15K-40K",
  },
  {
    rank: 2,
    format: "Reel",
    type: "Product Review",
    description: "30-day test results with honest verdict and family use cases",
    reference: "MKBHD-style shorts",
    adjust: "Add family routine context",
    complexity: "Medium",
    impressions: "20K-60K",
  },
  {
    rank: 3,
    format: "Carousel",
    type: "Comparison",
    description: "Side-by-side feature breakdown helping buyers decide",
    reference: "Tech carousel accounts",
    adjust: "Focus on lifestyle fit, not specs",
    complexity: "Low",
    impressions: "8K-25K",
  },
  {
    rank: 4,
    format: "Reel",
    type: "Day in Life",
    description: "How a robot saves 2 hours daily — emotional + practical",
    reference: "Lifestyle creators",
    adjust: "Show real home environments",
    complexity: "Medium",
    impressions: "25K-80K",
  },
  {
    rank: 5,
    format: "Carousel",
    type: "Meme / Trend",
    description: "Trending audio or meme format adapted to robotics niche",
    reference: "Viral trend accounts",
    adjust: "Keep brand voice consistent",
    complexity: "Low",
    impressions: "30K-100K",
  },
  {
    rank: 6,
    format: "Reel",
    type: "Tutorial",
    description: "Setup guides and automation workflows for popular robots",
    reference: "Smart home channels",
    adjust: "Simplify for non-technical audience",
    complexity: "Medium",
    impressions: "10K-30K",
  },
  {
    rank: 7,
    format: "Reel",
    type: "Myth Buster",
    description: "Debunking common fears and misconceptions about home robots",
    reference: "Science communicators",
    adjust: "Use humor + data",
    complexity: "Low",
    impressions: "15K-50K",
  },
  {
    rank: 8,
    format: "Carousel",
    type: "Listicle",
    description: "5 robots under $500 that actually work — curated picks",
    reference: "Buying guide accounts",
    adjust: "Link to e-shop selections",
    complexity: "Low",
    impressions: "12K-35K",
  },
];

const complexityColor: Record<string, string> = {
  Low: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50",
  Medium: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/50",
  High: "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/50",
};

const brandKernelStory =
  "Most robotics brands sell specs. We sell time back. Robots should create more room for family, creativity, and life. We make robotics human.";

const contentPillars = [
  {
    name: "Robotics News Decoded",
    role: "Authority",
    description: "Fast news breakdowns focused on real consumer impact.",
    examples: ["Launch reactions", "Feature implications", "Consumer impact"],
  },
  {
    name: "Time-Back Tutorials",
    role: "Utility",
    description: "Practical guides built to save time, not showcase specs.",
    examples: ["Setup walkthroughs", "Automation workflows", "Daily-use tips"],
  },
  {
    name: "Real-Life Use Cases",
    role: "Trust",
    description: "Proof stories that show robotics in real homes and routines.",
    examples: ["Day-in-life formats", "Before/after routines", "Family wins"],
  },
  {
    name: "Smart Buying Intelligence",
    role: "Conversion",
    description: "Clear comparisons and reviews that drive confident choices.",
    examples: ["Product reviews", "Feature trade-offs", "Best-for scenarios"],
  },
];

const deliverables = [
  "Hypotheses Content Library (10-20 ranked ideas)",
  "Brand Narrative & Positioning (Brand Kernel)",
  "Prioritization System (hero platform/format strategy)",
  "Content Pillars (4-6 repeatable themes)",
  "Visual Direction (Figma reference board)",
  "Repurposing Blueprint (1 idea \u2192 7 pieces framework)",
  "Metrics & Decision Rules (what to track + when to pivot)",
  "Pilot \u2192 Scale Roadmap (90-day execution plan)",
];

const roadmapItems = [
  { quarter: "Days 1-10", title: "Niche Intelligence", description: "Research robotics, AI, consumer tech patterns", status: "in-progress" as const },
  { quarter: "Days 11-20", title: "Brand Kernel", description: "Define narrative, positioning, ICP, messaging", status: "upcoming" as const },
  { quarter: "Days 21-30", title: "System Design", description: "Prioritization, pillars, repurposing, metrics", status: "upcoming" as const },
  { quarter: "Days 31-90", title: "Pilot to Scale", description: "Execute Win #1 with expansion triggers", status: "upcoming" as const },
];

/* ─── Sub-components ─── */

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 pt-4">
      <div className="h-px flex-1 bg-gradient-to-r from-zinc-300 dark:from-zinc-700 to-transparent" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 shrink-0">
        {label}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-zinc-300 dark:from-zinc-700 to-transparent" />
    </div>
  );
}

function NumberBadge({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-teal-500/10 dark:bg-teal-400/10 text-teal-600 dark:text-teal-400 text-[13px] font-bold tabular-nums border border-teal-500/20 dark:border-teal-400/20">
      {n}
    </span>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[15px] leading-[1.8] text-zinc-600 dark:text-zinc-400 [&_strong]:text-zinc-800 dark:[&_strong]:text-zinc-200 [&_strong]:font-semibold">
      {children}
    </div>
  );
}

/* ─── Main Component ─── */

export function V1CreativeTreatment() {
  return (
    <div data-magnetic="false">
      <motion.div className="space-y-16" variants={stagger} initial="initial" animate="animate">

        {/* ─── HERO HEADER ─── */}
        <motion.header variants={fadeUp} className="space-y-6">
          <div className="space-y-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "3rem" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-[2px] bg-teal-500 dark:bg-teal-400"
            />
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
              Creative Treatment Package
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-zinc-900 dark:text-white leading-[1.2]">
            Discovery &{" "}
            <span className="font-semibold">Execution Blueprint</span>
          </h1>

          <Prose>
            <p>
              A comprehensive strategy document that tells you <strong>what to create</strong>, <strong>how to position it</strong>, and <strong>what to prioritize first</strong> — so you spend zero time ideating and all time executing with confidence.
            </p>
          </Prose>

          <div className="flex flex-wrap items-center gap-3 text-[13px]">
            <span className="px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 font-medium border border-teal-200/60 dark:border-teal-800/40">
              10 days
            </span>
            <span className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium border border-zinc-200 dark:border-zinc-800">
              $2,000
            </span>
            <span className="px-3 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-900/50 text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
              Notion + Figma + Strategy docs
            </span>
          </div>
        </motion.header>

        {/* ─── DELIVERABLES OVERVIEW ─── */}
        <RevealSection>
          <SectionDivider label="What you receive" />
        </RevealSection>

        {/* ─── DELIVERABLE #1 — CONTENT LIBRARY ─── */}
        <RevealSection className="space-y-6">
          <div className="flex items-start gap-3">
            <NumberBadge n={1} />
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">
                Hypotheses Content Library
              </h2>
              <p className="text-[13px] text-zinc-500 dark:text-zinc-500">10-20 ranked content directions</p>
            </div>
          </div>

          <Prose>
            <p>
              A ranked library of content hypotheses sourced from robotics and adjacent niches (AI, consumer tech, smart home). Each idea is scored by probability of success, mapped to a platform, and ready to execute.
            </p>
            <p className="mt-3">
              <strong>This becomes your Win #1 backlog.</strong> Start at the top, test highest-probability ideas first, track outcomes, iterate. No more guessing what to post next.
            </p>
          </Prose>

          {/* ─── THE TABLE ─── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                Sample Library Entries
              </span>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-600">
                Full library: 10-20 ideas
              </span>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
              {/* Subtle top accent line */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

              <div className="overflow-x-auto">
                <table className="w-full text-[12px] min-w-[900px]">
                  <thead>
                    <tr className="bg-zinc-50/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800">
                      <th className="py-3 px-3 text-left font-semibold text-zinc-500 dark:text-zinc-400 w-10">#</th>
                      <th className="py-3 px-3 text-left font-semibold text-zinc-500 dark:text-zinc-400 w-20">Format</th>
                      <th className="py-3 px-3 text-left font-semibold text-zinc-500 dark:text-zinc-400 w-28">Type</th>
                      <th className="py-3 px-3 text-left font-semibold text-zinc-500 dark:text-zinc-400 min-w-[200px]">Description</th>
                      <th className="py-3 px-3 text-left font-semibold text-zinc-500 dark:text-zinc-400 w-36">Reference</th>
                      <th className="py-3 px-3 text-left font-semibold text-zinc-500 dark:text-zinc-400 min-w-[160px]">Robotics Adaptation</th>
                      <th className="py-3 px-3 text-center font-semibold text-zinc-500 dark:text-zinc-400 w-24">Complexity</th>
                      <th className="py-3 px-3 text-right font-semibold text-zinc-500 dark:text-zinc-400 w-28">Est. Impressions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contentLibraryRows.map((row, i) => (
                      <motion.tr
                        key={row.rank}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                        className={`group transition-colors hover:bg-teal-50/40 dark:hover:bg-teal-900/10 ${
                          i % 2 === 0 ? "bg-white dark:bg-zinc-950" : "bg-zinc-50/50 dark:bg-zinc-900/30"
                        } border-b border-zinc-100 dark:border-zinc-800/50 last:border-0`}
                      >
                        <td className="py-3 px-3">
                          <span className="text-teal-600 dark:text-teal-400 font-bold tabular-nums">{row.rank}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium ${
                            row.format === "Reel"
                              ? "bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border border-violet-200/60 dark:border-violet-800/40"
                              : "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40"
                          }`}>
                            {row.format}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-medium text-zinc-800 dark:text-zinc-200">{row.type}</td>
                        <td className="py-3 px-3 text-zinc-600 dark:text-zinc-400">{row.description}</td>
                        <td className="py-3 px-3 text-zinc-500 dark:text-zinc-500 text-[11px]">{row.reference}</td>
                        <td className="py-3 px-3 text-zinc-500 dark:text-zinc-500 text-[11px] italic">{row.adjust}</td>
                        <td className="py-3 px-3 text-center">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-medium border ${complexityColor[row.complexity]}`}>
                            {row.complexity}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="font-medium text-zinc-700 dark:text-zinc-300 tabular-nums">{row.impressions}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom fade hint */}
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
            </div>

            <p className="text-[11px] text-zinc-400 dark:text-zinc-600 text-center italic">
              Full library includes 10-20 ideas ranked by probability of success
            </p>
          </div>

          {/* What's inside - collapsed */}
          <details className="group border border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors open:border-teal-400/40 dark:open:border-teal-600/40">
            <summary className="list-none cursor-pointer flex items-center justify-between gap-3 px-5 py-3.5">
              <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-zinc-600 dark:text-zinc-400">
                Each entry includes
              </span>
              <span className="text-[11px] font-medium px-2.5 py-1 border border-teal-400/40 text-teal-700 dark:text-teal-300 rounded-full group-open:bg-teal-50 dark:group-open:bg-teal-950/20 transition-colors">
                9 components
              </span>
            </summary>
            <div className="px-5 pb-4 border-t border-zinc-200 dark:border-zinc-800 pt-3">
              <ul className="grid gap-2 sm:grid-cols-2 text-[13px] text-zinc-600 dark:text-zinc-400">
                {[
                  "Content type classification",
                  "Platform fit analysis",
                  "Reference links (working examples)",
                  "Adaptation notes for your voice",
                  "Complexity rating (Low / Med / High)",
                  "AI stack (Runway, Midjourney, GPT)",
                  "Success metrics per format",
                  "Efficiency projections",
                  "Priority queue (ranked 1-20)",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-500 mt-0.5 text-[8px]">\u25CF</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </RevealSection>

        {/* ─── DELIVERABLE #2 — BRAND POSITIONING ─── */}
        <RevealSection className="space-y-6">
          <div className="flex items-start gap-3">
            <NumberBadge n={2} />
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">
                Brand Narrative & Positioning
              </h2>
              <p className="text-[13px] text-zinc-500 dark:text-zinc-500">Brand Kernel</p>
            </div>
          </div>

          <Prose>
            <p>
              A tight brand identity document that defines who you are, what you believe, and how you communicate. Every piece of content reinforces <strong>your</strong> brand and attracts <strong>your</strong> ideal customers.
            </p>
          </Prose>

          {/* Brand narrative quote */}
          <div className="relative pl-5 border-l-2 border-teal-400 dark:border-teal-500">
            <p className="text-[15px] italic text-zinc-700 dark:text-zinc-300 leading-relaxed">
              &ldquo;{brandKernelStory}&rdquo;
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400 font-semibold">
              Sample brand narrative
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: "Stand for", value: "Accessible, human-centered robotics for everyday families" },
              { label: "Against", value: "Overly technical, intimidating tech that requires an engineering degree" },
              { label: "Promise", value: "Robots that work for you, not the other way around" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
                <span className="text-[10px] uppercase tracking-wider text-teal-600 dark:text-teal-400 font-semibold block mb-1.5">
                  {item.label}
                </span>
                <p className="text-[13px] text-zinc-700 dark:text-zinc-300 leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="text-[13px] text-zinc-500 dark:text-zinc-500">
            <strong className="text-zinc-700 dark:text-zinc-300">Application:</strong>{" "}
            &ldquo;Top 5 robot vacuum features&rdquo; → &ldquo;5 ways robot vacuums give you time back (and 2 features that don&apos;t).&rdquo;
          </div>
        </RevealSection>

        {/* ─── DELIVERABLE #3 — PRIORITIZATION SYSTEM ─── */}
        <RevealSection className="space-y-6">
          <div className="flex items-start gap-3">
            <NumberBadge n={3} />
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">
                Prioritization System
              </h2>
              <p className="text-[13px] text-zinc-500 dark:text-zinc-500">Focus engine</p>
            </div>
          </div>

          <Prose>
            <p>
              A focused execution plan that tells you exactly where to concentrate effort. <strong>You prove ONE system works instead of testing ten ideas and proving nothing.</strong>
            </p>
          </Prose>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="relative overflow-hidden p-4 rounded-xl border border-teal-200 dark:border-teal-900/40 bg-teal-50/30 dark:bg-teal-900/10">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-200/20 dark:bg-teal-500/5 rounded-full -translate-y-8 translate-x-8 blur-xl" />
              <span className="relative text-[10px] uppercase tracking-wider text-teal-600 dark:text-teal-400 font-semibold block mb-2">Hero System</span>
              <p className="relative text-zinc-800 dark:text-zinc-200 text-[15px] font-medium">Instagram Reels</p>
              <p className="relative text-zinc-600 dark:text-zinc-400 text-[12px] mt-1">AI talking head explaining robotics news (5x/week)</p>
            </div>
            <div className="relative overflow-hidden p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-500 font-semibold block mb-2">Support System</span>
              <p className="text-zinc-800 dark:text-zinc-200 text-[15px] font-medium">Instagram Carousels</p>
              <p className="text-zinc-600 dark:text-zinc-400 text-[12px] mt-1">Carousel with key takeaways (3x/week)</p>
            </div>
          </div>
        </RevealSection>

        {/* ─── DELIVERABLE #4 — CONTENT PILLARS ─── */}
        <RevealSection className="space-y-6">
          <div className="flex items-start gap-3">
            <NumberBadge n={4} />
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">
                Content Pillars
              </h2>
              <p className="text-[13px] text-zinc-500 dark:text-zinc-500">4 repeatable themes</p>
            </div>
          </div>

          <Prose>
            <p>
              Pillars are not topics. They are recurring narrative lanes that compound trust, relevance, and conversion over time.
            </p>
          </Prose>

          <div className="space-y-3">
            {contentPillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="group flex items-start gap-4 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 hover:border-teal-300/60 dark:hover:border-teal-700/60 transition-all"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-[11px] font-bold text-teal-600 dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/40">
                  0{i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100">{pillar.name}</span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-500">
                      {pillar.role}
                    </span>
                  </div>
                  <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">{pillar.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {pillar.examples.map((ex, j) => (
                      <span key={j} className="text-[11px] text-zinc-500 dark:text-zinc-500">
                        {j > 0 && <span className="mr-2 text-zinc-300 dark:text-zinc-700">/</span>}
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </RevealSection>

        {/* ─── DELIVERABLE #5 — VISUAL DIRECTION ─── */}
        <RevealSection className="space-y-6">
          <div className="flex items-start gap-3">
            <NumberBadge n={5} />
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">
                Visual Direction
              </h2>
              <p className="text-[13px] text-zinc-500 dark:text-zinc-500">Reference system</p>
            </div>
          </div>

          <Prose>
            <p>
              Turns abstract art direction into something the team can feel immediately: editing rhythm, typography behavior, layout logic, and premium consistency cues.
            </p>
          </Prose>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="p-4 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/20 dark:bg-emerald-900/10">
              <span className="text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold block mb-2">Do</span>
              <ul className="space-y-1 text-[13px] text-zinc-600 dark:text-zinc-400">
                {["Clean typography", "High contrast", "Smooth transitions"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-emerald-500 text-[10px]">\u2713</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 rounded-xl border border-rose-200/60 dark:border-rose-900/40 bg-rose-50/20 dark:bg-rose-900/10">
              <span className="text-[10px] uppercase tracking-wider text-rose-600 dark:text-rose-400 font-semibold block mb-2">Don&apos;t</span>
              <ul className="space-y-1 text-[13px] text-zinc-600 dark:text-zinc-400">
                {["Overuse of effects", "Cluttered text", "Low-quality stock footage"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-rose-500 text-[10px]">\u2715</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </RevealSection>

        {/* ─── DELIVERABLES #6-7 — REPURPOSING + METRICS ─── */}
        <RevealSection className="space-y-6">
          <div className="flex items-start gap-3">
            <NumberBadge n={6} />
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">
                Repurposing + Metrics
              </h2>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-teal-300/60 dark:hover:border-teal-700/60 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <Layers className="size-4 text-teal-500 dark:text-teal-400 group-hover:scale-110 transition-transform" />
                <span className="text-[14px] font-semibold text-zinc-800 dark:text-zinc-200">Repurposing Blueprint</span>
              </div>
              <p className="text-[13px] text-zinc-600 dark:text-zinc-400">1 idea → 7 platform-native assets using predefined adaptation rules.</p>
            </div>
            <div className="group p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-teal-300/60 dark:hover:border-teal-700/60 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="size-4 text-teal-500 dark:text-teal-400 group-hover:scale-110 transition-transform" />
                <span className="text-[14px] font-semibold text-zinc-800 dark:text-zinc-200">Metrics & Decision Rules</span>
              </div>
              <p className="text-[13px] text-zinc-600 dark:text-zinc-400">Clear scorecard: what to scale, improve, or kill each week.</p>
            </div>
          </div>
        </RevealSection>

        {/* ─── DELIVERABLE #8 — ROADMAP ─── */}
        <RevealSection className="space-y-6">
          <div className="flex items-start gap-3">
            <NumberBadge n={7} />
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white tracking-tight">
                Pilot → Scale Roadmap
              </h2>
              <p className="text-[13px] text-zinc-500 dark:text-zinc-500">90-day execution plan</p>
            </div>
          </div>

          <Prose>
            <p>
              A 90-day execution roadmap for Win #1 with explicit transition criteria for Wins #2, #3, and #4.
            </p>
          </Prose>

          <RoadmapCard
            title="Discovery to Execution"
            description="From research to repeatable results"
            items={roadmapItems}
          />
        </RevealSection>

        {/* ─── THE FAILURE LOGIC ─── */}
        <RevealSection className="space-y-6">
          <SectionDivider label="Why discovery first" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Skip Discovery</span>
              </div>
              <div className="text-[13px] text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
                <p><strong className="text-zinc-700 dark:text-zinc-300">Month 1-3:</strong> Random content, 5 formats on 3 platforms, no brand voice → 2K followers</p>
                <p><strong className="text-zinc-700 dark:text-zinc-300">Month 4-6:</strong> Hire freelancer ($3K), still no proven format → burned out</p>
                <p className="text-rose-600 dark:text-rose-400 font-medium">Result: $5-10K spent, 6 months lost</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Start with Discovery</span>
              </div>
              <div className="text-[13px] text-zinc-600 dark:text-zinc-400 space-y-2 leading-relaxed">
                <p><strong className="text-zinc-700 dark:text-zinc-300">Week 1-2:</strong> $2K → full strategy, ranked library, visual direction</p>
                <p><strong className="text-zinc-700 dark:text-zinc-300">Month 1-3:</strong> Execute #1 hypothesis, 70% focus → 12K followers</p>
                <p className="text-teal-600 dark:text-teal-400 font-medium">Result: Win #1 achieved, 200 e-shop clicks</p>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* ─── PACKAGE SUMMARY ─── */}
        <RevealSection className="space-y-6">
          <SectionDivider label="Package summary" />

          <div className="flex flex-wrap gap-4 text-[13px]">
            <div className="px-3 py-1.5 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200/40 dark:border-teal-800/30">
              <span className="text-zinc-500">Timeline:</span>{" "}
              <span className="text-teal-700 dark:text-teal-300 font-medium">5 business days</span>
            </div>
            <div className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
              <span className="text-zinc-500">Investment:</span>{" "}
              <span className="text-zinc-800 dark:text-zinc-200 font-medium">$2,000</span>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 text-[13px] text-zinc-600 dark:text-zinc-400">
            {deliverables.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 group hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
                <span className="text-teal-500 mt-0.5 text-[8px] group-hover:scale-150 transition-transform">\u25CF</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <GlowCard
            customSize
            glowColor="cyan"
            className="w-full rounded-xl border-0 px-5 py-4 !bg-[rgba(20,184,166,0.06)] dark:!bg-[rgba(20,184,166,0.10)]"
          >
            <p className="text-lg font-medium text-teal-700 dark:text-teal-300">
              Discovery first. Then scale with confidence.
            </p>
          </GlowCard>
        </RevealSection>

      </motion.div>
    </div>
  );
}
