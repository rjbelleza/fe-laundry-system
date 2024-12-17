import api from './api';

export const logout = async () => {
    try {
        await api.post('/logout');
        localStorage.removeItem('authToken'); // Remove the token from localStorage or any other storage mechanism used
        window.location.href = '/login'; // Redirect to the login page
    } catch (error) {
        console.error('Failed to log out', error);
    }
};
