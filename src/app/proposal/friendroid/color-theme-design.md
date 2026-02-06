# Friendroid Proposal — Color Theme Design System

**Palette: Midnight Teal**  
Modern, tech-forward aesthetic with teal-cyan gradients on a black/white base.

---

## Color Tokens

### Dark Mode (Default)

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `--bg` | `#0a0a0a` | `bg-[#0a0a0a]` | Page background |
| `--surface` | `#141414` | `bg-zinc-950` | Cards, panels |
| `--surface-elevated` | `#1a1a1a` | `bg-zinc-900` | Modals, popovers |
| `--border` | `rgba(255,255,255,0.1)` | `border-white/10` | Subtle borders |
| `--border-strong` | `rgba(255,255,255,0.2)` | `border-white/20` | Emphasized borders |
| `--text-primary` | `#ffffff` | `text-white` | Headings |
| `--text-secondary` | `rgba(255,255,255,0.7)` | `text-white/70` | Body text |
| `--text-muted` | `rgba(255,255,255,0.4)` | `text-white/40` | Labels, captions |
| `--accent` | `#2dd4bf` | `text-teal-400` | Primary accent |
| `--accent-hover` | `#5eead4` | `text-teal-300` | Hover states |
| `--accent-subtle` | `rgba(45,212,191,0.1)` | `bg-teal-500/10` | Accent backgrounds |
| `--glow` | `rgba(45,212,191,0.12)` | — | Ambient glow effects |

### Light Mode

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `--bg` | `#f8f9fa` | `bg-[#f8f9fa]` | Page background |
| `--surface` | `#ffffff` | `bg-white` | Cards, panels |
| `--surface-elevated` | `#fefefe` | `bg-zinc-50` | Modals, popovers |
| `--border` | `rgba(0,0,0,0.08)` | `border-zinc-200` | Subtle borders |
| `--border-strong` | `rgba(0,0,0,0.15)` | `border-zinc-300` | Emphasized borders |
| `--text-primary` | `#111827` | `text-zinc-900` | Headings |
| `--text-secondary` | `#4b5563` | `text-zinc-600` | Body text |
| `--text-muted` | `#9ca3af` | `text-zinc-400` | Labels, captions |
| `--accent` | `#0d9488` | `text-teal-600` | Primary accent |
| `--accent-hover` | `#14b8a6` | `text-teal-500` | Hover states |
| `--accent-subtle` | `rgba(13,148,136,0.08)` | `bg-teal-500/10` | Accent backgrounds |
| `--glow` | `rgba(13,148,136,0.08)` | — | Ambient glow effects |

---

## Gradient Recipes

### Primary Accent Gradient
```css
/* Dark mode */
background: linear-gradient(135deg, #2dd4bf, #22d3ee, #2dd4bf);

/* Light mode */
background: linear-gradient(135deg, #0f766e, #0891b2, #0f766e);

/* Tailwind (dark) */
bg-gradient-to-br from-teal-400 via-cyan-400 to-teal-400

/* Tailwind (light) */
bg-gradient-to-br from-teal-700 via-cyan-600 to-teal-700
```

### Text Gradient
```css
.gradient-text {
  background: linear-gradient(135deg, #2dd4bf, #22d3ee);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Ambient Glow
```css
/* Apply to decorative elements */
.glow {
  background: radial-gradient(circle, rgba(45, 212, 191, 0.15) 0%, transparent 70%);
  filter: blur(80px);
}
```

---

## Typography Scale

| Element | Size | Weight | Line Height | Tailwind |
|---------|------|--------|-------------|----------|
| Display | 48-64px | 300 | 1.1 | `text-5xl font-light leading-tight` |
| H1 | 36-48px | 400 | 1.2 | `text-4xl font-normal leading-snug` |
| H2 | 28-32px | 600 | 1.3 | `text-3xl font-semibold tracking-tight` |
| H3 | 20-24px | 600 | 1.4 | `text-xl font-semibold` |
| Body | 15-16px | 400 | 1.6 | `text-[15px] leading-relaxed` |
| Small | 13-14px | 400 | 1.5 | `text-sm` |
| Caption | 10-12px | 500 | 1.4 | `text-xs font-medium uppercase tracking-wider` |
| Mono | 12-14px | 400 | 1.5 | `font-mono text-sm` |

---

## Component Patterns

### Adaptive Text Classes

```tsx
// Headings
className="text-zinc-900 dark:text-white"

