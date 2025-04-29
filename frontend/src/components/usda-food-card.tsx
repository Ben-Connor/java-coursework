import { FoodUSDA } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { title } from "@/lib/utils"

interface FoodCardProps {
    food: FoodUSDA
    onClick?: (food: FoodUSDA) => void
}

export const USDAFoodCard = ({ food, onClick }: FoodCardProps) => {
    return (
        <Card 
            className="flex flex-col @container/card justify-between cursor-pointer hover:bg-muted hover:text-muted-foreground"
            onClick={onClick ? () => onClick(food) : undefined}
        >
            <div className="flex flex-col gap-4">
                <CardHeader>
                    <CardTitle>{title(food.name)}</CardTitle>
                    <CardDescription>{!!food.brandOwner ? food.brandOwner : "Unknown Brand"}</CardDescription>
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
                <span className="text-sm font-light">FDC ID {food.id}</span>
            </CardFooter>
        </Card>
    )
}
