import React, { useState } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const ClaimRefund = () => {
    const [formData, setFormData] = useState({
        ackno: '',
        referenceid: '',
        otp: ''
    });
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/DMT/claimRefundStore', formData);
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
                    <h1 className="text-2xl font-bold mb-4">Claim Refund</h1>
                    <Card className="p-4 mb-4">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                            {['ackno', 'referenceid', 'otp'].map((field) => (
                                <div key={field}>
                                    <label className="block text-sm font-medium mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                    <input
                                        name={field}
                                        placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        required
                                        className="p-2 border rounded w-full"
                                    />
                                </div>
                            ))}
                            <Button type="submit">Submit</Button>
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

export default ClaimRefund;
