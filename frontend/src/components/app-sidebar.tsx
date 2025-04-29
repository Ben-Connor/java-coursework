import { IconInnerShadowTop, IconMacro } from "@tabler/icons-react"
import { NavGroup } from "@/components/nav-group"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ComponentProps } from "react"
import { RouteUrl, SIDEBAR } from "@/lib/consts"
import { Link } from "@tanstack/react-router"

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
    return (
        <Sidebar side="left" variant="sidebar" collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <Link to={RouteUrl.DASHBOARD.toString()}>
                                <IconMacro className="!size-5" />
                                <span className="text-base font-semibold">Macromotions</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavGroup items={SIDEBAR.main} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
