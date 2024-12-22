import { FormControl, Select, MenuItem, Box, Typography, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import api from './services/api';

const UpdateOrder = ({ order, onUpdate, }) => {
    const [orderStatus, setOrderStatus] = useState(order.status);
    const [courierId, setCourierId] = useState(order.courier_id || '');
    const [successMessage, setSuccessMessage] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await api.put(`/orders/${order.id}/assign-courier`, {
                courier_id: courierId,
            });
            setSuccessMessage('Order updated successfully');
            onUpdate({ ...order, status: orderStatus, courier_id: courierId }, setSuccessMessage);
        } catch (error) {
            console.error(error);
            setSuccessMessage('Failed to update order');
        }
        
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Typography sx={{ fontSize: '12px', marginLeft: '10px' }}>Status</Typography>
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
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', marginTop: 2 }}>
                <TextField
                    label="Assign Courier by ID"
                    value={courierId}
                    onChange={(e) => setCourierId(e.target.value)}
                    variant="outlined"
                    fullWidth
                    sx={{ marginRight: 2 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: '#4d1c2f' }}
                    disabled={orderStatus === order.status && courierId === order.courier_id}
                >
                    Update Status
                </Button>
            </Box>
            {successMessage && (
                <Typography variant="body2" color="success.main" sx={{ mt: 2, marginLeft: '10px' }}>
                    {successMessage}
                </Typography>
            )}
        </form>
    );
};

export default UpdateOrder;
