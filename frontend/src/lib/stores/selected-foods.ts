import { create } from 'zustand'
import { Food } from '../types'

export interface SelectedFoodsState {
    foods: Food[]
    select: (food: Food) => void
    deselect: (food: Food) => void
}

export const useSelectedFoodsStore = create<SelectedFoodsState>()((set) => ({
    foods: [],
    select: food => set((state) => ({ foods: [...state.foods, food] })),
    deselect: food => set((state) => ({ foods: state.foods.filter(selectedFood => selectedFood.name !== food.name) })),
}))
