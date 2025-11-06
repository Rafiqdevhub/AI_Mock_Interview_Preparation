import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Enable standalone output for Docker deployment
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
