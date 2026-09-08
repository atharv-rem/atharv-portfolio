import { unstable_cache } from "next/cache";
import { formatDistanceToNow } from "date-fns";

type GitHubCommit = {
  oid: string;
  message: string;
  committedDate: string;
};

type GitHubRepository = {
  id: string;
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  createdAt: string;
  defaultBranchRef: {
    target: GitHubCommit;
  } | null;
  createdAtFormatted?: string;
  committedDateFormatted?: string;
};

type GitHubProjectsResponse = {
  user: {
    repositories: {
      nodes: GitHubRepository[];
    };
  };
};

const GET_PORTFOLIO_PROJECTS = `
  query GetPortfolioProjects($username: String!) {
    user(login: $username) {
      repositories(
        first: 100
        ownerAffiliations: OWNER
        privacy: PUBLIC
        orderBy: {
          field: PUSHED_AT
          direction: DESC
        }
      ) {
        nodes {
          id
          name
          description
          url
          homepageUrl

          createdAt

          defaultBranchRef {
            target {
              ... on Commit {
                oid
                message
                committedDate
              }
            }
          }
        }
      }
    }
  }
`;

const FEATURED = {
  "opacity": ["typescript", "next.js"],
  "casp": ["typescript", "go", "next.js", "redis", "postgres", "electricsql", "tanstack"],
  "design-index-3.0": ["astro", "typescript", "redis"],
  "compare-ai": ["typescript"], 
};

const EXPERIMENTAL = {
  "design-index-2.0": ["react router", "javascript"],
  "open-wrapper": [],
  "get-website-keywords": ["python"]
};

const FALLBACK_PROJECT_DATA = {
  featured: [
    {
      id: "opacity",
      name: "opacity",
      description: "A project focused on creating polished, expressive web experiences.",
      url: "https://github.com/Opacity-HQ/opacity",
      homepageUrl: "https://opacity.atharv.site",
      createdAt: "2024-04-01T00:00:00Z",
      defaultBranchRef: {
        target: {
          oid: "main",
          message: "update",
          committedDate: "2026-04-01T00:00:00Z",
        },
      },
      languagesList: FEATURED["opacity"],
    },
    {
      id: "casp",
      name: "casp",
      description: "Local-first application for managing personal records and documents.",
      url: "https://github.com/atharv-rem/casp",
      homepageUrl: null,
      createdAt: "2024-01-01T00:00:00Z",
      defaultBranchRef: {
        target: {
          oid: "caa4dc7",
          message: "fix: layout and record management updates",
          committedDate: "2026-05-25T03:23:25Z",
        },
      },
      languagesList: FEATURED["casp"],
    },
    {
      id: "design-index-3.0",
      name: "design-index-3.0",
      description: "Curated design index and component showcase.",
      url: "https://github.com/atharv-rem/design-index-3.0",
      homepageUrl: "https://designindex.xyz",
      createdAt: "2024-02-01T00:00:00Z",
      defaultBranchRef: {
        target: {
          oid: "e8b2f1a",
          message: "feat: add design system references",
          committedDate: "2026-04-12T10:00:00Z",
        },
      },
      languagesList: FEATURED["design-index-3.0"],
    },
    {
      id: "compare-ai",
      name: "compare-ai",
      description: "Tool to compare outputs and latency of LLM providers.",
      url: "https://github.com/atharv-rem/compare-ai",
      homepageUrl: "https://comp.atharv.site",
      createdAt: "2024-03-01T00:00:00Z",
      defaultBranchRef: {
        target: {
          oid: "9a3f4e2",
          message: "feat: benchmarking model endpoints",
          committedDate: "2026-03-10T00:00:00Z",
        },
      },
      languagesList: FEATURED["compare-ai"],
    },
  ],
  experimental: [
    {
      id: "design-index-2.0",
      name: "design-index-2.0",
      description: "Previous iteration of design-index built with React Router.",
      url: "https://github.com/atharv-rem/design-index-2.0",
      homepageUrl: null,
      createdAt: "2023-08-01T00:00:00Z",
      defaultBranchRef: {
        target: {
          oid: "b1c2d3e",
          message: "initial release",
          committedDate: "2023-09-01T00:00:00Z",
        },
      },
      languagesList: EXPERIMENTAL["design-index-2.0"],
    },
    {
      id: "open-wrapper",
      name: "open-wrapper",
      description: "API wrapper experiment.",
      url: "https://github.com/atharv-rem/open-wrapper",
      homepageUrl: null,
      createdAt: "2023-09-01T00:00:00Z",
      defaultBranchRef: {
        target: {
          oid: "f5e4d3c",
          message: "refactor wrapper interface",
          committedDate: "2023-10-01T00:00:00Z",
        },
      },
      languagesList: EXPERIMENTAL["open-wrapper"],
    },
    {
      id: "get-website-keywords",
      name: "get-website-keywords",
      description: "Python utility to extract keywords from websites.",
      url: "https://github.com/atharv-rem/get-website-keywords",
      homepageUrl: null,
      createdAt: "2023-10-01T00:00:00Z",
      defaultBranchRef: {
        target: {
          oid: "a1b2c3d",
          message: "add TF-IDF keyword extractor",
          committedDate: "2023-11-01T00:00:00Z",
        },
      },
      languagesList: EXPERIMENTAL["get-website-keywords"],
    },
  ],
};

