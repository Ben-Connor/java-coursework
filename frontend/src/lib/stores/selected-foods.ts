import { create } from 'zustand'
import { Food } from '../types'

export interface SelectedFoodsState {
    foods: Food[]
    select: (food: Food) => void
    deselect: (food: Food) => void
    clear: () => void
}

export const useSelectedFoodsStore = create<SelectedFoodsState>()((set) => ({
    foods: [],
    select: food => set(state => ({ foods: [...state.foods, food] })),
    deselect: food => set(state => ({ foods: state.foods.filter(selectedFood => selectedFood.id !== food.id) })),
    clear: () => set((state => ({ foods: [] })))
}))
