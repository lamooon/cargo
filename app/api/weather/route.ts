import { NextResponse } from "next/server"
import { weatherAPI } from "@/lib/api-clients"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get("location")

  try {
    if (location) {
      const data = await weatherAPI.getWeatherData(location)
      return NextResponse.json(data)
    } else {
      const data = await weatherAPI.getGlobalWeatherAlerts()
      return NextResponse.json(data)
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}
