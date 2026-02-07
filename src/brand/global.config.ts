/**
 * Global-Level Brand Configuration
 * Agency/team customizations - overrides system defaults
 * Path: ~/.config/laniameda/brand.config.ts (analogous to ~/.gitconfig)
 * 
 * This is where you set your agency's default brand settings
 * that apply across all projects unless overridden locally.
 */

import { BrandConfig } from "./types";

/**
 * Example global configuration - uncomment and modify as needed
 * This would typically live in the user's home directory
 * at ~/.config/laniameda/brand.config.ts
 */
export const globalBrandConfig: Partial<BrandConfig> = {
  // Override default colors with your agency palette
  // colors: {
  //   primary: "#0ea5e9",     // sky-500
  //   secondary: "#8b5cf6",   // violet-500
  //   accent: "#f97316",      // orange-500
  //   background: "#0f0f11",
  //   surface: "#1a1a1e",
  //   text: "#fafafa",
  //   textMuted: "#9ca3af",
  //   success: "#10b981",
  //   warning: "#f59e0b",
  //   error: "#ef4444",
  // },

  // Override typography with your preferred fonts
  // typography: {
  //   fontFamily: {
  //     heading: "Inter, system-ui, sans-serif",
  //     body: "Inter, system-ui, sans-serif",
  //     mono: "JetBrains Mono, ui-monospace, monospace",
  //   },
  // },

  // Override brand voice for your agency style
  // voice: {
  //   tone: ["bold", "direct", "expert"],
  //   wordsToUse: ["strategy", "execution", "growth", "partnership"],
  //   wordsToAvoid: ["cheap", "quick", "easy", "just"],
  //   personality: "Strategic partner who delivers results",
  // },

  _source: "global",
  _path: "~/.config/laniameda/brand.config.ts",
};

// Default empty global config - returns empty object if file doesn't exist
export const getGlobalBrandConfig = (): Partial<BrandConfig> => {
  return {};
};
