import axiosInstance from './apiConfig';

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get('/profile');
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the profile!", error);
    throw error;
  }
};
