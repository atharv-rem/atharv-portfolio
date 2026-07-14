import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const rawCity = request.headers.get("x-vercel-ip-city") || "";
  const city = rawCity ? decodeURIComponent(rawCity) : "";
  const country = (request.headers.get("x-vercel-ip-country") || "").toLowerCase();

  return NextResponse.json({
    city,
    country,
  });
}