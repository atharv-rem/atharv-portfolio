"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";


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
    {
      name: "home",
      url: "/",
      iconLight: "/home_light.svg",
      iconDark: "/home_dark.svg"
    },
    {
      name: "projects",
      url: "/projects",
      iconLight: "/folder_light.svg",
      iconDark: "/folder_dark.svg"
    },
    {
      name: "blog",
      url: "/blog",
      iconLight: "/blog_light.svg",
      iconDark: "/blog_dark.svg"
    },
    {
      name: "contact me",
      url: "/#contact",
      iconLight: "/contact_light.svg",
      iconDark: "/contact_dark.svg"
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 80, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 80, x: "-50%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-6 left-1/2 z-50 flex items-center justify-between gap-5 px-5 py-2.5 rounded-[10px] bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)] w-[calc(100%-2.5rem)] max-w-[380px]"
        >
          <div className="flex items-center justify-around flex-1 gap-4">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.url}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                className="flex items-center justify-center p-1.5 rounded-[6px] cursor-pointer select-none"
                title={item.name}
              >
                <img
                  src={mounted && resolvedTheme === "dark" ? item.iconDark : item.iconLight}
                  alt={item.name}
                  className="w-6 h-6 object-contain"
                />
              </motion.a>
            ))}
          </div>

          <div className="w-[1.5px] h-5 bg-neutral-300 dark:bg-neutral-800" />

          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center p-1.5 rounded-[6px] cursor-pointer focus:outline-none"
            aria-label="Toggle dark mode"
          >
            {mounted ? (
              resolvedTheme === "dark" ? (
                <img src="/sun.svg" alt="Light Mode" className="w-5 h-5 object-contain invert" />
              ) : (
                <img src="/moon.svg" alt="Dark Mode" className="w-5 h-5 object-contain invert" />
              )
            ) : (
              <div className="w-[20px] h-[20px]" />
            )}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

