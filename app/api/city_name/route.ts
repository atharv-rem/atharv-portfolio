import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const res = await fetch("https://ipwho.is/", { cache: "no-store" });
  const data = await res.json();
  
  return NextResponse.json({
    city: data?.city,
    flag: data?.flag?.img,
  });
}