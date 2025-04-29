import { USDAFoodCard } from "@/components/search-entry/usda-food-card"
import { FoodSearch } from "@/components/search-entry/food-search"
import { RouteUrl } from "@/lib/consts"
import { FoodUSDA } from "@/lib/types"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useSelectedFoodsStore } from "@/lib/stores/selected-foods"
import { useFoodSelectionToggle } from "@/lib/hooks/use-food-selection-toggle"

export const Route = createFileRoute(RouteUrl.SEARCH_ENTRY)({
    component: SearchEntryPage,
})

function SearchEntryPage() {
    const [foods, setFoods] = useState<FoodUSDA[] | null>(null)
    const { toggleFood } = useFoodSelectionToggle()

    return (
        <div className="flex flex-col items-center gap-4 py-4 md:gap-6 md:py-6">
            <FoodSearch onResults={setFoods} />
            <div className="w-full *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                {
                    foods?.slice(0, 8).map(food => (
                        <USDAFoodCard key={food.id} food={food} onClick={toggleFood} />
                    ))
                }
            </div>
        </div>
    )
}
