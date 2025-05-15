import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Box, Chip, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // For Read More

const BlogItem = ({ blog }) => {
  const truncateContent = (content, maxLength = 120) => { // Slightly shorter for card
    if (!content) return '';
    if (content.length <= maxLength) {
      return content;
    }
    return content.substring(0, maxLength).trim() + '...';
  };

  return (
    <Card 
      sx={{ 
        mb: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        bgcolor: 'background.paper', 
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: '8px', 
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)', 
        }
      }}
      elevation={0} 
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
            variant="h5" 
            component={RouterLink} 
            to={`/blogs/${blog.id}`}
            gutterBottom 
            sx={{ 
                fontWeight: '600', 
                color: 'text.primary',
                textDecoration: 'none',
                '&:hover': {
                    color: 'primary.main',
                }
            }}
        >
          {blog.title || 'Untitled Post'}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5, color: 'text.secondary', flexWrap: 'wrap' }}>
          <AccountCircleIcon sx={{ mr: 0.75, fontSize: '1.1rem', verticalAlign: 'middle' }} />
          <Typography variant="caption" sx={{ mr: 2, display: 'inline-flex', alignItems: 'center' }}>
             {blog.author_username || 'Unknown Author'}
          </Typography>
          <CalendarTodayIcon sx={{ mr: 0.75, fontSize: '1rem', verticalAlign: 'middle' }} />
          <Typography variant="caption" sx={{ display: 'inline-flex', alignItems: 'center' }}>
            {blog.publication_date ? new Date(blog.publication_date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric'
            }) : 'N/A'}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph sx={{ minHeight: '60px' }}> 
          {/* Ensure a minimum height for content consistency */}
          {truncateContent(blog.content)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-start', p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Button 
          size="small" 
          variant="outlined" // Changed to outlined for a less heavy look, primary color gives emphasis
          color="primary"
          component={RouterLink} 
          to={`/blogs/${blog.id}`}
          endIcon={<ArrowForwardIcon />}
        >
          Read More
        </Button>
        {/* Example Chip for tags - you can add this if you implement tags */}
        {/* <Chip label="Tech" size="small" variant="outlined" sx={{ ml: 'auto', color: 'text.secondary', borderColor: 'text.secondary' }} /> */}
      </CardActions>
    </Card>
  );
};

export default BlogItem;
