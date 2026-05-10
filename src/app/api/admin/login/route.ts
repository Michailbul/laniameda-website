import { NextResponse } from "next/server"

const ADMIN_PASSWORD = "2004"
const COOKIE_NAME = "laniameda_admin"
const ONE_WEEK = 60 * 60 * 24 * 7

export async function POST(request: Request) {
  let password: string | undefined
  try {
    const body = await request.json()
    password = typeof body?.password === "string" ? body.password : undefined
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  if (password !== ADMIN_PASSWORD) {
    // Tiny delay to discourage brute-forcing — purely cosmetic; not real security.
    await new Promise((r) => setTimeout(r, 400))
    return NextResponse.json({ error: "Wrong password" }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(COOKIE_NAME, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_WEEK,
  })
  return response
}
