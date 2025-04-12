import IpWhiteList from '@/Components/IpWhitelist/ipWhitelist'
import React from 'react'
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Navbar from "@/Layouts/newLayout/navbar";

function ipwhitelist() {
  return (
    <SidebarProvider>
    <AppSidebar variant="inset" />
    <SidebarInset>
        <Navbar />
    <div>
      <IpWhiteList/>
    </div>
    </SidebarInset>
    </SidebarProvider>
  )
}

export default ipwhitelist
