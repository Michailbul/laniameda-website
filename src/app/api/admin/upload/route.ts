import { NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"

const COOKIE_NAME = "laniameda_admin"
const UPLOAD_DIR = path.join(
  process.cwd(),
  "public",
  "tutorials",
  "ferrari",
  "uploads"
)
const PUBLIC_PREFIX = "/tutorials/ferrari/uploads"

const ACCEPTED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "image/avif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
])

const MAX_BYTES = 200 * 1024 * 1024 // 200 MB ceiling — generous for dev video

/**
 * Dev-only file upload. Writes to /public/tutorials/ferrari/uploads/ so the
 * file is immediately served as a static asset under the same path tree.
 * Refuses in production because Vercel's filesystem is read-only at runtime.
 */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Upload disabled in production. Run locally to add assets." },
      { status: 403 }
    )
  }

  const cookie = request.headers.get("cookie") ?? ""
  if (!cookie.split(";").some((c) => c.trim().startsWith(`${COOKIE_NAME}=1`))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 })
  }

  const file = formData.get("file")
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file in request" }, { status: 400 })
  }

  if (!ACCEPTED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: `Unsupported type: ${file.type}` },
      { status: 415 }
    )
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File too large (${Math.round(file.size / 1024 / 1024)}MB > 200MB cap)` },
      { status: 413 }
    )
  }

  const safeBase = file.name
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9\-_]/gi, "-")
    .replace(/-+/g, "-")
    .toLowerCase()
    .slice(0, 60) || "asset"
  const ext = file.name.split(".").pop()?.toLowerCase() ?? extFromMime(file.type)
  const stamp = Date.now().toString(36)
  const filename = `${stamp}-${safeBase}.${ext}`

  try {
    await mkdir(UPLOAD_DIR, { recursive: true })
    const filepath = path.join(UPLOAD_DIR, filename)
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filepath, buffer)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Write failed" },
      { status: 500 }
    )
  }

  return NextResponse.json({
    ok: true,
    path: `${PUBLIC_PREFIX}/${filename}`,
    kind: file.type.startsWith("video/") ? "video" : "image",
    size: file.size,
  })
}

function extFromMime(mime: string): string {
  if (mime === "image/jpeg") return "jpg"
  if (mime === "image/png") return "png"
  if (mime === "image/webp") return "webp"
  if (mime === "image/gif") return "gif"
  if (mime === "video/mp4") return "mp4"
  if (mime === "video/webm") return "webm"
  if (mime === "video/quicktime") return "mov"
  return "bin"
}
