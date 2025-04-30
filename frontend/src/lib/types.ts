import { Icon, IconProps } from "@tabler/icons-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import { USDANutrientSchema, USDAProductSchema, USDAFoodsSchema } from "./schemas/api/usda"
import { z } from "zod"
import { FoodEntrySchema, NutrientEntrySchema, FoodEntryRequestSchema, NutrientEntryRequestSchema, FoodEntryResponseSchema, FoodEntriesResponseSchema } from "./schemas/api/food-entry"
import { UserSchema, UserResponseSchema, UserRequestSchema } from "./schemas/api/user"
import { NutrientTargetRequestSchema, NutrientTargetResponseSchema, NutrientTargetSchema } from "./schemas/api/nutrient-target"

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

export interface FoodEntry {
    id: number
    name: string
    nutrients: NutrientEntry[]
}

export interface FoodEntryCount {
    foodEntry: FoodEntry
    n: number
}

export interface FoodEntryUSDA extends FoodEntry {
    brandOwner?: string
}

export interface FoodEntryUSDACount {
    foodEntry: FoodEntryUSDA
    n: number
}

export type NutrientQuantity = {
    [key in Nutrient]?: number
}

export interface AggregateFoodEntry {
    calories: number
    protein: number
    carbohydrates: number
    fat: number
}

export interface AggregateFoodEntryWithDay extends AggregateFoodEntry {
    day: string
}

export type BackendUser = z.infer<typeof UserSchema>
export type BackendUserResponse = z.output<typeof UserResponseSchema>
export type BackendUserRequest = z.input<typeof UserRequestSchema>

export type BackendNutrientEntry = z.infer<typeof NutrientEntrySchema>
export type BackendFoodEntry = z.infer<typeof FoodEntrySchema>
export type BackendFoodEntryResponse = z.output<typeof FoodEntryResponseSchema>
export type BackendFoodEntriesResponse = z.output<typeof FoodEntriesResponseSchema>
export type BackendNutrientEntryRequest = z.input<typeof NutrientEntryRequestSchema>
export type BackendFoodEntryRequest = z.input<typeof FoodEntryRequestSchema>

export type BackendNutrientTarget = z.infer<typeof NutrientTargetSchema>
export type BackendNutrientTargetResponse = z.output<typeof NutrientTargetResponseSchema>
export type BackendNutrientTargetRequest = z.input<typeof NutrientTargetRequestSchema>

export type USDANutrient = z.infer<typeof USDANutrientSchema>
export type USDAProduct = z.infer<typeof USDAProductSchema>
export type USDAFoods = z.infer<typeof USDAFoodsSchema>
