import { fetchUtils } from 'react-admin';
import { jwtDecode }from 'jwt-decode';

const apiUrl = 'http://localhost:8000';

const authProvider = {
  login: async ({ email, password }) => {
    const request = new Request(`${apiUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    const response = await fetchUtils.fetchJson(request);
    const { token } = response.json;
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token in authProvider:", decodedToken); // Print the decoded token
    const role = decodedToken.role;
    if (role !== 'ADMIN') {
      throw new Error('Access denied');
    }
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    return Promise.resolve();
  },
  checkAuth: () => {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: () => {
    const role = localStorage.getItem('role');
    return role ? Promise.resolve(role) : Promise.reject();
  },
};

export default authProvider;
