import { z } from "zod"

export const UserSchema = z.object({
    id: z.number(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    username: z.string(),
    email: z.string(),
    passwordHash: z.string(),
})

export const UserResponseSchema = z.object({
    user: UserSchema,
})

export const UserRequestSchema = z.object({
    username: z.string(),
    email: z.string(),
    passwordHash: z.string(),
})
