import { type Icon } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router"
import { RouteUrl } from "@/lib/consts"

interface Item {
    title: string
    url: RouteUrl
    icon?: Icon
}

interface NavGroupProps {
    items: Item[]
}

export const NavGroup = ({ items }: NavGroupProps) => {
    return (
        <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title} asChild>
                    <Link to={item.url.toString()}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroupContent>
        </SidebarGroup>
    )
}
