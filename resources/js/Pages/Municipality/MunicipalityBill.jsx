import React, { useState } from "react";
import axios from "axios";
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const MunicipalityBill = ({ response }) => {
  const [billData, setBillData] = useState({
    canumber: "",
    operator: "",
    amount: "",
    ad1: "",
    ad2: "",
    ad3: "",
    referenceid: "",
    latitude: "",
    longitude: "",
  });

  const [paymentResponse, setPaymentResponse] = useState(response || null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setBillData({ ...billData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/Municipality/pay-bill", billData);
      console.log(data);
      setPaymentResponse(data);
    } catch (error) {
      console.error("Payment failed", error);
      setPaymentResponse({ message: "Payment failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="w-full min-h-screen bg-gray-100 p-6">
          <div className="bg-white shadow-md rounded-lg p-6 w-full h-full">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Municipality Bill Payment</h1>

            {/* Bill Payment Form */}
            <form onSubmit={handlePayment} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {Object.keys(billData).map((key) => (
                <div key={key} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    {key.replace(/_/g, " ").toUpperCase()}
                  </label>
                  <input
                    type={["amount", "referenceid", "operator"].includes(key) ? "number" : "text"}
                    name={key}
                    value={billData[key]}
                    onChange={handleChange}
                    required
                    className="border rounded p-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${key}`}
                  />
                </div>
              ))}

              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className={`bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Pay Bill"}
                </button>
              </div>
            </form>

            {/* Payment Response */}
            {paymentResponse && (
              <div className="p-4 bg-gray-50 border rounded-lg overflow-x-auto">
                <h2 className="text-lg font-semibold mb-3 text-gray-800">Payment Response</h2>
                <table className="w-full border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-200 text-gray-800">
                      {Object.keys(paymentResponse).map((key, index) => (
                        <th key={index} className="px-4 py-2 border border-gray-300 font-medium">
                          {key.replace(/_/g, " ").toUpperCase()}
                        </th>
                      ))}
                      {paymentResponse.data &&
                        Object.keys(paymentResponse.data).map((key, index) => (
                          <th key={`data-${index}`} className="px-4 py-2 border border-gray-300 font-medium">
                            DATA: {key.replace(/_/g, " ").toUpperCase()}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white text-gray-700">
                      {Object.values(paymentResponse).map((value, index) => (
                        <td key={index} className="px-4 py-2 border border-gray-300">
                          {typeof value === "boolean"
                            ? value ? "✅ Yes" : "❌ No"
                            : typeof value === "object"
                            ? JSON.stringify(value, null, 2)
                            : value}
                        </td>
                      ))}
                      {paymentResponse.data &&
                        Object.values(paymentResponse.data).map((value, index) => (
                          <td key={`data-${index}`} className="px-4 py-2 border border-gray-300">
                            {typeof value === "boolean"
                              ? value ? "✅ Yes" : "❌ No"
                              : typeof value === "object"
                              ? JSON.stringify(value, null, 2)
                              : value}
                          </td>
                        ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MunicipalityBill;
