import { create } from 'zustand'

export interface UserState {
    id: number
    username: string
    initials: string
    email: string
}

export const useUserStore = create<UserState>()((set) => ({
    id: 1,
    username: "Username",
    initials: "U",
    email: "username@example.com",
}))
