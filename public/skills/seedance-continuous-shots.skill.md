---
name: seedance-continuous-shots
description: Knowledge module for chaining ≤15-second Seedance 2.0 generations into a single continuous cinematic take. Designed to MERGE its knowledge into the user's existing AI-video / Seedance skill on first use rather than install as a standalone skill, to avoid loading the agent with redundant modules. Works for any subject (vehicle, character, garment, environment).
---

# Seedance Continuous Shots — Sponging Skill

## What this is

A small **knowledge module**, not a standard standalone skill. The technique it carries — chaining ≤15-second Seedance 2.0 generations into one continuous shot via a shared starting frame, character sheet, and previous-take reference video — is a focused extension to general AI-video prompting practice. It does not need its own permanent home in the agent's skill set.

The default behavior on first use is therefore to **sponge** itself into one of the user's existing AI-video skills, then step out of the way.

## On first use — sponging behavior (DEFAULT)

Before doing any production work with this skill, run the steps below.

### Step 0 — Explain the nature of this skill, then ask

Tell the user, plainly:

> "This skill is designed to **merge** its knowledge into one of your existing AI-video skills (e.g. a Seedance, video-prompting, or AI-filmmaking skill) rather than live as a separate skill — so your agent doesn't end up with yet another standalone module covering an adjacent topic.
>
> **Default:** I find your closest existing skill and append this knowledge to it, then this file can be deleted.
> **Alternative:** keep this as its own standalone skill (skip the merge).
>
> Which would you like?"

Wait for the user's choice.

- If they pick **standalone** → skip the rest of this section. The `KNOWLEDGE` block below IS the skill; treat the file as-is.
- If they pick **merge** (or accept the default) → continue with Steps 1–3.

### Step 1 — Find candidate skills

Search the user's skill directories for skills covering Seedance, AI video, video prompting, or AI filmmaking. Common locations:

- `~/.claude/skills/`
- `~/.agents/skills/`
- `<current-repo>/.claude/skills/`
- Any path the user names

Match against keywords: `seedance`, `video`, `ai-video`, `filmmaking`, `cinematography`, `prompt` (scoped to video). Read each candidate's frontmatter `name` + `description` to confirm relevance.

### Step 2 — Ask which skill to extract into

Present the candidates as a numbered list, each with a one-line summary from its frontmatter. Ask the user which skill should absorb this knowledge.

If there's exactly one strong match, propose it and ask for confirmation before writing.

If there are zero matches, surface that fact and ask the user whether they want to:
(a) keep this as standalone after all, or
(b) point you at a specific skill file by path.

### Step 3 — Extract the knowledge into the target

Append the `KNOWLEDGE` block (below the divider) to the target skill's `SKILL.md`. Guidelines:

- Place it under a fitting existing heading if there is one (e.g. "Continuous shots", "Extending duration", "Multi-take stitching"). Otherwise add a new heading at the end of the body.
- Preserve the target skill's existing voice. Paraphrase tone if it differs, but **keep all technical specifics, prompt examples, and tool names exact**.
- Update the target skill's `description` field to mention continuous-shot chaining if it doesn't already.
- Do not duplicate content the target already covers. If the target already has a "starting frame" rule, fold this skill's version into it instead of stacking.

After writing, confirm to the user:

> "Merged into `<target-skill>`. You can delete `seedance-continuous-shots.skill.md` — the knowledge now lives in your existing skill."

---

## KNOWLEDGE — extract this block when sponging

