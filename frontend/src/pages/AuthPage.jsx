import React, { useState } from 'react';
import { Container, Paper, Box, Avatar, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

const AuthPage = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const switchModeHandler = () => {
        setIsLoginMode((prevMode) => !prevMode);
    };

    return (
        // Its maxWidth="xs" keeps the form itself narrow.
        <Container component="section" maxWidth="xs" sx={{my: 2}}> {}
            <Paper 
                elevation={0} // Theme provides border, so elevation 0 for flatter look
                sx={{ 
                    // Example: p: { xs: 2, sm: 3 },
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ mt: 1, mb:1, bgcolor: 'secondary.main' }}> {}
                    <LockOutlinedIcon />
                </Avatar>
                {}
                {isLoginMode ? (
                    <LoginForm onSwitchMode={switchModeHandler} />
                ) : (
                    <SignupForm onSwitchMode={switchModeHandler} onSignupSuccess={() => setIsLoginMode(true)} />
                )}
            </Paper>
        </Container>
    );
};

export default AuthPage;
