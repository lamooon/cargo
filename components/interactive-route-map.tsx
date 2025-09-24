"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Plane, AlertTriangle, CheckCircle, Clock, Navigation } from "lucide-react"

interface RouteData {
  id: string
  origin: string
  destination: string
  status: "operational" | "disrupted" | "delayed" | "alternative"
  cargo: number
  duration: string
  distance: string
  coordinates: { lat: number; lng: number }[]
  disruption?: {
    type: "weather" | "geopolitical" | "operational"
    severity: "low" | "medium" | "high"
    description: string
  }
}

const routeData: RouteData[] = [
  {
    id: "HKG-LAX",
    origin: "Hong Kong (HKG)",
    destination: "Los Angeles (LAX)",
    status: "disrupted",
    cargo: 2400,
    duration: "14h 30m",
    distance: "11,639 km",
    coordinates: [
      { lat: 22.3193, lng: 114.1694 },
      { lat: 34.0522, lng: -118.2437 },
    ],
    disruption: {
      type: "weather",
      severity: "high",
      description: "Typhoon approaching Pacific route",
    },
  },
  {
    id: "HKG-FRA",
    origin: "Hong Kong (HKG)",
    destination: "Frankfurt (FRA)",
    status: "delayed",
    cargo: 1800,
    duration: "12h 45m",
    distance: "9,162 km",
    coordinates: [
      { lat: 22.3193, lng: 114.1694 },
      { lat: 50.1109, lng: 8.6821 },
    ],
    disruption: {
      type: "geopolitical",
      severity: "medium",
      description: "Airspace restrictions over Eastern Europe",
    },
  },
  {
    id: "HKG-LHR",
    origin: "Hong Kong (HKG)",
    destination: "London Heathrow (LHR)",
    status: "operational",
    cargo: 1200,
    duration: "13h 15m",
    distance: "9,648 km",
    coordinates: [
      { lat: 22.3193, lng: 114.1694 },
      { lat: 51.47, lng: -0.4543 },
    ],
  },
  {
    id: "HKG-NRT",
    origin: "Hong Kong (HKG)",
    destination: "Tokyo Narita (NRT)",
    status: "operational",
    cargo: 980,
    duration: "3h 45m",
    distance: "2,884 km",
    coordinates: [
      { lat: 22.3193, lng: 114.1694 },
      { lat: 35.7647, lng: 140.3864 },
    ],
  },
  {
    id: "HKG-LAX-ALT",
    origin: "Hong Kong (HKG)",
    destination: "Los Angeles (LAX)",
    status: "alternative",
    cargo: 2400,
    duration: "16h 20m",
    distance: "13,200 km",
    coordinates: [
      { lat: 22.3193, lng: 114.1694 },
      { lat: 35.7647, lng: 140.3864 }, // via NRT
      { lat: 34.0522, lng: -118.2437 },
    ],
  },
]

