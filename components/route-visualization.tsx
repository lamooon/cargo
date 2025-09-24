import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InteractiveRouteMap } from "@/components/interactive-route-map"

export function RouteVisualization() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">Route Network Status</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs bg-chart-3/20 text-chart-3 border-chart-3/30">
              247 Active
            </Badge>
            <Badge variant="outline" className="text-xs bg-accent/20 text-accent border-accent/30">
              8 Disrupted
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="interactive" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="interactive">Interactive Map</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
            <TabsTrigger value="critical">Critical Routes</TabsTrigger>
          </TabsList>

          <TabsContent value="interactive" className="mt-6">
            <InteractiveRouteMap />
          </TabsContent>

          <TabsContent value="regional" className="mt-6">
            <div className="space-y-4">
              {["Asia-Pacific", "Europe", "Americas"].map((region) => (
                <div
                  key={region}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
                >
                  <div>
                    <h4 className="font-medium text-foreground">{region}</h4>
                    <p className="text-sm text-muted-foreground">Regional route status</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline" className="text-xs">
                      85% Operational
                    </Badge>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="critical" className="mt-6">
            <div className="space-y-4">
              {[
                { route: "HKG → LAX", status: "Disrupted", impact: "High", cargo: "2,400t" },
                { route: "HKG → FRA", status: "Delayed", impact: "Medium", cargo: "1,800t" },
                { route: "HKG → LHR", status: "Alternative", impact: "Low", cargo: "1,200t" },
              ].map((route, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
                >
                  <div>
                    <h4 className="font-medium text-foreground">{route.route}</h4>
                    <p className="text-sm text-muted-foreground">{route.cargo} cargo affected</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant={
                        route.status === "Disrupted"
                          ? "destructive"
                          : route.status === "Delayed"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {route.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{route.impact} Impact</span>
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
