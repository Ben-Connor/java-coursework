import App from "@/App"
import { createRootRoute, Outlet } from "@tanstack/react-router"

export const Route = createRootRoute({
    component: () => (
        <App>
            <Outlet />
        </App>
    )
})
