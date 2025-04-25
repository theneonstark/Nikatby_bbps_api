// import React, { useState } from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";


const BillFetch = () => {
  // const [showPopup, setShowPopup] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  // const [selectedMobile, setSelectedMobile] = useState("989899084");

  const [billDetails, setBillDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMobile, setSelectedMobile] = useState("989899084");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



   // 🚀 Fetch bill details when component mounts
   useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const response = await axios.post("/bill/fetchbill");
        console.log(response.data); // Replace with your actual endpoint
        setBillDetails(response.data);
      } catch (err) {
        setError("Failed to fetch bill data");
      } finally {
        setLoading(false);
      }
    };

    fetchBillDetails();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }


  // const billDetails = {
  //   id: "CC015043BAAE00070142",
  //   bid: "OTME00005XXZ43",
  //   customerNumber: "9878767891",
  //   bd: "2015-06-14",
  //   bp: "june",
  //   bn: "120303",
  //   dd: "2015-06-20",
  //   ba: "1000",
  //   cc: "0",
  //   ta: "1500",
  //   dt: "2/12/2025",
  //   ic: "MOB",
  //   pm: "Cash",
  //   // an: "142345677",
  //   billerName: "OTME",  
  //   a: "10",
  //   ab: "20",
  //   abc: "30",
  //   abcd: "40",
  //   abcde: "50",
  //   customerName: "Bharat Connect",
  //   billDate: "2015-06-14",
  //   dueDate: "2015-06-20",
  //   billNumber: "12303",
  //   mobileNumber: "989899084",
  //   billAmount: "1000",
  //   latePaymentFee: "40",
  //   additionalCharges: "60",
  //   totalAmount: "1000",
  //   transactionStatus: "Success",
  //   approvalNumber: "12345037",
  // };

  const mobileOptions = ["Cash", "PhonePe", "Card"];

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 w-full">
          <div className="bg-white shadow-md rounded-lg p-6 w-full">
            <h2 className="text-3xl font-semibold mb-4 text-center">Bill Fetch</h2>
            <p className="text-gray-600 mb-6 text-center">Your Bill Details. Check, Confirm & Pay.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium capitalize text-sm">Biller Name</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.billerName} disabled />
              </div>
              <div>
                <label className="block font-medium capitalize text-sm">A</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.a} disabled />
              </div>
              <div>
                <label className="block font-medium capitalize text-sm">A B</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.ab} disabled />
              </div>
              <div>
                <label className="block font-medium capitalize text-sm">A B C</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.abc} disabled />
              </div>
              <div>
                <label className="block font-medium capitalize text-sm">A B C D</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.abcd} disabled />
              </div>
              <div>
                <label className="block font-medium capitalize text-sm">A B C D E</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.abcde} disabled />
              </div>
              <div>
                <label className="block font-medium capitalize text-sm">Customer Name</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.customerName} disabled />
              </div>
              <div>
                <label className="block font-medium capitalize text-sm">Bill Date</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.billDate} disabled />
              </div>
              <div>
                <label className="block font-medium capitalize text-sm">Due Date</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.dueDate} disabled />
              </div>
              <div>
                <label className="block font-medium capitalize text-sm">Bill Number</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.billNumber} disabled />
              </div>

              {/* Mobile Number - Regular Input */}
              <div>
                <label className="block font-medium capitalize text-sm">Mobile Number</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.mobileNumber} disabled />
              </div>

              {/* Mobile Number - Dropdown */}
              <div>
                    <label className="block font-medium capitalize text-sm">Select Biller</label>
                    <select 
                    className="w-full p-2 border rounded-md bg-gray-100 text-sm"
                    value={selectedMobile}
                    onChange={(e) => setSelectedMobile(e.target.value)}
                  >
                    {mobileOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
              </div>

              <div>
                <label className="block font-medium capitalize text-sm">Bill Amount</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.billAmount} disabled />
              </div>
              <div>
                <label className="block font-medium capitalize text-sm">Late Payment Fee</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.latePaymentFee} disabled />
              </div>
              <div>
                <label className="block font-medium capitalize text-sm">Additional Charges</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.additionalCharges} disabled />
              </div>
              <div>
                <label className="block font-medium capitalize text-sm">Total Amount</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.totalAmount} disabled />
              </div>
              <div>
                <label className="block font-medium capitalize text-sm">Transaction Status</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.transactionStatus} disabled />
              </div>
              <div>
                <label className="block font-medium capitalize text-sm">Approval Number</label>
                <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={billDetails.approvalNumber} disabled />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button 
                className="bg-green-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-700"
                onClick={() => setShowPopup(true)}
              >
                PAY
              </button>
              <button className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600">Back</button>
            </div>
          </div>
        </div>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
              <h2 className="text-xl font-semibold mb-4 text-center text-green-700">Payment Successful</h2>
              <div className="mb-4">
               <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">B-CONNECT TXN ID:</span>
                  <span className="text-sm text-gray-900">{billDetails.id}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">BILLER ID:</span>
                  <span className="text-sm text-gray-900">{billDetails.bid}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">BILLER NAME:</span>
                  <span className="text-sm text-gray-900">{billDetails.billerName}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">CUSTOMER NAME:</span>
                  <span className="text-sm text-gray-900">{billDetails.customerName}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">CUSTOMER NUMBER:</span>
                  <span className="text-sm text-gray-900">{billDetails.customerNumber}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">BILL DATE:</span>
                  <span className="text-sm text-gray-900">{billDetails.bd}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">BILL PERIOD:</span>
                  <span className="text-sm text-gray-900">{billDetails.bp}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">BILL NUMBER:</span>
                  <span className="text-sm text-gray-900">{billDetails.bn}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">DUE DATE:</span>
                  <span className="text-sm text-gray-900">{billDetails.dd}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">BILL AMOUNT</span>
                  <span className="text-sm text-gray-900">{billDetails.ba}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">CCF:</span>
                  <span className="text-sm text-gray-900">{billDetails.cc}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">TOTAL AMOUNT:</span>
                  <span className="text-sm text-gray-900">{billDetails.ta}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">DATE & TIME:</span>
                  <span className="text-sm text-gray-900">{billDetails.dt}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">INITIATING CHANNEL:</span>
                  <span className="text-sm text-gray-900">{billDetails.ic}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">PAYMENT MODE:</span>
                  <span className="text-sm text-gray-900">{billDetails.pm}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">TRANSACTION STATUS</span>
                  <span className="text-sm text-gray-900">{billDetails.transactionStatus}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">APPROVAL NUMBER:</span>
                  <span className="text-sm text-gray-900">{billDetails.approvalNumber}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-green-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-700"
                >
                  <a href="/billSuccess">View Receipt</a>
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default BillFetch;
