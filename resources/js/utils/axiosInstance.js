// resources/js/utils/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: '/',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'multipart/form-data', // crucial for file uploads
  },
  withCredentials: true,
});

export default instance;
