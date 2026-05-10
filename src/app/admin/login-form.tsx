"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const PIN_LENGTH = 4

export function LoginForm() {
  const router = useRouter()
  const [digits, setDigits] = useState<string[]>(Array(PIN_LENGTH).fill(""))
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const setDigit = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    setError(null)
    const next = [...digits]
    next[index] = value
    setDigits(next)
    if (value && index < PIN_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
    if (next.every((d) => d !== "") && next.join("").length === PIN_LENGTH) {
      void submit(next.join(""))
    }
  }

  const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && digits[index] === "" && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
    if (event.key === "ArrowLeft" && index > 0) inputsRef.current[index - 1]?.focus()
    if (event.key === "ArrowRight" && index < PIN_LENGTH - 1) inputsRef.current[index + 1]?.focus()
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, PIN_LENGTH)
    if (!pasted) return
    event.preventDefault()
    const next = Array(PIN_LENGTH).fill("")
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i]
    setDigits(next)
    if (pasted.length === PIN_LENGTH) void submit(pasted)
    else inputsRef.current[pasted.length]?.focus()
  }

  const submit = async (password: string) => {
    setSubmitting(true)
    setError(null)
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (!response.ok) {
        setError("Wrong password")
        setDigits(Array(PIN_LENGTH).fill(""))
        inputsRef.current[0]?.focus()
        return
      }
      router.refresh()
    } catch {
      setError("Network error — try again")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-center gap-3">
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digit}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={handleKeyDown(i)}
            onPaste={handlePaste}
            disabled={submitting}
            className={`h-14 w-12 rounded-xl border bg-white/[0.02] text-center font-mono text-xl tracking-tight text-white outline-none transition-all duration-200 ${
              error
                ? "border-red-500/50 shadow-[0_0_0_3px_rgba(239,68,68,0.08)]"
                : digit
                  ? "border-[#E5866F]/60 bg-[#E5866F]/[0.05]"
                  : "border-white/10 hover:border-white/25 focus:border-[#E5866F]/60 focus:bg-[#E5866F]/[0.04]"
            }`}
            aria-label={`Digit ${i + 1} of ${PIN_LENGTH}`}
          />
        ))}
      </div>

      <div className="h-5 text-center">
        <AnimatePresence mode="wait">
          {error ? (
            <motion.p
              key={error}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-red-400/80"
            >
              {error}
            </motion.p>
          ) : submitting ? (
            <motion.p
              key="checking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40"
            >
              Checking…
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
        4-digit PIN · auto-submits
      </p>
    </div>
  )
}
