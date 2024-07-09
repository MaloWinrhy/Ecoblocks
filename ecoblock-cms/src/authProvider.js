import { fetchUtils } from 'react-admin';
import axios from 'axios';

const loginUrl = 'http://localhost:8000/login';
const authProvider = {
    login: async ({ email, password }) => {
        try {
            const response = await axios.post(loginUrl, { email, password });
            const { token } = response.data;
            localStorage.setItem('authToken', token);
        } catch (error) {
            throw new Error('Invalid email or password');
        }
    },
    logout: () => {
        localStorage.removeItem('authToken');
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('authToken') ? Promise.resolve() : Promise.reject();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('authToken');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: () => Promise.resolve(),
};

export default authProvider;
