"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
interface PillProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  href?: string;
}

function NextMark({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="90" cy="90" r="90" fill="black" className="dark:fill-white" />
      <path
        d="M149.508 157.52L69.142 54H54v72h14.4V78.212l72.59 93.308c3.51-.76 6.94-1.77 10.278-3.008z"
        fill="white"
        className="dark:fill-black"
      />
      <rect x="111.6" y="54" width="14.4" height="72" fill="white" className="dark:fill-black" />
    </svg>
  );
}

const basePillClass = "font-open inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer select-none";

function GenericPill({
  className,
  href,
  children,
  ...props
}: PillProps & { children: React.ReactNode }) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(basePillClass, className)}
        {...props}
      >
        {children}
      </a>
    );
  }
  return (
    <span
      className={cn(basePillClass, "cursor-default", className)}
      {...(props as React.HTMLAttributes<HTMLSpanElement>)}
    >
      {children}
    </span>
  );
}

export function CPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/C.svg" alt="C" width={16} height={16} className="object-contain" />
      <span>C</span>
    </GenericPill>
  );
}

export function CSSPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/CSS3.svg" alt="CSS3" width={16} height={16} className="object-contain" />
      <span>CSS3</span>
    </GenericPill>
  );
}

export function FigmaPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/Figma.svg" alt="Figma" width={10} height={10} className="object-contain" />
      <span>Figma</span>
    </GenericPill>
  );
}

export function GoPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/Go.svg" alt="Go" width={13} height={13} className="object-contain" />
      <span>Go</span>
    </GenericPill>
  );
}

export function HTMLPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/HTML5.svg" alt="HTML5" width={16} height={16} className="object-contain" />
      <span>HTML5</span>
    </GenericPill>
  );
}

export function PostgreSQLPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/PostgresSQL.svg" alt="PostgreSQL" width={16} height={16} className="object-contain" />
      <span>PostgreSQL</span>
    </GenericPill>
  );
}

export function PythonPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/Python.svg" alt="Python" width={16} height={16} className="object-contain" />
      <span>Python</span>
    </GenericPill>
  );
}

export function RedisPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/Redis_Mark_Red_RGB.svg" alt="Redis" width={16} height={16} className="object-contain" />
      <span>Redis</span>
    </GenericPill>
  );
}

export function AstroPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image
        src="/astro_dark.svg"
        alt="Astro"
        width={13}
        height={13}
        className="block dark:hidden object-contain"
      />
      <Image
        src="/astro_light.svg"
        alt="Astro"
        width={13}
        height={13}
        className="hidden dark:block object-contain"
      />
      <span>Astro</span>
    </GenericPill>
  );
}

export function ElectricSQLPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/electricsql.png" alt="ElectricSQL" width={16} height={16} className="object-contain" />
      <span>ElectricSQL</span>
    </GenericPill>
  );
}

export function JavaScriptPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/javascript.svg" alt="JavaScript" width={16} height={16} className="object-contain" />
      <span>JavaScript</span>
    </GenericPill>
  );
}

export function MySQLPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/mysql.svg" alt="MySQL" width={16} height={16} className="object-contain" />
      <span>MySQL</span>
    </GenericPill>
  );
}

export function ReactPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/react.svg" alt="React" width={16} height={16} className="object-contain" />
      <span>React</span>
    </GenericPill>
  );
}

export function TailwindPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/tailwind.svg" alt="Tailwind CSS" width={16} height={16} className="object-contain" />
      <span>Tailwind CSS</span>
    </GenericPill>
  );
}

export function TanStackPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image
        src="/tanstack.svg"
        alt="TanStack"
        width={16}
        height={16}
        className="object-contain"
      />
      <span>TanStack</span>
    </GenericPill>
  );
}

export function TypeScriptPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/typescript.svg" alt="TypeScript" width={16} height={16} className="object-contain" />
      <span>TypeScript</span>
    </GenericPill>
  );
}

export function VercelPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/vercel.svg" alt="Vercel" width={16} height={16} className="object-contain dark:invert" />
      <span>Vercel</span>
    </GenericPill>
  );
}

export function ZustandPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/zustand.svg" alt="Zustand" width={16} height={16} className="object-contain" />
      <span>Zustand</span>
    </GenericPill>
  );
}

export function PaperPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image src="/paper.svg" alt="Paper" width={13} height={13} className="object-contain rounded-sm" />
      <span>Paper</span>
    </GenericPill>
  );
}

export function JavaPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image
        src="/java.svg"
        alt="Java"
        width={14}
        height={14}
        className="object-contain"
      />
      <span>Java</span>
    </GenericPill>
  );
}

export function FramerPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <Image
        src="/framer_light.svg"
        alt="Framer"
        width={20}
        height={20}
        className="block dark:hidden object-contain"
      />
      <Image
        src="/framer_dark.svg"
        alt="Framer"
        width={20}
        height={20}
        className="hidden dark:block object-contain"
      />
      <span>Framer</span>
    </GenericPill>
  );
}

export function NextJSPill(props: PillProps) {
  return (
    <GenericPill {...props}>
      <div className="flex items-center justify-center w-4 h-4 dark:invert">
        <NextMark size={16} />
      </div>
      <span>Next.js</span>
    </GenericPill>
  );
}
