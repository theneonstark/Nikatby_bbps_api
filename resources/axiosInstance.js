// resources/js/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Or your Laravel backend URL
  withCredentials: true, // Needed for sanctum or session auth
});

export default axiosInstance;
