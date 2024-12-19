import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const AdminHeader = () => {
    const navigate = useNavigate();

    return(
        <Box 
            sx={{
                display: 'flex',
                alignItems: 'center',
                position: 'fixed',
                top: '0px',
                width: '100%', 
                height: '65px', 
                backgroundColor: '#c20450',
                boxShadow: 'rgba(194, 4, 86, 0.24) 0px 3px 8px',
                zIndex: '30',
            }}>
                <Button 
                    variant='contained' 
                    onClick={() => {navigate('/services-manager')}}
                    sx={{marginLeft: '50px', backgroundColor: '#ff7b00',}}
                >
                    Services
                </Button>
                <Button
                    variant='contained' 
                    onClick={() => {navigate('/admin')}}
                    sx={{marginLeft: '50px', backgroundColor: '#ff7b00',}}
                >
                    User list
                </Button>
                <Button
                    variant='contained' 
                    onClick={() => {navigate('/order-list')}}
                    sx={{marginLeft: '50px', backgroundColor: '#ff7b00',}}
                >
                    Order list
                </Button>
        </Box>
    );
}

export default AdminHeader;
