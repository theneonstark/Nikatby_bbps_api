import React from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";


const data = [
  { month: "SEP", revenue: 40, profit: 20 },
  { month: "OCT", revenue: 45, profit: 22 },
  { month: "NOV", revenue: 48, profit: 24 },
  { month: "DEC", revenue: 50, profit: 27 },
  { month: "JAN", revenue: 53, profit: 29 },
  { month: "FEB", revenue: 55, profit: 30 },
];

const weeklyData = [
  { day: "17", revenue: 10, profit: 5 },
  { day: "18", revenue: 12, profit: 6 },
  { day: "19", revenue: 14, profit: 7 },
  { day: "20", revenue: 16, profit: 8 },
  { day: "21", revenue: 13, profit: 6.5 },
  { day: "22", revenue: 15, profit: 7.5 },
  { day: "23", revenue: 17, profit: 8.5 },
  { day: "24", revenue: 14, profit: 7 },
  { day: "25", revenue: 16, profit: 8 },
];

const ChartArea = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card className="p-4">
        <h2 className="text-xl font-bold">This month</h2>
        <p className="text-3xl font-semibold">$37.5K</p>
        <p className="text-green-500">+2.45% On track</p>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#6B46C1" strokeWidth={3} dot={{ r: 5 }} />
            <Line type="monotone" dataKey="profit" stroke="#63B3ED" strokeWidth={3} dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card className="p-4">
        <h2 className="text-xl font-bold">Weekly Revenue</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="profit" stackId="a" fill="#6B46C1" />
            <Bar dataKey="revenue" stackId="a" fill="#63B3ED" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default ChartArea;
