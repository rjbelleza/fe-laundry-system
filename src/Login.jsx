import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from './services/api'; // Import the centralized Axios instance

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/login', { // Use the Axios instance
                email,
                password
            });

            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
                navigate('/users');  // Redirect after login
            }
        } catch (error) {
            setError('Invalid login credentials');
        }
    };

    return (
        <Container
            maxWidth
            disableGutters
            sx={{
                backgroundImage: 'url(images/laundry-bg-low.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100wh',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Container
                sx={{
                    boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.6)',
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
                <Typography variant="h4" component="h1" color='secondary' gutterBottom
                    sx={{
                        fontFamily: 'fantasy',
                        marginTop: '10px',
                    }}
                >
                    Login
                </Typography>
                <form onSubmit={handleSubmit} display="flex">
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
                            borderColor: 'purple',
                        },
                        '&:hover fieldset': {
                            borderColor: 'blue',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'blue',
                        },
                    }
                }}
                    />
                    <TextField
                        color="secondary"
                        label="Password"
                        fullWidth
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'purple',
                        },
                        '&:hover fieldset': {
                            borderColor: 'blue',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'blue',
                        },
                    },   
                        marginBottom: '20px',
                        }}
                    />
                    <Button variant="contained" color="secondary" type="submit" size='large' fullWidth>
                        Login
                    </Button>
                    <Container
                        maxWidth
                        disableGutters
                        sx={{height: '20px',}}
                    >
                        {error && <Typography color="error" sx={{fontSize: '13px'}}>{error}</Typography>}
                    </Container>
                    <Typography variant="body2" align="center" sx={{marginTop: '35px'}}>
                        <Link href="/forgot-password" color="primary">
                            Forgot your password?
                        </Link>
                    </Typography>
                </form>
            </Container>
        </Container>
    );
};

export default Login;
