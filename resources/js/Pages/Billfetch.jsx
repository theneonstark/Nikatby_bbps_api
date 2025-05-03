import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const BillFetch = () => {
  const [billDetails, setBillDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMobile, setSelectedMobile] = useState("Cash");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState([]);

  const mobileOptions = ["Cash", "PhonePe", "Card"];

  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const response = await axios.get("/bill/fetchbill");
        setBillDetails(response.data);
      } catch (err) {
        setError("Failed to fetch bill data");
      } finally {
        setLoading(false);
      }
    };
    fetchBillDetails();
  }, []);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get("/bill/paybill");
        
        setPaymentDetails(response.data);
        console.log(paymentDetails.dat);
      } catch (err) {
        setError("Failed to fetch payment data");
      }
    };
    fetchPaymentDetails();
  }, []);

  const handleDownloadPDF = async () => {
    const popupContent = document.getElementById('payment-popup');
    
    if (!popupContent) return;
  
    try {
      const canvas = await html2canvas(popupContent, {
        useCORS: true,
        scrollX: 0,
        scrollY: -window.scrollY,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Receipt_${paymentDetails.data.txnRefId || 'payment'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 w-full">
          <div className="bg-white shadow-md rounded-lg p-6 w-full">
            <h2 className="text-3xl font-semibold mb-4 text-center">Bill Fetch</h2>
            <p className="text-gray-600 mb-6 text-center">Your Bill Details. Check, Confirm & Pay.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Biller Name", value: billDetails.billerName },
                { label: "A", value: billDetails.a },
                { label: "A B", value: billDetails.ab },
                { label: "A B C", value: billDetails.abc },
                { label: "A B C D", value: billDetails.abcd },
                { label: "A B C D E", value: billDetails.abcde },
                { label: "Customer Name", value: billDetails.customerName },
                { label: "Bill Date", value: billDetails.billDate },
                { label: "Due Date", value: billDetails.dueDate },
                { label: "Bill Number", value: billDetails.billNumber },
                { label: "Mobile Number", value: billDetails.mobileNumber },
                { label: "Bill Amount", value: billDetails.billAmount },
                { label: "Late Payment Fee", value: billDetails.latePaymentFee },
                { label: "Additional Charges", value: billDetails.additionalCharges },
                { label: "Total Amount", value: billDetails.totalAmount },
                { label: "Transaction Status", value: billDetails.transactionStatus },
                { label: "Approval Number", value: billDetails.approvalNumber },
              ].map((item, index) => (
                <div key={index}>
                  <label className="block font-medium text-sm">{item.label}</label>
                  <input type="text" className="w-full p-2 border rounded-md bg-gray-100 text-sm" value={item.value || ""} disabled />
                </div>
              ))}

              <div>
                <label className="block font-medium text-sm">Select Payment Mode</label>
                <select
                  className="w-full p-2 border rounded-md bg-gray-100 text-sm"
                  value={selectedMobile}
                  onChange={(e) => setSelectedMobile(e.target.value)}
                >
                  {mobileOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="bg-green-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-700"
                onClick={() => setShowPopup(true)}
              >
                PAY
              </button>
              <button
                className="bg-red-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-600"
                onClick={() => window.history.back()}
              >
                Back
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <motion.div 
                id="payment-popup"
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
                  <span className="text-sm text-gray-900">{paymentDetails.data.txnRefId}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">BILLER ID:</span>
                  <span className="text-sm text-gray-900">{paymentDetails.data.requestId}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">BILLER NAME:</span>
                  <span className="text-sm text-gray-900">{billDetails.billerName}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">CUSTOMER NAME:</span>
                  <span className="text-sm text-gray-900">{paymentDetails.data.RespCustomerName}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">CUSTOMER NUMBER:</span>
                  <span className="text-sm text-gray-900">786463673883893</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">BILL DATE:</span>
                  <span className="text-sm text-gray-900">{paymentDetails.data.RespBillDate}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">BILL PERIOD:</span>
                  <span className="text-sm text-gray-900">{paymentDetails.data.RespBillPeriod}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">BILL NUMBER:</span>
                  <span className="text-sm text-gray-900">{paymentDetails.data.RespBillNumber}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">DUE DATE:</span>
                  <span className="text-sm text-gray-900">{paymentDetails.data.RespDueDate}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">BILL AMOUNT</span>
                  <span className="text-sm text-gray-900">{paymentDetails.data.RespAmount}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">CCF:</span>
                  <span className="text-sm text-gray-900">CCF00076554</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">TOTAL AMOUNT:</span>
                  <span className="text-sm text-gray-900">{paymentDetails.data.RespAmount}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">DATE & TIME:</span>
                  <span className="text-sm text-gray-900">{paymentDetails.dat}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">INITIATING CHANNEL:</span>
                  <span className="text-sm text-gray-900">Not Available</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">PAYMENT MODE:</span>
                  <span className="text-sm text-gray-900">Online</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">TRANSACTION STATUS</span>
                  <span className="text-sm text-gray-900">{paymentDetails.data.responseReason}</span>
                </div>
                <div className="flex justify-between border-b py-1">
                  <span className="font-medium capitalize text-sm text-gray-700">APPROVAL NUMBER:</span>
                  <span className="text-sm text-gray-900">{paymentDetails.data.approvalRefNumber}</span>
                </div>
              </div>

                <div className="flex justify-between mt-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDownloadPDF}
                    className="bg-blue-600 text-white px-2 py-2 rounded-md shadow-md hover:bg-blue-700"
                  >
                    Download Receipt
                  </motion.button>
                  <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-green-600 text-white px-2 py-2 rounded-md shadow-md hover:bg-green-700"
                >
                  <a href="/billSuccess">View Receipt</a>
                </motion.button>

                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-red-500 text-white px-2 py-2 rounded-md shadow-md hover:bg-red-600"
                    onClick={() => setShowPopup(false)}
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default BillFetch;
