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

export function InstagramDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
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
        </button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto w-full max-w-[450px]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Instagram</DrawerTitle>
          <DrawerDescription>View my Instagram profile</DrawerDescription>
        </DrawerHeader>
        
        <div className="p-4 flex flex-col items-center justify-center py-8">
          <a
            href="https://www.instagram.com/atharv_remeshan/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-sm"
          >
            Open Instagram
          </a>
        </div>
        
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <button className="px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors w-full cursor-pointer">
              Close
            </button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
