import { Container, Typography, } from '@mui/material';

const ForgotPassword = () => {
    return (
        <>
            <Container 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100wv',
                    height: '100vh',
                }}
                >
                <Typography align='center'>
                    Forgot Password Page
                </Typography>
            </Container>
        </>
    );
}

export default ForgotPassword;
