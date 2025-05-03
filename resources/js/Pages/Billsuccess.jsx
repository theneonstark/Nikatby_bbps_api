// import React from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";

const BillSuccess = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get("/bill/paybill");
        console.log(response.data);
        
        
        setPaymentDetails(response.data);
        console.log(paymentDetails.data);
      } catch (err) {
        setError("Failed to fetch payment data");
      }
    };
    fetchPaymentDetails();
  }, []);
  const successDetails = {
    transactionIds: "CC015043BAAE0007142",
    billerId: "OTME00005XXZ43",
    billerName: "OTME",
    customerName: "Bharat Connect",
    customerNumber: "989899084",
    billDate: "2015-06-14",
    billPeriod: "June",
    billNumber: "12303",
    dueDate: "2015-06-20",
    billAmount: "1000",
    totalAmount: "1000",
    ccf: "0",
    dateTime: "2/12/2025 10:57:23 AM",
    initiatingChannel: "AGT",
    paymentMode: "Cash",
    transactionStatus: "Success",
    approvalNumber: "12345037",
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex items-center justify-center min-h-screen p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 w-full">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-xl rounded-lg p-6 w-full max-w-lg text-center"
          >
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Payment Successful</h2>
            <div className="flex justify-center mb-4">
              <motion.img 
                src="/path-to-logo.png" 
                alt="Success Logo" 
                className="w-16 h-16"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="border border-gray-300 rounded-md p-4 text-left">
              {Object.entries(successDetails).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b px-4 py-2 text-gray-700">
                  <span className="font-medium capitalize text-sm">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-sm">{value}</span>
                </div>
              ))}
            </div>
            
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default BillSuccess;
