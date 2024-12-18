import React, { useEffect, useState } from 'react';
import api from './services/api';
import { 
    Typography, TableRow, TableCell, TableBody, TableHead, Table, Paper,  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
    Snackbar, Alert 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const OrderHistory = () => {
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

    const paymentModeMapping ={
        cash: 'Cash On Delivery',
        credit_card: 'Credit Card',
        paypal: 'Paypal',
    };

    useEffect(() => {
        api.get('/orders')
            .then(response => {
                // Sort the orders by created_at in descending order
                const sortedOrders = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setOrders(sortedOrders);
            })
            .catch(error => {
                console.error("There was an error fetching the orders!", error);
            });
    }, []);

    const handleClickOpen = (order) => {
        setSelectedOrder(order);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedOrder(null);
    };

    const handleCancelOrder = (orderId) => {
        api.patch(`/orders/${orderId}/cancel`)
            .then(response => {
                setSnackbarMessage('Order cancelled successfully');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);

                // Update the order status in state
                setOrders(orders.map(order => 
                    order.id === orderId ? { ...order, status: 'cancelled' } : order
                ));

                handleClose();
            })
            .catch(error => {
                setSnackbarMessage('Failed to cancel the order');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                console.error("There was an error cancelling the order!", error);
            });
    };

    const handleDeleteOrder = (orderId) => {
        api.delete(`/orders/${orderId}`)
            .then(response => {
                setSnackbarMessage('Order deleted successfully');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);

                // Remove the order from state
                setOrders(orders.filter(order => order.id !== orderId));
                handleClose();
            })
            .catch(error => {
                setSnackbarMessage('Failed to delete the order');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
                console.error("There was an error deleting the order!", error);
            });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', marginRight: '50px', width: '600px', height: '100%' }}>
            <Typography variant="h6" component="h2" gutterBottom
                sx={{ marginLeft: '10px', color: '#424142' }}>
                Order History
            </Typography>
            <Paper 
                sx={{ 
                    width: '100%', 
                    maxWidth: '600px', 
                    height: '380px',
                    borderRadius: '5px',
                    overflow: 'auto',
                    marginBottom: '50px',
                }}
                elevation={10}
            >
                <Table>
                    <TableHead 
                        sx={{ backgroundColor: '#b50048', 
                              width: '100%',
                              position: 'sticky',
                              top: '0px',
                              zIndex: '10',
                            }}>
                        <TableRow sx={{ textAlign: 'center' }}>
                            <TableCell sx={{color: '#fff'}}>Service</TableCell>
                            <TableCell sx={{color: '#fff'}}>Status</TableCell>
                            <TableCell sx={{color: '#fff'}}>Price</TableCell>
                            <TableCell sx={{color: '#fff'}}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.service.name}</TableCell>
                                <TableCell>{statusMapping[order.status]}</TableCell>
                                <TableCell>P{order.total_price}</TableCell>
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
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            {selectedOrder && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Order Details
                    </DialogTitle>
                    <DialogContent>
                        {selectedOrder ? (
                            <>
                                <Typography variant="body1">Service: {selectedOrder.service.name}</Typography>
                                <Typography variant="body1">Status: {statusMapping[selectedOrder.status]}</Typography>
                                <Typography variant="body1">Total Price: P{selectedOrder.total_price}</Typography>
                                <Typography variant="body1">Baskets: {selectedOrder.baskets}</Typography>
                                <Typography variant="body1">Address: {selectedOrder.address}</Typography>
                                <Typography variant="body1">Postal Code: {selectedOrder.postal_code}</Typography>
                                <Typography variant="body1">Notes: {selectedOrder.notes}</Typography>
                                <Typography variant="body1">Payment Mode: {paymentModeMapping[selectedOrder.payment_mode]}</Typography>
                                <Typography variant="body1">Order Date: {new Date(selectedOrder.created_at).toLocaleString()}</Typography>
                            </>
                        ) : (
                            <Typography variant="body1">Loading order details...</Typography>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button 
                                onClick={() => handleCancelOrder(selectedOrder.id)} 
                                color="secondary"
                                disabled={selectedOrder.status !== 'pending'}
                                variant='contained'
                                size='small'
                            >
                                Cancel Order
                            </Button>
                            <Button 
                                aria-label="delete" 
                                color="error"
                                variant='contained'
                                size='small'
                                onClick={() => handleDeleteOrder(selectedOrder.id)} 
                                disabled={selectedOrder.status !== 'cancelled'} 
                                sx={{ ml: 2 }} > 
                                <DeleteIcon /> 
                                Delete History
                            </Button>
                        </Box>
                        <Button onClick={handleClose} color="primary" variant='contained' fullWidth
                            sx={{ marginBottom: '5px', marginTop: '20px' }}
                            >
                                Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

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
};

export default OrderHistory;
