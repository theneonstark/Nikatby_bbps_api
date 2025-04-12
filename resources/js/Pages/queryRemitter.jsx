import React, { useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function SearchRemitter() {
    const [mobile, setMobile] = useState('');
    const [remitter, setRemitter] = useState(null);
    const [error, setError] = useState('');
    const [showResult, setShowResult] = useState(false);

    const handleSearch = async () => {
        if (!/^[0-9]{10}$/.test(mobile)) {
            setError('Please enter a valid 10-digit mobile number.');
            setShowResult(true);
            return;
        }
        setError('');
        setShowResult(false);

        try {
            const response = await axios.post('/search-remitter', { mobile });
            // console.log(response.data);
            if (response.data.remitter) {
                setRemitter(response.data.remitter);
                setError('');
                setShowResult(true);
            } else if (response.data.error) {
                setError(response.data.error);
                setRemitter(null);
                setShowResult(true);
            }
        } catch (err) {
            setError('Error fetching remitter data');
            setRemitter(null);
            setShowResult(true);
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="p-6">
                    <Card className="p-4 shadow-xl">
                        <h2 className="text-xl font-semibold mb-4">Search Query Remitter</h2>
                        <h2 className="mb-4">Enter Mobile Number:</h2>
                        <Input
                            type="text"
                            placeholder="Mobile Number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            className="mb-2"
                        />
                        <Button onClick={handleSearch} className="w-full">Search Remitter</Button>
                    </Card>

                    {showResult && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="mt-6"
                        >
                            <Card className="p-6 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl">
                                {error ? (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-600 text-lg font-medium"
                                    >
                                        {error}
                                    </motion.p>
                                ) : (
                                    remitter && (
                                        <div>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-800">Remitter Details Fetched</h3>
                                            <p className="text-gray-600"><span className="font-medium">{remitter.name}</span></p>
                                            <p className="text-gray-600"><span className="font-medium">{remitter.mobile}</span></p>
                                            <Button className="w-full"><a href='/DMT/remitterAadharVerify' className="w-full">Next Step: Verify Aadhaar</a></Button>
                                            {/* <p className="text-gray-600">Email: <span className="font-medium">{remitter.email}</span></p> */}
                                        </div>
                                    )
                                )}
                            </Card>
                        </motion.div>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
