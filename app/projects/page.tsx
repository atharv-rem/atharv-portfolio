import BottomNavbar from "../components/bottom-navbar";

export default function Projects() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#FAFAFA] dark:bg-neutral-950 relative w-full">
        <div className="absolute inset-0 z-0" />
        <div className="bg-white dark:bg-neutral-900 flex flex-col items-start min-h-screen justify-start w-full max-w-[450px] px-4 border-l border-r border-neutral-200 dark:border-neutral-800 relative z-10 pb-24">
          <div className="h-[20px] w-[calc(100%+2rem)] max-w-[450px] pattern-hatch border-b border-t border-neutral-200 dark:border-neutral-800 -mx-4" />
          <h1 className="text-[clamp(4.5rem,17vw,50px)] font-heuvel uppercase text-[#3b3b3b] dark:text-neutral-200 mt-[10px]">Projects</h1>
          <BottomNavbar />
        </div>
    </main>
  );
}