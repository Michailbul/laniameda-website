"use client";

import { motion } from "framer-motion";
import { RoadmapCard } from "@/components/ui/roadmap-card";
import { PatternCard } from "@/components/ui/pattern-card";
import { Card } from "@/components/ui/card";
import DatabaseWithRestApi from "@/components/ui/database-with-rest-api";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.06 },
  },
};

const longTermWinItems = [
  "Premium audience built on trust and value",
  "Established brand that connects with the audience on emotional level",
  "Monetizes via retail services and adveretisment",
  "No dependence on founder's personal brand",
  "Friendroid is the Go-To-Solution for the early majority of consumers within the robotics market",
  "AI automation handles 70%+ of content production",
];

const successMetricsItems = [
  "100K+ engaged followers across platforms",
  "15%+ monthly engagement rate",
  "Audience that trusts the brand, and buys from the eshop.",
  "10–15% of e-shop traffic from content",
  "Brand recognition without a human face",
  "Affiliate partnerships with robotics brands",
];

const win3SuccessOutcomes = [
  "3-4 active platforms with consistent content",
  "Repurposing engine operational (1 idea -> 5-7 pieces)",
  "AI pipeline handling 30-50% of production",
  "50K-75K total followers across platforms",
];

// Backward-compat alias for stale hot-reload chunks.
const win3RepurposingOutputs = win3SuccessOutcomes;


const win3Automated = [
  "Script generation from pillars + brand voice",
  "Visual creation (thumbnails, graphics, b-roll)",
  "Editing assistance (cuts, captions, transitions)",
  "Repurposing between formats (Reel -> Carousel)",
  "Scheduling recommendations",
];

const win3Manual = [
  "Strategy and ideation",
  "Brand voice refinement",
  "Community engagement",
  "High-value content (moonshots, partnerships)",
];

const compoundEffectRows = [
  {
    pillar: "AUDIENCE",
    w1: "Views to drive algorithms",
    w2: "10k-20k followers, ICP attraction",
    w3: "75K multi-platform",
    w4: "100K loyal advocates",
    final: "High-value audience on trust",
  },
  {
    pillar: "BRAND",
    w1: "Voice + visuals defined",
    w2: "Positioning and narrative",
    w3: "Cross-platform consistency",
    w4: "Compound effect",
    final: "Emotional connection and trust",
  },
  {
    pillar: "BUSINESS",
    w1: "first CPA metrics",
    w2: "Improve CPA <= clear ICP",
    w3: "Partnerships emerge",
    w4: "Active revenue streams",
    final: "Diversified streams of revenue",
  },
  {
    pillar: "INDEPENDENCE",
    w1: "Built system, playbook",
    w2: "Own what works",
    w3: "Scale what works",
    w4: "Explore with no risks",
    final: "Freedom in formats",
  },
];

const skipStepItems = [
  {
    skip: "Win #1",
    result: "No views to feed the algorith, → no way to funnel in ICPs, stuck before even started",
  },
  {
    skip: "Win #2",
    result: "No clear positioning and value - attract wrong ICP. ",
  },
  {
    skip: "Win #3",
    result: "Scanyou",
  },
  {
    skip: "Win #4",
    result: "Still founder-dependent → business dies if you step away",
  },
];

