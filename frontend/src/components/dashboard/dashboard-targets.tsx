import { QueryKey, TARGETS } from "@/lib/consts"
import { getFoodEntries } from "@/lib/queries/food-entry"
import { useUserStore } from "@/lib/stores/user"
import { getTotalNutrients } from "@/lib/utils/dashboard"
import { useQuery } from "@tanstack/react-query"
import { DashboardCard } from "./dashboard-target-card"

export const DashboardTargets = () => {
    const user = useUserStore()
    const getFoodEntriesQuery = useQuery({ queryKey: [QueryKey.FOOD_ENTRY], queryFn: () => getFoodEntries(user) })

    const midnight = new Date(new Date().setHours(0, 0, 0, 0))
    const nutrientTotals = getTotalNutrients(getFoodEntriesQuery.data?.filter(entry => entry.timestamp >= midnight) ?? [])

    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            {TARGETS.map(target => {
                const quantity = nutrientTotals[target.name] || 0
                return <DashboardCard key={target.name} target={target} quantity={quantity} />
            })}
        </div>
    )
}
