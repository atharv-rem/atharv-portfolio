import { unstable_cache } from "next/cache";

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
  "compare-models": ["typescript"],
};

// Repos that live outside the user account (the GraphQL user query can't see them)
const REPO_OWNERS: Record<string, string> = {
  opacity: "Opacity-HQ",
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
      createdAt: "2026-08-18T08:10:52Z",
      defaultBranchRef: {
        target: {
          oid: "c4f633d",
          message: "fix: ensure correct phase return value in useCyclePhase and reset step in useSteppedCycle when inactive",
          committedDate: "2026-10-07T16:50:30Z",
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
      createdAt: "2025-11-02T01:57:42Z",
      defaultBranchRef: {
        target: {
          oid: "caa4dc7",
          message: "fix: add gap between grid items in RecordDetailsSheet for improved layout",
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
      createdAt: "2026-02-01T05:48:38Z",
      defaultBranchRef: {
        target: {
          oid: "ed67cbf",
          message: "feat: add funding model support and include a Code of Conduct and LICENSE file",
          committedDate: "2026-10-07T05:43:08Z",
        },
      },
      languagesList: FEATURED["design-index-3.0"],
    },
    {
      id: "compare-models",
      name: "compare-models",
      description: "Compare two AI models on their generated output.",
      url: "https://github.com/atharv-rem/compare-models",
      homepageUrl: "https://comp.atharv.site",
      createdAt: "2026-05-16T10:47:15Z",
      defaultBranchRef: {
        target: {
          oid: "34e074c",
          message: "feat: implement alert management with timeout handling and cleanup",
          committedDate: "2026-05-19T17:28:31Z",
        },
      },
      languagesList: FEATURED["compare-models"],
    },
  ],
  experimental: [
    {
      id: "design-index-2.0",
      name: "design-index-2.0",
      description: "Previous iteration of design-index built with React Router.",
      url: "https://github.com/atharv-rem/design-index-2.0",
      homepageUrl: null,
      createdAt: "2025-09-21T15:31:34Z",
      defaultBranchRef: {
        target: {
          oid: "047e5de",
          message: "feat: remove Databuddy script from Layout component",
          committedDate: "2026-05-23T16:31:32Z",
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
      createdAt: "2026-05-25T17:41:07Z",
      defaultBranchRef: {
        target: {
          oid: "bff8100",
          message: "feat: add README.md with project overview, features, and setup instructions",
          committedDate: "2026-05-26T15:46:29Z",
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
      createdAt: "2025-06-03T11:31:44Z",
      defaultBranchRef: {
        target: {
          oid: "0929b79",
          message: ".final",
          committedDate: "2025-06-04T10:10:18Z",
        },
      },
      languagesList: EXPERIMENTAL["get-website-keywords"],
    },
  ],
};

const IN_PROGRESS_REPOS = new Set(["casp", "opacity"]);

function attachInProgress(projects: { featured: any[]; experimental: any[] }) {
  const markRepo = (repo: any) => ({
    ...repo,
    inProgress: IN_PROGRESS_REPOS.has(repo.name.toLowerCase()),
  });

  return {
    featured: projects.featured.map(markRepo),
    experimental: projects.experimental.map(markRepo),
  };
}

async function fetchRepoREST(owner: string, name: string): Promise<GitHubRepository | null> {
  const headers = { "User-Agent": "Mozilla/5.0" };
  const next = { revalidate: 3600, tags: ["projects"] };

  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${name}`, {
    headers,
    next,
    signal: AbortSignal.timeout(4000),
  });
  if (!repoRes.ok) return null;
  const repo = await repoRes.json();

  let commitTarget: GitHubCommit | null = null;
  try {
    const commitRes = await fetch(`https://api.github.com/repos/${owner}/${name}/commits?per_page=1`, {
      headers,
      next,
      signal: AbortSignal.timeout(3000),
    });
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

  return {
    id: repo.node_id || repo.id.toString(),
    name: repo.name as string,
    description: repo.description as string | null,
    url: repo.html_url as string,
    homepageUrl: (repo.homepage || null) as string | null,
    createdAt: repo.created_at as string,
    defaultBranchRef: {
      target: commitTarget ?? { oid: "main", message: "update", committedDate: repo.pushed_at || repo.created_at },
    },
  };
}

function buildProjects(available: GitHubRepository[]) {
  const resolve = (group: Record<string, string[]>, fallbacks: { name: string; homepageUrl: string | null }[]) =>
    Object.keys(group)
      .map((name) => {
        const fallback = fallbacks.find((f) => f.name.toLowerCase() === name.toLowerCase());
        const found = available.find((repo) => repo.name.toLowerCase() === name.toLowerCase());
        if (found) {
          return {
            ...found,
            homepageUrl: found.homepageUrl || fallback?.homepageUrl || null,
            languagesList: group[name] || [],
          };
        }
        return fallback || null;
      })
      .filter(Boolean);

  return {
    featured: resolve(FEATURED, FALLBACK_PROJECT_DATA.featured),
    experimental: resolve(EXPERIMENTAL, FALLBACK_PROJECT_DATA.experimental),
  };
}

function fetchRepos(username: string, names: string[]) {
  return Promise.all(
    names.map((name) => fetchRepoREST(REPO_OWNERS[name.toLowerCase()] ?? username, name).catch(() => null))
  ).then((repos) => repos.filter((r): r is GitHubRepository => r !== null));
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

  // Org-owned repos aren't in the user query, so fetch any that are missing individually
  const missing = [...Object.keys(FEATURED), ...Object.keys(EXPERIMENTAL)].filter(
    (name) => !repos.some((repo) => repo.name.toLowerCase() === name.toLowerCase())
  );

  return buildProjects([...repos, ...(await fetchRepos(username, missing))]);
}

async function fetchProjectsFromREST(username: string) {
  const repos = await fetchRepos(username, [...Object.keys(FEATURED), ...Object.keys(EXPERIMENTAL)]);
  return buildProjects(repos);
}

export const getProjects = unstable_cache(
  async () => {
    const username = process.env.GITHUB_USERNAME || "atharv-rem";
    const token = process.env.GITHUB_TOKEN;

    if (token) {
      try {
        const graphqlData = await fetchProjectsFromGraphQL(username, token);
        if (graphqlData && (graphqlData.featured.length > 0 || graphqlData.experimental.length > 0)) {
          return attachInProgress(graphqlData);
        }
      } catch {
        // Fallback to REST
      }
    }

    try {
      const restData = await fetchProjectsFromREST(username);
      if (restData && (restData.featured.length > 0 || restData.experimental.length > 0)) {
        return attachInProgress(restData);
      }
    } catch {
      // Fallback to static
    }

    return attachInProgress(FALLBACK_PROJECT_DATA);
  },
  ["get-portfolio-projects-v8"],
  { revalidate: 3600, tags: ["projects", "get-portfolio-projects"] }
);
