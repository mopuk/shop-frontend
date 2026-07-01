import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://shop-backend-djyw.onrender.com/static/images/**")],
  },
};

export default nextConfig;
