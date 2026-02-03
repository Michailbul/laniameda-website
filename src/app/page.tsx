"use client";

import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Card from '@/components/Card';
import { motion } from 'framer-motion';
import {
  Rocket,
  Target,
  Zap,
  Repeat,
  Layers,
  TrendingUp,
  CheckCircle2,
  BarChart3,
  Users
} from 'lucide-react';

export default function Home() {
  return (
    <main className="snap-container bg-black text-white selection:bg-cyan-300 selection:text-black">
      <Hero />

      {/* BELIEFS SECTION */}
      <Section id="purpose" className="bg-black relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
              WE BELIEVE
            </h2>
            <div className="space-y-6 text-xl md:text-2xl font-light text-gray-300 leading-relaxed">
              <p>
                The right way to build a brand is to provide <span className="text-white font-medium">value</span> to the audience.
              </p>
              <p>
                Value can be emotional <span className="text-sm font-mono uppercase tracking-widest text-[#EBB987] ml-2 opacity-80">[CONNECTION]</span> or practical <span className="text-sm font-mono uppercase tracking-widest text-[#98F4F9] ml-2 opacity-80">[KNOWLEDGE]</span>.
              </p>
            </div>
            <div className="pt-8 border-t border-white/10">
              <h3 className="text-sm font-mono uppercase tracking-widest text-gray-500 mb-4">Current State</h3>
              <p className="text-lg text-gray-400">The audience is absent. Main objective is to find a content strategy that works and bring in results ASAP.</p>
            </div>
          </div>
          <div className="relative h-full min-h-[400px] flex items-center justify-center">
            {/* Abstract visual */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#EBB987]/10 to-[#4135CF]/10 blur-3xl rounded-full"></div>
            <div className="grid grid-cols-2 gap-4 relative z-10 w-full">
              <Card variant="glass" className="flex flex-col gap-4 items-start">
                <Target className="w-8 h-8 text-[#EBB987]" />
                <span className="font-bold">Purpose</span>
                <p className="text-sm text-gray-400">Build a connected, trusted audience in robotics.</p>
              </Card>
              <Card variant="glass" className="flex flex-col gap-4 items-start mt-8">
                <Rocket className="w-8 h-8 text-[#E26158]" />
                <span className="font-bold">Monetize</span>
                <p className="text-sm text-gray-400">Convert attention via e-shop.</p>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* STRATEGY SECTION */}
      <Section id="strategy" className="bg-zinc-950">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">STRATEGY TIMELINE</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">From validation to scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card variant="dark" className="border-l-4 border-l-[#FF6B35]">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">Short-term</h3>
                  <span className="text-xs font-mono px-2 py-1 bg-[#FF6B35]/20 text-[#FF6B35] rounded">Day 1-30</span>
                </div>
                <p className="text-gray-400 italic">Validation Phase</p>
                <ul className="space-y-3 text-sm md:text-base text-gray-300">
                  <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-[#FF6B35]" /> <span>1 Primary + 1 Secondary Channel</span></li>
                  <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-[#FF6B35]" /> <span>Identify ~20 repeatable formats</span></li>
                  <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-[#FF6B35]" /> <span>Prove 1-2 winners</span></li>
                  <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-[#FF6B35]" /> <span>Clear rules: Double down vs Kill</span></li>
                </ul>
              </div>
            </Card>

            <Card variant="dark" className="border-l-4 border-l-[#98F4F9]">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-white">Long-term</h3>
                  <span className="text-xs font-mono px-2 py-1 bg-[#98F4F9]/20 text-[#98F4F9] rounded">Scale Phase</span>
                </div>
                <p className="text-gray-400 italic">Growth Phase</p>
                <ul className="space-y-3 text-sm md:text-base text-gray-300">
                  <li className="flex gap-2"><TrendingUp className="w-5 h-5 text-[#98F4F9]" /> <span>Increase volume of winners</span></li>
                  <li className="flex gap-2"><TrendingUp className="w-5 h-5 text-[#98F4F9]" /> <span>Expand platforms only after proof</span></li>
                  <li className="flex gap-2"><TrendingUp className="w-5 h-5 text-[#98F4F9]" /> <span>Repurposing: One insight → Multiple assets</span></li>
                  <li className="flex gap-2"><TrendingUp className="w-5 h-5 text-[#98F4F9]" /> <span>Loop: Test → Measure → Double Down</span></li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* DELIVERABLES SECTION */}
      <Section id="deliverables" className="bg-black">
        <div className="w-full">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 text-center">DELIVERABLES <span className="text-gray-600 block text-lg font-normal mt-2">What exists after 5 days.</span></h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Hypotheses Library",
                icon: Layers,
                desc: "Ranked list of content strategies based on performance from adjacent niches.",
                items: ["Formats", "Channel Placement", "Hooks", "Effort Level"]
              },
              {
                title: "Hook Bank",
                icon: Zap,
                desc: "20-40 patterns that translate into robotics content.",
                items: ["Adaptation Notes", "References", "Pattern Analysis"]
              },
              {
                title: "Repurposing System",
                icon: Repeat,
                desc: "Recipe to turn one insight into multiple assets.",
                items: ["Hero Video", "Carousel", "Credibility Post"]
              },
              {
                title: "Brand Kernel",
                icon: Users,
                desc: "Small, practical identity guide.",
                items: ["We believe...", "Tone guide", "Soundbites"]
              },
              {
                title: "Recommended System",
                icon: BarChart3,
                desc: "Immediate execution plan.",
                items: ["Hero Format", "Support Format", "Controlled Experiments"]
              },
              {
                title: "Visual Direction",
                icon: CheckCircle2,
                desc: "Rules for consistency, not full branding.",
                items: ["Typography refs", "Edit rhythm", "Avoidance rules"]
              }
            ].map((item, i) => (
              <Card key={i} variant="dark" className="group hover:bg-zinc-900/80">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-white/5 rounded-lg group-hover:bg-[#98F4F9]/20 transition-colors">
                    <item.icon className="w-6 h-6 text-gray-300 group-hover:text-[#98F4F9]" />
                  </div>
                  <span className="text-xs font-mono text-gray-600">0{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 mb-4 h-10">{item.desc}</p>
                <ul className="text-xs text-gray-500 space-y-1 pt-4 border-t border-white/5">
                  {item.items.map((sub, j) => (
                    <li key={j}>• {sub}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* METRICS & NEXT */}
      <Section className="bg-gradient-to-b from-zinc-950 to-black">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-5xl">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">DECISION FRAMEWORK</h2>
            <div className="space-y-6">
              <div className="p-4 border-l-2 border-green-500 bg-green-500/5">
                <h4 className="font-bold text-green-400 mb-1">Double Down</h4>
                <p className="text-sm text-gray-400">Above baseline on saves/shares.</p>
              </div>
              <div className="p-4 border-l-2 border-yellow-500 bg-yellow-500/5">
                <h4 className="font-bold text-yellow-400 mb-1">Iterate</h4>
                <p className="text-sm text-gray-400">Weak retention? Change hook/structure.</p>
              </div>
              <div className="p-4 border-l-2 border-red-500 bg-red-500/5">
                <h4 className="font-bold text-red-400 mb-1">Kill</h4>
                <p className="text-sm text-gray-400">No signal after enough tries.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-bold">NEXT STEPS</h2>
            <ol className="space-y-6 list-none relative">
              <div className="absolute left-[15px] top-4 bottom-4 w-[1px] bg-white/10"></div>
              {[
                "Select highest-potential hypotheses",
                "Run pilot & review weekly",
                "Winners get volume, losers get cut",
                "Operate 70/20/10 model",
                "Scale step-by-step"
              ].map((step, i) => (
                <li key={i} className="relative pl-10">
                  <div className="absolute left-0 top-1 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 border border-white/20 text-xs font-mono z-10">
                    {i + 1}
                  </div>
                  <p className="text-lg text-gray-300">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-[#EBB987] via-[#E26158] to-[#4135CF]">
            <button className="px-8 py-3 rounded-full bg-black text-white font-bold tracking-wide uppercase hover:bg-zinc-900 transition-colors">
              Start Project
            </button>
          </div>
        </div>
      </Section>
    </main>
  );
}
