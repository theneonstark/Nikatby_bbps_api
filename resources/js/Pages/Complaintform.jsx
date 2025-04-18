import React from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const ComplaintForm = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex items-start justify-center min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-200 w-full">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-xl rounded-lg p-8 w-full max-w-6xl mt-6"
          >
            <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Raise Complaint</h2>
            <p className="text-gray-600 mb-6 text-center">Transaction Type Complaint</p>

            <div className="border p-6 rounded-md bg-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block font-medium">Enter Mobile Number</label>
                  <input type="text" className="w-full p-3 border rounded-md bg-white shadow-sm" placeholder="Mobile" />
                </div>
                <div>
                  <label className="block font-medium">From</label>
                  <input type="date" className="w-full p-3 border rounded-md bg-white shadow-sm" />
                </div>
                <div>
                  <label className="block font-medium">To</label>
                  <input type="date" className="w-full p-3 border rounded-md bg-white shadow-sm" />
                </div>
              </div>

              <div className="text-center my-6 text-gray-500 font-semibold">-- OR --</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium">Transaction Ref ID</label>
                  <input type="text" className="w-full p-3 border rounded-md bg-white shadow-sm" placeholder="Transaction Ref ID" />
                </div>
                <div>
                  <label className="block font-medium">Complaint Disposition</label>
                  <select className="w-full p-3 border rounded-md bg-white shadow-sm">
                    <option>- Select -</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block font-medium">Complaint Description</label>
                <textarea className="w-full p-3 border rounded-md bg-white shadow-sm" placeholder="Complaint Description"></textarea>
              </div>

              <div className="mt-6 text-right">
                <motion.a href="/userpanel3/public/complaintRResult" whileHover={{ scale: 1.05 }}>
                  <button className="bg-green-600 text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-700 transition-all">Submit</button>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ComplaintForm;
