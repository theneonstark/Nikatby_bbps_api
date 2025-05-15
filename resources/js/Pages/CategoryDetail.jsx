// resources/js/Pages/CategoryDetail.jsx
import React from 'react';
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { router } from '@inertiajs/core';

export default function CategoryDetail({ category, services }) {
  const handleCategoryClick = (blr_name) => {
    console.log("Biller name:",blr_name);
    
      router.post(`/bill/biller/${encodeURIComponent(blr_name)}`);  
    };
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        {category} Services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200"
            onClick={() => handleCategoryClick(service.blr_name)}
          >
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">{service.blr_name}</h2>
            
            <p className="text-gray-600 text-sm">
              {/* Optional description if available */}
              {service.description || "No description provided."}
            </p>
          </div>
        ))}
      </div>
    </div>
    </SidebarInset>
    </SidebarProvider>
  );
}

