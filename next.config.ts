import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// next.config.js
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,  // Enable experimental app directory
  },
};

export default nextConfig;
