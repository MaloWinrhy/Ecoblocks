import { fetchUtils } from 'react-admin';

const apiUrl = 'http://localhost:8000';
const httpClient = fetchUtils.fetchJson;

const checkApiConnectivity = async () => {
  try {
    const response = await httpClient(`${apiUrl}/posts`);
    if (response.status >= 200 && response.status < 300) {
      return true;
    }
  } catch (error) {
    console.error('API is not reachable:', error);
  }
  return false;
};

export default checkApiConnectivity;
