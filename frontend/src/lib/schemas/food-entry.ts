import { z } from "zod"
import { Nutrient, NutrientUnit } from "../types"

export const NutrientEntrySchema = z.object({
    id: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    name: z.nativeEnum(Nutrient),
    quantity: z.number(),
    unit: z.nativeEnum(NutrientUnit),
    foodEntryId: z.number(),
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

export const FoodEntriesResponseSchema = z.object({
    foodEntries: z.array(FoodEntrySchema),
})

export const NutrientEntryRequestSchema = z.object({
    name: z.string(),
    quantity: z.number(),
    unit: z.string(),
})
  
export const FoodEntryRequestSchema = z.object({
    name: z.string(),
    timestamp: z.coerce.date().default(new Date),
    nutrients: z.array(NutrientEntryRequestSchema),
})
