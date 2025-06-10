import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, SvgIcon } from '@mui/material'; 
import useAuth from '../../hooks/useAuth';
import { logoutUser } from '../../services/authService';
const XLogoIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path d="M16.75 2h-3.5L9.5 9.25 5.75 2H2.25l5.5 8.25L2 22h3.5l3.75-7.25L13 22h3.5l-5.5-8.25L16.75 2zm-3.5 16.5L10 14.25l-1.25-2L5.25 4h1.5l2.5 4.25L12.5 14l1.25 2L17.25 20h-1.5l-2.5-4.25z"/>
  </SvgIcon>
);


const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error('Logout error:', error);
            // Even if backend logout fails, clear frontend state
        } finally {
            logout();
            navigate('/');
        }
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                    {/* <XLogoIcon sx={{ mr: 1.5, fontSize: '2rem' }} /> */} {/* Uncomment if you like the XLogoIcon */}
                    <Typography 
                        variant="h5" // Made it h5 for more prominence
                        noWrap
                        sx={{
                            // Styling for "Chroniclex" to be more logo-like
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            // fontFamily: '"Your Special Font", Roboto, Arial, sans-serif',
                            // textShadow: '0px 0px 3px rgba(120, 180, 255, 0.3)',
                        }}
                    >
                        ChronicleX
                    </Typography>
                </Box>
                
                <Box>
                    {isAuthenticated ? (
                        <>
                            {/* <Typography sx={{ mr: 2, display: { xs: 'none', sm: 'inline' } }}>
                                Hi, {user?.username || 'User'}
                            </Typography> */}
                            <Button color="inherit" component={RouterLink} to="/blogs/new" sx={{mr:1}}>
                                New Post
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button color="inherit" component={RouterLink} to="/auth">
                            Login / Signup
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
