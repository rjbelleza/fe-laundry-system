import React from 'react';
import { Container, Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import './fonts/fonts.css';

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
                zIndex: '2'
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
                        title="Business logo"
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
                overflow: 'hidden',
                minHeight: '100vh',
            }}
        >
            <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap'}}>
                <Container sx={{
                                display: 'flex', 
                                justifyContent: 'center',
                                alignItems: 'center', 
                                minHeight: '570px', 
                                minWidth: '550px', 
                                flex: 1,
                            }}
                >
                    <img src="images/bookNow.png" 
                            height="150px" 
                            width="150px"
                            alt=""
                            style={{marginRight: '-120px', marginTop: '-400px', zIndex: '1'}}
                        >
                    </img>
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
                    </Box>
                </Container>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        maxHeight: '100%',
                        minWidth: '50%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        flex: 1,
                    }}
                >
                    <Typography sx={{fontFamily: 'AbrilFatface', fontSize: '60px', marginTop: '40px', color: 'rgba(240, 213, 151)'}}>
                        "Laundry Made
                    </Typography>
                    <Typography sx={{fontFamily: 'Caveat', fontSize: '50px', color: 'rgba(247, 236, 79)'}}>
                        Effortless."
                    </Typography>
                    <Typography sx={{marginRight: '40px', marginLeft: '40px', marginBottom: '70px', color: 'rgba(204, 199, 190)'}}><br/>
                        "Meet Convenient Laundry: the ultimate solution for hassle-free laundry management. 
                        From scheduling pickups to tracking deliveries, Convenient Laundry makes managing your 
                        laundry effortless and efficient. <br/><br/> Enjoy a seamless experience with real-time 
                        updates and personalized service, so you can focus on what really matters while 
                        we take care of your laundry needs."
                    </Typography>
                    <Box sx={{
                            display: 'flex', 
                            justifyContent: 'center', 
                            width: '100%', 
                            height: '50px',
                            gap: '30px',
                        }}
                    >
                        <Button component={Link} to="/login" variant="contained" color="secondary">
                            Book Now
                        </Button>
                        <Button variant="contained" color="success"> 
                            Create Account
                        </Button>
                    </Box>
                    <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%', 
                            height: '80px', 
                            backgroundColor: 'rgba(0, 0, 0, 0.3)',
                            marginTop: '30px',
                        }}
                    >
                        <Typography sx={{color: 'rgba(250, 250, 250)'}}>
                            We are open
                        </Typography>
                    </Box>
                </Container>

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
