"use client";

import { FileText, Target, Palette, Lightbulb, BarChart3, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { DisplayCards } from "@/components/ui/display-cards";
import { BlurTextEffect } from "@/components/ui/blur-text-effect";
import { GlowCard } from "@/components/ui/spotlight-card";
import { RoadmapCard } from "@/components/ui/roadmap-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/animated-table";
import { VisualDesignSystemCard } from "@/app/proposal/friendroid/components/deliverables/VisualDesignSystemCard";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.06 },
  },
};

const contentLibraryColumns = [
  { key: "rank", label: "Rank", width: "w-12" },
  { key: "type", label: "Content Type", width: "w-36" },
  { key: "description", label: "Description", width: "min-w-[280px]" },
  { key: "platform", label: "Platform", width: "w-32" },
  { key: "complexity", label: "Complexity", width: "w-24" },
  { key: "priorityReason", label: "Priority Reason", width: "min-w-[260px]" },
];

const contentLibraryExamples = [
  {
    rank: "1",
    type: "News Breakdown",
    description: '"Robot company X announced Y" with a quick breakdown',
    platform: "Instagram Reels",
    complexity: "Low",
    priorityReason: "Proven in tech niche, 50K avg views, low production effort",
  },
  {
    rank: "2",
    type: "Product Review",
    description: "I tested this robot for 30 days, here's what happened",
    platform: "TikTok",
    complexity: "Medium",
    priorityReason: "High engagement in consumer tech and strong trust signal",
  },
  {
    rank: "3",
    type: "Day in Life",
    description: "How a robot saves me 2 hours daily",
    platform: "Instagram Reels",
    complexity: "Medium",
    priorityReason: "Emotional and practical angle with strong saves",
  },
];

const contentLibraryWhatsInside = [
  "Content type: News breakdowns, carousels, memes, cinematic cuts, trends, tutorials",
  "Platform fit: Where each format performs best",
  "Reference links: Real posts already working in-market",
  "Adaptation notes: How to map each idea to your voice and positioning",
  "Complexity rating: Low / Medium / High effort",
  "AI stack: Suggested tools (Runway, Midjourney, ChatGPT prompts)",
  "Success metrics: What to measure for each content type",
  "Efficiency projection: Expected reach and engagement by niche benchmark",
  "Priority queue: Ranked 1-100 by probability of success",
];

const brandKernelStory =
  "Most robotics brands sell specs. We sell time back. Robots should create more room for family, creativity, and life. We make robotics human.";

const brandKernelPositioning = {
  standFor: "Accessible, human-centered robotics for everyday families",
  against: "Overly technical, intimidating tech that requires an engineering degree",
  promise: "Robots that work for you, not the other way around",
};

const brandKernelICP = {
  who: "Demographics, psychographics, and behavior patterns",
  internalProblem: "I waste hours on chores I hate",
  externalProblem: "I need help managing household tasks",
  transformation: "Reclaim 10 hours/week for family time",
};

const prioritizationSystem = {
  heroPlatform: "Instagram Reels",
  supportivePlatform: "Instagram Carousels",
  heroFormat: "AI talking head explaining robotics news (5x/week)",
  supportFormat: "Carousel with key takeaways (3x/week)",
  moonshot: "High-production cinematic robot short film (1x/month)",
  cadence: "5 Reels + 3 Carousels + 1 Film = 9 pieces/week",
  triggerTikTok: "Add TikTok after Instagram reaches 10K followers, 10K avg views, and one proven repeatable format",
};

const contentPillars = [
  {
    name: "Robotics News Decoded",
    role: "Authority pillar",
    description: "Fast news breakdowns focused on real consumer impact.",
    examples: ["Launch reactions", "Feature implications", "Consumer impact"],
  },
  {
    name: "Time-Back Tutorials",
    role: "Utility pillar",
    description: "Practical guides built to save time, not showcase specs.",
    examples: ["Setup walkthroughs", "Automation workflows", "Daily-use tips"],
  },
  {
    name: "Real-Life Use Cases",
    role: "Trust pillar",
    description: "Proof stories that show robotics in real homes and routines.",
    examples: ["Day-in-life formats", "Before/after routines", "Family productivity wins"],
  },
  {
    name: "Smart Buying Intelligence",
    role: "Conversion pillar",
    description: "Clear comparisons and reviews that drive confident choices.",
    examples: ["Product reviews", "Feature trade-offs", "Best-for scenarios"],
  },
];

