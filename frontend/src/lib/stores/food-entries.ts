import { create } from 'zustand'
import { FoodEntry, FoodEntryCount } from '../types'

export interface FoodEntriesState {
    counts: FoodEntryCount[]
    selection: Record<number, boolean>
    add: (foodEntry: FoodEntry) => void
    remove: (foodEntry: FoodEntry) => void
    setSelection: (selection: Record<number, boolean>) => void
    clearSelection: () => void
}

export const useFoodEntriesStore = create<FoodEntriesState>()((set) => ({
    counts: [],
    selection: {},
    add: (foodEntry: FoodEntry) => set(state => {
        const existing = state.counts.find(count => count.foodEntry.id === foodEntry.id)
        if (existing) return {
            counts: state.counts.map(count => count.foodEntry.id === foodEntry.id ? { ...count, n: count.n + 1 } : count),
        }
        return {
            counts: [...state.counts, { foodEntry: foodEntry, n: 1 }],
        }
    }),
    remove: (foodEntry: FoodEntry) => set(state => {
        const existing = state.counts.find(count => count.foodEntry.id === foodEntry.id)
        if (!existing) return state
        if (existing.n <= 1) return {
            counts: state.counts.filter(count => count.foodEntry.id !== foodEntry.id),
        }
        return {
            counts: state.counts.map(count => count.foodEntry.id === foodEntry.id ? { ...count, n: count.n - 1 } : count),
        }
    }),
    setSelection : (selection: Record<number, boolean> ) => set((state => ({ selection }))),
    clearSelection : () => set((state => ({ selection: {} }))),
}))
