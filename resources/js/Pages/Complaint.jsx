import React from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Complaints = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex items-start justify-center min-h-screen p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 w-full">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-xl rounded-lg p-6 w-full max-w-5xl text-center mt-10"
          >
            <h2 className="text-2xl font-semibold mb-6 text-blue-700">Complaint Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.a href="/complaintFrom" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <div className="bg-white shadow-md rounded-lg p-6 text-center border cursor-pointer hover:shadow-lg transition duration-300">
                  <span className="text-teal-600 font-semibold">Complaint Registration</span>
                </div>
              </motion.a>
              <a href="/queryTransaction">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white shadow-md rounded-lg p-6 text-center border cursor-pointer hover:shadow-lg transition duration-300">
                <span className="text-teal-600 font-semibold">Complaint Tracking</span>
              </motion.div>
              </a>
              <a href="/trackComplaintStatus">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white shadow-md rounded-lg p-6 text-center border cursor-pointer hover:shadow-lg transition duration-300">
                <span className="text-teal-600 font-semibold">Search Transaction</span>
              </motion.div>
              </a>
            </div>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Complaints;
