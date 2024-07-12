import { getToken } from '../services/authServices';

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};
