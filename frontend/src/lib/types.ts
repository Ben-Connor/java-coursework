import { Icon, IconProps } from "@tabler/icons-react"
import { ForwardRefExoticComponent, RefAttributes } from "react"

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

export interface FoodEntry {
    name: string
    timestamp: Date
    nutrients: NutrientEntry[]
}
