import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "./components/theme-provider";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip"

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const heuvel = localFont({
  src:"./assets/font/Heuvel grotesk.ttf",
  display: "swap",
  variable: "--font-heuvel",
});

const opensauce = localFont({
  src: [
    {
      path: "./assets/font/open sauce.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "./assets/font/open sauce bold.woff2",
      weight: "700",
      style: "normal"
    }
  ],
  display: "swap",
  variable: "--font-open",
});


export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://atharv-rem.vercel.app"
  ),
  title: {
    default: "Atharv Remeshan",
    template: "%s | Atharv Remeshan",
  },
  description: "Full-stack developer building scalable products with a focus on product design, system architecture, and creating impactful user experiences.",
  keywords: ["Atharv Remeshan", "Atharv", "Remeshan", "Portfolio", "Full-stack Developer", "Software Engineer", "Product Design", "System Architecture"],
  authors: [{ name: "Atharv Remeshan" }],
  creator: "Atharv Remeshan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/atharv-rem",
    title: "Atharv Remeshan",
    description: "Full-stack developer building scalable products with a focus on product design, system architecture, and creating impactful user experiences.",
    siteName: "Atharv Remeshan",
    images: [
      {
        url: "/og-image.avif",
        width: 1200,
        height: 630,
        alt: "Atharv Remeshan Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharv Remeshan",
    description: "Full-stack developer building scalable products with a focus on product design, system architecture, and creating impactful user experiences.",
    creator: "@atharv_rem",
    images: ["/twitter-og-image.avif"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({  children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", heuvel.variable, opensauce.variable, "font-sans", inter.variable)}
      
    >
      <head>
        <script
          src="https://cdn.databuddy.cc/databuddy.js"
          data-client-id="a61ec3c4-9d1e-4349-81d4-a70a31236005"
          data-track-outgoing-links="true"
          data-track-performance="false"
          crossOrigin="anonymous"
          async
        ></script>
      </head>
        <body>
          <Provider>
          <TooltipProvider>
          {children}
          </TooltipProvider>
          </Provider>
        </body>
    </html>
  );
}
