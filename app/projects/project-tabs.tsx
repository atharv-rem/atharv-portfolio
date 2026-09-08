"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import Image from "next/image";
import { 
  TypeScriptPill, JavaScriptPill, GoPill, CPill, PythonPill, ReactPill, 
  AstroPill, TailwindPill, HTMLPill, CSSPill, ZustandPill, TanStackPill, 
  ElectricSQLPill, PostgreSQLPill, MySQLPill, RedisPill, PaperPill, 
  FramerPill, JavaPill, NextJSPill, FigmaPill 
} from "@/app/components/language-pills";

function ProjectLanguagePill({ name }: { name: string }) {
  const normalized = name.toLowerCase();
  const pillClass = "px-2 py-0.5 text-[12px] rounded-[8px] gap-1 hover:bg-white dark:hover:bg-neutral-900 cursor-default shadow-none [&_img]:w-3.5 [&_img]:h-3.5 [&_svg]:w-3.5 [&_svg]:h-3.5 [&_div]:w-3.5 [&_div]:h-3.5";

  switch (normalized) {
    case "typescript":
      return <TypeScriptPill className={pillClass} />;
    case "javascript":
      return <JavaScriptPill className={pillClass} />;
    case "go":
      return <GoPill className={pillClass} />;
    case "python":
      return <PythonPill className={pillClass} />;
    case "react":
      return <ReactPill className={pillClass} />;
    case "astro":
      return <AstroPill className={pillClass} />;
    case "tailwind css":
    case "tailwind":
      return <TailwindPill className={pillClass} />;
    case "html":
      return <HTMLPill className={pillClass} />;
    case "css":
      return <CSSPill className={pillClass} />;
    case "zustand":
      return <ZustandPill className={pillClass} />;
    case "tanstack":
      return <TanStackPill className={pillClass} />;
    case "electricsql":
      return <ElectricSQLPill className={pillClass} />;
    case "postgres":
    case "postgresql":
      return <PostgreSQLPill className={pillClass} />;
    case "mysql":
      return <MySQLPill className={pillClass} />;
    case "redis":
      return <RedisPill className={pillClass} />;
    case "paper":
      return <PaperPill className={pillClass} />;
    case "framer":
      return <FramerPill className={pillClass} />;
    case "java":
      return <JavaPill className={pillClass} />;
    case "next.js":
      return <NextJSPill className={pillClass} />;
    case "figma":
      return <FigmaPill className={pillClass} />;
    default:
      return (
        <span className="font-open inline-flex items-center gap-1 px-2 py-0.5 rounded-[8px] border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-[12px] font-medium text-neutral-800 dark:text-neutral-100 select-none">
          {name}
        </span>
      );
  }
}

