import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getLatestCommit } from "@/lib/get-latest-commit";
import { getProjects } from "@/lib/get-repo-details";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const requestPath = searchParams.get("path") || "/";

  let markdown = "";

  try {
    if (requestPath === "/") {
      let latestCommitStr = "";
      try {
        const repo = await getLatestCommit();
        const commit = repo.defaultBranchRef?.target;
        if (commit) {
          latestCommitStr = `\n### Recent Contribution
- **Repository**: [${repo.name}](${commit.url}) (\`${commit.oid.slice(0, 7)}\`)
- **Message**: ${commit.message}
- **Date**: ${new Date(commit.committedDate).toLocaleString()}
`;
        }
      } catch (err) {
        console.error("Error fetching latest commit for markdown:", err);
      }

      markdown = `# Atharv Remeshan
Full-stack developer building scalable products with a focus on product design, system architecture, and creating impactful user experiences.

## Links
- **GitHub**: [github.com/atharv-rem](https://github.com/atharv-rem)
- **Twitter**: [x.com/atharv_rem](https://x.com/atharv_rem)
- **Instagram**: [instagram.com/atharv_remeshan](https://www.instagram.com/atharv_remeshan/)
- **LinkedIn**: [linkedin.com/in/atharv-rem](https://www.linkedin.com/in/atharv-rem/)
- **Threads**: [threads.net/@atharv_remeshan](https://www.threads.net/@atharv_remeshan)
${latestCommitStr}
## Navigation
- [Projects](/projects)
- [Blog](/blog)
`;
    } else if (requestPath === "/projects") {
      let projectsSection = "";
      try {
        const { featured, experimental } = await getProjects();
        
        projectsSection += "## Featured Projects\n\n";
        featured.forEach((p) => {
          const tech = p.languagesList.length ? ` (${p.languagesList.join(", ")})` : "";
          projectsSection += `### [${p.name}](${p.url})\n${p.description || "No description provided."}${tech}\n\n`;
        });

        projectsSection += "## Experimental Projects\n\n";
        experimental.forEach((p) => {
          const tech = p.languagesList.length ? ` (${p.languagesList.join(", ")})` : "";
          projectsSection += `### [${p.name}](${p.url})\n${p.description || "No description provided."}${tech}\n\n`;
        });
      } catch (err) {
        console.error("Error fetching projects for markdown:", err);
        projectsSection = "_Failed to load projects list._";
      }

      markdown = `# Projects - Atharv Remeshan

${projectsSection}
---
- [Back to Home](/)
`;
    } else if (requestPath === "/blog") {
      markdown = `# Blog - Atharv Remeshan

Coming soon...

---
- [Back to Home](/)
`;
    } else if (requestPath.startsWith("/blog/")) {
      const slug = requestPath.replace(/^\/blog\//, "");
      const postsDirectory = path.join(process.cwd(), "content/posts");
      const filePath = path.join(postsDirectory, `${slug}.md`);

      if (fs.existsSync(filePath)) {
        const fileContents = fs.readFileSync(filePath, "utf8");
        // Split frontmatter and body
        const match = fileContents.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
        
        if (match) {
          const yamlBlock = match[1];
          const body = match[2].trim();
          const metadata: Record<string, string> = {};
          yamlBlock.split("\n").forEach((line) => {
            const parts = line.split(":");
            if (parts.length >= 2) {
              const key = parts[0].trim();
              const value = parts.slice(1).join(":").trim().replace(/^['"]|['"]$/g, "");
              metadata[key] = value;
            }
          });

          markdown = `# ${metadata.title || slug}
*Published on: ${metadata.date || "Unknown date"}*

${body}

---
- [Back to Blog](/blog)
`;
        } else {
          markdown = fileContents; // Fallback to raw contents if parsing fails
        }
      } else {
        return new NextResponse("Post not found", { status: 404 });
      }
    } else {
      return new NextResponse("Not Found", { status: 404 });
    }

    return new NextResponse(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error rendering markdown:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
