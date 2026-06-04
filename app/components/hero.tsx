"use client";

// removed SVG imports
import { DitherShader } from "@/components/ui/dither-shader";
import {motion} from "motion/react"
import {useState,useEffect} from "react";
import LoadingThreeDotsJumping from "./loading-dots";
import Image from "next/image";
import { GithubDrawer } from "./github-drawer";
import { TwitterDrawer } from "./twitter-drawer";
import { InstagramDrawer } from "./instagram-drawer";
import { LinkedinDrawer } from "./linkedin-drawer";
import { ResumeDrawer } from "./resume-drawer";

const segments = [
  ["Full-stack ", true],
  ["developer building", false],
  [" scalable ", true],
  ["products with a focus on ", false],
  ["product design", true],
  [", ", false],
  ["system architecture", true],
  [", and creating ", false],
  ["impactful user experiences", true],
  [".", false],
];

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  return "Good evening";
}

export default function Hero() {
  const [hovered, setHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("");
  const [flag, setFlag] = useState("");
  const [greeting] = useState(getGreeting);

  useEffect(() => {
    async function getCity() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        const res = await fetch("/api/city_name", { cache: "no-store" });

        if (res.ok) {
          const data = await res.json();
          setCity(data.city);
          setFlag(data.flag);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    getCity();
  }, []);
  
  return (
    <div className="flex flex-col items-left justify-end h-screen w-full relative" > 
        <div className="absolute top-0 left-1/2 z-20 h-[20px] w-[calc(100%+2rem)] max-w-[450px] -translate-x-1/2 pattern-hatch border-b border-neutral-200" />
        <div className="absolute uppercase top-[20px] left-1/2 font-open text-[15px] text-[#cfcfcf] bg-white z-10 w-[calc(100%+2rem)] h-[30px] max-w-[450px] -translate-x-1/2 border-b border-neutral-200 flex items-center justify-start px-3">
          intro
        </div>
        <div className="relative">
          <div className="absolute top-8 left-[140px] z-10">
            <div className="relative bg-white rounded-[80px] px-4 shadow-md border border-neutral-200 border-2 text-[#3b3b3b] font-open min-h-[38px] min-w-[80px] flex items-center justify-center">
              {isLoading ? (
                <LoadingThreeDotsJumping />
              ) : (
                <span className="whitespace-nowrap flex items-center gap-1.5">
                  {city ? (
                    <>
                      Hi visitor from {city}
                      {flag && <img src={flag} alt="flag" className="w-5 h-auto rounded-sm object-cover" />}
                    </>
                  ) : (
                    greeting
                  )}
                </span>
              )}

              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45 border-l border-b border-neutral-200" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[10px] border-[2px] border-[#9f9f9f] dark:border-neutral-800 w-[150px] h-[150px] mb-2 hero-image-shadow ml-[10px]">
            <DitherShader
              src="/hero image.png"
              gridSize={1}
              ditherMode="bayer"
              colorMode="grayscale"
              invert={false}
              animated={false}
              animationSpeed={0.02}
              primaryColor="#000000"
              secondaryColor="#f5f5f5"
              threshold={0.5}
            />
          </div>
        </div>
        <div className="text-[clamp(4.5rem,17vw,80px)] font-heuvel uppercase text-[#3b3b3b]  mb-[-40px] md:mb-[-50px] hero-text-shadow">
            Atharv
        </div>
        <div className="text-[clamp(4rem,18.5vw,80px)] font-heuvel uppercase text-[#3b3b3b] hero-text-shadow">
            Remeshan
        </div>

        <div
          className="text-[clamp(1rem,5vw,18px)] font-open text-left mt-[-20px] leading-[1.2]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {segments.map(([text, isBold], i) => (
            <motion.span
                key={i}
                animate={{
                fontWeight: isBold && hovered ? 700 : 400,
                color: hovered
                    ? isBold ? "#000000" : "#b0b0b0"
                    : "#626262",
                }}
                transition={{
                duration: 0.22,
                delay: hovered ? i * 0.04 : 0,
                ease: "easeOut",
                }}
                style={{ display: "inline" }}
            >
                {text}
            </motion.span>
            ))}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 mb-4">
          <GithubDrawer />
          <TwitterDrawer />
          <InstagramDrawer />
          <LinkedinDrawer />
          <ResumeDrawer />
        </div>
    </div>
  );
}
