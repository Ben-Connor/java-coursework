import { z } from "zod";

export const submitFoodEntrySelectionFormSchema = z.object({
    timestamp: z.object({
        date: z.date().optional(),
        hasTime: z.boolean(),
    }).optional(),
})
