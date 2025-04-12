import React, { useState } from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const FormPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBiller, setSelectedBiller] = useState("");
  const [billers, setBillers] = useState([]);

  const categories = {
    "Prepaid Meter": ["OTME", "XYZ Meter"],
    "Postpaid Meter": ["ABC Electricity", "PQR Energy"],
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setBillers(categories[category] || []);
    setSelectedBiller("");
  };

  const handleBillerChange = (event) => {
    setSelectedBiller(event.target.value);
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col items-center p-6 bg-gradient-to-r text-white-100 min-h-screen w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-lg w-full max-w-full border border-gray-200"
          >
            <p className="mb-4 text-lg font-bold text-gray-800 text-center">
              Please Select Your Biller Category and Biller
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Biller Category</label>
                <select
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 transition-all bg-gray-50 hover:bg-white"
                >
                  <option value="">Select Category</option>
                  {Object.keys(categories).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Select Biller</label>
                <select
                  onChange={handleBillerChange}
                  value={selectedBiller}
                  disabled={!selectedCategory}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 transition-all bg-gray-50 hover:bg-white disabled:bg-gray-200"
                >
                  <option value="">Select Biller</option>
                  {billers.map((biller, index) => (
                    <option key={index} value={biller}>{biller}</option>
                  ))}
                </select>
              </div>
            </div>

            {selectedCategory && selectedBiller && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200 w-full"
              >
                <p className="text-lg font-semibold text-gray-800">Enter Details</p>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  {["Customer ID", "Field A", "Field B", "Field C", "Field D", "Field E"].map((label, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700">{label}</label>
                      <input 
                        type="text" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition-all bg-gray-50 hover:bg-white" 
                        placeholder={`Enter ${label}`} 
                      />
                    </div>
                  ))}
                </div>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/billFetch"
                  className="mt-6 block text-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-md w-full"
                >
                  Fetch Bill
                </motion.a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default FormPage;
