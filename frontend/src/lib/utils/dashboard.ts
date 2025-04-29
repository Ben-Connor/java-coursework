import { DATE_FORMAT } from "../consts"
import { AggregateFoodEntryWithDay, BackendFoodEntry, Nutrient, NutrientQuantity, AggregateFoodEntry } from "../types"
import { sum } from "./utils"
import { format, subDays } from "date-fns"

export const getTotalNutrients = (entries: BackendFoodEntry[]) => {
    const nutrientMap: { [key in Nutrient]?: number[] } = {}
  
    for (const entry of entries) {
        for (const nutrient of entry.nutrients) {
            if (!nutrientMap[nutrient.name]) nutrientMap[nutrient.name] = []
            nutrientMap[nutrient.name]!.push(nutrient.quantity)
        }
    }
  
    const totals: NutrientQuantity = {}
    for (const [nutrientName, quantities] of Object.entries(nutrientMap)) {
        totals[nutrientName as Nutrient] = sum(quantities)
    }
  
    return totals
}

export const aggregateByDay = (foodEntries: BackendFoodEntry[]): AggregateFoodEntryWithDay[] => {
    const dataMap: Record<string, AggregateFoodEntry> = {}
    for (let i = 6; i >= 0; i--) {
        const day = format(subDays(new Date(), i), DATE_FORMAT)
        dataMap[day] = { calories: 0, protein: 0, carbohydrates: 0, fat: 0 }
    }
    
    foodEntries.forEach((foodEntry) => {
        const day = format(foodEntry.timestamp, DATE_FORMAT)
        if (!dataMap[day]) return

        foodEntry.nutrients.forEach((nutrient) => {
            if (dataMap[day]?.[nutrient.name as keyof AggregateFoodEntry] !== undefined) {
                dataMap[day][nutrient.name as keyof AggregateFoodEntry] += nutrient.quantity
            }
        })
    })

    console.log(dataMap)
  
    return Object.entries(dataMap).map(([day, nutrients]) => ({
        day,
        ...nutrients,
    }))
}
