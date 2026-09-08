import GithubContributions from "./github_graph";
import { LatestCommitCard } from "./latest-commit-card";

export default function GitHubPage() {
  return (
    <div className="flex flex-col w-full relative">
        <div className="-mx-4 h-[20px] w-[calc(100%+2rem)] pattern-hatch border-b border-t border-neutral-200 dark:border-neutral-800" />
        <div id="github-header" className="-mx-4 uppercase font-open text-[12px] text-[#8b8b8b] dark:text-[#d0d0d0] bg-white dark:bg-neutral-900 w-[calc(100%+2rem)] h-[30px] border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-start px-3 leading-none">
          stats
        </div>
        <div className="w-full max-w-[450px] mt-4 flex flex-col">
          <GithubContributions />
          <LatestCommitCard />
        </div>
    </div>
  );
}
