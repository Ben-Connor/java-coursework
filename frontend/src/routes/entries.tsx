import { FoodSearch } from "@/components/food-search"
import { RouteUrl } from "@/lib/consts"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute(RouteUrl.ENTRIES)({
    component: EntriesPage,
})

function EntriesPage() {
    return (
        <div className="flex flex-col items-center gap-4 py-4 md:gap-6 md:py-6">
            <FoodSearch />
        </div>
    )
}