const visualDoDont = {
  do: ["Clean typography", "High contrast", "Smooth transitions"],
  dont: ["Overuse of effects", "Cluttered text", "Low-quality stock footage"],
};

const visualContentTypes = [
  { type: "News posts", style: "Fast cuts, on-screen text, energetic music" },
  { type: "Educational", style: "Slower pacing, clear visuals, explanatory voice" },
  { type: "Emotional", style: "Cinematic b-roll, soft music, minimal text" },
];

const roadmapItems = [
  {
    quarter: "Days 1-10",
    title: "Niche Intelligence",
    description: "Research robotics, AI, consumer tech, and smart-home patterns",
    status: "in-progress" as const,
  },
  {
    quarter: "Days 11-20",
    title: "Brand Kernel Build",
    description: "Define narrative, positioning, ICP, and messaging rules",
    status: "upcoming" as const,
  },
  {
    quarter: "Days 21-30",
    title: "System Design",
    description: "Build prioritization, pillars, repurposing, and metrics systems",
    status: "upcoming" as const,
  },
  {
    quarter: "Days 31-90",
    title: "Pilot to Scale",
    description: "Execute Win #1 and transition using explicit expansion triggers",
    status: "upcoming" as const,
  },
];

const deliverableSummary = [
  "Hypotheses Content Library (50-100 ranked ideas)",
  "Brand Narrative & Positioning (Brand Kernel)",
  "Prioritization System (hero platform/format strategy)",
  "Content Pillars (4-6 repeatable themes)",
  "Visual Direction (Figma reference board)",
  "Repurposing Blueprint (1 idea → 7 pieces framework)",
  "Metrics & Decision Rules (what to track + when to pivot)",
  "Pilot → Scale Roadmap (90-day execution plan + transition guides)",
];