export function ProjectTabs({ featured, experimental }: { featured: any[]; experimental: any[] }) {
  const [activeTab, setActiveTab] = useState<string>("tab-1");

  return (
    <Tabs value={activeTab} onValueChange={(val) => val && setActiveTab(val)} className="w-full">
      <TabsList className="w-full">
        <TabsTab value="tab-1" className="font-open text-[12px] text-[#3b3b3b] dark:text-neutral-200">
          <Image
            src="/ribbon_light.svg"
            alt="star"
            width={18}
            height={18}
            className="block dark:hidden object-contain"
          />
          <Image
            src="/ribbon_dark.svg"
            alt="star"
            width={15}
            height={15}
            className="hidden dark:block object-contain"
          />
          Featured
        </TabsTab>
        <TabsTab value="tab-2" className="font-open text-[12px] text-[#3b3b3b] dark:text-neutral-200">
          <Image
            src="/experiment_light.svg"
            alt="star"
            width={15}
            height={15}
            className="block dark:hidden object-contain"
          />
          <Image
            src="/experiment_dark.svg"
            alt="star"
            width={15}
            height={15}
            className="hidden dark:block object-contain"
          />
          Experimental
        </TabsTab>
        <TabsTab value="tab-3" className="font-open text-[12px] text-[#3b3b3b] dark:text-neutral-200">
          <Image
            src="/picture_light.svg"
            alt="star"
            width={15}
            height={15}
            className="block dark:hidden object-contain"
          />
          <Image
            src="/picture_dark.svg"
            alt="star"
            width={15}
            height={15}
            className="hidden dark:block object-contain"
          />
          User Interface
        </TabsTab>
      </TabsList>
      <TabsPanel value="tab-1">
        <div className="flex flex-col gap-4 mt-4">
          {featured.map((repo) => (
            <div key={repo.id} className="flex flex-col gap-2 p-4 border border-neutral-200 dark:border-neutral-800 rounded-[15px] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors w-full shadow-surface ring-hairline ring-black/6 dark:ring-white/10">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-2">
                  <Image src="/github2_light.svg" alt="Repository" width={16} height={16} className="block dark:hidden" />
                  <Image src="/github2_dark.svg" alt="Repository" width={16} height={16} className="hidden dark:block" />
                  <h2 className="text-[16px] font-open text-black dark:text-neutral-200">{repo.name}</h2>
                </div>
                <div className="flex flex-row items-center gap-2">
                  {repo.inProgress && (
                    <div className="flex flex-row items-center gap-1 px-2 py-[5px] sm:py-[2px] rounded-[10px] sm:rounded-[7px] text-[#935622] dark:text-[#C2B41E] bg-[#fdf4da] dark:bg-[#2C2717] text-[12px] font-open font-semibold">
                      <Image
                        src="/progress_light.svg"
                        alt="Clock Icon"
                        width={14}
                        height={14}
                        className="block dark:hidden object-contain"
                      />
                      <Image
                        src="/progress_dark.svg"
                        alt="Clock Icon"
                        width={14}
                        height={14}
                        className="hidden dark:block object-contain"
                      />  
                      in progress
                    </div>
                  )}
                  {repo.homepageUrl && (
                    <a href={repo.homepageUrl} target="_blank" rel="noopener noreferrer" className="text-[12px] gap-[5px] flex flex-row text-[#2a61c3] bg-[#E5F3FE] dark:bg-[#10253B] dark:text-[#2B9FFB] font-open font-semibold px-2 py-[5px] sm:py-[2px] rounded-[10px] sm:rounded-[7px]">
                      <Image
                        src="/link_light.svg"
                        alt="Link Icon"
                        width={14}
                        height={14}
                        className="block dark:hidden object-contain"
                      />
                      <Image
                        src="/link_dark.svg"
                        alt="Link Icon"
                        width={14}
                        height={14}
                        className="hidden dark:block object-contain"
                      />  
                      live
                    </a>
                  )}
                  {repo.url && (
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-[12px] gap-[5px] flex flex-row text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 font-open font-semibold px-2 py-[5px] sm:py-[2px] rounded-[10px] sm:rounded-[7px]">
                      <Image
                        src="/repo_light.svg"
                        alt="Code Repo"
                        width={14}
                        height={14}
                        className="block dark:hidden object-contain"
                      />
                      <Image
                        src="/repo_dark.svg"
                        alt="Code Repo"
                        width={14}
                        height={14}
                        className="hidden dark:block object-contain"
                      />
                      code
                    </a>
                  )}
                </div>
              </div>
              <p className="text-[14px] text-[#4a4a4a] dark:text-neutral-400 font-open">{repo.description}</p> 
              <div className="flex flex-col items-start justify-center gap-1 ">
                {repo.defaultBranchRef?.target && (
                  <div className="flex flex-col items-start justify-center gap-2 ">
                    <div className="flex flex-row items-center gap-2">
                      <span className="font-open flex flex-row gap-[5px] text-[12px] font-semibold bg-neutral-100 dark:bg-neutral-800 px-2 py-[5px] text-neutral-600 dark:text-[#bcbcbc] rounded-[7px]">
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
                        {repo.defaultBranchRef.target.oid.slice(0, 7)}
                      </span>
                      <p className="items-center justify-center flex flex-row gap-[5px] text-[12px] text-[#6f4cdc] dark:text-[#8F6FEF] font-open font-semibold bg-[#efe9ff] dark:bg-[#211C33] px-2 py-[5.5px] sm:py-1 rounded-[6px]">
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
                        <span className="font-open">
                          {repo.committedDateFormatted}
                        </span>
                      </p>
                    </div>
                    <p className="text-[13px] text-neutral-600 dark:text-neutral-400">Feat: {repo.defaultBranchRef.target.message}</p>
                  </div>
                )}
              </div>
              {repo.languagesList && repo.languagesList.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {repo.languagesList.map((lang: string) => (
                    <ProjectLanguagePill key={lang} name={lang} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </TabsPanel>
      <TabsPanel value="tab-2">
        <div className="flex flex-col gap-4 mt-4">
          {experimental.map((repo) => (
            <div key={repo.id} className="flex flex-col gap-2 p-4 border border-neutral-200 dark:border-neutral-800 rounded-[15px] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors w-full shadow-surface ring-hairline ring-black/6 dark:ring-white/10">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-2">
                  <Image src="/github2_light.svg" alt="Repository" width={16} height={16} className="block dark:hidden" />
                  <Image src="/github2_dark.svg" alt="Repository" width={16} height={16} className="hidden dark:block" />
                  <h2 className="text-[16px] font-open text-black dark:text-neutral-200">{repo.name}</h2>
                </div>
                <div className="flex flex-row items-center gap-2">
                  {repo.homepageUrl && (
                    <a href={repo.homepageUrl} target="_blank" rel="noopener noreferrer" className="text-[12px] gap-[5px] flex flex-row text-[#2a61c3] bg-[#E5F3FE] dark:bg-[#10253B] dark:text-[#2B9FFB] font-open font-semibold px-2 py-[5px] sm:py-[2px] rounded-[10px] sm:rounded-[7px]">
                      <Image
                        src="/link_light.svg"
                        alt="Link Icon"
                        width={14}
                        height={14}
                        className="block dark:hidden object-contain"
                      />
                      <Image
                        src="/link_dark.svg"
                        alt="Link Icon"
                        width={14}
                        height={14}
                        className="hidden dark:block object-contain"
                      />  
                      live
                    </a>
                  )}
                  {repo.url && (
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-[12px] gap-[5px] flex flex-row text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 font-open font-semibold px-2 py-[5px] sm:py-[2px] rounded-[10px] sm:rounded-[7px]">
                      <Image
                        src="/repo_light.svg"
                        alt="Code Repo"
                        width={14}
                        height={14}
                        className="block dark:hidden object-contain"
                      />
                      <Image
                        src="/repo_dark.svg"
                        alt="Code Repo"
                        width={14}
                        height={14}
                        className="hidden dark:block object-contain"
                      />
                      code
                    </a>
                  )}
                </div>
              </div>
              <p className="text-[14px] text-[#4a4a4a] dark:text-neutral-400 font-open">{repo.description}</p> 
              <div className="flex flex-col items-start justify-center gap-1 ">
                {repo.defaultBranchRef?.target && (
                  <div className="flex flex-col items-start justify-center gap-2 ">
                    <div className="flex flex-row items-center gap-2">
                      <span className="font-open flex flex-row gap-[5px] text-[12px] font-semibold bg-neutral-100 dark:bg-neutral-800 px-2 py-[5px] text-neutral-600 dark:text-[#bcbcbc] rounded-[7px]">
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
                        {repo.defaultBranchRef.target.oid.slice(0, 7)}
                      </span>
                      <p className="items-center justify-center flex flex-row gap-[5px] text-[12px] text-[#6f4cdc] dark:text-[#8F6FEF] font-open font-semibold bg-[#efe9ff] dark:bg-[#211C33] px-2 py-[5.5px] sm:py-1 rounded-[6px]">
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
                        <span className="font-open">
                          {repo.committedDateFormatted || repo.createdAtFormatted}
                        </span>
                      </p>
                    </div>
                    <p className="text-[13px] text-neutral-600 dark:text-neutral-400">Feat: {repo.defaultBranchRef.target.message}</p>
                  </div>
                )}
              </div>
              {repo.languagesList && repo.languagesList.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {repo.languagesList.map((lang: string) => (
                    <ProjectLanguagePill key={lang} name={lang} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </TabsPanel>
      <TabsPanel value="tab-3">
        <div className="flex flex-col items-center justify-center py-12 text-neutral-500 font-open text-sm">
          UI explorations coming soon.
        </div>
      </TabsPanel>
    </Tabs>
  );
}
