import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  // ❌ DO NOT set Content-Type globally
  // Axios will automatically set:
  // - application/json for normal requests
  // - multipart/form-data for file uploads
});

/* ===============================
   REQUEST INTERCEPTOR
   Attach JWT token
================================ */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ===============================
   RESPONSE INTERCEPTOR
   Smart 401 handling
================================ */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || '';

    if (status === 401) {
      // ❗ Do NOT auto-logout for profile-related APIs
      // This prevents logout loops during:
      // - profile fetch
      // - resume upload
      // - profile photo upload
      if (!url.includes('/profile')) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
