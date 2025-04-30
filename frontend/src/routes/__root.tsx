import App from "@/App"
import { ApplicationError, ApplicationErrorProps } from "@/components/custom-ui/application-error"
import { NotFound } from "@/components/custom-ui/not-found"
import { createRootRoute, Outlet } from "@tanstack/react-router"

export const Route = createRootRoute({
    component: () => (
        <App>
            <Outlet />
        </App>
    ),
    errorComponent: ({ error }: ApplicationErrorProps) => (
        <App>
            <ApplicationError error={error} />
        </App>
    ),
    notFoundComponent: () => <NotFound />,
})
