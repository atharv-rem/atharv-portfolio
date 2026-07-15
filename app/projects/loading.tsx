export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#FAFAFA] dark:bg-neutral-950 relative w-full">
      <div className="absolute inset-0 z-0" />
      <div className="bg-white dark:bg-neutral-900 flex flex-col items-start min-h-screen justify-start w-full max-w-[450px] px-4 border-l border-r border-neutral-200 dark:border-neutral-800 relative z-10 pb-24">
        {/* Hatch pattern header */}
        <div className="h-[20px] w-[calc(100%+2rem)] max-w-[450px] pattern-hatch border-b border-t border-neutral-200 dark:border-neutral-800 -mx-4" />
        
        {/* Page Title skeleton */}
        <div className="w-48 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse mt-4 mb-6" />

        {/* Tabs skeleton */}
        <div className="w-full flex space-x-2 border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-4">
          <div className="w-20 h-6 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
          <div className="w-24 h-6 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
        </div>

        {/* Project cards skeleton */}
        <div className="w-full flex flex-col gap-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="flex flex-col gap-2 p-3 border border-neutral-200 dark:border-neutral-800 rounded-lg w-full">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
                  <div className="w-32 h-5 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
                </div>
                <div className="w-16 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
              </div>
              <div className="w-full h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse mt-1" />
              <div className="w-3/4 h-4 bg-neutral-200 dark:bg-neutral-800 rounded-md animate-pulse" />
              <div className="flex gap-2 mt-2">
                <div className="w-16 h-5 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />
                <div className="w-16 h-5 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}