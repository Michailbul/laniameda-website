/**
 * Ferrari tutorial — single source of truth for the markdown export.
 *
 * Keep this file in sync with the rich page renderer. The HTML page is the
 * designed reading experience; this string is what gets copied to clipboard
 * for AI agents to consume. All asset paths are absolute so any agent can
 * fetch them directly.
 */

export const FERRARI_DOMAIN = "https://laniameda.space"
export const FERRARI_TUTORIAL_URL = `${FERRARI_DOMAIN}/ferrari`
export const FERRARI_SKILL_FILENAME = "seedance-continuous-shots.skill.md"
export const FERRARI_SKILL_HREF = `/skills/${FERRARI_SKILL_FILENAME}`

export const FERRARI_META = {
  eyebrow: "TUTORIAL · 01 · CINEMATOGRAPHY",
  label: "FERRARI · TOKYO · CONTINUOUS SHOT",
  title: "How to make a continuous cinematic shot in Seedance 2.0 — past the 15-second cap",
  lede: "Seedance 2.0 caps at 15 seconds per generation, so longer cinematic shots seem impossible. The technique in this workflow gets past that. The trick: upload the previous video as a reference for the next generation, prompt smart, then stitch the takes.",
  readMinutes: 14,
  updated: "May 2026",
  skillName: "seedance-continuous-shots",
  finalVideoTitle: "The result",
  skillFooterTitle: "Run this workflow as a one-shot prompt",
  skillFooterBody: "Drop the skill to your AI agent, to extract the very juice of that workflow and make your agent remember it for a lifetime and future use. ",
  newsletterTitle: "Get the next AI filmmaking guide in your inbox",
  newsletterBody: "If you got value from that breakdown - please leave your email and I will notify you when a new workflow drops. Im obsessed with the small little details about AI filmmaking that no one online really speaks of. ",
} as const

export interface PromptBlock {
  label: string
  title?: string
  prompt: string
  /**
   * Optional templatized version of the same prompt with `[BLANKS]` for the
   * variables. When present, the card shows a "Filled / Template" toggle so
   * the reader can copy the reusable form for any subject/scene.
   */
  templatePrompt?: string
  /** Inputs to the prompt — small thumbnails in a horizontal carousel. */
  references?: Array<{ type: "image" | "video"; src: string; label?: string }>
  /** Generated results from this prompt — large frames in a carousel. */
  outputs?: Array<{
    type: "image" | "video"
    src: string
    alt?: string
    caption?: string
    aspectRatio?: string
  }>
  note?: string
}

export interface MediaBlock {
  type: "image" | "video"
  src: string
  alt?: string
  caption?: string
  aspectRatio?: string
}

export interface SectionContent {
  id: string
  index: string
  label: string
  title: string
  /** Short label shown in the dynamic-island TOC. Falls back to `title`. */
  tocLabel?: string
  /** Plain prose paragraphs interleaved with prompts and media. */
  body: Array<
    | { kind: "p"; text: string }
    | { kind: "ul"; items: string[] }
    | { kind: "ol"; items: string[] }
    | { kind: "quote"; text: string; cite?: string }
    | { kind: "prompt"; data: PromptBlock }
    | { kind: "media"; data: MediaBlock }
    | { kind: "callout"; text: string }
  >
}

// External assets the user has on Krea — referenced directly. Will work
// until Krea CDN URLs change. Replace with locally-hosted versions in
// /public/tutorials/ferrari/ when convenient.
const KREA_STARTING_VIDEO =
  "https://app-uploads.krea.ai/public/bea9014d-f9b7-41c7-92df-809ea4472f1a-video.mp4"
const KREA_CHARACTER_IMAGE =
  "https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fapp-uploads.krea.ai%2F0043c728-c223-45e2-b7a0-f831bf2ca988%2F1776512752855-freepik_3d-a-22yearold-asian-woma_2800793632.png"

