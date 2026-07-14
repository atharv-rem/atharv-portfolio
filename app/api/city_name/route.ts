import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

function getFlagEmoji(countryCode: string) {
  if (!countryCode || countryCode.length !== 2) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export async function GET(request: NextRequest) {
  const rawCity = request.headers.get("x-vercel-ip-city") || "";
  const city = rawCity ? decodeURIComponent(rawCity) : "";
  const country = request.headers.get("x-vercel-ip-country") || "";

  return NextResponse.json({
    city,
    flag: getFlagEmoji(country),
  });
}