import { z } from "zod"
import { Nutrient, NutrientUnit } from "../../types"

export const NutrientTargetSchema = z.object({
    id: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    name: z.nativeEnum(Nutrient),
    quantity: z.number(),
    unit: z.nativeEnum(NutrientUnit),
    isLowerBound: z.boolean(),
    userId: z.number(),
})

export const NutrientTargetResponseSchema = z.object({
    target: NutrientTargetSchema,
})

export const NutrientTargetRequestSchema = z.object({
    name: z.nativeEnum(Nutrient),
    quantity: z.number(),
    unit: z.nativeEnum(NutrientUnit),
    isLowerBound: z.boolean(),
})
