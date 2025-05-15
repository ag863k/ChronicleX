import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const blogApiClient = axios.create({
    baseURL: `${API_BASE_URL}/blogs/`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to get the token from localStorage
const getAuthToken = () => localStorage.getItem('authToken');

// Interceptor to add the token to requests if it exists
blogApiClient.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
            console.log('blogService: Authorization header added to request:', config.headers['Authorization']);
        } else {
            console.log('blogService: No token found, Authorization header not added.');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const getAllBlogs = async (page = 1) => {
    try {
        const response = await blogApiClient.get(`?page=${page}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all blogs:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error("Failed to fetch blog posts.");
    }
};

export const getBlogById = async (blogId) => {
    try {
        const response = await blogApiClient.get(`${blogId}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching blog with ID ${blogId}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error("Failed to fetch blog details.");
    }
};

export const createBlog = async (blogData) => {
    try {
        // Token is now added 
        const response = await blogApiClient.post('', blogData);
        return response.data;
    } catch (error) {
        console.error("Error creating blog post:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error("Failed to create blog post.");
    }
};

export const updateBlog = async (blogId, blogData) => {
    try {
        // Token is now added 
        const response = await blogApiClient.put(`${blogId}/`, blogData);
        return response.data;
    } catch (error) {
        console.error(`Error updating blog with ID ${blogId}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error("Failed to update blog post.");
    }
};

export const deleteBlog = async (blogId) => {
    try {
        // Token is now added 
        const response = await blogApiClient.delete(`${blogId}/`);
        return response.data; 
    } catch (error) {
        console.error(`Error deleting blog with ID ${blogId}:`, error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error("Failed to delete blog post.");
    }
};
