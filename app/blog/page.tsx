import fs from "fs";
import path from "path";
import Link from "next/link";
import { BottomNavbar } from "../components/bottom-navbar";

interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

function getPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");

      // Parse frontmatter
      const match = fileContents.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
      const metadata: Record<string, string> = {};
      if (match) {
        const yamlBlock = match[1];
        yamlBlock.split("\n").forEach((line) => {
          const parts = line.split(":");
          if (parts.length >= 2) {
            const key = parts[0].trim();
            const value = parts.slice(1).join(":").trim().replace(/^['"]|['"]$/g, "");
            metadata[key] = value;
          }
        });
      }

      return {
        slug,
        title: metadata.title || slug,
        date: metadata.date || "",
        excerpt: metadata.excerpt || "",
      };
    });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function Blog() {
  const posts = getPosts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#FAFAFA] dark:bg-neutral-950 relative">
      <div className="absolute inset-0 z-0" />
      <div className="bg-white dark:bg-neutral-900 flex min-h-screen flex-col items-center justify-start w-full max-w-[450px] px-4 border-l border-r border-neutral-200 dark:border-neutral-800 relative z-10 pb-24">
        
        {/* Navigation / Header */}
        <div className="w-full flex items-center justify-between py-6 border-b border-neutral-100 dark:border-neutral-800 mb-8">
          <Link 
            href="/"
            className="flex items-center gap-1.5 text-xs font-open uppercase tracking-wider text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Back to Home
          </Link>
          <span className="font-open text-[11px] font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            Journal
          </span>
        </div>

        {/* Title */}
        <div className="w-full mb-8">
          <h1 className="font-open font-bold text-3xl tracking-tight text-neutral-900 dark:text-neutral-50 text-left">
            Writing
          </h1>
          <p className="font-open text-sm text-neutral-500 dark:text-neutral-400 mt-2 text-left">
            Thoughts on design, engineering, and personal updates.
          </p>
        </div>

        {/* Posts List */}
        <div className="w-full flex flex-col gap-6">
          {posts.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 dark:text-neutral-500 text-sm font-open">
              No posts found. Publish one from PagesCMS!
            </div>
          ) : (
            posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group w-full flex flex-col gap-2 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-900/40 hover:border-neutral-200 dark:hover:border-neutral-850 hover:bg-white dark:hover:bg-neutral-900 transition-all"
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] font-open uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    {post.date ? new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                  </span>
                </div>
                <h2 className="font-open font-semibold text-base text-neutral-850 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-colors text-left leading-snug">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="font-open text-xs text-neutral-500 dark:text-neutral-450 text-left line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-1 text-[11px] font-medium text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors mt-1">
                  Read article
                  <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))
          )}
        </div>

        <BottomNavbar />
      </div>
    </main>
  );
}