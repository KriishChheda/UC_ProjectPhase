// api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // Update if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Skip token for these endpoints
const isPublicRoute = (url) =>
  url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/auth/token/refresh');

API.interceptors.request.use(
  (config) => {
    if (!isPublicRoute(config.url)) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Refresh token on 401
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refreshToken')
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem('refreshToken');
        const res = await axios.post('http://localhost:8000/auth/token/refresh/', { refresh });

        const newAccess = res.data.access;
        localStorage.setItem('accessToken', newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axios(originalRequest);
      } catch (refreshErr) {
        console.error('Token refresh failed:', refreshErr);
        // Optional: Logout or redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default API;
