"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useState, useEffect } from "react"
import {
  Brain,
  TrendingUp,
  DollarSign,
  Shield,
  Clock,
  Zap,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  BarChart3,
} from "lucide-react"
import { recommendationEngine, type Recommendation } from "@/lib/recommendation-engine"

export function AdvancedRecommendationSystem() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null)
  const [implementedRecommendations, setImplementedRecommendations] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)

  // Generate recommendations based on current context
  const generateRecommendations = async () => {
    setLoading(true)

    // Simulate data gathering from various sources
    const context = {
      weatherData: [
        { location: "HKG", condition: "Storm", severity: 8, visibility: 2.1, windSpeed: 45 },
        { location: "LAX", condition: "Clear", severity: 2, visibility: 10, windSpeed: 12 },
      ],
      flightData: [
        { route: "HKG-LAX", status: "delayed", delay: 120, cargo: 65 },
        { route: "HKG-FRA", status: "on-time", delay: 0, cargo: 78 },
        { route: "HKG-LHR", status: "on-time", delay: 0, cargo: 45 },
      ],
      geopoliticalEvents: [
        {
          id: "geo-001",
          severity: "high",
          region: "Eastern Europe",
          affectedRoutes: ["HKG-FRA"],
          estimatedDuration: 72,
          description: "Airspace restrictions",
        },
      ],
      routePerformance: [{ name: "HKG-LAX" }, { name: "HKG-FRA" }, { name: "HKG-LHR" }],
      cargoVolume: 15420,
      currentDisruptions: [],
    }

    const newRecommendations = recommendationEngine.generateRecommendations(context)
    setRecommendations(newRecommendations)
    setLoading(false)
  }

  useEffect(() => {
    generateRecommendations()
    // Auto-refresh every 10 minutes
    const interval = setInterval(generateRecommendations, 600000)
    return () => clearInterval(interval)
  }, [])

  const implementRecommendation = (id: string) => {
    setImplementedRecommendations((prev) => new Set([...prev, id]))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-destructive/20 text-destructive border-destructive/30"
      case "high":
        return "bg-accent/20 text-accent border-accent/30"
      case "medium":
        return "bg-chart-1/20 text-chart-1 border-chart-1/30"
      case "low":
        return "bg-chart-3/20 text-chart-3 border-chart-3/30"
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "route_optimization":
        return TrendingUp
      case "cost_reduction":
        return DollarSign
      case "risk_mitigation":
        return Shield
      case "capacity_optimization":
        return BarChart3
      case "schedule_adjustment":
        return Clock
      default:
        return Zap
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
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

  const totalPotentialSavings = recommendations.reduce((sum, rec) => sum + (rec.impact.costSaving || 0), 0)
  const averageConfidence =
    recommendations.length > 0
      ? recommendations.reduce((sum, rec) => sum + rec.confidence, 0) / recommendations.length
      : 0

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-primary" />
            <div>
              <CardTitle className="text-lg font-semibold text-foreground">AI Recommendation Engine</CardTitle>
              <p className="text-sm text-muted-foreground">Advanced analytics and optimization suggestions</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                ${(totalPotentialSavings / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-muted-foreground">Potential savings</div>
            </div>
            <Button onClick={generateRecommendations} disabled={loading} variant="outline" size="sm">
              <Brain className={`w-4 h-4 mr-2 ${loading ? "animate-pulse" : ""}`} />
              Analyze
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recommendations" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="recommendations">Active Recommendations</TabsTrigger>
            <TabsTrigger value="analytics">Impact Analytics</TabsTrigger>
            <TabsTrigger value="implementation">Implementation</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge variant="outline" className="text-xs">
                    {recommendations.length} Recommendations
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {(averageConfidence * 100).toFixed(0)}% Avg Confidence
                  </Badge>
                </div>
              </div>

              {recommendations.map((rec) => {
                const TypeIcon = getTypeIcon(rec.type)
                const isImplemented = implementedRecommendations.has(rec.id)
                const isSelected = selectedRecommendation === rec.id

                return (
                  <div
                    key={rec.id}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      isSelected ? "border-primary bg-primary/5" : "border-border bg-muted/30 hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedRecommendation(isSelected ? null : rec.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0">
                          {isImplemented ? (
                            <CheckCircle className="w-5 h-5 text-chart-3" />
                          ) : (
                            <TypeIcon className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-foreground">{rec.title}</h4>
                            <Badge variant="outline" className={`text-xs ${getPriorityColor(rec.priority)}`}>
                              {rec.priority.toUpperCase()}
                            </Badge>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                              <span className="text-xs text-muted-foreground">
                                {(rec.confidence * 100).toFixed(0)}% confidence
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>

                          <div className="flex items-center space-x-4 text-xs">
                            {rec.impact.costSaving && (
                              <span className="text-chart-3 font-medium">
                                ${(rec.impact.costSaving / 1000).toFixed(0)}K saved
                              </span>
                            )}
                            {rec.impact.timeReduction && (
                              <span className="text-chart-1 font-medium">-{rec.impact.timeReduction}min</span>
                            )}
                            {rec.impact.riskReduction && (
                              <span className="text-accent font-medium">-{rec.impact.riskReduction}% risk</span>
                            )}
                            <span className="text-muted-foreground">• {rec.implementation.timeframe}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {!isImplemented && (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              implementRecommendation(rec.id)
                            }}
                          >
                            Implement
                          </Button>
                        )}
                        <ChevronRight
                          className={`w-4 h-4 text-muted-foreground transition-transform ${
                            isSelected ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-border space-y-4">
                        <div>
                          <h5 className="font-medium text-foreground mb-2">Implementation Plan</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <span className="text-xs text-muted-foreground">Complexity:</span>
                              <div
                                className={`text-sm font-medium ${getComplexityColor(rec.implementation.complexity)}`}
                              >
                                {rec.implementation.complexity.toUpperCase()}
                              </div>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Resources:</span>
                              <div className="text-sm text-foreground">{rec.implementation.resources.join(", ")}</div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            {rec.implementation.steps.map((step, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                                <span className="text-muted-foreground">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-foreground mb-2">Analysis Reasoning</h5>
                          <div className="space-y-1">
                            {rec.reasoning.map((reason, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <AlertTriangle className="w-3 h-3 text-accent" />
                                <span className="text-muted-foreground">{reason}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {rec.alternatives && rec.alternatives.length > 0 && (
                          <div>
                            <h5 className="font-medium text-foreground mb-2">Alternative Options</h5>
                            <div className="space-y-2">
                              {rec.alternatives.map((alt, index) => (
                                <div key={index} className="p-2 rounded bg-muted/50 border border-border">
                                  <div className="font-medium text-sm text-foreground">{alt.title}</div>
                                  <div className="text-xs text-muted-foreground mb-1">{alt.description}</div>
                                  <div className="text-xs text-muted-foreground">
                                    Tradeoffs: {alt.tradeoffs.join(" • ")}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-muted/30 border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Total Potential Savings</span>
                      <DollarSign className="w-4 h-4 text-chart-3" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      ${(totalPotentialSavings / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-xs text-muted-foreground">Across all recommendations</div>
                  </CardContent>
                </Card>

                <Card className="bg-muted/30 border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Average Confidence</span>
                      <Brain className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{(averageConfidence * 100).toFixed(0)}%</div>
                    <Progress value={averageConfidence * 100} className="h-2 mt-2" />
                  </CardContent>
                </Card>

                <Card className="bg-muted/30 border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Implementation Rate</span>
                      <CheckCircle className="w-4 h-4 text-chart-3" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {recommendations.length > 0
                        ? ((implementedRecommendations.size / recommendations.length) * 100).toFixed(0)
                        : 0}
                      %
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {implementedRecommendations.size} of {recommendations.length} implemented
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-4">Recommendation Categories</h4>
                <div className="space-y-3">
                  {[
                    "route_optimization",
                    "cost_reduction",
                    "risk_mitigation",
                    "capacity_optimization",
                    "schedule_adjustment",
                  ].map((type) => {
                    const count = recommendations.filter((r) => r.type === type).length
                    const percentage = recommendations.length > 0 ? (count / recommendations.length) * 100 : 0

                    return (
                      <div key={type} className="flex items-center space-x-3">
                        <div className="w-24 text-sm text-muted-foreground capitalize">{type.replace("_", " ")}</div>
                        <div className="flex-1">
                          <Progress value={percentage} className="h-2" />
                        </div>
                        <div className="w-12 text-sm text-foreground text-right">{count}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="implementation" className="mt-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Implementation Queue</h4>

              {recommendations
                .filter((rec) => !implementedRecommendations.has(rec.id))
                .sort((a, b) => {
                  const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
                  return priorityOrder[b.priority] - priorityOrder[a.priority]
                })
                .map((rec, index) => (
                  <div
                    key={rec.id}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30 border border-border"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{rec.title}</div>
                      <div className="text-sm text-muted-foreground">{rec.implementation.timeframe}</div>
                    </div>
                    <Badge variant="outline" className={`text-xs ${getPriorityColor(rec.priority)}`}>
                      {rec.priority}
                    </Badge>
                    <Button size="sm" onClick={() => implementRecommendation(rec.id)}>
                      Start Implementation
                    </Button>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Implementation History</h4>

              {Array.from(implementedRecommendations).map((id) => {
                const rec = recommendations.find((r) => r.id === id)
                if (!rec) return null

                return (
                  <div
                    key={id}
                    className="flex items-center space-x-4 p-3 rounded-lg bg-chart-3/10 border border-chart-3/30"
                  >
                    <CheckCircle className="w-5 h-5 text-chart-3" />
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{rec.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Implemented •{" "}
                        {rec.impact.costSaving
                          ? `$${(rec.impact.costSaving / 1000).toFixed(0)}K saved`
                          : "Impact tracking"}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs bg-chart-3/20 text-chart-3 border-chart-3/30">
                      COMPLETED
                    </Badge>
                  </div>
                )
              })}

              {implementedRecommendations.size === 0 && (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No Implementation History</h3>
                  <p className="text-muted-foreground">Implemented recommendations will appear here</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
