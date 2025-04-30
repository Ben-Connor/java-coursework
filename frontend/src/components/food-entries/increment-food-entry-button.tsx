import { Button } from "@/components/ui/button"
import { useFoodEntriesStore } from "@/lib/stores/food-entries";
import { FoodEntry } from "@/lib/types";
import { IconPlus } from "@tabler/icons-react";
import { useShallow } from "zustand/react/shallow";

interface IncrementFoodEntryButtonProps {
    foodEntry: FoodEntry
}

export const IncrementFoodEntryButton = ({ foodEntry }: IncrementFoodEntryButtonProps) => {
    const { add } = useFoodEntriesStore(useShallow(state => ({ add: state.add })))

    return (
        <Button variant="outline" size="icon" onClick={() => add(foodEntry)}>
            <IconPlus />
        </Button>
    )
}
