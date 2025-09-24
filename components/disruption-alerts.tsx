import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Cloud, Zap, Globe } from "lucide-react"

export function DisruptionAlerts() {
  const alerts = [
    {
      id: 1,
      type: "weather",
      severity: "high",
      title: "Severe Weather Alert - Hong Kong",
      description: "Typhoon approaching HKG, expected impact on 15 routes",
      affectedRoutes: 15,
      estimatedDelay: "4-8 hours",
      icon: Cloud,
      time: "2 min ago",
    },
    {
      id: 2,
      type: "geopolitical",
      severity: "medium",
      title: "Airspace Restriction - Eastern Europe",
      description: "Temporary closure affecting 3 cargo corridors",
      affectedRoutes: 3,
      estimatedDelay: "12-24 hours",
      icon: Globe,
      time: "15 min ago",
    },
    {
      id: 3,
      type: "operational",
      severity: "low",
      title: "Ground Equipment Maintenance - LAX",
      description: "Scheduled maintenance affecting cargo handling",
      affectedRoutes: 2,
      estimatedDelay: "2-4 hours",
      icon: Zap,
      time: "1 hour ago",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">Active Disruptions</CardTitle>
          <Badge variant="outline" className="text-xs">
            {alerts.length} Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => {
          const IconComponent = alert.icon
          return (
            <div key={alert.id} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-secondary-foreground" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-foreground">{alert.title}</h4>
                  <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {alert.affectedRoutes} routes affected • {alert.estimatedDelay} delay
                  </span>
                  <span>{alert.time}</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
