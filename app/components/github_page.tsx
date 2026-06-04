import GithubContributions from "./github_graph"

export default function GitHubPage() {

  return (
    <div className="flex flex-col w-full relative pb-[10px]">
        <div className="relative left-1/2 -translate-x-1/2 h-[20px] w-[calc(100%+2rem)] max-w-[450px] pattern-hatch border-b border-t border-neutral-200" />
        <div className="relative left-1/2 -translate-x-1/2 uppercase font-open text-[15px] text-[#cfcfcf] bg-white w-[calc(100%+2rem)] h-[30px] max-w-[450px] border-b border-neutral-200 flex items-center justify-start px-3 leading-none">
          stats
        </div>
        <div className="w-full max-w-[450px] mt-4">
          <GithubContributions />
        </div>
    </div>
  )
}
