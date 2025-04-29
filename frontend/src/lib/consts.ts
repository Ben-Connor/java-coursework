import { IconChartBar, IconListDetails } from "@tabler/icons-react"
import { Nutrient, NutrientUnit, Sidebar, NutrientTarget, User, FoodEntry } from "./types"
import { repeat } from "./utils"

export enum RouteUrl {
    DASHBOARD = "/",
    ENTRIES = "/entries",
}

export const SIDEBAR = {
    main: [
        {
            title: "Dashboard",
            url: RouteUrl.DASHBOARD,
            icon: IconChartBar,
        },
        {
            title: "Entries",
            url: RouteUrl.ENTRIES,
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
    {
        name: "Salmon Fillet",
        timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
        nutrients: [
            {
                name: Nutrient.CALORIES,
                quantity: 400,
                unit: NutrientUnit.CALORIES,
            },
            {
                name: Nutrient.PROTEIN,
                quantity: 50,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.CARBOHYDRATES,
                quantity: 0,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.FAT,
                quantity: 20,
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
                quantity: 15,
                unit: NutrientUnit.MICRO_GRAMS,
            },
            {
                name: Nutrient.FIBRE,
                quantity: 0,
                unit: NutrientUnit.GRAMS,
            },
        ],
    },
    {
        name: "Brown Rice",
        timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
        nutrients: [
            {
                name: Nutrient.CALORIES,
                quantity: 215,
                unit: NutrientUnit.CALORIES,
            },
            {
                name: Nutrient.PROTEIN,
                quantity: 5,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.CARBOHYDRATES,
                quantity: 45,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.FAT,
                quantity: 1.5,
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
                quantity: 0,
                unit: NutrientUnit.MICRO_GRAMS,
            },
            {
                name: Nutrient.FIBRE,
                quantity: 3.5,
                unit: NutrientUnit.GRAMS,
            },
        ],
    },
    {
        name: "Broccoli",
        timestamp: new Date(new Date().setDate(new Date().getDate() - 3)),
        nutrients: [
            {
                name: Nutrient.CALORIES,
                quantity: 55,
                unit: NutrientUnit.CALORIES,
            },
            {
                name: Nutrient.PROTEIN,
                quantity: 4.5,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.CARBOHYDRATES,
                quantity: 11,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.FAT,
                quantity: 0.5,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.SUGAR,
                quantity: 2,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.VITAMIN_C,
                quantity: 89,
                unit: NutrientUnit.MILLI_GRAMS,
            },
            {
                name: Nutrient.VITAMIN_D,
                quantity: 0,
                unit: NutrientUnit.MICRO_GRAMS,
            },
            {
                name: Nutrient.FIBRE,
                quantity: 3.8,
                unit: NutrientUnit.GRAMS,
            },
        ],
    },
    {
        name: "Almonds",
        timestamp: new Date(new Date().setDate(new Date().getDate() - 4)),
        nutrients: [
            {
                name: Nutrient.CALORIES,
                quantity: 575,
                unit: NutrientUnit.CALORIES,
            },
            {
                name: Nutrient.PROTEIN,
                quantity: 21,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.CARBOHYDRATES,
                quantity: 22,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.FAT,
                quantity: 49,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.SUGAR,
                quantity: 4.4,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.VITAMIN_C,
                quantity: 0,
                unit: NutrientUnit.MILLI_GRAMS,
            },
            {
                name: Nutrient.VITAMIN_D,
                quantity: 0,
                unit: NutrientUnit.MICRO_GRAMS,
            },
            {
                name: Nutrient.FIBRE,
                quantity: 12.5,
                unit: NutrientUnit.GRAMS,
            },
        ],
    },
    {
        name: "Greek Yogurt",
        timestamp: new Date(new Date().setDate(new Date().getDate() - 5)),
        nutrients: [
            {
                name: Nutrient.CALORIES,
                quantity: 100,
                unit: NutrientUnit.CALORIES,
            },
            {
                name: Nutrient.PROTEIN,
                quantity: 10,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.CARBOHYDRATES,
                quantity: 4,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.FAT,
                quantity: 5,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.SUGAR,
                quantity: 3,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.VITAMIN_C,
                quantity: 0,
                unit: NutrientUnit.MILLI_GRAMS,
            },
            {
                name: Nutrient.VITAMIN_D,
                quantity: 1,
                unit: NutrientUnit.MICRO_GRAMS,
            },
            {
                name: Nutrient.FIBRE,
                quantity: 0,
                unit: NutrientUnit.GRAMS,
            },
        ],
    },
    {
        name: "Apple",
        timestamp: new Date(new Date().setDate(new Date().getDate() - 6)),
        nutrients: [
            {
                name: Nutrient.CALORIES,
                quantity: 95,
                unit: NutrientUnit.CALORIES,
            },
            {
                name: Nutrient.PROTEIN,
                quantity: 0.5,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.CARBOHYDRATES,
                quantity: 25,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.FAT,
                quantity: 0.3,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.SUGAR,
                quantity: 19,
                unit: NutrientUnit.GRAMS,
            },
            {
                name: Nutrient.VITAMIN_C,
                quantity: 8.4,
                unit: NutrientUnit.MILLI_GRAMS,
            },
            {
                name: Nutrient.VITAMIN_D,
                quantity: 0,
                unit: NutrientUnit.MICRO_GRAMS,
            },
            {
                name: Nutrient.FIBRE,
                quantity: 4.4,
                unit: NutrientUnit.GRAMS,
            },
        ],
    },
]);

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
