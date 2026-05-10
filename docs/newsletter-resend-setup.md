# Newsletter → Resend Audience

The `/api/newsletter` route adds each signup as a contact to a Resend
audience. Plain REST, no SDK, two env vars, ~3 minutes to set up.

## One-time setup

### 1. Get a Resend API key

- Sign in at <https://resend.com>
- API Keys → **Create API Key**
- Permission: **Sending access** is enough for now — but if you want
  to add/edit contacts via this route, pick **Full access** (the
  `/audiences/.../contacts` endpoint requires it)
- Copy the key (starts with `re_…`). You only see it once.

### 2. Create an audience

- Audiences → **Create audience** → name it (e.g. `AI filmmaking guides`)
- Open the audience — the URL contains the ID:
  `https://resend.com/audiences/<AUDIENCE_ID>`
- It's a UUID like `78261eea-8f8b-4381-83c6-79fa7120f1cf`

### 3. Set the env vars

Local dev (`.env.local`):

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_AUDIENCE_ID=78261eea-8f8b-4381-83c6-79fa7120f1cf
```

Vercel:

```bash
vercel env add RESEND_API_KEY production
vercel env add RESEND_AUDIENCE_ID production
# repeat for `preview` if you want previews to write contacts too
# (recommended: separate audience for preview to keep test signups out)
```

Then redeploy.

## Test

```bash
curl -X POST https://laniameda.space/api/newsletter \
  -H 'content-type: application/json' \
  -d '{"email":"resend-test@example.com","source":"manual-test"}'
```

The contact should show up in the Resend audience within ~1s. The
`source` value lands in the contact's `properties` so you can later
filter by which guide each subscriber came from
(`source = "ferrari-tutorial"`, `source = "<next-guide-id>"`, etc.).

## What's stored on each contact

| Field | Value |
|---|---|
| `email` | The submitted address (lowercased + trimmed) |
| `unsubscribed` | `false` |

We don't capture `first_name` or `last_name` — the form is just an
email field. Add those later if you want a richer signup form.

### Source tracking (which guide captured the signup)

The `source` value (e.g. `ferrari-tutorial`) **is** captured per
signup but stored in the safety-net log line, not on the Resend
contact. To search later: `vercel logs --since=30d | grep "ferrari-tutorial"`.

To attach `source` directly to the contact in Resend (so you can filter
audiences by it), you have to define it as a *property* in the audience
UI first — Resend rejects any `properties` keys that aren't pre-defined.
Once defined, re-add the `properties` field to the request body in
`src/app/api/newsletter/route.ts` (the comment in `forwardToResend()`
shows the exact shape).

## Sending the actual newsletter

Once you've got contacts piling up:

- Resend Dashboard → **Broadcasts** → New broadcast
- Pick the audience
- Compose, send

Or programmatically via `POST /broadcasts` (out of scope here — set
that up when you're ready to send the first guide).

## Failure handling

The route is conservative — Resend failures **never** surface as an
error to the user (their intent of "be on the list" is recoverable
from logs):

- 200/201 from Resend → contact added, all good
- 409 / 422 "already exists" → silently treated as success (user already
  on the list — no surprise error in the form, no spammed Resend logs)
- 4xx / 5xx anything else → logs `[newsletter] resend forward failed: …`
  to Vercel logs; the safety-net `[newsletter] {…}` log line above it
  has the email + source so you can backfill manually
- `RESEND_API_KEY` or `RESEND_AUDIENCE_ID` missing → skips Resend
  entirely, log-only mode

## Verifying it's actually using Resend

Tail Vercel logs:

```bash
vercel logs --since=1h --follow
```

A successful signup is just one line:

```
[newsletter] {"email":"…","source":"ferrari-tutorial","receivedAt":"…"}
```

If you see a follow-up `[newsletter] resend forward failed: …`, the
contact didn't make it to Resend — check the error message.

## Common failure modes

| Symptom | Likely cause |
|---|---|
| `Resend returned 401` | `RESEND_API_KEY` missing, wrong, or revoked |
| `Resend returned 403` | API key has read-only access; needs Full access for contacts endpoint |
| `Resend returned 404` | `RESEND_AUDIENCE_ID` is wrong or the audience was deleted |
| `Resend returned 422: invalid email` | The email passed our regex but Resend rejects it (rare — disposable domains, etc.) |
| All signups silently log-only | Both env vars set in local `.env.local` but not in Vercel — check `vercel env ls` |
