import React, { useState, useEffect } from 'react';
import { Box, Table, Alert, Snackbar, TableHead, Typography, TableRow, TableCell, TableBody, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, } from '@mui/material';
import api from './services/api';
import NavBar from './NavBar';

const CourierDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const statusMapping = {
        pending: 'Pending',
        confirmed: 'Confirmed',
        in_progress: 'In Progress',
        completed: 'Completed',
        cancelled: 'Cancelled',
        ready_for_pickup: 'Ready For Pickup',
        out_for_delivery: 'Out For Delivery',
        delivered: 'Delivered',
        on_hold: 'On Hold',
        failed: 'Failed',
    };

    const allowedStatuses = ['ready_for_pickup', 'in_progress', 'out_for_delivery', 'delivered']; // Only allow these statuses

    useEffect(() => { 
        const fetchOrders = async () => { 
            try { 
                const token = localStorage.getItem('auth_token'); 
                if (!token) { 
                    console.error("No auth token found"); 
                    return; 
                } 
                
                const response = await api.get('/orders/courier', { 
                    headers: { 
                        'Authorization': `Bearer ${token}` 
                    } 
                }); 
                
                if (Array.isArray(response.data)) { 
                    // Sort the orders by created_at in descending order 
                    const sortedOrders = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); 
                    setOrders(sortedOrders); 
                } else { 
                    console.error("The response data is not an array!"); 
                } 
            } catch (error) { 
                console.error("There was an error fetching the orders!", error); 
            } 
        }; fetchOrders(); 
    }, []);

    const paymentModeMapping = {
        cash: 'Cash On Delivery',
        credit_card: 'Credit Card',
        paypal: 'Paypal',
    };

    const handleClickOpen = (order) => {
        setSelectedOrder(order);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedOrder(null);
    };

    const handleUpdateOrder = async () => {
        try {
            const response = await api.put(`/orders/${selectedOrder.id}/courier`, {
                status: selectedOrder.status,
                out_date: selectedOrder.out_date,
                return_date: selectedOrder.return_date,
            });
            setOrders(orders.map(order => order.id === selectedOrder.id ? response.data.order : order));
            setSnackbarMessage('Order updated successfully');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            handleClose();
        } catch (error) {
            console.error('Error updating order:', error);
            setSnackbarMessage('Failed to update order');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedOrder({ ...selectedOrder, [name]: value });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh',
        }}>
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
                }} >
                    <Typography sx={{marginLeft: '50px', color: '#fff', fontSize: '30px'}}>Courier</Typography>
                </Box>
            <NavBar />
            <Paper sx={{ width: '1300px', height: '490px', overflow: 'auto', marginBottom: '-70px' }} elevation={7}>
                <Table>
                    <TableHead
                        sx={{
                            backgroundColor: '#b50048',
                            width: '100%',
                            position: 'sticky',
                            top: '0px',
                            zIndex: '10',
                        }}>
                        <TableRow sx={{ textAlign: 'center' }}>
                            <TableCell sx={{ color: '#fff', fontSize: '13px' }}>Customer</TableCell>
                            <TableCell sx={{ color: '#fff', fontSize: '13px' }}>Service</TableCell>
                            <TableCell sx={{ color: '#fff', fontSize: '13px' }}># of Baskets</TableCell>
                            <TableCell sx={{ color: '#fff', fontSize: '13px' }}>Address</TableCell>
                            <TableCell sx={{ color: '#fff', fontSize: '13px' }}>Postal Code</TableCell>
                            <TableCell sx={{ color: '#fff', fontSize: '13px' }}>Payment Mode</TableCell>
                            <TableCell sx={{ color: '#fff', fontSize: '13px' }}>Status</TableCell>
                            <TableCell sx={{ color: '#fff', fontSize: '13px' }}>Order Date</TableCell>
                            <TableCell sx={{ color: '#fff', fontSize: '13px' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9} sx={{ textAlign: 'center', color: '#999' }}>
                                    No orders assigned.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order.id} sx={{ textAlign: 'center' }}>
                                    <TableCell sx={{ fontSize: '13px' }}>{order.user.name}</TableCell>
                                    <TableCell sx={{ fontSize: '13px' }}>{order.service.name}</TableCell>
                                    <TableCell sx={{ fontSize: '13px' }}>{order.baskets}</TableCell>
                                    <TableCell sx={{ fontSize: '13px' }}>{order.address}</TableCell>
                                    <TableCell sx={{ fontSize: '13px' }}>{order.postal_code}</TableCell>
                                    <TableCell sx={{ fontSize: '13px' }}>{paymentModeMapping[order.payment_mode]}</TableCell>
                                    <TableCell sx={{ fontSize: '13px' }}>{statusMapping[order.status]}</TableCell>
                                    <TableCell sx={{ fontSize: '13px' }}>{new Date(order.created_at).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant='contained'
                                            size='small'
                                            sx={{ backgroundColor: '#38223d' }}
                                            onClick={() => handleClickOpen(order)}
                                        >
                                            Open
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Paper>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Order</DialogTitle>
                <DialogContent>
                <Typography sx={{ fontSize: '12px', marginLeft: '10px' }}>Status</Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Select
                            name="status"
                            value={selectedOrder?.status || ''}
                            onChange={handleChange}
                        >
                            {allowedStatuses.map((key) => (
                                <MenuItem key={key} value={key}>
                                    {statusMapping[key]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Out Date"
                        type="date"
                        name="out_date"
                        value={selectedOrder?.out_date || ''}
                        onChange={handleChange}
                        fullWidth
                        sx={{ mb: 2 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Return Date"
                        type="date"
                        name="return_date"
                        value={selectedOrder?.return_date || ''}
                        onChange={handleChange}
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleUpdateOrder} variant="contained" color="primary">Update</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                        {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default CourierDashboard;
