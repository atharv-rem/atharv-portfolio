import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  const ip =
    forwardedFor?.split(",")[0].trim() ||
    realIp ||
    "";

  if (!ip) {
    return NextResponse.json({
      city: null,
      flag: null,
    });
  }

  try {
    const res = await fetch(`https://ipwho.is/${ip}`, {
      cache: "no-store",
    });

    const data = await res.json();

    return NextResponse.json({
      city: data?.city ?? null,
      flag: data?.flag?.img ?? null,
    });
  } catch {
    return NextResponse.json(
      {
        city: null,
        flag: null,
      },
      { status: 500 }
    );
  }
}