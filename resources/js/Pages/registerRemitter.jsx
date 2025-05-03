import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react';


const RegisterRemitter = () => {
    const { props: inertiaProps } = usePage();
    const user = inertiaProps.auth?.user;
    const [accessMode, setAccessMode] = useState('SITE');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [stateResponse, setStateResponse] = useState('');
    const [pid, setPid] = useState('');
    const [isIris] = useState('2');
    const [errors, setErrors] = useState({});
    const [responseData, setResponseData] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        if (!mobile || !/^\d{10}$/.test(mobile)) newErrors.mobile = 'Please enter a valid 10-digit mobile number.';
        if (!otp) newErrors.otp = 'OTP is required.';
        if (!stateResponse) newErrors.stateResponse = 'State response is required.';
        if (!pid) newErrors.pid = 'PID is required.';
        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await Inertia.post('/DMT/register-remitter', {
                mobile,
                otp,
                state_response: stateResponse,  // Match the field name with the backend
                pid,
                accessMode,
                isIris
            });
            if(user.verified !== 1)
            {
                router.visit('/getonboarding')
            }


            // Handle success
            if (response.props.flash.success && user.verified ===  1) {
                alert('Remitter registered successfully');
            } else {
                alert('Registration failed: ' + response.props.flash.errors.message);
            }
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed');
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">Register Remitter</h1>
                    <Card className="shadow-md rounded-2xl p-4">
                        <Tabs defaultValue="registerForm" className="w-full">
                            <TabsList className="flex justify-start">
                                <TabsTrigger value="registerForm">Register Form</TabsTrigger>
                                <TabsTrigger value="registrationHistory">Registration History</TabsTrigger>
                            </TabsList>

                            <TabsContent value="registerForm">
                                <div className="grid gap-4 mt-4">
                                    <Label>Mobile</Label>
                                    <Input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter mobile number." />
                                    {errors.mobile && <span className="text-red-500">{errors.mobile}</span>}

                                    <Label>OTP</Label>
                                    <Input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6 digits Received Otp During Aadhar Verification." />
                                    {errors.otp && <span className="text-red-500">{errors.otp}</span>}

                                    <Label>State Response</Label>
                                    <Input type="text" value={stateResponse} onChange={(e) => setStateResponse(e.target.value)} placeholder="Enter state response." />
                                    {errors.stateResponse && <span className="text-red-500">{errors.stateResponse}</span>}

                                    <Label>Data (PID)</Label>
                                    <Input type="text" value={pid} onChange={(e) => setPid(e.target.value)} placeholder="Enter PID data." />
                                    {errors.pid && <span className="text-red-500">{errors.pid}</span>}

                                    <Label>Access Mode</Label>
                                    <Select value={accessMode} onValueChange={setAccessMode}>
                                        <SelectTrigger className="w-full">{accessMode}</SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="SITE">SITE</SelectItem>
                                            <SelectItem value="APP">APP</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Label>Is Iris</Label>
                                    <Input type="text" value={isIris} readOnly />

                                    <Button className="mt-4" onClick={handleSubmit}>Register Remitter</Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="registrationHistory">
                                <div className="mt-4">{responseData ? JSON.stringify(responseData) : 'No registration history available.'}</div>
                            </TabsContent>
                        </Tabs>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default RegisterRemitter;
