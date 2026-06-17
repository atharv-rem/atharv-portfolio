import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
