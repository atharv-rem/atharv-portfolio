import { NextResponse } from "next/server";
import { getLatestCommit } from "@/lib/get-latest-commit";

export async function GET() {
  const commitData = await getLatestCommit();
  return NextResponse.json(commitData);
}
