import { DashboardCard } from "@/components/dashboard-card"
import { DashboardGraph } from "@/components/dashboard-graph"
import { TARGET_COMPARATORS_LOOKUP, TARGETS } from "@/lib/consts"
import { Nutrient, NutrientUnit } from "@/lib/types"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
    component: Index,
})

function Index() {
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                {Object.values(TARGETS).map(target => (
                    <DashboardCard nutrient={target.name} quantity={target.quantity} unit={target.unit} success={TARGET_COMPARATORS_LOOKUP[target.name](target.quantity, target.quantity)} />
                ))}
            </div>
            <div className="px-4 lg:px-6">
                <DashboardGraph />
            </div>
        </div>
    )
}
