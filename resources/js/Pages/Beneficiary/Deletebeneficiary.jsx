import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react';

const DeleteBeneficiary = () => {
    const { props: inertiaProps } = usePage();
    const user = inertiaProps.auth?.user;
    const [mobile, setMobile] = useState('');
    const [beneficiaryId, setBeneficiaryId] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [errors, setErrors] = useState({});

    const handleDelete = async () => {
        const newErrors = {};
        if (!mobile || !/^\d{10}$/.test(mobile)) newErrors.mobile = 'Please enter a valid 10-digit mobile number.';
        if (!beneficiaryId) newErrors.beneficiaryId = 'Beneficiary ID is required.';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post('/DMT/deleteBeneficiaryStore', { mobile, beneficiaryId });
            if(user.verified !== 1)
            {
                router.visit('/getonboarding')
            }
            if(response.data && user.verified ===  1){
            setResponseData(response.data);
            alert('Beneficiary deleted successfully');
            }
        } catch (error) {
            console.error('Deletion failed', error);
            alert('Deletion failed');
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="p-6 animate-fadeIn">
                    <h1 className="text-2xl font-bold mb-4">Delete Beneficiary</h1>
                    <Card className="shadow-md rounded-2xl p-4">
                        <Tabs defaultValue="deleteBeneficiary" className="w-full">
                            <TabsList className="flex justify-start">
                                <TabsTrigger value="deleteBeneficiary">Delete Beneficiary</TabsTrigger>
                                <TabsTrigger value="deletedBeneficiary">Deleted Beneficiary</TabsTrigger>
                            </TabsList>

                            <TabsContent value="deleteBeneficiary">
                                <div className="grid gap-4 mt-4">
                                    <Label>Mobile Number</Label>
                                    <Input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Enter mobile number." />
                                    {errors.mobile && <span className="text-red-500">{errors.mobile}</span>}

                                    <Label>Beneficiary ID</Label>
                                    <Input type="text" value={beneficiaryId} onChange={(e) => setBeneficiaryId(e.target.value)} placeholder="Enter beneficiary ID." />
                                    {errors.beneficiaryId && <span className="text-red-500">{errors.beneficiaryId}</span>}

                                    <Button className="mt-4" onClick={handleDelete}>Delete Beneficiary</Button>
                                    {responseData && (
                                        <CardContent className="mt-4 p-4 bg-gray-100 rounded-lg">
                                            <pre className="text-sm text-gray-800">{JSON.stringify(responseData, null, 2)}</pre>
                                        </CardContent>
                                    )}
                                </div>
                            </TabsContent>

                            <TabsContent value="deletedBeneficiary">
                                <div className="mt-4">No deleted beneficiary records available.</div>
                            </TabsContent>
                        </Tabs>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default DeleteBeneficiary;
