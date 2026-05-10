import { NextResponse } from "next/server"
import { readFile, writeFile } from "fs/promises"
import path from "path"
import {
  buildMetaCode,
  buildSectionsCode,
  normalizeDraft,
} from "@/app/tutorials/ferrari/ferrari-editable"

const COOKIE_NAME = "laniameda_admin"
const SOURCE_FILE = path.join(
  process.cwd(),
  "src",
  "app",
  "tutorials",
  "ferrari",
  "ferrari-content.ts"
)

/**
 * Dev-only: write the editor draft directly into `ferrari-content.ts`.
 *
 * Replaces the `FERRARI_META = {...} as const` and
 * `FERRARI_SECTIONS: SectionContent[] = [...]` blocks while leaving the
 * imports, type definitions, helper consts, and the
 * `renderFerrariMarkdown` function untouched.
 *
 * Refuses in production because Vercel/most hosts mount the
 * filesystem read-only at runtime — for those use the "Export TS"
 * fallback to download the snippet and paste it manually.
 */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error:
          "Apply disabled in production. Use Export TS to download a snippet and commit it manually.",
      },
      { status: 403 }
    )
  }

  const cookie = request.headers.get("cookie") ?? ""
  if (!cookie.split(";").some((c) => c.trim().startsWith(`${COOKIE_NAME}=1`))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { draft?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const draft = normalizeDraft(body.draft)

  const newMeta = buildMetaCode(draft)
  const newSections = buildSectionsCode(draft)

  let source: string
  try {
    source = await readFile(SOURCE_FILE, "utf8")
  } catch (err) {
    return NextResponse.json(
      { error: `Source file not readable: ${(err as Error).message}` },
      { status: 500 }
    )
  }

  // Greedy until "as const" — META block has predictable end.
  const metaPattern = /export const FERRARI_META = \{[\s\S]*?\} as const/m
  if (!metaPattern.test(source)) {
    return NextResponse.json(
      { error: "Could not locate FERRARI_META block in source." },
      { status: 500 }
    )
  }
  source = source.replace(metaPattern, newMeta)

  // SECTIONS block is the array literal up to the closing `]` on its own
  // line. Anchor on `\n]` so we don't swallow the trailing helper code.
  const sectionsPattern = /export const FERRARI_SECTIONS: SectionContent\[\] = \[[\s\S]*?\n\]/m
  if (!sectionsPattern.test(source)) {
    return NextResponse.json(
      { error: "Could not locate FERRARI_SECTIONS block in source." },
      { status: 500 }
    )
  }
  source = source.replace(sectionsPattern, newSections)

  try {
    await writeFile(SOURCE_FILE, source, "utf8")
  } catch (err) {
    return NextResponse.json(
      { error: `Write failed: ${(err as Error).message}` },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
