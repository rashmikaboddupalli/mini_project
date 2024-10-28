// src/axiosInstance.js
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000', // Ensure this URL matches your backend server's URL
  timeout: 1000,
});

export default api;
