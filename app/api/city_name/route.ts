import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // 1. Check Cloudflare location headers (CF-IPCity, CF-IPCountry)
  const cfCity = request.headers.get("cf-ipcity");
  const cfCountry = request.headers.get("cf-ipcountry");

  if (cfCity && cfCountry) {
    return NextResponse.json({
      city: decodeURIComponent(cfCity),
      country: cfCountry.toLowerCase(),
    });
  }

  // 2. Determine client IP address
  const clientIp =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();

  // 3. Lookup using ip-api.com
  let city = "";
  let country = "";

  try {
    const endpoint =
      clientIp && clientIp !== "127.0.0.1" && clientIp !== "::1"
        ? `http://ip-api.com/json/${clientIp}?fields=status,city,countryCode`
        : `http://ip-api.com/json/?fields=status,city,countryCode`;

    const res = await fetch(endpoint, {
      signal: AbortSignal.timeout(4000),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.status === "success") {
        city = data.city || "";
        country = (data.countryCode || "").toLowerCase();
      }
    }
  } catch (error) {
    console.error("ip-api.com lookup error:", error);
  }

  // 4. Fallback to Vercel headers if ip-api.com returned empty or failed
  if (!city) {
    const rawCity = request.headers.get("x-vercel-ip-city") || "";
    city = rawCity ? decodeURIComponent(rawCity) : "";
  }
  if (!country) {
    const rawCountry = request.headers.get("x-vercel-ip-country") || "";
    country = rawCountry ? rawCountry.toLowerCase() : "";
  }

  return NextResponse.json({
    city,
    country,
  });
}