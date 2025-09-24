"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface SimulationScenario {
  id: string
  name: string
  type: "weather" | "geopolitical" | "operational" | "combined"
  severity: number
  duration: number
  affectedRoutes: string[]
  description: string
}

interface SimulationResult {
  time: number
  cargoVolume: number
  revenue: number
  delays: number
  costs: number
  efficiency: number
}

const predefinedScenarios: SimulationScenario[] = [
  {
    id: "typhoon-pacific",
    name: "Pacific Typhoon",
    type: "weather",
    severity: 8,
    duration: 72,
    affectedRoutes: ["HKG-LAX", "HKG-SEA", "HKG-SFO"],
    description: "Category 4 typhoon affecting Pacific routes for 3 days",
  },
  {
    id: "airspace-closure",
    name: "Eastern Europe Airspace Closure",
    type: "geopolitical",
    severity: 6,
    duration: 168,
    affectedRoutes: ["HKG-FRA", "HKG-AMS", "HKG-CDG"],
    description: "Geopolitical tensions causing airspace restrictions",
  },
  {
    id: "ground-strike",
    name: "Ground Crew Strike",
    type: "operational",
    severity: 4,
    duration: 48,
    affectedRoutes: ["HKG-LHR", "HKG-MAN"],
    description: "Labor dispute affecting UK operations",
  },
  {
    id: "multi-crisis",
    name: "Multi-Factor Crisis",
    type: "combined",
    severity: 9,
    duration: 120,
    affectedRoutes: ["HKG-LAX", "HKG-FRA", "HKG-LHR", "HKG-NRT"],
    description: "Combined weather, geopolitical, and operational disruptions",
  },
]

