// components/theme-provider.tsx

"use client";

import { ThemeProvider } from "next-themes";

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