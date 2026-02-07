# Brand Configuration System

A hierarchical brand guidelines system inspired by Git's configuration pattern.

## Git-Style Hierarchy

Like Git, brand configuration follows a three-level hierarchy with **rightmost winning**:

```
system    /src/brand/system.config.ts        [lowest priority]
global    ~/.config/laniameda/brand.config.ts  [overrides system]
local     ./brand.config.ts                  [highest priority]
```

### Precedence Rules

1. **System** - Company-wide defaults (base palette, typography defaults)
2. **Global** - Agency/team customizations (your agency's preferred defaults)
3. **Local** - Project-specific overrides (client brand colors, voice, etc.)

## Quick Start

```typescript
import { brand, brandColors, brandVoice, brandPillars } from "@/brand";

// Use in components
<div style={{ backgroundColor: brandColors.primary }}>
  {brandVoice.personality}
</div>

// Or access full config
const config = brand;
console.log(config.colors.primary);  // #2dd4bf (from local.config.ts)
console.log(config.typography.fontFamily.heading);  // system-ui (from system)
```

## CLI Usage (like `git config`)

```bash
# List all effective settings
npx brand-config --list

# List with source annotations  
npx brand-config --list --show-origin

# Get a specific value
npx brand-config colors.primary
npx brand-config --get voice.tone

# Show where values come from
npx brand-config --show-origin

# Check a specific project's local config
npx brand-config --local --list
```

## Configuration Files

### System Config (`/src/brand/system.config.ts`)
Base defaults that ship with the framework. Don't edit this directly.

### Global Config (`~/.config/laniameda/brand.config.ts`)
Your personal/agency defaults. Create this file in your home directory:

```typescript
import { BrandConfig } from "@/brand/types";

export const globalBrandConfig: Partial<BrandConfig> = {
  colors: {
    primary: "#0ea5e9",     // Your agency's brand blue
    secondary: "#8b5cf6",
  },
  voice: {
    tone: ["bold", "expert"],
    personality: "Strategic partner",
  },
  _source: "global",
  _path: "~/.config/laniameda/brand.config.ts",
};
```

### Local Config (`/src/brand/local.config.ts`)
Project-specific overrides. This is where you define each client's brand:

```typescript
export const localBrandConfig: Partial<BrandConfig> = {
  name: "Friendroid",
  description: "Human-centered robotics brand",
  colors: {
    primary: "#2dd4bf",     // Teal for this client
  },
  voice: {
    tone: ["human", "approachable"],
    personality: "A helpful friend",
  },
  _source: "local",
  _path: "./brand.config.ts",
};
```

## API Reference

### Main Exports

| Export | Type | Description |
|--------|------|-------------|
| `brand` | `BrandConfig` | Merged effective configuration |
| `brandColors` | `ColorPalette` | Quick access to color palette |
| `brandVoice` | `BrandVoice` | Quick access to voice/tone |
| `brandPillars` | `ContentPillar[]` | Quick access to content pillars |
| `useBrandConfig()` | `() => BrandConfig` | React hook for reactive config |

### Utility Functions

```typescript
// Load fresh merged config
import { loadBrandConfig } from "@/brand";
const config = loadBrandConfig();

// Get value by dot-notation path
import { getBrandValue } from "@/brand";
const primary = getBrandValue("colors.primary");  // #2dd4bf

// Check which level a value comes from
import { getValueSource } from "@/brand";
const source = getValueSource("colors.primary");  // "local"

// Get all config sources
import { getConfigSources } from "@/brand";
const sources = getConfigSources();
// [{ level: "system", exists: true, ... }, { level: "global", ... }]
```

## Usage in Components

### Styled Components

```tsx
import { brandColors } from "@/brand";

export function BrandButton({ children }) {
  return (
    <button 
      style={{ 
        backgroundColor: brandColors.primary,
        color: brandColors.text,
      }}
    >
      {children}
    </button>
  );
}
```

### Tailwind with Brand Colors

```tsx
import { brand } from "@/brand";

export function BrandCard() {
  return (
    <div className="bg-zinc-950">
      <h2 style={{ color: brand.colors.primary }}>
        {brand.name}
      </h2>
      <p className="text-zinc-400">
        {brand.description}
      </p>
    </div>
  );
}
```

### Content Pillars

```tsx
import { brandPillars } from "@/brand";

export function ContentStrategy() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {brandPillars.map(pillar => (
        <div key={pillar.id} style={{ borderColor: pillar.color }}>
          <h3>{pillar.name}</h3>
          <span>{pillar.role}</span>
          <p>{pillar.description}</p>
          <ul>
            {pillar.examples.map(ex => <li key={ex}>{ex}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

## Configuration Schema

```typescript
interface BrandConfig {
  name: string;                    // Project name
  version: string;                 // Config version
  description?: string;            // Project description
  
  colors: ColorPalette;          // Primary, secondary, accent, etc.
  typography: Typography;        // Fonts, sizes, weights, line heights
  spacing: Spacing;              // xs, sm, md, lg, xl, etc.
  borderRadius: BorderRadius;    // Corner radius values
  shadows: Shadows;              // Box shadows and glows
  animation: Animation;          // Durations and easing functions
  
  voice: BrandVoice;             // Tone, words to use/avoid, personality
  pillars: ContentPillar[];      // Content strategy pillars
  visual: VisualDirection;       // Do/don't and content styles
  
  _source?: ConfigLevel;         // Tracks effective source
  _path?: string;                // Tracks effective path
}
```

## Migration from Existing Brand Files

If you have existing brand definitions scattered across components:

1. Move colors to `system.config.ts` (shared defaults)
2. Move agency preferences to `~/.config/laniameda/brand.config.ts`
3. Move project-specific values to `local.config.ts`
4. Update components to import from `@/brand`

Before:
```tsx
// In multiple files
const PRIMARY_COLOR = "#2dd4bf";
const BRAND_VOICE = "human, approachable";
```

After:
```tsx
// In one place: local.config.ts
export const localBrandConfig = {
  colors: { primary: "#2dd4bf" },
  voice: { tone: ["human", "approachable"] },
};

// In components
import { brandColors, brandVoice } from "@/brand";
```

## Examples

### Friendroid (Current Project)

```bash
$ npx brand-config --list --show-origin
# SYSTEM (/src/brand/system.config.ts)
colors.primary=#14b8a6                       # system
colors.secondary=#a855f7                     # system
typography.fontFamily.heading=system-ui        # system
...

# LOCAL (./brand.config.ts)
colors.primary=#2dd4bf                       # local
colors.secondary=#c084fc                       # local
voice.tone=human                             # local
voice.tone=approachable                      # local
voice.tone=curious                           # local
voice.tone=optimistic                        # local
pillars.0.id=news-decoded                    # local
pillars.0.name=Robotics News Decoded           # local
...
```

### Check What's Overridden

```bash
$ npx brand-config --show-origin
system    /src/brand/system.config.ts
          exists: true
          keys: name, version, description, colors, typography, spacing, borderRadius, shadows, animation, voice, pillars, visual

global    ~/.config/laniameda/brand.config.ts
          exists: false
          keys: 

local     ./brand.config.ts
          exists: true
          keys: name, description, colors, voice, pillars, visual
```

## Troubleshooting

**Q: My local changes aren't showing up**
A: Make sure `localBrandConfig` is exported and contains `_source: "local"`

**Q: Global config isn't loading**
A: Create `~/.config/laniameda/brand.config.ts` in your home directory

**Q: How do I see what's being overridden?**
A: Use `npx brand-config --list --show-origin`

**Q: Can I use this with CSS variables?**
A: Yes! Map brand colors to CSS variables in your global CSS:

```css
:root {
  --color-primary: #2dd4bf;  /* From brand.colors.primary */
}
```
