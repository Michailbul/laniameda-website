import { NextResponse } from "next/server"
import { mkdir, readFile, writeFile } from "fs/promises"
import path from "path"

/**
 * Newsletter capture endpoint.
 *
 * Persists each signup as a Resend audience contact, plus two
 * always-on safety nets:
 *
 *   1. **Resend audience** (production target) — when `RESEND_API_KEY`
 *      and `RESEND_AUDIENCE_ID` are set. POSTs to
 *      `/audiences/{id}/contacts` with the email + a `properties.source`
 *      tag so we can later filter contacts by which guide they signed
 *      up from. Duplicate emails are treated as success (the user's
 *      intent — being on the list — is satisfied either way).
 *   2. **Server log** — always. `[newsletter] {…}` lines are visible
 *      in `next dev` and Vercel runtime logs. Recovery path if Resend
 *      is down or the API key is misconfigured.
 *   3. **Local JSON file** at `data/newsletter-emails.json` in dev
 *      only (Vercel mounts the runtime fs read-only).
 *
 * External writes are best-effort: a Resend failure logs but doesn't
 * break the user-facing 200 response. We'd rather not lose a signup
 * over a transient outage.
 *
 * See `docs/newsletter-resend-setup.md` for the 3-step setup.
 */

interface SignupRecord {
  email: string
  source: string
  receivedAt: string
}

const DATA_FILE = path.join(process.cwd(), "data", "newsletter-emails.json")

// Pragmatic email regex — rejects the obvious garbage without trying to
// be RFC 5322 compliant. Resend does the real validation server-side.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email: unknown }).email ?? "").trim().toLowerCase()
      : ""
  const source =
    typeof body === "object" && body !== null && "source" in body
      ? String((body as { source: unknown }).source ?? "").slice(0, 80)
      : "unknown"

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email" }, { status: 400 })
  }

  const record: SignupRecord = {
    email,
    source: source || "unknown",
    receivedAt: new Date().toISOString(),
  }

  // Always log so the signup shows up in `next dev` + Vercel logs —
  // this is the safety net if the Resend write fails.
  console.log("[newsletter]", JSON.stringify(record))

  const resendConfig = readResendConfig()
  if (resendConfig) {
    try {
      await forwardToResend(resendConfig, record)
    } catch (err) {
      console.warn("[newsletter] resend forward failed:", err)
    }
  }

  if (process.env.NODE_ENV !== "production") {
    try {
      await appendToLocalFile(record)
    } catch (err) {
      // Don't fail the request if local persistence breaks — the log
      // entry above is already enough to recover the signup.
      console.warn("[newsletter] local persist failed:", err)
    }
  }

  return NextResponse.json({ ok: true })
}

interface ResendConfig {
  apiKey: string
  audienceId: string
}

function readResendConfig(): ResendConfig | null {
  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!apiKey || !audienceId) return null
  return { apiKey, audienceId }
}

async function forwardToResend(cfg: ResendConfig, record: SignupRecord) {
  // POST /audiences/{audience_id}/contacts
  // Body fields: email, unsubscribed?, first_name?, last_name?.
  //
  // We don't send `properties` here because Resend requires custom
  // properties be *defined* in the audience UI first — sending an
  // arbitrary key returns 422 "One or more properties do not exist".
  // Source tracking lives in the safety-net log line above instead
  // (search Vercel logs for `[newsletter]`). When you want to filter
  // contacts in Resend by which guide they came from, define a
  // `source` property in the audience and re-add it to this body.
  const body = {
    email: record.email,
    unsubscribed: false,
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)
  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${cfg.audienceId}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cfg.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      }
    )

    // 200/201 → contact created. 422 with "already exists" semantics
    // → already in the audience, which is fine for our purposes.
    // Treat both as success.
    if (res.ok) return

    const detail = await res.json().catch(() => null) as
      | { name?: string; message?: string; statusCode?: number }
      | null
    const looksLikeDuplicate =
      res.status === 409 ||
      (res.status === 422 &&
        typeof detail?.message === "string" &&
        /already\s+exist/i.test(detail.message))
    if (looksLikeDuplicate) return

    throw new Error(
      `Resend returned ${res.status}: ${detail?.message ?? "unknown error"}`
    )
  } finally {
    clearTimeout(timeout)
  }
}

async function appendToLocalFile(record: SignupRecord) {
  await mkdir(path.dirname(DATA_FILE), { recursive: true })
  let existing: SignupRecord[] = []
  try {
    const raw = await readFile(DATA_FILE, "utf8")
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) existing = parsed
  } catch {
    // File missing or unreadable — start fresh.
  }

  // De-dupe by email so repeated submits don't bloat the file.
  const filtered = existing.filter((r) => r.email !== record.email)
  filtered.push(record)
  await writeFile(DATA_FILE, JSON.stringify(filtered, null, 2) + "\n", "utf8")
}
