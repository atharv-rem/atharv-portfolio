import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL 
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` 
    : 'https://atharv-rem.vercel.app';

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  try {
    const postsDirectory = path.join(process.cwd(), "content/posts");
    if (fs.existsSync(postsDirectory)) {
      const fileNames = fs.readdirSync(postsDirectory);
      const postRoutes = fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
          const slug = fileName.replace(/\.md$/, "");
          const filePath = path.join(postsDirectory, fileName);
          const stat = fs.statSync(filePath);
          return {
            url: `${baseUrl}/blog/${slug}`,
            lastModified: stat.mtime,
            changeFrequency: 'monthly' as const,
            priority: 0.6,
          };
        });
      
      return [...routes, ...postRoutes];
    }
  } catch (error) {
    console.error('Error generating sitemap posts:', error);
  }

  return routes;
}
