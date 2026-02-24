"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { portfolioItems, type PortfolioItem } from "@/data/portfolio";
import { CategoryBadge } from "@/components/ui/category-badge";
import VideoPlayer from "@/components/ui/video-player";

function VideoSplitContent({ item }: { item: PortfolioItem }) {
  return (
    <div data-magnetic="false" className="w-full">
      {/* Side-by-side layout */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Left: Video Player */}
        <div className="flex-1 min-w-0 lg:max-w-[58%]">
          {item.videoUrl && (
            <VideoPlayer src={item.videoUrl} />
          )}
        </div>

        {/* Right: Description Panel */}
        <div className="flex-1 min-w-0 lg:max-w-[42%] space-y-6">
          {/* Category + Title block */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
              {item.category}
            </span>
            <h4 className="text-2xl font-semibold text-white mt-1">
              {item.title}
            </h4>
          </div>

          {/* Description */}
          <div
            className="text-white/60 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: item.fullDescription }}
          />

          {/* Duration / Budget / Deliverables badges */}
          {(item.duration || item.budget) && (
            <div className="flex flex-wrap gap-2">
              {item.duration && (
                <span className="px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-medium">
                  {item.duration}
                </span>
              )}
              {item.budget && (
                <span className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-medium">
                  {item.budget}
                </span>
              )}
            </div>
          )}

          {item.deliverables && (
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 block mb-1">
                Deliverables
              </span>
              <span className="text-white/70 text-sm">{item.deliverables}</span>
            </div>
          )}

          {/* Divider */}
          <div className="w-full h-px bg-white/10" />

          {/* Structured sections */}
          {item.sections?.map((section, idx) => (
            <div key={idx}>
              <div className="flex items-baseline justify-between mb-3">
                <h5 className="text-[11px] uppercase tracking-[0.2em] text-white/50 font-medium">
                  {section.title}
                </h5>
                {section.subtitle && (
                  <span className="text-[11px] text-white/40">
                    {section.subtitle}
                  </span>
                )}
              </div>

              {/* Thin top border for section */}
              <div className="w-full h-px bg-gradient-to-r from-cyan-500/40 via-cyan-500/20 to-transparent mb-3" />

              {section.items && (
                <ul className="space-y-2">
                  {section.items.map((listItem, liIdx) => (
                    <li key={liIdx} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400/60 shrink-0" />
                      {listItem}
                    </li>
                  ))}
                </ul>
              )}

              {section.content && (
                <p className="text-sm text-white/60 leading-relaxed">
                  {section.content}
                </p>
              )}
            </div>
          ))}

          {/* Divider */}
          <div className="w-full h-px bg-white/10" />

          {/* Technology tags */}
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Client + Year */}
          {item.client && (
            <p className="text-xs text-white/40">
              Client: {item.client} &bull; {item.year}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function DefaultContent({ item }: { item: PortfolioItem }) {
  return (
    <div data-magnetic="false" className="space-y-6">
      {item.videoUrl && (
        <video controls className="w-full rounded-lg" playsInline>
          <source src={item.videoUrl} type="video/mp4" />
        </video>
      )}
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: item.fullDescription }}
      />
      <div className="flex flex-wrap gap-2">
        {item.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400"
          >
            {tech}
          </span>
        ))}
      </div>
      {item.client && (
        <p className="text-sm text-white/50">
          Client: {item.client} &bull; {item.year}
        </p>
      )}
    </div>
  );
}

export function PortfolioSection() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <section className="dark relative z-40 h-screen overflow-y-auto px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.55 }}
          className="mb-16 text-center"
        >
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-medium uppercase leading-[0.9] tracking-[0.08em]">
            Our Work
          </h2>
          <p className="mt-4 text-lg text-white/60">
            AI-powered creative projects that push boundaries
          </p>
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ExpandableCard
                title={item.title}
                src={item.thumbnail}
                description={item.description}
                badge={<CategoryBadge category={item.category} />}
                className="h-[480px]"
                classNameExpanded={
                  item.layout === "video-split"
                    ? "!max-w-[1200px]"
                    : undefined
                }
                hideBottomBlurOnExpand={item.layout === "video-split"}
                onActiveChange={(active) => {
                  setActiveModal(active ? item.id : null);
                  if (active) document.body.style.overflow = "hidden";
                  else document.body.style.overflow = "";
                }}
              >
                {item.layout === "video-split" ? (
                  <VideoSplitContent item={item} />
                ) : (
                  <DefaultContent item={item} />
                )}
              </ExpandableCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
