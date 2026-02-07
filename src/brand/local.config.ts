/**
 * Local-Level Brand Configuration
 * Project-specific overrides - highest priority in hierarchy
 * Path: ./brand.config.ts (analogous to .git/config)
 * 
 * This file lives in your project root and overrides both
 * system and global configurations for this specific project.
 */

import { BrandConfig, ContentPillar, VisualDirection } from "./types";

/**
 * Project-specific brand configuration
 * This is where you define brand settings specific to this client/project
 */
export const localBrandConfig: Partial<BrandConfig> = {
  // Project name - overrides the default
  name: "Friendroid",
  
  // Project description
  description: "Robotics brand focused on human-centered technology for families",

  // Override colors for this specific project
  colors: {
    primary: "#2dd4bf",     // teal-400 (Friendroid's accent)
    secondary: "#c084fc",  // purple-400
    accent: "#fbbf24",     // amber-400
    background: "#09090b",  // zinc-950
    surface: "#18181b",     // zinc-900
    text: "#fafafa",        // zinc-50
    textMuted: "#a1a1aa",   // zinc-400
    success: "#4ade80",     // green-400
    warning: "#facc15",     // yellow-400
    error: "#f87171",       // red-400
  },

  // Project-specific voice
  voice: {
    tone: ["human", "approachable", "curious", "optimistic"],
    wordsToUse: [
      "time back",
      "family",
      "effortless",
      "intuitive",
      "smart",
      "helpful",
      "life",
    ],
    wordsToAvoid: [
      "complex",
      "technical",
      "engineering",
      "complicated",
      "difficult",
      "overwhelming",
    ],
    personality: "A helpful friend who makes technology work for families, not the other way around",
  },

  // Content pillars for this project
  pillars: [
    {
      id: "news-decoded",
      name: "Robotics News Decoded",
      role: "Authority pillar",
      description: "Fast news breakdowns focused on real consumer impact",
      examples: ["Launch reactions", "Feature implications", "Consumer impact"],
      color: "#2dd4bf",
    },
    {
      id: "time-back",
      name: "Time-Back Tutorials",
      role: "Utility pillar",
      description: "Practical guides built to save time, not showcase specs",
      examples: ["Setup walkthroughs", "Automation workflows", "Daily-use tips"],
      color: "#c084fc",
    },
    {
      id: "real-life",
      name: "Real-Life Use Cases",
      role: "Trust pillar",
      description: "Proof stories that show robotics in real homes and routines",
      examples: ["Day-in-life formats", "Before/after routines", "Family productivity wins"],
      color: "#fbbf24",
    },
    {
      id: "buying-intel",
      name: "Smart Buying Intelligence",
      role: "Conversion pillar",
      description: "Clear comparisons and reviews that drive confident choices",
      examples: ["Product reviews", "Feature trade-offs", "Best-for scenarios"],
      color: "#4ade80",
    },
  ] as ContentPillar[],

  // Visual direction for this project
  visual: {
    do: [
      "Clean typography with strong hierarchy",
      "High contrast for readability",
      "Smooth transitions that feel intentional",
      "Premium, cinematic feel for emotional content",
      "Fast cuts with on-screen text for news content",
    ],
    dont: [
      "Overuse of effects or filters",
      "Cluttered layouts with too much text",
      "Low-quality stock footage",
      "Technical jargon in visuals",
      "Overly robotic or sterile imagery",
    ],
    contentStyles: [
      { type: "News posts", style: "Fast cuts, on-screen text, energetic music" },
      { type: "Educational", style: "Slower pacing, clear visuals, explanatory voice" },
      { type: "Emotional", style: "Cinematic b-roll, soft music, minimal text" },
    ],
    references: [
      "Clean tech aesthetic with cinematic depth",
      "Kinetic typography overlays",
      "Lower thirds information hierarchy",
      "Premium color grading consistency",
    ],
  } as VisualDirection,

  _source: "local",
  _path: "./brand.config.ts",
};
