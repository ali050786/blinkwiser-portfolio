import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Tree-shake the animation libraries so each client island ships only what it uses.
    optimizePackageImports: ["motion", "gsap"],
  },
};

export default nextConfig;
