"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const cargoVolumeData = [
  { time: "00:00", volume: 12400, capacity: 15000, efficiency: 82.7 },
  { time: "04:00", volume: 13200, capacity: 15000, efficiency: 88.0 },
  { time: "08:00", volume: 14800, capacity: 15000, efficiency: 98.7 },
  { time: "12:00", volume: 15420, capacity: 15000, efficiency: 102.8 },
  { time: "16:00", volume: 14200, capacity: 15000, efficiency: 94.7 },
  { time: "20:00", volume: 13600, capacity: 15000, efficiency: 90.7 },
]

const disruptionTrendData = [
  { date: "Mon", weather: 2, geopolitical: 1, operational: 3, total: 6 },
  { date: "Tue", weather: 4, geopolitical: 2, operational: 2, total: 8 },
  { date: "Wed", weather: 1, geopolitical: 3, operational: 4, total: 8 },
  { date: "Thu", weather: 3, geopolitical: 1, operational: 2, total: 6 },
  { date: "Fri", weather: 5, geopolitical: 2, operational: 1, total: 8 },
  { date: "Sat", weather: 2, geopolitical: 0, operational: 3, total: 5 },
  { date: "Sun", weather: 3, geopolitical: 1, operational: 2, total: 6 },
]

const routePerformanceData = [
  { name: "Asia-Pacific", operational: 85, disrupted: 15, value: 85 },
  { name: "Europe", operational: 92, disrupted: 8, value: 92 },
  { name: "Americas", operational: 78, disrupted: 22, value: 78 },
  { name: "Middle East", operational: 88, disrupted: 12, value: 88 },
]

const COLORS = {
  primary: "hsl(var(--chart-1))",
  secondary: "hsl(var(--chart-2))",
  accent: "hsl(var(--accent))",
  success: "hsl(var(--chart-3))",
  warning: "hsl(var(--chart-4))",
  danger: "hsl(var(--destructive))",
}

export function CargoAnalyticsChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">Cargo Analytics</CardTitle>
          <Badge variant="outline" className="text-xs">
            Real-time
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="volume" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="volume">Volume Trends</TabsTrigger>
            <TabsTrigger value="disruptions">Disruptions</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
          </TabsList>

          <TabsContent value="volume" className="mt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cargoVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--popover-foreground))",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="capacity"
                    stackId="1"
                    stroke={COLORS.secondary}
                    fill={COLORS.secondary}
                    fillOpacity={0.2}
                    name="Capacity"
                  />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stackId="2"
                    stroke={COLORS.primary}
                    fill={COLORS.primary}
                    fillOpacity={0.6}
                    name="Current Volume"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="disruptions" className="mt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={disruptionTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--popover-foreground))",
                    }}
                  />
                  <Bar dataKey="weather" stackId="a" fill={COLORS.primary} name="Weather" />
                  <Bar dataKey="geopolitical" stackId="a" fill={COLORS.warning} name="Geopolitical" />
                  <Bar dataKey="operational" stackId="a" fill={COLORS.accent} name="Operational" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="mt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={routePerformanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {routePerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % Object.values(COLORS).length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--popover-foreground))",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {routePerformanceData.map((region, index) => (
                <div key={region.name} className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: Object.values(COLORS)[index % Object.values(COLORS).length] }}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{region.name}</div>
                    <div className="text-xs text-muted-foreground">{region.operational}% operational</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="efficiency" className="mt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cargoVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[70, 110]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--popover-foreground))",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="efficiency"
                    stroke={COLORS.success}
                    strokeWidth={3}
                    dot={{ fill: COLORS.success, strokeWidth: 2, r: 4 }}
                    name="Efficiency %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
