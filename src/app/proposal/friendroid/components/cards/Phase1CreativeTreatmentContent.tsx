"use client";

import { FileText, Target, Palette, Lightbulb, Route } from "lucide-react";
import { motion } from "framer-motion";
import { DisplayCards } from "@/components/ui/display-cards";
import { BlurTextEffect } from "@/components/ui/blur-text-effect";
import { RoadmapCard } from "@/components/ui/roadmap-card";
import { PatternCard } from "@/components/ui/pattern-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/animated-table";

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
  "Content type: News, carousels, memes, cinematic stories, trends, tutorials, etc",
  "Platform: Where each type performs",
  "Reference links: References to the content types",
  "Adaptation notes: how to repurpose into our (robotics) niche",
  "Complexity: How resource consuming production wise each type is",
  "Tools to use: if adapt, what tools to use (generative AI)",
  "Efficiency projection: Expected reach and engagement, based on the references",
  "Priority: Ranked 1-100 by probability of success weighted by efforts and alignment with the current phase (Seed, Content Market Fit, Growth",
];

const brandKernelStory =
  "i.e  Everyone in the niche talks about how cool robot's features are. None talks about what really matters behind all the features - the time you buy back to spend creatively.";

const brandKernelPositioning = {
  standFor: "Robots will be second dogs to families",
  against:
    "robots are about tech and features",
  promise: "you will never feel lost in the niche of robotics with us",
};

const brandKernelICP = {
  internalProblem: "I feel lost in the robotics niche",
  externalProblem: "The choices are overwhelming",
  transformation: "Get clarity, status and affiliation by staying in the loop of the frontier of robotics",
};

const prioritizationSystem = {
  heroPlatform: "Instagram Reels",
  supportivePlatform: "linkedin",
  heroFormat: "Ai generated talking head explaining robotics news",
  supportFormat: "Branded Carousel",
  moonshot: "High-production AI driven cinematic short film)",
  cadence: "5 [Hero] + 3 [Support]",
  triggerTikTok:
    "Add [XYZ platform] after [HERO] reaches [Y] followers, [Z] avg views, and one proven repeatable format",
};

const contentPillars = [
  {
    name: "Robotics News ",
    role: "Education",
    description: "Fast news breakdowns focused on real consumer impact.",
    examples: ["News in robotics", "Feature implications",],
  },
  {
    name: "Tutorials on how to be more productive",
    role: "Education",
    description: "Practical guides on ai tools.",
    examples: ["how to do [X]", "use this prompt to"],
  },
  {
    name: "Memes",
    role: "entertainment",
    description: "Videos that catch attention",
    examples: ["CCTV footage of robot at home"],
  },
  {
    name: "Robot reviews",
    role: "Product",
    description: "Clear comparisons and reviews that drive confident choices.",
    examples: ["[T100] vs [T1000]"],
  },
];

const visualDoDont = {
  do: ["Clean typography", "Premium editing layout for reels/ carousels" ],
  dont: ["Overuse of effects", "Slop cheap style"],
};

const visualContentTypes = [
  { type: "News posts", style: "Fast cuts, on-screen text, energetic music" },
  { type: "Educational", style: "Slower pacing, clear visuals, explanatory voice" },
  { type: "Emotional", style: "Cinematic b-roll, soft music, minimal text" },
];

