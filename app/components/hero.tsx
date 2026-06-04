"use client";

// removed SVG imports
import { DitherShader } from "@/components/ui/dither-shader";
import {motion} from "motion/react"
import {useState,useEffect} from "react";
import LoadingThreeDotsJumping from "./loading-dots";
import Image from "next/image";

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

const socials = [
  { label: "GitHub", href: "https://github.com/atharv-rem", iconDark: "/GitHub_light.svg", iconLight: "/GitHub_dark.svg" },
  { label: "Twitter", href: "https://x.com/atharv_rem", iconDark: "/twitter_light.svg", iconLight: "/twitter_dark.svg" },
  { label: "Instagram", href: "https://www.instagram.com/atharv_remeshan/", iconDark: "/instagram_light.svg", iconLight: "/instagram_dark.svg" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/atharv-rem/", iconDark: "/linkedin_light.svg", iconLight: "/linkedin_dark.svg" },
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
  
  const handleResumeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const downloadLink = document.createElement("a");
    downloadLink.href = "/resume.pdf";
    downloadLink.download = "Atharv_Remeshan_Resume.pdf";
    downloadLink.click();
    window.open("/resume.pdf", "_blank", "noopener,noreferrer");
  };
  
  return (
    <div className="flex flex-col items-left justify-end h-screen w-full relative" > 
        <div className="absolute top-0 left-1/2 z-20 h-[40px] w-[calc(100%+2rem)] max-w-[450px] -translate-x-1/2 pattern-hatch border-b border-neutral-200" />
        <div className="absolute uppercase top-11 left-1/2 font-open text-[15px] text-[#cfcfcf] bg-white z-10 w-[calc(100%+2rem)] h-[30px] max-w-[450px] -translate-x-1/2 border-b border-neutral-200 flex items-center justify-start px-3 leading-none">
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
          {socials.map(({ label, href, iconDark, iconLight }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <Image
                src={iconLight}
                alt={label}
                width={16}
                height={16}
                className="block dark:hidden"
              />
              <Image
                src={iconDark}
                alt={label}
                width={16}
                height={16}
                className="hidden dark:block"
              />
              {label}
            </a>
          ))}

          <a
            href="/resume.pdf"
            onClick={handleResumeClick}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            <Image
              src="/resume_dark.svg"
              alt="Resume"
              width={16}
              height={16}
              className="block dark:hidden"
            />
            <Image
              src="/resume_light.svg"
              alt="Resume"
              width={16}
              height={16}
              className="hidden dark:block"
            />
            Resume
          </a>
        </div>
    </div>
  );
}
