import { DashboardCard } from "@/components/dashboard-card"
import { TARGET_COMPARATORS_LOOKUP, TARGETS, FOOD_ENTRIES, RouteUrl, QueryKey } from "@/lib/consts"
import { createFileRoute } from "@tanstack/react-router"
import { getTotalNutrients, aggregateByDay } from "@/lib/dashboard"
import { DashboardGraphs } from "@/components/dashboard-graphs"

export const Route = createFileRoute(RouteUrl.DASHBOARD)({
    component: DashboardPage,
})

function DashboardPage() {
    const midnight = new Date(new Date().setHours(0, 0, 0, 0))
    const nutrientTotals = getTotalNutrients(FOOD_ENTRIES.filter(entry => entry.timestamp >= midnight))

    return (
        <div className="flex flex-col h-full gap-6 py-4 md:py-6 justify-between">
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                {TARGETS.map(target => {
                    const quantity = nutrientTotals[target.name] || 0
                    return <DashboardCard key={target.name} nutrient={target.name} quantity={quantity} targetQuantity={target.quantity} unit={target.unit} success={TARGET_COMPARATORS_LOOKUP[target.name](quantity, target.quantity)} />
                })}
            </div>
            <DashboardGraphs />
        </div>
    )
}
