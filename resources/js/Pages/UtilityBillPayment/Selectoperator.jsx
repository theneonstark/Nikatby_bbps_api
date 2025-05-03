import React, { useState, useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
// import { usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react';

const CategoryOperators = () => {
  const { props: inertiaProps } = usePage();
  const user = inertiaProps.auth?.user;
  const { category, operators } = usePage().props;
  const [selectedOperator, setSelectedOperator] = useState('');

  const {
    data,
    setData,
    post,
    processing,
    errors,
    reset,
  } = useForm({
    operator: '',
    canumber: '',
    mode: 'Online',
  });

  // Sync selectedOperator into the form data
  useEffect(() => {
    setData('operator', selectedOperator);
  }, [selectedOperator]);

  const handleSubmit = (e) => {
    if(user.verified !== 1)
     {
      router.visit('/getonboarding')
      return;
     }
    e.preventDefault();
    post('/admin/utility-bill-payment/fetch-bill-details');
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
            {errors.operator && (
              <p className="text-red-500 text-sm mt-1">{errors.operator}</p>
            )}
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
                  value={data.canumber}
                  onChange={(e) => setData('canumber', e.target.value)}
                  required
                />
                {errors.canumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.canumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Mode
                </label>
                <select
                  className="w-full p-3 rounded border"
                  value={data.mode}
                  onChange={(e) => setData('mode', e.target.value)}
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
                {errors.mode && (
                  <p className="text-red-500 text-sm mt-1">{errors.mode}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
              >
                {processing ? 'Fetching...' : 'Fetch Bill Details'}
              </button>
            </form>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CategoryOperators;
