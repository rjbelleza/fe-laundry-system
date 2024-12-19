import api from './api';

export const logout = async () => {
    try {
        await api.post('/logout');
        localStorage.removeItem('auth_token'); // Remove the token from localStorage
        sessionStorage.clear(); // Clear session storage
        window.location.href = '/'; // Redirect to the login page
    } catch (error) {
        console.error('Failed to log out', error);
    }
};
