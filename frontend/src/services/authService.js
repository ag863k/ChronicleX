import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const signupUser = async (userData) => {
    try {
        const response = await apiClient.post('/auth/signup/', userData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw { message: "Network error. Please try again." };
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await apiClient.post('/auth/login/', credentials);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw { message: "Network error. Please try again." };
    }
};

export const logoutUser = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await apiClient.post('/auth/logout/', {}, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw { message: "Logout failed. Please try again." };
    }
};

export default apiClient; 