import { FormControl, Select, MenuItem, Box, Typography, Button, } from '@mui/material';
import React, { useState } from 'react';


const UpdateOrder = ({ order, onUpdate }) => {
    const [orderStatus, setOrderStatus] = useState(order.status);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...order, status: orderStatus }, setSuccessMessage);
    };

    return(
        <form onSubmit={handleSubmit} style={{width: '100%'}}>
            <Typography sx={{fontSize: '12px', marginLeft: '10px'}}>Status</Typography>
            <FormControl fullWidth>
                <Select
                    labelId="status-label"
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                >
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="confirmed">Confirmed</MenuItem>
                    <MenuItem value="on_hold">On Hold</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="failed">Failed</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{width: '100%', display: 'flex', alignItems: 'center'}}>
            <Button type="submit" variant="contained" sx={{ marginTop: 2, backgroundColor: '#4d1c2f' }}
                    disabled={orderStatus === order.status}
                >Update Status</Button>
                {successMessage && (
                    <Typography variant="body2" color="success.main" sx={{ mt: 2, marginLeft: '50px',}}>
                        {successMessage}
                    </Typography>
                )}
            </Box>
        </form>
    );
}

export default UpdateOrder;
