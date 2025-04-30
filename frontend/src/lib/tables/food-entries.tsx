import { ColumnDef, Row } from "@tanstack/react-table"
import { roundTo, title } from "../utils/utils"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { FoodEntryCount, FoodEntry, Nutrient, NutrientEntry } from "../types"
import { IncrementFoodEntryButton } from "@/components/food-entries/increment-food-entry-button"
import { DecrementFoodEntryButton } from "@/components/food-entries/decrement-food-entry-button"
import { Checkbox } from "@/components/ui/checkbox"

const getNutrientEntryFromFoodEntryCount = (count: FoodEntryCount, nutrient: Nutrient): NutrientEntry | null => (
    count.foodEntry.nutrients.find(nutrientEntry => nutrientEntry.name === nutrient) ?? null
)

export const foodEntriesColumns: ColumnDef<FoodEntryCount>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex justify-center">
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className="flex justify-center">
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "name",
        accessorFn: count => count.foodEntry.name,
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Name
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="pl-3">{title(row.original.foodEntry.name)}</div>,
        enableHiding: false,
    },
    {
        id: "count",
        accessorFn: count => count.n,
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Count
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => <div className="pl-3">{row.original.n}</div>,
        enableHiding: false,
    },
    {
        id: "calories",
        accessorFn: count => getNutrientEntryFromFoodEntryCount(count, Nutrient.CALORIES)?.quantity ?? -Infinity,
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Calories
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const nutrient = getNutrientEntryFromFoodEntryCount(row.original, Nutrient.CALORIES)
            return <div className="pl-3">{!!nutrient ? roundTo(nutrient.quantity, 1) : ""}{nutrient?.unit ?? ""}</div>
        }
    },
    {
        id: "protein",
        accessorFn: count => getNutrientEntryFromFoodEntryCount(count, Nutrient.PROTEIN)?.quantity ?? -Infinity,
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Protein
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const nutrient = getNutrientEntryFromFoodEntryCount(row.original, Nutrient.PROTEIN)
            return <div className="pl-3">{!!nutrient ? roundTo(nutrient.quantity, 1) : ""}{nutrient?.unit ?? ""}</div>
        }
    },
    {
        id: "carbohydrates",
        accessorFn: count => getNutrientEntryFromFoodEntryCount(count, Nutrient.CARBOHYDRATES)?.quantity ?? -Infinity,
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Carbohydrates
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const nutrient = getNutrientEntryFromFoodEntryCount(row.original, Nutrient.CARBOHYDRATES)
            return <div className="pl-3">{!!nutrient ? roundTo(nutrient.quantity, 1) : ""}{nutrient?.unit ?? ""}</div>
        }
    },
    {
        id: "fat",
        accessorFn: count => getNutrientEntryFromFoodEntryCount(count, Nutrient.FAT)?.quantity ?? -Infinity,
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Fat
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const nutrient = getNutrientEntryFromFoodEntryCount(row.original, Nutrient.FAT)
            return <div className="pl-3">{!!nutrient ? roundTo(nutrient.quantity, 1) : ""}{nutrient?.unit ?? ""}</div>
        }
    },
    {
        id: "sugar",
        accessorFn: count => getNutrientEntryFromFoodEntryCount(count, Nutrient.SUGAR)?.quantity ?? -Infinity,
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Sugar
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const nutrient = getNutrientEntryFromFoodEntryCount(row.original, Nutrient.SUGAR)
            return <div className="pl-3">{!!nutrient ? roundTo(nutrient.quantity, 1) : ""}{nutrient?.unit ?? ""}</div>
        }
    },
    {
        id: "vitamin c",
        accessorFn: count => getNutrientEntryFromFoodEntryCount(count, Nutrient.VITAMIN_C)?.quantity ?? -Infinity,
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Vitamin C
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const nutrient = getNutrientEntryFromFoodEntryCount(row.original, Nutrient.VITAMIN_C)
            return <div className="pl-3">{!!nutrient ? roundTo(nutrient.quantity, 1) : ""}{nutrient?.unit ?? ""}</div>
        }
    },
    {
        id: "vitamin d",
        accessorFn: count => getNutrientEntryFromFoodEntryCount(count, Nutrient.VITAMIN_D)?.quantity ?? -Infinity,
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Vitamin D
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const nutrient = getNutrientEntryFromFoodEntryCount(row.original, Nutrient.VITAMIN_D)
            return <div className="pl-3">{!!nutrient ? roundTo(nutrient.quantity, 1) : ""}{nutrient?.unit ?? ""}</div>
        }
    },
    {
        id: "fibre",
        accessorFn: count => getNutrientEntryFromFoodEntryCount(count, Nutrient.FIBRE)?.quantity ?? -Infinity,
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Fibre
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => {
            const nutrient = getNutrientEntryFromFoodEntryCount(row.original, Nutrient.FIBRE)
            return <div className="pl-3">{!!nutrient ? roundTo(nutrient.quantity, 1) : ""}{nutrient?.unit ?? ""}</div>
        }
    },
    {
        id: "change count",
        cell: ({ row }) => (
            <div className="flex flex-row gap-2 justify-end">
                <IncrementFoodEntryButton foodEntry={row.original.foodEntry} />
                <DecrementFoodEntryButton foodEntry={row.original.foodEntry} />
            </div>
        ),
        enableHiding: false,
    },
]
