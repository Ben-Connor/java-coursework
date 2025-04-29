import { Icon, IconProps } from "@tabler/icons-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import { USDANutrientSchema, USDAProductSchema, USDAFoodsSchema } from "./schemas/usda"
import { z } from "zod"
import { FoodEntrySchema, NutrientEntrySchema } from "./schemas/food-entry"
import { UserSchema } from "./schemas/user"

export interface SidebarGroupEntry {
    title: string
    url: string
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
}

export interface Sidebar {
    main: SidebarGroupEntry[]
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
    id: number
    name: string
    nutrients: NutrientEntry[]
}

export interface FoodUSDA extends Food {
    brandOwner?: string
}

export interface UserRequest {
    username: string
    email: string
    password_hash: string
}

export type DatabaseUser = z.infer<typeof UserSchema>

export type DatabaseNutrientEntry = z.infer<typeof NutrientEntrySchema>
export type DatabaseFoodEntry = z.infer<typeof FoodEntrySchema>

export type USDANutrient = z.infer<typeof USDANutrientSchema>
export type USDAProduct = z.infer<typeof USDAProductSchema>
export type USDAFoods = z.infer<typeof USDAFoodsSchema>
