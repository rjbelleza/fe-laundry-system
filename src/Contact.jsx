import React from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import './fonts/fonts.css';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Theme';


const Contact = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box maxWidth 
                sx={{
                    height: '100vh',
                    backgroundColor: '#F9437F',
            }}>
                <Container
                    maxWidth="md"
                    sx={{
                        height: '100%',
                        backgroundColor: '#D91656',
                    }}>
                        
                        <Typography 
                            variant="h2"
                            color="success"
                            sx={{
                                textAlign: 'center',
                                fontFamily: 'Poppins-SemiBold',
                                padding: '20px',
                                border: '5px solid ',
                                width: '420px',
                            }}>
                            Contact Us
                        </Typography>

                        <Box 
                            maxWidth 
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                height: '200px', 
                                backgroundColor: '#45283C',
                                marginTop: '50px',
                                borderRadius: '5px',
                                padding: '20px',
                                gap: '10px',
                            }}>
                                <Box maxWidth sx={{display: 'flex',}}>
                                    <Typography variant="h4" color="info"
                                        sx={{
                                            fontFamily: 'Poppins-SemiBold',
                                            marginRight: '20px',
                                        }}>
                                        Business Name:
                                    </Typography>

                                    <Typography variant="h4" color="success"
                                    sx={{
                                        fontFamily: 'Poppins-Regular',
                                    }}>
                                        Convenient Laundry
                                    </Typography>
                                </Box>
                                
                                <Box maxWidth sx={{display: 'flex',}}>
                                    <Typography variant="h4" color="info"
                                        sx={{
                                            fontFamily: 'Poppins-SemiBold',
                                            marginRight: '20px',
                                        }}>
                                        Mobile No.:
                                    </Typography>

                                    <Typography variant="h4" color="success"
                                    sx={{
                                        fontFamily: 'Poppins-Regular',
                                    }}>
                                        099178356288 
                                    </Typography>
                                </Box>

                                <Box maxWidth sx={{display: 'flex',}}>
                                    <Typography variant="h4" color="info"
                                        sx={{
                                            fontFamily: 'Poppins-SemiBold',
                                            marginRight: '20px',
                                        }}>
                                        Email: 
                                    </Typography>

                                    <Typography variant="h4" color="success"
                                    sx={{
                                        fontFamily: 'Poppins-Regular',
                                    }}>
                                        convenientlaundry@gmail.com
                                    </Typography>
                                </Box>

                        </Box>

                        <Box 
                            maxWidth 
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                height: '200px', 
                                backgroundColor: '#45283C',
                                marginTop: '50px',
                                borderRadius: '5px',
                                padding: '20px',
                                gap: '10px',
                            }}>

                        <Box maxWidth sx={{display: 'flex',}}>
                                    <Typography variant="h4" color="info"
                                        sx={{
                                            fontFamily: 'Poppins-SemiBold',
                                            marginRight: '20px',
                                        }}>
                                        Facebook:
                                    </Typography>

                                    <Typography variant="h4" color="success"
                                    sx={{
                                        fontFamily: 'Poppins-Regular',
                                    }}>
                                        facebook.com/convenientlaundry
                                    </Typography>
                                </Box>
                                
                                <Box maxWidth sx={{display: 'flex',}}>
                                    <Typography variant="h4" color="info"
                                        sx={{
                                            fontFamily: 'Poppins-SemiBold',
                                            marginRight: '20px',
                                        }}>
                                        Instagram:
                                    </Typography>

                                    <Typography variant="h4" color="success"
                                    sx={{
                                        fontFamily: 'Poppins-Regular',
                                    }}>
                                        instagram.com/convenientlaundry
                                    </Typography>
                                </Box>

                                <Box maxWidth sx={{display: 'flex',}}>
                                    <Typography variant="h4" color="info"
                                        sx={{
                                            fontFamily: 'Poppins-SemiBold',
                                            marginRight: '20px',
                                        }}>
                                        URL: 
                                    </Typography>

                                    <Typography variant="h4" color="success"
                                    sx={{
                                        fontFamily: 'Poppins-Regular',
                                    }}>
                                        convenientlaundry.com
                                    </Typography>
                                </Box>

                        </Box>

                </Container>

            </Box>
        </ThemeProvider>
    );
}

export default Contact;
