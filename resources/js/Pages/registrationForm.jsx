import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const RegistrationForm = () => {
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
            <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="w-96 p-6 bg-white shadow-2xl rounded-2xl">
                    <CardContent>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Register</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                name="name"
                                placeholder="Name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="p-2 w-full rounded-xl border-gray-300"
                            />
                            {errors.name && <div className="text-red-600">{errors.name}</div>}
                            <Input
                                name="email"
                                placeholder="Email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="p-2 w-full rounded-xl border-gray-300"
                            />
                            {errors.email && <div className="text-red-600">{errors.email}</div>}
                            <Input
                                name="password"
                                placeholder="Password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="p-2 w-full rounded-xl border-gray-300"
                            />
                            {errors.password && <div className="text-red-600">{errors.password}</div>}
                            <Input
                                name="password_confirmation"
                                placeholder="Confirm Password"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="p-2 w-full rounded-xl border-gray-300"
                            />
                            <Button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600">Register</Button>
                        </form>
                        <Button type="submit" className="w-full text-white p-2 rounded-xl hover:bg-blue-600 mt-3">Already Have an Account? <a href='/loginPage' className='text-green-800'> Login</a></Button>
                        
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default RegistrationForm;
