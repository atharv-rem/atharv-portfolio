import type { Metadata } from "next";
import { BottomNavbar } from "../components/bottom-navbar";
import {getProjects} from "@/lib/get-repo-details"
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore featured and experimental projects built by Atharv Remeshan, showcasing engineering, design, and system architecture.",
};
import { 
  TypeScriptPill, JavaScriptPill, GoPill, CPill, PythonPill, ReactPill, 
  AstroPill, TailwindPill, HTMLPill, CSSPill, ZustandPill, TanStackPill, 
  ElectricSQLPill, PostgreSQLPill, MySQLPill, RedisPill, PaperPill, 
  FramerPill, JavaPill, NextJSPill, FigmaPill 
} from "@/app/components/language-pills";

import {formatDistanceToNow} from "date-fns";

function ProjectLanguagePill({ name }: { name: string }) {
  const normalized = name.toLowerCase();
  const pillClass = "px-2 py-1 text-[10px] rounded-[10px] gap-1 hover:bg-white dark:hover:bg-neutral-900 cursor-default shadow-none [&_img]:w-3.5 [&_img]:h-3.5 [&_svg]:w-3.5 [&_svg]:h-3.5 [&_div]:w-3.5 [&_div]:h-3.5";

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
        <span className="font-open inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-[10px] font-medium text-neutral-800 dark:text-neutral-100 select-none">
          {name}
        </span>
      );
  }
}

