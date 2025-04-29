import { Card, CardContent } from "@/components/ui/card"

interface LoadingGraphProps {
    nBars: number
}

export const LoadingGraph = ({ nBars }: LoadingGraphProps) => {
    return (
        <Card className="w-full h-64 flex items-center justify-center">
            <CardContent className="w-full h-full flex items-end gap-2 p-4">
                {[...Array(nBars)].map((_, i) => (
                    <div
                        key={i}
                        className="flex-1 bg-muted animate-pulse rounded-sm"
                        style={{ height: `${Math.random() * 80 + 40}px` }}
                    />
                ))}
            </CardContent>
        </Card>
    )
}
