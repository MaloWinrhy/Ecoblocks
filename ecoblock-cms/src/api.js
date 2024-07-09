import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

const handleResponse = (response) => response.data;
const handleError = (error) => {
    console.error('API call error:', error);
    throw error;
};

export const fetchUsers = () => {
    return apiClient.get('/users')
        .then(handleResponse)
        .catch(handleError);
};

export const createUser = (user) => {
    return apiClient.post('/users', user)
        .then(handleResponse)
        .catch(handleError);
};

export const updateUser = (id, user) => {
    return apiClient.put(`/users/${id}`, user)
        .then(handleResponse)
        .catch(handleError);
};

export const deleteUser = (id) => {
    return apiClient.delete(`/users/${id}`)
        .then(handleResponse)
        .catch(handleError);
};

export const fetchProducts = () => {
    return apiClient.get('/products')
        .then(handleResponse)
        .catch(handleError);
};

export const createProduct = (product) => {
    return apiClient.post('/products', product)
        .then(handleResponse)
        .catch(handleError);
};

export const updateProduct = (id, product) => {
    return apiClient.put(`/products/${id}`, product)
        .then(handleResponse)
        .catch(handleError);
};

export const deleteProduct = (id) => {
    return apiClient.delete(`/products/${id}`)
        .then(handleResponse)
        .catch(handleError);
};

export const fetchPosts = () => {
    return apiClient.get('/posts')
        .then(handleResponse)
        .catch(handleError);
};

export const createPost = (post) => {
    return apiClient.post('/posts', post)
        .then(handleResponse)
        .catch(handleError);
};

export const updatePost = (id, post) => {
    return apiClient.put(`/posts/${id}`, post)
        .then(handleResponse)
        .catch(handleError);
};

export const deletePost = (id) => {
    return apiClient.delete(`/posts/${id}`)
        .then(handleResponse)
        .catch(handleError);
};