export const FERRARI_SECTIONS: SectionContent[] = [
  {
    "id": "the-cap",
    "index": "01",
    "label": "OVERVIEW",
    "title": "The 15-second cap, and the workaround",
    "tocLabel": "Overview",
    "body": [
      {
        "kind": "p",
        "text": "Seedance 2.0 caps at 15 seconds per generation. So at first glance, longer cinematic shots are impossible."
      },
      {
        "kind": "p",
        "text": "The technique I'm going to show you in this workflow gets past that. To create one continuous shot, you have to upload the previous video as a reference video to Seedance 2.0 - then stitch the takes in post."
      }
    ]
  },
  {
    "id": "starting-frame",
    "index": "02",
    "label": "STEP 01",
    "title": "Set the vibe — generate the starting frame",
    "tocLabel": "Starting frame",
    "body": [
      {
        "kind": "p",
        "text": "I started the generation from the specific vibe and style I wanted. For this shot, I wanted a cinematic Tokyo vibe with a Ferrari F40. I used Midjourney v8.1 — I prefer Midjourney over edit-based thinking models. Here is the Midjourney prompt:"
      },
      {
        "kind": "prompt",
        "data": {
          "label": "MIDJOURNEY V8.1",
          "title": "Tokyo F40 — starting frame",
          "prompt": "Rear three-quarter view of gloss black Ferrari F40 pulling away into Tokyo traffic. Shinjuku urban intersection, Japanese signage, grey buildings, overcast sky. Triple exhaust tips visible, subtle heat distortion. Iconic rear wing silhouette. Red taillights glowing, amber turn signal. Black 5-spoke wheels in motion, slight radial blur. Low camera angle, 35mm lens feel. Car receding into frame center, city traffic flanking. Flat diffused daylight, wet asphalt reflections from earlier rain. Desaturated cool palette, lifted blacks, organic grain. Kodak Vision3 500T emulation. No sun, no warmth, no night. No cartoon, no anime, no exaggerated motion blur.",
          "note": "",
          "references": [
            {
              "type": "image",
              "src": "/tutorials/ferrari/uploads/mox2oaku-michailbul_httpss-mj-runs-6u9f7m47a_the_image_captures_the_l.png",
              "label": "michailbul_httpss-mj-runs-6u9f7m47a_the_image_captures_the_l.png"
            }
          ],
          "outputs": [
            {
              "type": "image",
              "src": "/tutorials/ferrari/uploads/mox40159-midjourney_v81_j5mgbd85aox9p8nzo2ax_0.png",
              "aspectRatio": "16/9"
            }
          ]
        }
      },
      {
        "kind": "p",
        "text": ""
      }
    ]
  },
  {
    "id": "character-sheet",
    "index": "03",
    "label": "STEP 02",
    "title": "Build the character sheet",
    "tocLabel": "Character sheet",
    "body": [
      {
        "kind": "p",
        "text": "Generate the character sheet for the subject. In my case it was the Ferrari F40 — but the same prompt structure adapts to any object. You can copy the template of the character sheet prompt i used, adapting it to your own project with the help of an Agent. "
      },
      {
        "kind": "prompt",
        "data": {
          "label": "GPT image 2 ",
          "title": "Character sheet — Ferrari F40",
          "prompt": "Create a professional automotive reference sheet based strictly on the uploaded reference image. Use a clean, neutral seamless studio background (soft light grey, cyclorama). Match the exact visual style of the reference — same realism level, rendering approach, paint treatment, reflectivity, and overall aesthetic. Arrange the composition into two horizontal rows.\n\nTop row: four full vehicle views placed side-by-side, centered and evenly spaced, in this order:\n1) front 3/4 hero angle (front-left), 2) pure side profile (driver side), 3) rear 3/4 angle (rear-right), 4) pure rear view.\n\nBottom row: four tight detail close-ups aligned beneath the top row in this order:\n1) front fascia close-up (headlight, grille, bumper), 2) wheel + brake caliper close-up (driver side front), 3) side body detail (door handle, character line, badge), 4) rear detail (taillight, diffuser, exhaust).\n\nMaintain perfect identity consistency across every panel: identical paint color, wheel design, badge placement, ride height, trim, and proportions. Keep the car stationary with wheels pointing straight. Consistent scale and alignment between views, uniform framing, consistent vehicle height across the top row, consistent focal scale across the close-ups. Lighting is consistent across all panels — soft overhead key with gentle fill, clean controlled reflections on the paint, natural contact shadows, no dramatic mood shifts. Output a crisp, print-ready automotive reference sheet, sharp details, production-grade.",
          "templatePrompt": "Create a professional [SUBJECT_CATEGORY — e.g. character / vehicle / object / garment / architecture / creature] reference sheet based strictly on the uploaded reference image. Use a clean, neutral seamless studio background (soft light grey, cyclorama). Match the exact visual style of the reference — same realism level, rendering approach, surface treatment, reflectivity, palette, and overall aesthetic. Arrange the composition into two horizontal rows.\n\nTop row: four full [SUBJECT] views placed side-by-side, centered and evenly spaced, in this order:\n1) [VIEW_1 — primary hero angle], 2) [VIEW_2 — orthogonal side view], 3) [VIEW_3 — opposing 3/4 angle], 4) [VIEW_4 — pure rear or back view].\n\nBottom row: four tight detail close-ups aligned beneath the top row, capturing [SIGNATURE_FEATURES — distinguishing details that make this subject specific] in this order:\n1) [DETAIL_1 — front-facing signature feature], 2) [DETAIL_2 — characteristic material or surface treatment], 3) [DETAIL_3 — secondary distinguishing detail or branding], 4) [DETAIL_4 — rear / back-facing detail].\n\nMaintain perfect identity consistency across every panel: identical [KEY_ATTRIBUTES — color, finish, proportions, distinguishing marks]. Keep the [SUBJECT] in a neutral, static pose [POSE_NOTE — e.g. wheels straight, arms relaxed, doors closed, fabric undisturbed]. Consistent scale and alignment between views, uniform framing, consistent [SUBJECT] height across the top row, consistent focal scale across the close-ups. Lighting is consistent across all panels — soft overhead key with gentle fill, clean controlled reflections on [PRIMARY_SURFACE — e.g. paint / fabric / skin / metal / glass], natural contact shadows, no dramatic mood shifts. Output a crisp, print-ready [SUBJECT_CATEGORY] reference sheet, sharp details, production-grade.",
          "note": "",
          "outputs": [
            {
              "type": "image",
              "src": "/tutorials/ferrari/uploads/moyejvzr-gpt_image_2_jgkcbcg8vs02mo8y0f9q_0.png",
              "aspectRatio": "16/9"
            }
          ],
          "references": [
            {
              "type": "image",
              "src": "/tutorials/ferrari/uploads/moyp831j-magnific_photo-a-black-ferrari-f40_2800731066.png"
            }
          ]
        }
      },
      {
        "kind": "media",
        "data": {
          "type": "image",
          "src": "/tutorials/ferrari/character-sheet-f40.jpg",
          "caption": "Resulting character sheet — drop your render here",
          "aspectRatio": "16/9"
        }
      }
    ]
  },
  {
    "id": "starting-video",
    "index": "04",
    "label": "STEP 03",
    "title": "Starting video — the first continuous take",
    "tocLabel": "First video",
    "body": [
      {
        "kind": "p",
        "text": "Upload the starting frame to Seedance 2.0. Here's the prompt:"
      },
      {
        "kind": "prompt",
        "data": {
          "label": "SEEDANCE 2.0",
          "title": "Starting video",
          "prompt": "a cinematic low angle tracking shot of a Ferrari F40 in Tokyo, Dynamic high speed shot",
          "note": "Notice it's not super complex and Claude-injected. Sometimes the simpler it is, the better. The reason: the starting frame already tells Seedance 2.0 most of what it needs. That's the first rule — always rely on the starting frame first. It matters more than any JSON prompt.",
          "references": [
            {
              "type": "image",
              "src": "/tutorials/ferrari/uploads/moyo5nxn-midjourney_v81_j5mgbd85aox9p8nzo2ax_0.png"
            }
          ],
          "outputs": [
            {
              "type": "video",
              "src": "/tutorials/ferrari/uploads/moyo6j8p-bea9014d-f9b7-41c7-92df-809ea4472f1a-video.mp4",
              "aspectRatio": "16/9"
            }
          ]
        }
      }
    ]
  },
  {
    "id": "orbit-shot",
    "index": "05",
    "label": "STEP 04",
    "title": "The orbit shot — continue the take",
    "tocLabel": "Second part",
    "body": [
      {
        "kind": "p",
        "text": "For the next Seedance 2.0 generation, you attach four things:"
      },
      {
        "kind": "ol",
        "items": [
          "The prompt (listed below) ",
          "The reference video - the one we just generated in step 3.",
          "The Ferrari F40 character sheet.",
          "The last frame from the source video."
        ]
      },
      {
        "kind": "p",
        "text": "Why attach the character sheet of the Ferrari? Because I want the shot to continue in the direction of the camera orbit around the car. That means Seedance has to extrapolate how the front of the Ferrari looks — it's not present in the starting frame, nor in the uploaded video."
      },
      {
        "kind": "callout",
        "text": "Think of it this way: Seedance can only generate what it sees. The more control you want, the more you have to enlighten it with visuals."
      },
      {
        "kind": "prompt",
        "data": {
          "label": "SEEDANCE 2.0",
          "title": "Orbit shot — simple prompt",
          "prompt": "continue @video1, the black Ferrari F40 drives on a street of Tokyo, cinematic tracking camera orbiting around the car",
          "references": [
            {
              "type": "image",
              "src": "/tutorials/ferrari/uploads/moyo9b62-gpt_image_2_jgkcbcg8vs02mo8y0f9q_0.png"
            },
            {
              "type": "video",
              "src": "/tutorials/ferrari/uploads/moyocnzv-second_video_twce5iup0o633z4w1fkb_0.mp4"
            },
            {
              "type": "image",
              "src": "/tutorials/ferrari/uploads/moyodbdz-get_video_frame_9o7efhz98xq1por7uhxv_0.png"
            },
            {
              "type": "image",
              "src": "/tutorials/ferrari/uploads/moyody6e-character_main_sqw65vijwwkq0fjnrngp_0.png"
            }
          ],
          "outputs": [
            {
              "type": "video",
              "src": "/tutorials/ferrari/uploads/moyoepo8-stage_3_-v1_5pv06ccjcg23kue3y8b5_0.mp4",
              "aspectRatio": "16/9"
            }
          ]
        }
      },
      {
        "kind": "p",
        "text": "I also explored another prompting strategy for camera-movement prompts. I used Claude (inside the Krea node canvas) to help me create an enhanced version of the prompt for the camera movement, thinking it would improve quality. Here's the enhanced prompt and generation"
      },
      {
        "kind": "prompt",
        "data": {
          "label": "SEEDANCE 2.0 — CLAUDE ENHANCED",
          "title": "Orbit shot — controlled version",
          "prompt": "Continue @video1 directly from its final frame. Same black Ferrari F40 as @image1 throughout — identical gloss black paint, Ferrari yellow shield badge on front fender and rear, matte black five-spoke forged wheels, twin round taillights, triple-exhaust outlets, iconic large rear wing, carbon rear grille. Car is already in motion at speed down a narrow Tokyo street.\n\n[0s] Opens on the exact rear three-quarter framing of @video1's last frame, F40 already moving. Low cinematic arcing orbit — camera sweeps from rear three-quarter around the driver side to front three-quarter, traveling with the car at matched speed, F40 centered throughout the arc.\n\n[4s] Orbit lands on front three-quarter hero framing. Dense Tokyo storefronts, illuminated kanji signage, green street signs, overhead power lines, parked cars lining the curb. Overcast grey sky, damp asphalt, muted concrete palette punctuated by red and amber signage accents.\n\n[6s] Telephoto compression as the F40 pulls ahead down the street, brake lights briefly flaring before clearing through.\n\nStyle: anamorphic 2.39:1, premium automotive commercial realism, overcast Tokyo afternoon, fine 35mm grain, crushed blacks on the F40 body, moody color grade matching @video1.\n\nPhysics: suspension compression on uneven asphalt, tire grip under lateral load through the orbit, subtle chassis and side-mirror vibration, directional motion blur on background buildings, slipstream lifting small debris and leaves behind the car, faint heat shimmer at the exhaust.\n\nGlobal: same Ferrari F40 every frame, identical paint / wheels / badges / silhouette / wing / exhaust, no other cars cutting through the hero composition, no pedestrians crossing in front of the car, continuous single shot with no cuts, 16:9 output matching @video1 aspect ratio, seamless grade continuation.\n\nAudio: deep F40 twin-turbo V8 exhaust continuing from @video1, turbo whoosh between throttle lifts, wind buffeting, distant Tokyo traffic hum, brief tire chirp through the corner.",
          "note": "Used the Seedance 2.0 Claude skill to craft this. Rule of thumb: if you have a specific camera movement in mind, use Claude to write it with precision. If you're flexible, a simple prompt may give you something you didn't expect — but still works for your case.  In that case, the complex Claude-crafted prompt provided less consistent results across multiple generations.",
          "references": [
            {
              "type": "image",
              "src": "/tutorials/ferrari/uploads/moyo9b62-gpt_image_2_jgkcbcg8vs02mo8y0f9q_0.png"
            },
            {
              "type": "video",
              "src": "/tutorials/ferrari/uploads/moyocnzv-second_video_twce5iup0o633z4w1fkb_0.mp4"
            },
            {
              "type": "image",
              "src": "/tutorials/ferrari/uploads/moyodbdz-get_video_frame_9o7efhz98xq1por7uhxv_0.png"
            },
            {
              "type": "image",
              "src": "/tutorials/ferrari/uploads/moyody6e-character_main_sqw65vijwwkq0fjnrngp_0.png"
            }
          ],
          "outputs": [
            {
              "type": "video",
              "src": "/tutorials/ferrari/uploads/moypbl0q-stage_2_-_variations_poasy8liaxy6mdq0bz1z_0.mp4",
              "aspectRatio": "16/9"
            }
          ]
        }
      },
      {
        "kind": "p",
        "text": "Worth noting: I generated a batch of videos, not one. In general, that's a common rule when working with Seedance and generative AI - don't aim for the moonshot, aim for diversity to choose from."
      }
    ]
  },
  {
    "id": "stitching",
    "index": "06",
    "label": "STEP 05",
    "title": "Stitch the two videos in DaVinci Resolve",
    "tocLabel": "Stitching",
    "body": [
      {
        "kind": "p",
        "text": "Bring both clips into DaVinci Resolve. Place them on a single track end to end. Delete a few frames at the seam to align the two clips so the motion reads continuous."
      },
      {
        "kind": "media",
        "data": {
          "type": "image",
          "src": "/tutorials/ferrari/uploads/mozpvi6g-cleanshot-2026-05-10-at-13-54-50-2x.png",
          "aspectRatio": "16/9"
        }
      }
    ]
  },
  {
    "id": "into-the-cabin",
    "index": "07",
    "label": "STEP 06",
    "title": "Cross into the cabin — through the windshield",
    "tocLabel": "Third video part",
    "body": [
      {
        "kind": "p",
        "text": "Same setup as before — previous video, last frame, character image. This time no car sheet — we're inside the cabin and the car is no longer the subject. Don't overcomplicate Seedance with excessive details. Prompt smart."
      },
      {
        "kind": "prompt",
        "data": {
          "label": "SEEDANCE 2.0",
          "title": "Crossing the windshield into the cabin",
          "prompt": "continue @video1, the black Ferrari F40 drives on a street of Tokyo, cinematic continuous tracking camera smoothly and gradually dollies in — closing distance on the car, pushing toward the windshield, crossing through the glass without a cut, exterior reflections resolving into the interior cabin as focus racks to her face. Once inside, camera settles at her eye line with subtle natural handheld micro-shake from the road, still part of the same unbroken take.\n\nSubject — East Asian woman, mid-twenties, mixed Chinese-Korean or Japanese features. Sculpted narrow face with a long jawline, high angular cheekbones, porcelain skin with warm undertones, no visible makeup beyond lip color. Low-lidded almond eyes with softly downturned outer corners, dark brown-black irises, a cool unblinking gaze. Thin straight eyebrows with a subtle lift at the inner corner. Narrow refined nose with a soft bridge. Full naturally pigmented lips, glossy red-brown, defined cupid's bow, relaxed and barely parted. Hair matches the reference portrait exactly — long straight jet-black, middle part, swept smoothly back at the crown, two loose face-framing strands falling forward with one longer piece draping across her right cheek down to the chin line, soft wisps at the temple catching light, ends blunt and clean. Black high-neck bodysuit with a deep V-cut at the sternum, thin silver chain pendant resting in the V, asymmetrical silver bone-like earrings. Bare hands, no gloves, elegant long tapered painted manicure on the leather steering wheel.\n\nPsychotype — quiet command, aristocratic executioner, simmering fury held under absolute discipline. She does not perform emotion, she locks it down. Lethal intensity beneath an impassive surface. Purposeful driving, like a predator closing in on prey. Hawk-eyed, hyper-focused, projecting a dangerous stillness. Suppressed hostility, dignified solitude, latent power held under glass. The car is an extension of her precision and her will.\n\nAction — she drives with cold, predatory anticipation — spine perfectly straight, dancer's posture leaning fractionally forward into the vehicle's momentum, chin slightly lowered so her unblinking gaze pierces upward through low lids. Her painted fingertips shift from a resting touch to a deliberate, taut grip on the leather steering wheel, revealing flexing tendons under her porcelain skin without ever becoming white-knuckled. Her dark eyes dart sharply to the rearview mirror with surgical precision, pupils noticeably constricting in the amber light, before snapping back dead ahead. A single, dangerously slow blink; the rhythmic, steady fall of her chest holding a measured breath. A taut, visibly clenched jawline betrays a surge of controlled adrenaline, while her asymmetric face-framing hair drifts slightly in the cabin airflow. Absolute, lethal command of herself and the machine.\n\nStyle: anamorphic 2.39:1, 35mm grain, crushed blacks, desaturated cool exterior resolving into warmer red-amber dashboard glow inside the cabin, grade continuous with the prior scene. Premium automotive editorial realism.\n\nPhysics: F40 already in motion throughout — suspension compression on uneven asphalt continuing from the prior scene, chassis vibration, side-mirror micro-vibration, road texture felt through the camera once inside the cabin, hair micro-motion in cabin airflow, leather creak under her tightened grip, soft focus fall-off as the camera crosses the glass.\n\nGlobal: one continuous unbroken take, no cuts, no multi-shot structure, no scene change — the F40's forward motion is preserved from the first frame to the last, same woman every frame, same car every frame, no other cars cutting through the hero composition, no pedestrians crossing in front, handheld micro-shake activates only after the camera is inside the cabin, 16:9 output matching the prior scene, seamless grade continuation.\n\nAudio: F40 twin-turbo V8 exhaust from the prior scene continuing uninterrupted, attenuating naturally as the camera crosses into the cabin — distant exhaust through the glass, leather strain under her gripping fingers, tire and road rumble felt through the chassis, a single quiet breath, no cuts in the audio bed, no music.",
          "references": [
            {
              "type": "image",
              "src": "https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fapp-uploads.krea.ai%2F0043c728-c223-45e2-b7a0-f831bf2ca988%2F1776512752855-freepik_3d-a-22yearold-asian-woma_2800793632.png",
              "label": "Subject reference"
            },
            {
              "type": "video",
              "src": "/tutorials/ferrari/uploads/moypdqnt-stage_2_-_variations_poasy8liaxy6mdq0bz1z_0.mp4"
            }
          ],
          "note": "This shot took 17 generations (~$25–30 if not unlimited on Krea). That's why I was iterating on the prompt — trying to make it more sophisticated. Then I realized the prompt could have been improved by simplifying it instead.",
          "outputs": [
            {
              "type": "video",
              "src": "/tutorials/ferrari/uploads/moypjd0l-stage_3_-_v_3_katek10blbl9ec02hn5j_0.mp4",
              "aspectRatio": "16/9"
            }
          ]
        }
      },
      {
        "kind": "callout",
        "text": "Lesson: don't overcomplicate the prompt. Focus only on what really matters in the shot."
      },
      {
        "kind": "p",
        "text": "The way to best approach it: write a simple prompt in your own words, see how it breaks in the generation, then ask Claude to create a more controlled version using the Seedance prompting skill. Hit generate. See how it breaks. Change only the details you see broken. When you try to overcomplicate the prompt, Seedance resolves to randomness — showing you either some part of it or neither. Better to balance the model's interpolation with your control."
      },
      {
        "kind": "quote",
        "text": "Instead of long poetic description aim for simple, concise."
      }
    ]
  },
  {
    "id": "face-close-up",
    "index": "08",
    "label": "STEP 07",
    "title": "The face close-up — orbit her",
    "tocLabel": "Fourth video",
    "body": [
      {
        "kind": "p",
        "text": "Same as before: previous video, last frame, character image. No car sheet this time — we're already inside the cabin, and I want the camera to move to a close-up of her face. No need to overcomplicate Seedance with excessive details. Prompt smart."
      },
      {
        "kind": "prompt",
        "data": {
          "label": "SEEDANCE 2.0",
          "title": "Face close-up — slow orbit",
          "prompt": "Continue the reference video from the last frame — a stylish East Asian woman in her mid-twenties drives a black Ferrari F40 through Tokyo, camera mounted inside the cabin continuously orbiting her face in a slow deliberate arc, tight close-up. She grips the gated chrome shifter and downshifts, her long tapered glossy oxblood nails pressing with measured authority against the knob — no white knuckles, no hesitation, just quiet ownership. Her narrow sculpted face catches the warm amber dashboard glow on one side while the far side falls into deep committed shadow, high angular cheekbones cutting the light like architecture. Her porcelain skin reads flawless and matte, warm undertones surfacing under the tungsten fill bouncing off the red fabric bucket seat. Her low-lidded hooded almond eyes with softly downturned outer corners stay locked on the road — dark brown-black irises alive with focused predatory intensity, unblinking longer than natural, a hawk surveying territory she already owns. A single small off-center catchlight floats in each iris. Her glossy red-brown lips, naturally pigmented with a defined cupid's bow, remain closed or barely parted — impassive, never curling toward a smile, holding back everything and giving away nothing, the kind of mouth that makes silence feel like a command. Her thin straight eyebrows with a subtle inner-corner lift frame an expression of aristocratic detachment — not boredom, not coldness, but a controlled intensity simmering beneath glass, the face of someone who does not seek your approval and never will. Her breath is slow, a small measured rise of the chest visible at the deep V-cut of her black high-neck bodysuit. Her chin stays level — never tilted up in vanity, never dipped in deference. Her long straight jet-black hair, middle-parted and swept smoothly back at the crown, moves with the cabin airflow — one longer face-framing strand drapes diagonally across her right cheek down to the chin line, drifting and catching raking sidelight, while a shorter softer strand floats on the left, temple wisps shimmering. A thin silver chain pendant glints in the sternum V-cut, asymmetrical silver bone-like sculptural earrings catching stray light as the camera orbits. As the lens completes its arc the camera pushes in slowly, intimately, narrowing the frame until her eyes fill the screen — and in that final close-up we read everything she refuses to say aloud: dominance held like a breath, feminine gravity that pulls without performing, the quiet arrogance of someone born to command dressed in all black with silver edges. Anamorphic 2.39:1, fine 35mm film grain, crushed blacks, desaturated palette with selective red pop from the cabin seats and her lips, cool blue-grey Tokyo overcast bleeding through the windshield as blurred bokeh of kanji signage and wet asphalt, warm amber interior, raking sidelight across the cheekbone, telephoto compression, shallow depth of field with soft anamorphic horizontal flares drifting across the glass. She blinks.",
          "references": [
            {
              "type": "image",
              "src": "https://www.krea.ai/api/img?f=webp&i=https%3A%2F%2Fapp-uploads.krea.ai%2F0043c728-c223-45e2-b7a0-f831bf2ca988%2F1776512752855-freepik_3d-a-22yearold-asian-woma_2800793632.png",
              "label": "Character"
            },
            {
              "type": "video",
              "src": "/tutorials/ferrari/uploads/moypkhfm-stage_3_-_v_3_katek10blbl9ec02hn5j_0.mp4",
              "label": "vid-Stage-2"
            },
            {
              "type": "image",
              "src": "/tutorials/ferrari/uploads/moypmpkr-cleanshot-2026-05-09-at-21-01-01-2x.png",
              "label": "last frame"
            }
          ],
          "note": "The \"she blinks\" part is actually very important. The prompt Claude wrote didn't mention obvious things like that, and Seedance didn't resolve to it. This shot cost 9 generations for the best result.",
          "outputs": [
            {
              "type": "video",
              "src": "/tutorials/ferrari/uploads/moypom8u-stage-4-1.mp4",
              "aspectRatio": "16/9"
            }
          ]
        }
      }
    ]
  },
  {
    "id": "verdict",
    "index": "09",
    "label": "VERDICT",
    "title": "Cost, lessons, what I'd do differently",
    "tocLabel": "Lessons",
    "body": [
      {
        "kind": "p",
        "text": "In general the cost of a continuous shot like this is around $50 per shot (~26 generations × $2 each)."
      },
      {
        "kind": "ul",
        "items": [
          "Simple prompts may be enough if the starting frame is set.",
          "Best prompting strategy: start with the manual prompt → see where it breaks → use the Seedance skill with an AI agent to generate a more controllable version.",
          "READ IT AND REVIEW IT.",
          "Iterate. You can't tell if the prompt is bad or the reference images are poor until you've done at least 4 generations. AI creatorship is more of a numbers and perseverance game.",
          "CONTROVERSIAL: think like a model, not like a cinema director. When you think as a director, you think with a human brain and human memory. Diffusion models don't work that way. You have to adapt your thinking to how Seedance 2.0 generates a video — that means controlling your reference images and prompts, not including what the model doesn't need in the particular shot.",
          "When working in node editors like Magnific (Freepik, in the past) or Krea — you'll benefit from uploading the skill MD into the canvas and referencing it when asking the LLM to help you with prompting. Without it, you shoot in the dark and rely on outdated model knowledge — knowledge whose cutoff predates the release of the model you're trying to prompt.",
          "Simplicity > complexity in prompting. But simplicity does not mean the absence of details."
        ]
      }
    ]
  },
  {
    "id": "closing",
    "index": "10",
    "label": "CLOSING",
    "title": "Take it further",
    "tocLabel": "Regards",
    "body": [
      {
        "kind": "p",
        "text": "Thanks for reading through. Hope it helped you."
      },
      {
        "kind": "p",
        "text": "I filed this workflow into a skill so you can reuse it within your creative process with any AI agent. The skill has the templatized knowledge of how to create continuous shots using Seedance 2.0. "
      },
      {
        "kind": "p",
        "text": "Follow me on [Instagram](https://instagram.com/misha.buloy) or connect on [LinkedIn](https://www.linkedin.com/in/michael-buloichyk/). I'll be sharing more findings and advanced AI creatorship techniques no one notices and gives attention to."
      },
      {
        "kind": "p",
        "text": "P.S. The full [Krea node workflow](https://www.krea.ai/nodes/019d97f4-a851-733a-85bb-c30cb82325ee) for this entire project is open."
      }
    ]
  }
]