export default async function Projects() {
  const { featured, experimental } = await getProjects();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#FAFAFA] dark:bg-neutral-950 relative w-full">
        <div className="absolute inset-0 z-0" />
        <div className="bg-white dark:bg-neutral-900 flex flex-col items-start min-h-screen justify-start w-full max-w-[450px] px-4 border-l border-r border-neutral-200 dark:border-neutral-800 relative z-10 pb-24">
          <div className="h-[20px] w-[calc(100%+2rem)] max-w-[450px] pattern-hatch border-b border-t border-neutral-200 dark:border-neutral-800 -mx-4" />
          <h1 className="text-[clamp(4.5rem,17vw,50px)] font-heuvel uppercase text-[#3b3b3b] dark:text-neutral-200 mt-[10px]">Projects</h1>
          <Tabs defaultValue="tab-1" className="w-full">
            <TabsList>
              <TabsTab value="tab-1" className="font-open text-[12px] text-[#3b3b3b] dark:text-neutral-200">
                Featured
              </TabsTab>
              <TabsTab value="tab-2" className="font-open text-[12px] text-[#3b3b3b] dark:text-neutral-200">
                Experimental
              </TabsTab>
            </TabsList>
            <TabsPanel value="tab-1">
              <div className="flex flex-col gap-4 mt-4">
                {featured.map((repo) => (
                  <div key = {repo.id} className="flex flex-col gap-1 p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors w-full">
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center gap-1">
                        <Image src="/repo_light.svg" alt="Repository" width={14} height={14} className="block dark:hidden" />
                        <Image src="/repo_dark.svg" alt="Repository" width={14} height={14} className="hidden dark:block" />
                        <h2 className="text-[12px] font-open text-[#3b3b3b] dark:text-neutral-200">{repo.name}</h2>
                        <Image
                          src="/dot_light.svg"
                          alt="separator"
                          width={16}
                          height={16}
                          className="block dark:hidden object-contain"
                         
                        />
                        <Image
                          src="/dot_dark.svg"
                          alt="separator"
                          width={16}
                          height={16}
                          className="hidden dark:block object-contain"
                        />
                        <p className="text-[12px] text-neutral-700 dark:text-neutral-300 font-open">
                          {formatDistanceToNow(new Date(repo.createdAt), {
                          addSuffix: true,
                        })}
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        {repo.homepageUrl && (
                          <a href={repo.homepageUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-1 py-[1px] px-[5px] rounded-[5px] border border-[#e7e7e7] dark:border-neutral-600 dark:bg-neutral-800">
                            <Image src="/external_link_dark.svg" alt="External Link" width={12} height={12} className="ml-auto dark:block hidden" />
                            <Image src="/external_link_light.svg" alt="External Link" width={12} height={12} className="ml-auto dark:hidden block" />
                            <p className="text-sm text-black dark:text-white">live</p>
                          </a>
                        )}
                        {repo.url && (
                          <a href={repo.url} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-1 py-[5px] px-[5px] rounded-[5px] dark:bg-neutral-800 border-[1px] border-[#e7e7e7] dark:border-neutral-600">
                            <Image src="/GitHub_dark.svg" alt="External Link" width={12} height={12} className="ml-auto dark:block hidden" />
                            <Image src="/GitHub_light.svg" alt="External Link" width={12} height={12} className="ml-auto dark:hidden block" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-[12px] text-neutral-600 dark:text-neutral-400">{repo.description}</p> 
                    {repo.languagesList && repo.languagesList.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1 mb-2">
                        {repo.languagesList.map((lang) => (
                          <ProjectLanguagePill key={lang} name={lang} />
                        ))}
                      </div>
                    )}
                    <div className="flex flex-col items-start justify-center gap-1 ">
                      {repo.defaultBranchRef?.target && (
                        <>
                          <div className="flex flex-row items-center gap-2">
                            <Image src="/merge_light.svg" alt="Repository Stats" width={13} height={13} className="dark:hidden block" />
                            <Image src="/merge_dark.svg" alt="Repository Stats" width={13} height={13} className="dark:block hidden" />
                            <p className="text-[12px] font-mono text-neutral-600 dark:text-neutral-400 bg-[#efefef] dark:bg-neutral-800 px-[8px] py-[1px] rounded-[5px] font-semibold">
                              {repo.defaultBranchRef.target.oid.slice(0, 7)}
                            </p>
                            <Image
                              src="/dot_light.svg"
                              alt="separator"
                              width={16}
                              height={16}
                              className="block dark:hidden object-contain"
                            />
                            <Image
                              src="/dot_dark.svg"
                              alt="separator"
                              width={16}
                              height={16}
                              className="hidden dark:block object-contain"      
                            />
                            <p className="text-[12px] text-neutral-700 dark:text-neutral-300 font-open">
                              {formatDistanceToNow(new Date(repo.defaultBranchRef.target.committedDate), {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                          <p className="text-[12px] ml-[20px] text-neutral-600 dark:text-neutral-400">Feat: {repo.defaultBranchRef.target.message}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsPanel>
            <TabsPanel value="tab-2">
              <div className="flex flex-col gap-4 mt-4">
                {experimental.map((repo) => (
                  <div key = {repo.id} className="flex flex-col gap-1 p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors w-full">
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center gap-1">
                        <Image src="/repo_light.svg" alt="Repository" width={14} height={14} className="block dark:hidden" />
                        <Image src="/repo_dark.svg" alt="Repository" width={14} height={14} className="hidden dark:block" />
                        <h2 className="text-[12px] font-open text-[#3b3b3b] dark:text-neutral-200">{repo.name}</h2>
                        <Image
                          src="/dot_light.svg"
                          alt="separator"
                          width={16}
                          height={16}
                          className="block dark:hidden object-contain"
                          
                        />
                        <Image
                          src="/dot_dark.svg"
                          alt="separator"
                          width={16}
                          height={16}
                          className="hidden dark:block object-contain"
                        />
                        <p className="text-[12px] text-neutral-700 dark:text-neutral-300 font-open">
                          {formatDistanceToNow(new Date(repo.createdAt), {
                          addSuffix: true,
                        })}
                        </p>
                      </div>
                      <div className="flex flex-row items-center gap-2">
                        {repo.homepageUrl && (
                          <a href={repo.homepageUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-1 py-[1px] px-[5px] rounded-[5px] border border-[#e7e7e7] dark:border-neutral-600  dark:bg-neutral-800">
                            <Image src="/external_link_dark.svg" alt="External Link" width={12} height={12} className="ml-auto dark:block hidden" />
                            <Image src="/external_link_light.svg" alt="External Link" width={12} height={12} className="ml-auto dark:hidden block" />
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">live</p>
                          </a>
                        )}
                        {repo.url && (
                          <a href={repo.url} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-1 py-[5px] px-[5px] rounded-[5px] dark:bg-neutral-800 border-[1px] border-[#e7e7e7] dark:border-neutral-600">
                            <Image src="/GitHub_dark.svg" alt="External Link" width={12} height={12} className="ml-auto dark:block hidden" />
                            <Image src="/GitHub_light.svg" alt="External Link" width={12} height={12} className="ml-auto dark:hidden block" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-[12px] text-neutral-600 dark:text-neutral-400">{repo.description}</p> 
                    {repo.languagesList && repo.languagesList.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1 mb-2">
                        {repo.languagesList.map((lang) => (
                          <ProjectLanguagePill key={lang} name={lang} />
                        ))}
                      </div>
                    )}
                    <div className="flex flex-col items-start justify-center gap-1 ">
                      {repo.defaultBranchRef?.target && (
                        <>
                          <div className="flex flex-row items-center gap-2">
                            <Image src="/merge_light.svg" alt="Repository Stats" width={14} height={14} className="dark:hidden block" />
                            <Image src="/merge_dark.svg" alt="Repository Stats" width={14} height={14} className="dark:block hidden" />
                            <p className="text-[12px] font-mono text-neutral-600 dark:text-neutral-400 bg-[#efefef] dark:bg-neutral-800 px-[8px] py-[1px] rounded-[5px] font-semibold">
                              {repo.defaultBranchRef.target.oid.slice(0, 7)}
                            </p>
                            <Image
                              src="/dot_light.svg"
                              alt="separator"
                              width={16}
                              height={16}
                              className="block dark:hidden object-contain"
                            />
                            <Image
                              src="/dot_dark.svg"
                              alt="separator"
                              width={16}
                              height={16}
                              className="hidden dark:block object-contain"      
                            />
                            <p className="text-[12px] text-neutral-700 dark:text-neutral-300 font-open">
                              {formatDistanceToNow(new Date(repo.defaultBranchRef.target.committedDate), {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                          <p className="text-[12px] ml-[20px] text-neutral-600 dark:text-neutral-400">Feat: {repo.defaultBranchRef.target.message}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsPanel>
          </Tabs>
          <BottomNavbar />
        </div>
    </main>
  );
}