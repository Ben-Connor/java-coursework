import { RouteUrl } from "@/lib/consts"
import { createFileRoute } from "@tanstack/react-router"
import { useFoodEntriesStore } from "@/lib/stores/food-entries"
import { FoodEntriesTable } from "@/components/food-entries/food-entries-table"
import { useShallow } from "zustand/react/shallow"
import { SubmitFoodEntrySelectionForm } from "@/components/food-entries/submit-food-entry-selection-form"
import { IconPlus } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import ManualFoodEntryDialog from "@/components/food-entries/manual-food-entry-dialog"

export const Route = createFileRoute(RouteUrl.ENTRIES)({
    component: EntriesPage,
})

function EntriesPage() {
    const counts = useFoodEntriesStore(useShallow(state => state.counts))
    
    return (
        <div className="flex flex-col items-center gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex flex-row w-full justify-between">
                <ManualFoodEntryDialog>
                    <Button className="h-full">
                        <IconPlus /> Add Manually
                    </Button>
                </ManualFoodEntryDialog>
                <SubmitFoodEntrySelectionForm />
            </div>
            <FoodEntriesTable data={counts} />
        </div>
    )
}
