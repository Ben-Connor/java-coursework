import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { FOOD_ENTRIES } from "@/lib/consts";

// Aggregate data by day
const aggregateDataByDay = () => {
  const dataMap: Record<string, Record<string, number>> = {};

  FOOD_ENTRIES.forEach((entry) => {
    const day = entry.timestamp.toISOString().split("T")[0]; // Get the date (YYYY-MM-DD)
    if (!dataMap[day]) {
      dataMap[day] = { calories: 0, protein: 0, carbohydrates: 0, fat: 0 };
    }

    entry.nutrients.forEach((nutrient) => {
      const nutrientKey = nutrient.name.toLowerCase(); // Convert nutrient name to lowercase
      if (dataMap[day][nutrientKey] !== undefined) {
        dataMap[day][nutrientKey] += nutrient.quantity;
      }
    });
  });

  return Object.entries(dataMap).map(([day, nutrients]) => ({
    day,
    ...nutrients,
  }));
};

const chartData = aggregateDataByDay();

const chartConfig = {
  calories: {
    label: "Calories",
    color: "#2563eb", // Blue
  },
  protein: {
    label: "Protein",
    color: "#60a5fa", // Light Blue
  },
  carbohydrates: {
    label: "Carbohydrates",
    color: "#34d399", // Green
  },
  fat: {
    label: "Fat",
    color: "#f87171", // Red
  },
} satisfies ChartConfig;

export const DashboardGraph = () => {
  return (
    <div className="space-y-8">
      {/* Separate graph for Calories */}
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(5)} // Display MM-DD
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="calories" fill="var(--color-calories)" radius={4} />
        </BarChart>
      </ChartContainer>

      {/* Graph for Protein, Carbohydrates, and Fat */}
      <ChartContainer config={chartConfig} className="h-[500px] w-full">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(5)} // Display MM-DD
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="protein" stackId="a" fill="var(--color-protein)" radius={0} />
          <Bar dataKey="carbohydrates" stackId="a" fill="var(--color-carbohydrates)" radius={0} />
          <Bar dataKey="fat" stackId="a" fill="var(--color-fat)" radius={0} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};