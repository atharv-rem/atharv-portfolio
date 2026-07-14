"use client";

import * as React from "react";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";

export function ResumeDrawer() {
  const handleResumeClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const downloadLink = document.createElement("a");
    downloadLink.href = "/resume.pdf";
    downloadLink.download = "Atharv_Remeshan_Resume.pdf";
    downloadLink.click();
    window.open("/resume.pdf", "_blank", "noopener,noreferrer");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="flex items-center px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer gap-2">
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
        </button>
      </DrawerTrigger>

      <DrawerContent className="mx-auto w-full max-w-[450px] shadow-2xl">
        <DrawerHeader className="text-left">
          <DrawerTitle className="hidden">Resume</DrawerTitle>
          <DrawerDescription className="hidden">View or download my resume</DrawerDescription>
        </DrawerHeader>
        
        <div className="absolute w-full flex flex-col items-center justify-center bottom-14">
          <Image src="/resume_light.png" alt="Resume Preview" width={200} height={150} className="rounded-[10px] border border-neutral-200 dark:border-neutral-700 dark:hidden block shadow-md" />
          <Image src="/resume_dark.png" alt="Resume Preview" width={200} height={150} className="rounded-[10px] border border-neutral-200 dark:border-neutral-700 dark:block hidden shadow-md" />
        </div>
        <DrawerFooter>
            <button onClick={handleResumeClick} className="px-4 py-3 z-10 flex flex-row items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800 text-[15px] font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors w-full cursor-pointer">
              <Image
                src="/pdf_light.svg"
                alt="Download"
                width={20}
                height={20}
                className="mr-2 block dark:hidden"
              />
              <Image 
                src="/pdf_dark.svg"
                alt="Download"
                width={20}
                height={20}
                className="mr-2 hidden dark:block"
              />
              <p>download resume</p>
            </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
