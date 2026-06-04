import { Suspense } from "react"

import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions"
import { getCachedContributions } from "@/lib/get-cached-contributions"

const GITHUB_USERNAME = "atharv-rem"
const GITHUB_PROFILE_URL = "https://github.com/atharv-rem"

export default function GitHubContributionsDemo() {
  const contributions = getCachedContributions(GITHUB_USERNAME)

  return (
    <Suspense fallback={<GitHubContributionsFallback />}>
      <GitHubContributions
        contributions={contributions}
        githubProfileUrl={GITHUB_PROFILE_URL}
      />
    </Suspense>
  )
}
