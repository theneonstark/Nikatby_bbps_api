import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { billFetch } from '@/lib/apis';
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { router } from '@inertiajs/core';
import axios from 'axios';

export default function ProceedtofetchBill({ data }) {
  const [biller, setBiller] = useState(null);
  const [fetchedBill, setFetchedBill] = useState(null);
  const [noPendingAmount, setNoPendingAmount] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [billerName, setBillerName] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success'); // or 'error'


  useEffect(() => {
    if (data) {
      setBiller(data);
    }
  }, [data]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 20000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const { data: formData, setData, post } = useForm(() => {
    const initialData = {};
    const inputs = Array.isArray(data?.billerInputParams?.paramInfo)
      ? data.billerInputParams.paramInfo
      : data?.billerInputParams?.paramInfo
        ? [data.billerInputParams.paramInfo]
        : [];

    inputs.forEach((input) => {
      initialData[input.paramName] = input.paramValue || '';
    });

    initialData['billerId'] = data?.billerId || '';
    return initialData;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await billFetch(formData);
      if ((response?.arrayData?.billerResponse?.billAmount ?? 0) / 100 === 0) {
        setNoPendingAmount(true);
        setFetchedBill(null);
      } else {
        setRequestId(response.requestId);
        setBillerName(data.billerName);
        setNoPendingAmount(false);
        setFetchedBill(response.arrayData);
      }
    } catch (err) {
      console.error('Bill fetch failed:', err);
      setMessage('Failed to fetch bill. Please try again.');
    }
  };

  const handlePayNow = async () => {
    try {
      const response = await axios.post('/bill/paybill', {
        ...formData,
        fetchedBill,
        requestId,
        billerName,
      });
      console.log(response.data.errorMsg);
      
      if(response.data.errorMsg){
        alert('Insufficent Balance');
        setMessage(response.data.errorMsg || 'Insuffient Amount');
        setMessageType('error');
      }
      else{
        if(response.data.successMsg){
          alert('Successfully Paid');
          setMessage(response.data.successMsg || 'Payment completed successfully.');
          setMessageType('success');
        }
        else{
          setMessageType('error');
        }
      }
    
      // setMessage(response || 'Payment completed successfully.');
      // console.log("heqbfgubefgyulal:", messageType);
      
      // if(messageType == 'error'){
      // setMessageType('error');}
      // else{
      //   setMessageType('success');
      // }
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Payment failed. Please try again.');
      setMessageType('error');
    }
    
  };

  const handleInputChange = (paramName, value) => {
    setData(paramName, value);
  };

  const billinputs = Array.isArray(data?.billerInputParams?.paramInfo)
    ? data.billerInputParams.paramInfo
    : data?.billerInputParams?.paramInfo
      ? [data.billerInputParams.paramInfo]
      : [];

  if (!biller) {
    return <div className="p-6 max-w-3xl mx-auto">Loading...</div>;
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />

        {message && (
          <div
            className={`
              fixed top-6 right-6 left-6 sm:left-auto sm:w-[420px] max-w-full px-6 py-4 rounded-lg shadow-2xl z-50 animate-slide-in
              ${messageType === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}
            `}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">
                  {messageType === 'success' ? '✅' : '❌'}
                </span>
                <span className="text-lg font-medium">{message}</span>
              </div>
              <button
                onClick={() => setMessage('')}
                className="text-white text-xl font-bold hover:text-gray-300 ml-4"
              >
                ×
              </button>
            </div>
          </div>
        )}


        <div className="p-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">{biller.billerName}</h1>
          {billinputs.length === 0 ? (
            <p className="text-gray-500">No input fields required for this biller.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {billinputs.map((input) => (
                <div key={input.paramName} className="flex flex-col">
                  <label className="mb-1 font-medium capitalize">
                    {input.paramName.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="text"
                    value={formData[input.paramName] || ''}
                    onChange={(e) => handleInputChange(input.paramName, e.target.value)}
                    className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Enter ${input.paramName}`}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Fetch Bill
              </button>
            </form>
          )}

          {/* === Conditional Bill Info === */}
          {noPendingAmount && (
            <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded">
              No bill amount is pending.
            </div>
          )}

          {fetchedBill && !noPendingAmount && (
            <div className="mt-6 bg-white shadow rounded p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-700 mb-4">Bill Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailRow label="Biller Name" value={biller.billerName} />
                <DetailRow label="Consumer Name" value={fetchedBill.billerResponse.customerName} />
                <DetailRow label="CA Number" value={fetchedBill.billerResponse.billNumber} />
                <DetailRow label="Division" value={fetchedBill?.additionalInfo?.info?.[0]?.infoValue ?? 'N/A'} />
                <DetailRow label="LT/HT" value={fetchedBill?.additionalInfo?.info?.[1]?.infoValue ?? 'N/A'} />
                <DetailRow label="Bill Amount" value={`₹${(fetchedBill.billerResponse.billAmount) / 100 ?? 0}`} />
                <DetailRow label="Bill Date" value={fetchedBill.billerResponse.billDate} />
                <DetailRow label="Bill Number" value={fetchedBill.billerResponse.billNumber.slice(-12)} />
                <DetailRow label="Bill Period" value={fetchedBill.billerResponse.billPeriod} />
                <DetailRow label="Due Date" value={fetchedBill.billerResponse.dueDate} />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handlePayNow}
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Pay Now
                </button>
              </div>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

// 🔹 Reusable Detail Row Component
function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between border-b pb-1">
      <span className="font-medium text-red-600">{label}</span>
      <span className="text-green-800">{value || 'N/A'}</span>
    </div>
  );
}
 