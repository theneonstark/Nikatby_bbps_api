import React, { useState } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const TransactionSendOtp = () => {
    const [formData, setFormData] = useState({
        mobile: '',
        referenceid: '',
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/DMT/transactionSendOtp', formData);
            setResponse(res.data);
        } catch (err) {
            setResponse(err.response.data);
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Transaction Send Otp</h1>
                    <Card className="p-4 mb-4">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                            {['Mobile Number', 'Reference ID', 'Beneficiary ID', 'Amount', 'Pincode', 'Address', 'GST State', 'Date of Birth', 'Latitude', 'Longitude'].map((label, index) => (
                                <div key={index}>
                                    <label className="block text-sm font-medium mb-1">{label}</label>
                                    <input
                                        name={label.toLowerCase().replace(/ /g, '_')}
                                        placeholder={label}
                                        value={formData[label.toLowerCase().replace(/ /g, '_')]}
                                        onChange={handleChange}
                                        required={['mobile', 'referenceid', 'bene_id', 'amount'].includes(label.toLowerCase().replace(/ /g, '_'))}
                                        className="p-2 border rounded w-full"
                                    />
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
                                    <option value="debit">Debit</option>
                                    <option value="credit">Credit</option>
                                </select>
                            </div>
                            <Button type="submit">Send OTP</Button>
                        </form>
                    </Card>
                    {response && (
                        <Card className="p-4 mt-4 bg-gray-100">
                            <h2 className="text-xl font-semibold">Response</h2>
                            <pre className="whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
                        </Card>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default TransactionSendOtp;
