import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import ChartArea from "@/components/chart-area"
import Progresses from "@/components/progresses"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Dropdown } from "@/components/dropdown"

import data from "../data.json"

export default function Page() {
  return (
    (<SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <Dropdown />
        <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Main Dashboard</h1>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              
              <SectionCards /> 
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <div className="px-4 lg:px-6">
                <ChartArea />
              </div>

              <DataTable data={data} />
              <div className="px-4 lg:px-6">
              {/* <Progresses />                  */}
              </div>
            </div>
          </div>
        </div>
        </div>
      </SidebarInset>
    </SidebarProvider>)
  );
}
