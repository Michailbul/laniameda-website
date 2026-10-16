import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/tutorials/ferrari",
        destination: "/ferrari",
        permanent: true,
      },
    ]
  },
  // The Dukla 70 pitch deck is its own Vercel project (repo Michailbul/dukla); it is proxied here so the URL stays on this domain.
  // The AGRA UREAstabil showreel is the static Vercel project agro-pitch (built by build_showreel.py in the agra-vypovedi-akteru repo).
  // Its assets use absolute /agro-pitch/ URLs, so /agro serves the page and /agro-pitch/:path* carries the media.
  // The page itself is requested with its trailing slash because that project sets trailingSlash: true.
  async rewrites() {
    return [
      { source: "/dukla-pitch", destination: "https://dukla.vercel.app/dukla-pitch" },
      { source: "/dukla-pitch/:path*", destination: "https://dukla.vercel.app/dukla-pitch/:path*" },
      { source: "/agro", destination: "https://agro-pitch.vercel.app/agro-pitch/" },
      { source: "/agro-pitch", destination: "https://agro-pitch.vercel.app/agro-pitch/" },
      { source: "/agro-pitch/:path*", destination: "https://agro-pitch.vercel.app/agro-pitch/:path*" },
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "app-uploads.krea.ai",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.krea.ai",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
