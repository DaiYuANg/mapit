import axios from 'axios';
import { TOKEN_KEY } from '../authProvider';

const request = axios.create({
  baseURL: '/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  function (config) {
    console.log('=== Request Interceptor Start ===');
    console.log('Request URL:', config.url);
    console.log('Current headers:', config.headers);
    config.headers['Timestamp'] = new Date().getTime();
    const token = localStorage.getItem(TOKEN_KEY);
    console.log('Token from localStorage:', token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Updated headers:', config.headers);
    }

    console.log('=== Request Interceptor End ===');
    return config;
  },
  function (error) {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  function (response) {
    console.log('=== Response Interceptor Start ===');
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    console.log('=== Response Interceptor End ===');
    return response;
  },
  function (error) {
    console.error('Response interceptor error:', error);
    if (error.response?.status === 401) {
      console.log('Unauthorized - clearing token');
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export { request };
