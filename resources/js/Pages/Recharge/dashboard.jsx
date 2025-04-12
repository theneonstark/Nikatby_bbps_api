import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DollarSign, BarChart3, TrendingUp, CreditCard } from 'lucide-react';
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Dropdown } from "@/components/dropdown"

const rechargeData = [
  { date: 'Apr 1', amount: 1200 },
  { date: 'Apr 2', amount: 980 },
  { date: 'Apr 3', amount: 1250 },
  { date: 'Apr 4', amount: 1500 },
  { date: 'Apr 5', amount: 1100 },
  { date: 'Apr 6', amount: 1750 },
  { date: 'Apr 7', amount: 1600 },
];

const DashboardRecharge = () => {
  return (
    <SidebarProvider>
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <Dropdown />
            <div className="p-6 bg-gray-100 min-h-screen">
            {/* <div className="p-6"> */}
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Recharge Dashboard</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-xl">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Recharges</p>
              <h2 className="text-2xl font-bold">₹10,500</h2>
            </div>
            <DollarSign className="text-green-500" size={32} />
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Recharges</p>
              <h2 className="text-2xl font-bold">₹1,600</h2>
            </div>
            <TrendingUp className="text-blue-500" size={32} />
          </CardContent>
        </Card>

        <Card className="shadow-xl">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Recharges</p>
              <h2 className="text-2xl font-bold">15</h2>
            </div>
            <BarChart3 className="text-orange-500" size={32} />
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-3 shadow-xl">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold mb-4">Recharge History (Last 7 Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rechargeData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#4f46e5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-3 shadow-xl">
          <CardContent className="p-4">
            <Tabs defaultValue="topup">
              <TabsList className="mb-4">
                <TabsTrigger value="topup">Top-Ups</TabsTrigger>
                <TabsTrigger value="dth">DTH</TabsTrigger>
                <TabsTrigger value="datacard">Data Cards</TabsTrigger>
              </TabsList>
              <TabsContent value="topup">
                <p className="text-sm text-gray-600">Most popular top-ups this week: ₹199, ₹349, ₹599</p>
              </TabsContent>
              <TabsContent value="dth">
                <p className="text-sm text-gray-600">DTH subscriptions rising on weekends, mostly ₹300-₹500 plans.</p>
              </TabsContent>
              <TabsContent value="datacard">
                <p className="text-sm text-gray-600">Data card usage surged by 25% due to remote work trend.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
    </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardRecharge;
