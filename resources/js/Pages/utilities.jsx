import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Lightbulb, Droplet, Flame, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Dropdown } from "@/components/dropdown"

const utilityData = [
  { name: 'Electricity', value: 500 },
  { name: 'Water', value: 300 },
  { name: 'Gas', value: 200 },
];

const recentDetails = [
  { type: 'Electricity', date: 'Apr 6', amount: '₹450' },
  { type: 'Water', date: 'Apr 5', amount: '₹280' },
  { type: 'Gas', date: 'Apr 4', amount: '₹210' },
];

const Utilities = () => {
  return (
    <SidebarProvider>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <Dropdown />
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Utility Dashboard</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-xl">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Electricity Bills</p>
              <h2 className="text-2xl font-bold">₹12,000</h2>
            </div>
            <Lightbulb className="text-yellow-500" size={32} />
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Water Bills</p>
              <h2 className="text-2xl font-bold">₹6,500</h2>
            </div>
            <Droplet className="text-blue-500" size={32} />
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Gas Bills</p>
              <h2 className="text-2xl font-bold">₹4,200</h2>
            </div>
            <Flame className="text-red-500" size={32} />
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl mt-6">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Utility Usage Summary</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={utilityData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-xl mt-6">
        <CardContent className="p-4">
          <Tabs defaultValue="electricity">
            <TabsList className="mb-4">
              <TabsTrigger value="electricity">Electricity</TabsTrigger>
              <TabsTrigger value="water">Water</TabsTrigger>
              <TabsTrigger value="gas">Gas</TabsTrigger>
            </TabsList>
            <TabsContent value="electricity">
              <p className="text-sm text-gray-600">Electricity usage has increased due to summer demand. Consider monitoring peak hours.</p>
            </TabsContent>
            <TabsContent value="water">
              <p className="text-sm text-gray-600">Water consumption is stable. Last month's savings: ₹300</p>
            </TabsContent>
            <TabsContent value="gas">
              <p className="text-sm text-gray-600">Gas usage trend is steady with minimal fluctuations.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="shadow-xl mt-6">
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Utility Payments</h2>
          <ul className="space-y-2">
            {recentDetails.map((item, index) => (
              <li key={index} className="flex justify-between text-sm text-gray-700">
                <span>{item.type} - {item.date}</span>
                <span>{item.amount}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
    </SidebarInset>
        </SidebarProvider>
  );
};

export default Utilities;
