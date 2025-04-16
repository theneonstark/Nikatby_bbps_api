import React from 'react';
import { useForm } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const Login = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/userpanel3/public/login', {
            preserveScroll: true,
            onError: () => {
              console.log('Login failed');
            },
          });
          console.log('Coming')
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
            <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="w-96 p-6 bg-white shadow-2xl rounded-2xl">
                    <CardContent>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
                        <form onSubmit={handleSubmit} className="space-y-4" method='POST'>
                            <Input 
                                name="email" 
                                placeholder="Email" 
                                type="email" 
                                value={data.email} 
                                onChange={handleChange} 
                                className="p-2 w-full rounded-xl border-gray-300" 
                            />
                            {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
                            <Input 
                                name="password" 
                                placeholder="Password" 
                                type="password" 
                                value={data.password} 
                                onChange={handleChange} 
                                className="p-2 w-full rounded-xl border-gray-300" 
                            />
                            {errors.password && <div className="text-red-600 text-sm">{errors.password}</div>}
                            <Button 
                                type="submit" 
                                className="w-full bg-blue-500 text-white p-2 rounded-xl hover:bg-blue-600"
                                disabled={processing}
                            >
                                {processing ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;
