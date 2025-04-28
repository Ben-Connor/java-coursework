import { IconCheck, IconX } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Nutrient, NutrientUnit } from "@/lib/types"

interface DashboardCardProps {
    nutrient: Nutrient
    quantity: number
    targetQuantity: number
    unit: NutrientUnit
    success: boolean
}

export const DashboardCard = ({ nutrient, quantity, targetQuantity, unit, success }: DashboardCardProps) => {
    return (
        
        <Card className={`@container/card ${success ? "border-green-500" : "border-red-500"}`}>
            <CardHeader>
                <CardDescription className="capitalize">{nutrient}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{quantity} / {targetQuantity} <span className="text-sm font-medium">{unit}</span></CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="text-muted-foreground">
                    This is your daily {nutrient} goal.
                </div>
                <div className="line-clamp-1 flex gap-2 font-medium">
                    This target has {success ? "" : "not yet "} been met.
                </div>
            </CardFooter>
        </Card>
    )
}
