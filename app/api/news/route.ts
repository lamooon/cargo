import { NextResponse } from "next/server"
import { newsAPI } from "@/lib/api-clients"

export async function GET() {
  try {
    const data = await newsAPI.getRelevantNews()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news data" }, { status: 500 })
  }
}
