import React, { useState } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react';

const Transaction = () => {
    const { props: inertiaProps } = usePage();
    const user = inertiaProps.auth?.user;
    const [formData, setFormData] = useState({
        mobile: '',
        referenceid: '',
        pincode: '',
        address: '',
        amount: '',
        txntype: '',
        dob: '',
        gst_state: '',
        bene_id: '',
        otp: '',
        stateresp: '',
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
            const res = await axios.post('/DMT/TranSactionStore', formData);
            if(user.verified !== 1)
            {
               router.visit('/getonboarding')
            }
            if(response.data && user.verified ===  1){
            setResponse(res.data);
            }
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
                    <h1 className="text-2xl font-bold mb-4">Transaction</h1>
                    <Card className="p-4 mb-4">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                            {[
                                { name: 'mobile', label: 'Mobile Number' },
                                { name: 'referenceid', label: 'Referenced Id' },
                                { name: 'pincode', label: 'Pincode' },
                                { name: 'address', label: 'Address' },
                                { name: 'amount', label: 'Transaction Amount' },
                                { name: 'dob', label: 'Date of Birth (DD-MM-YYYY)' },
                                { name: 'gst_state', label: 'GST State' },
                                { name: 'bene_id', label: 'Beneficiary ID' },
                                { name: 'otp', label: 'OTP' },
                                { name: 'stateresp', label: 'State Response' },
                                { name: 'lat', label: 'Merchant Shop Latitude' },
                                { name: 'long', label: 'Merchant Shop Longitude' }
                            ].map((field, index) => (
                                <div key={index}>
                                    <label className="block text-sm font-medium mb-1">{field.label}</label>
                                    <input
                                        type="text"
                                        name={field.name}
                                        placeholder={field.label}
                                        value={formData[field.name]}
                                        onChange={handleChange}
                                        required
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
                                    <option value="imps">IMPS</option>
                                    <option value="neft">NEFT</option>
                                </select>
                            </div>
                            <Button type="submit">Submit Transaction</Button>
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

export default Transaction;
