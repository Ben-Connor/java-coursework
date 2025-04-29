import { create } from 'zustand'
import { DatabaseUser } from '../types'
import { USER_ID } from '../consts'

export const useUserStore = create<DatabaseUser>()((set) => ({
    id: USER_ID,
    username: "Username",
    initials: "U",
    email: "username@example.com",
    created_at: new Date(),
    updated_at: new Date(),
    password_hash: "$password_hash$"
}))