const IN_PROGRESS_REPOS = new Set(["casp", "opacity"]);

function attachFormattedDates(projects: { featured: any[]; experimental: any[] }) {
  const formatRepo = (repo: any) => ({
    ...repo,
    inProgress: IN_PROGRESS_REPOS.has(repo.name.toLowerCase()),
    createdAtFormatted: repo.createdAt
      ? formatDistanceToNow(new Date(repo.createdAt), { addSuffix: true })
      : "",
    committedDateFormatted: repo.defaultBranchRef?.target?.committedDate
      ? formatDistanceToNow(new Date(repo.defaultBranchRef.target.committedDate), { addSuffix: true })
      : "",
  });

  return {
    featured: projects.featured.map(formatRepo),
    experimental: projects.experimental.map(formatRepo),
  };
}

async function fetchProjectsFromGraphQL(username: string, token: string) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
    },
    body: JSON.stringify({
      query: GET_PORTFOLIO_PROJECTS,
      variables: { username },
    }),
    next: { revalidate: 3600, tags: ["projects"] },
    signal: AbortSignal.timeout(4000),
  });

  if (!response.ok) return null;
  const json = await response.json();
  const data = json.data as GitHubProjectsResponse;
  const repos = data?.user?.repositories?.nodes || [];

  const featured = Object.keys(FEATURED).map((name) => {
    const fallback = FALLBACK_PROJECT_DATA.featured.find((f) => f.name.toLowerCase() === name.toLowerCase());
    const found = repos.find((repo) => repo.name.toLowerCase() === name.toLowerCase());
    if (found) {
      return {
        ...found,
        homepageUrl: found.homepageUrl || fallback?.homepageUrl || null,
        languagesList: FEATURED[name as keyof typeof FEATURED] || [],
      };
    }
    return fallback || null;
  }).filter(Boolean);

  const experimental = Object.keys(EXPERIMENTAL).map((name) => {
    const fallback = FALLBACK_PROJECT_DATA.experimental.find((e) => e.name.toLowerCase() === name.toLowerCase());
    const found = repos.find((repo) => repo.name.toLowerCase() === name.toLowerCase());
    if (found) {
      return {
        ...found,
        homepageUrl: found.homepageUrl || fallback?.homepageUrl || null,
        languagesList: EXPERIMENTAL[name as keyof typeof EXPERIMENTAL] || [],
      };
    }
    return fallback || null;
  }).filter(Boolean);

  return { featured, experimental };
}

