import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/Sidebar";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-auto p-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
