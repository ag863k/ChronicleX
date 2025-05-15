import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';   

const NotFoundPage = () => {
    return (
        <Box sx={{ textAlign: 'center', marginTop: '5rem' }}>
                <Typography variant="h1" component="h1" gutterBottom>
404
</Typography>
<Typography variant="h5" component="h2" gutterBottom>
Oops! Page Not Found.
</Typography>
<Typography gutterBottom>
The page you are looking for does not seem to exist.
</Typography>
<Button component={RouterLink} to="/" variant="contained" sx={{ marginTop: '1rem' }}>
Go to Homepage
</Button>
</Box>
);
};
export default NotFoundPage;