async function fetchProjectsFromREST(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
    headers: { "User-Agent": "Mozilla/5.0" },
    next: { revalidate: 3600, tags: ["projects"] },
    signal: AbortSignal.timeout(4000),
  });

  if (!response.ok) return null;
  const repos = await response.json();
  if (!Array.isArray(repos)) return null;

  const targetNames = new Set([...Object.keys(FEATURED), ...Object.keys(EXPERIMENTAL)].map((s) => s.toLowerCase()));
  const matchedRepos = repos.filter((r: any) => targetNames.has(r.name?.toLowerCase()));

  const repoDetails = await Promise.all(
    matchedRepos.map(async (repo: any) => {
      let commitTarget: GitHubCommit | null = null;
      try {
        const commitRes = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`,
          {
            headers: { "User-Agent": "Mozilla/5.0" },
            next: { revalidate: 3600, tags: ["projects"] },
            signal: AbortSignal.timeout(3000),
          }
        );
        if (commitRes.ok) {
          const commits = await commitRes.json();
          if (Array.isArray(commits) && commits.length > 0) {
            commitTarget = {
              oid: commits[0].sha,
              message: commits[0].commit?.message || "update",
              committedDate: commits[0].commit?.committer?.date || commits[0].commit?.author?.date || repo.pushed_at,
            };
          }
        }
      } catch {
        // Ignore commit fetch error, fallback below
      }

      if (!commitTarget) {
        commitTarget = {
          oid: "main",
          message: "update",
          committedDate: repo.pushed_at || repo.created_at,
        };
      }

      return {
        id: repo.node_id || repo.id.toString(),
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepageUrl: repo.homepage || null,
        createdAt: repo.created_at,
        defaultBranchRef: { target: commitTarget },
      };
    })
  );

  const featured = Object.keys(FEATURED).map((name) => {
    const fallback = FALLBACK_PROJECT_DATA.featured.find((f) => f.name.toLowerCase() === name.toLowerCase());
    const found = repoDetails.find((repo) => repo.name.toLowerCase() === name.toLowerCase());
    if (found) {
      return {
        ...found,
        homepageUrl: found.homepageUrl || fallback?.homepageUrl || null,
        languagesList: FEATURED[name as keyof typeof FEATURED] || [],
      };
    }
    return fallback || null;
  }).filter(Boolean);

  const experimental = Object.keys(EXPERIMENTAL).map((name) => {
    const fallback = FALLBACK_PROJECT_DATA.experimental.find((e) => e.name.toLowerCase() === name.toLowerCase());
    const found = repoDetails.find((repo) => repo.name.toLowerCase() === name.toLowerCase());
    if (found) {
      return {
        ...found,
        homepageUrl: found.homepageUrl || fallback?.homepageUrl || null,
        languagesList: EXPERIMENTAL[name as keyof typeof EXPERIMENTAL] || [],
      };
    }
    return fallback || null;
  }).filter(Boolean);

  return { featured, experimental };
}

export const getProjects = unstable_cache(
  async () => {
    const username = process.env.GITHUB_USERNAME || "atharv-rem";
    const token = process.env.GITHUB_TOKEN;

    if (token) {
      try {
        const graphqlData = await fetchProjectsFromGraphQL(username, token);
        if (graphqlData && (graphqlData.featured.length > 0 || graphqlData.experimental.length > 0)) {
          return attachFormattedDates(graphqlData);
        }
      } catch {
        // Fallback to REST
      }
    }

    try {
      const restData = await fetchProjectsFromREST(username);
      if (restData && (restData.featured.length > 0 || restData.experimental.length > 0)) {
        return attachFormattedDates(restData);
      }
    } catch {
      // Fallback to static
    }

    return attachFormattedDates(FALLBACK_PROJECT_DATA);
  },
  ["get-portfolio-projects-v7"],
  { revalidate: 3600, tags: ["projects", "get-portfolio-projects"] }
);