export function Phase0CurrentStateContent() {
  return (
    <motion.div
      className="space-y-10 w-full min-w-0"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* INTRO */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.header variants={fadeIn} className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          Where we are today and where we wanna get
        </h2>
        <p className="text-zinc-600 dark:text-white/70 leading-relaxed max-w-2xl">
          At Laniameda, we believe in <span className="font-cursive"> begin-with-the-end-in-mind</span> approach.
          So let us reverse engineer what success means.
        </p>
      </motion.header>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 1. LONG-TERM WIN */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-4">
        <h3 className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">1</span>
          <span className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
          How the long term Win looks like?
          </span>
        </h3>
        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-[15px] leading-relaxed pl-1">
          {longTermWinItems.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 mt-2 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 2. SUCCESS METRICS */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-4">
        <h3 className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">2</span>
          <span className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
            Success Metrics (How We&apos;ll Know We&apos;re There)
          </span>
        </h3>
        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-[15px] leading-relaxed pl-1">
          {successMetricsItems.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 mt-2 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </motion.section>
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 3. THE PATH */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-5">
        <h3 className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">3</span>
          <span className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
            How we are gonna get there?
          </span>
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-[15px]">
          We&apos;re going to reach the Long-Term Win through a series of four Short-Term Wins, each building on the foundation of the previous one.
        </p>

        <RoadmapCard
          title="Roadmap to Success"
          description="From discovery to scale — each phase builds on the last"
          items={[
            {
              quarter: "M1-2",
              title: "Seed & Reach",
              description: "Build audience engine through repeatable content formats",
              status: "planning",
            },
            {
              quarter: "M3-5",
              title: "Content-Market Fit",
              description: "Attract the right avatar",
              status: "upcoming",
            },
            {
              quarter: "M6-9",
              title: "Growth",
              description: "Scale production across platforms using automation",
              status: "upcoming",
            },
            {
              quarter: "M9-12",
              title: "Scale",
              description: "Mass production, full monetization, brand independence",
              status: "upcoming",
            },
          ]}
        />
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* WIN DETAILS */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-6 w-full min-w-0">
        {[
          {
            num: 1,
            title: "Seed & Reach",
            period: "Month 1–3",
            items: [],
            content: (
              <div className="space-y-5 mt-3">
                {/* Goal */}
                <div className="border-l-2 orange-400 dark:border-orange-400 pl-3 py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1 block">
                    Goal
                  </span>
                  <p className="text-zinc-800 dark:text-zinc-200 text-[15px] font-medium leading-relaxed">
                    Build an audience engine through repeatable content formats that drive consistent reach and views.
                  </p>
                </div>
                {/* Free-form Description Block */}
                <PatternCard variant="plus" className="rounded-lg">
                  <div className="p-4">
                    <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none">
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        At this seed stage, we focus on <strong className="text-zinc-700 dark:text-zinc-300">reach and views first</strong> to establish a funnel for our ideal avatar. We test proven content formats from robotics and adjacent niches, adapted to our brand voice and narrative.
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
                        We focus on repeating what already works to get engagement and views, however we do that with already established brand visuals and narrative, so that we keep the high standards of the brand from the beginning.
                      </p>
                    </div>
                  </div>
                </PatternCard>

                {/* Success Metrics */}
                <div>
                  <span className="text-zinc-500 dark:text-zinc-500 text-[12px] uppercase tracking-wide font-medium">Success Metrics</span>
                  <div className="flex flex-wrap gap-4 mt-1">
                    <div><span className="text-xl font-bold text-teal-600 dark:text-teal-400">50-100</span> <span className="text-zinc-600 dark:text-zinc-400 text-[13px]">pieces</span></div>
                    <div><span className="text-xl font-bold text-teal-600 dark:text-teal-400">1-2</span> <span className="text-zinc-600 dark:text-zinc-400 text-[13px]">hero formats</span></div>
                    <div><span className="text-xl font-bold text-teal-600 dark:text-teal-400">5K-10K</span> <span className="text-zinc-600 dark:text-zinc-400 text-[13px]">followers</span></div>
                    <div><span className="text-xl font-bold text-teal-600 dark:text-teal-400">avg 10K</span> <span className="text-zinc-600 dark:text-zinc-400 text-[13px]">views</span></div>
                  </div>
                </div>

                {/* Platform Strategy */}
                <div>
                  <span className="text-zinc-500 dark:text-zinc-500 text-[12px] uppercase tracking-wide font-medium">Platform Strategy</span>
                  <div className="flex items-center gap-2 text-[13px] mt-1">
                    <span className="px-2 py-0.5 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded font-medium">Instagram (Hero)</span>
                    <span className="text-zinc-400">+</span>
                    <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded">LinkedIn (Support)</span>
                  </div>
                </div>

                {/* Distribution Plan */}
                <div>
                  <span className="text-zinc-500 dark:text-zinc-500 text-[12px] uppercase tracking-wide font-medium">Distribution Plan</span>
                  <div className="flex items-center gap-2 text-[12px] mt-1">
                    <span className="text-zinc-600 dark:text-zinc-400">70/20/10:</span>
                    <div className="flex gap-1">
                      <div className="w-16 bg-teal-500 h-1.5 rounded-full" />
                      <div className="w-5 bg-zinc-400 dark:bg-zinc-600 h-1.5 rounded-full" />
                      <div className="w-2 bg-zinc-300 dark:bg-zinc-700 h-1.5 rounded-full" />
                    </div>
                    <span className="text-zinc-500">proven / iterate / experimental</span>
                  </div>
                </div>

                {/* Win Gate */}
                <p className="text-zinc-600 dark:text-zinc-400 text-[13px] border-t border-zinc-200 dark:border-zinc-800 pt-3">
                  <strong className="text-zinc-700 dark:text-zinc-300">Gate to Win #2:</strong> 10K avg views + 5K followers with consistent format
                </p>
              </div>
            ),
          },
          {
            num: 2,
            title: "Content-Market Fit",
            period: "Month 3–6",
            description: "Win #1 gave us reach. Now we focus on attracting the right people.",
            items: [],
            content: (
              <div className="space-y-5 mt-3">
                {/* Goal */}
                <div className="border-l-2 orange-400 dark:border-orange-400 pl-3 py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1 block">
                    Goal
                  </span>
                  <p className="text-zinc-800 dark:text-zinc-200 text-[15px] font-medium leading-relaxed">
                    Find content that attracts not just views, but our Ideal Customer Avatar we outlined.
                  </p>
                </div>            

                {/* Free-form Description */}
                <PatternCard variant="plus" className="rounded-lg">
                  <div className="p-4">
                    <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none">
                      <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        We&apos;re now shifting from mass reach to targeted attraction. We want to attract followers who align with our brand values and are likely to become customers.
                        We intentionally position the brand through our Brand Narrative Bible, to attract the ICPs.
                      </div>
                      <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Our messaging answers:
                      </div>
                      <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        * What we stand for  (i.e robots are &apos;second-dog&apos;)
                      </div>
                      <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        * What we&apos;re against(i.e robots are evil)                        
                      </div>
                      <div className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        * The transformation we promise (i.e no more uncertainty about robots)
                      </div>
                    </div>
                  </div>
                </PatternCard>

                {/* Success Metrics */}
                <div>
                  <span className="text-zinc-500 dark:text-zinc-500 text-[12px] uppercase tracking-wide font-medium">Success Metrics</span>
                  <div className="flex flex-wrap gap-4 mt-1">
                    <div><span className="text-xl font-bold text-teal-600 dark:text-teal-400">10K-20K</span> <span className="text-zinc-600 dark:text-zinc-400 text-[13px]">followers</span></div>
                    <div><span className="text-xl font-bold text-teal-600 dark:text-teal-400">15%+</span> <span className="text-zinc-600 dark:text-zinc-400 text-[13px]">engagements</span></div>
                    <div><span className="text-xl font-bold text-teal-600 dark:text-teal-400">100+</span> <span className="text-zinc-600 dark:text-zinc-400 text-[13px]">e-shop clicks</span></div>
                  </div>
                </div>

                {/* Platform Strategy */}
                <div className="space-y-3">
                  <span className="text-zinc-500 dark:text-zinc-500 text-[12px] uppercase tracking-wide font-medium">Platform Strategy</span>
                  <div className="border-l-2 border-orange-400 dark:border-teal-400 pl-3 py-1">
                    <p className="text-zinc-800 dark:text-zinc-200 text-[15px] font-medium leading-relaxed">
                      at this step we focus on having one hero platform, and one support platform. We distribute our focus in 70/30%. Once we establish escape velocity, we change the hero platform
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[13px]">
                    <span className="px-2 py-0.5 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded font-medium">Instagram (Hero)</span>
                    <span className="text-zinc-400">+</span>
                    <span className="px-2 py-0.5 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded font-medium">Linkedin (Support)</span>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-500 text-[12px]">Once Instagram hits escape velocity (10K+ views), we shift focus to [XYZ] without splitting attention.</p>
                </div>

                {/* Distribution Plan */}
                <div>
                  <span className="text-zinc-500 dark:text-zinc-500 text-[12px] uppercase tracking-wide font-medium">Content Distribution Plan</span>
                  <div className="flex items-center gap-2 text-[12px] mt-1">
                    <span className="text-zinc-600 dark:text-zinc-400">70/20/10:</span>
                    <div className="flex gap-1">
                      <div className="w-16 bg-teal-500 h-1.5 rounded-full" />
                      <div className="w-5 bg-zinc-400 dark:bg-zinc-600 h-1.5 rounded-full" />
                      <div className="w-2 bg-zinc-300 dark:bg-zinc-700 h-1.5 rounded-full" />
                    </div>
                    <span className="text-zinc-500">What works / better / new</span>
                  </div>
                </div>

                {/* Win Gate */}
                <p className="text-zinc-600 dark:text-zinc-400 text-[13px] border-t border-zinc-200 dark:border-zinc-800 pt-3">
                  <strong className="text-zinc-700 dark:text-zinc-300">Gate to Win #3:</strong> People being to follow for value, clear ICP correlation, first e-shop conversions
                </p>
              </div>
            ),
          },
          {
            num: 3,
            title: "Growth & Multi-Platform",
            period: "Month 6–9",
            description: "Win #2 gave us fit. Now we double down on it.",
            goal: "Scale production across platforms using automation.",
            items: [],
            content: (
              <div className="space-y-5 mt-3">
                {/* Goal - Simplified like Win #1/Win #2 */}
                <div className="border-l-2 border-orange-400 dark:border-orange-400 pl-3 py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1 block">
                    Goal
                  </span>
                  <p className="text-zinc-800 dark:text-zinc-200 text-[15px] font-medium leading-relaxed">
                    <strong className="text-zinc-900 dark:text-white">Scale without dilution:</strong>{" "}
                    squeeze maximum leverage from proven formats that already attract <em className="highlighted text-teal-600 dark:text-teal-4002">the right</em> audience.
                  </p>
                </div>

                {/* Free-form Description - Clean PatternCard */}
                <PatternCard variant="plus" className="rounded-lg">
                  <div className="p-4">
                    <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none">
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        Win #3 operationalizes what already works. The objective is{" "}
                        <strong className="text-zinc-700 dark:text-zinc-300">scale what brings in ideal avatars </strong>
                        and not attention/views
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
                        This means taking what worked in Content Market Fit and building systems to produce it at scale.
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
                        This is the time where we heavilly invest in AI automations. Based on the type of content that actually drives core KPIs, we build a solution around it, not the other way.
                      </p>
                    </div>
                  </div>
                </PatternCard>

                {/* Success Checkpoints - Inline visible list */}
                <div>
                  <span className="text-zinc-500 dark:text-zinc-500 text-[12px] uppercase tracking-wide font-medium">
                    What success looks like:
                  </span>
                  <ul className="space-y-1.5 mt-2 text-zinc-700 dark:text-zinc-300 text-[14px]">
                    {win3SuccessOutcomes.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Metrics - Inline visible row */}
                <div>
                  <span className="text-zinc-500 dark:text-zinc-500 text-[12px] uppercase tracking-wide font-medium">Key Metrics</span>
                  <div className="flex flex-wrap gap-4 mt-1">
                    <div><span className="text-xl font-bold text-teal-600 dark:text-teal-400">50-75K</span> <span className="text-zinc-600 dark:text-zinc-400 text-[13px]">followers</span></div>
                    <div><span className="text-xl font-bold text-teal-600 dark:text-teal-400">300-500K</span> <span className="text-zinc-600 dark:text-zinc-400 text-[13px]">monthly views</span></div>
                    <div><span className="text-xl font-bold text-teal-600 dark:text-teal-400">60-70</span> <span className="text-zinc-600 dark:text-zinc-400 text-[13px]">posts/week</span></div>
                    <div><span className="text-xl font-bold text-teal-600 dark:text-teal-400">20%+</span> <span className="text-zinc-600 dark:text-zinc-400 text-[13px]">engagement</span></div>
                  </div>
                </div>

                {/* Distribution Plan - Inline visible bar */}
                <div>
                  <span className="text-zinc-500 dark:text-zinc-500 text-[12px] uppercase tracking-wide font-medium">Distribution Plan</span>
                  <div className="flex items-center gap-2 text-[12px] mt-1">
                    <span className="text-zinc-600 dark:text-zinc-400">70/20/10:</span>
                    <div className="flex gap-1">
                      <div className="w-16 bg-teal-500 h-1.5 rounded-full" />
                      <div className="w-5 bg-zinc-400 dark:bg-zinc-600 h-1.5 rounded-full" />
                      <div className="w-2 bg-zinc-300 dark:bg-zinc-700 h-1.5 rounded-full" />
                    </div>
                    <span className="text-zinc-500">proven / optimize / moonshots</span>
                  </div>
                </div>

                {/* 3 Accordions with clean styling */}
                <div className="space-y-3">
                  {/* Platform Strategy Accordion */}
                  <details className="group border-2 border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors open:border-teal-400/60 dark:open:border-teal-600/60">
                    <summary className="list-none cursor-pointer flex items-center justify-between gap-3 px-4 py-3">
                      <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-zinc-700 dark:text-zinc-300">
                        Platform Expansion
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 border border-teal-400/60 text-teal-700 dark:text-teal-300 rounded">
                        Maintain focus
                      </span>
                    </summary>
                    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                      <div className="flex items-center gap-2 text-[13px]">
                        <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded">Instagram (Running)</span>
                        <span className="text-zinc-400">→</span>
                        <span className="px-2 py-0.5 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded font-medium">TikTok (Hero)</span>
                        <span className="text-zinc-400">→</span>
                        <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded">YouTube Shorts</span>
                      </div>
                      <p className="text-zinc-500 dark:text-zinc-500 text-[12px]">
                        Once [XYZ] hits escape velocity ([followers/views]), shift primary focus to [ABC] while [XYZ] lives in maintenance mode.
                      </p>
                    </div>
                  </details>

                  {/* Repurposing Engine Accordion - Hero Feature */}
                  <details className="group border-2 border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors open:border-teal-400/60 dark:open:border-teal-600/60">
                    <summary className="list-none cursor-pointer flex items-center justify-between gap-3 px-4 py-3">
                      <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-zinc-700 dark:text-zinc-300">
                        Repurposing Engine
                      </span>
                      
                    </summary>
                    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                      <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/50">
                        <DatabaseWithRestApi
                          className="mx-auto h-[360px] max-w-[620px]"
                          circleText="WORLD"
                          title="Repurpose agent"
                          lightColor="#14B8A6"
                          badgeTexts={{
                            first: "REELs",
                            second: "TIKTOK",
                            third: "SHORT",
                            fourth: "LINKEDIN",
                          }}
                          buttonTexts={{
                            first: "News aggregator agent",
                            second: "Content aggregator agent",
                          }}
                        />
                      </div>

                      <Card className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-none px-3 py-2">
                        <p className="text-[12px] text-zinc-600 dark:text-zinc-400">
                          One source enters the pipeline and exits as seven platform-native assets with minimal manual overhead.
                          We can do that efficiently, because we manually discovered what is actually working, for our audience in our niche for our brand.
                        </p>
                      </Card>
                    </div>
                  </details>

                  {/* AI Automation Accordion - Enhanced with strategy context */}
                  <details className="group border-2 border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors open:border-orange-400/50 dark:open:border-orange-500/40">
                    <summary className="list-none cursor-pointer flex items-center justify-between gap-3 px-4 py-3">
                      <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-zinc-700 dark:text-zinc-300">
                        AI Automation Strategy
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 border border-orange-400/50 text-orange-700 dark:text-orange-300 rounded">
                        Agentic System
                      </span>
                    </summary>
                    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
                      {/* Explanatory prose block */}
                      <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none">
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          At this stage, we have a <strong className="text-zinc-700 dark:text-zinc-300">strict content production system</strong> and have identified formats that actually perform for our ICPs-content that drives leads. This clarity allows us to bring in an <strong className="text-zinc-700 dark:text-zinc-300">agentic system</strong> to optimize production of proven content types.
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
                          By automating the 70% (proven formats), we effectively <strong className="text-zinc-700 dark:text-zinc-300">pop this element from our focus distribution</strong>—freeing attention for moonshots and experimental formats. Example: <em className="text-zinc-500 dark:text-zinc-500">AI-generated cinematic series about robots in family life</em>.
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
                          These moonshots require a more manual approach and are less scalable-but that&apos;s fine. The automated engine backs us with consistent results, allowing us to pursue high-cost creative directions we identified during discovery but initially flagged as risky. <strong className="text-zinc-700 dark:text-zinc-300">At this point, they&apos;re no longer risky.</strong>
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
                          This also opens an adjacent marketing channel: AI filmmaking and generative media content intersects directly with our robotics ICPs while tapping into a growing creator niche.
                        </p>
                      </div>
                    </div>
                  </details>
                </div>


              </div>
            ),
          },
          {
            num: 4,
            title: "Scale & Enterprise",
            period: "Month 9–12",
            description: "We're now operating at enterprise scale - mass content production with maintained quality, fully activated monetization, and brand independence.",
            goal: "",
            items: [],
            content: (
              <div className="space-y-5 mt-3">
                {/* Goal */}
                <div className="border-l-2 border-orange-400 dark:border-orange-400 pl-3 py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1 block">
                    Goal
                  </span>
                  <p className="text-zinc-800 dark:text-zinc-200 text-[15px] font-medium leading-relaxed">
                    <strong className="text-zinc-900 dark:text-white">Mass production, full monetization, brand independence, creative and high value content production engine: cinematics, short series, live action, UGC.</strong>{" "}
                    All platforms run simultaneously with automated repurposing and platform-specific optimization.
                  </p>
                </div>

                {/* Platform Portfolio */}
                <div>
                  <span className="text-zinc-500 dark:text-zinc-500 text-[12px] uppercase tracking-wide font-medium">Platform Portfolio</span>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-2">
                    {[
                      { platform: "Instagram", status: "Established", followers: "30K+ followers", mode: "Autopilot" },
                      { platform: "TikTok", status: "Established", followers: "25K+ followers", mode: "Autopilot" },
                      { platform: "YouTube Shorts", status: "Active growth", followers: "20K+ subscribers", mode: "Growth" },
                      { platform: "LinkedIn", status: "B2B presence", followers: "10K+ followers", mode: "Autopilot" },
                      { platform: "Emerging", status: "Testing", followers: "Threads", mode: "Experiment" },
                      { platform: "X", status: "Testing", followers: "30k followers", mode: "Growth" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50/50 dark:bg-zinc-900/30">
                        <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${item.mode === "Growth" ? "bg-teal-500 dark:bg-teal-400" : item.mode === "Experiment" ? "bg-orange-500 dark:bg-orange-400" : "bg-zinc-400 dark:bg-zinc-500"}`} />
                        <div>
                          <p className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">{item.platform}</p>
                          <p className="text-[12px] text-zinc-500 dark:text-zinc-500">{item.followers}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Metrics */}
                <div>
                  <span className="text-zinc-500 dark:text-zinc-500 text-[12px] uppercase tracking-wide font-medium">Scale Metrics</span>
                  <div className="flex flex-wrap gap-4 mt-1">
                    <div><span className="text-xl font-bold text-teal-600 dark:text-teal-400">100K+</span> <span className="text-zinc-600 dark:text-zinc-400 text-[13px]">followers</span></div>
                    <div><span className="text-xl font-bold text-teal-600 dark:text-teal-400">70%+</span> <span className="text-zinc-600 dark:text-zinc-400 text-[13px]">automation</span></div>
                    <div><span className="text-xl font-bold text-teal-600 dark:text-teal-400">35+</span> <span className="text-zinc-600 dark:text-zinc-400 text-[13px]">pieces/week</span></div>
                    <div><span className="text-xl font-bold text-teal-600 dark:text-teal-400">2-3h</span> <span className="text-zinc-600 dark:text-zinc-400 text-[13px]">human time/week</span></div>
                  </div>
                </div>
                <PatternCard variant="plus" className="rounded-lg">
                        <div className="p-4">
                          <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none">
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                              Here at this step the AI pipeline with the human in the loop produces 70% of content.
                              <strong className="text-zinc-700 dark:text-zinc-300">that allows the brand to scale moonshots and double down on creative, high quality type content </strong>                            
                            </p>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2">
                              those may be a fully Ai generated films about robots in family lifes, Comedy, Live action storytelling etc
                            </p>

                          </div>
                        </div>
                  </PatternCard>
                {/* 2 Accordions */}
                <div className="space-y-3">
                 

                  {/* Content Distribution Accordion */}
                  <details className="group border-2 border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors open:border-teal-400/60 dark:open:border-teal-600/60">
                    <summary className="list-none cursor-pointer flex items-center justify-between gap-3 px-4 py-3">
                      <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-zinc-700 dark:text-zinc-300">
                        Content Distribution Strategy
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 border border-teal-400/60 text-teal-700 dark:text-teal-300 rounded">
                       80%/20%
                      </span>
                    </summary>
                    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-3">
                      <div className="space-y-3">
                        <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[13px] font-bold text-teal-600 dark:text-teal-400">80%</span>
                            <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">Automated proven formats</span>
                          </div>
                          <p className="text-[12px] text-zinc-500 dark:text-zinc-500">AI brutefroces production, repurposing, distribution.</p>
                        </div>
                        <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[13px] font-bold text-zinc-600 dark:text-zinc-400">20%</span>
                            <span className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">High value creative content</span>
                          </div>
                          <p className="text-[12px] text-zinc-500 dark:text-zinc-500">AI generated documentaries, Mini series, education (via robot like avatar), Robotic AI UGC influencers, etc</p>
                        </div>
                      
                      </div>
                    </div>
                  </details>

                  {/* Moonshot Example Accordion */}
                  <details className="group border-2 border-zinc-200 dark:border-zinc-800 rounded-lg transition-colors open:border-teal-400/60 dark:open:border-teal-600/60">
                    <summary className="list-none cursor-pointer flex items-center justify-between gap-3 px-4 py-3">
                      <span className="text-[12px] uppercase tracking-[0.2em] font-semibold text-zinc-700 dark:text-zinc-300">
                        Moonshot Example
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 border border-teal-400/60 text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/25 rounded">
                        &quot;Robots in Real Life&quot; Series
                      </span>
                    </summary>
                    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                      <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none">
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          <strong className="text-zinc-700 dark:text-zinc-300">2-3 minute cinematic shorts</strong> created with generative AI tools. Follows families using robots to reclaim time for what matters — emotional cinematic storytelling, on scale.
                        </p>
                        <ul className="mt-2 space-y-1 text-[13px] text-zinc-600 dark:text-zinc-400">
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 mt-1.5 shrink-0" />
                            <a href="https://www.laniameda.space/" className="text-teal-600 dark:text-teal-400 underline underline-offset-4 hover:underline-offset-2 transition-all">Laniameda</a> produces and promotes in AI filmmaking communities
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 mt-1.5 shrink-0" />
                            Drives brand differentiation and respect.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 mt-1.5 shrink-0" />
                            Bi-weekly release schedule for consistent audience engagement
                          </li>
                        </ul>
                      </div>
                    </div>
                  </details>
                </div>

                {/* Win Gate */}
                <p className="text-zinc-600 dark:text-zinc-400 text-[13px] border-t border-zinc-200 dark:border-zinc-800 pt-3">
                  <strong className="text-zinc-700 dark:text-zinc-300">Final State:</strong> Scalable content business, tailored for high value audience, generating revenue through e-shop traffic, affiliate partnerships, and brand deals.
                </p>
              </div>
            ),
          },
        ].map((win) => (
          <motion.div key={win.num} variants={fadeIn} className="space-y-3 pt-6 first:pt-0">
            {/* Win Header with underline */}
            <div className="border-b-2 border-zinc-200 dark:border-zinc-700 pb-2">
              <h4 className="flex items-baseline gap-2">
                <span className="text-teal-600 dark:text-teal-400 font-bold text-lg">
                  Win #{win.num}
                </span>
                <span className="text-zinc-900 dark:text-white font-semibold text-lg">{win.title}</span>
                <span className="text-zinc-500 dark:text-zinc-500 text-sm ml-auto">• {win.period}</span>
              </h4>
            </div>
            {win.description && (
              <p className="text-zinc-700 dark:text-zinc-300 text-[15px] font-medium">{win.description}</p>
            )}
            {win.goal && <p className="text-zinc-600 dark:text-zinc-400 text-[15px]">{win.goal}</p>}
            {win.content}
            {win.items.length > 0 && (
              <ul className="space-y-1 text-zinc-600 dark:text-zinc-400 text-[14px] pl-1">
                {win.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* COMPOUND EFFECT TABLE */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-4 w-full min-w-0">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
          The Compound Effect
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-[15px]">
          Each phase is engineered to build on the previous
        </p>

        <div className="w-full min-w-0">
          <table className="w-full min-w-0 table-fixed text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <th className="py-3 px-2 text-left text-zinc-500 dark:text-zinc-400 font-medium w-24">
                  Pillar
                </th>
                <th className="py-3 px-2 text-left text-zinc-600 dark:text-zinc-400 font-medium">
                  Win #1
                </th>
                <th className="py-3 px-2 text-left text-zinc-600 dark:text-zinc-400 font-medium">
                  Win #2
                </th>
                <th className="py-3 px-2 text-left text-zinc-600 dark:text-zinc-400 font-medium">
                  Win #3
                </th>
                <th className="py-3 px-2 text-left text-zinc-600 dark:text-zinc-400 font-medium">
                  Win #4
                </th>
                <th className="py-3 px-2 text-left text-teal-600 dark:text-teal-400 font-medium">
                  = Final State
                </th>
              </tr>
            </thead>
            <tbody className="text-zinc-600 dark:text-zinc-300">
              {compoundEffectRows.map((row, i) => (
                <tr
                  key={row.pillar}
                  className={i % 2 === 0 ? "bg-zinc-100/70 dark:bg-zinc-900/30" : ""}
                >
                  <td className="py-2.5 px-2 text-zinc-800 dark:text-zinc-200 font-semibold whitespace-normal break-words">
                    {row.pillar}
                  </td>
                  <td className="py-2.5 px-2 whitespace-normal break-words">{row.w1}</td>
                  <td className="py-2.5 px-2 whitespace-normal break-words">{row.w2}</td>
                  <td className="py-2.5 px-2 whitespace-normal break-words">{row.w3}</td>
                  <td className="py-2.5 px-2 whitespace-normal break-words">{row.w4}</td>
                  <td className="py-2.5 px-2 text-teal-600 dark:text-teal-400 font-medium whitespace-normal break-words">
                    {row.final}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* CTA: EXPLORE CREATIVE TREATMENT */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
            Define your content strategy first.
          </h3>
          <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-[15px] leading-relaxed pl-1">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 mt-2 shrink-0" />
              <span>If you don't know what type of content to post to get views, you will not get enough to funnel in the right avatar.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 mt-2 shrink-0" />
              <span>If you skip brand narrative and positioning, you have no chance to attract the audience you want.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 mt-2 shrink-0" />
              <span>If you can't attract the right avatar, you have no stable way to scale across platforms.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 mt-2 shrink-0" />
              <span>If you don't have a decision-making system and blueprint from the beginning, you end up on a random walk — spending time on ideation instead of execution.</span>
            </li>
          </ul>

          <blockquote className="border-l-2 border-teal-400/60 pl-4 py-2 my-4 text-zinc-600 dark:text-zinc-400 italic text-[15px]">
            "Once you know what you know — getting there is easy"
          </blockquote>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => {
              // Close the currently expanded card
              const closeButton = document.querySelector('[aria-label="Close card"]') as HTMLButtonElement;
              if (closeButton) {
                closeButton.click();
              }

              // Wait for collapse animation then scroll to and open Creative Treatment
              setTimeout(() => {
                // Find the Creative Treatment collapsed card by its title
                const cards = document.querySelectorAll('[role="dialog"]');
                for (const card of cards) {
                  const titleEl = card.querySelector('h3');
                  if (titleEl?.textContent?.toLowerCase().includes('creative treatment')) {
                    // Scroll the card into view first
                    (card as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Then click to open after scroll animation
                    setTimeout(() => {
                      (card as HTMLElement).click();
                    }, 300);
                    break;
                  }
                }
              }, 400);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-[14px] font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            Explore the Creative Treatment package
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <span className="text-[13px] text-zinc-500 dark:text-zinc-400">$2,000 · 5 business days</span>
        </div>
      </motion.section>

    </motion.div>
  );
}
