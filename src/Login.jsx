import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Link, IconButton, InputAdornment, CircularProgress, Backdrop } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import theme from './Theme';
import api from './services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // State for loading indicator
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Show loading indicator

        try {
            const response = await api.post('/login', { email, password });

            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);

                // Check the user's role and navigate accordingly 
                const userRole = response.data.role;

                if (userRole === 'admin') { 
                    navigate('/admin'); 
                } else if (userRole === 'customer') { 
                    navigate('/dashboard'); 
                } else { 
                    navigate('/'); 
                }
            }
        } catch (error) {
            setError('Invalid login credentials');
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container
                maxWidth
                disableGutters
                sx={{
                    backgroundImage: 'url(images/laundry-bg-low.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Container
                    sx={{
                        boxShadow: '10px 10px 10px rgba(0, 0, 0, 6)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '370px',
                        width: '350px',
                        zIndex: '999',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                    }}
                >
                    <Typography
                        variant="h5"
                        component="h1"
                        color="primary"
                        gutterBottom
                        sx={{ fontFamily: 'fantasy', marginTop: '15px' }}
                    >
                        Welcome Back!
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                        <TextField
                            color="secondary"
                            label="Email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#EE66A6',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#D91656',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#EE66A6',
                                    },
                                },
                            }}
                        />
                        <TextField
                            color="secondary"
                            label="Password"
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#EE66A6',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#D91656',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#EE66A6',
                                    },
                                },
                                marginBottom: '20px',
                            }}
                        />
                        <Button variant="contained" color="primary" type="submit" size="large" fullWidth disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Login'}
                        </Button>
                        <Container maxWidth sx={{height: '20px'}}>
                            {error && (
                                <Typography color="error" sx={{ fontSize: '13px', marginTop: '10px' }}>
                                    {error}
                                </Typography>
                            )}
                        </Container>
                        <Typography variant="body2" align="center" sx={{ marginTop: '35px' }}>
                            <Link href="/forgot-password" color="primary">
                                Forgot your password?
                            </Link>
                        </Typography>
                    </form>

                    {/* Backdrop for loading indicator */}
                    <Backdrop open={loading} style={{ zIndex: 1301 }}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Container>
            </Container>
        </ThemeProvider>
    );
};

export default Login;
