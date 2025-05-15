import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const signupUser = async (userData) => {
    // userData: { username, email, password }
    try {
        const response = await apiClient.post('/auth/signup/', userData);
        return response.data; // Expected: { id, username, email, blogs: [] }
    } catch (error) {
        console.error("Error during signup:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error("Signup failed");
    }
};

export const loginUser = async (credentials) => {
    // credentials: { username, password }
    try {
        const response = await apiClient.post('/auth/login/', credentials);
        // Expected: { token, user_id, username, email }
        return response.data;
    } catch (error) {
        console.error("Error during login:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error("Login failed");
    }
};

export const logoutUser = async () => {
    try {
        const response = await apiClient.post('/auth/logout/');
        return response.data; // Expected: { detail: "Successfully logged out." }
    } catch (error) {
        console.error("Error during logout:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error("Logout failed");
    }
};

export default apiClient; 