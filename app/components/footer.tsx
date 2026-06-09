"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import FluidGradientText from "@/app/components/fluid-gradient-text";
import mumbaiLight from "@/public/mumbai_light.png";
import mumbaiDark from "@/public/mumbai_dark.png";

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

  return (
    <footer className="w-full h-auto flex flex-col items-center justify-center border-neutral-200 dark:border-neutral-800 relative">
      <div className="h-[20px] w-[calc(100%+2rem)] max-w-[450px] pattern-hatch border-b border-t border-neutral-200 dark:border-neutral-800 -mx-4" />
      <div className="flex flex-col items-start justify-center w-full py-3">
        <div className="flex flex-row items-center justify-center gap-2">
            <Image
              src={mounted && resolvedTheme === "dark" ? mumbaiDark : mumbaiLight}
              alt="Mumbai"
              width={24}
              height={24}
              className="object-contain"
              style={{ width: "auto", height: "auto" }}
            />
            <p className="text-[15px] font-open text-neutral-400 mt-[5px]">Mumbai</p>
        </div>
        <div>
          {mounted && now ? (
            <time className="text-[13px] font-open text-neutral-400 m">
              {now.toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                dateStyle: "medium",
                timeStyle: "medium",
              })}
            </time>
          ) : (
            <span className="text-[13px] font-open text-neutral-400">...</span>
          )}
        </div>
      </div>
      <FluidGradientText
        text="atharv"
        svgViewBoxWidth={450}
        svgViewBoxHeight={150}
      />
    </footer>
  );
}