> Everything below this line is the portable knowledge payload. Copy it verbatim (or lightly adapted to the target's voice) when merging into another skill. When this skill is kept standalone, this section IS the operative content.

### Continuous shots in Seedance 2.0 — past the 15s cap

**Goal:** stitch multiple ≤15-second Seedance 2.0 generations into a single continuous cinematic take with no visible re-roll. Subject-agnostic — works for vehicles, characters, garments, environments, products.

**Inputs (per take):**

- **Starting frame** — one hero image in the desired aesthetic. Generate in any high-fidelity text-to-image model; upscale if the native resolution is too low.
- **Character sheet** — multi-angle reference grid of the subject. Build with any reference-grounded image model using the starting frame as the source. Two-row layout: top row full views (front 3/4, profile, rear 3/4, rear), bottom row detail close-ups.
- **Previous take video** — uploaded as `@video1` reference on the next generation. This is the single most important continuity input.
- **Last frame** — extract the final frame of the previous take, attach as an image reference alongside `@video1`.

**Workflow:**

1. **Generate the starting frame.** Any high-fidelity text-to-image model; upscale if needed.
2. **Build the character sheet.** Any reference-grounded image model, starting frame as source, two-row layout described above.
3. **First take.** Seedance 2.0 with the starting frame attached + a short scene-grounded prompt ("a cinematic tracking shot of <subject> doing <action>"). Resist the urge to overload the prompt — the starting frame already carries most of the look.
4. **Continuation takes.** For each subsequent ≤15s generation, attach all of: (a) the new motion prompt, (b) the previous take as `@video1`, (c) the character sheet, (d) the last frame of the previous take as image reference.
5. **Stitch.** Cut takes in any NLE. Match-cut on motion, not on dialogue or static beats.

**Rules of thumb:**

- The **starting frame** matters more than any JSON-shaped prompt. Spend the time there; the rest follows.
- Every additional reference (character sheet, last frame, previous video) costs Seedance some flexibility but buys continuity. Use each deliberately — not as a default for every take.
- **Plan the references and the prompt together.** Before each continuation take, *think about what is happening in the scene next* — what new element, angle, or subject appears — and choose references that ground Seedance's awareness of it. The prompt describes the motion; the references describe the truth of the world. They have to agree. A prompt without grounding references will hallucinate; a reference without a prompt will sit static.
- **Start simple, iterate.** A heavy, over-detailed prompt can produce *worse* results than a short scene-grounded one — it competes with the references and confuses the model. Begin with a one- or two-line prompt. Generate. If the result misses something specific, add only the detail that fixes that miss, and re-roll. Heavy prompts (timestamps, physics blocks, global locks) belong on takes where simple prompts have already failed.
- For face / hand close-ups, **name the micro-motion explicitly** in the prompt ("she blinks", "her fingers tighten around the cup", "a slow exhale"). Seedance often won't infer micro-motion from a still reference alone.
- Simplicity beats complexity in prompting — but simplicity is not the absence of details. Pick the right details.

**Prompt templates (escalating from simple → heavy):**

Use these as starting points. Always begin from the SIMPLEST template that fits the take — only escalate to the heavy template if the simple one keeps producing the wrong result after a few re-rolls. `[BLANKS]` are filled per shot.

**1. Character / subject sheet** — ground every continuation take with this, generated once from the starting frame using any reference-grounded image model:

```
Create a professional [SUBJECT_CATEGORY — character / vehicle / object / garment / architecture / creature] reference sheet based strictly on the uploaded reference image. Use a clean, neutral seamless studio background (soft light grey, cyclorama). Match the exact visual style of the reference — same realism level, rendering approach, surface treatment, reflectivity, palette, and overall aesthetic. Arrange the composition into two horizontal rows.

Top row: four full [SUBJECT] views placed side-by-side, centered and evenly spaced, in this order:
1) [VIEW_1 — primary hero angle], 2) [VIEW_2 — orthogonal side view], 3) [VIEW_3 — opposing 3/4 angle], 4) [VIEW_4 — pure rear or back view].

Bottom row: four tight detail close-ups aligned beneath the top row, capturing [SIGNATURE_FEATURES — distinguishing details that make this subject specific] in this order:
1) [DETAIL_1 — front-facing signature feature], 2) [DETAIL_2 — characteristic material or surface treatment], 3) [DETAIL_3 — secondary distinguishing detail or branding], 4) [DETAIL_4 — rear / back-facing detail].

Maintain perfect identity consistency across every panel: identical [KEY_ATTRIBUTES — color, finish, proportions, distinguishing marks]. Keep the [SUBJECT] in a neutral, static pose [POSE_NOTE — e.g. wheels straight, arms relaxed, doors closed, fabric undisturbed]. Consistent scale and alignment between views, uniform framing, consistent [SUBJECT] height across the top row, consistent focal scale across the close-ups. Lighting is consistent across all panels — soft overhead key with gentle fill, clean controlled reflections on [PRIMARY_SURFACE — e.g. paint / fabric / skin / metal / glass], natural contact shadows, no dramatic mood shifts. Output a crisp, print-ready [SUBJECT_CATEGORY] reference sheet, sharp details, production-grade.
```

**2. First take — SIMPLE (Seedance 2.0)** — attach starting frame as the only reference. Try this first; this is usually all you need:

```
a cinematic [SHOT_TYPE — e.g. low-angle tracking / wide establishing / overhead push-in] of [SUBJECT] in [LOCATION/SETTING]. [ACTION_OR_MOOD — one short clause].
```

Concrete example (Ferrari tutorial, Step 03):
> *a cinematic low angle tracking shot of a Ferrari F40 in Tokyo, Dynamic high speed shot*

**3. Continuation take — SIMPLE (Seedance 2.0)** — attach previous take as `@video1`, character sheet, and last frame. Try this first:

```
continue @video1, [SUBJECT] [ONGOING_ACTION] in [LOCATION], [CAMERA_MOVE — single clause: tracking / orbit / dolly in / pull back].
```

Concrete example (Step 04):
> *continue @video1, the black Ferrari F40 drives on a street of Tokyo, cinematic tracking camera orbiting around the car*

**4. Continuation take — HEAVY (Seedance 2.0)** — only if the simple version keeps missing the move, the identity, the grade, or a specific environmental detail. Adds explicit timestamps, identity lock, physics, and global constraints:

```
Continue @video1 directly from its final frame. Same [SUBJECT] as @image1 throughout — [IDENTITY_LOCK — distinguishing visual attributes that must NOT drift between takes: colors, finishes, proportions, marks]. [STARTING_STATE — what is already happening at frame 0, carried over from @video1].

[0s] Opens on the exact framing of @video1's last frame, [SUBJECT] [STARTING_MOTION]. [PRIMARY_CAMERA_MOVE — direction, lens behaviour, subject relationship over the first beat].

[Xs] [MID_BEAT — what the camera lands on, environmental detail, palette accents].

[Ys] [CLOSING_BEAT — how the shot resolves into the next take].

Style: [ASPECT_RATIO — e.g. anamorphic 2.39:1], [GENRE_LOOK], [GRAIN], [PALETTE / GRADE_NOTE — must match @video1].

Physics: [PHYSICAL_BEHAVIOURS the model usually drops — suspension, vibration, slipstream, hair drift, fabric, contact shadows, micro-shake].

Global: same [SUBJECT] every frame, identical [LOCKED_ATTRIBUTES], [SCENE_CONSTRAINTS — e.g. no cuts, no other primary subjects entering frame, no pedestrians crossing the hero], [ASPECT_RATIO_LOCK matching @video1], seamless grade continuation.

Audio: [AUDIO_BED continuing uninterrupted from @video1 — instruments, environmental sound, dialogue absent / present].
```

**5. Cross-boundary or perspective-change continuation** — when the camera physically passes from one space to another (exterior → cabin interior, outside → through a window, wide → tight close-up). Same heavy structure as #4, plus an explicit *transition* clause and a NEW reference image of the destination state:

```
[Heavy continuation prompt as in #4, with these additions:]

[Camera move includes the transition explicitly:] camera continuously [CROSSES_BOUNDARY — pushes through the windshield / passes through the doorway / racks focus from background to subject], reflections / exterior light resolving into [NEW_INTERIOR_OR_FOREGROUND]. Once across, camera settles at [NEW_FRAMING] with [HANDHELD / MOUNTED / STATIC] motion characteristic of the new space.

Subject (new framing): [DETAILED_DESCRIPTION_OF_NEWLY_VISIBLE_SUBJECT — only when a new subject becomes the hero of the take].

Global: handheld micro-shake (or other space-specific motion) activates ONLY after the camera is across the boundary. Single unbroken take, no cuts.
```

Add a portrait or detail reference image of the destination subject alongside the existing references — Seedance hallucinates faces and fine details aggressively if you don't ground them.

**Full reference workflow** (annotated prompts, references, outputs):
https://laniameda.space/ferrari

**Krea node graph for the reference project:**
https://www.krea.ai/nodes/019d97f4-a851-733a-85bb-c30cb82325ee
