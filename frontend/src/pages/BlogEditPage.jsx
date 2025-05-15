import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Container, Typography, Box, Alert, CircularProgress } from '@mui/material';
import BlogForm from '../components/blog/BlogForm'; // Reusable form
import { getBlogById, updateBlog } from '../services/blogService'; // API service functions
import useAuth from '../hooks/useAuth'; // To protect the route and check author

const BlogEditPage = () => {
    const { id: blogId } = useParams(); // Get blog ID from URL
    const navigate = useNavigate();
    const { isAuthenticated, user, loading: authLoading } = useAuth();

    const [initialData, setInitialData] = useState(null);
    const [pageLoading, setPageLoading] = useState(true); // For fetching initial blog data
    const [formLoading, setFormLoading] = useState(false); // For form submission
    const [pageError, setPageError] = useState('');
    const [formError, setFormError] = useState('');

    const fetchBlogToEdit = useCallback(async () => {
        setPageLoading(true);
        setPageError('');
        try {
            const data = await getBlogById(blogId);
            // Basic check: ensure the logged-in user is the author before allowing edit
            if (user && data.author !== user.id) {
                setPageError("You are not authorized to edit this post.");
                setInitialData(null); // Prevent form from loading with data
            } else {
                setInitialData(data);
            }
        } catch (err) {
            setPageError(err.message || 'Failed to fetch blog post for editing.');
            console.error("Fetch blog for edit error:", err);
        } finally {
            setPageLoading(false);
        }
    }, [blogId, user]); // Add user to dependency array

    useEffect(() => {
        if (isAuthenticated && user) { // Only fetch if user is loaded and authenticated
            fetchBlogToEdit();
        }
    }, [fetchBlogToEdit, isAuthenticated, user]);


    const handleSubmit = async (blogData) => {
        // blogData will be { title, content } from BlogForm
        setFormLoading(true);
        setFormError('');
        try {
            await updateBlog(blogId, blogData);
            navigate(`/blogs/${blogId}`); // Redirect to the blog's detail page after update
        } catch (err) {
            setFormError(err.message || 'Failed to update blog post. Please try again.');
            console.error("Update blog error:", err);
        } finally {
            setFormLoading(false);
        }
    };

    // Handle auth loading state
    if (authLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Protect the route: If not authenticated, redirect to login/auth page
    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    // Handle page loading state (fetching the blog to edit)
    if (pageLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (pageError) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Alert severity="error">{pageError}</Alert>
            </Container>
        );
    }
    
    if (!initialData && !pageLoading) { // If loading finished but no data (e.g. blog not found or auth error)
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Alert severity="warning">Blog post not found or you are not authorized to edit it.</Alert>
            </Container>
        );
    }


    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <BlogForm
                onSubmit={handleSubmit}
                initialData={initialData} // Pass fetched data to pre-fill the form
                formTitle="Edit Your Blog Post"
                submitButtonText="Save Changes"
                loading={formLoading}
                error={formError}
            />
        </Container>
    );
};

export default BlogEditPage;
