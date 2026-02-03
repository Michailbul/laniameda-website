# PRD (Design-Only) — Laniameda × Robot Retail Media Deck Website (Desktop)

## 0) Scope & constraints
- **Purpose:** A premium, scroll-deck website used as a **client-facing pitch deck** for the robotics brand owner (and similar decision-makers).
- **Platform:** **Desktop only** (mouse + keyboard + trackpad). **Ignore mobile**.
- **Interaction model:** Full-screen **scroll-snapped panels** with controlled “one scroll = one panel” advancement and panel-enter animation sequences.
- **Brand vibe:** Tesla style + human touch” — engineered precision (grid, spacing, tokens) + emotional artistry (editorial rhythm, soft gradients, cinematic motion). Premium modern restraint inspired by

---

## 1) Design language (how it should look/feel)
### 1.1 Core principles
- **Light-first, museum-clean:** bright surfaces, generous whitespace, crisp typography; minimal chrome.
- **Quietly technical:** subtle grid/noise overlays, 1px borders, mono labels, precise alignment. No “cyberpunk” clutter.
- **Bold headline moments:** hero typography can be oversized and confident (Ref B), but everything else returns to calm.
- **Soft geometry:** large radii, pill controls, gentle shadows. Everything feels “machined” yet friendly.
- **Color discipline:** mostly neutrals + one **electric blue accent** used intentionally for CTAs, active states, and progress indication.

### 1.2 Visual motifs
- **Grid field:** low-contrast technical grid (like Ref B) on dark/ink surfaces or as a faint overlay on light.
- **Atmospheric gradient:** occasional, very subtle gradient wash (Ref C influence), used as a background “breath,” not as primary branding.

---

## 2) Layout system (desktop)
### 2.1 Canvas + grid
- **Viewport targets:** 1440×900 (primary), 1920×1080 (primary), 1280×720 (minimum).
- **Container:** max-width **1280px** (hard cap), centered.
- **Grid:** 12 columns.
- **Gutters:** 24px.
- **Outer padding:** 64px left/right.
- **Vertical rhythm:** base spacing unit **8px**; section/panel internal padding typically **72–96px** top/bottom.

### 2.2 Density rules
- Avoid cramming: max 2 focal elements per panel (e.g., headline + CTA, or grid + brief intro).
- Keep body line length ~60–80 characters max.

---

## 3) Typography system
### 3.1 Font families
- **Primary grotesk:** Inter / SF Pro / similar (clean, modern, neutral).
- **Mono accent:** Space Mono / IBM Plex Mono / similar (labels, metadata, “technical” tone).

### 3.2 Type scale (desktop)
- **H1:** 80–104px (tight tracking; strong presence)
- **H2:** 44–60px
- **H3:** 28–36px
- **Body:** 16–18px (line-height 1.55–1.7)
- **Meta/Label (mono):** 12–13px (tracking ~0.06–0.10em)

### 3.3 Typographic rules
- H1 may be uppercase or title case; keep consistent across the deck.
- Use mono for: category tags, timestamps, small UI labels, progress tooltip labels.
- Avoid heavy letterspacing on long headings; reserve tracking for micro-labels.

---

## 4) Color system (tokens)
> All color usage must be tokenized. No ad-hoc hex values in components.

