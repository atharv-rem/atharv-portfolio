"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { ReactLenis } from "lenis/react";
import "tap-tone";
import "lenis/dist/lenis.css";

// Suppress the React 19 / Next.js 16 false-positive warning about script tags
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalError = console.error;
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag")
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

export default function Provider({  children,}: {children: React.ReactNode;}) {
  return (
    <ReactLenis root>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        forcedTheme={undefined}
      >
        {children}
      </ThemeProvider>
    </ReactLenis>
  );
}