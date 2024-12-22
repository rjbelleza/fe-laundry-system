import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Add a request interceptor to include the token
api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

api.interceptors.response.use(function (response) { 
    // Any status code that lies within the range of 2xx causes this function to trigger 
    return response; 
}, function (error) { 
    if (error.response.status === 401) { 
        // Handle token expiration or unauthorized access 
        console.error("Unauthorized access - perhaps the token has expired?"); 
        // Optionally, redirect to login or refresh token 
        window.location.href = '/login'; 
    } 
    return Promise.reject(error);
});

export default api;
