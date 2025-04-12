import React from "react";
// import AdminLayout from "@/Layouts/AdminLayout";
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
const FastagRecharge = () => {
  return (
<SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
    <div>
      <h1>Hello</h1>
    </div>
    </SidebarInset>
                </SidebarProvider>
  );
};

export default FastagRecharge;
