// src/components/IpAddressTable.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from 'react-toastify';

const IpWhiteList = () => {
  const [ipAddresses, setIpAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch IP addresses
  const fetchIpAddresses = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/ip-addresses');
      setIpAddresses(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch IP addresses');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Update status
  const handleStatusChange = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      const response = await axios.put(`/api/ip-addresses/${id}/status`, {
        status: newStatus ? 1 : 0
      });

      if (response.data.success) {
        setIpAddresses(ipAddresses.map(ip => 
          ip.id === id ? { ...ip, status: newStatus } : ip
        ));
        // toast.success('Status updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update status');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchIpAddresses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto py-10">
        <ToastContainer/>
      <h1 className="text-2xl font-bold mb-6">IP Address Management</h1>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>IP Address</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Status</TableHead>
              {/* <TableHead className="text-right">Actions</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {ipAddresses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No IP addresses found
                </TableCell>
              </TableRow>
            ) : (
              ipAddresses.map((ip) => (
                <TableRow key={ip.id}>
                  <TableCell className="font-medium">{ip.id}</TableCell>
                  <TableCell>{ip.ip_address}</TableCell>
                  <TableCell>{ip.user_id}</TableCell>
                  <TableCell>
                    {new Date(ip.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(ip.updated_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={ip.status}
                      onCheckedChange={() => handleStatusChange(ip.id, ip.status)}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <span className="ml-2">
                      {ip.status ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  {/* <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="ml-2">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" className="ml-2">
                      Delete
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IpWhiteList;