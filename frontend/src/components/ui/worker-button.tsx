import { cn } from "@/lib/utils/utils"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";
import { ComponentProps, ForwardRefExoticComponent, RefAttributes } from "react";
import { Icon, IconProps } from "@tabler/icons-react";

interface WorkerButtonProps extends ComponentProps<typeof Button> {
    icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
    isLoading: boolean
}

export const WorkerButton = ({className, children, icon, isLoading, ...props}: WorkerButtonProps) => {
    const Icon = icon
    return (
        <Button className={cn({"cursor-not-allowed opacity-60": isLoading}, className)} disabled={isLoading} {...props}>
            {isLoading ? (
                <Loader2 className="mr-2 size-4 animate-spin"/>
            ) : (
                <Icon className="mr-2 size-4"/>
            )}
            {children}
        </Button>
    )
}
