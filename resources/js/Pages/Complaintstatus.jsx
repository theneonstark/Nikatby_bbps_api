import React, { useState } from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const ComplaintStatusForm = () => {
  const [complaintId, setComplaintId] = useState("");
  const [complaintType, setComplaintType] = useState("");

  return (
    <SidebarProvider>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl"
      >
        <h2 className="text-2xl font-semibold mb-2">Check Complaint Status</h2>
        <p className="text-gray-600 mb-6">Step 1. Enter Complaint ID and Select Type of Complaint</p>
        
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-sm text-gray-700">Complaint ID</label>
            <input 
              type="text" 
              className="w-full p-3 border rounded-md bg-gray-100 text-lg" 
              placeholder="Complaint Id"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-sm text-gray-700">Type of Complaint</label>
            <select 
              className="w-full p-3 border rounded-md bg-gray-100 text-lg" 
              value={complaintType} 
              onChange={(e) => setComplaintType(e.target.value)}
            >
              <option value="">- Select -</option>
              <option value="Transaction">Transaction</option>
              <option value="Service">Service</option>
            </select>
          </div>
        </div>
        <a href="/checkstatus">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 w-full bg-teal-500 text-white py-3 rounded-md shadow-md hover:bg-teal-600 text-lg"
        >
          Submit
        </motion.button>
        </a>
      </motion.div>
    </div>
    </SidebarInset>
        </SidebarProvider>
  );
};

export default ComplaintStatusForm;
