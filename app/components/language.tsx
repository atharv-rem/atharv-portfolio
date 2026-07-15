import { TypeScriptPill, JavaScriptPill, GoPill, CPill, PythonPill,ReactPill,AstroPill,TailwindPill,HTMLPill,CSSPill, ZustandPill, TanStackPill, ElectricSQLPill, PostgreSQLPill, MySQLPill, RedisPill, PaperPill, FramerPill, JavaPill, NextJSPill, FigmaPill} from "@/app/components/language-pills";

export default function Language() {
  return (
    <div className="flex flex-col w-full py-4">
        {/* Languages Header */}
        <div className="relative left-1/2 -translate-x-1/2 h-[20px] w-[calc(100%+2rem)] max-w-[450px] pattern-hatch border-b border-t border-neutral-200 dark:border-neutral-800" />
        <div className="relative left-1/2 -translate-x-1/2 uppercase font-open text-[12px] text-[#8b8b8b] dark:text-[#d0d0d0] bg-white dark:bg-neutral-900 w-[calc(100%+2rem)] h-[30px] max-w-[450px] border-b border-l border-neutral-200 dark:border-neutral-800 justify-start px-3 flex items-center">
          languages
        </div>
        
        {/* Languages Pills */}
        <div className="flex flex-wrap gap-2 py-4">
          <JavaScriptPill />
          <PythonPill />
          <TypeScriptPill />
          <GoPill />
          <CPill />
          <JavaPill />
        </div>

        {/* Frontend Header */}
        <div className="relative left-1/2 -translate-x-1/2 h-[20px] w-[calc(100%+2rem)] max-w-[450px] pattern-hatch border-t border-b border-neutral-200 dark:border-neutral-800" />
        <div className="relative left-1/2 -translate-x-1/2 uppercase font-open text-[12px] text-[#8b8b8b] dark:text-[#d0d0d0] bg-white dark:bg-neutral-900 w-[calc(100%+2rem)] h-[30px] max-w-[450px] border-b border-l border-neutral-200 dark:border-neutral-800 flex flex-row items-center justify-start px-3 leading-none">
          frontend
        </div>
        
        {/* Frontend Pills */}
        <div className="flex flex-wrap gap-2 py-4">
          <AstroPill />
          <ReactPill />
          <TailwindPill />
          <HTMLPill />
          <CSSPill />
          <NextJSPill />
        </div>

        {/* state and data */}
        <div className="relative left-1/2 -translate-x-1/2 h-[20px] w-[calc(100%+2rem)] max-w-[450px] pattern-hatch border-t border-b border-neutral-200 dark:border-neutral-800" />
        <div className="relative left-1/2 -translate-x-1/2 uppercase font-open text-[12px] text-[#8b8b8b] dark:text-[#d0d0d0] bg-white dark:bg-neutral-900 w-[calc(100%+2rem)] h-[30px] max-w-[450px] border-b border-l border-neutral-200 dark:border-neutral-800 flex items-center justify-start px-3 leading-none">
          state and data
        </div>
        <div className="flex flex-wrap gap-2 py-4">
          <ZustandPill />
          <TanStackPill />
          <ElectricSQLPill />
        </div>
        {/* backend and db */}
        <div className="relative left-1/2 -translate-x-1/2 h-[20px] w-[calc(100%+2rem)] max-w-[450px] pattern-hatch border-t border-b border-neutral-200 dark:border-neutral-800" />
        <div className="relative left-1/2 -translate-x-1/2 uppercase font-open text-[12px] text-[#8b8b8b] dark:text-[#d0d0d0] bg-white dark:bg-neutral-900 w-[calc(100%+2rem)] h-[30px] max-w-[450px] border-b border-l border-neutral-200 dark:border-neutral-800 flex items-center justify-start px-3 leading-none">
          backend and db
        </div>
        <div className="flex flex-wrap gap-2 py-4">      
          <PostgreSQLPill />
          <MySQLPill />
          <RedisPill />
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-default select-none">
            Rest API
          </div>
        </div>

          {/*design*/}
        <div className="relative left-1/2 -translate-x-1/2 h-[20px] w-[calc(100%+2rem)] max-w-[450px] pattern-hatch border-t border-b border-neutral-200 dark:border-neutral-800" />
        <div className="relative left-1/2 -translate-x-1/2 uppercase font-open text-[12px] text-[#8b8b8b] dark:text-[#d0d0d0] bg-white dark:bg-neutral-900 w-[calc(100%+2rem)] h-[30px] max-w-[450px] border-b border-l border-neutral-200 dark:border-neutral-800 flex items-center justify-start px-3 leading-none">
          design
        </div>
        <div className="flex flex-wrap gap-2 py-4">
            <PaperPill />
            <FramerPill />
            <FigmaPill />
        </div>   
      </div>
  );
}