import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material'; // Removed Container from here, pages will manage their own
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Page components
import Navbar from './components/layout/Navbar';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import AuthPage from './pages/AuthPage';
import BlogCreatePage from './pages/BlogCreatePage';
import BlogEditPage from './pages/BlogEditPage';
import NotFoundPage from './pages/NotFoundPage';

// AuthProvider & ProtectedRoute
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

const enhancedDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#58a6ff', contrastText: '#ffffff' },
    secondary: { main: '#3fb950', contrastText: '#ffffff' },
    background: { 
      default: '#010409', 
      paper: '#0d1117'
    },
    text: { primary: '#e6edf3', secondary: '#7d8590' },
    divider: '#21262d',
    action: { active: '#58a6ff' }
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { color: '#e6edf3', fontWeight: 600 }, 
    h2: { color: '#e6edf3', fontWeight: 600 },
    h3: { color: '#e6edf3', fontWeight: 600 }, 
    h4: { color: '#e6edf3', fontWeight: 600 },
    h5: { color: '#e6edf3', fontWeight: 500 }, 
    h6: { color: '#e6edf3', fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 600 }
  },
  components: {
    MuiAppBar: { 
      styleOverrides: { 
        root: { 
          backgroundColor: '#161b22', 
          borderBottom: '1px solid #30363d', 
          boxShadow: 'none' 
        }
      }
    },
    MuiPaper: { 
      styleOverrides: { 
        root: { 
          backgroundColor: '#0d1117', 
          backgroundImage: 'none', 
          padding: '2rem', 
          border: '1px solid #30363d', 
          borderRadius: '8px' 
        }
      }
    },
    MuiButton: { 
      styleOverrides: { 
        root: { 
          borderRadius: '6px', 
          padding: '8px 16px' 
        }, 
        containedPrimary: { 
          '&:hover': { 
            backgroundColor: '#4090e3' 
          }
        }
      } 
    },
    MuiTextField: { 
      styleOverrides: { 
        root: { 
          '& .MuiOutlinedInput-root': { 
            '& fieldset': { borderColor: '#30363d' }, 
            '&:hover fieldset': { borderColor: '#58a6ff' }, 
            '&.Mui-focused fieldset': { borderColor: '#58a6ff' }, 
            backgroundColor: '#010409' 
          }, 
          '& .MuiInputLabel-root': { color: '#7d8590' }, 
          '& .MuiInputLabel-root.Mui-focused': { color: '#58a6ff' }
        }
      }
    },
  }
});

function App() {
  return (
    <ThemeProvider theme={enhancedDarkTheme}>
      <AuthProvider>
        <Router>
          <CssBaseline /> {}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              minHeight: '100vh', 
              background: `linear-gradient(180deg, #0d1117 0%, #010409 100%)`, 
              color: 'text.primary', 
            }}
          >
            <Navbar />
            {}
            <Box 
              component="main" 
              sx={{ 
                flexGrow: 1, 
                display: 'flex',
                flexDirection: 'column', 
                alignItems: 'center',    // Center children horizontally
                justifyContent: 'center', // Center children vertically
                width: '100%', 
                py: { xs: 2, sm: 3, md: 4 }, // Responsive vertical padding
              }}
            >
              {}
              <Routes>
                <Route path="/" element={<BlogListPage />} />
                <Route 
                  path="/blogs/new" 
                  element={
                    <ProtectedRoute>
                      <BlogCreatePage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/blogs/:id" element={<BlogDetailPage />} />
                <Route 
                  path="/blogs/:id/edit" 
                  element={
                    <ProtectedRoute>
                      <BlogEditPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/auth" element={<AuthPage />} /> 
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Box>
            {}
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
