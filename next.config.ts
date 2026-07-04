import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/samlee-design",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;