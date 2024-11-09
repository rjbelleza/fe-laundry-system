import { Container, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
            <Box component="header"
                style={{
                        display: 'flex',
                        alignItems: 'center',
                        position: 'sticky',
                        top: '0',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
                        backgroundColor: 'white',
                        minWidth: '100%',
                        minHeight: '70px',
                        maxHeight: '70px',
                        }}>
                <Container maxWidth="xl" 
                        sx={{
                            display: 'flex', 
                            height: '100%', 
                            justifyContent: 'space-between', 
                            alignItems: 'center'}}>

                    <Link to="/">
                        <img alt="Shop logo" src="images/shopLogo.png"
                            style={{height: '50px',}}>
                        </img>
                    </Link>

                    <Box component="nav" style={{display: 'flex', 
                                            justifyContent: 'space-around', 
                                            height: '100%', 
                                            minWidth: '40%',
                                            gap: '20px'}}>
                        <Button sx={{
                                    '&:hover': {boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.3)', 
                                    backgroundColor: '#f5e4ec'}}}>
                            <Link to="*" style={{textDecoration: 'none', color: '#C43383'}}>Services</Link>
                        </Button>
                        <Button sx={{
                                    '&:hover': {boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.3)',
                                    backgroundColor: '#f5e4ec'}}}>
                            <Link to="*" style={{textDecoration: 'none', color: '#C43383'}}>About Us</Link>
                        </Button>

                        <Button sx={{
                                    '&:hover': {boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.3)', 
                                    backgroundColor: '#f5e4ec'}}}>
                            <Link to="*" style={{textDecoration: 'none', color: '#C43383'}}>Contact</Link>
                        </Button>
                    </Box>
                </Container>
            </Box>
    );
}

const Body = () => {
    return(
        <Box style={{backgroundImage: 'url(images/laundry-bg.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    width: '100%', }}>  
            <Box style={{display: 'flex', width: '100%', flexWrap: 'wrap'}}>
                <Container style={{height: '100vh', minWidth: '450px', flex: '1' }}></Container>

                <Container style={{height: '100vh', minWidth: '50%', backgroundColor: 'rgba(0, 0, 0, 0.5)', flex: '1'}}></Container>
            </Box>
        </Box>
    );
}

const Home = () => {
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', minWidth: '100%'}}>
            <Header />
            <Body/>
        </Box>
    ); 
}

export default Home;
