import React, { useState } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react';

const TransactionStatus = () => {
    const { props: inertiaProps } = usePage();
    const user = inertiaProps.auth?.user;
    const [referenceid, setReferenceId] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(user.verified !== 1)
            {
              router.visit('/getonboarding')
            }
            else{
            const res = await axios.post('/DMT/transactionstatusstore', { referenceid });
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
                    <h1 className="text-2xl font-bold mb-4">Transaction Status</h1>
                    <Card className="p-4 mb-4">
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Reference ID</label>
                                <input
                                    type="text"
                                    name="referenceid"
                                    placeholder="Enter Reference ID"
                                    value={referenceid}
                                    onChange={(e) => setReferenceId(e.target.value)}
                                    required
                                    className="p-2 border rounded w-full"
                                />
                            </div>
                            <Button type="submit">Check Status</Button>
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

export default TransactionStatus;
