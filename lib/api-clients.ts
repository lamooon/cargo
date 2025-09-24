// API client configurations for external data sources
export interface WeatherData {
  location: string
  condition: string
  severity: number
  visibility: number
  windSpeed: number
  temperature: number
  forecast: {
    time: string
    condition: string
    severity: number
  }[]
}

export interface FlightData {
  flightNumber: string
  route: string
  status: "on-time" | "delayed" | "cancelled" | "diverted"
  delay: number
  departure: string
  arrival: string
  aircraft: string
  cargo: number
}

export interface GeopoliticalEvent {
  id: string
  type: "airspace_closure" | "sanctions" | "conflict" | "diplomatic"
  region: string
  severity: "low" | "medium" | "high" | "critical"
  description: string
  affectedRoutes: string[]
  startTime: string
  estimatedDuration: number
}

export interface NewsEvent {
  id: string
  title: string
  description: string
  source: string
  timestamp: string
  relevanceScore: number
  category: "weather" | "geopolitical" | "operational" | "economic"
  affectedRegions: string[]
}

// Simulated API clients (in production, these would connect to real APIs)
export class WeatherAPIClient {
  private baseUrl = "https://api.aviationweather.gov"

  async getWeatherData(location: string): Promise<WeatherData> {
    // Simulate API call with mock data
    await new Promise((resolve) => setTimeout(resolve, 500))

    const conditions = ["Clear", "Cloudy", "Rain", "Storm", "Fog", "Snow", "Turbulence"]
    const condition = conditions[Math.floor(Math.random() * conditions.length)]
    const severity = condition === "Storm" ? Math.floor(Math.random() * 5) + 6 : Math.floor(Math.random() * 5) + 1

    return {
      location,
      condition,
      severity,
      visibility: Math.random() * 10,
      windSpeed: Math.random() * 50,
      temperature: Math.random() * 40 - 10,
      forecast: Array.from({ length: 24 }, (_, i) => ({
        time: new Date(Date.now() + i * 3600000).toISOString(),
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        severity: Math.floor(Math.random() * 10) + 1,
      })),
    }
  }

  async getGlobalWeatherAlerts(): Promise<WeatherData[]> {
    const locations = ["HKG", "LAX", "FRA", "LHR", "NRT", "SIN", "CDG", "AMS"]
    return Promise.all(locations.map((loc) => this.getWeatherData(loc)))
  }
}

export class FlightAPIClient {
  private baseUrl = "https://api.flightaware.com"

  async getFlightData(route: string): Promise<FlightData[]> {
    // Simulate API call with mock data
    await new Promise((resolve) => setTimeout(resolve, 300))

    const statuses: FlightData["status"][] = ["on-time", "delayed", "cancelled", "diverted"]
    const aircraft = ["B747-8F", "B777F", "A330-200F", "MD-11F", "B767-300F"]

    return Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, i) => ({
      flightNumber: `CX${(Math.floor(Math.random() * 900) + 100).toString()}`,
      route,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      delay: Math.floor(Math.random() * 180),
      departure: new Date(Date.now() + Math.random() * 86400000).toISOString(),
      arrival: new Date(Date.now() + Math.random() * 86400000 + 3600000).toISOString(),
      aircraft: aircraft[Math.floor(Math.random() * aircraft.length)],
      cargo: Math.floor(Math.random() * 100) + 50,
    }))
  }

  async getGlobalFlightStatus(): Promise<FlightData[]> {
    const routes = ["HKG-LAX", "HKG-FRA", "HKG-LHR", "HKG-NRT", "HKG-SIN"]
    const allFlights = await Promise.all(routes.map((route) => this.getFlightData(route)))
    return allFlights.flat()
  }
}

export class GeopoliticalAPIClient {
  private baseUrl = "https://api.gdacs.org"

  async getGeopoliticalEvents(): Promise<GeopoliticalEvent[]> {
    // Simulate API call with mock data
    await new Promise((resolve) => setTimeout(resolve, 400))

    const events: GeopoliticalEvent[] = [
      {
        id: "geo-001",
        type: "airspace_closure",
        region: "Eastern Europe",
        severity: "high",
        description: "Temporary airspace restrictions due to military exercises",
        affectedRoutes: ["HKG-FRA", "HKG-AMS", "HKG-CDG"],
        startTime: new Date().toISOString(),
        estimatedDuration: 72,
      },
      {
        id: "geo-002",
        type: "diplomatic",
        region: "Middle East",
        severity: "medium",
        description: "Diplomatic tensions affecting overflight permissions",
        affectedRoutes: ["HKG-LHR", "HKG-FRA"],
        startTime: new Date(Date.now() - 86400000).toISOString(),
        estimatedDuration: 168,
      },
    ]

    return events
  }
}

export class NewsAPIClient {
  private baseUrl = "https://api.contextualweb.io"

  async getRelevantNews(): Promise<NewsEvent[]> {
    // Simulate API call with mock data
    await new Promise((resolve) => setTimeout(resolve, 600))

    const newsEvents: NewsEvent[] = [
      {
        id: "news-001",
        title: "Pacific Storm System Intensifying",
        description: "Meteorologists track powerful storm system moving across Pacific shipping lanes",
        source: "Aviation Weather Service",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        relevanceScore: 0.95,
        category: "weather",
        affectedRegions: ["Pacific", "North America", "Asia"],
      },
      {
        id: "news-002",
        title: "European Airspace Coordination Meeting",
        description: "EU aviation authorities discuss new routing protocols amid ongoing tensions",
        source: "Aviation Daily",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        relevanceScore: 0.87,
        category: "geopolitical",
        affectedRegions: ["Europe"],
      },
      {
        id: "news-003",
        title: "Ground Crew Negotiations Continue",
        description: "Labor talks ongoing at major UK airports affecting cargo operations",
        source: "Cargo News",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        relevanceScore: 0.78,
        category: "operational",
        affectedRegions: ["United Kingdom"],
      },
    ]

    return newsEvents
  }
}

// API client instances
export const weatherAPI = new WeatherAPIClient()
export const flightAPI = new FlightAPIClient()
export const geopoliticalAPI = new GeopoliticalAPIClient()
export const newsAPI = new NewsAPIClient()
