import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // 1. Check Cloudflare location headers (CF-IPCity, CF-IPCountry)
  const cfCity = request.headers.get("cf-ipcity");
  const cfCountry = request.headers.get("cf-ipcountry");

  let city = cfCity ? decodeURIComponent(cfCity) : "";
  let country = cfCountry ? cfCountry.toLowerCase() : "";

  // If Cloudflare provided both city and country, return immediately
  if (city && country) {
    return NextResponse.json({ city, country });
  }

  // 2. If behind Cloudflare or proxy without cf-ipcity header, use real visitor IP
  const clientIp =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  // If visitor IP exists and is not a local loopback IP
  if (clientIp && clientIp !== "127.0.0.1" && clientIp !== "::1") {
    try {
      const res = await fetch(`https://freeipapi.com/api/json/${clientIp}`, {
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.cityName && data.cityName !== "-") city = data.cityName;
        if (data.countryCode && data.countryCode !== "-") country = data.countryCode.toLowerCase();
        if (city && country) {
          return NextResponse.json({ city, country });
        }
      }
    } catch (error) {
      console.error("IP geolocation lookup error:", error);
    }
  }

  // 3. Fallback to Vercel headers (for direct Vercel traffic)
  const rawCity = request.headers.get("x-vercel-ip-city") || "";
  city = city || (rawCity ? decodeURIComponent(rawCity) : "");
  country = country || (request.headers.get("x-vercel-ip-country") || "").toLowerCase();

  return NextResponse.json({
    city,
    country,
  });
}