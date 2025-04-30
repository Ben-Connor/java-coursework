import { IconChartBar, IconListDetails, IconSearch } from "@tabler/icons-react"
import { Nutrient, NutrientUnit, Sidebar, BackendNutrientTarget, BackendFoodEntry } from "./types"
import { subDays } from "date-fns"

export enum RouteUrl {
    DASHBOARD = "/",
    SEARCH_ENTRY = "/search-entry",
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
            title: "Search Entry",
            url: RouteUrl.SEARCH_ENTRY,
            icon: IconSearch,
        },
        {
            title: "Entries",
            url: RouteUrl.ENTRIES,
            icon: IconListDetails,
        }
    ],
} satisfies Sidebar

export const USER_ID = 1
export const DATE_FORMAT = "dd/MM/yyyy"

export const TARGETS: BackendNutrientTarget[] = [
    {
        id: 1,
        createdAt: subDays(new Date(), 2),
        updatedAt: subDays(new Date(), 2),
        userId: USER_ID,
        name: Nutrient.CALORIES,
        quantity: 2500,
        unit: NutrientUnit.CALORIES,
        isLowerBound: false,
    },
    {
        id: 2,
        createdAt: subDays(new Date(), 2),
        updatedAt: subDays(new Date(), 2),
        userId: USER_ID,
        name: Nutrient.PROTEIN,
        quantity: 200,
        unit: NutrientUnit.GRAMS,
        isLowerBound: true,
    },
    {
        id: 3,
        createdAt: subDays(new Date(), 2),
        updatedAt: subDays(new Date(), 2),
        userId: USER_ID,
        name: Nutrient.FAT,
        quantity: 25,
        unit: NutrientUnit.GRAMS,
        isLowerBound: false,
    },
    {
        id: 4,
        createdAt: subDays(new Date(), 2),
        updatedAt: subDays(new Date(), 2),
        userId: USER_ID,
        name: Nutrient.SUGAR,
        quantity: 25,
        unit: NutrientUnit.GRAMS,
        isLowerBound: false,
    },
]

export enum QueryKey {
    USDA_FOOD = "usda/food",
    USER = "macromotions/user",
    FOOD_ENTRY = "macromotions/food-entry",
}
