import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { AggregateFoodEntryWithDay, BackendFoodEntry } from "@/lib/types"

interface DashboardCaloriesGraphProps {
    data: AggregateFoodEntryWithDay[]
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
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="calories" fill="var(--color-calories)" radius={0} />
            </BarChart>
        </ChartContainer>
    )
}