export function DisruptionSimulator() {
  const [selectedScenario, setSelectedScenario] = useState<string>("typhoon-pacific")
  const [customSeverity, setCustomSeverity] = useState([7])
  const [customDuration, setCustomDuration] = useState([48])
  const [isRunning, setIsRunning] = useState(false)
  const [simulationData, setSimulationData] = useState<SimulationResult[]>([])
  const [currentTime, setCurrentTime] = useState(0)
  const [useRealTimeData, setUseRealTimeData] = useState(true)

  const scenario = predefinedScenarios.find((s) => s.id === selectedScenario) || predefinedScenarios[0]

  // Generate simulation data based on scenario
  const generateSimulationData = (scenario: SimulationScenario, severity: number, duration: number) => {
    const data: SimulationResult[] = []
    const baseVolume = 15420
    const baseRevenue = 2100000
    const baseEfficiency = 94

    for (let i = 0; i <= duration; i += 6) {
      const impactFactor = Math.sin((i / duration) * Math.PI) * (severity / 10)
      const randomVariation = (Math.random() - 0.5) * 0.1

      data.push({
        time: i,
        cargoVolume: Math.max(0, baseVolume * (1 - impactFactor * 0.4 + randomVariation)),
        revenue: Math.max(0, baseRevenue * (1 - impactFactor * 0.6 + randomVariation)),
        delays: Math.max(0, impactFactor * 50 + randomVariation * 10),
        costs: baseRevenue * 0.1 * (1 + impactFactor * 2 + Math.abs(randomVariation)),
        efficiency: Math.max(0, baseEfficiency * (1 - impactFactor * 0.5 + randomVariation)),
      })
    }

    return data
  }

  // Run simulation
  const runSimulation = () => {
    const data = generateSimulationData(scenario, customSeverity[0], customDuration[0])
    setSimulationData(data)
    setIsRunning(true)
    setCurrentTime(0)
  }

  // Reset simulation
  const resetSimulation = () => {
    setIsRunning(false)
    setCurrentTime(0)
    setSimulationData([])
  }

  // Auto-advance simulation
  useEffect(() => {
    if (isRunning && currentTime < customDuration[0]) {
      const timer = setTimeout(() => {
        setCurrentTime((prev) => Math.min(prev + 6, customDuration[0]))
      }, 500)
      return () => clearTimeout(timer)
    } else if (currentTime >= customDuration[0]) {
      setIsRunning(false)
    }
  }, [isRunning, currentTime, customDuration])

  const currentData = simulationData.slice(0, Math.floor(currentTime / 6) + 1)
  const latestData = currentData[currentData.length - 1]

  const getImpactColor = (value: number, baseline: number, inverse = false) => {
    const ratio = value / baseline
    if (inverse) {
      return ratio > 1.1 ? "text-chart-3" : ratio < 0.9 ? "text-destructive" : "text-accent"
    }
    return ratio < 0.9 ? "text-destructive" : ratio > 1.1 ? "text-chart-3" : "text-accent"
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">Disruption Simulation Engine</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={`text-xs ${isRunning ? "animate-pulse" : ""}`}>
              {isRunning ? "Running" : "Ready"}
            </Badge>
            {simulationData.length > 0 && (
              <Badge variant="outline" className="text-xs">
                {currentTime}h / {customDuration[0]}h
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="setup" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="setup">Scenario Setup</TabsTrigger>
            <TabsTrigger value="results">Impact Analysis</TabsTrigger>
            <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            <TabsTrigger value="recommendations">Mitigation</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-foreground">Scenario Type</Label>
                  <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {predefinedScenarios.map((scenario) => (
                        <SelectItem key={scenario.id} value={scenario.id}>
                          {scenario.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">{scenario.description}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground">Severity Level: {customSeverity[0]}/10</Label>
                  <Slider
                    value={customSeverity}
                    onValueChange={setCustomSeverity}
                    max={10}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Low Impact</span>
                    <span>Catastrophic</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-foreground">Duration: {customDuration[0]} hours</Label>
                  <Slider
                    value={customDuration}
                    onValueChange={setCustomDuration}
                    max={168}
                    min={6}
                    step={6}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>6 hours</span>
                    <span>1 week</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="real-time" checked={useRealTimeData} onCheckedChange={setUseRealTimeData} />
                  <Label htmlFor="real-time" className="text-sm">
                    Use real-time data inputs
                  </Label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-foreground">Affected Routes</Label>
                  <div className="mt-2 space-y-2">
                    {scenario.affectedRoutes.map((route) => (
                      <div
                        key={route}
                        className="flex items-center justify-between p-2 rounded bg-muted/30 border border-border"
                      >
                        <span className="text-sm text-foreground">{route}</span>
                        <Badge variant="outline" className="text-xs">
                          {scenario.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={runSimulation} disabled={isRunning} className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Run Simulation
                  </Button>
                  <Button
                    onClick={() => setIsRunning(!isRunning)}
                    variant="outline"
                    disabled={simulationData.length === 0}
                  >
                    {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button onClick={resetSimulation} variant="outline">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-6">
            {simulationData.length > 0 && latestData ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Cargo Volume",
                      value: `${latestData.cargoVolume.toFixed(0)}t`,
                      baseline: 15420,
                      current: latestData.cargoVolume,
                      icon: TrendingDown,
                    },
                    {
                      label: "Revenue Impact",
                      value: `$${(latestData.revenue / 1000000).toFixed(1)}M`,
                      baseline: 2.1,
                      current: latestData.revenue / 1000000,
                      icon: TrendingDown,
                    },
                    {
                      label: "Avg Delays",
                      value: `${latestData.delays.toFixed(1)}h`,
                      baseline: 0,
                      current: latestData.delays,
                      icon: AlertTriangle,
                      inverse: true,
                    },
                    {
                      label: "Efficiency",
                      value: `${latestData.efficiency.toFixed(1)}%`,
                      baseline: 94,
                      current: latestData.efficiency,
                      icon: TrendingUp,
                    },
                  ].map((metric, index) => {
                    const IconComponent = metric.icon
                    return (
                      <Card key={index} className="bg-muted/30 border-border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground">{metric.label}</span>
                            <IconComponent
                              className={`w-4 h-4 ${getImpactColor(metric.current, metric.baseline, metric.inverse)}`}
                            />
                          </div>
                          <div className="text-lg font-bold text-foreground">{metric.value}</div>
                          <div className="text-xs text-muted-foreground">
                            {metric.inverse
                              ? `+${(metric.current - metric.baseline).toFixed(1)} vs baseline`
                              : `${((metric.current / metric.baseline - 1) * 100).toFixed(1)}% vs baseline`}
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentData}>
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
                      <Line
                        type="monotone"
                        dataKey="cargoVolume"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2}
                        name="Cargo Volume"
                      />
                      <Line
                        type="monotone"
                        dataKey="efficiency"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={2}
                        name="Efficiency %"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Simulation Data</h3>
                <p className="text-muted-foreground">Run a simulation to see impact analysis</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            {simulationData.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentData}>
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
                      dataKey="revenue"
                      stackId="1"
                      stroke="hsl(var(--chart-3))"
                      fill="hsl(var(--chart-3))"
                      fillOpacity={0.6}
                      name="Revenue"
                    />
                    <Area
                      type="monotone"
                      dataKey="costs"
                      stackId="2"
                      stroke="hsl(var(--destructive))"
                      fill="hsl(var(--destructive))"
                      fillOpacity={0.6}
                      name="Additional Costs"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Timeline Data</h3>
                <p className="text-muted-foreground">Run a simulation to see timeline analysis</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6">
            <div className="space-y-4">
              {[
                {
                  title: "Immediate Response",
                  actions: ["Activate alternative routes", "Notify affected customers", "Deploy emergency resources"],
                  timeframe: "0-2 hours",
                  priority: "critical",
                },
                {
                  title: "Short-term Mitigation",
                  actions: [
                    "Reroute cargo via hub airports",
                    "Negotiate temporary capacity",
                    "Implement surge pricing",
                  ],
                  timeframe: "2-24 hours",
                  priority: "high",
                },
                {
                  title: "Long-term Recovery",
                  actions: ["Review route resilience", "Update contingency plans", "Strengthen partnerships"],
                  timeframe: "1-7 days",
                  priority: "medium",
                },
              ].map((phase, index) => (
                <Card key={index} className="bg-muted/30 border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-foreground">{phase.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            phase.priority === "critical"
                              ? "bg-destructive/20 text-destructive border-destructive/30"
                              : phase.priority === "high"
                                ? "bg-accent/20 text-accent border-accent/30"
                                : "bg-chart-3/20 text-chart-3 border-chart-3/30"
                          }`}
                        >
                          {phase.priority.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{phase.timeframe}</span>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {phase.actions.map((action, actionIndex) => (
                        <li key={actionIndex} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
