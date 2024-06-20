import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getBlogPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the blog posts!", error);
    throw error;
  }
};
