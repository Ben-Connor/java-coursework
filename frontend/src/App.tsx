import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ReactNode } from "react"
import { ThemeProvider } from "./components/theme-provider"

interface AppProps {
    children?: ReactNode
}

const App = ({ children } : AppProps ) => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SidebarTrigger className="ml-1 mt-1" />
                    <div className="flex flex-1 flex-col">
                        <div className="@container/main flex flex-1 flex-col gap-2">
                            {children}
                        </div>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    )
}

export default App
