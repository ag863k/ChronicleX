import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Alert, CircularProgress } from '@mui/material';
import BlogForm from '../components/blog/BlogForm';
import { createBlog } from '../services/blogService';
import useAuth from '../hooks/useAuth';

const BlogCreatePage = () => {
    const navigate = useNavigate();
    const { loading: authLoading } = useAuth();

    const [formError, setFormError] = useState('');
    const [formLoading, setFormLoading] = useState(false);

    // This is the function that will be passed to BlogForm as the 'onSubmit' prop
    const handleFormSubmit = async (blogData) => { 
        console.log("BlogCreatePage: handleFormSubmit called with data:", blogData); 
        setFormLoading(true);
        setFormError('');
        try {
            const newBlog = await createBlog(blogData); 
            console.log("BlogCreatePage: Blog created successfully, navigating...", newBlog);
            navigate(`/blogs/${newBlog.id}`);
        } catch (err) {
            let detailedError = 'Failed to create blog post. Please try again.';
            if (err && err.response && err.response.data) {
                const backendErrors = err.response.data;
                const messages = Object.values(backendErrors).flat().join(' ');
                if (messages) {
                    detailedError = messages;
                }
            } else if (err && err.message) {
                detailedError = err.message;
            }
            setFormError(detailedError);
            console.error("BlogCreatePage: Create blog error:", err.response || err);
        } finally {
            setFormLoading(false);
        }
    };

    const handleDiscard = () => {
        console.log("BlogCreatePage: Discarding post.");
        navigate(-1); 
    };

    if (authLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }
    
    // Route protection is handled by <ProtectedRoute> in App.jsx

    return (
        <Container maxWidth="md" sx={{ py: 4 }}> 
            <BlogForm
                onSubmit={handleFormSubmit} 
                onDiscard={handleDiscard}
                formTitle="Create Post"
                submitButtonText="Publish Post"
                loading={formLoading}
                error={formError}
            />
        </Container>
    );
};

export default BlogCreatePage;
