import { USDAProduct, USDANutrient, FoodUSDA, NutrientEntry } from "@/lib/types"
import { Nutrient, BackendNutrientEntry, NutrientUnit } from "@/lib/types"

const mapNutrientName = (name: string): Nutrient | null => {
    switch (name.toLowerCase()) {
        case "energy":
            return Nutrient.CALORIES
        case "protein":
            return Nutrient.PROTEIN
        case "carbohydrate, by difference":
            return Nutrient.CARBOHYDRATES
        case "total lipid (fat)":
            return Nutrient.FAT
        case "total sugars":
            return Nutrient.SUGAR
        case "vitamin c, total ascorbic acid":
            return Nutrient.VITAMIN_C
        case "vitamin d (d2 + d3)":
            return Nutrient.VITAMIN_D
        case "fiber, total dietary":
            return Nutrient.FIBRE
        default:
            return null
    }
}

const mapNutrientUnit = (unit: string): NutrientUnit | null => {
    switch (unit.toLowerCase()) {
        case "kcal":
            return NutrientUnit.CALORIES
        case "g":
            return NutrientUnit.GRAMS
        case "mg":
            return NutrientUnit.MILLI_GRAMS
        case "ug":
            return NutrientUnit.MICRO_GRAMS
        default:
            return null
    }
}

const convertNutrient = (nutrient: USDANutrient): NutrientEntry | null => {
    const name = mapNutrientName(nutrient.nutrientName)
    if (!name) return null
    
    const unit = mapNutrientUnit(nutrient.unitName)
    if (!unit) return null

    return {
        name,
        quantity: nutrient.value,
        unit,
    }
}

export const convertUSDAProductToFood = (product: USDAProduct): FoodUSDA => {
    const nutrients: NutrientEntry[] = product.foodNutrients.map(convertNutrient).filter((n): n is NutrientEntry => n !== null)

    return {
        id: product.fdcId,
        name: product.description,
        nutrients,
        brandOwner: product.brandOwner,
    }
}
