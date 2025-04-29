import { QueryKey } from "@/lib/consts"
import { useSelectedFoodsStore } from "@/lib/stores/selected-foods"
import { useUserStore } from "@/lib/stores/user"
import { BackendUser, BackendFoodEntry, BackendFoodEntryRequest } from "@/lib/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ReactNode, useCallback, useEffect, useState } from "react"
import { WorkerButton } from "../ui/worker-button"
import { IconPlus } from "@tabler/icons-react"
import { FoodEntryRequestSchema, FoodEntryResponseSchema } from "@/lib/schemas/food-entry"
import { useShallow } from "zustand/react/shallow"
import { postFoodEntry } from "@/lib/queries/food-entry"

export const SubmitSelectedFoodsButton = () => {
    const queryClient = useQueryClient()
    const user = useUserStore()
    const { selectedFoods, clearSelectedFoods } = useSelectedFoodsStore(useShallow((state) => ({ selectedFoods: state.foods, clearSelectedFoods: state.clear })))
    const [isLoading, setIsLoading] = useState(false)
    
    const mutation = useMutation({
        mutationFn: (foodEntry: BackendFoodEntryRequest) => postFoodEntry(user, foodEntry),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.FOOD_ENTRY] })
        },
    })

    const onClick = () => {
        console.log("Clicked", selectedFoods)
        setIsLoading(true)
        for (const food of selectedFoods) {
            mutation.mutate(food);
        }
        clearSelectedFoods()
        setIsLoading(false)
    }

    return (
        <WorkerButton type="submit" icon={IconPlus} isLoading={isLoading} onClick={onClick}>Submit Entries</WorkerButton>
    )
}
