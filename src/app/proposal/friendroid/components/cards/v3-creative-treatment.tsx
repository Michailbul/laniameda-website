"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, BarChart3 } from "lucide-react";
import { RoadmapCard } from "@/components/ui/roadmap-card";

/* ─── Reveal ─── */
function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Data ─── */

const contentLibraryRows = [
  { rank: 1, format: "Reel", type: "News Breakdown", description: "Quick breakdown of robotics announcements with consumer impact angle", reference: "Tech creators", adjust: "Frame through \u2018time-back\u2019 lens", complexity: "Low", impressions: "15K\u201340K" },
  { rank: 2, format: "Reel", type: "Product Review", description: "30-day test results with honest verdict and family use cases", reference: "MKBHD shorts", adjust: "Add family routine context", complexity: "Medium", impressions: "20K\u201360K" },
  { rank: 3, format: "Carousel", type: "Comparison", description: "Side-by-side feature breakdown helping buyers decide", reference: "Tech carousels", adjust: "Focus on lifestyle fit", complexity: "Low", impressions: "8K\u201325K" },
  { rank: 4, format: "Reel", type: "Day in Life", description: "How a robot saves 2 hours daily \u2014 emotional + practical", reference: "Lifestyle creators", adjust: "Real home environments", complexity: "Medium", impressions: "25K\u201380K" },
  { rank: 5, format: "Carousel", type: "Meme / Trend", description: "Trending format adapted to robotics niche", reference: "Viral trends", adjust: "Keep brand voice", complexity: "Low", impressions: "30K\u2013100K" },
  { rank: 6, format: "Reel", type: "Tutorial", description: "Setup guides and automation workflows for popular robots", reference: "Smart home", adjust: "Simplify for non-tech", complexity: "Medium", impressions: "10K\u201330K" },
  { rank: 7, format: "Reel", type: "Myth Buster", description: "Debunking common fears about home robots", reference: "Science comms", adjust: "Use humor + data", complexity: "Low", impressions: "15K\u201350K" },
  { rank: 8, format: "Carousel", type: "Listicle", description: "5 robots under $500 that actually work \u2014 curated picks", reference: "Buying guides", adjust: "Link to e-shop", complexity: "Low", impressions: "12K\u201335K" },
];

const contentPillars = [
  { name: "Robotics News Decoded", role: "Authority", description: "Fast news breakdowns focused on real consumer impact." },
  { name: "Time-Back Tutorials", role: "Utility", description: "Practical guides built to save time, not showcase specs." },
  { name: "Real-Life Use Cases", role: "Trust", description: "Proof stories that show robotics in real homes and routines." },
  { name: "Smart Buying Intelligence", role: "Conversion", description: "Clear comparisons and reviews that drive confident choices." },
];

const deliverables = [
  "Hypotheses Content Library",
  "Brand Narrative & Positioning",
  "Prioritization System",
  "Content Pillars",
  "Visual Direction",
  "Repurposing Blueprint",
  "Metrics & Decision Rules",
  "Pilot \u2192 Scale Roadmap",
];

const roadmapItems = [
  { quarter: "Days 1\u201310", title: "Niche Intelligence", description: "Research robotics, AI, consumer tech patterns", status: "in-progress" as const },
  { quarter: "Days 11\u201320", title: "Brand Kernel", description: "Define narrative, positioning, ICP, messaging", status: "upcoming" as const },
  { quarter: "Days 21\u201330", title: "System Design", description: "Prioritization, pillars, repurposing, metrics", status: "upcoming" as const },
  { quarter: "Days 31\u201390", title: "Pilot to Scale", description: "Execute Win #1 with expansion triggers", status: "upcoming" as const },
];

/* ─── Sub-components ─── */

function GlowLine() {
  return (
    <div className="relative h-px">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/20 to-transparent blur-sm" />
    </div>
  );
}

function SectionHead({ n, title, sub }: { n: string; title: string; sub?: string }) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="relative">
        <span className="text-[28px] font-extralight text-transparent bg-clip-text bg-gradient-to-b from-teal-400 to-teal-600 tabular-nums leading-none">
          {n}
        </span>
        <div className="absolute -inset-2 bg-teal-500/5 rounded-lg blur-md" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-white tracking-tight">{title}</h2>
        {sub && <p className="text-[12px] text-zinc-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[15px] leading-[1.8] text-zinc-400 [&_strong]:text-zinc-200 [&_strong]:font-semibold">
      {children}
    </div>
  );
}

/* ─── Main ─── */

