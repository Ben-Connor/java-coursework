import { Food } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { title } from "@/lib/utils/utils"

interface FoodCardProps {
    food: Food
    onClick?: (food: Food) => void
}

export const FoodCard = ({ food, onClick }: FoodCardProps) => {
    return (
        <Card 
            className="flex flex-col @container/card justify-between cursor-pointer hover:bg-muted hover:text-muted-foreground"
            onClick={onClick ? () => onClick(food) : undefined}
        >
            <div className="flex flex-col gap-4">
                <CardHeader>
                    <CardTitle>{title(food.name)}</CardTitle>
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
        </Card>
    )
}
