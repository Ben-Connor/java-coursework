import { QueryKey } from "@/lib/consts"
import { UserRequestSchema, UserResponseSchema } from "@/lib/schemas/user"
import { useUserStore } from "@/lib/stores/user"
import { BackendUser, BackendUserRequest } from "@/lib/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ReactNode, useCallback, useEffect } from "react"

const postUser = async (user: BackendUserRequest): Promise<BackendUser> => {
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

interface UserProviderProps {
    children?: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const queryClient = useQueryClient()
    const user = useUserStore()
    
    const mutation = useMutation({
        mutationFn: postUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.USER] })
        },
    })

    useEffect(() => mutation.mutate(user), [])

    return (
        <>
            {children}
        </>
    )
}
