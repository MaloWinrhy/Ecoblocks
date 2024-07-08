import axiosInstance from './apiConfig';

export const getAllBlogPosts = async () => {
  try {
    const response = await axiosInstance.get(`/posts`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the blog posts!", error);
    throw error;
  }
};
