import { DashboardCaloriesGraph } from "@/components/dashboard/dashboard-calories-graph"
import { TARGET_COMPARATORS_LOOKUP, TARGETS, FOOD_ENTRIES, RouteUrl, QueryKey } from "@/lib/consts"
import { DashboardMacrosGraph } from "@/components/dashboard/dashboard-macros-graph"
import { getTotalNutrients, aggregateByDay } from "@/lib/utils/dashboard"
import { useUserStore } from "@/lib/stores/user"
import { useQuery } from "@tanstack/react-query"
import { LoadingGraph } from "./loading-graph"
import { getFoodEntries } from "@/lib/queries/food-entry"

export const DashboardGraphs = () => {
    const user = useUserStore()
    const getFoodEntriesQuery = useQuery({ queryKey: [QueryKey.FOOD_ENTRY], queryFn: () => getFoodEntries(user) })

    if (getFoodEntriesQuery.isPending || getFoodEntriesQuery.isError) return (
        <>
            <LoadingGraph nBars={7} />
            <LoadingGraph nBars={7} />
        </>
    )

    const chartData = aggregateByDay(getFoodEntriesQuery.data)

    return (
        <>
            <DashboardCaloriesGraph data={chartData} />
            <DashboardMacrosGraph data={chartData} />
        </>
    )
}
