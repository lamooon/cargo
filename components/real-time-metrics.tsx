"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

interface MetricData {
  label: string
  value: number
  target: number
  unit: string
  trend: "up" | "down" | "stable"
  status: "good" | "warning" | "critical"
}

export function RealTimeMetrics() {
  const [metrics, setMetrics] = useState<MetricData[]>([
    { label: "Cargo Throughput", value: 15420, target: 15000, unit: "tonnes", trend: "up", status: "good" },
    { label: "On-Time Performance", value: 87.5, target: 90, unit: "%", trend: "down", status: "warning" },
    { label: "Route Utilization", value: 94.2, target: 95, unit: "%", trend: "up", status: "good" },
    { label: "Cost Efficiency", value: 78.3, target: 85, unit: "%", trend: "stable", status: "warning" },
    { label: "Customer Satisfaction", value: 92.1, target: 90, unit: "%", trend: "up", status: "good" },
    { label: "Fuel Efficiency", value: 88.7, target: 90, unit: "%", trend: "up", status: "warning" },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: metric.value + (Math.random() - 0.5) * 2,
          trend: Math.random() > 0.5 ? "up" : Math.random() > 0.5 ? "down" : "stable",
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-chart-3"
      case "warning":
        return "text-accent"
      case "critical":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "↗"
      case "down":
        return "↘"
      case "stable":
        return "→"
      default:
        return "→"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">Real-Time KPIs</CardTitle>
          <Badge variant="outline" className="text-xs animate-pulse">
            Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{metric.label}</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${getStatusColor(metric.status)}`}>{getTrendIcon(metric.trend)}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      metric.status === "good"
                        ? "bg-chart-3/20 text-chart-3 border-chart-3/30"
                        : metric.status === "warning"
                          ? "bg-accent/20 text-accent border-accent/30"
                          : "bg-destructive/20 text-destructive border-destructive/30"
                    }`}
                  >
                    {metric.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-foreground">{metric.value.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">{metric.unit}</span>
                <span className="text-xs text-muted-foreground">
                  / {metric.target}
                  {metric.unit}
                </span>
              </div>

              <Progress value={(metric.value / metric.target) * 100} className="h-2" />

              <div className="text-xs text-muted-foreground">
                Target: {metric.target}
                {metric.unit} •{metric.value > metric.target ? " Above" : " Below"} target by{" "}
                {Math.abs(metric.value - metric.target).toFixed(1)}
                {metric.unit}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
