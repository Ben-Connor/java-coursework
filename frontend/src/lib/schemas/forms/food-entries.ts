import { z } from "zod"
import { NutrientUnit } from "@/lib/types"

export const submitFoodEntrySelectionFormSchema = z.object({
    timestamp: z.object({
        date: z.date().optional(),
        hasTime: z.boolean(),
    }).optional(),
})

export const manualFoodEntryFormSchema = z.object({
    name: z.string(),
    n: z.coerce.number().int(),
    nutrients: z.array(
        z.object({
            quantity: z.coerce.number().optional(),
            unit: z.nativeEnum(NutrientUnit).optional(),
        })
    ),
})
