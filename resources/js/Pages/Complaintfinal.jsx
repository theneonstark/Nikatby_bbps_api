import React from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const ComplaintStatusResult = () => {
  const complaintDetails = {
    agentId: "XYZ Bank",
    complaintId: "CC0125043772351",
    status: "SUCCESS",
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 w-full">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl text-center"
          >
            <h2 className="text-2xl font-semibold mb-4">Check Complaint Status</h2>
            <div className="border rounded-lg p-6">
              <motion.img 
                src="/avatar.png" 
                alt="User Avatar" 
                className="w-20 h-20 rounded-full mx-auto mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <h3 className="text-xl font-medium">Hey, user@123</h3>
              <p className="text-gray-500 mb-4">Your Complaint Status</p>
              <div className="w-full max-w-lg mx-auto">
                {Object.entries(complaintDetails).map(([key, value]) => (
                  <motion.div 
                    key={key} 
                    className="flex justify-between py-2 border-b"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-gray-900">{value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ComplaintStatusResult;