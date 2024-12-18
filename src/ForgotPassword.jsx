import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar, Alert, Paper, Box, Backdrop, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Theme';
import api from './services/api';
import './fonts/fonts.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [loading, setLoading] = useState(false); // State for loading indicator

    const handleForgotPassword = async () => {
        setLoading(true); // Show loading indicator
        try {
            await api.post('/password/email', { email });
            setSnackbarMessage('Reset link sent to your email');
            setSnackbarSeverity('success');
        } catch (error) {
            setSnackbarMessage('Failed to send reset link');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
            setLoading(false); // Hide loading indicator
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box 
                sx={{ backgroundImage: 'url(images/laundry-bg-low.jpg)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}>
                <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Paper elevation={5} sx={{ padding: '30px' }}>
                        <Typography variant="h5" component="h1" gutterBottom sx={{ fontFamily: 'Poppins-Bold' }}>
                            Forgot Password
                        </Typography>
                        <Typography sx={{ fontSize: '14px', marginTop: '15px', color: '#545454' }}>
                            Enter your email, and we'll send a reset password link to your account.
                        </Typography>
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                            sx={{ marginBottom: '20px' }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleForgotPassword}
                            fullWidth
                            disabled={loading} // Disable button when loading
                        >
                            Send Reset Link
                        </Button>
                        <Snackbar
                            open={snackbarOpen}
                            autoHideDuration={6000}
                            onClose={handleSnackbarClose}
                        >
                            <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                                {snackbarMessage}
                            </Alert>
                        </Snackbar>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={loading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default ForgotPassword;
