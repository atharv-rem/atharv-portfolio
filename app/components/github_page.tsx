import { getLatestCommit } from "@/lib/get-latest-commit";
import GithubContributions from "./github_graph";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

const repo = await getLatestCommit();
const commit = repo.defaultBranchRef.target;
const commitDate = new Date(commit.committedDate);
  
export default function GitHubPage() {
  return (
    <div className="flex flex-col w-full relative">
        <div className="relative left-1/2 -translate-x-1/2 h-[20px] w-[calc(100%+2rem)] max-w-[450px] pattern-hatch border-b border-t border-neutral-200 dark:border-neutral-800" />
        <div id="github-header" className="relative left-1/2 -translate-x-1/2 uppercase font-open text-[12px] text-[#cfcfcf] bg-white dark:bg-neutral-900 w-[calc(100%+2rem)] h-[30px] max-w-[450px] border-b border-l border-neutral-200 dark:border-neutral-800 flex items-center justify-start px-3 leading-none">
          stats
        </div>
        <div className="w-full max-w-[450px] mt-4 flex flex-col">
          <GithubContributions />
          <a
            href={commit.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:opacity-95 transition-opacity"
          >
            <div className="flex flex-col gap-3 p-2 w-full">
              <div className="flex items-center gap-2">
                  <Image
                    src="/merge_light.svg"
                    alt="Git Activity Graphic"
                    width={14}
                    height={14}
                    className="block dark:hidden object-contain"
                  />
                  <Image
                    src="/merge_dark.svg"
                    alt="Git Activity Graphic"
                    width={14}
                    height={14}
                    className="hidden dark:block object-contain"
                  />
                  <p className="text-[12px] text-black dark:text-neutral-500 font-open">
                    recent contribution
                  </p>
                </div>
              <div className="flex flex-col gap-2 items-start justify-center border border-neutral-200 dark:border-neutral-800 rounded p-3 w-full rounded-[10px]">
                  <div className="flex flex-col items-start justify-center gap-2">
                    <div className="flex flex-row justify-start items-center gap-2">
                      <Image
                        src="/repo_light.svg"
                        alt="Repository Icon"
                        width={14}
                        height={14}
                        className="block dark:hidden object-contain"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/repo_dark.svg"
                        alt="Repository Icon"
                        width={14}
                        height={14}
                        className="hidden dark:block object-contain"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <p className="text-[12px] font-bold text-neutral-800 dark:text-neutral-100 font-open">
                        {repo.name}
                      </p>
                      <span className="font-mono text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-600 dark:text-neutral-350">
                        {commit.oid.slice(0, 7)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <p className="text-[12px] text-neutral-700 dark:text-neutral-300 font-open">
                        {commitDate.toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                      <Image
                        src="/dot_light.svg"
                        alt="separator"
                        width={12}
                        height={12}
                        className="block dark:hidden object-contain"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <Image
                        src="/dot_dark.svg"
                        alt="separator"
                        width={12}
                        height={12}
                        className="hidden dark:block object-contain"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <p className="text-[12px] text-neutral-700 dark:text-neutral-300 font-open">
                        {formatDistanceToNow(new Date(commit.committedDate), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <p className="text-[12px] text-neutral-700 dark:text-neutral-300 font-open">
                    Feat: {commit.message}
                  </p>
              </div>
            </div>
          </a>
        </div>
    </div>
  );
}
