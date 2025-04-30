import { create } from 'zustand'
import { FoodEntry, FoodEntryCount } from '../types'

export interface FoodEntriesState {
    counts: FoodEntryCount[]
    selection: Record<number, boolean>
    add: (food: FoodEntry) => void
    remove: (food: FoodEntry) => void
    setSelection: (selection: Record<number, boolean>) => void
    clearSelection: () => void
}

export const useFoodEntriesStore = create<FoodEntriesState>()((set) => ({
    counts: [],
    selection: {},
    add: (food: FoodEntry) => set(state => {
        const existing = state.counts.find((f) => f.foodEntry.id === food.id)
        if (existing) return {
            counts: state.counts.map(count => count.foodEntry.id === food.id ? { ...count, n: count.n + 1 } : count),
        }
        return {
            counts: [...state.counts, { foodEntry: food, n: 1 }],
        }
    }),
    remove: (food: FoodEntry) => set(state => {
        const existing = state.counts.find((f) => f.foodEntry.id === food.id)
        if (!existing) return state
        if (existing.n <= 1) return {
            counts: state.counts.filter((f) => f.foodEntry.id !== food.id),
        }
        return {
            counts: state.counts.map(count => count.foodEntry.id === food.id ? { ...count, n: count.n - 1 } : count),
        }
    }),
    setSelection : (selection: Record<number, boolean> ) => set((state => ({ selection }))),
    clearSelection : () => set((state => ({ selection: {} }))),
}))