export function Phase1CreativeTreatmentContent() {
  return (
    <motion.div
      className="space-y-10"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* HEADER */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.header
        variants={fadeIn}
        className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)] lg:items-start"
      >
        <div className="space-y-3">
          <p className="text-xl font-semibold text-zinc-900 dark:text-white">
            <BlurTextEffect>The Creative Treatment Package</BlurTextEffect>
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed max-w-2xl">
            The engineering blueprint before we build the content engine. Discovery reverse-engineers the answers so you can execute Win #1 with certainty instead of guesswork.
          </p>
          <div className="flex flex-wrap gap-4 text-[13px] pt-1">
            <span className="px-2.5 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-400 rounded-lg font-medium">5 business days</span>
            <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium">$2,000</span>
            <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg">Notion + Figma + Strategy docs</span>
          </div>
        </div>

        <div className="w-full flex justify-center lg:justify-end lg:pt-1">
          <DisplayCards
            scale={0.8}
            cards={[
              {
                icon: <FileText className="size-4 text-teal-500 dark:text-teal-400" />,
                title: "Content Library",
                description: "Ranked hypotheses",
                date: "Deliverable 1",
                iconClassName: "text-teal-600 dark:text-teal-400",
                titleClassName: "text-teal-600 dark:text-teal-400",
                className:
                  "[grid-area:stack] hover:-translate-y-6 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-teal-500/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-zinc-900/50 dark:before:bg-zinc-900/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
              },
              {
                icon: <Target className="size-4 text-teal-500 dark:text-teal-400" />,
                title: "Strategy",
                description: "Pillars + actions",
                date: "Deliverable 2",
                iconClassName: "text-teal-600 dark:text-teal-400",
                titleClassName: "text-teal-600 dark:text-teal-400",
                className:
                  "[grid-area:stack] translate-x-10 translate-y-6 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-teal-500/30 before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-zinc-900/50 dark:before:bg-zinc-900/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
              },
              {
                icon: <Palette className="size-4 text-teal-500 dark:text-teal-400" />,
                title: "Visual Direction",
                description: "Style + rules",
                date: "Deliverable 3",
                iconClassName: "text-teal-600 dark:text-teal-400",
                titleClassName: "text-teal-600 dark:text-teal-400",
                className: "[grid-area:stack] translate-x-20 translate-y-12 hover:translate-y-6",
              },
            ]}
          />
        </div>
      </motion.header>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* DELIVERABLES HEADER */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn}>
        <div className="border-b-2 border-zinc-200 dark:border-zinc-700 pb-2">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
            What The Package Delivers
          </h3>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* DELIVERABLE #1 */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-4">
        <h4 className="flex items-baseline gap-2">
          <span className="text-teal-600 dark:text-teal-400 font-bold text-lg">1</span>
          <span className="text-zinc-900 dark:text-white font-semibold">Hypotheses Content Library</span>
          <span className="text-zinc-500 dark:text-zinc-500 text-sm ml-auto">50-100 ranked ideas</span>
        </h4>

        <p className="text-zinc-600 dark:text-zinc-400 text-[14px] leading-relaxed">
          A ranked library of content directions from robotics and adjacent niches (AI, consumer tech, smart home). This becomes your Win #1 backlog — start at the top, test highest-probability ideas first, track outcomes, iterate. <strong className="text-zinc-700 dark:text-zinc-300">No daily ideation stress.</strong>
        </p>

        <details className="group border-2 border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors open:border-teal-400/60 dark:open:border-teal-600/60">
          <summary className="list-none cursor-pointer flex items-center justify-between gap-3 px-4 py-3">
            <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-zinc-700 dark:text-zinc-300">
              What&apos;s Inside
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 border border-teal-400/60 text-teal-700 dark:text-teal-300 rounded group-open:bg-teal-50 dark:group-open:bg-teal-950/25 transition-colors">
              9 components
            </span>
          </summary>
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
            <ul className="grid gap-1.5 sm:grid-cols-2 text-[13px] text-zinc-600 dark:text-zinc-400">
              {contentLibraryWhatsInside.map((item, i) => (
                <li key={i} className="flex items-start gap-2 group/item hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
                  <span className="text-teal-500 mt-[2px] group-hover/item:scale-125 transition-transform">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </details>

        <div className="-mx-1">
          <Table className="w-full border-collapse text-[12px]">
            <TableHeader>
              <TableRow className="border-b border-zinc-200 dark:border-zinc-700 hover:bg-transparent">
                {contentLibraryColumns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={`h-auto py-2 px-2 text-left text-zinc-500 dark:text-zinc-400 font-medium ${col.width}`}
                  >
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="text-zinc-600 dark:text-zinc-300">
              {contentLibraryExamples.map((row, i) => (
                <TableRow
                  key={i}
                  className={`group transition-colors hover:bg-teal-50/50 dark:hover:bg-teal-900/10 ${i % 2 === 0 ? "bg-zinc-50/50 dark:bg-zinc-900/20" : ""}`}
                >
                  <TableCell className="py-2 px-2 font-medium text-teal-600 dark:text-teal-400">{row.rank}</TableCell>
                  <TableCell className="py-2 px-2 font-medium text-zinc-800 dark:text-zinc-200">{row.type}</TableCell>
                  <TableCell className="py-2 px-2">{row.description}</TableCell>
                  <TableCell className="py-2 px-2 text-[11px]">{row.platform}</TableCell>
                  <TableCell className="py-2 px-2">
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded ${
                        row.complexity === "Low"
                          ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                          : row.complexity === "Medium"
                            ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                            : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
                      }`}
                    >
                      {row.complexity}
                    </span>
                  </TableCell>
                  <TableCell className="py-2 px-2 text-[11px]">{row.priorityReason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* DELIVERABLE #2 */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-4">
        <h4 className="flex items-baseline gap-2">
          <span className="text-teal-600 dark:text-teal-400 font-bold text-lg">2</span>
          <span className="text-zinc-900 dark:text-white font-semibold">Brand Narrative & Positioning</span>
          <span className="text-zinc-500 dark:text-zinc-500 text-sm ml-auto">Brand Kernel</span>
        </h4>

        <p className="text-zinc-600 dark:text-zinc-400 text-[14px] leading-relaxed">
          A tight brand identity document that defines who you are, what you believe, and how you communicate — so every piece of content reinforces YOUR brand and attracts YOUR ideal customers.
        </p>

        <details className="group border-2 border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors open:border-teal-400/60 dark:open:border-teal-600/60">
          <summary className="list-none cursor-pointer flex items-center justify-between gap-3 px-4 py-3">
            <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-zinc-700 dark:text-zinc-300">
              What&apos;s Inside
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 border border-teal-400/60 text-teal-700 dark:text-teal-300 rounded group-open:bg-teal-50 dark:group-open:bg-teal-950/25 transition-colors">
              4 frameworks
            </span>
          </summary>
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
            <div className="border-l-2 border-teal-400 dark:border-teal-400 pl-3 group/item hover:border-teal-500 transition-colors">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1 block">
                1. Brand Narrative (30-sec pitch)
              </span>
              <p className="text-zinc-700 dark:text-zinc-300 text-[13px] italic leading-relaxed">
                &quot;{brandKernelStory}&quot;
              </p>
            </div>

            <div className="border-l-2 border-teal-400 dark:border-teal-400 pl-3 group/item hover:border-teal-500 transition-colors">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1 block">
                2. Positioning Framework
              </span>
              <ul className="mt-1 space-y-1 text-[13px] text-zinc-600 dark:text-zinc-400">
                <li><span className="text-teal-600 dark:text-teal-400 font-medium">Stand for:</span> {brandKernelPositioning.standFor}</li>
                <li><span className="text-teal-600 dark:text-teal-400 font-medium">Against:</span> {brandKernelPositioning.against}</li>
                <li><span className="text-teal-600 dark:text-teal-400 font-medium">Promise:</span> {brandKernelPositioning.promise}</li>
              </ul>
            </div>

            <div className="border-l-2 border-teal-400 dark:border-teal-400 pl-3 group/item hover:border-teal-500 transition-colors">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1 block">
                3. ICP Definition
              </span>
              <ul className="mt-1 space-y-1 text-[13px] text-zinc-600 dark:text-zinc-400">
                <li><span className="text-zinc-500">Internal:</span> &quot;{brandKernelICP.internalProblem}&quot;</li>
                <li><span className="text-zinc-500">External:</span> &quot;{brandKernelICP.externalProblem}&quot;</li>
                <li><span className="text-zinc-500">Transform:</span> &quot;{brandKernelICP.transformation}&quot;</li>
              </ul>
            </div>

            <div className="border-l-2 border-teal-400 dark:border-teal-400 pl-3 group/item hover:border-teal-500 transition-colors">
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1 block">
                4. Messaging Rules
              </span>
              <p className="text-zinc-600 dark:text-zinc-400 text-[13px]">Words to use/avoid, tone guidelines, voice rules</p>
            </div>
          </div>
        </details>

        <div className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <strong className="text-zinc-700 dark:text-zinc-300">Application:</strong> &quot;Top 5 robot vacuum features&quot; → &quot;5 ways robot vacuums give you time back (and 2 features that don&apos;t).&quot;
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* DELIVERABLE #3 */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-4">
        <h4 className="flex items-baseline gap-2">
          <span className="text-teal-600 dark:text-teal-400 font-bold text-lg">3</span>
          <span className="text-zinc-900 dark:text-white font-semibold">Prioritization System</span>
          <span className="text-zinc-500 dark:text-zinc-500 text-sm ml-auto">Focus engine</span>
        </h4>

        <p className="text-zinc-600 dark:text-zinc-400 text-[14px] leading-relaxed">
          A focused execution plan that tells you exactly where to concentrate effort so you don&apos;t dilute results by trying 10 things poorly. <strong className="text-zinc-700 dark:text-zinc-300">You prove ONE system works instead of testing ten ideas and proving nothing.</strong>
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="group rounded-lg border border-teal-200 dark:border-teal-900/40 bg-teal-50/50 dark:bg-teal-900/10 p-3 hover:border-teal-300 dark:hover:border-teal-800 transition-colors">
            <span className="text-[11px] uppercase tracking-wide text-teal-600 dark:text-teal-400 font-medium mb-2 block">Hero System</span>
            <p className="text-zinc-800 dark:text-zinc-200 text-[14px] font-medium">{prioritizationSystem.heroPlatform}</p>
            <p className="text-zinc-600 dark:text-zinc-400 text-[12px] mt-1">{prioritizationSystem.heroFormat}</p>
          </div>
          <div className="group rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 p-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
            <span className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-500 font-medium mb-2 block">Support System</span>
            <p className="text-zinc-800 dark:text-zinc-200 text-[14px] font-medium">{prioritizationSystem.supportivePlatform}</p>
            <p className="text-zinc-600 dark:text-zinc-400 text-[12px] mt-1">{prioritizationSystem.supportFormat}</p>
          </div>
        </div>

        <details className="group border-2 border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors open:border-teal-400/60 dark:open:border-teal-600/60">
          <summary className="list-none cursor-pointer flex items-center justify-between gap-3 px-4 py-3">
            <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-zinc-700 dark:text-zinc-300">
              Decision Triggers
            </span>
            <span className="text-[11px] font-medium px-2 py-0.5 border border-teal-400/60 text-teal-700 dark:text-teal-300 rounded">
              When to expand
            </span>
          </summary>
          <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2 text-[13px] text-zinc-600 dark:text-zinc-400">
            <p><span className="font-medium text-zinc-700 dark:text-zinc-300">Moonshot test:</span> {prioritizationSystem.moonshot}</p>
            <p><span className="font-medium text-zinc-700 dark:text-zinc-300">When to add TikTok:</span> {prioritizationSystem.triggerTikTok}</p>
          </div>
        </details>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* DELIVERABLE #4 */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-5">
        <h4 className="flex items-baseline gap-2">
          <span className="text-teal-600 dark:text-teal-400 font-bold text-lg">4</span>
          <span className="text-zinc-900 dark:text-white font-semibold">Content Pillars</span>
          <span className="text-zinc-500 dark:text-zinc-500 text-sm ml-auto">4-6 themes</span>
        </h4>

        <p className="text-zinc-600 dark:text-zinc-400 text-[14px] leading-relaxed">
          Pillars are not topics. They are recurring narrative lanes that compound trust, relevance, and conversion over time.
        </p>

        <div className="grid gap-4 lg:grid-cols-2">
          {contentPillars.map((pillar, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/60 p-4 transition-all hover:-translate-y-0.5 hover:border-teal-300 dark:hover:border-teal-700"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_0%_0%,rgba(20,184,166,0.12),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-2 flex items-center gap-2">
                  <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-teal-200 dark:border-teal-900 bg-teal-50 dark:bg-teal-900/20 px-1.5 text-[10px] font-semibold text-teal-700 dark:text-teal-300">
                    0{i + 1}
                  </span>
                  <Lightbulb className="size-3.5 text-teal-500 dark:text-teal-400 group-hover:scale-110 transition-transform" />
                  <span className="text-zinc-900 dark:text-zinc-100 font-semibold text-[13px]">{pillar.name}</span>
                </div>
                <div className="mb-2">
                  <span className="inline-flex rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
                    {pillar.role}
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-[12px] leading-relaxed">{pillar.description}</p>
                <div className="mt-3 space-y-1.5">
                  {pillar.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-[11px] text-zinc-600 dark:text-zinc-300 transition-colors group-hover:text-zinc-800 dark:group-hover:text-zinc-100"
                    >
                      <span className="mt-[2px] text-teal-500">•</span>
                      <span>{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/30 px-3 py-2 text-[12px] text-zinc-600 dark:text-zinc-400">
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Execution rhythm:</span> Monday News, Tuesday Tutorial, Wednesday Use Case, Thursday Buying, Friday best-performing pillar remix.
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* DELIVERABLE #5 */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-4">
        <h4 className="flex items-baseline gap-2">
          <span className="text-teal-600 dark:text-teal-400 font-bold text-lg">5</span>
          <span className="text-zinc-900 dark:text-white font-semibold">Visual Direction</span>
          <span className="text-zinc-500 dark:text-zinc-500 text-sm ml-auto">Reference system</span>
        </h4>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(440px,720px)] xl:items-start">
          <div className="space-y-4">
            <p className="text-zinc-600 dark:text-zinc-400 text-[14px] leading-relaxed">
              This component turns abstract art direction into something the team can feel immediately: editing rhythm, typography behavior, layout logic, and premium consistency cues.
            </p>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="group rounded-lg border border-green-200 dark:border-green-900/40 bg-green-50/30 dark:bg-green-900/10 p-3 hover:border-green-300 dark:hover:border-green-800 transition-colors">
                <span className="text-[11px] uppercase tracking-wide text-green-600 dark:text-green-400 font-medium mb-1 block">Do</span>
                <ul className="space-y-0.5 text-[12px] text-zinc-600 dark:text-zinc-400">
                  {visualDoDont.do.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-green-500">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="group rounded-lg border border-red-200 dark:border-red-900/40 bg-red-50/30 dark:bg-red-900/10 p-3 hover:border-red-300 dark:hover:border-red-800 transition-colors">
                <span className="text-[11px] uppercase tracking-wide text-red-600 dark:text-red-400 font-medium mb-1 block">Don&apos;t</span>
                <ul className="space-y-0.5 text-[12px] text-zinc-600 dark:text-zinc-400">
                  {visualDoDont.dont.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="text-red-500">✕</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="group rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <span className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-500 font-medium mb-1 block">Content Styles</span>
              <ul className="space-y-0.5 text-[12px] text-zinc-600 dark:text-zinc-400">
                {visualContentTypes.map((ct, i) => (
                  <li key={i}><span className="text-zinc-700 dark:text-zinc-300">{ct.type}:</span> <span className="text-zinc-500">{ct.style.split(",")[0]}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full xl:justify-self-end rounded-2xl border border-zinc-200/70 dark:border-zinc-800 overflow-hidden bg-zinc-950 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.45)]">
            <VisualDesignSystemCard isActive={true} />
          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* DELIVERABLE #6-7 - COMBINED */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-4">
        <h4 className="flex items-baseline gap-2">
          <span className="text-teal-600 dark:text-teal-400 font-bold text-lg">6-7</span>
          <span className="text-zinc-900 dark:text-white font-semibold">Repurposing + Metrics</span>
        </h4>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="group rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:border-teal-300 dark:hover:border-teal-800 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="size-4 text-teal-500 dark:text-teal-400 group-hover:scale-110 transition-transform" />
              <span className="text-zinc-800 dark:text-zinc-200 font-semibold text-[14px]">Repurposing Blueprint</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-[13px]">1 idea → 7 platform-native assets using predefined adaptation rules.</p>
          </div>
          <div className="group rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 hover:border-teal-300 dark:hover:border-teal-800 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="size-4 text-teal-500 dark:text-teal-400 group-hover:scale-110 transition-transform" />
              <span className="text-zinc-800 dark:text-zinc-200 font-semibold text-[14px]">Metrics & Decision Rules</span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-[13px]">Clear scorecard: what to scale, improve, or kill each week.</p>
          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* DELIVERABLE #8 - ROADMAP */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-4">
        <h4 className="flex items-baseline gap-2">
          <span className="text-teal-600 dark:text-teal-400 font-bold text-lg">8</span>
          <span className="text-zinc-900 dark:text-white font-semibold">Pilot → Scale Roadmap</span>
          <span className="text-zinc-500 dark:text-zinc-500 text-sm ml-auto">90-day plan</span>
        </h4>

        <p className="text-zinc-600 dark:text-zinc-400 text-[14px] leading-relaxed">
          A 90-day execution roadmap for Win #1 with explicit transition criteria for Wins #2, #3, and #4.
        </p>

        <RoadmapCard
          title="Discovery to Execution"
          description="From research to repeatable results"
          items={roadmapItems}
        />
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* FAILURE LOGIC - CONCISE */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-4">
        <div className="border-b-2 border-zinc-200 dark:border-zinc-700 pb-2">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
            The Failure Logic
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Without Discovery */}
          <div className="space-y-3">
            <div className="border-l-2 border-red-400 dark:border-red-500 pl-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 block">Skip Discovery</span>
            </div>
            <div className="text-[13px] text-zinc-600 dark:text-zinc-400 space-y-2">
              <p><strong className="text-zinc-700 dark:text-zinc-300">Month 1-3:</strong> Random content, 5 formats on 3 platforms, no brand voice → 2K followers, 2% engagement</p>
              <p><strong className="text-zinc-700 dark:text-zinc-300">Month 4-6:</strong> Hire freelancer ($3K), still no proven format, try TikTok without Instagram proof → burned out</p>
              <p><strong className="text-red-600 dark:text-red-400">Result:</strong> 3K random followers, $5-10K spent, 6 months lost, conclude &quot;it doesn&apos;t work&quot;</p>
            </div>
          </div>

          {/* With Discovery */}
          <div className="space-y-3">
            <div className="border-l-2 border-teal-400 dark:border-teal-500 pl-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 block">Start with Discovery</span>
            </div>
            <div className="text-[13px] text-zinc-600 dark:text-zinc-400 space-y-2">
              <p><strong className="text-zinc-700 dark:text-zinc-300">Week 1-2:</strong> $2K investment → full strategy, ranked library, visual direction</p>
              <p><strong className="text-zinc-700 dark:text-zinc-300">Month 1-3:</strong> Execute #1 hypothesis, 70% focus on working format → 12K followers, 15% engagement</p>
              <p><strong className="text-teal-600 dark:text-teal-400">Result:</strong> Win #1 achieved, 200 e-shop clicks, ready for Win #2</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* PACKAGE SUMMARY */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-4">
        <div className="border-b-2 border-zinc-200 dark:border-zinc-700 pb-2">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
            Package Summary
          </h3>
        </div>

        <div className="flex flex-wrap gap-4 text-[13px]">
          <div className="px-3 py-1.5 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
            <span className="text-zinc-500">Timeline:</span> <span className="text-teal-700 dark:text-teal-300 font-medium">5 business days</span>
          </div>
          <div className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <span className="text-zinc-500">Investment:</span> <span className="text-zinc-800 dark:text-zinc-200 font-medium">$2,000</span>
          </div>
          <div className="px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <span className="text-zinc-500">Format:</span> <span className="text-zinc-800 dark:text-zinc-200 font-medium">Notion + Figma + Strategy docs</span>
          </div>
        </div>

        <div className="grid gap-1.5 sm:grid-cols-2 text-[13px] text-zinc-600 dark:text-zinc-400">
          {deliverableSummary.map((item, i) => (
            <div key={i} className="flex items-start gap-2 group hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
              <span className="text-teal-500 mt-[2px] group-hover:scale-125 transition-transform">✓</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <GlowCard
          customSize
          glowColor="cyan"
          className="w-full rounded-lg border-0 px-4 py-3 !bg-[rgba(20,184,166,0.08)] dark:!bg-[rgba(20,184,166,0.12)]"
        >
          <p className="text-lg font-medium text-teal-700 dark:text-teal-300">
            Discovery first. Then scale with confidence.
          </p>
        </GlowCard>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* END NOTE - WHY DISCOVERY FIRST */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-6">
        <div className="border-l-2 border-red-400 dark:border-red-500 pl-3 py-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-1 block">
            WITHOUT DISCOVERY
          </span>
          <p className="text-zinc-800 dark:text-zinc-200 text-[15px] font-medium leading-relaxed">
            You try 5 platforms at once → diluted effort → none gain traction → abandon after 6 months when results don&apos;t materialize.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-[13px]">
          <div className="group px-3 py-2 border border-red-200 dark:border-red-900/40 rounded-lg bg-red-50/50 dark:bg-red-950/20 hover:border-red-300 dark:hover:border-red-800 transition-colors cursor-default">
            <span className="text-red-600 dark:text-red-400 font-bold">$10K-20K</span>
            <span className="text-zinc-600 dark:text-zinc-400 ml-1">wasted</span>
          </div>
          <div className="group px-3 py-2 border border-red-200 dark:border-red-900/40 rounded-lg bg-red-50/50 dark:bg-red-950/20 hover:border-red-300 dark:hover:border-red-800 transition-colors cursor-default">
            <span className="text-red-600 dark:text-red-400 font-bold">6 months</span>
            <span className="text-zinc-600 dark:text-zinc-400 ml-1">lost</span>
          </div>
          <div className="group px-3 py-2 border border-red-200 dark:border-red-900/40 rounded-lg bg-red-50/50 dark:bg-red-950/20 hover:border-red-300 dark:hover:border-red-800 transition-colors cursor-default">
            <span className="text-zinc-600 dark:text-zinc-400">Opportunity cost:</span>
            <span className="text-red-600 dark:text-red-400 font-medium ml-1">not at Win #2 by now</span>
          </div>
        </div>

        <div className="border-b-2 border-zinc-200 dark:border-zinc-700 pb-2">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
            Discovery → Win #1 Connection
          </h3>
        </div>

        <p className="text-zinc-600 dark:text-zinc-400 text-[14px]">
          Each deliverable directly enables Win #1. Without it, you&apos;re guessing.
        </p>

        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-[12px] border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <th className="py-2.5 px-2 text-left text-zinc-700 dark:text-zinc-300 font-semibold w-1/4">Deliverable</th>
                <th className="py-2.5 px-2 text-left text-teal-600 dark:text-teal-400 font-semibold w-1/3">Enables Win #1</th>
                <th className="py-2.5 px-2 text-left text-red-600 dark:text-red-400 font-semibold w-1/3">Without It</th>
              </tr>
            </thead>
            <tbody className="text-zinc-600 dark:text-zinc-400">
              {[
                { del: "Content Library", enables: "50-100 ranked ideas → test high-probability formats first", without: "Waste 3 months testing random ideas" },
                { del: "Brand Positioning", enables: "Defines WHO you're for → attracts ICPs from Day 1", without: "Wrong audience → can't monetize later" },
                { del: "Prioritization System", enables: "Exactly which platform + format → concentrated effort", without: "Try 10 formats on 5 platforms → none get traction" },
                { del: "Visual Direction", enables: "Quality from first post → signals premium brand", without: "Looks amateur → damages brand perception" },
                { del: "Content Pillars", enables: "4-6 themes to rotate → never run out of ideas", without: "Ideate from scratch daily → burnout" },
                { del: "Repurposing Blueprint", enables: "1 idea → 5-7 pieces → efficiency from Day 1", without: "Create each piece from scratch → burnout Week 3" },
                { del: "Metrics & Rules", enables: "Know exactly what 'success' means", without: "Keep testing forever → never move to Win #2" },
              ].map((row, i) => (
                <tr key={i} className={`group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50 ${i % 2 === 0 ? "bg-zinc-50/50 dark:bg-zinc-900/20" : ""}`}>
                  <td className="py-2 px-2 font-medium text-zinc-800 dark:text-zinc-200">{row.del}</td>
                  <td className="py-2 px-2 text-teal-700 dark:text-teal-400">{row.enables}</td>
                  <td className="py-2 px-2 text-red-600/80 dark:text-red-400/80">{row.without}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>
    </motion.div>
  );
}
