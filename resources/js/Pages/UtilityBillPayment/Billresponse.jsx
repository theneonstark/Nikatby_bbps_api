import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const BillResponse = () => {
  const { operator, canumber, mode, response } = usePage().props;

  const billData = {
    status: response?.status || '',
    message: response?.message || '',
    data: response?.data || {},
  };

  const isSuccess = billData.status.toLowerCase() === 'success';
  const [showModal, setShowModal] = useState(false);

  const handlePayNow = () => {
    // Simulate a payment process (replace with actual request if needed)
    setTimeout(() => {
      setShowModal(true);
    }, 500); // simulate slight delay
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="w-full bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">Bill Details</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div>
                <h2 className="text-sm text-gray-500 uppercase">Operator</h2>
                <p className="text-lg font-medium text-gray-800">{operator}</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-500 uppercase">CA Number</h2>
                <p className="text-lg font-medium text-gray-800">{canumber}</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-500 uppercase">Mode</h2>
                <p className="text-lg font-medium text-gray-800">{mode}</p>
              </div>
              <div>
                <h2 className="text-sm text-gray-500 uppercase">Status</h2>
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {billData.status}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Message</h2>
              <p className="text-gray-700 text-base">{billData.message}</p>
            </div>

            {isSuccess && Object.keys(billData.data).length > 0 ? (
              <div className="border-t pt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Bill Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {Object.entries(billData.data).map(([key, value]) => (
                    <div key={key} className="p-4 border rounded-md bg-gray-50">
                      <h3 className="text-sm text-gray-500">{key}</h3>
                      <p className="text-gray-800 font-medium break-words">{value ?? '-'}</p>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={handlePayNow}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Pay Bill Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 p-6 bg-red-50 border border-red-200 rounded">
                <p className="text-red-700 text-base font-medium">No bill details found.</p>
              </div>
            )}
          </div>
        </div>

        {/* ✅ Payment Success Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
              <p className="text-gray-700 mb-6">Bill paid successfully.</p>
              <button
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default BillResponse;
