import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cn } from "@/lib/utils/utils"
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from "react";

const DialogPopover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = forwardRef<ComponentRef<typeof PopoverPrimitive.Content>, ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>>(({className, align = "center", sideOffset = 4, ...props}, ref) => (
    <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
            "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
        )}
        {...props}
    />
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { DialogPopover, PopoverTrigger, PopoverContent }
