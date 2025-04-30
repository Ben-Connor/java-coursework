import { RouteUrl } from "@/lib/consts"
import { createFileRoute } from "@tanstack/react-router"
import { DashboardGraphs } from "@/components/dashboard/dashboard-graphs"
import { DashboardTargets } from "@/components/dashboard/dashboard-targets"

export const Route = createFileRoute(RouteUrl.DASHBOARD)({
    component: DashboardPage,
})

function DashboardPage() {
    return (
        <div className="flex flex-col h-full gap-6 py-4 md:py-6 justify-between">
            <DashboardTargets />
            <DashboardGraphs />
        </div>
    )
}
