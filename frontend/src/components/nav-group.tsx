import { IconCirclePlusFilled, IconMail, type Icon } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

interface Item {
    title: string
    url: string
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
                <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroupContent>
        </SidebarGroup>
    )
}
