import React, { useState } from "react";
import axios from "axios";
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { usePage, router } from "@inertiajs/react";

const DoRechargeForm = () => {
  const { props: inertiaProps } = usePage();
  const user = inertiaProps.auth?.user;

  const [formData, setFormData] = useState({
    operator: "",
    canumber: "",
    amount: "",
    referenceid: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setApiResponse(null);

    try {
      if (user?.verified !== 1) {
        router.visit('/getonboarding');
        return;
      }

      // Call YOUR OWN BACKEND, not Paysprint directly
      const response = await axios.post('/Recharge/processRecharge  ', {
        operator: formData.operator,
        canumber: formData.canumber,
        amount: formData.amount,
        referenceid: formData.referenceid || Date.now().toString(),
      });

      console.log('Server Response:', response.data);
      setApiResponse(response.data);

      if (response.data.status === true) {
        setSuccess(response.data.message || "Recharge processed successfully!");
        setFormData({
          operator: "",
          canumber: "",
          amount: "",
          referenceid: ""
        });
      } else {
        setError(response.data.message || "Recharge failed.");
      }

    } catch (err) {
      console.error('Error:', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.errors || "Recharge failed.";
      setError(typeof errorMessage === 'object' ? JSON.stringify(errorMessage) : errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Do Recharge</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="operator" className="block text-sm font-medium text-gray-700">
                    Operator
                  </label>
                  <input
                    id="operator"
                    type="number"
                    value={formData.operator}
                    onChange={(e) => handleChange("operator", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter Operator ID"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="canumber" className="block text-sm font-medium text-gray-700">
                    CA Number
                  </label>
                  <input
                    id="canumber"
                    type="text"
                    value={formData.canumber}
                    onChange={(e) => handleChange("canumber", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter CA Number"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Amount
                  </label>
                  <input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    min="1"
                    placeholder="Enter Amount"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="referenceid" className="block text-sm font-medium text-gray-700">
                    Reference ID
                  </label>
                  <input
                    id="referenceid"
                    type="text"
                    value={formData.referenceid}
                    onChange={(e) => handleChange("referenceid", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Reference ID (Optional)"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
                  {success}
                </div>
              )}

              {apiResponse && (
                <div className="p-4 bg-gray-50 border rounded-md">
                  <h3 className="font-semibold mb-2">API Response:</h3>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(apiResponse).map(([key, value]) => (
                        <tr key={key}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{key}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Process Recharge"}
              </button>
            </form>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DoRechargeForm;
