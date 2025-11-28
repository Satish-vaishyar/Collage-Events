import { SkeletonCard } from "@/components/core/skeleton-card"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

export default function EventsLoading() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="h-8 w-32 bg-muted rounded animate-pulse" />
            <div className="h-4 w-64 bg-muted rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-muted rounded animate-pulse" />
        </div>
        <SkeletonCard count={6} />
      </div>
    </DashboardLayout>
  )
}
