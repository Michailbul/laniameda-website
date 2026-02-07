#!/usr/bin/env node
/**
 * Brand Config CLI
 * Similar to `git config` but for brand guidelines
 * 
 * Commands:
 *   npx brand-config --list              # Show all effective config
 *   npx brand-config --list --show-origin  # Show with source annotations
 *   npx brand-config colors.primary       # Get specific value
 *   npx brand-config --get colors.primary # Same as above
 *   npx brand-config --set local.colors.primary #2dd4bf
 *   npx brand-config --unset local.colors.primary
 * 
 * Hierarchy (like Git):
 *   system    /src/brand/system.config.ts     [lowest priority]
 *   global    ~/.config/laniameda/brand.config.ts
 *   local     ./brand.config.ts              [highest priority]
 */

import { brand, loadBrandConfig, formatConfigList, getBrandValue, getValueSource, getConfigSources } from "./index";

const args = process.argv.slice(2);

function showHelp(): void {
  console.log(`
Usage: brand-config [options] [<key>] [<value>]

Options:
  --list                    List all configuration settings
  --list --show-origin      List with source annotations
  --get <key>               Get a specific value (e.g., colors.primary)
  --set <level>.<key> <value>  Set a value at specific level
  --unset <level>.<key>     Remove a setting
  --show-origin             Show where each value comes from
  --system                  Use system-level config
  --global                  Use global-level config  
  --local                   Use local-level config
  -h, --help                Show this help

Examples:
  brand-config --list
  brand-config --list --show-origin
  brand-config colors.primary
  brand-config --get voice.tone
  brand-config --set local.colors.primary #0ea5e9
  brand-config --show-origin

Config files (like Git):
  system    /src/brand/system.config.ts     [base defaults]
  global    ~/.config/laniameda/brand.config.ts  [user overrides]
  local     ./brand.config.ts             [project overrides]
`);
}

function main(): void {
  if (args.length === 0 || args.includes("-h") || args.includes("--help")) {
    showHelp();
    process.exit(0);
  }

  // --list: Show all config like `git config --list`
  if (args.includes("--list")) {
    const showOrigin = args.includes("--show-origin");
    
    if (showOrigin) {
      // Show with source annotations
      const sources = getConfigSources();
      console.log("# Configuration sources:\n");
      
      for (const source of sources) {
        console.log(`# ${source.level.toUpperCase()} (${source.path})`);
        if (!source.exists) {
          console.log("#   [not set]\n");
          continue;
        }
        if (source.config) {
          const lines = formatConfigList(source.config as typeof brand).split("\n");
          for (const line of lines) {
            if (line.trim()) {
              console.log(`${line.padEnd(40)} # ${source.level}`);
            }
          }
        }
        console.log();
      }
      
      console.log("# Effective configuration (merged):\n");
    }
    
    console.log(formatConfigList(brand));
    process.exit(0);
  }

  // --get or positional argument: Get a specific value
  const getIndex = args.indexOf("--get");
  const key = getIndex >= 0 ? args[getIndex + 1] : args.find(a => !a.startsWith("--"));
  
  if (key) {
    const value = getBrandValue(key);
    const source = getValueSource(key);
    
    if (value === undefined) {
      console.error(`error: key '${key}' not found`);
      process.exit(1);
    }
    
    if (Array.isArray(value)) {
      value.forEach(v => console.log(v));
    } else if (typeof value === "object") {
      console.log(JSON.stringify(value, null, 2));
    } else {
      console.log(value);
    }
    
    if (args.includes("--show-origin")) {
      console.error(`# source: ${source}`);
    }
    
    process.exit(0);
  }

  // --show-origin: Show where values come from
  if (args.includes("--show-origin")) {
    const sources = getConfigSources();
    for (const source of sources) {
      console.log(`${source.level.padEnd(8)} ${source.path}`);
      console.log(`         exists: ${source.exists}`);
      if (source.config && Object.keys(source.config).length > 0) {
        const keys = Object.keys(source.config).filter(k => !k.startsWith("_"));
        console.log(`         keys: ${keys.join(", ") || "none"}`);
      }
      console.log();
    }
    process.exit(0);
  }

  console.error("error: unknown command or option");
  showHelp();
  process.exit(1);
}

main();
