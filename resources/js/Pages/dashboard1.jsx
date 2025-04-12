import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Dropdown } from "@/components/dropdown"

const dummyChartData = [
  { name: "Jan", transactions: 40 },
  { name: "Feb", transactions: 55 },
  { name: "Mar", transactions: 70 },
  { name: "Apr", transactions: 90 },
  { name: "May", transactions: 60 },
];

const cards = [
  { title: "Total Remitters", value: 1200 },
  { title: "Total Beneficiaries", value: 3500 },
  { title: "Successful Txns", value: 9800 },
  { title: "Pending Txns", value: 450 },
  { title: "Refunds", value: 300 },
];

export default function Dmt2Dashboard() {
  return (
    <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                    <SiteHeader />
                    <Dropdown />
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">DMT2 Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {cards.map((card, idx) => (
          <Card key={idx} className="bg-white shadow-lg hover:shadow-xl transition duration-300">
            <CardContent className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-600 mb-2">{card.title}</h2>
              <p className="text-2xl font-bold text-blue-600">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <Card className="bg-white shadow-md">
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Monthly Transactions</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dummyChartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="transactions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Transfer List Section */}
        <Card className="bg-white shadow-md">
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Recent Transfers</h3>
            <ul className="divide-y divide-gray-200">
              {["TXN001", "TXN002", "TXN003", "TXN004", "TXN005"].map((txn, i) => (
                <li key={i} className="py-2 flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{txn}</span>
                  <span className="text-green-600 font-semibold">Success</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
    </SidebarInset>
                </SidebarProvider>
  );
}
