import { z } from "zod"

export const USDANutrientSchema = z.object({
    nutrientName: z.string(),
    value: z.number(),
    unitName: z.string(),
})
  
export const USDAProductSchema = z.object({
    fdcId: z.number(),
    description: z.string(),
    brandOwner: z.string().optional(),
    foodCategory: z.string(),
    foodNutrients: z.array(USDANutrientSchema),
})

export const USDAFoodsSchema = z.object({
    foods: z.array(USDAProductSchema),
})
