import { USDAFoodCard } from "@/components/usda-food-card"
import { FoodSearch } from "@/components/food-search"
import { RouteUrl } from "@/lib/consts"
import { Food, USDAFoods } from "@/lib/types"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useSelectedFoodsStore } from "@/lib/stores/selected-foods"
import { FoodCard } from "@/components/food-card"
import { SubmitSelectedFoodsButton } from "@/components/submit-selected-foods-button"

export const Route = createFileRoute(RouteUrl.ENTRIES)({
    component: EntriesPage,
})

function EntriesPage() {
    const selectedFoods = useSelectedFoodsStore((state) => state.foods)
    const selectFood = useSelectedFoodsStore((state) => state.select)
    const deselectFood = useSelectedFoodsStore((state) => state.deselect)

    const toggleFood = (food: Food) => {
        if (selectedFoods.some(selectedFood => selectedFood.id === food.id)) {
            deselectFood(food)
        } else {
            selectFood(food)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex flex-row w-full justify-end">
                <SubmitSelectedFoodsButton />
            </div>
            <div className="w-full *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                {
                    selectedFoods.slice(0, 8).map(food => (
                        <FoodCard key={food.id} food={food} onClick={toggleFood} />
                    ))
                }
            </div>
        </div>
    )
}
