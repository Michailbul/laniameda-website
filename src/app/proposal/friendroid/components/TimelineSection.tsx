"use client";

import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { Section } from "./shared";

const timelineEntries: TimelineEntry[] = [
  {
    title: "Pilot → Scale Roadmap",
    content: (
      <p className="text-muted text-sm md:text-base max-w-xl">
        step-by-step next phase plan (no pricing here)
      </p>
    ),
  },
  {
    title: "Expand to more platforms",
    content: (
      <p className="text-muted text-sm md:text-base max-w-xl">
        Expand to more platforms <span className="text-black">only after proof</span>
      </p>
    ),
  },
  {
    title: "Build repurposing",
    content: (
      <p className="text-muted text-sm md:text-base max-w-xl">
        Build repurposing: <span className="text-black">one insight → multiple assets</span>
      </p>
    ),
  },
  {
    title: "Keep the loop going",
    content: (
      <p className="text-muted text-sm md:text-base max-w-xl">
        Keep the loop going:{" "}
        <span className="text-black">
          test → measure → double down → iterate
        </span>{" "}
        (manual first, AI automation later)
      </p>
    ),
  },
];

export function TimelineSection() {
  return (
    <Section id="timeline" className="bg-white px-0">
      <Timeline
        data={timelineEntries}
        heading="Whats next? (timeline)"
        subheading="Pilot → Scale Roadmap"
      />
    </Section>
  );
}
