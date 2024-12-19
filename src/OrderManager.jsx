import { Box, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
    Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from './services/api';


const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get(`/fetchOrders`);
                console.log("API Response:", response.data); // Log the response data
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    const handleClickOpen = (order) => {
        setSelectedOrder(order);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedOrder(null);
    };

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

    return(
        <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%', 
                height: '100vh',
            }}>
                <Paper sx={{width: '1300px', height: '500px', overflow: 'auto', marginBottom: '-100px'}} elevation={7}>
                    <Table>
                        <TableHead sx={{
                                        position: 'sticky', 
                                        top: '0px', 
                                        zIndex: '5', 
                                        textAlign: 'center', 
                                        backgroundColor: '#2e1f2a',
                                    }}>
                            <TableRow sx={{ textAlign: 'center' }}>
                                <TableCell sx={{ color: '#ffffff', textAlign: 'center'}}>Order Id</TableCell>
                                <TableCell sx={{ color: '#ffffff', textAlign: 'center'}}>Customer Id</TableCell>
                                <TableCell sx={{ color: '#ffffff', textAlign: 'center'}}>Service</TableCell>
                                <TableCell sx={{ color: '#ffffff', textAlign: 'center'}}>Baskets</TableCell>
                                <TableCell sx={{ color: '#ffffff', textAlign: 'center'}}>Total Payment</TableCell>
                                <TableCell sx={{ color: '#ffffff', textAlign: 'center'}}>Status</TableCell>
                                <TableCell sx={{ color: '#ffffff', textAlign: 'center'}}>Order Date</TableCell>
                                <TableCell sx={{ color: '#ffffff', textAlign: 'center'}}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} sx={{textAlign: 'center'}}>
                                    <TableCell sx={{textAlign: 'center'}}>{order.id}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>{order.user_id}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>{order.service.name}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>{order.baskets}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>P{order.total_price}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>{statusMapping[order.status]}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>{new Date(order.created_at).toLocaleString()}</TableCell>
                                    <TableCell sx={{textAlign: 'center'}}>
                                        <Button 
                                            variant='contained' 
                                            size='small'
                                            sx={{zIndex: '1'}}
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
                                <Typography variant="body1">Customer: {selectedOrder.user.name}</Typography>
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
                        </Box>
                        <Button onClick={handleClose} color="primary" variant='contained' fullWidth
                            sx={{ marginBottom: '5px', marginTop: '20px' }}
                            >
                                Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
}

export default OrderManager;