/**
 * Render the tutorial as Markdown for the "Copy MD for AI agent" button.
 * All asset URLs are absolute so the receiving agent can fetch them.
 */
export function renderFerrariMarkdown(): string {
  const out: string[] = []
  out.push(`# ${FERRARI_META.title}`)
  out.push("")
  out.push(`> ${FERRARI_META.lede}`)
  out.push("")
  out.push(`*Source: ${FERRARI_TUTORIAL_URL} · Updated ${FERRARI_META.updated} · ${FERRARI_META.readMinutes} min read*`)
  out.push("")
  out.push(`*Skill: ${FERRARI_DOMAIN}${FERRARI_SKILL_HREF}*`)
  out.push("")
  out.push("---")
  out.push("")

  for (const section of FERRARI_SECTIONS) {
    out.push(`## ${section.index} · ${section.title}`)
    out.push("")
    out.push(`*${section.label}*`)
    out.push("")

    for (const block of section.body) {
      switch (block.kind) {
        case "p":
          out.push(block.text)
          out.push("")
          break
        case "ul":
          for (const item of block.items) out.push(`- ${item}`)
          out.push("")
          break
        case "ol":
          block.items.forEach((item, i) => out.push(`${i + 1}. ${item}`))
          out.push("")
          break
        case "quote":
          out.push(`> ${block.text}${block.cite ? ` — ${block.cite}` : ""}`)
          out.push("")
          break
        case "callout":
          out.push(`> **${block.text}**`)
          out.push("")
          break
        case "prompt": {
          const p = block.data
          out.push(`### Prompt — ${p.label}${p.title ? ` (${p.title})` : ""}`)
          out.push("")
          out.push("```text")
          out.push(p.prompt)
          out.push("```")
          out.push("")
          if (p.references && p.references.length > 0) {
            out.push("**References:**")
            for (const ref of p.references) {
              const url = ref.src.startsWith("http") ? ref.src : `${FERRARI_DOMAIN}${ref.src}`
              const label = ref.label ?? `Reference ${ref.type}`
              out.push(`- ${ref.type === "video" ? "🎬" : "🖼️"} [${label}](${url})`)
            }
            out.push("")
          }
          if (p.note) {
            out.push(`*${p.note}*`)
            out.push("")
          }
          break
        }
        case "media": {
          const m = block.data
          const url = m.src.startsWith("http") ? m.src : `${FERRARI_DOMAIN}${m.src}`
          if (m.type === "video") {
            out.push(`**Video:** [${m.caption ?? "Watch"}](${url})`)
          } else {
            out.push(`![${m.alt ?? m.caption ?? "Image"}](${url})`)
          }
          if (m.caption) {
            out.push("")
            out.push(`*${m.caption}*`)
          }
          out.push("")
          break
        }
      }
    }

    out.push("---")
    out.push("")
  }

  out.push(`*Built by Laniameda · ${FERRARI_DOMAIN}*`)
  return out.join("\n")
}
