
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { USDAFoodsSchema } from "@/lib/schemas/usda"
import { FoodUSDA, USDAFoods } from "@/lib/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { WorkerButton } from "./worker-button"
import { IconSearch } from "@tabler/icons-react"
import { convertUSDAProductToFood } from "@/lib/usda-parsing"
import { QueryKey } from "@/lib/consts"

interface FoodSearchProps {
    onResults?: (foods: FoodUSDA[]) => void
}

const BASE_URL = "https://api.nal.usda.gov/fdc/v1"
const API_KEY = "DEMO_KEY"

const getUSDAFoods = async (query: string): Promise<USDAFoods> => {
    const response = await fetch(
      `${BASE_URL}/foods/search?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
    )

    if (!response.ok) {
        throw new Error(`USDA API error: ${response.statusText}`)
    }
  
    const json = await response.json()
    const parseResult = USDAFoodsSchema.safeParse(json)
  
    if (!parseResult.success) {
        console.error(parseResult.error.message)
        throw new Error("Invalid USDA API response structure.")
    }

    return parseResult.data
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
