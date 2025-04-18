import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const CategoryOperators = () => {
  const { category, operators } = usePage().props;
  const [selectedOperator, setSelectedOperator] = useState('');
  const [caNumber, setCaNumber] = useState('');
  const [mode, setMode] = useState('Online');

  const handleSubmit = (e) => {
    e.preventDefault();

    router.post('/admin/utility-bill-payment/fetch-bill-details', {
      operator: selectedOperator,
      canumber: caNumber,
      mode: mode,
    });
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="p-6 bg-gray-50 min-h-screen">
          <h1 className="text-2xl font-bold mb-6 text-blue-800">
            Select Operator from: {category}
          </h1>

          <div className="w-full">
            <select
              className="w-full p-3 rounded-md border shadow"
              value={selectedOperator}
              onChange={(e) => setSelectedOperator(e.target.value)}
            >
              <option value="">Select Operator</option>
              {operators.map((op, index) => (
                <option key={index} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </div>

          {/* Show form if operator is selected */}
          {selectedOperator && (
            <form
              onSubmit={handleSubmit}
              className="mt-6 p-4 bg-white rounded shadow-md space-y-4"
            >
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Operator
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded border bg-gray-100"
                  value={selectedOperator}
                  disabled
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  CA Number
                </label>
                <input
                  type="text"
                  className="w-full p-3 rounded border"
                  value={caNumber}
                  onChange={(e) => setCaNumber(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Mode
                </label>
                <select
                  className="w-full p-3 rounded border"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
              >
                Fetch Bill Details
              </button>
            </form>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CategoryOperators;