export function InteractiveRouteMap() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"all" | "disrupted" | "operational">("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-chart-3"
      case "disrupted":
        return "text-destructive"
      case "delayed":
        return "text-accent"
      case "alternative":
        return "text-chart-1"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return CheckCircle
      case "disrupted":
        return AlertTriangle
      case "delayed":
        return Clock
      case "alternative":
        return Navigation
      default:
        return Plane
    }
  }

  const filteredRoutes = routeData.filter((route) => {
    if (viewMode === "all") return true
    if (viewMode === "disrupted") return route.status === "disrupted" || route.status === "delayed"
    if (viewMode === "operational") return route.status === "operational"
    return true
  })

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">Global Route Network</CardTitle>
          <div className="flex items-center space-x-3">
            <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Routes</SelectItem>
                <SelectItem value="disrupted">Disrupted Only</SelectItem>
                <SelectItem value="operational">Operational Only</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline" className="text-xs">
              {filteredRoutes.length} Routes
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="map">Interactive Map</TabsTrigger>
            <TabsTrigger value="routes">Route List</TabsTrigger>
            <TabsTrigger value="alternatives">Alternatives</TabsTrigger>
          </TabsList>

          <TabsContent value="map" className="mt-6">
            <div className="relative h-96 bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg border border-border overflow-hidden">
              {/* Simulated world map with interactive route visualization */}
              <div className="absolute inset-0">
                {/* World map background */}
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 1000 500" className="w-full h-full">
                    {/* Simplified world map paths */}
                    <path
                      d="M150,200 Q200,180 250,200 L300,220 Q350,200 400,210 L450,200"
                      stroke="hsl(var(--border))"
                      strokeWidth="2"
                      fill="none"
                    />
                    <path
                      d="M500,150 Q550,130 600,150 L650,170 Q700,150 750,160 L800,150"
                      stroke="hsl(var(--border))"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>

                {/* Route visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Hong Kong hub */}
                    <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                      </div>
                      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-foreground whitespace-nowrap">
                        Hong Kong (HKG)
                      </div>
                    </div>

                    {/* Destination airports */}
                    {[
                      { name: "LAX", position: "top-1/3 right-1/4", status: "disrupted" },
                      { name: "FRA", position: "top-1/4 right-1/3", status: "delayed" },
                      { name: "LHR", position: "top-1/5 right-1/3", status: "operational" },
                      { name: "NRT", position: "top-1/3 left-1/3", status: "operational" },
                    ].map((airport) => (
                      <div
                        key={airport.name}
                        className={`absolute ${airport.position} transform -translate-x-1/2 -translate-y-1/2`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            airport.status === "operational"
                              ? "bg-chart-3 border-chart-3"
                              : airport.status === "delayed"
                                ? "bg-accent border-accent"
                                : "bg-destructive border-destructive"
                          }`}
                        ></div>
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                          {airport.name}
                        </div>
                      </div>
                    ))}

                    {/* Route lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--chart-1))" />
                        </marker>
                      </defs>
                      {/* Operational routes */}
                      <path
                        d="M250,250 Q400,200 600,150"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="5,5"
                        markerEnd="url(#arrowhead)"
                      />
                      {/* Disrupted routes */}
                      <path
                        d="M250,250 Q500,100 750,170"
                        stroke="hsl(var(--destructive))"
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="10,5"
                        opacity="0.7"
                      />
                      {/* Alternative routes */}
                      <path
                        d="M250,250 Q350,200 450,180 Q600,160 750,170"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="3,3"
                        markerEnd="url(#arrowhead)"
                      />
                    </svg>
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-1 bg-chart-3 rounded"></div>
                      <span className="text-muted-foreground">Operational</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-1 bg-destructive rounded"></div>
                      <span className="text-muted-foreground">Disrupted</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-1 bg-chart-1 rounded"></div>
                      <span className="text-muted-foreground">Alternative</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="routes" className="mt-6">
            <div className="space-y-4">
              {filteredRoutes.map((route) => {
                const StatusIcon = getStatusIcon(route.status)
                return (
                  <div
                    key={route.id}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedRoute === route.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-muted/30 hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <StatusIcon className={`w-5 h-5 ${getStatusColor(route.status)}`} />
                        <div>
                          <h4 className="font-medium text-foreground">
                            {route.origin} → {route.destination}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span>{route.cargo}t cargo</span>
                            <span>{route.duration}</span>
                            <span>{route.distance}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          route.status === "operational"
                            ? "bg-chart-3/20 text-chart-3 border-chart-3/30"
                            : route.status === "disrupted"
                              ? "bg-destructive/20 text-destructive border-destructive/30"
                              : route.status === "delayed"
                                ? "bg-accent/20 text-accent border-accent/30"
                                : "bg-chart-1/20 text-chart-1 border-chart-1/30"
                        }`}
                      >
                        {route.status.toUpperCase()}
                      </Badge>
                    </div>

                    {route.disruption && selectedRoute === route.id && (
                      <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
                        <div className="flex items-center space-x-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium text-foreground">Disruption Details</span>
                          <Badge variant="outline" className="text-xs">
                            {route.disruption.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{route.disruption.description}</p>
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" variant="outline">
                            View Alternatives
                          </Button>
                          <Button size="sm">Implement Recommendation</Button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="alternatives" className="mt-6">
            <div className="space-y-4">
              {routeData
                .filter((route) => route.status === "alternative")
                .map((route) => (
                  <div key={route.id} className="p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Navigation className="w-5 h-5 text-chart-1" />
                        <div>
                          <h4 className="font-medium text-foreground">Alternative Route</h4>
                          <p className="text-sm text-muted-foreground">
                            {route.origin} → {route.destination}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs bg-chart-1/20 text-chart-1 border-chart-1/30">
                        RECOMMENDED
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Duration:</span>
                        <div className="font-medium text-foreground">{route.duration}</div>
                        <div className="text-xs text-accent">+1h 50m vs direct</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Distance:</span>
                        <div className="font-medium text-foreground">{route.distance}</div>
                        <div className="text-xs text-accent">+1,561 km vs direct</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cost Impact:</span>
                        <div className="font-medium text-chart-3">-$180K saved</div>
                        <div className="text-xs text-chart-3">vs disruption cost</div>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button size="sm">Activate Route</Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