export function V3CreativeTreatment() {
  return (
    <div data-magnetic="false">
      <div className="space-y-20">

        {/* ═══ HEADER ═══ */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="space-y-8 relative"
        >
          {/* Ambient glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "2rem" }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-px bg-gradient-to-r from-teal-400 to-transparent"
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-teal-400/80">
                Creative Treatment
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
            className="text-4xl sm:text-5xl font-light tracking-[-0.03em] text-white leading-[1.1]"
          >
            Discovery &<br />
            <span className="font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              execution blueprint
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Prose>
              <p>
                A strategy document that tells you <strong>what to create</strong>, <strong>how to position it</strong>, and <strong>what to prioritize first</strong> — so you spend zero time ideating and all time executing with confidence.
              </p>
            </Prose>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            {[
              { label: "10 days", accent: true },
              { label: "$2,000", accent: false },
              { label: "Notion + Figma + Strategy docs", accent: false },
            ].map((tag) => (
              <span
                key={tag.label}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium border ${
                  tag.accent
                    ? "border-teal-500/30 text-teal-300 bg-teal-500/5"
                    : "border-zinc-800 text-zinc-400 bg-zinc-900/50"
                }`}
              >
                {tag.label}
              </span>
            ))}
          </motion.div>

          <GlowLine />
        </motion.header>

        {/* ═══ #1 CONTENT LIBRARY ═══ */}
        <Reveal>
          <SectionHead n="01" title="Hypotheses Content Library" sub="10\u201320 ranked content directions" />

          <div className="space-y-6">
            <Prose>
              <p>
                A ranked library of content hypotheses from robotics and adjacent niches. Each idea is scored by probability of success and ready to execute. <strong>This becomes your Win #1 backlog</strong> — start at the top, test, track, iterate.
              </p>
            </Prose>

            {/* ─── TABLE ─── */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                <span>Sample entries</span>
                <span>8 of 10\u201320</span>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
                {/* Top accent */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

                <div className="overflow-x-auto">
                  <table className="w-full text-[11px] min-w-[900px]">
                    <thead>
                      <tr className="border-b border-zinc-800/80">
                        <th className="py-3 px-3 text-left text-[9px] font-medium uppercase tracking-wider text-zinc-500 w-8">#</th>
                        <th className="py-3 px-3 text-left text-[9px] font-medium uppercase tracking-wider text-zinc-500 w-20">Format</th>
                        <th className="py-3 px-3 text-left text-[9px] font-medium uppercase tracking-wider text-zinc-500 w-28">Type</th>
                        <th className="py-3 px-3 text-left text-[9px] font-medium uppercase tracking-wider text-zinc-500 min-w-[180px]">Description</th>
                        <th className="py-3 px-3 text-left text-[9px] font-medium uppercase tracking-wider text-zinc-500 w-28">Reference</th>
                        <th className="py-3 px-3 text-left text-[9px] font-medium uppercase tracking-wider text-zinc-500 w-40">Adaptation</th>
                        <th className="py-3 px-3 text-center text-[9px] font-medium uppercase tracking-wider text-zinc-500 w-16">Level</th>
                        <th className="py-3 px-3 text-right text-[9px] font-medium uppercase tracking-wider text-zinc-500 w-24">Est. Imp.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentLibraryRows.map((row, i) => (
                        <motion.tr
                          key={row.rank}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + i * 0.06 }}
                          className={`group border-b border-zinc-800/40 last:border-0 hover:bg-teal-500/[0.03] transition-colors ${
                            i % 2 === 0 ? "bg-zinc-950/30" : ""
                          }`}
                        >
                          <td className="py-2.5 px-3">
                            <span className="text-teal-400 font-bold tabular-nums">{row.rank}</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              row.format === "Reel"
                                ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                                : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                            }`}>
                              {row.format}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 font-medium text-zinc-200 text-[12px]">{row.type}</td>
                          <td className="py-2.5 px-3 text-zinc-400 text-[12px]">{row.description}</td>
                          <td className="py-2.5 px-3 text-zinc-500 text-[11px]">{row.reference}</td>
                          <td className="py-2.5 px-3 text-zinc-500 text-[11px] italic">{row.adjust}</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className={`text-[10px] font-medium ${
                              row.complexity === "Low" ? "text-emerald-400" : "text-amber-400"
                            }`}>
                              {row.complexity}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right text-zinc-300 tabular-nums">{row.impressions}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
              </div>
            </div>

            <details className="group border border-zinc-800 rounded-lg transition-colors open:border-teal-500/30">
              <summary className="list-none cursor-pointer flex items-center justify-between gap-3 px-4 py-3">
                <span className="text-[11px] uppercase tracking-[0.15em] font-medium text-zinc-500">Each entry includes</span>
                <span className="text-[10px] px-2 py-0.5 border border-teal-500/30 text-teal-400 rounded group-open:bg-teal-500/10 transition-colors">
                  9 fields
                </span>
              </summary>
              <div className="px-4 pb-3 border-t border-zinc-800 pt-3">
                <ul className="grid gap-1.5 sm:grid-cols-2 text-[12px] text-zinc-500">
                  {[
                    "Content type classification",
                    "Platform fit analysis",
                    "Reference links (working examples)",
                    "Adaptation notes for brand voice",
                    "Complexity rating",
                    "AI stack suggestions",
                    "Success metrics per format",
                    "Efficiency projections",
                    "Priority queue (ranked 1\u201320)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-500/60 mt-0.5">\u2022</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        </Reveal>

        {/* ═══ #2 BRAND POSITIONING ═══ */}
        <Reveal>
          <SectionHead n="02" title="Brand Narrative & Positioning" sub="Brand Kernel" />

          <div className="space-y-6">
            <Prose>
              <p>
                A tight brand identity document that defines who you are, what you believe, and how you communicate. Every piece of content reinforces <strong>your brand</strong> and attracts <strong>your ideal customers</strong>.
              </p>
            </Prose>

            <div className="relative pl-5">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-teal-400 via-teal-500 to-transparent" />
              <div className="absolute left-[-2px] top-0 w-[5px] h-[5px] rounded-full bg-teal-400" />
              <p className="text-[16px] italic text-zinc-300 leading-relaxed">
                &ldquo;Most robotics brands sell specs. We sell time back. Robots should create more room for family, creativity, and life. We make robotics human.&rdquo;
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-zinc-600">Sample narrative</p>
            </div>

            <div className="space-y-px rounded-lg overflow-hidden">
              {[
                { label: "Stand for", value: "Accessible, human-centered robotics for everyday families" },
                { label: "Against", value: "Overly technical, intimidating tech requiring an engineering degree" },
                { label: "Promise", value: "Robots that work for you, not the other way around" },
              ].map((item) => (
                <div key={item.label} className="bg-zinc-900/60 p-4 flex items-start gap-4 border-l-2 border-transparent hover:border-teal-500/50 transition-colors">
                  <span className="text-[10px] uppercase tracking-wider text-teal-400/70 w-16 shrink-0 pt-0.5 font-medium">
                    {item.label}
                  </span>
                  <p className="text-[13px] text-zinc-300">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ═══ #3 PRIORITIZATION ═══ */}
        <Reveal>
          <SectionHead n="03" title="Prioritization System" sub="Focus engine" />

          <div className="space-y-6">
            <Prose>
              <p>
                A focused execution plan. <strong>Prove ONE system works instead of testing ten ideas and proving nothing.</strong>
              </p>
            </Prose>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="relative p-4 rounded-xl border border-teal-500/20 bg-teal-500/[0.03] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none" />
                <span className="relative text-[10px] uppercase tracking-wider text-teal-400 font-medium block mb-2">Hero</span>
                <p className="relative text-white font-semibold">Instagram Reels</p>
                <p className="relative text-zinc-400 text-[12px] mt-1">AI talking head + robotics news \u2014 5x/week</p>
              </div>
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium block mb-2">Support</span>
                <p className="text-white font-semibold">Instagram Carousels</p>
                <p className="text-zinc-400 text-[12px] mt-1">Key takeaway carousels \u2014 3x/week</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ #4 CONTENT PILLARS ═══ */}
        <Reveal>
          <SectionHead n="04" title="Content Pillars" sub="4 repeatable themes" />

          <div className="space-y-6">
            <Prose>
              <p>Pillars are not topics. They are recurring narrative lanes that compound trust, relevance, and conversion over time.</p>
            </Prose>

            <div className="space-y-2">
              {contentPillars.map((pillar, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/20 hover:border-zinc-700 hover:bg-zinc-900/40 transition-all"
                >
                  <span className="text-[24px] font-extralight text-zinc-800 group-hover:text-teal-500/30 transition-colors tabular-nums leading-none shrink-0 w-6 text-right pt-0.5">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[14px] font-semibold text-white">{pillar.name}</span>
                      <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-zinc-800 text-zinc-600">
                        {pillar.role}
                      </span>
                    </div>
                    <p className="text-[13px] text-zinc-500">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ═══ #5 VISUAL DIRECTION ═══ */}
        <Reveal>
          <SectionHead n="05" title="Visual Direction" sub="Reference system" />

          <div className="space-y-6">
            <Prose>
              <p>Editing rhythm, typography behavior, layout logic, and premium consistency cues \u2014 delivered as a Figma reference board.</p>
            </Prose>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03]">
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-medium block mb-2">Do</span>
                <ul className="space-y-1 text-[12px] text-zinc-400">
                  {["Clean typography", "High contrast", "Smooth transitions"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><span className="text-emerald-500/70">+</span> {item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/[0.03]">
                <span className="text-[10px] uppercase tracking-wider text-rose-400 font-medium block mb-2">Don&apos;t</span>
                <ul className="space-y-1 text-[12px] text-zinc-400">
                  {["Overuse of effects", "Cluttered text", "Low-quality footage"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2"><span className="text-rose-500/70">\u2013</span> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ #6 REPURPOSING + METRICS ═══ */}
        <Reveal>
          <SectionHead n="06" title="Repurposing + Metrics" />

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="group p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
              <Layers className="size-4 text-teal-400/60 mb-2 group-hover:text-teal-400 transition-colors" />
              <p className="text-[14px] font-semibold text-white mb-1">Repurposing Blueprint</p>
              <p className="text-[13px] text-zinc-500">1 idea \u2192 7 platform-native assets.</p>
            </div>
            <div className="group p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
              <BarChart3 className="size-4 text-teal-400/60 mb-2 group-hover:text-teal-400 transition-colors" />
              <p className="text-[14px] font-semibold text-white mb-1">Metrics & Decision Rules</p>
              <p className="text-[13px] text-zinc-500">What to scale, improve, or kill each week.</p>
            </div>
          </div>
        </Reveal>

        {/* ═══ #7 ROADMAP ═══ */}
        <Reveal>
          <SectionHead n="07" title="Pilot \u2192 Scale Roadmap" sub="90-day plan" />
          <Prose>
            <p>A 90-day execution roadmap for Win #1 with explicit transition criteria.</p>
          </Prose>
          <div className="mt-6">
            <RoadmapCard title="Discovery to Execution" description="From research to repeatable results" items={roadmapItems} />
          </div>
        </Reveal>

        {/* ═══ WHY DISCOVERY ═══ */}
        <Reveal>
          <GlowLine />
          <div className="pt-10 grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-rose-400 font-semibold">Skip Discovery</span>
              </div>
              <div className="text-[13px] text-zinc-500 space-y-2">
                <p><strong className="text-zinc-300">Month 1\u20133:</strong> Random content, diluted effort \u2192 2K followers</p>
                <p><strong className="text-zinc-300">Month 4\u20136:</strong> No proven format \u2192 burned out</p>
                <p className="font-medium text-rose-400">$5\u201310K spent, 6 months lost</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-teal-400 font-semibold">With Discovery</span>
              </div>
              <div className="text-[13px] text-zinc-500 space-y-2">
                <p><strong className="text-zinc-300">Week 1\u20132:</strong> $2K \u2192 full strategy, ranked library</p>
                <p><strong className="text-zinc-300">Month 1\u20133:</strong> 70% focus \u2192 12K followers</p>
                <p className="font-medium text-teal-400">Win #1 achieved, 200 e-shop clicks</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ═══ SUMMARY ═══ */}
        <Reveal>
          <GlowLine />
          <div className="pt-10 space-y-6">
            <div className="flex flex-wrap gap-4 text-[12px]">
              <div className="px-3 py-1.5 rounded-lg border border-teal-500/20 bg-teal-500/[0.03]">
                <span className="text-zinc-500">Timeline:</span>{" "}
                <span className="text-teal-300 font-medium">5 business days</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50">
                <span className="text-zinc-500">Investment:</span>{" "}
                <span className="text-white font-medium">$2,000</span>
              </div>
            </div>

            <div className="grid gap-1.5 sm:grid-cols-2 text-[13px] text-zinc-500">
              {deliverables.map((item, i) => (
                <div key={i} className="flex items-start gap-2 group hover:text-zinc-300 transition-colors">
                  <span className="text-teal-500/50 mt-0.5 group-hover:text-teal-400 transition-colors">\u2713</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="relative rounded-xl border border-teal-500/20 bg-teal-500/[0.04] px-5 py-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent pointer-events-none" />
              <p className="relative text-lg font-medium text-teal-300">
                Discovery first. Then scale with confidence.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
