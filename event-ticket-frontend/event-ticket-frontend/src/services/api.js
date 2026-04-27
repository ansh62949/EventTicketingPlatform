import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

/**
 * High-performance Axios instance pre-configured with 
 * centralized base URL and authentication interceptors.
 */
const API = axios.create({
  baseURL: API_BASE_URL,
});

// Automatically attach Bearer token to every outbound request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;