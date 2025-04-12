// resources/js/Pages/BusBookingDashboard.jsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Dropdown } from "@/components/dropdown";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const bookingData = [
  { date: 'Mon', bookings: 20 },
  { date: 'Tue', bookings: 45 },
  { date: 'Wed', bookings: 35 },
  { date: 'Thu', bookings: 50 },
  { date: 'Fri', bookings: 70 },
  { date: 'Sat', bookings: 60 },
  { date: 'Sun', bookings: 90 },
];

export default function BusBookingDashboard() {
  const [tab, setTab] = useState('summary');

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <Dropdown />
        <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Bus Booking Dashboard</h1>
        {/* <div className="p-6 space-y-6"> */}

          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="summary">Booking Summary</TabsTrigger>
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled Bookings</TabsTrigger>
            </TabsList>

            <TabsContent value="summary">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="shadow-md">
                  <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Today's Summary</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                      <div className="bg-blue-100 p-4 rounded-xl shadow">
                        <p className="text-lg font-medium">Total Bookings</p>
                        <p className="text-2xl font-bold text-blue-700">123</p>
                      </div>
                      <div className="bg-green-100 p-4 rounded-xl shadow">
                        <p className="text-lg font-medium">Successful</p>
                        <p className="text-2xl font-bold text-green-700">115</p>
                      </div>
                      <div className="bg-red-100 p-4 rounded-xl shadow">
                        <p className="text-lg font-medium">Cancelled</p>
                        <p className="text-2xl font-bold text-red-700">8</p>
                      </div>
                      <div className="bg-yellow-100 p-4 rounded-xl shadow">
                        <p className="text-lg font-medium">Pending</p>
                        <p className="text-2xl font-bold text-yellow-700">5</p>
                      </div>
                      <div className="bg-purple-100 p-4 rounded-xl shadow">
                        <p className="text-lg font-medium">Refunded</p>
                        <p className="text-2xl font-bold text-purple-700">3</p>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">Weekly Booking Trends</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={bookingData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="bookings" stroke="#8884d8" activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="all">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="shadow-md">
                  <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-2">All Bookings</h2>
                    <p>Table/List of all bookings will go here...</p>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="cancelled">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card className="shadow-md">
                  <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-2">Cancelled Bookings</h2>
                    <p>Cancelled bookings data shown here...</p>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        {/* </div> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
