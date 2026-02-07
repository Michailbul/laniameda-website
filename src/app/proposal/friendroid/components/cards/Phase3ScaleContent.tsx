"use client";

import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ContentMarketFit() {
  return (
    <div data-magnetic="false">
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-6">
        <p className="text-lg font-medium text-zinc-900 dark:text-white">
          Content Market Fit (CMF)
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          At this stage, we are shifting our attention towards a more value approach and building the connection with the audience instead of chasing reaches while gradually bleeding in this more valuable content for users.
        </p>

        <h4 className="text-zinc-900 dark:text-white font-semibold mt-4">Value-Driven Content Foundation</h4>
        <p className="text-zinc-700 dark:text-zinc-300">
          This valuable content — more value-driven content — we already have in place because we already outlined this idea in the strategic creative treatment package where we tagged this content type as educational and we have a set of ideas that we might be working on, might grab and implement based on our research previous in discovery package.
        </p>
        <p className="text-zinc-700 dark:text-zinc-300">
          For example, such thing would be like creating the talking avatar head, creating talking avatar head that explains how to use AI tools or generative AI tools using the branded colors or branded character of the Friendroid brand visuals.
        </p>

        <h4 className="text-zinc-900 dark:text-white font-semibold mt-4">Engagement-Driven Automation</h4>
        <p className="text-zinc-700 dark:text-zinc-300">
          At this stage, the content begins to be more engagement driven using automation to get more, to collect newsletters, to collect attention, to provide value to the audience, to begin working on the educational content using the Instagram automations and code words.
        </p>

        <h4 className="text-zinc-900 dark:text-white font-semibold mt-4">What Changes</h4>
        <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
          <li>Less focus on raw reach metrics, more on meaningful engagement</li>
          <li>Educational content takes center stage</li>
          <li>Building genuine audience relationships over viral hits</li>
          <li>Instagram automations and code words for lead capture</li>
          <li>Newsletter collection and audience nurturing</li>
        </ul>

        <h4 className="text-zinc-900 dark:text-white font-semibold mt-4">Deliverables</h4>
        <ol className="list-decimal pl-5 space-y-2 text-zinc-700 dark:text-zinc-300">
          <li>
            <strong className="text-zinc-900 dark:text-white">Educational Content Library</strong> — Value-driven pieces that establish authority
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-white">Automation Systems</strong> — Instagram automations and code words for engagement
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-white">Lead Capture Funnel</strong> — Newsletter collection and audience nurturing workflows
          </li>
          <li>
            <strong className="text-zinc-900 dark:text-white">Brand Character Assets</strong> — Talking avatar and visual content system
          </li>
        </ol>

        <h4 className="text-zinc-900 dark:text-white font-semibold mt-4">Outcome</h4>
        <p className="text-lg font-medium text-teal-600 dark:text-teal-400">
          Audience connection established, value-driven content engine running, qualified leads flowing.
        </p>
      </motion.div>
    </div>
  );
}
