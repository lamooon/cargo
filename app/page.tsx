import { DashboardHeader } from "@/components/dashboard-header"
import { MetricsOverview } from "@/components/metrics-overview"
import { DisruptionAlerts } from "@/components/disruption-alerts"
import { RouteVisualization } from "@/components/route-visualization"
import { RecommendationPanel } from "@/components/recommendation-panel"
import { CargoAnalyticsChart } from "@/components/cargo-analytics-chart"
import { RealTimeMetrics } from "@/components/real-time-metrics"
import { DisruptionHeatmap } from "@/components/disruption-heatmap"
import { DisruptionSimulator } from "@/components/disruption-simulator"
import { ExternalDataFeeds } from "@/components/external-data-feeds"
import { AdvancedRecommendationSystem } from "@/components/advanced-recommendation-system"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-6 py-8 space-y-8">
        <MetricsOverview />

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <CargoAnalyticsChart />
          <RealTimeMetrics />
        </div>

        <AdvancedRecommendationSystem />

        <ExternalDataFeeds />

        <DisruptionSimulator />

        <DisruptionHeatmap />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <DisruptionAlerts />
            <RouteVisualization />
          </div>
          <div>
            <RecommendationPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
