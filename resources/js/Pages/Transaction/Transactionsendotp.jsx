import React, { useState } from 'react';
import axios from 'axios';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react';

const TransactionSendOtp = () => {
  const { props: inertiaProps } = usePage();
  const user = inertiaProps.auth?.user;
  const [formData, setFormData] = useState({
    mobile_number: '',
    reference_id: '',
    bene_id: '',
    txntype: '',
    amount: '',
    pincode: '',
    address: '',
    gst_state: '',
    dob: '',
    lat: '',
    long: ''
  });

  const [response, setResponse] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      if(user.verified !== 1)
      {
       router.visit('/getonboarding')
      }
      else{
      const res = await axios.post('/DMT/transactionSendOtp', formData);

      setResponse(res.data);
      }
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        setResponse({ success: false, message: err.message });
      }
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Transaction Send OTP</h1>
          <Card className="p-4 mb-4">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              {[
                { label: 'Mobile Number', name: 'mobile_number' },
                { label: 'Reference ID', name: 'reference_id' },
                { label: 'Beneficiary ID', name: 'bene_id' },
                { label: 'Amount', name: 'amount' },
                { label: 'Pincode', name: 'pincode' },
                { label: 'Address', name: 'address' },
                { label: 'GST State', name: 'gst_state' },
                { label: 'Date of Birth', name: 'dob' },
                { label: 'Latitude', name: 'lat' },
                { label: 'Longitude', name: 'long' },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block text-sm font-medium mb-1">{label}</label>
                  <input
                    type={name === 'amount' || name === 'lat' || name === 'long' ? 'number' : 'text'}
                    name={name}
                    placeholder={label}
                    value={formData[name]}
                    onChange={handleChange}
                    required={['mobile_number', 'reference_id', 'bene_id', 'amount'].includes(name)}
                    className="p-2 border rounded w-full"
                  />
                  {errors[name] && <div className="text-red-500 text-sm">{errors[name][0]}</div>}
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium mb-1">Transaction Type</label>
                <select
                  name="txntype"
                  value={formData.txntype}
                  onChange={handleChange}
                  required
                  className="p-2 border rounded w-full"
                >
                  <option value="">Select Transaction Type</option>
                  <option value="imps">IMPS</option>
                  <option value="neft">NEFT</option>
                </select>
                {errors.txntype && <div className="text-red-500 text-sm">{errors.txntype[0]}</div>}
              </div>

              <Button type="submit">Send OTP</Button>
            </form>
          </Card>

          {response && (
            <Card className="p-4 mt-4 bg-gray-100">
              <h2 className="text-xl font-semibold mb-2">Response</h2>
              <pre className="whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
            </Card>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default TransactionSendOtp;
