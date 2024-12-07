import React, { useState, useEffect } from 'react';
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
    const [address, setAddress] = useState(''); 
    const [mobile, setMobile] = useState('09'); 
    const [postalCode, setPostalCode] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to manage confirm password visibility
    const [open, setOpen] = useState(false); // State for Snackbar visibility
    const [error, setError] = useState(''); // State for error message
    const [loading, setLoading] = useState(false); // State for loading indicator
    const navigate = useNavigate();

    useEffect(() => { 
        const input = document.getElementById('mobile-number'); 
        if (input) { 
            input.selectionStart = input.selectionEnd = input.value.length; 
        } 
    }, []);

    const handleChange = (e) => { 
        const { id, value } = e.target; 
        if (id === 'mobile-number') { 
            if (!value.startsWith('09')) { 
                setMobile('09'); 
            } else { 
                setMobile(value); } 
            }  
        };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate mobile and postal code lengths 
        if (mobile.length !== 11) { 
            setError('Mobile number must be exactly 11 digits'); 
            return; 
        }

        if (postalCode.length !== 4) {
            setError('Invalid Postal Code.');
            return; 
        }

        setLoading(true); // Show loading indicator

        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                name,
                email,
                password,
                address,
                mobile: mobile.slice(2),
                postal_code: postalCode,
            });

            // Store the token in localStorage 
            localStorage.setItem('auth_token', response.data.token);

            console.log('Registration successful', response.data);
            setLoading(false); // Hide loading indicator
            setOpen(true); // Show Snackbar on success

            // Delay navigation for 3 seconds 
            setTimeout(() => { navigate('/dashboard'); }, 2000);
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
                <Container sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.6)',
                    padding: '30px',
                    height: '570px',
                    width: '400px',
                    borderRadius: '10px',
                    backgroundColor: '#f7f0df',
                    }}>
                    <Typography variant="h5" component="h1" color="primary" gutterBottom 
                        sx={{fontFamily: 'Poppins-Bold', width: '100%', marginLeft: '50px', marginBottom: '10px',}}>
                        Create Account
                    </Typography>
                        <form 
                            onSubmit={handleSubmit}
                            style={{
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '15px',
                            }}>
                            <TextField
                                label="Full Name"
                                variant="outlined"
                                margin="normal"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                size="small"
                                sx={{
                                    width: '300px',
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
                                margin="normal"
                                type="email"
                                value={email}
                                size="small"
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{
                                    marginTop: '-10px',
                                    width: '300px',
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
                                margin="normal"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                size="small"
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
                                    marginTop: '-10px',
                                    width: '300px',
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
                                margin="normal"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                size="small"
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
                                    marginTop: '-10px',
                                    width: '300px',
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
                                label="Address" 
                                variant="outlined"
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)}
                                size="small"
                                sx={{
                                    width: '300px',
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
                                label="Postal Code" 
                                variant="outlined"
                                margin="normal" 
                                value={postalCode} 
                                onChange={(e) => setPostalCode(e.target.value)}
                                size="small"
                                sx={{
                                    marginTop: '-10px',
                                    width: '300px',
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
                                id="mobile-number" 
                                label="Mobile Number" 
                                variant="outlined" 
                                margin="normal" 
                                size="small" 
                                value={mobile} 
                                onChange={handleChange}
                                sx={{ 
                                    marginTop: '-10px', 
                                    width: '300px', 
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
                                }} /> 
                            
                            <Box sx={{width: '300px', height: '10px'}} maxWidth>
                                {error && <Typography color="error" sx={{fontSize: '13px',}}>{error}</Typography>}
                            </Box>

                            <Button type="submit" variant="contained" color="primary" disabled={loading}
                                sx={{width: '330px', height: '40px',}}>
                                {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                            </Button>
                        </form>
                    
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success"  variant="filled" sx={{ width: '100%', backgroundColor: '#31f756', }}>
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
