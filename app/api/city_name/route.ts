import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const city = request.headers.get("x-vercel-ip-city");

  return NextResponse.json({
    city,
  });
}