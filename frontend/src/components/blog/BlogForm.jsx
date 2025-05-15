import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Alert, Paper, Stack } from '@mui/material';

const BlogForm = ({ onSubmit, onDiscard, initialData = null, formTitle = "Blog Post", submitButtonText = "Submit", loading, error }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '');
            setContent(initialData.content || '');
        } else {
            setTitle('');
            setContent('');
        }
    }, [initialData]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert("Title and content cannot be empty."); // Simple validation
            return;
        }
        // Ensure onSubmit is a function before calling it
        if (typeof onSubmit === 'function') {
            onSubmit({ title, content });
        } else {
            console.error("onSubmit prop is not a function or not provided to BlogForm", onSubmit);
        }
    };

    const handleDiscard = () => {
        if (onDiscard) {
            onDiscard();
        } else {
            setTitle('');
            setContent('');
        }
    };

    return (
        <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography component="h1" variant="h5" gutterBottom align="center" sx={{ mb: 3, fontWeight: 'medium' }}>
                {formTitle}
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Blog Title"
                    name="title"
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                    sx={{ mb: 2 }}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="content"
                    label="Blog Content"
                    id="content"
                    multiline
                    rows={12}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={loading}
                    sx={{ mb: 3 }}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="flex-end">
                    <Button
                        variant="outlined"
                        color="error" // Changed to "error" for a red color
                        onClick={handleDiscard}
                        disabled={loading}
                        sx={{ py: 1.25 }}
                    >
                        Discard
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ py: 1.25 }}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : submitButtonText}
                    </Button>
                </Stack>
            </Box>
        </Paper>
    );
};

export default BlogForm;
