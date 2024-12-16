import React, { useEffect, useState } from 'react';
import api from './services/api';
import { 
    Typography, 
    TableRow, 
    TableCell, 
    TableBody, 
    TableHead, 
    Table, 
    Paper, 
    Box, 
    Button, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions,
    Snackbar,
    Alert
} from '@mui/material';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        api.get('/orders')
            .then(response => {
                setOrders(response.data);
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

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ marginRight: '70px', width: '500px' }}>
            <Typography variant="h4" component="h2" gutterBottom
                sx={{ marginLeft: '10px' }}>
                Manage Orders
            </Typography>
            <Paper 
                sx={{ 
                    width: '100%', 
                    maxWidth: '600px', 
                    margin: 'auto', 
                    border: '1px solid black', 
                    borderRadius: '10px',
                    overflow: 'auto',
                }}
            >
                <Table>
                    <TableHead sx={{ backgroundColor: '#643d6e', color: '#fff' }}>
                        <TableRow sx={{ textAlign: 'center' }}>
                            <TableCell>Service</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.service.name}</TableCell>
                                <TableCell>{order.status}</TableCell>
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
                    <DialogTitle>Order Details</DialogTitle>
                    <DialogContent>
                        {selectedOrder ? (
                            <>
                                <Typography variant="body1"><strong>Service:</strong> {selectedOrder.service.name}</Typography>
                                <Typography variant="body1"><strong>Status:</strong> {selectedOrder.status}</Typography>
                                <Typography variant="body1"><strong>Total Price:</strong> P{selectedOrder.total_price}</Typography>
                                <Typography variant="body1"><strong>Baskets:</strong> {selectedOrder.baskets}</Typography>
                                <Typography variant="body1"><strong>Address:</strong> {selectedOrder.address}</Typography>
                                <Typography variant="body1"><strong>Postal Code:</strong> {selectedOrder.postal_code}</Typography>
                                <Typography variant="body1"><strong>Notes:</strong> {selectedOrder.notes}</Typography>
                                <Typography variant="body1"><strong>Payment Mode:</strong> {selectedOrder.payment_mode}</Typography>
                                <Typography variant="body1"><strong>Order Date:</strong> {new Date(selectedOrder.created_at).toLocaleString()}</Typography>
                            </>
                        ) : (
                            <Typography variant="body1">Loading order details...</Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                        <Button 
                            onClick={() => handleCancelOrder(selectedOrder.id)} 
                            color="secondary"
                            disabled={selectedOrder.status !== 'pending'}
                            variant='contained'
                        >
                            Cancel Order
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
