import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Ghost } from "lucide-react"
import { useRouter } from "@tanstack/react-router"
import { RouteUrl } from "@/lib/consts"

export const NotFound = () => {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center h-screen p-6 space-y-6">
            <Alert variant="destructive" className="max-w-md w-full">
                <Ghost className="h-5 w-5" />
                <AlertTitle>Page not found</AlertTitle>
                <AlertDescription>
                    The page you're looking for doesn't exist or might have been moved.
                </AlertDescription>
            </Alert>

            <div className="flex flex-row gap-4">
                <Button variant="default" onClick={() => router.navigate({ to: RouteUrl.DASHBOARD.toString() })}>Go To Dashboard</Button>
                <Button variant="outline" onClick={() => router.history.back()}>Go Back</Button>
            </div>
        </div>
    )
}
