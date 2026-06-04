import GithubContributions from "./github_graph"

export default function GitHubPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full relative pt-[60px]">
        <div className="absolute top-0 left-1/2 z-20 h-[20px] w-[calc(100%+2rem)] max-w-[450px] -translate-x-1/2 pattern-hatch border-b border-t border-neutral-200" />
        <div className="absolute uppercase top-[20px] left-1/2 font-open text-[15px] text-[#cfcfcf] bg-white z-10 w-[calc(100%+2rem)] h-[30px] max-w-[450px] -translate-x-1/2 border-b border-neutral-200 flex items-center justify-start px-3 leading-none">
          stats
        </div>
        <GithubContributions />
    </div>
  )
}