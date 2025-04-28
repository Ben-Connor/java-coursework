import { createRootRoute, Link, Outlet } from "@tanstack/react-router"

export const Route = createRootRoute({
    component: () => (
        <Outlet />
    )
})