### 4.1 Tokens (recommended)
```css
:root {
  /* Neutrals */
  --bg: #F7F8FA;
  --surface: #FFFFFF;
  --surface-2: #F1F3F6;
  --text: #0B0F17;
  --text-muted: #5B6472;
  --border: rgba(11, 15, 23, 0.10);

  /* Ink (for hero / high contrast moments) */
  --ink: #05070C;
  --ink-border: rgba(255, 255, 255, 0.08);
  --ink-text: rgba(255, 255, 255, 0.92);
  --ink-muted: rgba(255, 255, 255, 0.62);

  /* Accent (blue) */
  --accent: #19B5FF;
  --accent-2: #2F7CFF;
  --accent-glow: rgba(25, 181, 255, 0.35);

  /* Shadows (subtle, premium) */
  --shadow-1: 0 8px 24px rgba(11, 15, 23, 0.08);
  --shadow-2: 0 14px 40px rgba(11, 15, 23, 0.10);

  /* Radii */
  --r-card: 24px;
  --r-button: 16px;
  --r-pill: 999px;
}

### 4.2 Color usage rules

Accent blue is not a background color for large areas. Use it for:

Primary CTA fill

Active pill/tab

Progress active indicator

Focus ring / selection highlight

“Ink” (dark) surfaces used selectively for contrast moments (hero / emphasis panels).

### 5) Surface, borders, elevation

Borders: 1px using --border on light surfaces; --ink-border on ink surfaces.

Corner radii:

Cards: --r-card

Buttons: --r-button

Pills: --r-pill

Elevation: extremely restrained; prefer borders over heavy shadows.

Hover can increase shadow from --shadow-1 → --shadow-2 but keep subtle.

6) Background treatments (grid + noise)
6.1 Grid layer

CSS background grid at 4–8% opacity.

Grid spacing: 40–64px major grid; optional minor grid at half spacing.

On ink surfaces, grid is slightly more visible; on light, keep barely perceptible.

6.2 Noise layer

Optional noise overlay at 2–4% opacity (to reduce gradient banding and add tactility).

Must not impact performance (single lightweight overlay, no heavy canvas).

7) UI components (componentized spec)

Build as reusable components with variants (light/ink) and states (default/hover/active/focus/disabled).

7.1 Top navigation (Hero-only)

Visible only on the first panel.

Layout: left logo/wordmark, center links, right optional icon/CTA.

Visual: minimal, no background bar; text links with subtle hover underline or opacity shift.

Exit rule: once the deck advances past hero, nav animates out and stays hidden.

7.2 Progress tracker (persistent after hero)

Fixed position: right side, near top-right quadrant.

Visual: 8–10 dots (depending on final panel count), thin line optional.

States:

Inactive: outlined dot (--border)

Active: filled dot (--accent) + soft glow (--accent-glow)

Completed: muted filled or ring

Tooltip labels on hover/focus (mono label style).

7.3 Pill tabs / filters (Ref A-inspired)

Pills: outline by default; active pill filled (light) or accented outline (ink).

Padding: 10–14px vertical, 16–20px horizontal.

Spacing between pills: 10–12px.

Hover: subtle background tint; Active: stronger border/fill.

7.4 Cards (story/portfolio tiles)

Structure: media tile (rounded) + title + meta + optional excerpt.

Card surface: --surface with 1px border; subtle shadow only on hover.

Hover behavior: lift -4px, shadow increase, media scale 1.02 (very subtle).

7.5 Buttons

Primary: filled --accent, text --ink or near-black for legibility.

Secondary: outline/ghost; hover adds slight fill tint.

Focus: 2px focus ring using --accent with offset.

7.6 Labels / metadata

Mono, small caps optional.

Use muted tokens. Keep consistent (same format and spacing everywhere).

8) Motion & animation spec (technical)
8.1 Scroll-deck mechanics

Requirement: “Not free scroll.” Each wheel intent advances exactly one panel.

Implementation approach

CSS Scroll Snap (mandatory):

Container: scroll-snap-type: y mandatory; overflow-y: scroll; height: 100vh;

Panel: scroll-snap-align: start; min-height: 100vh;

Wheel intent interception (desktop):

Accumulate wheel delta; once threshold exceeded, programmatically scroll to next/prev panel:

scrollIntoView({ behavior: "smooth", block: "start" })

Add lockout to prevent multi-advance:

lockout 700–900ms (tune to feel “deck-like”)

Prevent default scrolling during lockout to avoid drift.

Naming: this is effectively “scroll-stepping” / “scroll snapping with wheel gating” (avoid heavy scroll-jacking behaviors; keep it predictable).

8.2 Panel enter transitions (standard choreography)

Triggered when a panel becomes active (via IntersectionObserver at ~60% visibility):

Container fade: opacity 0 → 1 (200ms)

Translate up: translateY 16px → 0 (320ms)

Optional blur resolve: filter blur(6px) → blur(0) (320ms)

Stagger: child elements stagger 50ms (headline → body → CTA → supporting UI)

Easing

Primary enter: cubic-bezier(0.22, 1, 0.36, 1) (premium ease-out)

Hover/UI: cubic-bezier(0.4, 0, 0.2, 1) (standard material-like)

8.3 Hero animation (Ref B-inspired, restrained)

Kinetic typography reveal: line/word stagger on load (no bouncing).

Background grid drift: extremely subtle (low amplitude) parallax or slow translation; must not be distracting.

CTA attention: gentle glow pulse (2–3 cycles max) until user scrolls or interacts, then stop.

8.4 Microinteractions

Pills: active state morph (150–200ms) using opacity + background + border transitions.

Cards: hover lift + shadow (150ms) + media scale (150ms).

Progress tracker: active dot expands by 2px and adds glow (120–160ms).

Buttons: hover sheen/glow (150–200ms); pressed state reduces scale to 0.98 (80–120ms).

8.5 Reduced motion

Respect prefers-reduced-motion: reduce:

Disable blur/parallax

Remove stagger (or reduce to 0–15ms)

Disable wheel gating (allow native scroll snap)

Use opacity-only transitions at 150ms max

9) Interaction rules (nav + progress)

Top nav exists only on the hero panel.

Exit animation: opacity 1→0 + translateY 0→-12px in 220ms.

Progress tracker appears after hero:

Enter animation: opacity 0→1 + scale 0.98→1 in 180ms.

Clicking a progress dot:

Smooth scroll to target panel (same scroll-stepping animation curve).

10) Quality bar / acceptance checks (design implementation)

Token compliance: colors, radii, shadows, spacing are tokens only.

Spacing discipline: consistent 8px rhythm; no arbitrary offsets.

Contrast: text on light surfaces remains highly legible; muted text still readable.

Motion consistency: one easing set, one duration system; no random animation speeds.

Deck feel: one wheel intent reliably advances one panel with no mid-panel drift.

Performance: no jank during transitions; background effects are lightweight.