import { createTable } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await createTable();
  return NextResponse.json(result);
}
