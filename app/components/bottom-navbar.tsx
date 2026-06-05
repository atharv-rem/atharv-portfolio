"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 hover:text-white dark:text-neutral-500 dark:hover:text-black transition-colors">
    <circle cx="12" cy="12" r="4"/>
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 hover:text-white dark:text-neutral-500 dark:hover:text-black transition-colors">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
  </svg>
);

export function BottomNavbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isVisible, setIsVisible] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (!isHome) {
        const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20;
        setIsVisible(!reachedBottom);
        return;
      }

      const githubHeader = document.getElementById("github-header");
      const contactElement = document.getElementById("contact");

      if (!githubHeader || !contactElement) return;

      const githubRect = githubHeader.getBoundingClientRect();
      const contactRect = contactElement.getBoundingClientRect();

      // Immediately appear when the header of github page is on screen
      const githubOnScreenOrPast = githubRect.top < window.innerHeight;

      // Hide when you reach the end of the contact page
      // We use a buffer of 120px, or check if the scroll has reached the bottom of the page
      const reachedEndOfContact =
        contactRect.bottom <= window.innerHeight + 120 ||
        (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 20);

      if (githubOnScreenOrPast && !reachedEndOfContact) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Run once on mount to handle initial scroll state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isHome]);

  const navItems = [
    { name: "projects", url: isHome ? "#projects" : "/#projects" },
    { name: "blog", url: "/blog" },
    { name: "contact me", url: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 80, x: "-50%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 z-50 flex items-center justify-between gap-6 px-6 py-3 rounded-full bg-neutral-950/90 dark:bg-[#696969] backdrop-blur-md border border-neutral-800 shadow-xl w-[calc(100%-2rem)] max-w-[400px]"
        >
          <div className="flex items-center justify-around flex-1">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.url}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-open text-[11px] font-medium uppercase tracking-wider text-neutral-400 hover:text-white dark:text-white dark:hover:text-black transition-colors cursor-pointer select-none"
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          <div className="w-[1px] h-4 bg-neutral-800 dark:bg-neutral-200" />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center p-1 rounded-full cursor-pointer focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {mounted ? resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon /> : <div className="w-[14px] h-[14px]" />}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
