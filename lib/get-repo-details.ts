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
  "casp": ["typescript", "go", "next.js", "redis", "postgres", "electricsql", "tanstack"],
  "design-index-3.0": ["astro", "typescript", "redis"],
  "compare-ai-models": ["typescript"]
};

const EXPERIMENTAL = {
  "design-index-2.0": ["react router", "javascript"],
  "open-wrapper": [],
  "get-website-keywords": ["python"]
};

export async function getProjects() {
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_PORTFOLIO_PROJECTS,
        variables: {
          username: `${process.env.GITHUB_USERNAME}`,
        },
      }),
      next: {
        revalidate: 86400, //24hours
      },
      signal: AbortSignal.timeout(3000),
    });

    if (!response.ok) {
      return {
        featured: [],
        experimental: [],
      };
    }

    const json = await response.json();

    const data =
      json.data as GitHubProjectsResponse;

    const repos =
      data.user.repositories.nodes;

    const featured = repos
      .filter((repo) => FEATURED.hasOwnProperty(repo.name))
      .map((repo) => ({
        ...repo,
        languagesList: FEATURED[repo.name as keyof typeof FEATURED] || [],
      }));

    const experimental = repos
      .filter((repo) => EXPERIMENTAL.hasOwnProperty(repo.name))
      .map((repo) => ({
        ...repo,
        languagesList: EXPERIMENTAL[repo.name as keyof typeof EXPERIMENTAL] || [],
      }));

    return {
      featured,
      experimental,
    };
  } catch {
    return {
      featured: [],
      experimental: [],
    };
  }
}
