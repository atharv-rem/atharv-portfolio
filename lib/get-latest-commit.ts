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
  url: "https://github.com/atharv-rem",
  defaultBranchRef: {
    target: {
      oid: "0000000",
      message: "latest commit unavailable",
      committedDate: new Date().toISOString(),
      url: "https://github.com/atharv-rem",
    },
  },
};

export async function getLatestCommit() {
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          username: `${process.env.GITHUB_USERNAME}`,
        },
      }),
      next: {
        revalidate: 10800,
      },
      signal: AbortSignal.timeout(3000),
    });

    if (!res.ok) return fallbackRepo;

    const data = await res.json();
    const nodes = data?.data?.user?.repositories?.nodes || [];
    const activeRepo = nodes.find((node: any) => node.defaultBranchRef?.target);

    return activeRepo ?? nodes[0] ?? fallbackRepo;
  } catch {
    return fallbackRepo;
  }
}