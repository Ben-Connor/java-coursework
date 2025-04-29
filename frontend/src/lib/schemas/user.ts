import { z } from "zod"

export const UserSchema = z.object({
    id: z.number(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    username: z.string(),
    email: z.string(),
    password_hash: z.string(),
})

export const UserResponseSchema = z.object({
    user: UserSchema,
})
