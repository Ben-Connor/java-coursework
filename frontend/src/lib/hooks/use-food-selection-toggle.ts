import { title } from "@/lib/utils/utils"
import { useSelectedFoodsStore } from "@/lib/stores/selected-foods"
import { Food } from "@/lib/types"
import { toast } from "sonner"

export const useFoodSelectionToggle = () => {
    const selectedFoods = useSelectedFoodsStore((state) => state.foods)
    const selectFood = useSelectedFoodsStore((state) => state.select)
    const deselectFood = useSelectedFoodsStore((state) => state.deselect)

    const toggleFood = (food: Food) => {
        const isSelected = selectedFoods.some((selectedFood) => selectedFood.id === food.id)

        if (isSelected) {
            deselectFood(food)
            toast("Deselected Successfully", {
                description: `${title(food.name)} was removed from your list.`,
                action: {
                label: "Undo",
                    onClick: () => selectFood(food),
                },
            })
        } else {
            selectFood(food)
            toast("Selected Successfully", {
                description: `${title(food.name)} was added to your list.`,
                action: {
                label: "Undo",
                    onClick: () => deselectFood(food),
                },
            })
        }
    }

    return { toggleFood }
}
