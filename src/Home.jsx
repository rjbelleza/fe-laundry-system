import React from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Box
            component="header"
            sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                backgroundColor: 'white',
                minWidth: '100%',
                height: '70px',
            }}
        >
            <Container
                maxWidth="xl"
                sx={{
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Link to="/">
                    <img
                        alt="Shop logo"
                        src="images/shopLogo.png"
                        style={{ height: '50px' }}
                    />
                </Link>
                <Box
                    component="nav"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        height: '100%',
                        minWidth: '40%',
                        gap: '20px',
                    }}
                >
                    {['Services', 'About Us', 'Contact'].map((text) => (
                        <Button
                            key={text}
                            sx={{
                                '&:hover': {
                                    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.3)',
                                    backgroundColor: '#f5e4ec',
                                },
                            }}
                        >
                            <Link to="*" style={{ textDecoration: 'none', color: '#C43383' }}>
                                {text}
                            </Link>
                        </Button>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

const Body = () => {
    return (
        <Box
            sx={{
                backgroundImage: 'url(images/laundry-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                width: '100%',
            }}
        >
            <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
                <Container sx={{
                                display: 'flex', 
                                justifyContent: 'center',
                                alignItems: 'center', 
                                height: '100vh', 
                                minWidth: '450px', 
                                flex: 1,
                            }}
                >
                    <Box sx={{
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'flex-end',
                             width: '70%', 
                             height: '70%',
                             backgroundImage: 'url(images/poster.jpg)',
                             backgroundSize: 'cover',
                             backgroundPosition: 'center',
                             borderRadius: '10px',
                             boxShadow: '10px 10px 15px rgba(0, 0, 0, 0.7)',
                        }}
                    >
                        <Box sx={{
                            boxSizing: 'border-box',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'rgba(237, 121, 43)',
                            height: '40px',
                            minWidth: '250px',
                            borderRadius: '20px',
                            marginBottom: '10px',
                            padding: '15px',
                        }}>
                            <Typography sx={{color: 'rgba(250, 250, 250)'}}>Rating</Typography>
                        </Box>
                    </Box>
                </Container>
                <Container
                    sx={{
                        height: '100vh',
                        minWidth: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        flex: 1,
                    }}
                />
            </Box>
        </Box>
    );
};

const Home = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '100%' }}>
            <Header />
            <Body />
        </Box>
    );
};

export default Home;
