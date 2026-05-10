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
