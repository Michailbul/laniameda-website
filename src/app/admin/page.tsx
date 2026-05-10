import { cookies } from "next/headers"
import type { Metadata } from "next"
import { LoginForm } from "./login-form"
import { EditorShell } from "./editor-shell"
import { renderFerrariMarkdown } from "../tutorials/ferrari/ferrari-content"

export const metadata: Metadata = {
  title: "Admin · Laniameda",
  robots: { index: false, follow: false },
}

const COOKIE_NAME = "laniameda_admin"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get(COOKIE_NAME)?.value === "1"

  if (!isAuthenticated) {
    return <LoginShell />
  }

  const markdown = renderFerrariMarkdown()
  return <EditorShell markdown={markdown} />
}

function LoginShell() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(229,134,111,0.1) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center justify-center gap-3">
            <span aria-hidden className="h-px w-8 bg-[#E5866F]/70" />
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#E5866F]">
              Restricted
            </p>
            <span aria-hidden className="h-px w-8 bg-[#E5866F]/70" />
          </div>

          <h1 className="text-center text-[clamp(1.6rem,3.6vw,2.2rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-white">
            Admin
          </h1>
          <p className="mt-3 text-center text-sm font-light leading-relaxed text-white/55">
            Enter the password to edit tutorials.
          </p>

          <div className="mt-10">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  )
}
