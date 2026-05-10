"use client"

import { useRef, useState, type ChangeEvent } from "react"

interface UploadResult {
  ok: boolean
  path: string
  kind: "image" | "video"
}

interface InlineUploadButtonProps {
  accept?: string
  label: string
  size?: "sm" | "md"
  variant?: "primary" | "ghost"
  onUpload: (result: UploadResult) => void
}

/** Single-button upload with file picker. Posts to the dev-only
 *  `/api/admin/upload` route, returns the public path. */
export function InlineUploadButton({
  accept = "image/*,video/*",
  label,
  size = "md",
  variant = "ghost",
  onUpload,
}: InlineUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ""
    if (!file) return
    setError(null)
    setBusy(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })
      const payload = (await response.json()) as UploadResult & { error?: string }
      if (!response.ok) {
        setError(payload.error ?? "Upload failed")
        window.setTimeout(() => setError(null), 4000)
        return
      }
      onUpload(payload)
    } catch {
      setError("Network error")
      window.setTimeout(() => setError(null), 4000)
    } finally {
      setBusy(false)
    }
  }

  const sizeClass =
    size === "sm"
      ? "px-3 py-1.5 text-[10px]"
      : "px-4 py-2 text-[10px]"

  const variantClass =
    variant === "primary"
      ? "bg-[#E5866F] text-black hover:bg-[#F0967F]"
      : "border border-dashed border-white/15 bg-white/[0.02] text-white/65 hover:border-[#E5866F]/40 hover:bg-[#E5866F]/[0.04] hover:text-white"

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <label
        className={`inline-flex items-center gap-2 rounded-full font-mono uppercase tracking-[0.18em] transition-all duration-200 cursor-pointer ${sizeClass} ${variantClass} ${busy ? "opacity-60 pointer-events-none" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          disabled={busy}
          className="hidden"
        />
        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4v16m8-8H4" />
        </svg>
        {busy ? "Uploading…" : label}
      </label>
      {error ? (
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-red-400/85">
          {error}
        </span>
      ) : null}
    </div>
  )
}
