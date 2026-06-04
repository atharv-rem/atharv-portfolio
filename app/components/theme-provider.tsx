// components/theme-provider.tsx

"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";

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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      forcedTheme={undefined}
    >
      {children}
    </ThemeProvider>
  );
}