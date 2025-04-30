import { QueryKey } from "@/lib/consts"
import { useFoodEntriesStore } from "@/lib/stores/food-entries"
import { useUserStore } from "@/lib/stores/user"
import { BackendUser, BackendFoodEntry, BackendFoodEntryRequest } from "@/lib/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ReactNode, useCallback, useEffect, useState } from "react"
import { useShallow } from "zustand/react/shallow"
import { postFoodEntry } from "@/lib/queries/food-entry"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { DialogFormDatetimePicker } from "../custom-ui/datetime-picker"
import { submitFoodEntrySelectionFormSchema } from "@/lib/schemas/forms/submit-food-entry-selection-form"
import { WorkerButton } from "../custom-ui/worker-button"
import { IconPlus } from "@tabler/icons-react"

export const SubmitFoodEntrySelectionForm = () => {
    const form = useForm<z.infer<typeof submitFoodEntrySelectionFormSchema>>({
        resolver: zodResolver(submitFoodEntrySelectionFormSchema),
    })
    const queryClient = useQueryClient()
    const user = useUserStore()
    const { counts, removeCount, countSelection, clearCountSelection } = useFoodEntriesStore(useShallow((state) => ({ counts: state.counts, removeCount: state.remove, countSelection: state.selection, clearCountSelection: state.clearSelection })))
    const [isLoading, setIsLoading] = useState(false)

    const mutation = useMutation({
        mutationFn: (foodEntry: BackendFoodEntryRequest) => postFoodEntry(user, foodEntry),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKey.FOOD_ENTRY] })
        },
    })

    const onSubmit = (values: z.infer<typeof submitFoodEntrySelectionFormSchema>) => {
        setIsLoading(true)
        let nSubmitted = 0
        for (const [index, count] of counts.entries()) {
            for (let j = 0; j < count.n; j++) {
                if (countSelection[index]) {
                    mutation.mutate({
                        ...count.foodEntry,
                        timestamp: values.timestamp?.date
                    })
                    removeCount(count.foodEntry)
                    nSubmitted++
                }
            }
        }
        clearCountSelection()
        toast("Submitted Successfully", {
            description: `${nSubmitted} food entries were submitted.`,
        })
        setIsLoading(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row gap-8 items-center">
                <FormField
                    control={form.control}
                    name="timestamp"
                    render={({field}) => (
                        <FormItem>
                            <DialogFormDatetimePicker {...field} />
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <WorkerButton className="h-full" icon={IconPlus} isLoading={isLoading}>Submit Food Entries</WorkerButton>
            </form>
        </Form>
    )
}
