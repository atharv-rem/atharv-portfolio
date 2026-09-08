import type { Metadata } from "next";
import { BottomNavbar } from "../components/bottom-navbar";
import { getProjects } from "@/lib/get-repo-details";
import { ReverseDiagonalBoxPattern } from "@/components/background-pattern/reverse-diagonal-box-pattern";
import { ProjectTabs } from "./project-tabs";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore featured and experimental projects built by Atharv Remeshan, showcasing engineering, design, and system architecture.",
};

export default async function Projects() {
  const { featured, experimental } = await getProjects();

  return (
    <ReverseDiagonalBoxPattern className="flex min-h-screen flex-col items-center justify-between bg-[#FAFAFA] dark:bg-neutral-950 relative w-full">
      <div className="absolute inset-0 z-0" />
      <div className="bg-white dark:bg-neutral-900 flex flex-col items-start min-h-screen justify-start w-full max-w-[450px] px-4 border-l border-r border-neutral-200 dark:border-neutral-800 relative z-10 pb-24">
        <div className="h-[20px] w-[calc(100%+2rem)] pattern-hatch border-b border-t border-neutral-200 dark:border-neutral-800 -mx-4" />
        <h1 className="text-[clamp(4.5rem,17vw,50px)] font-heuvel uppercase text-[#3b3b3b] dark:text-neutral-200 mt-[10px]">Projects</h1>
        <p className="font-open text-[15px] text-neutral-600 dark:text-neutral-400 -mt-4.5 mb-4">
          A collection of things I’ve built, designed, and experimented with. From live projects to little ideas and UI explorations.
        </p>
        <ProjectTabs featured={featured} experimental={experimental} />
        <BottomNavbar />
      </div>
    </ReverseDiagonalBoxPattern>
  );
}