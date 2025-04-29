import { DashboardCard } from "@/components/dashboard-card"
import { DashboardCaloriesGraph } from "@/components/dashboard-calories-graph"
import { TARGET_COMPARATORS_LOOKUP, TARGETS, FOOD_ENTRIES, RouteUrl, QueryKey } from "@/lib/consts"
import { createFileRoute } from "@tanstack/react-router"
import { DashboardMacrosGraph } from "@/components/dashboard-macros-graph"
import { getTotalNutrients, aggregateByDay } from "@/lib/dashboard"
import { BackendFoodEntry, BackendUser } from "@/lib/types"
import { FoodEntriesResponseSchema } from "@/lib/schemas/food-entry"
import { useUserStore } from "@/lib/stores/user"
import { useQuery } from "@tanstack/react-query"
import { LoadingGraph } from "./loading-graph"

const getFoodEntries = async (user: BackendUser): Promise<BackendFoodEntry[]> => {
    console.log(`${import.meta.env.VITE_API_URL}/user/${user.id}/entry/all`)
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${user.id}/entry/all`)
    console.log(response)

    if (!response.ok) {
        throw new Error(`Macromotions API error: ${response.statusText}`)
    }

    const json = await response.json()
    const parseResult = FoodEntriesResponseSchema.safeParse(json)

    if (!parseResult.success) {
        console.error(parseResult.error.message)
        throw new Error("Invalid Macromotions API response structure.")
    }

    return parseResult.data.foodEntries
}

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
