import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    remotePatterns: [
      new URL("https://shop-backend-djyw.onrender.com/static/images/**"),
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "5000",
        pathname: "/static/images/**",
      },
    ],
  },
};

export default nextConfig;
