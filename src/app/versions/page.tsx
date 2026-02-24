"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function VersionsPage() {
  const versions = [
    {
      number: "01",
      title: "LIQUID MORPHING",
      subtitle: "Editorial Elegance",
      description: "Continuous scroll with smooth parallax, serif typography (Playfair Display), scroll-triggered reveals. Projects alternate left/right with color overlays. Services as flowing timeline.",
      href: "/1",
      color: "from-cyan-500/20 to-blue-500/20",
      keywords: ["Scroll Progress", "Serif Typography", "Editorial", "Smooth Parallax"],
      vibe: "Luxury Magazine"
    },
    {
      number: "02",
      title: "KINETIC TYPOGRAPHY",
      subtitle: "Chaotic Energy",
      description: "Massive bold text (Syne), scattered floating projects with rotation, scroll velocity effects. Services with huge numbers. Tech as power bars. MTV meets editorial.",
      href: "/2",
      color: "from-purple-500/20 to-pink-500/20",
      keywords: ["Bold Typography", "Scattered Layout", "High Energy", "Data Viz"],
      vibe: "Modern Chaos"
    },
    {
      number: "03",
      title: "ARCHITECTURAL MINIMAL",
      subtitle: "Brutalist Precision",
      description: "Grid-based (12-col), horizontal scrolling gallery, hoverable service blocks, progress bars for tech. Numbered sections. Clean sans-serif (Work Sans).",
      href: "/3",
      color: "from-green-500/20 to-emerald-500/20",
      keywords: ["Grid System", "Horizontal Scroll", "Minimal", "Data Driven"],
      vibe: "Bauhaus Digital"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Link href="/" className="text-sm text-cyan-400 hover:text-cyan-300 mb-4 inline-block">
            ← Back to Original
          </Link>
          <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">
            Three Design Directions
          </h1>
          <p className="text-xl text-white/60 max-w-3xl">
            Each version represents a completely different creative approach—from editorial elegance to chaotic energy to brutalist precision.
            <span className="block mt-2 text-cyan-400">No generic cards. No snap scrolling. Pure creativity.</span>
          </p>
        </motion.div>

        {/* Version Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {versions.map((version, index) => (
            <motion.div
              key={version.number}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={version.href}>
                <div className="group relative h-full border border-white/10 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${version.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                  <div className="relative p-8">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="text-cyan-400 text-xs tracking-[0.3em] font-mono">
                        VERSION {version.number}
                      </div>
                      <div className="text-6xl font-bold text-white/5 group-hover:text-cyan-400/10 transition-colors">
                        {version.number}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold mb-2 group-hover:text-cyan-400 transition-colors tracking-tight">
                      {version.title}
                    </h2>
                    <div className="text-sm text-white/60 mb-4 italic">
                      "{version.subtitle}"
                    </div>

                    {/* Vibe Badge */}
                    <div className="inline-block px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold mb-6">
                      {version.vibe}
                    </div>

                    {/* Description */}
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      {version.description}
                    </p>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {version.keywords.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-2 py-1 bg-white/5 border border-white/10 text-xs text-white/60"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold group-hover:gap-4 transition-all">
                      <span>VIEW VERSION</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Key Differences */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border border-white/10 p-12 bg-white/5 mb-20"
        >
          <h2 className="text-4xl font-bold mb-12 tracking-tight">Key Differences</h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Version 1</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li>✓ Smooth scroll progress animations</li>
                <li>✓ Editorial serif typography</li>
                <li>✓ Alternating project layouts</li>
                <li>✓ Timeline-style services</li>
                <li>✓ Custom cursor animation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Version 2</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li>✓ Kinetic text responds to scroll</li>
                <li>✓ Scattered floating projects</li>
                <li>✓ Bold Syne typography</li>
                <li>✓ Power bar tech visualization</li>
                <li>✓ High energy animations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4">Version 3</h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li>✓ 12-column grid system</li>
                <li>✓ Horizontal scroll projects</li>
                <li>✓ Hoverable service blocks</li>
                <li>✓ Progress bar animations</li>
                <li>✓ Numbered section markers</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* What's Gone */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border-l-4 border-cyan-400 pl-8 py-6 mb-20 bg-cyan-400/5"
        >
          <h3 className="text-2xl font-bold mb-4">What We Eliminated</h3>
          <div className="grid md:grid-cols-2 gap-4 text-white/70">
            <div>
              <div className="font-bold text-white mb-2">❌ No Snap Scrolling</div>
              <p className="text-sm">Replaced with smooth continuous scroll or horizontal galleries</p>
            </div>
            <div>
              <div className="font-bold text-white mb-2">❌ No Generic Cards</div>
              <p className="text-sm">Each version has unique project presentation styles</p>
            </div>
            <div>
              <div className="font-bold text-white mb-2">❌ No Boring "What We Do"</div>
              <p className="text-sm">Services shown as timelines, blocks, or massive typography</p>
            </div>
            <div>
              <div className="font-bold text-white mb-2">❌ No Plain Tech Stack</div>
              <p className="text-sm">Visualized as power bars, data grids, or progress indicators</p>
            </div>
          </div>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="overflow-x-auto"
        >
          <table className="w-full text-sm border border-white/10">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="text-left p-4 text-white/60 font-normal">Feature</th>
                <th className="text-left p-4">Version 1</th>
                <th className="text-left p-4">Version 2</th>
                <th className="text-left p-4">Version 3</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/10">
                <td className="p-4 text-white/60">Typography</td>
                <td className="p-4">Playfair Display (Serif)</td>
                <td className="p-4">Syne (Bold Sans)</td>
                <td className="p-4">Work Sans (Light)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 text-white/60">Portfolio Style</td>
                <td className="p-4">Alternating 2-col</td>
                <td className="p-4">Scattered floating</td>
                <td className="p-4">Horizontal scroll</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 text-white/60">Services</td>
                <td className="p-4">Timeline with borders</td>
                <td className="p-4">Massive numbers + text</td>
                <td className="p-4">Grid blocks + metrics</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 text-white/60">Tech Stack</td>
                <td className="p-4">Not shown separately</td>
                <td className="p-4">Power bars (0-100)</td>
                <td className="p-4">Progress bars + %</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 text-white/60">Energy Level</td>
                <td className="p-4 text-cyan-400">Calm & Elegant</td>
                <td className="p-4 text-purple-400">High & Chaotic</td>
                <td className="p-4 text-green-400">Precise & Minimal</td>
              </tr>
              <tr>
                <td className="p-4 text-white/60">Best For</td>
                <td className="p-4">Luxury brands</td>
                <td className="p-4">Bold agencies</td>
                <td className="p-4">Tech companies</td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* Footer */}
        <div className="mt-20 text-center text-white/40 text-sm">
          <p>All versions: Next.js 16 + Framer Motion + TypeScript</p>
          <p className="mt-2">Unique typography • No generic components • Production-ready</p>
        </div>
      </div>

      <style jsx global>{`
        * {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
      `}</style>
    </div>
  );
}