const roadmapItems = [
  {
    quarter: "Days 1-10",
    title: "Creative Treatment",
    description: "",
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
    description: "Build prioritization and pillars systems",
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
  "Hypotheses Content Library (10-20 ranked content strategies)",
  "Brand Narrative & Positioning",
  "Prioritization System (what to focus on)",
  "Content Pillars (10-12 themes to pick 4-6 from)",
  "Visual Content Direction (Figma reference board)",
  "Pilot to Scale Roadmap (step by step content strategy)",
];

const headerDeliverables = [
  "Hypotheses Content Library",
  "Brand Narrative & Positioning",
  "Prioritization System",
  "Content Pillars",
  "Visual Direction",
  "Pilot → Scale Roadmap",
];

export function Phase1CreativeTreatmentContent() {
  return (
    <div data-magnetic="false">
      <motion.div
        className="space-y-12"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <motion.header
          variants={fadeIn}
          className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(320px,500px)] lg:items-start"
        >
          <div className="space-y-4">
            <p className="text-lg font-semibold text-zinc-900 dark:text-white sm:text-xl">
              <BlurTextEffect>Discovery and execution plan</BlurTextEffect>
            </p>
            <p className="max-w-2xl text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px]">
              A strategy document that tells you what to create, how to position it,
              and what to prioritize first - you have perfect clarity on what <strong>exactly</strong> to do
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-[13px]">
              <span className="rounded-lg bg-teal-50 px-2.5 py-1 font-medium text-teal-700 dark:bg-teal-900/20 dark:text-teal-400">
                10 days
              </span>
              <span className="rounded-lg bg-zinc-100 px-2.5 py-1 font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                $2,000
              </span>
              <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                Notion DB + Figma + Strategy docs
              </span>
            </div>

          </div>

          <div className="flex w-full justify-center overflow-visible lg:-mt-4 lg:justify-center">
            <DisplayCards
              scale={0.74}
              className="h-[10rem] w-[18rem] sm:h-[11.25rem] sm:w-[21.5rem] lg:h-[12.75rem] lg:w-[27.5rem]"
              cards={[
                {
                  icon: <FileText className="size-4 text-teal-500 dark:text-teal-400" />,
                  title: "Content Library",
                  description: "Ranked hypotheses",
                  date: "Deliverable 1",
                  iconClassName: "text-teal-600 dark:text-teal-400",
                  titleClassName: "text-teal-600 dark:text-teal-400",
                  className:
                    "[grid-area:stack] hover:-translate-y-4 before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:rounded-xl before:bg-zinc-900/50 before:bg-blend-overlay before:opacity-100 before:outline-1 before:outline-teal-500/30 before:transition-opacity before:duration-700 before:content-[''] hover:before:opacity-0 grayscale-[100%] hover:grayscale-0 dark:before:bg-zinc-900/50",
                },
                {
                  icon: <Target className="size-4 text-teal-500 dark:text-teal-400" />,
                  title: "Brand narrative",
                  description: "Positioning rules",
                  date: "Deliverable 2",
                  iconClassName: "text-teal-600 dark:text-teal-400",
                  titleClassName: "text-teal-600 dark:text-teal-400",
                  className:
                    "[grid-area:stack] translate-x-[1.6rem] translate-y-[1rem] hover:-translate-y-1 before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:rounded-xl before:bg-zinc-900/50 before:bg-blend-overlay before:opacity-100 before:outline-1 before:outline-teal-500/30 before:transition-opacity before:duration-700 before:content-[''] hover:before:opacity-0 grayscale-[100%] hover:grayscale-0 dark:before:bg-zinc-900/50",
                },
                {
                  icon: <Palette className="size-4 text-teal-500 dark:text-teal-400" />,
                  title: "Visual Direction",
                  description: "Style + rules",
                  date: "Deliverable 3",
                  iconClassName: "text-teal-600 dark:text-teal-400",
                  titleClassName: "text-teal-600 dark:text-teal-400",
                  className:
                    "[grid-area:stack] translate-x-[3.2rem] translate-y-[2rem] hover:translate-y-[0.75rem] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:rounded-xl before:bg-zinc-900/50 before:bg-blend-overlay before:opacity-100 before:outline-1 before:outline-teal-500/30 before:transition-opacity before:duration-700 before:content-[''] hover:before:opacity-0 grayscale-[100%] hover:grayscale-0 dark:before:bg-zinc-900/50",
                },
                {
                  icon: <Lightbulb className="size-4 text-teal-500 dark:text-teal-400" />,
                  title: "Content Pillars",
                  description: "4-6 themes",
                  date: "Deliverable 4",
                  iconClassName: "text-teal-600 dark:text-teal-400",
                  titleClassName: "text-teal-600 dark:text-teal-400",
                  className:
                    "[grid-area:stack] translate-x-[4.8rem] translate-y-[3rem] hover:translate-y-[2rem] before:absolute before:top-0 before:left-0 before:h-[100%] before:w-[100%] before:rounded-xl before:bg-zinc-900/50 before:bg-blend-overlay before:opacity-100 before:outline-1 before:outline-teal-500/30 before:transition-opacity before:duration-700 before:content-[''] hover:before:opacity-0 grayscale-[100%] hover:grayscale-0 dark:before:bg-zinc-900/50",
                },
                {
                  icon: <Route className="size-4 text-teal-500 dark:text-teal-400" />,
                  title: "Step by step plan",
                  description: "90-day plan",
                  date: "Deliverable 5",
                  iconClassName: "text-teal-600 dark:text-teal-400",
                  titleClassName: "text-teal-600 dark:text-teal-400",
                  className:
                    "[grid-area:stack] translate-x-[6.4rem] translate-y-[4rem] hover:translate-y-[3rem]",
                },
              ]}
            />
          </div>
        </motion.header>

        <motion.section variants={fadeIn} className="space-y-4">
          <div className="border-b border-zinc-200 pb-2 dark:border-zinc-800">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
              What The Package Delivers
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-2 text-[14px] text-zinc-600 dark:text-zinc-400 sm:grid-cols-2 lg:grid-cols-3">
            {headerDeliverables.map((item, i) => (
              <div key={i} className="flex items-start gap-2 leading-snug">
                <span className="mt-[2px] text-teal-500">•</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section id="content-library" variants={fadeIn} className="space-y-5">
          <h4 className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-teal-600 dark:text-teal-400">1</span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              Hypotheses Content Library
            </span>
            <span className="ml-auto text-sm text-zinc-500 dark:text-zinc-500">
              10-20 ranked content ideas
            </span>
          </h4>

          <p className="max-w-3xl text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            A ranked library of content directions from robotics and adjacent niches
            (AI, business, lifestyle etc ). This becomes your content backlog - start
            at the top, test highest-probability ideas first, track outcomes,
            iterate, dont spend time on deciding what form of content to make {" "}
            <strong className="text-zinc-700 dark:text-zinc-300">
              Have clarity beforehand about what content you are gonna produce.
            </strong>
          </p>

          <PatternCard variant="plus" className="rounded-xl border-zinc-300/80 dark:border-zinc-700">
            <div className="p-5">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:text-zinc-400">
                What&apos;s Inside
              </p>
              <ul className="grid gap-1.5 text-[13px] text-zinc-600 dark:text-zinc-400 sm:grid-cols-2">
                {contentLibraryWhatsInside.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-[2px] text-teal-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </PatternCard>

          <div className="-mx-1">
            <Table className="w-full border-collapse text-[12px]">
              <TableHeader>
                <TableRow className="border-b border-zinc-200 hover:bg-transparent dark:border-zinc-700">
                  {contentLibraryColumns.map((col) => (
                    <TableHead
                      key={col.key}
                      className={`h-auto py-2 px-2 text-left font-medium text-zinc-500 dark:text-zinc-400 ${col.width}`}
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
                    className={`group transition-colors hover:bg-teal-50/50 dark:hover:bg-teal-900/10 ${
                      i % 2 === 0 ? "bg-zinc-50/50 dark:bg-zinc-900/20" : ""
                    }`}
                  >
                    <TableCell className="px-2 py-2 font-medium text-teal-600 dark:text-teal-400">
                      {row.rank}
                    </TableCell>
                    <TableCell className="px-2 py-2 font-medium text-zinc-800 dark:text-zinc-200">
                      {row.type}
                    </TableCell>
                    <TableCell className="px-2 py-2">{row.description}</TableCell>
                    <TableCell className="px-2 py-2 text-[11px]">{row.platform}</TableCell>
                    <TableCell className="px-2 py-2">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[11px] ${
                          row.complexity === "Low"
                            ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            : row.complexity === "Medium"
                              ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                              : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                        }`}
                      >
                        {row.complexity}
                      </span>
                    </TableCell>
                    <TableCell className="px-2 py-2 text-[11px]">{row.priorityReason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.section>

        <motion.section variants={fadeIn} className="space-y-5">
          <h4 className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-teal-600 dark:text-teal-400">2</span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              Brand Narrative & Positioning
            </span>
            <span className="ml-auto text-sm text-zinc-500 dark:text-zinc-500">
              Brand kernel
            </span>
          </h4>

          <p className="max-w-3xl text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            A tight brand identity document that defines who you are, what you
            believe, and how you communicate - so every piece of content reinforces
            the brand and attracts the ideal avatars.
          </p>

          <PatternCard variant="plus" className="rounded-xl border-zinc-300/80 dark:border-zinc-700">
            <div className="space-y-5 p-5">
              <div className="border-l-2 border-teal-400 pl-3 dark:border-teal-400">
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  1. Brand Narrative (30-sec pitch)
                </span>
                <p className="text-[13px] italic leading-relaxed text-zinc-700 dark:text-zinc-300">
                  &quot;{brandKernelStory}&quot;
                </p>
              </div>

              <div className="border-l-2 border-teal-400 pl-3 dark:border-teal-400">
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  2. Positioning Framework (example)
                </span>
                <ul className="space-y-1 text-[13px] text-zinc-600 dark:text-zinc-400">
                  <li>
                    <span className="font-medium text-teal-600 dark:text-teal-400">
                      Stand for:
                    </span>{" "}
                    {brandKernelPositioning.standFor}
                  </li>
                  <li>
                    <span className="font-medium text-teal-600 dark:text-teal-400">
                      Against:
                    </span>{" "}
                    {brandKernelPositioning.against}
                  </li>
                  <li>
                    <span className="font-medium text-teal-600 dark:text-teal-400">
                      Promise:
                    </span>{" "}
                    {brandKernelPositioning.promise}
                  </li>
                </ul>
              </div>

              <p className="text-[12px] italic text-zinc-500 dark:text-zinc-500">
                *We&apos;ll explore multiple positioning directions together and lock in the one
                that truly resonates with your brand story.
              </p>

              <div className="border-l-2 border-teal-400 pl-3 dark:border-teal-400">
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  3. ICP Definition
                </span>
                <ul className="space-y-1 text-[13px] text-zinc-600 dark:text-zinc-400">
                  <li>
                    <span className="text-zinc-500">Internal:</span> &quot;
                    {brandKernelICP.internalProblem}&quot;
                  </li>
                  <li>
                    <span className="text-zinc-500">External:</span> &quot;
                    {brandKernelICP.externalProblem}&quot;
                  </li>
                  <li>
                    <span className="text-zinc-500">Transform:</span> &quot;
                    {brandKernelICP.transformation}&quot;
                  </li>
                </ul>
              </div>

              <div className="border-l-2 border-teal-400 pl-3 dark:border-teal-400">
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  4. Messaging Rules
                </span>
                <p className="text-[13px] text-zinc-600 dark:text-zinc-400">
                  Words to use/avoid, tone guidelines
                </p>
              </div>
            </div>
          </PatternCard>

          <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            <strong className="text-zinc-700 dark:text-zinc-300">Application:</strong>{" "}
            &quot;Top 5 robot vacuum features&quot; → &quot;5 ways robot vacuums give you
            time back (and 2 features that don&apos;t).&quot;
          </p>
        </motion.section>

        <motion.section variants={fadeIn} className="space-y-5">
          <h4 className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-teal-600 dark:text-teal-400">3</span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              Prioritization System
            </span>
            <span className="ml-auto text-sm text-zinc-500 dark:text-zinc-500">
              Focus area
            </span>
          </h4>

          <p className="max-w-3xl text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            A focused execution plan that tells you exactly where to <strong className="text-zinc-700 dark:text-zinc-300">concentrate effort</strong> so we don&apos;t dilute attention by {" "}
            trying everything at once.
          </p>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-2 border-l border-teal-300 pl-4 dark:border-teal-700">
              <p className="text-[11px] uppercase tracking-wide text-teal-600 dark:text-teal-400">
                Hero platform and content type [example]
              </p>
              <p className="text-[15px] font-medium text-zinc-800 dark:text-zinc-200">
                {prioritizationSystem.heroPlatform}
              </p>
              <p className="text-[13px] text-zinc-600 dark:text-zinc-400">
                {prioritizationSystem.heroFormat}
              </p>
            </div>

            <div className="space-y-2 border-l border-zinc-300 pl-4 dark:border-zinc-700">
              <p className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
                Support System
              </p>
              <p className="text-[15px] font-medium text-zinc-800 dark:text-zinc-200">
                {prioritizationSystem.supportivePlatform}
              </p>
              <p className="text-[13px] text-zinc-600 dark:text-zinc-400">
                {prioritizationSystem.supportFormat}
              </p>
            </div>
          </div>

          <PatternCard variant="plus" className="rounded-xl border-zinc-300/80 dark:border-zinc-700">
            <div className="space-y-2 p-5 text-[13px] text-zinc-600 dark:text-zinc-400">
              <p>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  Moonshot test (high value high cost):
                </span>{" "}
                {prioritizationSystem.moonshot}
              </p>
              <p>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  Cadence:
                </span>{" "}
                {prioritizationSystem.cadence}
              </p>
              <p>
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  When to add [Another platform]:
                </span>{" "}
                {prioritizationSystem.triggerTikTok}
              </p>
            </div>
          </PatternCard>
        </motion.section>

        <motion.section variants={fadeIn} className="space-y-5">
          <h4 className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-teal-600 dark:text-teal-400">4</span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              Content Pillars
            </span>
            <span className="ml-auto text-sm text-zinc-500 dark:text-zinc-500">4-6 themes</span>
          </h4>

          <p className="max-w-3xl text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            Recurring narrative formats that we stick to, based on the brand narrative, the stage we are currently in (content pillar on stage Seed is different from stage Content Market Fit) that works in adjacent niches, and how to repurpose them in robotics niche.
          </p>

          <div className="space-y-4">
            {contentPillars.map((pillar, i) => (
              <article key={i} className="border-b border-zinc-200 pb-4 dark:border-zinc-800">
                <div className="mb-1 flex flex-wrap items-center gap-2 text-[13px]">
                  <span className="font-semibold text-teal-600 dark:text-teal-400">
                    0{i + 1}
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {pillar.name}
                  </span>
                  <span className="rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                    {pillar.role}
                  </span>
                </div>

                <p className="text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {pillar.description}
                </p>

                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-zinc-600 dark:text-zinc-300">
                  {pillar.examples.map((example, idx) => (
                    <span key={idx} className="inline-flex items-center gap-1.5">
                      <span className="text-teal-500">•</span>
                      <span>{example}</span>
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section variants={fadeIn} className="space-y-5">
          <h4 className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-teal-600 dark:text-teal-400">5</span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              Visual Direction
            </span>
            <span className="ml-auto text-sm text-zinc-500 dark:text-zinc-500">
              Reference system
            </span>
          </h4>

          <PatternCard variant="plus" className="rounded-xl border-zinc-300/80 dark:border-zinc-700">
            <div className="space-y-4 p-6">
              <p className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                A canvas of the reference editing styles, colors, brand assets, layouts for different content pillar and type, examples of other 
                creators in the niche, in adjacent niches that we can take inspiration from
                carousels examples.
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-wide text-green-600 dark:text-green-400">
                    Do
                  </p>
                  <ul className="space-y-1 text-[13px] text-zinc-600 dark:text-zinc-400">
                    {visualDoDont.do.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-green-500">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-wide text-red-600 dark:text-red-400">
                    Don&apos;t
                  </p>
                  <ul className="space-y-1 text-[13px] text-zinc-600 dark:text-zinc-400">
                    {visualDoDont.dont.map((item, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-red-500">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </PatternCard>
        </motion.section>

        <motion.section variants={fadeIn} className="space-y-4">
          <h4 className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-teal-600 dark:text-teal-400">6</span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              Execution roadmap
            </span>
            <span className="ml-auto text-sm text-zinc-500 dark:text-zinc-500">
              90-day plan
            </span>
          </h4>

          <p className="text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            A precise step by step plan of actions on what to do at each step, based on the collected content library,
            locked in brand narrative. A strategic document that explains how to leverage this ressearch and strategy
            in the upcoming phases.
          </p>

          <div className="space-y-6">
            {/* Stage: Seed */}
            <div className="rounded-xl border border-teal-200 bg-teal-50/30 p-5 dark:border-teal-800 dark:bg-teal-900/10">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500 text-sm font-bold text-white dark:bg-teal-600">
                  1
                </span>
                <div>
                  <h5 className="font-semibold text-zinc-900 dark:text-white">Stage: Seed</h5>
                  <p className="text-[12px] text-zinc-500 dark:text-zinc-400">Prioritize engagement and views</p>
                </div>
                <span className="ml-auto text-[11px] font-mono text-teal-600 dark:text-teal-400">Days 1-30</span>
              </div>

              <div className="space-y-3 text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                <div className="flex gap-3">
                  <span className="mt-0.5 text-teal-500">a)</span>
                  <p>
                    Take content format <span className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">[X]</span> from the{" "}
                    <a href="#content-library" className="text-teal-600 underline decoration-teal-400/50 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300">
                      Content Library
                    </a>{" "}
                    based on max rank prioritization for Seed stage.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5 text-teal-500">b)</span>
                  <p>
                    Post it on <span className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">[Hero Platform]</span> in{" "}
                    <span className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">[N]</span> quantity. Post content type{" "}
                    <span className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">[C]</span> on{" "}
                    <span className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">[Support Platform]</span>.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5 text-teal-500">c)</span>
                  <p>
                    Use the proposed{" "}
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">Visual Design System</span> to maintain premium feeling from the beginning.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5 text-teal-500">d)</span>
                  <p>
                    Monitor metrics: <span className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">[Target Metric]</span> at{" "}
                    <span className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">[Threshold]</span>.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5 text-teal-500">e)</span>
                  <p>
                    Metrics below target? → Switch content type to{" "}
                    <span className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">[NEXT]</span> from Content Library. Keep Hero and Support platforms.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5 text-teal-500">f)</span>
                  <p>
                    Metrics reached? → Shift distribution to{" "}
                    <span className="font-medium text-teal-600 dark:text-teal-400">70%</span> <span className="rounded bg-zal-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">[NEW FORMAT]</span>{" "}
                    (from Content Library), <span className="font-medium text-zinc-600 dark:text-zinc-400">20%</span>{" "}
                    <span className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">[OLD FORMAT]</span> for testing.
                  </p>
                </div>
              </div>
            </div>

            {/* Stage: Validation */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-700 dark:bg-zinc-900/20">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-500 text-sm font-bold text-white dark:bg-zinc-600">
                  2
                </span>
                <div>
                  <h5 className="font-semibold text-zinc-900 dark:text-white">Stage: Validation</h5>
                  <p className="text-[12px] text-zinc-500 dark:text-zinc-400">Confirm right audience is arriving</p>
                </div>
                <span className="ml-auto text-[11px] font-mono text-zinc-500 dark:text-zinc-400">Days 31-60</span>
              </div>

              <div className="space-y-3 text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                <div className="flex gap-3">
                  <span className="mt-0.5 text-zinc-400">a)</span>
                  <p>
                    Verify: Are the <span className="font-medium text-zinc-800 dark:text-zinc-200">right people</span> coming in? Check{" "}
                    <span className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">[Qualification Criteria from ICP Definition]</span>
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5 text-zinc-400">b)</span>
                  <p>
                    Quality signals met? → Start expanding to{" "}
                    <span className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">[Platform Z]</span> using same content formats.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5 text-zinc-400">c)</span>
                  <p>
                    Introduce <span className="font-medium text-zinc-800 dark:text-zinc-200">Moonshot content</span>{" "}
                    <span className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">[1x per timeframe]</span> to test high-production value.
                  </p>
                </div>
              </div>
            </div>

            {/* Stage: Content-Market Fit */}
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 dark:border-zinc-700 dark:bg-zinc-900/20">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-500 text-sm font-bold text-white dark:bg-zinc-600">
                  3
                </span>
                <div>
                  <h5 className="font-semibold text-zinc-900 dark:text-white">Stage: Content-Market Fit</h5>
                  <p className="text-[12px] text-zinc-500 dark:text-zinc-400">Systematize what works</p>
                </div>
                <span className="ml-auto text-[11px] font-mono text-zinc-500 dark:text-zinc-400">Days 61-90</span>
              </div>

              <div className="space-y-3 text-[13px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                <div className="flex gap-3">
                  <span className="mt-0.5 text-zinc-400">a)</span>
                  <p>
                    Lock in the <span className="font-medium text-zinc-800 dark:text-zinc-200">proven content system</span>: formats, posting rhythm, visual style.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5 text-zinc-400">b)</span>
                  <p>
                    Document <span className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">[SOPs]</span> for content production based on winning patterns.
                  </p>
                </div>

                <div className="flex gap-3">
                  <span className="mt-0.5 text-zinc-400">c)</span>
                  <p>
                    Transition to <span className="font-medium text-zinc-800 dark:text-zinc-200">Win #2</span>:{" "}
                    <span className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">[Specific goal - leads/sales/community]</span>.
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center gap-2 pt-2">
              <div className="h-2 flex-1 rounded-full bg-teal-200 dark:bg-teal-900">
                <div className="h-full w-1/3 rounded-full bg-teal-500" />
              </div>
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">Seed → Validation → Scale</span>
            </div>
          </div>
        </motion.section>

        <motion.section variants={fadeIn} className="space-y-4">
          <div className="border-b-2 border-zinc-200 pb-2 dark:border-zinc-700">
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
              The Failure Logic
            </h3>
          </div>

          <div className="grid items-start gap-6 sm:grid-cols-2">
            <div className="space-y-4">
              <div className="border-l-2 border-red-400 pl-3 dark:border-red-500">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                  How to fail — skip discovery
                </span>
              </div>
              <div className="space-y-3 text-[13px] text-zinc-600 dark:text-zinc-400">
                <div className="space-y-1.5">
                  <p className="font-semibold text-orange-600 dark:text-orange-400">Seed stage:</p>
                  <ul className="ml-4 list-disc space-y-0.5 text-zinc-500 dark:text-zinc-400">
                    <li>Random content, random walk with no system in place</li>
                    <li>No understanding what content really works at each stage</li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <p className="font-semibold text-orange-600 dark:text-orange-400">Content market fit stage:</p>
                  <ul className="ml-4 list-disc space-y-0.5 text-zinc-500 dark:text-zinc-400">
                    <li>No clear understanding who your avatar is — content that does not provide value</li>
                    <li>No value, no real (targeted) followers</li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <p className="font-semibold text-orange-600 dark:text-orange-400">Result:</p>
                  <ul className="ml-4 list-disc space-y-0.5 text-zinc-500 dark:text-zinc-400">
                    <li>Inconsistency in content production</li>
                    <li>Abiguity on what content drives real KPIs</li>
                    <li>Decision fatigue</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-2 border-teal-400 pl-3 dark:border-teal-500">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Start with Discovery
                </span>
              </div>
              <div className="space-y-3 text-[13px] text-zinc-600 dark:text-zinc-400">
                <div className="space-y-1.5">
                  <p className="font-semibold text-teal-600 dark:text-teal-400">Week 1-2:</p>
                  <ul className="ml-4 list-disc space-y-0.5 text-zinc-600 dark:text-zinc-400">
                    <li>Clear blueprint that outlines the whole brand journey from 0 to 1</li>
                    <li>Ready to be executed plan of actions</li>
                    <li>Understanding where we go, and how we will get there</li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <p className="font-semibold text-teal-600 dark:text-teal-400">Month 1-3:</p>
                  <ul className="ml-4 list-disc space-y-0.5 text-zinc-600 dark:text-zinc-400">
                    <li>Gain attention and views first, based on the beforehand established system and decision making pipeline</li>
                    <li>The content preserves premium feel because of consistent efforts put in visual style</li>
                    <li>Content that brings in right avatars, based on the established brand narrative</li>
                    <li>Freedom to automate what already works, and shift attention to more high-risk high-reward content</li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <p className="font-semibold text-teal-600 dark:text-teal-400">Result:</p>
                  <ul className="ml-4 list-disc space-y-0.5 text-zinc-600 dark:text-zinc-400">
                    <li>Content engine that works because its reverse engineered</li>
                    <li>Scalable system that allows to invest in premium content type, and by extent increasing brand value</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section variants={fadeIn} className="space-y-4">
          <div className="border-b-2 border-zinc-200 pb-2 dark:border-zinc-700">
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
              Package Summary
            </h3>
          </div>

          <div className="flex flex-wrap gap-4 text-[13px]">
            <div className="rounded-lg bg-teal-50 px-3 py-1.5 dark:bg-teal-900/20">
              <span className="text-zinc-500">Timeline:</span>{" "}
              <span className="font-medium text-teal-700 dark:text-teal-300">
                10 days
              </span>
            </div>
            <div className="rounded-lg bg-zinc-100 px-3 py-1.5 dark:bg-zinc-800">
              <span className="text-zinc-500">Investment:</span>{" "}
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                $2,000
              </span>
            </div>
            <div className="rounded-lg bg-zinc-100 px-3 py-1.5 dark:bg-zinc-800">
              <span className="text-zinc-500">Format:</span>{" "}
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                Notion DB + Figma + Strategy docs + Full MD documnetation (to feed CC)
              </span>
            </div>
          </div>

          <div className="grid gap-1.5 text-[13px] text-zinc-600 dark:text-zinc-400 sm:grid-cols-2">
            {deliverableSummary.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-[2px] text-teal-500">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

        </motion.section>

        <motion.section variants={fadeIn} className="space-y-6">
          <div className="border-l-2 border-red-400 py-1 pl-3 dark:border-red-500">
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
              WITHOUT DISCOVERY
            </span>
            <p className="text-[15px] font-medium leading-relaxed text-zinc-800 dark:text-zinc-200">
              You try 5 platforms at once → diluted effort → none gain traction →
              abandon after 6 months when results don&apos;t materialize.
            </p>
          </div>
         

          <div className="border-b-2 border-zinc-200 pb-2 dark:border-zinc-700">
            <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
              Discovery → Win #1 (Seed stage) Connection
            </h3>
          </div>

          <p className="text-[14px] text-zinc-600 dark:text-zinc-400">
            Each deliverable directly enables Win #1. Without it - ambiguity.
          </p>

          <div className="-mx-1 overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-[12px]">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="w-1/4 px-2 py-2.5 text-left font-semibold text-zinc-700 dark:text-zinc-300">
                    Deliverable
                  </th>
                  <th className="w-1/3 px-2 py-2.5 text-left font-semibold text-teal-600 dark:text-teal-400">
                    Enables Win #1
                  </th>
                  <th className="w-1/3 px-2 py-2.5 text-left font-semibold text-red-600 dark:text-red-400">
                    Without It
                  </th>
                </tr>
              </thead>
              <tbody className="text-zinc-600 dark:text-zinc-400">
                {[
                  {
                    del: "Content Library",
                    enables:
                      "10-20 ranked ideas → test high-probability formats first to capture desired metric (reach first)",
                    without: "spend time on ideating, test what should not be tested",
                  },
                  {
                    del: "Brand Positioning",
                    enables: "Sets long term vision bar, that ideal avatars can fit themselves in",
                    without: "attract everyone (yet its okay for this stage)",
                  },
                  {
                    del: "Prioritization System",
                    enables:
                      "Keep consistency by planing, rapid descision making when switching between formats",
                    without:
                      "second guessing if the format is right, overthinking options, wasting time",
                  },
                  {
                    del: "Visual Direction",
                    enables: "consistency in premium vibes from first post - signals consistent premium brand",
                    without: "looks amateur",
                  },
                  {
                    del: "Content Pillars",
                    enables: "stick to themes that work in the niche",
                    without: "waste time reinventing the wheels on stage 0",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={`group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/50 ${
                      i % 2 === 0 ? "bg-zinc-50/50 dark:bg-zinc-900/20" : ""
                    }`}
                  >
                    <td className="px-2 py-2 font-medium text-zinc-800 dark:text-zinc-200">
                      {row.del}
                    </td>
                    <td className="px-2 py-2 text-teal-700 dark:text-teal-400">
                      {row.enables}
                    </td>
                    <td className="px-2 py-2 text-red-600/80 dark:text-red-400/80">
                      {row.without}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        <motion.section variants={fadeIn} className="flex justify-end pt-4 pb-20">
          <button
            type="button"
            onClick={() => {
              const closeButton = document.querySelector('[aria-label="Close card"]') as HTMLButtonElement;
              if (closeButton) closeButton.click();
              setTimeout(() => {
                const cards = document.querySelectorAll('[role="dialog"]');
                for (const card of cards) {
                  const titleEl = card.querySelector('h3');
                  if (titleEl?.textContent?.toLowerCase().includes('pilot')) {
                    (card as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => (card as HTMLElement).click(), 300);
                    break;
                  }
                }
              }, 400);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-[14px] font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/20 cursor-pointer"
          >
            What&apos;s after?
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </motion.section>
      </motion.div>
    </div>
  );
}
