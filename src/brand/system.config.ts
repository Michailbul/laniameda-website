/**
 * System-Level Brand Configuration
 * Company-wide defaults - lowest priority in hierarchy
 * Path: /src/brand/system.config.ts (analogous to /etc/gitconfig)
 */

import { BrandConfig } from "./types";

export const systemBrandConfig: BrandConfig = {
  name: "Laniameda Default",
  version: "1.0.0",
  description: "System-wide default brand configuration",
  
  colors: {
    primary: "#14b8a6",    // teal-500
    secondary: "#a855f7",   // purple-500
    accent: "#f59e0b",      // amber-500
    background: "#09090b",   // zinc-950
    surface: "#18181b",      // zinc-900
    text: "#fafafa",         // zinc-50
    textMuted: "#a1a1aa",    // zinc-400
    success: "#22c55e",      // green-500
    warning: "#eab308",      // yellow-500
    error: "#ef4444",        // red-500
  },

  typography: {
    fontFamily: {
      heading: "system-ui, -apple-system, sans-serif",
      body: "system-ui, -apple-system, sans-serif",
      mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },

  borderRadius: {
    none: "0",
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },

  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
    glow: "0 0 20px rgba(20, 184, 166, 0.3)",
  },

  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      default: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      easeOut: "cubic-bezier(0, 0, 0.2, 1)",
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      spring: "cubic-bezier(0.16, 1, 0.3, 1)",
    },
  },

  voice: {
    tone: ["professional", "confident", "approachable"],
    wordsToUse: ["clarity", "precision", "partnership", "results", "growth"],
    wordsToAvoid: ["cheap", "quick fix", "guaranteed", "just", "simply"],
    personality: "Premium creative agency that delivers measurable results",
  },

  pillars: [
    {
      id: "authority",
      name: "Authority Content",
      role: "Trust builder",
      description: "Demonstrate expertise through insights and analysis",
      examples: ["Industry analysis", "Trend reports", "Expert commentary"],
      color: "#14b8a6",
    },
    {
      id: "educational",
      name: "Educational Content",
      role: "Value provider",
      description: "Teach audiences something valuable",
      examples: ["How-to guides", "Best practices", "Tool comparisons"],
      color: "#a855f7",
    },
    {
      id: "social",
      name: "Social Proof",
      role: "Credibility builder",
      description: "Show real results and satisfied clients",
      examples: ["Case studies", "Testimonials", "Results showcases"],
      color: "#f59e0b",
    },
    {
      id: "conversion",
      name: "Conversion Content",
      role: "Action driver",
      description: "Move audiences toward clear next steps",
      examples: ["Product demos", "Service breakdowns", "CTA-focused posts"],
      color: "#22c55e",
    },
  ],

  visual: {
    do: [
      "Clean typography with strong hierarchy",
      "High contrast for readability",
      "Smooth, intentional transitions",
      "Consistent spacing and alignment",
    ],
    dont: [
      "Overuse visual effects or filters",
      "Clutter layouts with too many elements",
      "Use low-quality or generic stock imagery",
      "Sacrifice readability for decoration",
    ],
    contentStyles: [
      { type: "News/Reactive", style: "Fast cuts, bold text, energetic pacing" },
      { type: "Educational", style: "Clear visuals, steady pacing, explanatory" },
      { type: "Emotional", style: "Cinematic b-roll, soft music, minimal text" },
      { type: "Conversion", style: "Direct messaging, clear CTAs, proof points" },
    ],
  },

  _source: "system",
  _path: "/src/brand/system.config.ts",
};
