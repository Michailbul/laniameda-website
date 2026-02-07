"use client";

/**
 * Example: Using the Brand Configuration System
 * 
 * This demonstrates how to use the hierarchical brand config
 * in your React components with the Git-style precedence pattern.
 */

import { brand, brandColors, brandVoice, brandPillars, getBrandValue, getValueSource } from "@/brand";
import { BrandProvider, useBrand, useBrandStyles } from "@/brand/react";

// ═══════════════════════════════════════════════════════════════════════════════
// EXAMPLE 1: Direct imports (simplest approach)
// ═══════════════════════════════════════════════════════════════════════════════

export function BrandBadge() {
  // Direct access to merged config
  return (
    <span 
      className="px-2 py-1 rounded text-sm font-medium"
      style={{ 
        backgroundColor: brandColors.primary,
        color: brandColors.background,
      }}
    >
      {brand.name}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXAMPLE 2: Using the React hook (reactive, with context)
// ═══════════════════════════════════════════════════════════════════════════════

export function BrandVoiceCard() {
  const { voice, colors } = useBrand();
  
  return (
    <div 
      className="p-4 rounded-lg border"
      style={{ 
        borderColor: colors.primary,
        backgroundColor: colors.surface,
      }}
    >
      <h3 className="text-lg font-semibold mb-2" style={{ color: colors.text }}>
        Brand Voice
      </h3>
      <p className="text-sm mb-3" style={{ color: colors.textMuted }}>
        {voice.personality}
      </p>
      <div className="flex flex-wrap gap-2">
        {voice.tone.map((tone) => (
          <span 
            key={tone}
            className="px-2 py-0.5 text-xs rounded-full"
            style={{ 
              backgroundColor: `${colors.primary}20`,
              color: colors.primary,
            }}
          >
            {tone}
          </span>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXAMPLE 3: Content Pillars with brand colors
// ═══════════════════════════════════════════════════════════════════════════════

export function ContentPillarsGrid() {
  const { pillars } = useBrand();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {pillars.map((pillar, index) => (
        <div 
          key={pillar.id}
          className="p-4 rounded-lg border-l-4"
          style={{ borderLeftColor: pillar.color || brandColors.primary }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-zinc-500">
              0{index + 1}
            </span>
            <h4 className="font-semibold" style={{ color: brandColors.text }}>
              {pillar.name}
            </h4>
          </div>
          <span className="text-xs uppercase tracking-wider text-zinc-500">
            {pillar.role}
          </span>
          <p className="text-sm text-zinc-400 mt-2">
            {pillar.description}
          </p>
          <ul className="mt-3 space-y-1">
            {pillar.examples.map((example) => (
              <li key={example} className="text-xs text-zinc-500 flex items-center gap-2">
                <span style={{ color: pillar.color || brandColors.primary }}>•</span>
                {example}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXAMPLE 4: Using useBrandStyles hook for CSS-in-JS
// ═══════════════════════════════════════════════════════════════════════════════

export function StyledBrandCard({ children }: { children: React.ReactNode }) {
  const styles = useBrandStyles({
    backgroundColor: "surface",
    color: "text",
    borderColor: "primary",
  });
  
  return (
    <div 
      className="p-6 rounded-xl border"
      style={{
        ...styles,
        boxShadow: `0 4px 20px ${brandColors.primary}10`,
      }}
    >
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXAMPLE 5: Debug/Inspector component
// ═══════════════════════════════════════════════════════════════════════════════

export function BrandInspector({ path }: { path: string }) {
  const value = getBrandValue(path);
  const source = getValueSource(path);
  
  const sourceColors = {
    local: "#2dd4bf",   // teal-400
    global: "#a855f7",  // purple-500
    system: "#6b7280",  // gray-500
  };
  
  return (
    <div className="font-mono text-sm p-3 rounded bg-zinc-900">
      <div className="flex items-center gap-2">
        <span className="text-zinc-500">{path}</span>
        <span className="text-zinc-400">=</span>
        <span className="text-white">
          {typeof value === "string" ? value : JSON.stringify(value)}
        </span>
        {source && (
          <span 
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ 
              backgroundColor: `${sourceColors[source]}30`,
              color: sourceColors[source],
            }}
          >
            {source}
          </span>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXAMPLE 6: Full page with BrandProvider
// ═══════════════════════════════════════════════════════════════════════════════

export function BrandExamplePage() {
  return (
    <BrandProvider>
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-white">
            Brand System Demo
          </h1>
          <p className="text-zinc-400">
            Showing the hierarchical config (local &gt; global &gt; system)
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Direct Imports</h2>
          <div className="flex gap-2">
            <BrandBadge />
            <BrandBadge />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Brand Voice</h2>
          <BrandVoiceCard />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Content Pillars</h2>
          <ContentPillarsGrid />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Styled Card</h2>
          <StyledBrandCard>
            <p className="text-zinc-300">
              This card uses useBrandStyles() hook for consistent theming.
            </p>
          </StyledBrandCard>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Config Inspector</h2>
          <div className="space-y-2">
            <BrandInspector path="colors.primary" />
            <BrandInspector path="voice.personality" />
            <BrandInspector path="typography.fontFamily.heading" />
          </div>
        </section>
      </div>
    </BrandProvider>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Summary
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * KEY TAKEAWAYS:
 * 
 * 1. System Config (/src/brand/system.config.ts)
 *    - Base defaults, lowest priority
 *    - Don't modify unless changing company defaults
 * 
 * 2. Global Config (~/.config/laniameda/brand.config.ts)
 *    - Your personal/agency preferences
 *    - Overrides system defaults
 *    - Create this file in your home directory
 * 
 * 3. Local Config (/src/brand/local.config.ts)
 *    - Project-specific (e.g., Friendroid)
 *    - Highest priority
 *    - Where client brand colors/voice live
 * 
 * USAGE PATTERNS:
 * 
 * • Simple: import { brandColors, brandVoice } from "@/brand"
 * • Reactive: const { colors, voice } = useBrand()
 * • Styles: const styles = useBrandStyles({ backgroundColor: "surface" })
 * • Debug: <BrandInspector path="colors.primary" />
 * 
 * CLI:
 * 
 * • npx brand-config --list
 * • npx brand-config --list --show-origin
 * • npx brand-config colors.primary
 */
