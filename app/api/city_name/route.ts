import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // Vercel automatically populates geolocation headers on deployment
  const cityHeader = request.headers.get("x-vercel-ip-city");
  const countryHeader = request.headers.get("x-vercel-ip-country");

  // Fallback for local development or when headers are missing
  const city = cityHeader ? decodeURIComponent(cityHeader) : "";
  const countryCode = countryHeader ? countryHeader.toLowerCase() : "";

  const flag = countryCode ? `https://cdn.ipwho.is/flags/${countryCode}.svg` : "";
  console.log(`City: ${city}, Country Code: ${countryCode}`);
  return NextResponse.json({
    city,
    flag,
  });
}