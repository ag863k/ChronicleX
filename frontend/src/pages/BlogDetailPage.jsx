import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Alert, Paper, Button, Divider } from '@mui/material'; // Removed IconButton as it wasn't used for these buttons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { getBlogById, deleteBlog } from '../services/blogService';
import useAuth from '../hooks/useAuth';

const BlogDetailPage = () => {
    const { id: blogId } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user, loading: authLoading } = useAuth();

    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true); // For fetching blog data
    const [actionLoading, setActionLoading] = useState(false); // For delete/edit actions
    const [error, setError] = useState('');
    const [deleteError, setDeleteError] = useState('');

    const [isAuthor, setIsAuthor] = useState(false); // State for isAuthor

    useEffect(() => {
        console.log("BlogDetailPage: Auth State updated or component re-rendered:", { isAuthenticated, user, authLoading });
        if (blog && user && isAuthenticated) {
            const authorCheck = user.id === blog.author;
            console.log("BlogDetailPage: Performing author check...");
            console.log("BlogDetailPage: user.id from AuthContext:", user.id, "(type:", typeof user.id + ")");
            console.log("BlogDetailPage: blog.author from API:", blog.author, "(type:", typeof blog.author + ")");
            console.log("BlogDetailPage: user.id === blog.author is:", authorCheck);
            setIsAuthor(authorCheck);
        } else {
            // Reset if blog or user is not available, or not authenticated
            setIsAuthor(false);
            if (!authLoading) { // Only log if auth isn't still loading
                 console.log("BlogDetailPage: Conditions for author check not met yet or user not author.", {isAuthenticated, blogExists: !!blog, userExists: !!user});
            }
        }
    }, [isAuthenticated, user, blog, authLoading]); // Re-evaluate when these change


    const fetchBlog = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            console.log(`BlogDetailPage: Fetching blog with ID: ${blogId}`);
            const data = await getBlogById(blogId);
            console.log("BlogDetailPage: Blog data fetched:", data);
            setBlog(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch blog post details.');
            console.error(`Fetch blog (ID: ${blogId}) error:`, err);
        } finally {
            setLoading(false);
        }
    }, [blogId]);

    useEffect(() => {
        if (!authLoading) { // Fetch blog only after auth status is resolved
            fetchBlog();
        }
    }, [fetchBlog, authLoading]); // Add authLoading as a dependency

    const handleDelete = async () => {
        if (!blog || !window.confirm('Are you sure you want to delete this post?')) {
            return;
        }
        setActionLoading(true); 
        setDeleteError('');
        try {
            await deleteBlog(blog.id);
            navigate('/'); 
        } catch (err) {
            setDeleteError(err.message || 'Failed to delete blog post.');
            console.error(`Delete blog (ID: ${blog.id}) error:`, err);
        } finally {
            setActionLoading(false); 
        }
    };
    
    // Combined loading state for initial page load
    if (authLoading || loading) { 
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;
    }

    if (!blog) {
        // This could be due to an error during fetch or if blogId is invalid (API returned 404)
        return <Alert severity="warning" sx={{ mt: 2 }}>Blog post not found or failed to load.</Alert>;
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                component={RouterLink}
                to="/"
                sx={{ mb: 2 }}
            >
                Back to All Posts
            </Button>
            <Paper elevation={0} sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                <Typography 
                    variant="h3" 
                    component="h1" 
                    gutterBottom 
                    sx={{ fontWeight: 'bold', wordBreak: 'break-word' }}
                >
                    {blog.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary', flexWrap: 'wrap' }}>
                    <AccountCircleIcon sx={{ mr: 0.5, fontSize: '1.2rem' }} />
                    <Typography variant="body2" sx={{ mr: 2 }}>
                        By: {blog.author_username || 'Unknown Author'}
                    </Typography>
                    <CalendarTodayIcon sx={{ mr: 0.5, fontSize: '1.1rem' }} />
                    <Typography variant="body2">
                        Published: {new Date(blog.publication_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, wordBreak: 'break-word' }}>
                    {blog.content}
                </Typography>

                {}
                {isAuthor && (
                    <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<EditIcon />}
                            component={RouterLink}
                            to={`/blogs/${blog.id}/edit`}
                            disabled={actionLoading} 
                        >
                            Edit Post
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteIcon />}
                            onClick={handleDelete}
                            disabled={actionLoading} 
                        >
                            {actionLoading ? 'Deleting...' : 'Delete Post'}
                        </Button>
                    </Box>
                )}
                {deleteError && <Alert severity="error" sx={{ mt: 2 }}>{deleteError}</Alert>}
            </Paper>
        </Container>
    );
};

export default BlogDetailPage;
