import { Icon, IconProps } from "@tabler/icons-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import { USDANutrientSchema, USDAProductSchema, USDAFoodsSchema } from "./schemas/usda"
import { z } from "zod"

export interface SidebarGroupEntry {
    title: string
    url: string
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
}

export interface Sidebar {
    main: SidebarGroupEntry[]
}

export interface User {
    username: string
    initials: string
    email: string
}

export enum Nutrient {
    CALORIES = "calories",
    PROTEIN = "protein",
    CARBOHYDRATES = "carbohydrates",
    FAT = "fat",
    SUGAR = "sugar",
    VITAMIN_C = "vitamin_c",
    VITAMIN_D = "vitamin_d",
    FIBRE = "fibre",
}

export enum NutrientUnit {
    CALORIES = "kcal",
    GRAMS = "g",
    MILLI_GRAMS = "mg",
    MICRO_GRAMS = "μg",
}

export interface NutrientEntry {
    name: Nutrient
    quantity: number
    unit: NutrientUnit
}

export interface NutrientTarget {
    name: Nutrient
    quantity: number
    unit: NutrientUnit
}

export interface Food {
    name: string
    nutrients: NutrientEntry[]
}

export interface FoodEntry extends Food {
    timestamp: Date
}

export interface FoodUSDA extends Food {
    fdcId: number
    brandOwner?: string
}

export type USDANutrient = z.infer<typeof USDANutrientSchema>
export type USDAProduct = z.infer<typeof USDAProductSchema>
export type USDAFoods = z.infer<typeof USDAFoodsSchema>
