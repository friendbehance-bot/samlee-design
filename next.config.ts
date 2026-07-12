import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/samlee-design",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
