import { useEffect, useState } from 'react';
import axios from 'axios';
import { Switch } from '@/Components/ui/switch';
import { Button } from '@/Components/ui/button';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

// Basic Modal component
const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

const IPWhitelist = () => {
  const [ipAddresses, setIpAddresses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newIp, setNewIp] = useState('');
  const [editingIp, setEditingIp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isValidIp = (ip) => {
    const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/;
    const ipv6Regex = /^(([0-9a-fA-F]{1,4}):){7}([0-9a-fA-F]{1,4})$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  };

  const fetchIPs = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/user/ipwhitelist/fetch');
      console.log(res);
      
      setIpAddresses(res.data.data || []);
    } catch (error) {
      console.error('Error fetching IP addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const trimmedIp = newIp.trim();

    if (!trimmedIp) {
      setError('IP address is required.');
      return;
    }

    if (!isValidIp(trimmedIp)) {
      setError('Please enter a valid IPv4 or IPv6 address.');
      return;
    }

    try {
      if (editingIp) {
        await axios.put(`/user/ipEdit/${editingIp.id}`, {
          ip_address: trimmedIp,
        });
      } else {
        await axios.post('/user/ipwhitelist/add', { //For Add IP
          ip_address: trimmedIp,
        });
      }
      closeModal();
      fetchIPs();
    } catch (error) {
      console.error('Error saving IP address:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this IP address?')) return;

    try {
      await axios.delete(`/user/ipDelete/${id}`);
      fetchIPs();
    } catch (error) {
      console.error('Error deleting IP address:', error);
    }
  };

  const handleEdit = (ip) => {
    setNewIp(ip.ip_address);
    setEditingIp(ip);
    setModalOpen(true);
    setError('');
  };

  // const handleStatusToggle = async (id, currentStatus) => {
  //   try {
  //     await axios.put(`/api/ip-addresses/${id}/status`, {
  //       status: currentStatus ? 0 : 1,
  //     });
  //     fetchIPs();
  //   } catch (error) {
  //     console.error('Error toggling IP status:', error);
  //   }
  // };

  const closeModal = () => {
    setModalOpen(false);
    setNewIp('');
    setEditingIp(null);
    setError('');
  };

  useEffect(() => {
    fetchIPs();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="w-full h-full py-10 px-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">IP Whitelist</h1>
            {/* <Button
              onClick={() => {
                setModalOpen(true);
                setError('');
                setNewIp('');
                setEditingIp(null);
              }}
            >
              + Add IP
            </Button> */}
          </div>

          <div className="rounded-md border overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">IP Address</th>
                  <th className="px-4 py-2">Status</th>
                  {/* <th className="px-4 py-2">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {ipAddresses.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center py-4">
                      No IP addresses found
                    </td>
                  </tr>
                ) : (
                  ipAddresses.map((ip) => (
                    <tr key={ip.id} className="border-t">
                      <td className="px-4 py-2">{ip.ip_address}</td>
                      <td className="px-4 py-2 flex items-center">
                        <Switch
                          checked={!!ip.status}
                        //   onCheckedChange={() => handleStatusToggle(ip.id, ip.status)}
                          className="data-[state=checked]:bg-green-500"
                        />
                        {/* <span className={ip.status == 1 ? "mt-4 text-green-700" : "mt-4 text-red-700 text font-bold"} >{ip.status == 1 ? 'Active' : 'Inactive'}</span> */}
                      </td>
                      {/* <td className="px-4 py-2 space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(ip)}>
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(ip.id)}
                        >
                          Delete
                        </Button>
                      </td> */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          <Modal show={modalOpen} onClose={closeModal}>
            <h2 className="text-xl font-semibold mb-4">
              {editingIp ? 'Edit IP Address' : 'Add New IP Address'}
            </h2>
            <input
            name='ip_address'
              type="text"
              value={newIp}
              onChange={(e) => {
                setNewIp(e.target.value);
                setError('');
              }}
              className="border rounded-md w-full px-4 py-2 mb-2"
              placeholder="Enter IP address"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                {editingIp ? 'Update' : 'Save'}
              </Button>
            </div>
          </Modal>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default IPWhitelist;
