import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const ComplaintRegistrationResult = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-200 w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-4xl text-center border border-gray-300"
          >
            <Avatar className="w-24 h-24 mx-auto mb-6 shadow-lg" src="/user-avatar.png" alt="User Avatar" />
            <h2 className="text-2xl font-bold text-blue-700">Hey, user@123</h2>
            <p className="text-gray-600 mb-6">Your Complaint is Registered Successfully</p>
            
            <div className="border-t pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="font-medium text-gray-700">Complaint Assigned</div>
                <div className="text-gray-900">XYZ Bank</div>
                <div className="font-medium text-gray-700">Complaint Id</div>
                <div className="text-gray-900">CC0125043772351</div>
                <div className="font-medium text-gray-700">Complaint Status</div>
                <div className="text-green-600 font-semibold">SUCCESS</div>
              </div>
            </div>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ComplaintRegistrationResult;
