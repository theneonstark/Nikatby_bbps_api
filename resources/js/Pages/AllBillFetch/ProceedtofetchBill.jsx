import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { billFetch } from '@/lib/apis';
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { router } from '@inertiajs/core';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function ProceedtofetchBill({ data }) {
  const [biller, setBiller] = useState(null);
  const [fetchedBill, setFetchedBill] = useState(null);
  const [noPendingAmount, setNoPendingAmount] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [billerName, setBillerName] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success'); // or 'error'
  const [fieldErrors, setFieldErrors] = useState({});


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

  const errors = {};
  billinputs.forEach((input) => {
    const value = formData[input.paramName]?.trim();

    if (!value) {
      errors[input.paramName] = 'This field is required';
    } else {
      // Email validation
      if (input.paramName.toLowerCase().includes('email')) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors[input.paramName] = 'Enter a valid email address';
        }
      }

      // DOB validation: DD/MM/YYYY
      if (input.paramName.toLowerCase().includes('dob')) {
        const dobRegex = /^(0[1-9]|[12][0-9]|3[01])[\/](0[1-9]|1[0-2])[\/](19|20)\d{2}$/;
        if (!dobRegex.test(value)) {
          errors[input.paramName] = 'Enter DOB in format DD/MM/YYYY';
        }
      }

    }
  });

  if (Object.keys(errors).length > 0) {
    setFieldErrors(errors);

    Swal.fire({
      icon: 'error',
      title: 'Missing or Invalid Fields',
      text: 'Please correct the highlighted fields.',
      confirmButtonColor: '#dc3545',
      background: '#f8d7da',
      color: '#721c24',
    });

    return;
  }

  setFieldErrors({}); // Clear previous errors

  // ✅ This part was missing — add it back
  const loadingSwal = Swal.fire({
    title: 'Please wait...',
    text: 'Processing your request...',
    icon: 'info',
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const response = await billFetch(formData);
    Swal.close();

    if (response.message) {
      showMessage('IP Not Whitelisted', 'error');
      return;
    }

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
    Swal.close();
    // console.error('Bill fetch failed:', err);
    showMessage('Failed to fetch bill. Please try again.', 'error');
  }
};



  const showMessage = (message, messageType) => {
  Swal.fire({
    icon: messageType === 'success' ? 'success' : 'error',
    title: messageType === 'success' ? '🎉 Success!' : '⚠️   Error!',
    text: message,
    confirmButtonColor: messageType === 'success' ? '#28a745' : '#dc3545', 
    background: messageType === 'success' ? '#d4edda' : '#f8d7da',
    color: messageType === 'success' ? '#155724' : '#721c24',
    timer: 4000,
    timerProgressBar: true,
    showConfirmButton: false,
    position: 'top-end',
    toast: true,
    customClass: {
      popup: 'custom-popup',
      title: 'custom-title',
      content: 'custom-content',
    },
    willOpen: () => {
      const popup = Swal.getPopup();
      popup.style.borderRadius = '12px';
      popup.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.1)';
    },
  });
};



  const handlePayNowBhai = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to proceed with the payment?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#16a34a', // green
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, pay now!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Please wait...',
        text: 'Processing your payment...',
        icon: 'info',
        showConfirmButton: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      handlePayNow();
      // Add your payment function call here
    }
    else{
      showMessage('Payment cancelled.', 'error');
    }
  });
};


  const handlePayNow = async () => {
  try {
    const response = await axios.post('/bill/paybill', {
      ...formData,
      fetchedBill,
      requestId,
      billerName,
    });

    if (response.data.errorMsg) {
      showMessage(response.data.errorMsg || 'Insufficient Amount', 'error');
      return;

    } else if (response.data.successMsg) {
      showMessage(response.data.successMsg || 'Payment completed successfully.', 'success');
      const query = new URLSearchParams({
        billerName: biller.billerName,
        customerName: fetchedBill.billerResponse.customerName,
        caNumber: fetchedBill.billerResponse.billNumber,
        division: fetchedBill?.additionalInfo?.info?.[0]?.infoValue,
        ltHt: fetchedBill?.additionalInfo?.info?.[1]?.infoValue,
        billAmount: (fetchedBill.billerResponse.billAmount / 100).toFixed(2),
        billDate: fetchedBill.billerResponse.billDate,
        billNumber: fetchedBill.billerResponse.billNumber.slice(-12),
        billPeriod: fetchedBill.billerResponse.billPeriod,
        dueDate: fetchedBill.billerResponse.dueDate,
      }).toString();

      window.location.href = `/bill/receipt?${query}`;
      return;
    } else if (response.data.message) {
      showMessage(response.data.message || 'Your IP is not whitelisted.', 'error');
      return;
    } else {
      showMessage('Unknown response received.', 'error');
      return;
    }
  } catch (error) {
    showMessage(error.response?.data?.msg || 'Payment failed. Please try again.', 'error');
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
        <div className="p-6 max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">{biller.billerName}</h1>
          {billinputs.length === 0 ? (
            <p className="text-gray-500">No input fields required for this biller.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-6xl mx-auto">
              {billinputs.map((input) => (
                <div key={input.paramName} className="flex flex-col w-full">
                  <label className="mb-2 text-lg font-semibold text-gray-700 capitalize transition-all">
                    {input.paramName.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="text"
                    value={formData[input.paramName] || ''}
                    onChange={(e) => handleInputChange(input.paramName, e.target.value)}
                    className={`w-full max-w-6xl transition-all duration-300 ease-in-out border rounded-lg px-6 py-4 text-base shadow-sm outline-none focus:ring-4 ${
                      fieldErrors[input.paramName]
                        ? 'border-red-500 ring-red-200 focus:ring-red-400'
                        : 'border-gray-300 ring-blue-100 focus:ring-blue-400'
                    }`}
                    placeholder={`Enter ${input.paramName}${
                      input.paramName.toLowerCase().includes('dob') ? ' (DD/MM/YYYY)' : ''
                    }`}
                  />
                  {fieldErrors[input.paramName] && (
                    <span className="text-red-600 text-sm mt-2 animate-pulse">
                      {fieldErrors[input.paramName]}
                    </span>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="mt-6 w-full max-w-6xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
              >
                🚀 Fetch Bill
              </button>
            </form>


          )}

          {/* === Conditional Bill Info === */}
         {noPendingAmount && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded max-w-6xl mx-auto">
            No bill amount is pending.
          </div>
        )}

          {fetchedBill && !noPendingAmount && (
            <div className="mt-6 bg-white shadow rounded p-6 border border-gray-200 max-w-6xl mx-auto">
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
                  onClick={handlePayNowBhai}
                  className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Pay  {`₹${(fetchedBill.billerResponse.billAmount) / 100 ?? 0}`}
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
 