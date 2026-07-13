import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: '</sitemap.xml>; rel="sitemap", <https://github.com/atharv-rem>; rel="author", </.well-known/api-catalog>; rel="api-catalog"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
