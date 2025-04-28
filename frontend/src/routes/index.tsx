import { DashboardCard } from "@/components/dashboard-card"
import { DashboardGraph } from "@/components/dashboard-graph"
import { TARGET_COMPARATORS_LOOKUP, TARGETS, FOOD_ENTRIES } from "@/lib/consts"
import { FoodEntry, Nutrient, NutrientTarget, NutrientUnit } from "@/lib/types"
import { sum } from "@/lib/utils"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
    component: Index,
})

type NutrientQuantity = {
    [key in Nutrient]?: number
}

const getTotalNutrients = (entries: FoodEntry[]) => {
    const nutrientMap: { [key in Nutrient]?: number[] } = {}
  
    for (const entry of entries) {
        for (const nutrient of entry.nutrients) {
            if (!nutrientMap[nutrient.name]) nutrientMap[nutrient.name] = []
            nutrientMap[nutrient.name]!.push(nutrient.quantity)
        }
    }
  
    const totals: NutrientQuantity = {}
    for (const [nutrientName, quantities] of Object.entries(nutrientMap)) {
        totals[nutrientName as Nutrient] = sum(quantities)
    }
  
    return totals
}

function Index() {
    const midnight = new Date(new Date().setHours(0, 0, 0, 0))
    const nutrientTotals = getTotalNutrients(FOOD_ENTRIES.filter(entry => entry.timestamp >= midnight))

    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                {TARGETS.map(target => {
                    const quantity = nutrientTotals[target.name] || 0
                    return <DashboardCard nutrient={target.name} quantity={quantity} targetQuantity={target.quantity} unit={target.unit} success={TARGET_COMPARATORS_LOOKUP[target.name](quantity, target.quantity)} />
                })}
            </div>
            <div className="px-4 lg:px-6">
                <DashboardGraph />
            </div>
        </div>
    )
}
