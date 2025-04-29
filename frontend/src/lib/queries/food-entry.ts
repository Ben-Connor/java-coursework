import { FoodEntriesResponseSchema, FoodEntryRequestSchema, FoodEntryResponseSchema } from "../schemas/food-entry"
import { BackendFoodEntry, BackendFoodEntryRequest, BackendUser } from "../types"

export const getFoodEntries = async (user: BackendUser): Promise<BackendFoodEntry[]> => {
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

export const postFoodEntry = async (user: BackendUser, foodEntry: BackendFoodEntryRequest): Promise<BackendFoodEntry> => {
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
