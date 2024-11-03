import { Container, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
    return (
            <Box component="header"
                style={{
                        position: 'sticky',
                        top: '0',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                        backgroundColor: 'white',
                        width: '100%',
                        height: '10vh',
                        }}
            >
                <Container maxWidth="lg" sx={{display: 'flex', height: '100%', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Link to="/">
                        <img alt="Shop logo" src="images/shopLogo.png"
                         style={{height: '50px',}}
                        >
                        </img>
                    </Link>
                    <Box component="nav" style={{display: 'flex', gap: '80px'}}>
                        <Button sx={{'&:hover': {boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.3)', backgroundColor: '#f5e4ec'}}}>
                            <Link to="*" style={{textDecoration: 'none', color: '#C43383'}}>About Us</Link>
                        </Button>

                        <Button sx={{'&:hover': {boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.3)', backgroundColor: '#f5e4ec'}}}>
                            <Link to="*" style={{textDecoration: 'none', color: '#C43383'}}>Contact</Link>
                        </Button>
                    </Box>
                </Container>
            </Box>
    );
}

function Body() {
    return(
        <Box component="bgimage"
            style={{backgroundImage: 'url(images/bg-image-lowbrightness.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
            }}
        >   
            <Box style={{display: 'flex', width: '100%'}}>
                <Container style={{height: '100vh', width: '50vw'}}></Container>
                <Container style={{height: '100vh', width: '50vw'}}></Container>
            </Box>
        </Box>
    );
}

function Home() {
    return(
        <Box component="homepage" sx={{display: 'flex', flexDirection: 'column'}}>
            <Header />
            <Body/>
        </Box>
    ); 
}

export default Home;
