import { NextResponse } from "next/server"
import { geopoliticalAPI } from "@/lib/api-clients"

export async function GET() {
  try {
    const data = await geopoliticalAPI.getGeopoliticalEvents()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch geopolitical data" }, { status: 500 })
  }
}
