import { Box, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';


const AdminHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const disableOrderListButton = ['/order-manager'];
    const disableUserListButton = ['/admin'];
    const disableServicesButton = ['/services-manager'];

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
                    disabled={disableServicesButton.includes(location.pathname)}
                >
                    Services
                </Button>
                <Button
                    variant='contained' 
                    onClick={() => {navigate('/admin')}}
                    sx={{marginLeft: '50px', backgroundColor: '#ff7b00',}}
                    disabled={disableUserListButton.includes(location.pathname)}
                >
                    User list
                </Button>
                <Button
                    variant='contained' 
                    onClick={() => {navigate('/order-manager')}}
                    sx={{marginLeft: '50px', backgroundColor: '#ff7b00',}}
                    disabled={disableOrderListButton.includes(location.pathname)}
                >
                    Order list
                </Button>
        </Box>
    );
}

export default AdminHeader;
