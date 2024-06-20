// src/services/apiServices.js
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const getBlogPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    log(response.data);
    return response.data;
  } catch (error) {
    error("There was an error fetching the blog posts!", error);
    throw error;
  }
};
