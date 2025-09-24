import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react"

export function MetricsOverview() {
  const metrics = [
    {
      title: "Active Routes",
      value: "247",
      change: "+12",
      trend: "up",
      status: "operational",
    },
    {
      title: "Disrupted Routes",
      value: "8",
      change: "-3",
      trend: "down",
      status: "warning",
    },
    {
      title: "Cargo Tonnage",
      value: "15,420t",
      change: "+2.4%",
      trend: "up",
      status: "operational",
    },
    {
      title: "Revenue Impact",
      value: "$2.1M",
      change: "-$340K",
      trend: "down",
      status: "critical",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            {metric.status === "operational" && <CheckCircle className="w-4 h-4 text-chart-3" />}
            {metric.status === "warning" && <AlertTriangle className="w-4 h-4 text-accent" />}
            {metric.status === "critical" && <AlertTriangle className="w-4 h-4 text-destructive" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{metric.value}</div>
            <div className="flex items-center space-x-2 text-xs">
              {metric.trend === "up" ? (
                <TrendingUp className="w-3 h-3 text-chart-3" />
              ) : (
                <TrendingDown className="w-3 h-3 text-destructive" />
              )}
              <span className={metric.trend === "up" ? "text-chart-3" : "text-destructive"}>{metric.change}</span>
              <span className="text-muted-foreground">from last hour</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
