/**
 * Brand Configuration Loader
 * 
 * Implements hierarchical brand configuration similar to Git's config system:
 * - System (/etc/gitconfig)     -> system.config.ts    [lowest priority]
 * - Global (~/.gitconfig)       -> global.config.ts    [overrides system]
 * - Local (.git/config)         -> local.config.ts     [highest priority]
 * 
 * Precedence: local > global > system
 * 
 * Usage:
 *   import { brand, brandColors, brandVoice } from "@/brand";
 *   import { useBrandConfig } from "@/brand";
 * 
 * CLI Usage (similar to `git config`):
 *   npx brand-config --list           # Show all effective settings
 *   npx brand-config --get colors.primary
 *   npx brand-config --set local.colors.primary #0ea5e9
 */

import { BrandConfig, ConfigLevel, ConfigSource, ColorPalette, BrandVoice, ContentPillar } from "./types";

// Re-export types for convenience
export type { BrandConfig, ConfigLevel, ConfigSource, ColorPalette, BrandVoice, ContentPillar } from "./types";
import { systemBrandConfig } from "./system.config";
import { localBrandConfig } from "./local.config";

// Global config is empty by default - can be loaded from user home
const globalBrandConfig: Partial<BrandConfig> = {};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Deep merge utility - merges objects with proper type handling
 * Later objects override earlier ones (rightmost wins)
 */
function deepMerge<T extends Record<string, unknown>>(...objects: Array<DeepPartial<T> | undefined>): T {
  const result = {} as T;
  
  for (const obj of objects) {
    if (!obj) continue;
    
    for (const [key, value] of Object.entries(obj)) {
      if (value === undefined) continue;
      
      if (
        typeof value === "object" && 
        value !== null && 
        !Array.isArray(value) &&
        key in result &&
        typeof result[key as keyof T] === "object" &&
        result[key as keyof T] !== null &&
        !Array.isArray(result[key as keyof T])
      ) {
        // Recursively merge nested objects
        (result as Record<string, unknown>)[key] = deepMerge(
          result[key as keyof T] as Record<string, unknown>,
          value as Record<string, unknown>
        );
      } else {
        // Direct assignment for primitives and arrays
        (result as Record<string, unknown>)[key] = value;
      }
    }
  }
  
  return result;
}

/**
 * Merges all configuration levels with proper precedence
 * Priority: local > global > system
 */
export function loadBrandConfig(): BrandConfig {
  const merged = deepMerge<BrandConfig>(
    systemBrandConfig,
    globalBrandConfig,
    localBrandConfig
  );
  
  // Track the effective source
  merged._source = "local" in localBrandConfig && Object.keys(localBrandConfig).length > 0 
    ? "local" 
    : "global" in globalBrandConfig && Object.keys(globalBrandConfig).length > 0
      ? "global"
      : "system";
  merged._path = merged._source === "local" 
    ? "./brand.config.ts"
    : merged._source === "global"
      ? "~/.config/laniameda/brand.config.ts"
      : "/src/brand/system.config.ts";
  
  return merged;
}

/**
 * Get configuration sources for inspection
 * Shows which level each setting comes from
 */
export function getConfigSources(): ConfigSource[] {
  return [
    {
      level: "system",
      path: "/src/brand/system.config.ts",
      exists: true,
      config: systemBrandConfig,
    },
    {
      level: "global",
      path: "~/.config/laniameda/brand.config.ts",
      exists: Object.keys(globalBrandConfig).length > 0,
      config: globalBrandConfig,
    },
    {
      level: "local",
      path: "./brand.config.ts",
      exists: Object.keys(localBrandConfig).length > 0,
      config: localBrandConfig,
    },
  ];
}

/**
 * Get a specific value by dot-notation path
 * Example: getBrandValue("colors.primary") -> "#14b8a6"
 */
export function getBrandValue(path: string): unknown {
  const config = loadBrandConfig();
  const keys = path.split(".");
  let value: unknown = config;
  
  for (const key of keys) {
    if (value === null || typeof value !== "object") {
      return undefined;
    }
    value = (value as Record<string, unknown>)[key];
  }
  
  return value;
}

/**
 * Get the source of a specific configuration value
 * Shows which config level (system/global/local) a value comes from
 */
export function getValueSource(path: string): ConfigLevel | undefined {
  const keys = path.split(".");
  
  // Check local first
  let value: unknown = localBrandConfig;
  for (const key of keys) {
    if (value === null || typeof value !== "object") break;
    value = (value as Record<string, unknown>)[key];
  }
  if (value !== undefined) return "local";
  
  // Then global
  value = globalBrandConfig;
  for (const key of keys) {
    if (value === null || typeof value !== "object") break;
    value = (value as Record<string, unknown>)[key];
  }
  if (value !== undefined) return "global";
  
  // Finally system
  value = systemBrandConfig;
  for (const key of keys) {
    if (value === null || typeof value !== "object") break;
    value = (value as Record<string, unknown>)[key];
  }
  if (value !== undefined) return "system";
  
  return undefined;
}

// Export singleton instance
export const brand = loadBrandConfig();

// Convenience exports for common use cases
export const brandColors: ColorPalette = brand.colors;
export const brandVoice: BrandVoice = brand.voice;
export const brandPillars: ContentPillar[] = brand.pillars;

/**
 * React hook for reactive brand configuration
 * Re-loads config on mount (useful for HMR in development)
 */
export function useBrandConfig(): BrandConfig {
  // In a real React app, this could use useState/useEffect for hot reloading
  return loadBrandConfig();
}

/**
 * Format brand config for display (like `git config --list`)
 */
export function formatConfigList(config: BrandConfig = brand): string {
  const lines: string[] = [];
  
  function flatten(obj: unknown, prefix = ""): void {
    if (obj === null || typeof obj !== "object") return;
    if (Array.isArray(obj)) return; // Skip arrays in flat list
    if (prefix === "_" || prefix.startsWith("_.")) return; // Skip meta fields
    
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        flatten(value, newKey);
      } else if (typeof value !== "function") {
        lines.push(`${newKey}=${value}`);
      }
    }
  }
  
  flatten(config);
  return lines.join("\n");
}

// Default export
export default brand;
