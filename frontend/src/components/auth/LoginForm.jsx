import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert, CircularProgress, Link } from '@mui/material'; // Added CircularProgress and Link
import useAuth from '../../hooks/useAuth';
import { loginUser } from '../../services/authService';

const LoginForm = ({ onSwitchMode }) => {
    const [identifier, setIdentifier] = useState(''); 
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        if (!identifier.trim() || !password.trim()) { // Basic frontend validation
            setError('Username/Email and password cannot be empty.');
            return;
        }
        setLoading(true);
        try {
            // Backend expects 'username' key, our custom backend handles if it's email or username
            const data = await loginUser({ username: identifier, password });
            login({ id: data.user_id, username: data.username, email: data.email }, data.token);
            navigate(from, { replace: true });
        } catch (err) {
            // More specific error from backend if available
            if (err && err.response && err.response.data && err.response.data.non_field_errors) {
                setError(err.response.data.non_field_errors.join(' '));
            } else if (err.detail) {
                setError(err.detail);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError('Failed to login. Please check your credentials.');
            }
            console.error("Login error:", err.response || err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}> {}
            <Typography component="h1" variant="h5" align="center" gutterBottom> {}
                Sign In
            </Typography>
            {error && <Alert severity="error" sx={{ mt: 2, mb: 1, width: '100%' }}>{error}</Alert>}
            <TextField
                margin="normal"
                required
                fullWidth
                id="identifier" 
                label="Username or Email" 
                name="identifier"
                autoComplete="username email" // Helps browser autofill
                autoFocus
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                disabled={loading}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
            />
            {/* Optional: "Forgot password?" link could go here */}
            {/* <Box sx={{ textAlign: 'right', my: 1 }}>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
            </Box> 
            */}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 1, py: 1.25 }} // Adjusted padding and margin
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null} 
            >
                {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            <Button 
                fullWidth 
                onClick={onSwitchMode} 
                disabled={loading}
                sx={{ mb: 2 }} 
            >
                Don't have an account? Sign Up
            </Button>
        </Box>
    );
};

export default LoginForm;
&lt;br/>
