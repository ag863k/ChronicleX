import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Box, CircularProgress } from '@mui/material';

/**
 * A component to protect routes that require authentication.
 * If the user is authenticated, it renders the children (the protected component).
 * If the user is not authenticated, it redirects to the /auth page.
 * It also handles the loading state of the authentication context.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children 
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const location = useLocation(); 

    if (authLoading) {
        // Show a loading spinner while authentication status is being determined
        return (
            <Box 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: 'calc(100vh - 64px)', 
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (!isAuthenticated) {
        // User is not authenticated, redirect to login page.
        // Pass the current location in state so we can redirect back after login.
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    // User is authenticated, render the child component (the protected page)
    return children;
};

export default ProtectedRoute;
