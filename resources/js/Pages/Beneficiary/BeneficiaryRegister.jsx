import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Inertia } from '@inertiajs/inertia';

const RegisterBeneficiary = () => {
    const [mobile, setMobile] = useState('');
    const [beneficiaryName, setBeneficiaryName] = useState('');
    const [bankId, setBankId] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifsccode, setIfsccode] = useState('');
    const [verified, setVerified] = useState('0');
    const [errors, setErrors] = useState({});
    const [responseData, setResponseData] = useState(null);

    const validateForm = () => {
        const newErrors = {};
        if (!mobile || !/^\d{10}$/.test(mobile)) newErrors.mobile = 'Please enter a valid 10-digit mobile number.';
        if (!beneficiaryName) newErrors.beneficiaryName = 'Beneficiary name is required.';
        if (!bankId) newErrors.bankId = 'Bank ID is required.';
        if (!accountNumber || !/^\d+$/.test(accountNumber)) newErrors.accountNumber = 'Account number is required and must be numeric.';
        if (!ifsccode) newErrors.ifsccode = 'IFSC code is required.';
        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('/DMT/registerBeneficiaryStore', {
                mobile,
                beneficiaryName,
                bankId,
                accountNumber,
                ifsccode,
                verified
            });
            setResponseData(response.data);
            alert('Beneficiary registered successfully');
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
                    <h1 className="text-2xl font-bold mb-4">Register Beneficiary</h1>
                    <Card className="shadow-md rounded-2xl p-4">
                        <Tabs defaultValue="registerBeneficiary" className="w-full">
                            <TabsList className="flex justify-start">
                                <TabsTrigger value="registerBeneficiary">Register Beneficiary</TabsTrigger>
                                <TabsTrigger value="beneficiaryList">Beneficiary List</TabsTrigger>
                            </TabsList>

                            <TabsContent value="registerBeneficiary">
                                <div className="grid gap-4 mt-4">
                                    <Label>Mobile</Label>
                                    <Input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter mobile number." />
                                    {errors.mobile && <span className="text-red-500">{errors.mobile}</span>}

                                    <Label>Beneficiary Name</Label>
                                    <Input type="text" value={beneficiaryName} onChange={(e) => setBeneficiaryName(e.target.value)} placeholder="Enter beneficiary name." />
                                    {errors.beneficiaryName && <span className="text-red-500">{errors.beneficiaryName}</span>}

                                    <Label>Bank ID</Label>
                                    <Input type="text" value={bankId} onChange={(e) => setBankId(e.target.value)} placeholder="Enter bank ID." />
                                    {errors.bankId && <span className="text-red-500">{errors.bankId}</span>}

                                    <Label>Account Number</Label>
                                    <Input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="Enter account number." />
                                    {errors.accountNumber && <span className="text-red-500">{errors.accountNumber}</span>}

                                    <Label>IFSC Code</Label>
                                    <Input type="text" value={ifsccode} onChange={(e) => setIfsccode(e.target.value)} placeholder="Enter IFSC code." />
                                    {errors.ifsccode && <span className="text-red-500">{errors.ifsccode}</span>}

                                    <Label>Verified</Label>
                                    <Select value={verified} onValueChange={setVerified}>
                                        <SelectTrigger className="w-full">{verified === '0' ? 'Not Verified' : 'Verified'}</SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">Not Verified</SelectItem>
                                            <SelectItem value="1">Verified</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Button className="mt-4" onClick={handleSubmit}>Register Beneficiary</Button>
                                    {responseData && (
                                        <CardContent className="mt-4 p-4 bg-gray-100 rounded-lg">
                                            <pre className="text-sm text-gray-800">{JSON.stringify(responseData, null, 2)}</pre>
                                        </CardContent>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="beneficiaryList">
                                <div className="mt-4">No beneficiary records available.</div>
                            </TabsContent>
                        </Tabs>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default RegisterBeneficiary;