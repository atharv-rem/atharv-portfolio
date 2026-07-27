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
      <div className="flex flex-col gap-3 p-2 w-full animate-pulse">
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
          <p className="text-[12px] text-black dark:text-[#bcbcbc] font-open">
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
              <span className="font-mono text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-600 dark:text-[#bcbcbc]">
                {commit.oid.slice(0, 7)}
              </span>
            </div>
            <div className="flex items-center">
              <p className="text-[12px] text-neutral-700 dark:text-[#bcbcbc] font-open">
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
  );
}
