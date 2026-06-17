import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BottomNavbar } from "../../components/bottom-navbar";

interface PostData {
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

function getPostData(slug: string): PostData | null {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");

  // Parse frontmatter
  const match = fileContents.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  const metadata: Record<string, string> = {};
  let content = fileContents;

  if (match) {
    const yamlBlock = match[1];
    content = match[2];
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
    title: metadata.title || slug,
    date: metadata.date || "",
    excerpt: metadata.excerpt || "",
    content: content.trim(),
  };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => ({
      slug: fileName.replace(/\.md$/, ""),
    }));
}

function parseInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/`(.*?)`/g, "<code class='px-1 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800/80 font-mono text-xs text-neutral-800 dark:text-neutral-200'>$1</code>");
}

function renderMarkdown(content: string) {
  const blocks = content.split(/\n\s*\n/);
  return blocks.map((block, i) => {
    block = block.trim();
    if (!block) return null;

    if (block.startsWith("# ")) {
      return (
        <h1 key={i} className="text-xl font-bold mt-6 mb-3 font-open text-neutral-900 dark:text-neutral-50 text-left">
          {block.replace("# ", "")}
        </h1>
      );
    }
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="text-lg font-bold mt-5 mb-2 font-open text-neutral-900 dark:text-neutral-50 text-left">
          {block.replace("## ", "")}
        </h2>
      );
    }
    if (block.startsWith("### ")) {
      return (
        <h3 key={i} className="text-base font-semibold mt-4 mb-2 font-open text-neutral-900 dark:text-neutral-50 text-left">
          {block.replace("### ", "")}
        </h3>
      );
    }
    if (block.startsWith("- ") || block.startsWith("* ")) {
      const items = block.split(/\n[-*]\s+/).map((item) => item.replace(/^[-*]\s+/, ""));
      return (
        <ul key={i} className="list-disc pl-5 my-3 flex flex-col gap-1.5 font-open text-sm text-neutral-600 dark:text-neutral-450 text-left">
          {items.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(item) }} />
          ))}
        </ul>
      );
    }
    return (
      <p
        key={i}
        className="font-open text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 text-left"
        dangerouslySetInnerHTML={{ __html: parseInlineMarkdown(block) }}
      />
    );
  });
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: post.title,
    description: post.excerpt || `Read ${post.title} by Atharv Remeshan`,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#FAFAFA] dark:bg-neutral-950 relative">
      <div className="absolute inset-0 z-0" />
      <div className="bg-white dark:bg-neutral-900 flex min-h-screen flex-col items-center justify-start w-full max-w-[450px] px-4 border-l border-r border-neutral-200 dark:border-neutral-800 relative z-10 pb-24">
        
        {/* Navigation / Header */}
        <div className="w-full flex items-center justify-between py-6 border-b border-neutral-100 dark:border-neutral-800 mb-8">
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-xs font-open uppercase tracking-wider text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            All Writing
          </Link>
          <span className="font-open text-[10px] font-open uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            {post.date ? new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
          </span>
        </div>

        {/* Article Layout */}
        <article className="w-full flex flex-col gap-6">
          <h1 className="font-open font-bold text-2xl md:text-3xl tracking-tight text-neutral-900 dark:text-neutral-50 text-left leading-tight">
            {post.title}
          </h1>
          
          <div className="w-full h-px bg-neutral-100 dark:bg-neutral-800/80 my-2" />

          {/* Markdown Content */}
          <div className="w-full markdown-content">
            {renderMarkdown(post.content)}
          </div>
        </article>

        <BottomNavbar />
      </div>
    </main>
  );
}
