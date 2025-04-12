import FundRequest from '@/Components/FundRequest/fundrequests'
import React from 'react'
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Navbar from "@/Layouts/newLayout/navbar";

function fundRequest() {
  return (
     <SidebarProvider>
         <AppSidebar variant="inset" />
         <SidebarInset>
          <Navbar />
    <div>
      <FundRequest/>
    </div>
     </SidebarInset>
                        </SidebarProvider>
  )
}

export default fundRequest
