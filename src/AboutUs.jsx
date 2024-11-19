import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './Theme';
import HomeIcon from '@mui/icons-material/Home';
import './fonts/fonts.css';

const AboutUs = () => {
    return (
        <ThemeProvider theme={theme}> 
            <CssBaseline />
            <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    width: '100%',
                    height: '30em',
                    backgroundImage: 'url(images/store.jpeg)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }} component="header">

                    <Box sx={{
                            width: '100%',
                            height: '30em',
                            backgroundColor: 'rgba(217, 22, 86, 0.6)',
                            padding: '2em',
                        }}>

                            <HomeIcon 
                                color="success" 
                                sx={{
                                    height: '2em',
                                    width: '2em',
                                    '&:hover': {
                                    color: 'rgba(255, 235, 85, 0.7)',
                                        },
                                    cursor: 'pointer'
                                }}/>

                                    <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            height: '80%', 
                                            width: '100%',
                                        }}>

                                            <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    height: '8em',
                                                    width: '30em',
                                                    border: '5px solid #FFEB55'
                                                }}>

                                                    <Typography 
                                                        color="success" 
                                                        sx={{
                                                            fontFamily: 'Poppins-ExtraBold',
                                                            fontSize: '6em',
                                                            marginLeft: '10px',
                                                        }}>
                                                    About</Typography>

                                                    <Typography 
                                                        color="primary" 
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontFamily: 'Poppins-ExtraBold',
                                                            fontSize: '6em',
                                                            backgroundColor: '#FFEB55',
                                                            height: '100%',
                                                            width: '100%',
                                                            marginLeft: '10px',
                                                        }}>
                                                    Us</Typography>

                                            </Box>
                                    </Box>
                    </Box>

                    {/* Main Content*/}
                    <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            width: '100%',
                            '@media (max-width: 700px)': 
                                { flexDirection: 'column',},
                        }}>

                        {/* Location Section*/}
                        <Box sx={{
                                width: '50%',
                                height: '350px',
                                backgroundColor: '#45283C',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                            }}>

                        </Box>

                        <Box sx={{
                                width: '50%',
                                height: '350px',
                                backgroundColor: '#45283C',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                            }}>
                                
                        </Box>

                        {/* Operation Hours Section*/}
                        <Box sx={{
                                width: '50%',
                                height: '400px',
                                backgroundColor: '#D91656',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                            }}>

                        </Box>

                        <Box sx={{
                                width: '50%',
                                height: '400px',
                                backgroundColor: '#ffffff',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                            }}>
                                
                        </Box>

                    </Box>

                    {/* Selling Points Section*/}
                    <Box sx={{
                                width: '50%',
                                height: '400px',
                                backgroundColor: '#45283C',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                            }}>

                        </Box>

                        <Box sx={{
                                width: '50%',
                                height: '400px',
                                backgroundColor: '#45283C',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                            }}>
                                
                        </Box>

                        {/* Staff Section*/}
                    <Box sx={{
                                width: '50%',
                                height: '400px',
                                backgroundColor: '#D91656',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                            }}>

                        </Box>

                        <Box sx={{
                                width: '50%',
                                height: '400px',
                                backgroundColor: '#ffffff',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                            }}>
                                
                        </Box>

                        {/* Terms and Conditions Section*/}
                    <Box sx={{
                                width: '50%',
                                height: '400px',
                                backgroundColor: '#45283C',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                            }}>

                        </Box>

                        <Box sx={{
                                width: '50%',
                                height: '400px',
                                backgroundColor: '#45283C',
                                '@media (max-width: 700px)': 
                                { width: '100%',},
                            }}>
                                
                        </Box>

                        <Box sx={{width: '100%', height: '90px', backgroundColor: '#D91656',}}></Box>

            </Box>
        </ThemeProvider>
    );
}

export default AboutUs;
