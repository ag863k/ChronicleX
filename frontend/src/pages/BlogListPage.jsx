import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, Grid, CircularProgress, Alert, Box, Pagination, Button, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import BlogItem from '../components/blog/BlogItem';
import { getAllBlogs } from '../services/blogService';
import useAuth from '../hooks/useAuth';

const BlogListPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { isAuthenticated } = useAuth();

    const ITEMS_PER_PAGE = 9; // Or get from backend if it dictates page size

    const fetchBlogs = useCallback(async (currentPage) => {
        setLoading(true);
        setError('');
        try {
            const data = await getAllBlogs(currentPage);
            
            if (data && Array.isArray(data.results)) {
                setBlogs(data.results);
                // For now, assuming the API gives 'count' and we can derive total pages
                setTotalPages(Math.ceil(data.count / (data.results.length > 0 ? data.results.length : ITEMS_PER_PAGE) )); 
                                                                                                    
            } else if (Array.isArray(data)) {
                setBlogs(data);
                setTotalPages(1);
            } else {
                setBlogs([]);
                setTotalPages(1);
                console.warn("Received unexpected data structure for blogs:", data);
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch blog posts.');
            console.error("Fetch blogs error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogs(page);
    }, [fetchBlogs, page]);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0); // Scroll to top on page change
    };

    if (loading && blogs.length === 0) { // Show full page loader only on initial load
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 128px)' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                 <Alert severity="error" sx={{ mt: 2, fontSize: '1.1rem' }}>{error}</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: {xs: 3, md: 4} }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    The ChronicleX Feed
                </Typography>
                {isAuthenticated && (
                    <Button
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/blogs/new"
                        startIcon={<AddIcon />}
                        sx={{ py: 1.25, px: 2.5 }}
                    >
                        Create Post
                    </Button>
                )}
            </Box>

            <Divider sx={{ mb: {xs: 3, md: 5}, borderColor: 'divider' }} />

            {blogs.length === 0 && !loading ? (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No blog posts found yet.
                    </Typography>
                    {isAuthenticated ? (
                        <Typography color="text.secondary">
                            Why not be the first to <Button component={RouterLink} to="/blogs/new" color="primary">create one</Button>?
                        </Typography>
                    ) : (
                         <Typography color="text.secondary">
                            Check back later for new articles!
                        </Typography>
                    )}
                </Box>
            ) : (
                <Grid container spacing={4}> {/* Increased spacing */}
                    {blogs.map((blog) => (
                        <Grid item xs={12} sm={6} md={4} key={blog.id}>
                            <BlogItem blog={blog} />
                        </Grid>
                    ))}
                </Grid>
            )}

            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: {xs: 4, md: 6}, mb: 2 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary" 
                        size="large"
                        sx={{
                            '& .MuiPaginationItem-root': {
                                color: 'text.secondary', 
                            },
                            '& .Mui-selected': {
                                backgroundColor: 'primary.main',
                                color: 'primary.contrastText', // Ensure selected number is visible
                                '&:hover': {
                                    backgroundColor: 'primary.dark',
                                }
                            },
                        }}
                    />
                </Box>
            )}
        </Container>
    );
};

export default BlogListPage;
