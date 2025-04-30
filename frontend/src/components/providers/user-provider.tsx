import { QueryKey } from "@/lib/consts"
import { postUser } from "@/lib/queries/user"
import { useUserStore } from "@/lib/stores/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ReactNode, useCallback, useEffect } from "react"

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
