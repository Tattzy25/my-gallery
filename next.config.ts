import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tattty-uploads.tattty.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pix.tattty.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "imagine.tattty.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pvt.tattty.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-2a0cf56818694fa5b352a32e459c57f2.r2.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
