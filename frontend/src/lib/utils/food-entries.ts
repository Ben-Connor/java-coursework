import { DEFAULT_NUTRIENT_UNITS } from "../consts"
import { Nutrient, NutrientEntry } from "../types"

export const completeNutrientsList = (partialList: NutrientEntry[]) => {
    const existingMap = new Map(
        partialList.map((entry) => [entry.name, entry])
    )
  
    return Object.values(Nutrient).map((nutrient) => {
        if (existingMap.has(nutrient)) {
            return existingMap.get(nutrient)!
        }
        return {
            name: nutrient,
            quantity: 0,
            unit: DEFAULT_NUTRIENT_UNITS[nutrient],
        }
    })
}
