import { IconAlertTriangle } from "@tabler/icons-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { useRouter } from "@tanstack/react-router"

export interface ApplicationErrorProps {
    error: Error & { digest?: string }
}

export const ApplicationError = ({ error }: ApplicationErrorProps) => {
    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center h-full p-6 gap-6 border-gray-300 radius-4">
            <Alert variant="destructive" className="max-w-md w-full">
                <IconAlertTriangle />
                <AlertTitle>Something Went Wrong</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
                {error.digest && (
                    <p className="text-xs text-muted-foreground mt-2">
                        Error code: {error.digest}
                    </p>
                )}
            </Alert>
        </div>
    )
}
