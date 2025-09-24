import { NextResponse } from "next/server"
import { flightAPI } from "@/lib/api-clients"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const route = searchParams.get("route")

  try {
    if (route) {
      const data = await flightAPI.getFlightData(route)
      return NextResponse.json(data)
    } else {
      const data = await flightAPI.getGlobalFlightStatus()
      return NextResponse.json(data)
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch flight data" }, { status: 500 })
  }
}
