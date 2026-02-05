# TubesCursor Component Integration

Integrate the TubesCursor 3D animation component into the Next.js project by creating the component at `/src/components/ui/tubes-cursor.tsx` and updating the main page to use it instead of the default template.

## Project Analysis

The project is already properly configured with:
- **shadcn**: Confirmed via `components.json` with style "new-york", RSC enabled, TypeScript enabled
- **Tailwind CSS**: Confirmed via `@import "tailwindcss"` in `src/app/globals.css`
- **TypeScript**: Confirmed via `tsconfig.json` and `"tsx": true` in components.json
- **Components path**: `src/components/ui/` (27 items already present)

## Implementation Steps

### 1. Create `tubes-cursor.tsx` component

**File location**: `/Users/michael/work/laniameda/laniameda-website/.worktrees/main-2/src/components/ui/tubes-cursor.tsx`

The component uses a dynamic import to load the Three.js animation library from CDN. Key features:
- Full-screen canvas animation
- Interactive color change on click
- Proper TypeScript types for refs and module imports
- Client-side only rendering (uses "use client" directive)
- Cleanup on unmount to prevent memory leaks

**Key considerations**:
- Added `"use client"` directive for client-side rendering
- Properly typed the module import with `Record<string, unknown>` for options
- Typed `canvasRef` as `HTMLCanvasElement | null`
- Added type guards for the animation instance methods

### 2. Update `page.tsx` to use TubesCursor

**File location**: `/Users/michael/work/laniameda/laniameda-website/.worktrees/main-2/src/app/page.tsx`

Replace the entire default Next.js template with a simple import and render of the TubesCursor component:

```tsx
import TubesCursor from "@/components/ui/tubes-cursor";

export default function Home() {
  return <TubesCursor />;
}
```

## No Additional Dependencies Required

The component loads its Three.js dependency dynamically from CDN (`https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js`), so no npm packages need to be installed.

## Expected Result

After implementation, visiting the root URL will display:
- A full-screen black background with animated 3D tubes following the cursor
- "Tubes Cursor" text overlay with click instruction
- Color change animation on click
