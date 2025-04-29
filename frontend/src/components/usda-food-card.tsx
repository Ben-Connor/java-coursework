import { Food, FoodUSDA } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { title } from "@/lib/utils"

interface FoodCardProps {
    food: FoodUSDA
}

export const USDAFoodCard = ({ food }: FoodCardProps) => {
    return (
        <Card className="flex flex-col @container/card justify-between">
            <div className="flex flex-col gap-4">
                <CardHeader>
                    <CardTitle>{title(food.name)}</CardTitle>
                    {food.brandOwner && <CardDescription>{food.brandOwner}</CardDescription>}
                </CardHeader>
                <CardContent>
                    {food.nutrients.map(nutrient => (
                        <div key={nutrient.name} className="flex justify-between">
                            <strong>{title(nutrient.name)}</strong>
                            <span>{nutrient.quantity} {nutrient.unit}</span>
                        </div>
                    ))}
                </CardContent>
            </div>
            <CardFooter className="justify-end -mr-4 -mb-4">
                <span className="text-sm font-light">FDC ID {food.fdcId}</span>
            </CardFooter>
        </Card>
    )
}
