import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { loginUser } from '../../services/authService';

const LoginForm = ({ onSwitchMode }) => {
    const [username, setUsername] = useState('');
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
        setLoading(true);        try {
            const data = await loginUser({ username, password });
            login({ id: data.user_id, username: data.username, email: data.email }, data.token);
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.detail || err.message || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography component="h1" variant="h5">
                Sign In
            </Typography>
            {error && <Alert severity="error" sx={{ mt: 2, mb: 1 }}>{error}</Alert>}
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
            >
                {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            <Button fullWidth onClick={onSwitchMode} disabled={loading}>
                Don't have an account? Sign Up
            </Button>
        </Box>
    );
};

export default LoginForm;
