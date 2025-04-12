import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import * as XLSX from 'xlsx';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import Navbar from "@/Layouts/newLayout/navbar";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const LICDashboard = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (filters = {}) => {
    try {
      setLoading(true);
      const response = await axios.get('/api/lic/dashboard', {
        params: {
          from_date: filters.fromDate || '',
          to_date: filters.toDate || '',
        },
      });

      setData(response.data.records || []);
      setSummary(response.data.summary || {});
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    fetchData({ fromDate, toDate });
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'LIC Dashboard');
    XLSX.writeFile(wb, 'lic_dashboard.xlsx');
  };

  const barData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Total Commission',
        data: data.map((item) => item.commission),
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const pieData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Total Policies',
        data: data.map((item) => item.policy_count),
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
      },
    ],
  };

  return (
    <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                <Navbar />

    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">LIC Dashboard</h2>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium">From Date</label>
          <input
            type="date"
            className="border px-3 py-2 rounded-md"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">To Date</label>
          <input
            type="date"
            className="border px-3 py-2 rounded-md"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className="flex items-end gap-2">
          <Button onClick={handleFilter}>Apply Filter</Button>
          <Button variant="outline" onClick={handleExport}>
            Export to Excel
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-xl shadow text-center">
          <h4 className="text-sm font-medium">Total Records</h4>
          <p className="text-xl font-bold">{summary.total_records || 0}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-xl shadow text-center">
          <h4 className="text-sm font-medium">Total Premium</h4>
          <p className="text-xl font-bold">₹ {summary.total_premium || 0}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow text-center">
          <h4 className="text-sm font-medium">Total Commission</h4>
          <p className="text-xl font-bold">₹ {summary.total_commission || 0}</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-xl shadow text-center">
          <h4 className="text-sm font-medium">Total Policies</h4>
          <p className="text-xl font-bold">{summary.total_policy || 0}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-medium text-lg mb-2">Commission Bar Chart</h3>
          <Bar ref={chartRef} data={barData} />
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-medium text-lg mb-2">Policy Count Pie Chart</h3>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-4 rounded-xl shadow overflow-x-auto">
        <h3 className="font-medium text-lg mb-3">Records Table</h3>
        <table className="min-w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Premium</th>
              <th className="py-2 px-4 border">Commission</th>
              <th className="py-2 px-4 border">Policies</th>
              <th className="py-2 px-4 border">Created Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="py-2 px-4 border">{item.name}</td>
                <td className="py-2 px-4 border">₹ {item.premium}</td>
                <td className="py-2 px-4 border">₹ {item.commission}</td>
                <td className="py-2 px-4 border">{item.policy_count}</td>
                <td className="py-2 px-4 border">
                  {item.created_at ? format(new Date(item.created_at), 'dd MMM yyyy') : '—'}
                </td>
              </tr>
            ))}
            {!data.length && (
              <tr>
                <td colSpan="5" className="text-center py-4">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </SidebarInset>
                </SidebarProvider>
  );
};

export default LICDashboard;
