import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const acceptHeader = request.headers.get("accept") || "";
  const { pathname } = request.nextUrl;

  // Intercept agent requests demanding markdown for content pages
  if (
    acceptHeader.includes("text/markdown") &&
    (pathname === "/" || pathname === "/projects" || pathname.startsWith("/blog"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/api/markdown";
    url.searchParams.set("path", pathname);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/projects", "/blog", "/blog/:slug*"],
};
