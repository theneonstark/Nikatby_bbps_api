import React from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Avatar } from "@/components/ui/avatar";

const TransactionDetails = () => {
  const transactionData = {
    username: "user@123",
    agentId: "CC01CC01513515340681",
    billAmount: "1000",
    transactionDate: "2/12/2025 5:30:21 AM",
    txnRefId: "CC015043BAAE00070142",
    transactionStatus: "AWAITED",
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl text-center"
          >
            <h2 className="text-xl font-semibold mb-4 text-left border-b pb-2">Your Transaction Details</h2>
            <div className="flex flex-col items-center p-6">
              <Avatar className="h-20 w-20 mb-4" />
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-semibold"
              >
                Hey, {transactionData.username}
              </motion.h3>
              <p className="text-gray-500">Your Transaction Details</p>
            </div>
            <div className="mt-4">
              {Object.entries(transactionData).slice(1).map(([key, value]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-between border-b py-2 text-gray-700"
                >
                  <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span>{value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default TransactionDetails;
