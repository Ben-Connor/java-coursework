
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const FoodSearch = () => {
    return (
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="search" placeholder="Your food..." />
            <Button type="submit">Search</Button>
        </div>
    )
}
