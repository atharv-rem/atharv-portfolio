import { unstable_cache } from "next/cache";

const query = `
query GetLatestCommit($username: String!) {
  user(login: $username) {
    repositories(
      first: 10
      orderBy: { field: PUSHED_AT, direction: DESC }
    ) {
      nodes {
        name
        description
        url
        defaultBranchRef {
          target {
            ... on Commit {
              oid
              message
              committedDate
              url
            }
          }
        }
      }
    }
  }
}
`;

const fallbackRepo = {
  name: "atharv-portfolio",
  description: "Portfolio site",
  url: "https://github.com/atharv-rem/atharv-portfolio",
  defaultBranchRef: {
    target: {
      oid: "main",
      message: "latest portfolio updates",
      committedDate: new Date().toISOString(),
      url: "https://github.com/atharv-rem/atharv-portfolio",
    },
  },
};

async function fetchLatestCommitFromGraphQL(username: string, token: string) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0",
    },
    body: JSON.stringify({
      query,
      variables: { username },
    }),
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(4000),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const nodes = data?.data?.user?.repositories?.nodes || [];
  const activeRepo = nodes.find((node: any) => node.defaultBranchRef?.target);
  return activeRepo ?? nodes[0] ?? null;
}

async function fetchLatestCommitFromREST(username: string) {
  const reposRes = await fetch(
    `https://api.github.com/users/${username}/repos?sort=pushed&per_page=10`,
    {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(4000),
    }
  );

  if (!reposRes.ok) return null;
  const repos = await reposRes.json();
  if (!Array.isArray(repos) || repos.length === 0) return null;

  for (const repo of repos) {
    if (repo.fork) continue;
    try {
      const commitRes = await fetch(
        `https://api.github.com/repos/${username}/${repo.name}/commits?per_page=1`,
        {
          headers: { "User-Agent": "Mozilla/5.0" },
          next: { revalidate: 3600 },
          signal: AbortSignal.timeout(3000),
        }
      );
      if (commitRes.ok) {
        const commits = await commitRes.json();
        if (Array.isArray(commits) && commits.length > 0) {
          const commit = commits[0];
          return {
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            defaultBranchRef: {
              target: {
                oid: commit.sha,
                message: commit.commit?.message || "latest commit",
                committedDate: commit.commit?.committer?.date || commit.commit?.author?.date || repo.pushed_at,
                url: commit.html_url,
              },
            },
          };
        }
      }
    } catch {
      // Continue to next repo if commit fetch fails
    }
  }
  return null;
}

export const getLatestCommit = unstable_cache(
  async () => {
    const username = process.env.GITHUB_USERNAME || "atharv-rem";
    const token = process.env.GITHUB_TOKEN;

    if (token) {
      try {
        const graphqlData = await fetchLatestCommitFromGraphQL(username, token);
        if (graphqlData) return graphqlData;
      } catch {
        // Fallback to REST if GraphQL fails
      }
    }

    try {
      const restData = await fetchLatestCommitFromREST(username);
      if (restData) return restData;
    } catch {
      // Fallback to fallbackRepo
    }

    return fallbackRepo;
  },
  ["get-latest-commit"],
  { revalidate: 3600 }
);