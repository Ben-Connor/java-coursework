import {
    IconChartBar,
    IconListDetails,
    IconTarget,
  } from "@tabler/icons-react"
import { Nutrient, NutrientUnit, Sidebar, NutrientTarget, User, FoodEntry } from "./types"
import { repeat } from "./utils"

export const SIDEBAR = {
    main: [
        {
            title: "Dashboard",
            url: "/",
            icon: IconChartBar,
        },
        {
            title: "Entries",
            url: "/entries",
            icon: IconListDetails,
        }
    ],
} satisfies Sidebar

export const USER = {
    username: "Username",
    initials: "UN",
    email: "username@example.com",
} satisfies User

export const FOOD_ENTRIES: FoodEntry[] = repeat(4, [
    {
        name: "Chicken Breast",
        timestamp: new Date(),
        nutrients: [
            {
                name: Nutrient.CALORIES,
                quantity: 500,
                unit: NutrientUnit.CALORIES,
            },
            {
                name: Nutrient.PROTEIN,
                quantity: 60,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.CARBOHYDRATES,
                quantity: 0,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.FAT,
                quantity: 26,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.SUGAR,
                quantity: 0,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.VITAMIN_C,
                quantity: 0,
                unit: NutrientUnit.MILLI_GRAMS,
            },
            {
                name: Nutrient.VITAMIN_D,
                quantity: 0.2,
                unit: NutrientUnit.MICRO_GRAMS,
            },
            {
                name: Nutrient.FIBRE,
                quantity: 0,
                unit: NutrientUnit.GRAMS,
            },
        ],
    },
])

export const TARGETS: NutrientTarget[] = [
    {
        name: Nutrient.CALORIES,
        quantity: 3000,
        unit: NutrientUnit.CALORIES,
    },
    {
        name: Nutrient.PROTEIN,
        quantity: 200,
        unit: NutrientUnit.GRAMS,
    },
    {
        name: Nutrient.FAT,
        quantity: 25,
        unit: NutrientUnit.GRAMS,
    },
    {
        name: Nutrient.SUGAR,
        quantity: 25,
        unit: NutrientUnit.GRAMS,
    },
]

export const TARGET_COMPARATORS_LOOKUP: Record<Nutrient, (quantity: number, target: number) => boolean> = {
    "calories": (quantity: number, target: number) => quantity >= target,
    "protein": (quantity: number, target: number) => quantity >= target,
    "carbohydrates": (quantity: number, target: number) => quantity <= target,
    "fat": (quantity: number, target: number) => quantity <= target,
    "sugar": (quantity: number, target: number) => quantity <= target,
    "vitamin_c": (quantity: number, target: number) => quantity >= target,
    "vitamin_d": (quantity: number, target: number) => quantity >= target,
    "fibre": (quantity: number, target: number) => quantity > target,
}
