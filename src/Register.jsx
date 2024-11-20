import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container, Typography, Snackbar, Alert, IconButton, InputAdornment, CircularProgress, Backdrop, Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Theme';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to manage confirm password visibility
    const [open, setOpen] = useState(false); // State for Snackbar visibility
    const [error, setError] = useState(''); // State for error message
    const [loading, setLoading] = useState(false); // State for loading indicator
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true); // Show loading indicator

        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                name,
                email,
                password,
            });
            console.log('Registration successful', response.data);
            setLoading(false); // Hide loading indicator
            setOpen(true); // Show Snackbar on success

            // Redirect to user list page 
            navigate('/users');
        } catch (error) {
            console.error('There was an error registering!', error);
            setLoading(false); // Hide loading indicator
            setError('Registration failed. Please try again.');
        }
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <ThemeProvider theme={theme}> 
            <CssBaseline />
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
                backgroundImage: 'url(images/laundry-bg-low.jpg)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}>
                <Container maxWidth="xs" sx={{
                    boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.6)',
                    padding: '30px',
                    height: '520px',
                    borderRadius: '10px',
                    backgroundColor: '#ffffff',
                    }}>
                    <Typography variant="h4" component="h1" color="primary" gutterBottom sx={{fontFamily: 'fantasy',}}>
                        Create Account
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Full Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            slotProps={{
                                input: {
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
                                },
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
                            }}
                        />
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
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
                            }}
                        />
                        <Box sx={{width: '100%', height: '20px', marginBottom: '5px',}}>
                            {error && <Typography color="error" sx={{fontSize: '13px',}}>{error}</Typography>}
                        </Box>

                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} size="large">
                            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                        </Button>
                    </form>
                    
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Registration successful!
                        </Alert>
                    </Snackbar>

                    <Backdrop open={loading} style={{ zIndex: 1301 }}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Container>
            </Box>
    </ThemeProvider>
    );
}

export default Register;
