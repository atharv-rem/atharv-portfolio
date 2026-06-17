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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    if (pathname === "/projects" || pathname?.startsWith("/blog")) {
      setIsVisible(true);
      return;
    }
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
  }, [pathname]);

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
      name: "contact",
      url: "/#contact",
      iconLight: "/contact_light.svg",
      iconDark: "/contact_dark.svg"
    },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <motion.div
            layout
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{
              layout: { type: "spring", stiffness: 350, damping: 30 },
              opacity: { duration: 0.2 },
              y: { duration: 0.3, ease: "easeOut" }
            }}
            className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-2.5 rounded-[10px] bg-white/70 dark:bg-black/70 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 shadow-[0_8px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)] w-auto max-w-[90vw]"
          >
            <div className="flex items-center justify-center gap-2">
              {navItems.map((item, index) => {
                const isHovered = hoveredIndex === index;
                return (
                  <motion.a
                    key={item.name}
                    href={item.url}
                    layout
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 p-2 rounded-[6px] cursor-pointer select-none bg-transparent hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60 transition-colors"
                  >
                    <motion.img
                      layout
                      src={mounted && resolvedTheme === "dark" ? item.iconDark : item.iconLight}
                      alt={item.name}
                      className="w-5 h-5 object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                    <AnimatePresence initial={false}>
                      {isHovered && (
                        <motion.span
                          initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                          animate={{ opacity: 1, width: "auto", marginLeft: 4 }}
                          exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="overflow-hidden whitespace-nowrap text-sm font-semibold tracking-wide text-neutral-800 dark:text-neutral-200 capitalize pr-1 font-open"
                        >
                          {item.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.a>
                );
              })}
            </div>

            <div className="w-[1px] h-4 bg-neutral-300 dark:bg-neutral-800" />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center p-2 rounded-[6px] cursor-pointer focus:outline-none bg-transparent hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60 transition-colors"
              aria-label="Toggle dark mode"
            >
              {mounted ? (
                resolvedTheme === "dark" ? (
                  <img src="/sun.svg" alt="Light Mode" className="w-5 h-5 object-contain invert" style={{ width: "auto", height: "auto" }} />
                ) : (
                  <img src="/moon.svg" alt="Dark Mode" className="w-5 h-5 object-contain invert" style={{ width: "auto", height: "auto" }} />
                )
              ) : (
                <div className="w-[20px] h-[20px]" />
              )}
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

