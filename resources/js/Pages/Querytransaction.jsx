import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const QueryTransaction = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [transactionRef, setTransactionRef] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasAbove = mobileNumber && fromDate && toDate;
    const hasBelow = transactionRef;

    if (!hasAbove && !hasBelow) {
      setError("Please fill either Mobile + From + To or Transaction Ref ID.");
      return;
    }

    setError(""); // clear error

    const formData = {
      mobile: mobileNumber,
      from: fromDate,
      to: toDate,
      refId: transactionRef,
    };

    try {
      const response = await axios.post("/bill/transactionStatus", formData);
      console.log("Success:", response.data);
      // Navigate to result page or show popup as needed
      if(response){
      window.location.href = "/transactiondetails"; // or use router
      }
    } catch (err) {
      console.error("Error submitting form:", err.response?.data || err.message);
      setError("Failed to submit query.");
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
          <motion.div 
            initial={{ opacity: 0, y: -50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl"
          >
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
              Query Transaction
            </h2>
            <p className="text-gray-600 text-center mb-6">
              You can verify the status of your online transaction by entering your Mobile Number and Transaction reference ID.
            </p>

            {error && (
              <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Enter Mobile Number</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md bg-gray-100 text-sm" 
                    placeholder="Mobile"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">From</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded-md bg-gray-100 text-sm"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">To</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border rounded-md bg-gray-100 text-sm"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center my-4 text-gray-500 text-sm font-medium">
                <span className="w-full border-b border-gray-300"></span>
                <span className="px-2">OR</span>
                <span className="w-full border-b border-gray-300"></span>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Transaction Ref ID</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded-md bg-gray-100 text-sm" 
                  placeholder="Transaction Ref ID"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-teal-600 text-white py-2 rounded-md shadow-md hover:bg-teal-700"
              >
                Submit
              </motion.button>
            </form>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default QueryTransaction;
