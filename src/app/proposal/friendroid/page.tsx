"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Section wrapper with snap and entrance animation
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <section
      ref={ref}
      id={id}
      className={`snap-section flex flex-col justify-center ${className}`}
    >
      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Staggered children animation
function Stagger({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Navigation dots
function NavDots({ sections, activeIndex }: { sections: string[]; activeIndex: number }) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {sections.map((section, i) => (
        <a
          key={section}
          href={`#${section}`}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            activeIndex === i
              ? "bg-cyan scale-150"
              : "bg-white/30 hover:bg-white/60"
          }`}
          title={section}
        />
      ))}
    </div>
  );
}

const deliverables = [
  { id: "A", title: "Content Experiments Table", desc: "Notion database with hypotheses" },
  { id: "B", title: "Hook Bank", desc: "20-40 ready variations" },
  { id: "C", title: "Hero + Support Formats", desc: "Growth driver + trust builder" },
  { id: "D", title: "Repurpose Map", desc: "1 topic → 3 formats" },
  { id: "E", title: "Content Mix 7/2/1", desc: "Core, support, experiment" },
  { id: "F", title: "Brand Kernel", desc: "Voice & soundbites" },
  { id: "G", title: "Visual Direction", desc: "References & rules" },
  { id: "H", title: "Decision Rules", desc: "Metrics system" },
];

export default function FriendroidProposal() {
  const [activeSection, setActiveSection] = useState(0);
  const [hoveredDeliverable, setHoveredDeliverable] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sections = ["hero", "goal", "package", "deliverables", "method", "timeline", "pricing"];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop;
      const windowHeight = window.innerHeight;
      const index = Math.round(scrollPos / windowHeight);
      setActiveSection(index);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="snap-container">
      <NavDots sections={sections} activeIndex={activeSection} />

      {/* Fixed Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <span className="text-white text-sm font-medium tracking-wider">
            LANIAMEDA
          </span>
          <div className="glass pill px-6 py-2.5 flex items-center gap-8">
            {["Package", "Deliverables", "Timeline"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/70 text-sm hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href="#pricing"
              className="text-cyan text-sm font-medium hover:text-white transition-colors"
            >
              Start Project
            </a>
          </div>
        </div>
      </motion.nav>

      {/* HERO - Gradient */}
      <section id="hero" className="snap-section hero-gradient relative flex flex-col justify-center items-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 max-w-[1000px] mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="inline-block mb-8"
          >
            <span className="text-white/90 text-xs tracking-[0.4em] uppercase font-medium border border-white/20 px-4 py-2 rounded-full">
              Proposal for Friendroid
            </span>
          </motion.div>

          <h1 className="text-white text-[clamp(56px,10vw,120px)] font-extralight leading-[0.85] tracking-[-0.03em] mb-10">
            Creative
            <br />
            <span className="font-light">Treatment</span>
            <br />
            Package
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-white/70 text-xl font-light mb-8 max-w-[500px] mx-auto">
              Pre-launch audience system for Robots Retail
            </p>
            <div className="flex items-baseline justify-center gap-4">
              <span className="text-white text-6xl font-extralight">$1,000</span>
              <span className="text-white/50 text-xl">/</span>
              <span className="text-white/70 text-xl">5 days</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/40 text-xs tracking-widest uppercase"
          >
            Scroll
          </motion.div>
        </motion.div>
      </section>

      {/* GOAL - Dark with grid */}
      <Section id="goal" className="bg-black space-grid px-6">
        <div className="max-w-[1100px] mx-auto">
          <Stagger>
            <StaggerItem>
              <span className="text-cyan text-xs tracking-[0.3em] uppercase font-medium">
                The Goal
              </span>
            </StaggerItem>
            <StaggerItem>
              <h2 className="text-white text-[clamp(40px,6vw,72px)] font-extralight leading-[1] mt-6 mb-4">
                Build a high-value
                <br />
                <span className="text-cyan">audience</span> before launch
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-white/50 text-xl font-light max-w-[500px] mt-8">
                So when your product arrives, trust is already there.
              </p>
            </StaggerItem>
          </Stagger>

          <div className="grid grid-cols-3 gap-8 mt-20">
            {[
              { num: "01", title: "Trust", desc: "Brand credibility on day one" },
              { num: "02", title: "Association", desc: "First name in robotics" },
              { num: "03", title: "Clarity", desc: "Know what scales" },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="card-dark p-6 group"
              >
                <span className="text-cyan/60 font-mono text-xs">{item.num}</span>
                <h3 className="text-white text-xl font-light mt-3 group-hover:text-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* PACKAGE - White */}
      <Section id="package" className="bg-white px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-indigo text-xs tracking-[0.3em] uppercase font-medium">
                What You're Buying
              </span>
              <h2 className="text-black text-[clamp(48px,6vw,80px)] font-extralight leading-[0.95] mt-6">
                Creative
                <br />
                Treatment
              </h2>
              <p className="text-muted text-lg mt-8 max-w-[400px]">
                Not ideas for the sake of ideas. A{" "}
                <span className="text-black font-medium">concrete action plan</span> +
                decision rules for the first 30 days.
              </p>
              <div className="flex gap-3 mt-8">
                {["Notion", "Database", "Strategy Call"].map((tag) => (
                  <span
                    key={tag}
                    className="pill border border-border text-muted text-sm px-4 py-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center md:text-right">
              <span className="text-[clamp(80px,12vw,140px)] font-extralight text-black leading-none">
                $1,000
              </span>
              <div className="flex items-center gap-4 justify-center md:justify-end mt-4">
                <span className="text-muted">fixed</span>
                <span className="w-12 h-px bg-border" />
                <span className="text-muted">5 days</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* DELIVERABLES - Orange Gradient */}
      <Section id="deliverables" className="gradient-orange px-6">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <span className="text-white/80 text-xs tracking-[0.3em] uppercase font-medium">
            Deliverables
          </span>
          <h2 className="text-white text-[clamp(40px,5vw,64px)] font-extralight leading-[1] mt-6 mb-16">
            What you get
          </h2>

          <div className="grid grid-cols-4 gap-4">
            {deliverables.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onMouseEnter={() => setHoveredDeliverable(item.id)}
                onMouseLeave={() => setHoveredDeliverable(null)}
                className={`glass p-6 cursor-default transition-all duration-300 ${
                  hoveredDeliverable === item.id ? "scale-105 bg-white/20" : ""
                }`}
              >
                <span className="text-white/60 font-mono text-xs">{item.id}</span>
                <h3 className="text-white text-lg font-medium mt-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* METHOD - Dark */}
      <Section id="method" className="bg-charcoal space-grid px-6">
        <div className="max-w-[1100px] mx-auto">
          <span className="text-cyan text-xs tracking-[0.3em] uppercase font-medium">
            Prioritization
          </span>
          <h2 className="text-white text-[clamp(40px,5vw,64px)] font-extralight leading-[1] mt-6 mb-20">
            The 70 / 20 / 10 rule
          </h2>

          <div className="flex items-end justify-between gap-8">
            {[
              { num: 70, label: "Repeat", desc: "Scale winners", color: "cyan" },
              { num: 20, label: "Improve", desc: "Iterate structure", color: "white" },
              { num: 10, label: "Test", desc: "Experiments only", color: "orange" },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex-1 text-center"
              >
                <span
                  className="text-[clamp(80px,15vw,160px)] font-extralight leading-none"
                  style={{ color: `var(--${item.color})` }}
                >
                  {item.num}
                </span>
                <p className="text-white font-medium text-lg mt-4">{item.label}</p>
                <p className="text-white/40 text-sm mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* TIMELINE - White */}
      <Section id="timeline" className="bg-white px-6">
        <div className="max-w-[1100px] mx-auto">
          <span className="text-indigo text-xs tracking-[0.3em] uppercase font-medium">
            Timeline
          </span>
          <h2 className="text-black text-[clamp(40px,5vw,64px)] font-extralight leading-[1] mt-6 mb-16">
            5 days to system
          </h2>

          <div className="flex gap-4">
            {[
              { day: "01", title: "Foundation", desc: "Data & structure" },
              { day: "02", title: "Build", desc: "Hooks & hypotheses" },
              { day: "03", title: "Build", desc: "Refine priorities" },
              { day: "04", title: "Systematize", desc: "Maps & metrics" },
              { day: "05", title: "Deliver", desc: "Notion + call" },
            ].map((item, i) => (
              <motion.div
                key={item.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex-1 border border-border p-6 rounded-2xl hover:border-indigo hover:shadow-lg transition-all group"
              >
                <span className="font-mono text-indigo text-2xl">{item.day}</span>
                <h3 className="text-black text-lg font-medium mt-4 group-hover:text-indigo transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted text-sm mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* PRICING - Dark gradient */}
      <Section id="pricing" className="bg-black space-grid px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="border border-cyan/30 rounded-3xl p-16 border-pulse"
          >
            <span className="text-cyan text-xs tracking-[0.3em] uppercase font-medium">
              Let's Build
            </span>
            <h2 className="text-white text-[clamp(48px,8vw,96px)] font-extralight leading-[0.9] mt-6">
              Ready to
              <br />
              <span className="text-glow">launch?</span>
            </h2>

            <div className="flex items-baseline justify-center gap-4 mt-12">
              <span className="text-white text-7xl font-extralight">$1,000</span>
              <span className="text-white/40 text-xl">fixed</span>
            </div>
            <p className="text-white/40 text-lg mt-2">5 working days</p>

            <motion.a
              href="mailto:hello@laniameda.com?subject=Friendroid%20Creative%20Treatment%20Package"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block mt-12 bg-cyan text-black font-medium tracking-wide px-12 py-4 rounded-full glow-cyan"
            >
              Start Project
            </motion.a>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="max-w-[1100px] mx-auto mt-20 pt-8 border-t border-white/10 flex items-center justify-between">
          <span className="text-white/60 text-sm">LANIAMEDA</span>
          <span className="text-white/40 text-sm">AI Creative Marketing Studio</span>
          <span className="text-white/40 text-sm">2025</span>
        </div>
      </Section>
    </div>
  );
}
