const categoryColors: Record<string, string> = {
  "AI Video": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "AI Image": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Creative Direction": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Technical Consulting": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
};

export function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider ${categoryColors[category] || "bg-gray-500/10 text-gray-400 border-gray-500/20"}`}
    >
      {category}
    </span>
  );
}
