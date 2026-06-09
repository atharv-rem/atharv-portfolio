const query = `
query GetLatestCommit($username: String!) {
  user(login: $username) {
    repositories(
      first: 1
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

export async function getLatestCommit() {
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
      revalidate: 300,
    },
  });

  const data = await res.json();

  return data.data.user.repositories.nodes[0];
}