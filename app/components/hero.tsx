"use client";

// removed SVG imports
import {motion, useMotionValue, useSpring} from "motion/react"
import {useState,useEffect,useRef} from "react";
import { useTheme } from "next-themes";
import LoadingThreeDotsJumping from "./loading-dots";
import Image from "next/image";
import { ResumeDrawer } from "./resume-drawer";
import { Mascot } from "page-mascot";
import { Message, MessageContent, Bubble, BubbleContent } from "xiod-ui/message";

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
  const [country, setCountry] = useState("");
  const [greeting, setGreeting] = useState("Good morning");
  const { resolvedTheme } = useTheme();
  const mascotRef = useRef<HTMLDivElement>(null);
  const bubbleX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const bubbleY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  // Drift the bubble a few px toward the cursor, in step with the mascot's head turn.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const MAX_X = 10;
    const MAX_Y = 6;
    const REACH = 300;

    const follow = (event: PointerEvent) => {
      const box = mascotRef.current?.getBoundingClientRect();
      if (!box) return;
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const strength = Math.min(1, dist / REACH);
      bubbleX.set((dx / dist) * strength * MAX_X);
      bubbleY.set((dy / dist) * strength * MAX_Y);
    };

    window.addEventListener("pointermove", follow, { passive: true });
    return () => window.removeEventListener("pointermove", follow);
  }, [bubbleX, bubbleY]);

  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setGreeting(getGreeting());

    async function getCity() {
      try {
        const cachedCity = sessionStorage.getItem("city_name");
        const cachedCountry = sessionStorage.getItem("city_country");
        if (cachedCity) {
          setCity(cachedCity);
          setCountry(cachedCountry || "");
          setIsLoading(false);
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));
        
        const res = await fetch("/api/city_name", { cache: "no-store" });

        if (res.ok) {
          const data = await res.json();
          setCity(data.city);
          setCountry(data.country || "");
          if (data.city) {
            sessionStorage.setItem("city_name", data.city);
            sessionStorage.setItem("city_country", data.country || "");
          }
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
        <div className="absolute top-0 -left-4 z-20 h-[20px] w-[calc(100%+2rem)] pattern-hatch border-b border-neutral-200 dark:border-neutral-800" />
        <div className="absolute uppercase top-[20px] -left-4 font-open text-[12px] text-[#8b8b8b] dark:text-[#d0d0d0] bg-white dark:bg-neutral-900 z-10 w-[calc(100%+2rem)] h-[30px] border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-start px-3">
          intro
        </div>
        <div className="relative">
          <motion.div
            style={{ x: bubbleX, y: bubbleY, transformOrigin: "left center" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="absolute top-1/2 -translate-y-1/2 left-[100px] z-0"
          >
            <Message className="w-auto">
              <MessageContent className="w-auto">
                <Bubble variant="outline" className="max-w-none">
                  {/* tail pointing back at the mascot */}
                  <span
                    aria-hidden
                    className="absolute top-1/2 -left-[5px] z-10 size-2.5 -translate-y-1/2 rotate-45 border-b border-l border-border bg-background dark:border-neutral-700 dark:bg-neutral-800"
                  />
                  <BubbleContent className="flex min-h-[40px] min-w-[84px] items-center justify-center rounded-2xl border px-4 py-2 font-open text-[13px] shadow-[0_4px_14px_-4px_rgba(0,0,0,0.15)] dark:border-neutral-700! dark:bg-neutral-800! dark:text-neutral-100! dark:shadow-[0_6px_20px_-6px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.05)] whitespace-nowrap group-data-[align=start]/bubble:rounded-tl-2xl">
                    {isLoading ? (
                      <LoadingThreeDotsJumping />
                    ) : city ? (
                      <span className="flex items-center gap-2">
                        <span>
                          Hi visitor from{" "}
                          <span className="font-semibold">{city}</span>
                        </span>
                        {country && (
                          <img
                            src={`https://flagcdn.com/16x12/${country}.png`}
                            width="16"
                            height="12"
                            alt=""
                            className="rounded-[2px] object-contain inline-block align-middle shadow-sm"
                          />
                        )}
                      </span>
                    ) : (
                      greeting
                    )}
                  </BubbleContent>
                </Bubble>
              </MessageContent>
            </Message>
          </motion.div>

          <div ref={mascotRef} className="relative z-10 -mb-2 -ml-4 grayscale dark:grayscale-0">
            <Mascot
              directions="/mascots/atharv-directions.webp"
              reactions="/mascots/atharv-reactions.webp"
              size={160}
              label="Atharv"
            />
          </div>
        </div>
        <div className="text-[clamp(4.5rem,17vw,80px)] font-heuvel uppercase text-[#3b3b3b] dark:text-neutral-200 mb-[-40px] md:mb-[-50px] hero-text-shadow">
            Atharv
        </div>
        <div className="text-[clamp(4rem,18.5vw,80px)] font-heuvel uppercase text-[#3b3b3b] dark:text-neutral-200 hero-text-shadow">
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
                    ? isBold ? (isDark ? "#ffffff" : "#000000") : (isDark ? "#525252" : "#b0b0b0")
                    : (isDark ? "#a3a3a3" : "#626262"),
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
          <a
            href="https://github.com/atharv-rem"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            data-tone-tap
          >
            <Image
              src="/GitHub_light.svg"
              alt="GitHub"
              width={16}
              height={16}
              className="block dark:hidden"
            />
            <Image
              src="/GitHub_dark.svg"
              alt="GitHub"
              width={16}
              height={16}
              className="hidden dark:block"
            />
            GitHub
          </a>
          <a
            href="https://x.com/atharv_rem"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            data-tone-tap
          >
            <Image
              src="/twitter_light.svg"
              alt="Twitter"
              width={16}
              height={16}
              className="block dark:hidden"
            />
            <Image
              src="/twitter_dark.svg"
              alt="Twitter"
              width={16}
              height={16}
              className="hidden dark:block"
            />
            Twitter
          </a>
          <a
            href="https://www.instagram.com/atharv_remeshan/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            data-tone-tap
          >
            <Image
              src="/instagram_dark.svg"
              alt="Instagram"
              width={16}
              height={16}
              className="block dark:hidden"
            />
            <Image
              src="/instagram_light.svg"
              alt="Instagram"
              width={16}
              height={16}
              className="hidden dark:block"
            />
            Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/atharv-rem/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            data-tone-tap
          >
            <Image
              src="/linkedin_light.svg"
              alt="LinkedIn"
              width={16}
              height={16}
              className="block dark:hidden"
            />
            <Image
              src="/linkedin_dark.svg"
              alt="LinkedIn"
              width={16}
              height={16}
              className="hidden dark:block"
            />
            LinkedIn
          </a>
          <a
            href="https://www.threads.com/@atharv_remeshan"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            data-tone-tap
          >
            <Image
              src="/threads_light.svg"
              alt="Threads"
              width={16}
              height={16}
              className="block dark:hidden"
            />
            <Image
              src="/threads_dark.svg"
              alt="Threads"
              width={16}
              height={16}
              className="hidden dark:block"
            />
            Threads
          </a>
          <ResumeDrawer />
        </div>
    </div>
  );
}
