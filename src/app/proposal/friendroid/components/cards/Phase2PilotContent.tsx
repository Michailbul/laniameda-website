"use client";

import { motion } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Phase2PilotContent() {
  return (
    <div data-magnetic="false">
    <motion.div variants={fadeIn} initial="hidden" animate="visible">
      <p className="text-lg font-medium text-zinc-900 dark:text-white">
        Seed stage. Spin up the content wheel to get reach.
      </p>
      <p className="text-zinc-700 dark:text-zinc-300">
        At this stage, we use the creative treatment strategy, to systematically produce content to get
        views and engagement.
      </p>

      <h4 className="text-zinc-900 dark:text-white font-semibold mt-4">What Happens</h4>
      <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
        <li>We create a visual design system: How Reels editing looks like, how carousels look like - create visual language based on the brand narrative and visual references identified in the creative treatment package </li>
        <li>We take 3 formats from the top ranked content formats from the content library from the creative treatment package</li>
        <li>We put 70% of our efforts on the first one in the list</li>
        <li>We test two platforms. Hero and Support (i.e Reels+LinkedIn) </li>
        <li>Observe data. Switch the formats if not working, by taking the next format from the creative treamtnet table</li>
        <li>Activelly engage with the audience in comments/platforms</li>        
      </ul>

      <h4 className="text-zinc-900 dark:text-white font-semibold mt-4">Execution & Volume</h4>
      <p className="text-zinc-700 dark:text-zinc-300">
        This stage runs for approximately <strong className="text-zinc-900 dark:text-white">4+1 weeks</strong>. We aim for:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-zinc-700 dark:text-zinc-300">
        <li><strong className="text-zinc-900 dark:text-white">2 content pieces/day</strong> for the Hero platform</li>
        <li><strong className="text-zinc-900 dark:text-white">1 content piece/day</strong> for the Support platform</li>
        <li>That's <strong className="text-zinc-900 dark:text-white">3 per day, 21 per week, 84 per month</strong></li>
      </ul>
      <p className="text-zinc-700 dark:text-zinc-300 mt-2">
        We iterate and adjust formats continuously to achieve an average of <strong className="text-zinc-900 dark:text-white">10K+ views</strong> per piece. Target metrics will be defined in the creative package, and we optimize by switching formats until we hit those targets. Once achieved, we shift toward more valuable content types.
      </p>
      <p className="text-zinc-700 dark:text-zinc-300 mt-2">
        At this stage, everything is done <strong className="text-zinc-900 dark:text-white">manually</strong> — no heavy AI automation. We test the pipeline by hand to learn what works and what doesn't.  
        <LinkPreview
          url="https://www.laniameda.space"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
        >
         Laniameda
        </LinkPreview>  fully covers content production and distribution.
      </p>

      <h4 className="text-zinc-900 dark:text-white font-semibold mt-4">Deliverables</h4>
      <ol className="list-decimal pl-5 space-y-2 text-zinc-700 dark:text-zinc-300">
        <li>
          <strong className="text-zinc-900 dark:text-white">80+ Content Pieces</strong> — 84 pieces per month across Hero and Support platforms
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-white">Data collected</strong> — What worked, what didn&apos;t, what formats to double down, what to cast away.
        </li>
        <li>
          <strong className="text-zinc-900 dark:text-white">Refined content strategy</strong> — Updated based on real data.
        </li>
      </ol>

      <h4 className="text-zinc-900 dark:text-white font-semibold mt-4">Outcome</h4>
      <p className="text-lg font-medium text-teal-600 dark:text-teal-400">
        Content engine in place, visual and narrative brand parts in place, views and reach established.
      </p>

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
                  if (titleEl?.textContent?.toLowerCase().includes('scale')) {
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
