import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kzqhtshiblbbsravhrpf.supabase.co",
      },
    ],
  },
};

export default nextConfig;