// Body text
className="text-zinc-600 dark:text-white/70"

// Muted/labels
className="text-zinc-400 dark:text-white/40"

// Accent text
className="text-teal-600 dark:text-teal-400"

// Accent text (hover)
className="text-teal-500 dark:text-teal-300"
```

### Card/Surface

```tsx
// Base card
className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-white/10"

// Elevated card
className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/5"

// Glass effect (dark only)
className="bg-white/80 dark:bg-black/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10"
```

### Buttons

```tsx
// Primary button
className="bg-teal-600 dark:bg-teal-400 text-white dark:text-zinc-950 hover:bg-teal-500 dark:hover:bg-teal-300"

// Secondary button
className="bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10"

// Ghost button
className="text-zinc-600 dark:text-white/70 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5"
```

### Tags/Badges

```tsx
// Accent badge
className="bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20"

// Neutral badge
className="bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-white/60 border border-zinc-200 dark:border-white/10"
```

### Lists & Bullets

```tsx
// Bullet dot
className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-teal-400"

// List item text
className="text-zinc-700 dark:text-zinc-300"
```

### Tables

```tsx
// Table header
className="text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-700"

// Alternating rows
className="even:bg-zinc-50 dark:even:bg-zinc-900/30"

// Cell text
className="text-zinc-700 dark:text-zinc-300"
```

### Timeline/Progress

```tsx
// Timeline line
className="bg-gradient-to-b from-teal-500 via-zinc-300 to-zinc-200 dark:from-teal-500/60 dark:via-zinc-600/40 dark:to-zinc-700/20"

// Timeline dot (active)
className="bg-teal-500 dark:bg-teal-400 border-2 border-white dark:border-zinc-950"

// Timeline dot (inactive)
className="bg-zinc-200 dark:bg-zinc-800 border border-zinc-400 dark:border-zinc-600"
```

### Blockquotes

```tsx
className="border-l-2 border-teal-500 dark:border-teal-500/50 pl-4 italic text-zinc-600 dark:text-zinc-400"
```

---

## Phase-Specific Accents

Each phase uses a secondary accent for differentiation:

| Phase | Dark Accent | Light Accent | Usage |
|-------|-------------|--------------|-------|
| Phase 0 | `teal-400` | `teal-600` | Numbers, highlights |
| Phase 1 | `teal-300` | `teal-500` | Treatment stage |
| Phase 2 | `violet-300` | `violet-600` | Pilot stage |
| Phase 3 | `emerald-300` | `emerald-600` | Scale stage |

---

## Implementation Checklist

- [ ] Use `dark:` Tailwind prefix for all color classes
- [ ] Avoid hardcoded `text-white` without a light-mode counterpart
- [ ] Test both modes after each component update
- [ ] Use semantic class names matching the token names above
- [ ] Apply gradients via inline styles or custom classes for complex patterns

---

## CSS Variables (Optional)

Add to `globals.css` if using CSS custom properties:

```css
:root {
  --proposal-bg: #f8f9fa;
  --proposal-surface: #ffffff;
  --proposal-text: #111827;
  --proposal-text-secondary: #4b5563;
  --proposal-text-muted: #9ca3af;
  --proposal-accent: #0d9488;
  --proposal-accent-hover: #14b8a6;
  --proposal-border: rgba(0, 0, 0, 0.08);
}

.dark {
  --proposal-bg: #0a0a0a;
  --proposal-surface: #141414;
  --proposal-text: #ffffff;
  --proposal-text-secondary: rgba(255, 255, 255, 0.7);
  --proposal-text-muted: rgba(255, 255, 255, 0.4);
  --proposal-accent: #2dd4bf;
  --proposal-accent-hover: #5eead4;
  --proposal-border: rgba(255, 255, 255, 0.1);
}
```
