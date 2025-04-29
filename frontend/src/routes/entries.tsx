import { USDAFoodCard } from "@/components/usda-food-card"
import { FoodSearch } from "@/components/food-search"
import { RouteUrl } from "@/lib/consts"
import { FoodUSDA, USDAFoods } from "@/lib/types"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute(RouteUrl.ENTRIES)({
    component: EntriesPage,
})

function EntriesPage() {
    const [foods, setFoods] = useState<FoodUSDA[] | null>(null)
    const [selectedFoods, setSelectedFoods] = useState<FoodUSDA[]>([])

    const toggleFood = (food: FoodUSDA) => {
        setSelectedFoods(prev => {
            const exists = prev.some(f => f.fdcId === food.fdcId)
            if (exists) {
                return prev.filter(f => f.fdcId !== food.fdcId)
            } else {
                return [...prev, food]
            }
        })
    }

    return (
        <div className="flex flex-col items-center gap-4 py-4 md:gap-6 md:py-6">
            <FoodSearch onResults={setFoods} />
            <div className="w-full *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                {
                    foods?.slice(0, 8).map(food => (
                        <USDAFoodCard key={food.fdcId} food={food} onClick={toggleFood} />
                    ))
                }
            </div>
        </div>
    )
}
