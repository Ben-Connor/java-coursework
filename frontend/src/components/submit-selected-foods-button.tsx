import { QueryKey } from "@/lib/consts"
import { useSelectedFoodsStore } from "@/lib/stores/selected-foods"
import { useUserStore } from "@/lib/stores/user"
import { BackendUser, BackendFoodEntry, BackendFoodEntryRequest } from "@/lib/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ReactNode, useCallback, useEffect, useState } from "react"
import { WorkerButton } from "./worker-button"
import { IconPlus } from "@tabler/icons-react"
import { FoodEntryRequestSchema, FoodEntryResponseSchema } from "@/lib/schemas/food-entry"
import { useShallow } from "zustand/react/shallow"

const postFoodEntry = async (user: BackendUser, foodEntry: BackendFoodEntryRequest): Promise<BackendFoodEntry> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${user.id}/entry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(FoodEntryRequestSchema.parse(foodEntry)),
    })

    if (!response.ok) {
        throw new Error(`Macromotions API error: ${response.statusText}`)
    }

    const json = await response.json()
    const parseResult = FoodEntryResponseSchema.safeParse(json)

    if (!parseResult.success) {
        console.error(parseResult.error.message)
        throw new Error("Invalid Macromotions API response structure.")
    }

    return parseResult.data.foodEntry
}

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
