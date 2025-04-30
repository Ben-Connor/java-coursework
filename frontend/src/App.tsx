import { AppSidebar } from "@/components/nav/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ReactNode, useEffect } from "react"
import { ThemeProvider } from "./components/providers/theme-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { UserProvider } from "./components/providers/user-provider"
import { Toaster } from "./components/ui/sonner"

interface AppProps {
    children?: ReactNode
}

const queryClient = new QueryClient()

const App = ({ children } : AppProps ) => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <SidebarProvider>
                        <AppSidebar variant="inset" />
                        <SidebarInset>
                            <SidebarTrigger className="ml-1 mt-1" />
                            <div className="flex flex-1 flex-col">
                                <div className="@container/main flex flex-1 flex-col gap-4 px-12">
                                    {children}
                                </div>
                            </div>
                        </SidebarInset>
                        <Toaster />
                    </SidebarProvider>
                </UserProvider>
            </QueryClientProvider>
        </ThemeProvider>
    )
}

export default App
