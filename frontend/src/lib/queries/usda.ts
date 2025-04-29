import { USDAFoodsSchema } from "../schemas/usda"
import { USDAFoods } from "../types"

const BASE_URL = "https://api.nal.usda.gov/fdc/v1"
const API_KEY = "DEMO_KEY"

export const getUSDAFoods = async (query: string): Promise<USDAFoods> => {
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
