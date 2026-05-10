import type { Metadata } from "next"
import { FerrariView } from "@/components/tutorial/FerrariView"
import {
  FERRARI_META,
  renderFerrariMarkdown,
} from "@/app/tutorials/ferrari/ferrari-content"

export const metadata: Metadata = {
  title: `${FERRARI_META.title} · Laniameda Tutorials`,
  description: FERRARI_META.lede,
}

export default function FerrariPage() {
  const markdown = renderFerrariMarkdown()
  return <FerrariView markdown={markdown} />
}
