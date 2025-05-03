import axios from 'axios';

// Define the base URL based on the environment
const BASE_URL = import.meta.env.VITE_APP_SERVER === "PRODUCTION" 
    ? "https://uat.nikatby.in/admin/public" 
    : "";

// Ensure cookies are sent with requests (for session-based authentication)
axios.defaults.withCredentials = true;

// Recharge APIs
export const FundRequestData = async () => {
    const response = await axios.get('/fund-requests');
    
    return response.data;
  };
  
export const FundRequestStatus = async (id, newStatus) => {
    if (confirm('Are you sure?')) {
        await axios.post(`/fund-requests/${id}/status`, { status: newStatus });
    }
    
};
export const FundRequestStatusInActive = async (id, newStatus) => {
    if (confirm('Are you sure?')) {
        await axios.post(`/fund-requests/inActive/${id}/status`, { status: newStatus });
    }
    
};
