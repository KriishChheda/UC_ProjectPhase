// api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000', // Update if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: add access token to headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: refresh token on 401 error
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 and prevent infinite loop
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
        return axios(originalRequest); // retry original request
      } catch (refreshErr) {
        console.error('Token refresh failed:', refreshErr);
        // Optional: redirect to login or logout user here
      }
    }

    return Promise.reject(error);
  }
);

export default API;
