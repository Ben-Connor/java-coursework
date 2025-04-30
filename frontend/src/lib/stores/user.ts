import { create } from 'zustand'
import { BackendUser } from '../types'
import { USER_ID } from '../consts'

export const useUserStore = create<BackendUser>()((set) => ({
    id: USER_ID,
    username: "Username",
    initials: "U",
    email: "username@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    passwordHash: "$password_hash$"
}))
