import React, {ReactNode, useState} from "react"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {WorkerButton} from "@/components/custom-ui/worker-button"
import * as z from "zod"
import { IconPlus } from "@tabler/icons-react"
import { manualFoodEntryFormSchema } from "@/lib/schemas/forms/food-entries"
import { Input } from "../ui/input"
import { FoodEntry, Nutrient, NutrientUnit } from "@/lib/types"
import { stringToIntHash, title, zip } from "@/lib/utils/utils"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "../ui/select"
import { Separator } from "../ui/separator"
import { useFoodEntriesStore } from "@/lib/stores/food-entries"
import { useShallow } from "zustand/react/shallow"
import { DialogDescription } from "@radix-ui/react-dialog"
import { DEFAULT_NUTRIENT_UNITS } from "@/lib/consts"

interface ManualFoodEntryDialogProps {
    children: ReactNode
}

type FormData = z.infer<typeof manualFoodEntryFormSchema>

const nutrients = Object.keys(Nutrient) as Array<keyof typeof Nutrient>
const nutrientUnits = Object.keys(NutrientUnit) as Array<keyof typeof NutrientUnit>

const createEntryId = (data: FormData) => {
    const nutrientsPart = data.nutrients.map(nutrient =>`${nutrient.quantity ?? "null"}-${nutrient.unit ?? "null"}`).join("|");
    const rawId = `${data.name}-${nutrientsPart}`;
    return stringToIntHash(rawId);
}

const formDataToFoodEntry = (data: FormData): FoodEntry => {
    console.log(data)
    return {
        id: createEntryId(data),
        name: data.name,
        nutrients: zip(nutrients, data.nutrients)
            .filter(([nutrient, nutrientData]) => !!nutrientData.quantity && !!nutrientData.unit)
            .map(([nutrient, nutrientData]) => ({
                name: Nutrient[nutrient],
                quantity: nutrientData.quantity!,
                unit: nutrientData.unit!,
            }))
    }
}

const ManualFoodEntryDialog = ({children}: ManualFoodEntryDialogProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const form = useForm<FormData>({
        resolver: zodResolver(manualFoodEntryFormSchema),
    })
    const [isLoading, setIsLoading] = useState(false)
    const { add } = useFoodEntriesStore(useShallow(state => ({ add: state.add })))

    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        for (let i = 0; i < data.n; i++) add(formDataToFoodEntry(data))
        setIsLoading(false)
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="overflow-y-scroll max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Manual Food Entry</DialogTitle>
                </DialogHeader>
                <DialogDescription />
                <Form {...form}>
                    <form onSubmit={event => {
                        event.preventDefault()
                        void form.handleSubmit(onSubmit)(event)
                    }} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Food Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="n"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        {nutrients.map((nutrient, index) => (
                            <div key={nutrient}>
                                <Separator />
                                <h3 className="text-xl py-4">{title(nutrient)}</h3>
                                <FormField
                                    control={form.control}
                                    name={`nutrients.${index}.quantity`}
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Quantity</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`nutrients.${index}.unit`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="pt-6">Unit</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select a unit" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Units</SelectLabel>
                                                        {nutrientUnits.map(nutrientUnit => <SelectItem key={nutrientUnit} value={NutrientUnit[nutrientUnit]}>{NutrientUnit[nutrientUnit]}</SelectItem>)}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}
                        <DialogFooter>
                            <WorkerButton type="submit" icon={IconPlus} isLoading={isLoading}>Add Entry</WorkerButton>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default ManualFoodEntryDialog
