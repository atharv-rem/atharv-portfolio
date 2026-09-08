"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

export function LatestCommitCard() {
  const [repo, setRepo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedData = sessionStorage.getItem("latest_commit");
    if (cachedData) {
      try {
        setRepo(JSON.parse(cachedData));
        setLoading(false);
        return;
      } catch (e) {
        console.error("Failed to parse cached commit", e);
      }
    }

    async function fetchCommit() {
      try {
        const res = await fetch("/api/latest-commit");
        if (res.ok) {
          const data = await res.json();
          setRepo(data);
          sessionStorage.setItem("latest_commit", JSON.stringify(data));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCommit();
  }, []);

  if (loading || !repo) {
    return (
      <div className="flex flex-col gap-3 w-full animate-pulse">
        <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
        <div className="h-20 w-full bg-neutral-200 dark:bg-neutral-800 rounded-[10px]"></div>
      </div>
    );
  }

  const commit = repo?.defaultBranchRef?.target;
  const commitDate = commit ? new Date(commit.committedDate) : null;

  if (!commit || !commitDate) return null;

  return (
    <a
      href={commit.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block hover:opacity-95 transition-opacity w-full"
    >
      <div className="flex flex-col gap-2 w-full">

        <div className="flex items-center gap-2 ml-[11px]">
          <Image
            src="/commit_light.svg"
            alt="Git Activity Graphic"
            width={18}
            height={18}
            className="block dark:hidden object-contain"
          />
          <Image
            src="/commit_dark.svg"
            alt="Git Activity Graphic"
            width={18}
            height={18}
            className="hidden dark:block object-contain"
          />
          <p className="text-[13px] text-black dark:text-[#bcbcbc] font-open">
            recent contribution
          </p>
        </div>

        <div className="flex flex-col gap-[10px] items-start justify-center border border-neutral-200 dark:border-neutral-800 p-[12px] w-full rounded-[10px] shadow-surface ring-hairline ring-black/6 dark:ring-white/10">
          <div className="flex flex-col items-start justify-center gap-[10px]">
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
              <p className="text-[14px] font-bold text-neutral-800 dark:text-neutral-100 font-open">
                {repo.name}
              </p>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
              <span className="font-open flex flex-row gap-[5px]  text-[10px] sm:text-[12px] font-semibold bg-neutral-100 dark:bg-neutral-800 px-2 py-[5.5px] sm:py-1 text-neutral-600 dark:text-[#bcbcbc] rounded-[6px]">
                <Image
                  src="/commit_light.svg"
                  alt="Commit Hash Icon"
                  width={15}
                  height={15}
                  className="block dark:hidden object-contain"
                />
                <Image
                  src="/commit_dark.svg"
                  alt="Commit Hash Icon"
                  width={15}
                  height={15}
                  className="hidden dark:block object-contain"
                />
                {commit.oid.slice(0, 7)}
              </span>
              <p className="items-center justify-center flex flex-row gap-[5px] text-[10px] sm:text-[12px] text-[#6f4cdc] dark:text-[#8F6FEF] font-open font-semibold bg-[#efe9ff] dark:bg-[#211C33] px-2 py-[5.5px] sm:py-1 rounded-[6px]">
                <Image
                  src="/calendar_light.svg"
                  alt="Calendar Icon"
                  width={14}
                  height={14}
                  className="block dark:hidden object-contain"
                />
                <Image
                  src="/calendar_dark.svg"
                  alt="Calendar Icon"
                  width={14}
                  height={14}
                  className="hidden dark:block object-contain"
                />
                <span className="sm:hidden">
                  {commitDate.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
                <span className="hidden sm:inline">
                  {commitDate.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </p>
              <p className="text-[10px] sm:text-[12px] gap-[5px] flex flex-row  text-[#a53935] dark:text-[#EB6F68] font-open font-semibold bg-[#ffeeec] dark:bg-[#2F2120] px-2 py-[5.5px] sm:py-1 rounded-[6px]">
                <Image
                  src="/calendar2_light.svg"
                  alt="Clock Icon"
                  width={14}
                  height={14}
                  className="block dark:hidden object-contain"
                />
                <Image
                  src="/calendar2_dark.svg"
                  alt="Clock Icon"
                  width={14}
                  height={14}
                  className="hidden dark:block object-contain"
                />  
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
  );
}
