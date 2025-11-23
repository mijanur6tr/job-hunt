import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com","unblast.com"], // Add your image host here
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
