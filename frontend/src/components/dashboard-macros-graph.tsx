import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { FOOD_ENTRIES } from "@/lib/consts"

interface Day {
    day: string
}

interface DashboardMacrosGraphProps {
    data: Day[]
}

const chartConfig = {
    protein: {
        label: "Protein",
        color: "#60a5fa",  // Light Blue
    },
    carbohydrates: {
        label: "Carbohydrates",
        color: "#34d399",  // Green
    },
    fat: {
        label: "Fat",
        color: "#f87171",  // Red
    },
} satisfies ChartConfig

export const DashboardMacrosGraph = ({ data }: DashboardMacrosGraphProps) => {
    return (
        <ChartContainer config={chartConfig} className="h-[500px] w-full">
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
            <Bar dataKey="protein" stackId="a" fill="var(--color-protein)" radius={0} />
            <Bar dataKey="carbohydrates" stackId="a" fill="var(--color-carbohydrates)" radius={0} />
            <Bar dataKey="fat" stackId="a" fill="var(--color-fat)" radius={0} />
            </BarChart>
        </ChartContainer>
    )
}
