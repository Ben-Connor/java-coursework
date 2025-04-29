import { UserRequestSchema, UserResponseSchema } from "../schemas/user"
import { BackendUser, BackendUserRequest } from "../types"

export const postUser = async (user: BackendUserRequest): Promise<BackendUser> => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UserRequestSchema.parse(user)),
    })

    if (!response.ok) {
        throw new Error(`Macromotions API error: ${response.statusText}`)
    }
  
    const json = await response.json()
    const parseResult = UserResponseSchema.safeParse(json)

    if (!parseResult.success) {
        console.error(parseResult.error.message)
        throw new Error("Invalid Macromotions API response structure.")
    }

    return parseResult.data.user
}
