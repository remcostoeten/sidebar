import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Enable src directory support
    appDir: true,
  },
};

export default nextConfig;
