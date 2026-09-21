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
  // The Dukla 70 pitch deck is its own Vercel project (repo laniamedaHQ/dukla); it is proxied here so the URL stays on this domain.
  async rewrites() {
    return [
      { source: "/dukla-pitch", destination: "https://dukla.vercel.app/dukla-pitch" },
      { source: "/dukla-pitch/:path*", destination: "https://dukla.vercel.app/dukla-pitch/:path*" },
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
