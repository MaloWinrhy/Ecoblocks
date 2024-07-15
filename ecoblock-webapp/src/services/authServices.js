import axiosInstance from './apiConfig';

export const register = async (username, email, password, subscribeNewsletter) => {
  try {
    const response = await axiosInstance.post('/register', { username, email, password, subscribeNewsletter });
    return response.data;
  } catch (error) {
    console.error("There was an error registering!", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error("There was an error logging in!", error);
    throw error;
  }
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const clearToken = () => {
  localStorage.removeItem('token');
};
