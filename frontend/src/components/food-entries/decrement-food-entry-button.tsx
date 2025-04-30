import { Button } from "@/components/ui/button"
import { useFoodEntriesStore } from "@/lib/stores/food-entries";
import { FoodEntry } from "@/lib/types";
import { IconMinus } from "@tabler/icons-react";
import { useShallow } from "zustand/react/shallow";

interface DecrementFoodEntryButtonProps {
    foodEntry: FoodEntry
}

export const DecrementFoodEntryButton = ({ foodEntry }: DecrementFoodEntryButtonProps) => {
    const { remove } = useFoodEntriesStore(useShallow(state => ({ remove: state.remove })))

    return (
        <Button variant="outline" size="icon" onClick={() => remove(foodEntry)}>
            <IconMinus />
        </Button>
    )
}
