
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { USDAFoodsSchema } from "@/lib/schemas/usda"
import { FoodUSDA, USDAFoods } from "@/lib/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { WorkerButton } from "../ui/worker-button"
import { IconSearch } from "@tabler/icons-react"
import { convertUSDAProductToFood } from "@/lib/utils/usda-parsing"
import { QueryKey } from "@/lib/consts"
import { getUSDAFoods } from "@/lib/queries/usda"

interface FoodSearchProps {
    onResults?: (foods: FoodUSDA[]) => void
}

export const FoodSearch = ({ onResults }: FoodSearchProps) => {
    const [isLoading, setLoading] = useState(false)
    const [query, setQuery] = useState("")
    const getUSDAFoodsQuery = useQuery({ queryKey: [QueryKey.USDA_FOOD], queryFn: () => getUSDAFoods(query), enabled: false })

    const handleSearch = async () => {
        setLoading(true)
        const result = await getUSDAFoodsQuery.refetch()
        setLoading(false)

        
        if (result.isSuccess && onResults) {
            const foods = result.data.foods.map(product => convertUSDAProductToFood(product))
            onResults(foods)
        }
    }
    
    return (
        <div className="flex w-full max-w-lg items-center space-x-2">
            <Input type="search" placeholder="Your food..." value={query} onChange={e => setQuery(e.target.value)} />
            <WorkerButton type="submit" onClick={handleSearch} icon={IconSearch} isLoading={isLoading}>Search</WorkerButton>
        </div>
    )
}
