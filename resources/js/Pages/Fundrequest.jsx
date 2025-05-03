import React, { useState } from 'react';
import axios from 'axios';
import { FaCalendarAlt, FaUpload, FaUniversity, FaMoneyBillWave, FaFileInvoiceDollar } from 'react-icons/fa';
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react';

export default function FundRequest() {
  const { props: inertiaProps } = usePage();
  const user = inertiaProps.auth?.user;
  const [form, setForm] = useState({
    transactionType: '',
    amount: '',
    transactionId: '',
    depositedDate: '',
    bankAccount: '',
    proof: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (!form.transactionType || !form.amount || !form.transactionId || !form.depositedDate || !form.bankAccount || !form.proof) {
      alert("All fields are required.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('transactionType', form.transactionType);
      formData.append('amount', form.amount);
      formData.append('transactionId', form.transactionId);
      formData.append('depositedDate', form.depositedDate);
      formData.append('bankAccount', form.bankAccount);
      formData.append('proof', form.proof);
      if(user.verified !== 1)
      {
        router.visit('/getonboarding')
        return;
      }

      const response = await axios.post('/fundRequest', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Success:', response.data);
      alert("Request submitted successfully.");
    } catch (error) {
      console.error(error);
      alert("Submission failed.");
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
          <form onSubmit={handleSubmit} className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6">
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white text-lg font-bold px-6 py-4 rounded-t-md">
              Fund Request
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 px-6">
              {/* Transaction Type */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold flex items-center gap-2 text-green-600">
                  <FaFileInvoiceDollar /> Transaction Type
                </label>
                <select
                  name="transactionType"
                  required
                  value={form.transactionType}
                  onChange={handleChange}
                  className="mt-2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Select Type</option>
                  <option value="NEFT">NEFT</option>
                  <option value="IMPS">IMPS</option>
                  <option value="RTGS">RTGS</option>
                </select>
              </div>

              {/* Amount */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold flex items-center gap-2 text-blue-600">
                  <FaMoneyBillWave /> Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  required
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Enter Amount"
                  className="mt-2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Transaction ID */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold flex items-center gap-2 text-yellow-600">
                  <FaFileInvoiceDollar /> Transaction ID
                </label>
                <input
                  type="text"
                  name="transactionId"
                  required
                  value={form.transactionId}
                  onChange={handleChange}
                  placeholder="Enter Transaction ID"
                  className="mt-2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Deposited Date */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold flex items-center gap-2 text-purple-600">
                  <FaCalendarAlt /> Deposited Date
                </label>
                <input
                  type="date"
                  name="depositedDate"
                  required
                  value={form.depositedDate}
                  onChange={handleChange}
                  className="mt-2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Bank Account */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold flex items-center gap-2 text-indigo-600">
                  <FaUniversity /> Bank Account
                </label>
                <select
                  name="bankAccount"
                  required
                  value={form.bankAccount}
                  onChange={handleChange}
                  className="mt-2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">Select Bank Account</option>
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="SBI Bank">SBI Bank</option>
                </select>
              </div>

              {/* Upload Proof */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold flex items-center gap-2 text-orange-600">
                  <FaUpload /> Upload Proof
                </label>
                <input
                  type="file"
                  name="proof"
                  required
                  onChange={handleChange}
                  className="mt-2 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-md transition duration-300"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
