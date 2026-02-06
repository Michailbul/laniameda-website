"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe } from "@/components/ui/cosmic-404";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

const globeVariants = {
  hidden: { scale: 0.85, opacity: 0, y: 10 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
  floating: {
    y: [-4, 4],
    transition: {
      duration: 5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export interface NotFoundProps {
  title?: string;
  description?: string;
  backText?: string;
}

export default function NotFound({
  title = "Oops! Lost in space",
  description = "We couldn't find the page you're looking for. It might have been moved or deleted.",
  backText = "Go Back",
}: NotFoundProps) {
  return (
    <div className="flex flex-col justify-center items-center px-4 min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          className="text-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeUp}
        >
          <div className="flex items-center justify-center gap-6 mb-10">
            <motion.span
              className="text-7xl md:text-8xl font-bold text-foreground/80 select-none"
              variants={fadeUp}
            >
              4
            </motion.span>

            <motion.div
              className="relative w-24 h-24 md:w-32 md:h-32"
              variants={globeVariants}
              animate={["visible", "floating"]}
            >
              <Globe />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.08)_0%,transparent_70%)]" />
            </motion.div>

            <motion.span
              className="text-7xl md:text-8xl font-bold text-foreground/80 select-none"
              variants={fadeUp}
            >
              4
            </motion.span>
          </div>

          <motion.h1
            className="mb-4 text-3xl md:text-5xl font-semibold tracking-tight text-foreground"
            variants={fadeUp}
          >
            {title}
          </motion.h1>

          <motion.p
            className="mx-auto mb-10 max-w-md text-base md:text-lg text-muted-foreground/70"
            variants={fadeUp}
          >
            {description}
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link href="/">
              <Button className="gap-2 hover:scale-105 transition-all duration-500 cursor-pointer">
                <ArrowLeftIcon className="w-5 h-5" />
                {backText}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
