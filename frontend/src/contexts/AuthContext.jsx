import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [token, setToken] = useState(localStorage.getItem('authToken')); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            console.log('AuthContext: Axios default Authorization header SET with token:', token); // Debug log
            localStorage.setItem('authToken', token); 
        } else {
            delete axios.defaults.headers.common['Authorization'];
            console.log('AuthContext: Axios default Authorization header DELETED.'); // Debug log
            localStorage.removeItem('authToken');
        }
        setLoading(false); 
    }, [token]);

    const login = (userData, userToken) => {
        console.log('AuthContext: login function called. Token:', userToken); // Debug log
        setUser(userData); 
        setToken(userToken); // This will trigger the useEffect above
    };

    const logout = () => {
        console.log('AuthContext: logout function called.'); // Debug log
        setUser(null);
        setToken(null); // This will trigger the useEffect above
    };

    const isAuthenticated = !!token; 

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
