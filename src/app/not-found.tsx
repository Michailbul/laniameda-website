import Link from "next/link";
import { Glitchy404 } from "@/components/ui/glitchy-404-1";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <Glitchy404 width={800} height={232} color="#fff" />
      <div className="mt-12 text-center">
        <p className="text-white/60 text-lg mb-6">Page not found</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
