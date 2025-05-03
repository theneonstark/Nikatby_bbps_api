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

const PennyDrop = () => {
    const { props: inertiaProps } = usePage();
    const user = inertiaProps.auth?.user;
    const [formData, setFormData] = useState({
        mobile: '',
        accno: '',
        bankid: '',
        benename: '',
        referenceid: '',
        pincode: '',
        address: '',
        dob: '',
        gst_state: '',
        bene_id: ''
    });
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/DMT/pennyDrop', formData);
            if(user.verified !== 1)
            {
              router.visit('/getonboarding')
            }
            if(response.data && user.verified ===  1){
            setResponse(response.data);
            alert('Penny Drop Verification Successful');
            }
        } catch (error) {
            alert('Verification failed');
            setResponse({ success: false, message: 'Verification failed' });
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Penny Drop Verification</h1>
                    <Card className="shadow-md rounded-2xl p-4">
                        <div className="grid gap-4">
                            {Object.keys(formData).map((field) => (
                                <div key={field}>
                                    <Label>{field.replace('_', ' ').toUpperCase()}</Label>
                                    <Input name={field} value={formData[field]} onChange={handleChange} placeholder={`Enter ${field}`} />
                                </div>
                            ))}
                            <Button onClick={handleSubmit} className="mt-4">Submit</Button>
                        </div>
                    </Card>
                    {response && (
                        <Card className="mt-4 p-4 bg-gray-100">
                            <h2 className="text-xl font-semibold">Response</h2>
                            <pre className="mt-2 text-sm">{JSON.stringify(response, null, 2)}</pre>
                        </Card>
                    )}
                </motion.div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default PennyDrop;
