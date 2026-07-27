"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Signature } from "@/components/ui/signature";
import mumbaiLight from "@/public/mumbai_light.png";
import mumbaiDark from "@/public/mumbai_dark.png";
import blr_light from "@/public/blr_light.png";
import blr_dark from "@/public/blr_dark.png";

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const signatureColor = mounted && resolvedTheme === "dark" ? "#d4d4d4" : "#525252";

  return (
    <footer className="w-full h-auto flex flex-col items-center justify-center border-neutral-200 dark:border-neutral-800 relative">
      <div className="h-[20px] w-[calc(100%+2rem)] max-w-[450px] pattern-hatch border-b border-t border-neutral-200 dark:border-neutral-800 -mx-4" />
      <div className="flex flex-col items-start justify-center w-full py-3 space-y-1 mb-[20px]">
        <div className="flex flex-wrap items-center justify-start gap-x-1.5 gap-y-1 w-full">
            <span className="text-[15px] font-open text-neutral-400">I live in</span>
            <Image
              src={mounted && resolvedTheme === "dark" ? mumbaiDark : mumbaiLight}
              alt="Mumbai"
              width={20}
              height={20}
              className="object-contain shrink-0 h-[25px] w-auto"
            />
            <span className="text-[15px] font-open text-neutral-400">Mumbai and work in</span>
            <Image
              src={mounted && resolvedTheme === "dark" ? blr_dark : blr_light}
              alt="Bangalore"
              width={32}
              height={20}
              className="object-contain shrink-0 h-[25px] w-auto"
            />
            <span className="text-[15px] font-open text-neutral-400">Bangalore</span>
        </div>
        <div>
          {mounted && now ? (
            <time className="text-[15px] font-open text-neutral-400 m">
              {now.toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                dateStyle: "medium",
                timeStyle: "medium",
              })}
            </time>
          ) : (
            <span className="flex items-center space-x-1 py-1 h-[22.5px]">
              <span className="h-1.5 w-1.5 bg-neutral-400 rounded-full animate-pulse [animation-delay:0ms]"></span>
              <span className="h-1.5 w-1.5 bg-neutral-400 rounded-full animate-pulse [animation-delay:150ms]"></span>
              <span className="h-1.5 w-1.5 bg-neutral-400 rounded-full animate-pulse [animation-delay:300ms]"></span>
            </span>
          )}
        </div>
      </div>
      <Signature
        text="atharv"
        color={signatureColor}
      />
    </footer>
  );
}