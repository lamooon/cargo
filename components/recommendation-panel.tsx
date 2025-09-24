import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Clock, DollarSign, Brain } from "lucide-react"

export function RecommendationPanel() {
  const recommendations = [
    {
      id: 1,
      title: "Route Reallocation",
      description: "Redirect HKG-LAX cargo via NRT hub",
      impact: "Save $180K",
      confidence: 92,
      timeframe: "2 hours",
      type: "cost-saving",
      icon: DollarSign,
    },
    {
      id: 2,
      title: "Capacity Optimization",
      description: "Consolidate 3 smaller shipments on HKG-FRA route",
      impact: "+15% efficiency",
      confidence: 87,
      timeframe: "4 hours",
      type: "efficiency",
      icon: TrendingUp,
    },
    {
      id: 3,
      title: "Schedule Adjustment",
      description: "Advance departure by 6 hours to avoid weather window",
      impact: "Prevent 12h delay",
      confidence: 95,
      timeframe: "1 hour",
      type: "time-critical",
      icon: Clock,
    },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "cost-saving":
        return "bg-chart-3/20 text-chart-3 border-chart-3/30"
      case "efficiency":
        return "bg-chart-1/20 text-chart-1 border-chart-1/30"
      case "time-critical":
        return "bg-accent/20 text-accent border-accent/30"
      default:
        return "bg-secondary/20 text-secondary-foreground border-secondary/30"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-primary" />
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">Quick Recommendations</CardTitle>
            <p className="text-sm text-muted-foreground">Top priority suggestions</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => {
          const IconComponent = rec.icon
          return (
            <div key={rec.id} className="p-4 rounded-lg bg-muted/30 border border-border space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{rec.title}</h4>
                    <Badge variant="outline" className={`text-xs ${getTypeColor(rec.type)}`}>
                      {rec.confidence}% confidence
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{rec.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs">
                  <span className="text-chart-3 font-medium">{rec.impact}</span>
                  <span className="text-muted-foreground">• {rec.timeframe} to implement</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="flex-1">
                  Implement
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </div>
            </div>
          )
        })}

        <div className="pt-4 border-t border-border">
          <Button variant="outline" className="w-full bg-transparent">
            <Brain className="w-4 h-4 mr-2" />
            View Advanced Analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
