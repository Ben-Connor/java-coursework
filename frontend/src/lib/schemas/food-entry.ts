import { z } from "zod"
import { Nutrient, NutrientUnit } from "../types"

export const NutrientEntrySchema = z.object({
    id: z.number(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    name: z.nativeEnum(Nutrient),
    quantity: z.number(),
    unit: z.nativeEnum(NutrientUnit),
    food_entry_id: z.number(),
})

export const FoodEntrySchema = z.object({
    id: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    name: z.string(),
    timestamp: z.coerce.date(),
    userId: z.number(),
    nutrients: z.array(NutrientEntrySchema),
})

export const FoodEntryResponseSchema = z.object({
    foodEntry: FoodEntrySchema,
})
