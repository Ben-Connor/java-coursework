import { USDAFoodCard } from "@/components/search-entry/usda-food-card"
import { FoodSearch } from "@/components/search-entry/food-search"
import { RouteUrl } from "@/lib/consts"
import { FoodEntryUSDA, FoodEntryUSDACount } from "@/lib/types"
import { createFileRoute } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import { useFoodEntriesStore } from "@/lib/stores/food-entries"
import { useShallow } from "zustand/react/shallow"
import { deduplicate } from "@/lib/utils/utils"
import { SearchEntriesTable } from "@/components/search-entry/search-entries-table"

export const Route = createFileRoute(RouteUrl.SEARCH_ENTRY)({
    component: SearchEntryPage,
})

function SearchEntryPage() {
    const [foods, setFoods] = useState<FoodEntryUSDA[]>([])
    const counts = useFoodEntriesStore(useShallow(state => state.counts))
    const data: FoodEntryUSDACount[] = useMemo(() => foods.map(food => ({ foodEntry: food, n: counts.find(count => count.foodEntry.id === food.id)?.n ?? 0 })), [foods, counts])

    return (
        <div className="flex flex-col items-center gap-4 py-4 md:gap-6 md:py-6">
            <FoodSearch onResults={(foods: FoodEntryUSDA[]) => setFoods(deduplicate(foods, (a, b) => a.name.toLowerCase() + (a.brandOwner ?? "").toLowerCase() === b.name.toLowerCase() + (b.brandOwner ?? "").toLowerCase()))} />
            <SearchEntriesTable data={data} />
        </div>
    )
}
