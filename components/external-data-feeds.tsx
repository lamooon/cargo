"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { RefreshCw, Cloud, Plane, Globe, Newspaper } from "lucide-react"
import {
  weatherAPI,
  flightAPI,
  geopoliticalAPI,
  newsAPI,
  type WeatherData,
  type FlightData,
  type GeopoliticalEvent,
  type NewsEvent,
} from "@/lib/api-clients"

export function ExternalDataFeeds() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [flightData, setFlightData] = useState<FlightData[]>([])
  const [geopoliticalEvents, setGeopoliticalEvents] = useState<GeopoliticalEvent[]>([])
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([])
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchAllData = async () => {
    setLoading(true)
    try {
      const [weather, flights, geopolitical, news] = await Promise.all([
        weatherAPI.getGlobalWeatherAlerts(),
        flightAPI.getGlobalFlightStatus(),
        geopoliticalAPI.getGeopoliticalEvents(),
        newsAPI.getRelevantNews(),
      ])

      setWeatherData(weather)
      setFlightData(flights)
      setGeopoliticalEvents(geopolitical)
      setNewsEvents(news)
      setLastUpdate(new Date())
    } catch (error) {
      console.error("Failed to fetch external data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllData()
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchAllData, 300000)
    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: number | string) => {
    if (typeof severity === "number") {
      if (severity >= 8) return "text-destructive"
      if (severity >= 5) return "text-accent"
      return "text-chart-3"
    }

    switch (severity) {
      case "critical":
        return "text-destructive"
      case "high":
        return "text-destructive"
      case "medium":
        return "text-accent"
      case "low":
        return "text-chart-3"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-time":
        return "text-chart-3"
      case "delayed":
        return "text-accent"
      case "cancelled":
      case "diverted":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">External Data Feeds</CardTitle>
          <div className="flex items-center space-x-3">
            {lastUpdate && (
              <span className="text-xs text-muted-foreground">Last updated: {lastUpdate.toLocaleTimeString()}</span>
            )}
            <Button onClick={fetchAllData} disabled={loading} variant="outline" size="sm">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weather" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="flights">Flights</TabsTrigger>
            <TabsTrigger value="geopolitical">Geopolitical</TabsTrigger>
            <TabsTrigger value="news">News Feed</TabsTrigger>
          </TabsList>

          <TabsContent value="weather" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">Global Weather Conditions</h4>
                <Badge variant="outline" className="text-xs">
                  {weatherData.length} Locations
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {weatherData.map((weather, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Cloud className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{weather.location}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          weather.severity >= 8
                            ? "bg-destructive/20 text-destructive border-destructive/30"
                            : weather.severity >= 5
                              ? "bg-accent/20 text-accent border-accent/30"
                              : "bg-chart-3/20 text-chart-3 border-chart-3/30"
                        }`}
                      >
                        {weather.condition}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div>Visibility: {weather.visibility.toFixed(1)}km</div>
                      <div>Wind: {weather.windSpeed.toFixed(0)}kt</div>
                      <div>Temp: {weather.temperature.toFixed(0)}°C</div>
                      <div className={`font-medium ${getSeverityColor(weather.severity)}`}>
                        Severity: {weather.severity}/10
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="flights" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">Flight Status Updates</h4>
                <Badge variant="outline" className="text-xs">
                  {flightData.length} Flights
                </Badge>
              </div>

              <div className="space-y-3">
                {flightData.slice(0, 8).map((flight, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
                  >
                    <div className="flex items-center space-x-3">
                      <Plane className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">{flight.flightNumber}</div>
                        <div className="text-sm text-muted-foreground">
                          {flight.route} • {flight.aircraft}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className={`text-xs mb-1 ${
                          flight.status === "on-time"
                            ? "bg-chart-3/20 text-chart-3 border-chart-3/30"
                            : flight.status === "delayed"
                              ? "bg-accent/20 text-accent border-accent/30"
                              : "bg-destructive/20 text-destructive border-destructive/30"
                        }`}
                      >
                        {flight.status.toUpperCase()}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {flight.cargo}t cargo
                        {flight.delay > 0 && ` • +${flight.delay}min`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="geopolitical" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">Geopolitical Events</h4>
                <Badge variant="outline" className="text-xs">
                  {geopoliticalEvents.length} Active
                </Badge>
              </div>

              <div className="space-y-4">
                {geopoliticalEvents.map((event) => (
                  <div key={event.id} className="p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{event.region}</span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            event.severity === "critical" || event.severity === "high"
                              ? "bg-destructive/20 text-destructive border-destructive/30"
                              : event.severity === "medium"
                                ? "bg-accent/20 text-accent border-accent/30"
                                : "bg-chart-3/20 text-chart-3 border-chart-3/30"
                          }`}
                        >
                          {event.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground capitalize">{event.type.replace("_", " ")}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Affected routes: {event.affectedRoutes.join(", ")}</span>
                      <span className="text-muted-foreground">Duration: {event.estimatedDuration}h</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="news" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">Relevant News & Alerts</h4>
                <Badge variant="outline" className="text-xs">
                  {newsEvents.length} Articles
                </Badge>
              </div>

              <div className="space-y-4">
                {newsEvents.map((news) => (
                  <div key={news.id} className="p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Newspaper className="w-4 h-4 text-muted-foreground" />
                        <Badge variant="outline" className="text-xs capitalize">
                          {news.category}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-xs text-muted-foreground">
                            {(news.relevanceScore * 100).toFixed(0)}% relevant
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(news.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <h5 className="font-medium text-foreground mb-1">{news.title}</h5>
                    <p className="text-sm text-muted-foreground mb-2">{news.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Source: {news.source}</span>
                      <span className="text-muted-foreground">Regions: {news.affectedRegions.join(", ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
