import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react';

const SearchByBeneId = () => {
    const { props: inertiaProps } = usePage();
    const user = inertiaProps.auth?.user;
    const [mobile, setMobile] = useState('');
    const [beneId, setBeneId] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            if(user.verified !== 1)
            {
                router.visit('/getonboarding')
                return;
            }
            const response = await axios.post('/DMT/searchByBeneIdStore', { mobile, bene_id: beneId });
            setResponseData(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch beneficiary by ID');
            setResponseData(null);
        }
    };

    return (
        <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
        <SiteHeader />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-6">
            <h1 className="text-2xl font-bold mb-4">Search By Beneficiary ID</h1>
            <Card className="shadow-md rounded-2xl p-4">
                <div className="grid gap-4">
                    <Label>Mobile Number</Label>
                    <Input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter mobile number" />
                    <Label>Beneficiary ID</Label>
                    <Input type="text" value={beneId} onChange={(e) => setBeneId(e.target.value)} placeholder="Enter beneficiary ID" />
                    <Button onClick={handleSearch} className="mt-4">Search</Button>
                </div>
                {responseData && <div className="mt-4 text-green-500">{JSON.stringify(responseData)}</div>}
                {error && <div className="mt-4 text-red-500">{error}</div>}
            </Card>
        </motion.div>
        </SidebarInset>
        </SidebarProvider>
    );
};

export default SearchByBeneId;
