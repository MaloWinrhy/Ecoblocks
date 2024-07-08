import axiosInstance from './apiConfig';

export const getAllBlogProducts = async () => {
  try {
    const response = await axiosInstance.get('/products');
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the products!", error);
    throw error;
  }
};
