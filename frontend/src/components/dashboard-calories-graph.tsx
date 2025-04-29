import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { BackendFoodEntry } from "@/lib/types"

interface Day {
    day: string
}

interface DashboardCaloriesGraphProps {
    data: Day[]
}

const chartConfig = {
    calories: {
        label: "Calories",
        color: "#2563eb",  // Blue
    },
} satisfies ChartConfig

export const DashboardCaloriesGraph = ({ data }: DashboardCaloriesGraphProps) => {
    return (
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(5)}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="calories" fill="var(--color-calories)" radius={4} />
            </BarChart>
        </ChartContainer>
    )
}
