"use client";

import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: { staggerChildren: 0.06 },
  },
};

export function Phase0CurrentStateContent() {
  return (
    <motion.div
      className="space-y-10"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* INTRO */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.header variants={fadeIn} className="space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
          Begin with the end in mind.
        </h2>
        <p className="text-zinc-600 dark:text-white/70 leading-relaxed max-w-2xl">
          At Laniameda, we reverse-engineer success. Before we build anything, 
          we need to define what winning looks like—then work backwards.
        </p>
      </motion.header>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 1. LONG-TERM WIN */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-4">
        <h3 className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">1</span>
          <span className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
            The Long-Term Win
          </span>
        </h3>
        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-[15px] leading-relaxed pl-1">
          {[
            "High-value audience built on trust and value",
            "Established brand with emotional connection",
            "Monetizes via retail, services & advertising",
            "No dependence on founder's personal brand",
            "Friendroid = the go-to for robotics consumers",
            "AI automation handles 70%+ of production",
            "Business is scalable and sellable",
          ].map((item, i) => (
            <motion.li
              key={i}
              variants={fadeIn}
              className="flex items-start gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 mt-2 shrink-0" />
              {item}
            </motion.li>
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
            Success Metrics
          </span>
        </h3>
        <ul className="space-y-2 text-zinc-700 dark:text-zinc-300 text-[15px] leading-relaxed pl-1">
          {[
            "100K+ engaged followers across platforms",
            "15%+ monthly engagement rate",
            "10–15% of e-shop traffic from content",
            "Brand recognition without a human face",
            "Affiliate partnerships with robotics brands",
          ].map((item, i) => (
            <motion.li
              key={i}
              variants={fadeIn}
              className="flex items-start gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400 mt-2 shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* PHILOSOPHY QUOTE */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.blockquote
        variants={fadeIn}
        className="border-l-2 border-teal-500 dark:border-teal-500/50 pl-5 py-1 text-zinc-600 dark:text-zinc-400 italic text-[15px] leading-relaxed"
      >
        We believe in contrarian thinking — being one of a kind. While everyone 
        in robotics goes all-in on practical value, we&apos;re establishing an 
        emotional connection in addition to practical value.
      </motion.blockquote>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* 3. THE PATH */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-5">
        <h3 className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">3</span>
          <span className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
            The Path: 4 Short-Term Wins
          </span>
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-[15px]">
          Each win builds on the last. You can&apos;t skip steps.
        </p>

        {/* Timeline */}
        <div className="relative pl-6 space-y-1">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-teal-500 via-zinc-300 to-zinc-200 dark:from-teal-500/60 dark:via-zinc-600/40 dark:to-zinc-700/20" />

          {[
            { label: "LONG-TERM WIN", sub: "Month 12–24", highlight: true },
            { label: "Win #4: Scale & Enterprise", sub: "Month 9–12" },
            { label: "Win #3: Growth & Multi-Platform", sub: "Month 6–9" },
            { label: "Win #2: Content-Market Fit", sub: "Month 3–6" },
            { label: "Win #1: Seed & Reach", sub: "Month 1–3" },
            { label: "Level 0: Discovery", sub: "Week 1–2", current: true },
          ].map((step, i) => (
            <motion.div
              key={step.label}
              variants={fadeIn}
              className="relative flex items-center gap-4 py-2"
            >
              {/* Dot */}
              <span
                className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 z-10 ${
                  step.current
                    ? "bg-teal-500 border-teal-500 dark:bg-teal-400 dark:border-teal-400"
                    : step.highlight
                    ? "bg-amber-400 border-amber-400"
                    : "bg-zinc-200 border-zinc-400 dark:bg-zinc-800 dark:border-zinc-600"
                }`}
              />
              {/* Text */}
              <div className="flex-1">
                <span
                  className={`font-medium text-[15px] ${
                    step.current || step.highlight ? "text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {step.label}
                </span>
                <span className="text-zinc-500 dark:text-zinc-500 text-sm ml-2">{step.sub}</span>
              </div>
              {step.current && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  You are here
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* WIN DETAILS */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-6">
        {[
          {
            num: 1,
            title: "Seed & Reach",
            period: "Month 1–3",
            goal: "Find content formats that get attention and build initial audience.",
            items: [
              "50–100 pieces published",
              "1–2 hero formats proven",
              "5K–10K followers on primary platform",
              "Repeatable weekly system",
            ],
          },
          {
            num: 2,
            title: "Content-Market Fit",
            period: "Month 3–6",
            goal: "Attract the RIGHT followers—your ideal customers who'll buy.",
            items: [
              "Content that attracts ICPs, not random views",
              "Brand positioning validated",
              "Community starting to form",
              "First e-shop traffic from content",
            ],
          },
          {
            num: 3,
            title: "Growth & Multi-Platform",
            period: "Month 6–9",
            goal: "Scale production across platforms using automation.",
            items: [
              "3–4 active platforms",
              "Repurposing engine (1 idea → 7 pieces)",
              "30–50% AI automation",
              "Partnership inquiries starting",
            ],
          },
          {
            num: 4,
            title: "Scale & Enterprise",
            period: "Month 9–12",
            goal: "Mass production, full monetization, brand independence.",
            items: [
              "100K+ followers across platforms",
              "70%+ automation",
              "Multiple revenue streams active",
              "Team runs it without founder",
            ],
          },
        ].map((win) => (
          <motion.div key={win.num} variants={fadeIn} className="space-y-2">
            <h4 className="flex items-baseline gap-2">
              <span className="text-teal-600 dark:text-teal-400 font-bold text-sm">
                Win #{win.num}
              </span>
              <span className="text-zinc-900 dark:text-white font-semibold">{win.title}</span>
              <span className="text-zinc-500 dark:text-zinc-500 text-sm">• {win.period}</span>
            </h4>
            <p className="text-zinc-600 dark:text-zinc-400 text-[15px]">{win.goal}</p>
            <ul className="space-y-1 text-zinc-600 dark:text-zinc-400 text-[14px] pl-1">
              {win.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* COMPOUND EFFECT TABLE */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white tracking-tight">
          The Compound Effect
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-[15px]">
          Each phase is engineered to build on the previous. Skip steps = failure.
        </p>

        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-[13px] border-collapse">
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
              {[
                {
                  pillar: "AUDIENCE",
                  w1: "10K followers, engagement habits",
                  w2: "30K ICPs, community forming",
                  w3: "75K multi-platform",
                  w4: "100K loyal advocates",
                  final: "High-value audience on trust",
                },
                {
                  pillar: "BRAND",
                  w1: "Voice + visuals defined",
                  w2: "Positioning validated",
                  w3: "Cross-platform consistency",
                  w4: "Independent recognition",
                  final: "Emotional connection established",
                },
                {
                  pillar: "BUSINESS",
                  w1: "First clicks proven",
                  w2: "Traffic patterns clear",
                  w3: "Partnerships start",
                  w4: "Active revenue streams",
                  final: "Dual monetization model",
                },
                {
                  pillar: "INDEPENDENCE",
                  w1: "Playbook documented",
                  w2: "Repurposing built",
                  w3: "50% automated",
                  w4: "70% automated, team runs it",
                  final: "Not founder-dependent",
                },
              ].map((row, i) => (
                <motion.tr
                  key={row.pillar}
                  variants={fadeIn}
                  className={i % 2 === 0 ? "bg-zinc-100/70 dark:bg-zinc-900/30" : ""}
                >
                  <td className="py-2.5 px-2 text-zinc-800 dark:text-zinc-200 font-semibold">
                    {row.pillar}
                  </td>
                  <td className="py-2.5 px-2">{row.w1}</td>
                  <td className="py-2.5 px-2">{row.w2}</td>
                  <td className="py-2.5 px-2">{row.w3}</td>
                  <td className="py-2.5 px-2">{row.w4}</td>
                  <td className="py-2.5 px-2 text-teal-600 dark:text-teal-400 font-medium">
                    {row.final}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* ─────────────────────────────────────────────────────────────────────── */}
      {/* WHY YOU CAN'T SKIP */}
      {/* ─────────────────────────────────────────────────────────────────────── */}
      <motion.section variants={fadeIn} className="space-y-3">
        <h4 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
          Why You Can&apos;t Skip Steps
        </h4>
        <ul className="space-y-2 text-[14px]">
          {[
            {
              skip: "Win #1",
              result: "No proven format → scale random content → waste $10K–20K",
            },
            {
              skip: "Win #2",
              result: "Wrong audience → monetization fails (they don't buy)",
            },
            {
              skip: "Win #3",
              result: "Stuck on 1 platform → algorithm change kills you",
            },
            {
              skip: "Win #4",
              result: "Still founder-dependent → business dies if you step away",
            },
          ].map((item, i) => (
            <motion.li
              key={i}
              variants={fadeIn}
              className="flex items-start gap-2"
            >
              <span className="text-red-500 dark:text-red-400 font-medium shrink-0">
                Skip {item.skip}?
              </span>
              <span className="text-zinc-600 dark:text-zinc-400">{item.result}</span>
            </motion.li>
          ))}
        </ul>
      </motion.section>
    </motion.div>
  );
}
