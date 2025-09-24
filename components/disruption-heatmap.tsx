"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface HeatmapData {
  route: string
  hour: number
  severity: number
  type: "weather" | "geopolitical" | "operational"
  description: string
}

const heatmapData: HeatmapData[] = [
  { route: "HKG-LAX", hour: 0, severity: 0, type: "weather", description: "Clear" },
  { route: "HKG-LAX", hour: 6, severity: 2, type: "weather", description: "Light turbulence" },
  { route: "HKG-LAX", hour: 12, severity: 4, type: "weather", description: "Severe weather" },
  { route: "HKG-LAX", hour: 18, severity: 3, type: "weather", description: "Storm system" },
  { route: "HKG-FRA", hour: 0, severity: 1, type: "operational", description: "Minor delay" },
  { route: "HKG-FRA", hour: 6, severity: 0, type: "operational", description: "Normal" },
  { route: "HKG-FRA", hour: 12, severity: 3, type: "geopolitical", description: "Airspace restriction" },
  { route: "HKG-FRA", hour: 18, severity: 2, type: "geopolitical", description: "Route deviation" },
  { route: "HKG-LHR", hour: 0, severity: 0, type: "operational", description: "Normal" },
  { route: "HKG-LHR", hour: 6, severity: 1, type: "weather", description: "Light fog" },
  { route: "HKG-LHR", hour: 12, severity: 0, type: "operational", description: "Normal" },
  { route: "HKG-LHR", hour: 18, severity: 2, type: "operational", description: "Ground delay" },
]

const routes = ["HKG-LAX", "HKG-FRA", "HKG-LHR", "HKG-NRT", "HKG-SIN"]
const hours = [0, 6, 12, 18]

export function DisruptionHeatmap() {
  const getSeverityColor = (severity: number) => {
    if (severity === 0) return "bg-chart-3/20 border-chart-3/30"
    if (severity === 1) return "bg-accent/30 border-accent/40"
    if (severity === 2) return "bg-accent/50 border-accent/60"
    if (severity === 3) return "bg-destructive/40 border-destructive/50"
    if (severity >= 4) return "bg-destructive/60 border-destructive/70"
    return "bg-muted border-border"
  }

  const getSeverityLabel = (severity: number) => {
    if (severity === 0) return "Normal"
    if (severity === 1) return "Low"
    if (severity === 2) return "Medium"
    if (severity === 3) return "High"
    if (severity >= 4) return "Critical"
    return "Unknown"
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">Disruption Forecast</CardTitle>
          <Badge variant="outline" className="text-xs">
            24h Prediction
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="heatmap" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="heatmap">Risk Heatmap</TabsTrigger>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          </TabsList>

          <TabsContent value="heatmap" className="mt-6">
            <div className="space-y-4">
              <div className="grid grid-cols-5 gap-2 text-xs text-muted-foreground">
                <div></div>
                {hours.map((hour) => (
                  <div key={hour} className="text-center font-medium">
                    {hour.toString().padStart(2, "0")}:00
                  </div>
                ))}
              </div>

              {routes.map((route) => (
                <div key={route} className="grid grid-cols-5 gap-2 items-center">
                  <div className="text-sm font-medium text-foreground pr-2">{route}</div>
                  {hours.map((hour) => {
                    const data = heatmapData.find((d) => d.route === route && d.hour === hour)
                    const severity = data?.severity || Math.floor(Math.random() * 5)
                    return (
                      <div
                        key={`${route}-${hour}`}
                        className={`h-12 rounded border-2 flex items-center justify-center cursor-pointer transition-all hover:scale-105 ${getSeverityColor(severity)}`}
                        title={`${route} at ${hour}:00 - ${getSeverityLabel(severity)} risk`}
                      >
                        <span className="text-xs font-medium text-foreground">{severity}</span>
                      </div>
                    )
                  })}
                </div>
              ))}

              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-chart-3/20 border-2 border-chart-3/30"></div>
                  <span className="text-xs text-muted-foreground">Normal (0)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-accent/30 border-2 border-accent/40"></div>
                  <span className="text-xs text-muted-foreground">Low (1)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-accent/50 border-2 border-accent/60"></div>
                  <span className="text-xs text-muted-foreground">Medium (2-3)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded bg-destructive/60 border-2 border-destructive/70"></div>
                  <span className="text-xs text-muted-foreground">Critical (4+)</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            <div className="space-y-4">
              {heatmapData
                .filter((d) => d.severity > 0)
                .sort((a, b) => b.severity - a.severity)
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30 border border-border"
                  >
                    <div className="flex-shrink-0">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          item.severity >= 4
                            ? "bg-destructive/20 text-destructive border-destructive/30"
                            : item.severity >= 2
                              ? "bg-accent/20 text-accent border-accent/30"
                              : "bg-chart-3/20 text-chart-3 border-chart-3/30"
                        }`}
                      >
                        {getSeverityLabel(item.severity)}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">{item.route}</span>
                        <span className="text-sm text-muted-foreground">
                          at {item.hour.toString().padStart(2, "0")}:00
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <div className="text-xs text-muted-foreground capitalize">{item.type}</div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
