"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import * as React from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export function Timeline({
  data,
  heading,
  subheading,
  className,
}: {
  data: TimelineEntry[];
  heading?: string;
  subheading?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const targetRef = React.useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = React.useRef<HTMLElement | null>(null);
  const [height, setHeight] = React.useState(0);

  const setTarget = React.useCallback((node: HTMLDivElement | null) => {
    targetRef.current = node;
    if (!node) return;
    scrollContainerRef.current = node.closest(".snap-container") as HTMLElement | null;
  }, []);

  React.useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const observer = new ResizeObserver(() => {
      setHeight(element.getBoundingClientRect().height);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: targetRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className={cn("w-full font-sans md:px-10", className)}
      ref={setTarget}
    >
      {(heading || subheading) && (
        <div className="max-w-7xl mx-auto pt-16 pb-10 px-4 md:px-8 lg:px-10">
          {heading && (
            <h2 className="text-black text-[clamp(40px,5vw,64px)] font-extralight leading-[1]">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-muted text-sm md:text-base max-w-xl mt-6">
              {subheading}
            </p>
          )}
        </div>
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-border border border-border p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-semibold text-slate">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-semibold text-slate">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{ height: `${height}px` }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-border to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-cyan via-indigo to-transparent from-[0%] via-[12%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
