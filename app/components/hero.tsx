"use client";

import { DitherShader } from "@/components/ui/dither-shader";
import {motion} from "motion/react"
import {useState} from "react";

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

export default function Hero() {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex flex-col items-left justify-end h-screen w-full "> 
        <div className="relative overflow-hidden rounded-[10px] border-[2px] border-[#9f9f9f] dark:border-neutral-800 w-[150px] h-[150px] mb-2 hero-image-shadow ml-[5px]">
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
            className=""
          />
        </div>
        <div className="text-[clamp(4.5rem,17vw,80px)] font-heuvel uppercase text-black  mb-[-40px] md:mb-[-50px] hero-text-shadow">
            Atharv
        </div>
        <div className="text-[clamp(4rem,18.5vw,80px)] font-heuvel uppercase text-black hero-text-shadow">
            Remeshan
        </div>
        <div
      className="text-[clamp(1rem,5vw,18px)] font-open text-left mt-[-20px] mb-[10px] leading-[1.2]"
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
    </div>
  );
}