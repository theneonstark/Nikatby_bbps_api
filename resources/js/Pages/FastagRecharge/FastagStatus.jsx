import React from "react";
// import AdminLayout from "@/Layouts/AdminLayout";
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
const FastagStatus = () => {
  return (
<SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
    <div>
      <h1>Hellsdfghjo</h1>
    </div>
    </SidebarInset>
            </SidebarProvider>
  );
};

export default FastagStatus;
