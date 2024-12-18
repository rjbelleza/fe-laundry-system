import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Snackbar, Alert, Paper, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Theme';
import api from './services/api';
import { useParams, useNavigate } from 'react-router-dom';
import './fonts/fonts.css';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleResetPassword = async () => {
        try {
            await api.post('/password/reset', {
                token,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });
            setSnackbarMessage('Password reset successfully');
            setSnackbarSeverity('success');
            setTimeout(() => {
                navigate('/login'); // Redirect to login page after successful reset
            }, 2000); // 2-second delay before redirect
        } catch (error) {
            setSnackbarMessage('Failed to reset password');
            setSnackbarSeverity('error');
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{backgroundColor: '#4f4f4f'}}>
                <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Paper elevation={5} sx={{ height: '400px', padding: '30px' }}>
                        <Typography variant="h5" component="h1" gutterBottom sx={{fontFamily: 'Poppins-Bold'}}>
                            Reset Password
                        </Typography>
                        <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="New Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Confirm New Password"
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleResetPassword}
                            fullWidth
                            sx={{marginTop: '15px'}}
                        >
                            Reset Password
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
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default ResetPassword;
