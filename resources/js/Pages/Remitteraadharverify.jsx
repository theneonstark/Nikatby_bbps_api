import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react';

export default function RemitterAadharVerification() {
    const { props: inertiaProps } = usePage();
          const user = inertiaProps.auth?.user;
    const [mobile, setMobile] = useState('');
    const [aadhaar_no, setAadhar] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async () => {
        if (!/^[0-9]{10}$/.test(mobile)) {
            setError('Please enter a valid 10-digit mobile number.');
            return;
        }
        if (!/^[0-9]{16}$/.test(aadhaar_no)) {
            setError('Please enter a valid 16-digit Aadhaar number.');
            return;
        }
        setError('');

        try {
            const response = await axios.post('/remitter-aadhar-verification', { mobile, aadhaar_no });
             if(user.verified !== 1)
                {
                    router.visit('/getonboarding')
                }
            // console.log(response.data);
            if (response.data.success && user.verified ===  1) {
                setSuccessMessage(response.data.message);
                setTimeout(() => setSuccessMessage(''), 30000000);
            } else {
                setError(response.data.message || 'Verification failed');
            }
        } catch (err) {
            setError('An error occurred during verification.');
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="p-6">
                    <Card className="p-4 shadow-xl">
                        <h2 className="text-xl font-semibold mb-4">Remitter Aadhaar Verification</h2>
                        <h2 className="mb-0">Enter Mobile Number:</h2>
                        <Input
                            type="text"
                            placeholder="Mobile Number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="mb-2"
                        />
                        <h2 className="mt-4">Enter Aadhaar Number:</h2>
                        <Input
                            type="text"
                            placeholder="Aadhaar Number"
                            value={aadhaar_no}
                            onChange={(e) => setAadhar(e.target.value)}
                            className="mb-2"
                        />
                        <Button onClick={handleSubmit} className="w-full">Verify</Button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        <AnimatePresence>
                            {successMessage && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    
                                >
                                   <h2 className="mt-4 text-green-500 text-sm font-medium">An Otp has been sent to your register mobile number.</h2>
                                   <h3 className="mt-4 text-red-500 text-sm font-bold">State Response Will Asked During Remitter Registration-> {successMessage}</h3>
                                    
                                    <Button className="w-full"><a href='/DMT/registerRemitter' className="bg-green-700">Next Step: Register Remitter</a></Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
