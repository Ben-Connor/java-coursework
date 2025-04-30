import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BackendNutrientTarget, Nutrient, NutrientUnit } from "@/lib/types"
import { roundTo } from "@/lib/utils/utils"

interface DashboardCardProps {
    target: BackendNutrientTarget
    quantity: number
}

export const DashboardCard = ({ target, quantity }: DashboardCardProps) => {
    const isSuccess = target.isLowerBound ? quantity >= target.quantity : quantity <= target.quantity

    const getStatusPhrasing = () => {
        if (target.isLowerBound) {
            if (isSuccess) return "has been fulfilled"
            else return "has not yet been fulfilled"
            
        } else {
            if (isSuccess) return "is currently met"
            else return "has been exceeded"
        }
    }

    return (
        <Card className={`@container/card ${isSuccess ? "border-green-500" : "border-red-500"}`}>
            <CardHeader>
                <CardDescription className="capitalize">{target.name}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{roundTo(quantity, 1)} / {roundTo(target.quantity, 1)} <span className="text-sm font-medium">{target.unit}</span></CardTitle>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <p>Today, your {target.name} goal {getStatusPhrasing()}.</p>
            </CardFooter>
        </Card>
    )
}
