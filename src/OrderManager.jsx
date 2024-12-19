import { Box, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText,
    Typography, IconButton, Alert, AlertTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from './services/api';
import UpdateOrder from './UpdateOrder';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AdminHeader  from './AdminHeader';
import NavBar from './NavBar';


const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderIdToDelete, setOrderIdToDelete] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

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

    const handleUpdate = (updatedOrder, setSuccessMessage) => {
        console.log(`Updating order with ID: ${updatedOrder.id}, New Status: ${updatedOrder.status}`);
        api.put(`/updateOrders/${updatedOrder.id}/status`, { status: updatedOrder.status })
            .then(response => {
                console.log(response.data.message);
                setOrders(orders.map(order => order.id === updatedOrder.id ? updatedOrder : order));
                setSuccessMessage('Order status updated successfully!');
            })
            .catch(error => {
                console.error('There was an error updating the order status!', error);
                setSuccessMessage('Failed to update order status. Please try again.');
            });
    };

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

    const handleDeleteDialogOpen = (orderId) => { 
        setOrderIdToDelete(orderId); 
        setDeleteDialogOpen(true); 
    };

    const handleDeleteDialogClose = () => { 
        setOrderIdToDelete(null); 
        setDeleteDialogOpen(false); 
    };

    const handleDelete = () => { 
        api.delete(`/orders/${orderIdToDelete}`) 
            .then(response => { 
                console.log(response.data.message); 
                setOrders(orders.filter(order => order.id !== orderIdToDelete)); 
                setSuccessMessage('Order deleted successfully!');
                handleDeleteDialogClose();
            }) 
            .catch(error => { 
                console.error('There was an error deleting the order!', error); 
                setSuccessMessage('Failed to delete order. Please try again.');
                handleDeleteDialogClose();
            }); 
    };

    const handleCloseAlert = () => { 
        setSuccessMessage(''); 
    };

    return(
        <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%', 
                height: '100vh',
            }}>
                <AdminHeader/>
                <NavBar/>
                <Paper sx={{width: '1300px', height: '500px', overflow: 'auto', marginBottom: '-100px'}} elevation={7}>
                    {successMessage && ( 
                        <Alert severity="success" sx={{ marginBottom: 2 }} 
                            action={ 
                                <IconButton 
                                    aria-label="close" 
                                    color="inherit" 
                                    size="small" 
                                    onClick={handleCloseAlert} 
                                > 
                                    <CloseIcon fontSize="inherit" /> 
                                </IconButton> 
                            } 
                        > 
                                <AlertTitle>Success</AlertTitle> 
                                {successMessage} 
                        </Alert>
                    )}
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
                                        <Box fullWidth sx={{display: 'flex', justifyContent: 'space-around'}}>
                                            <Button 
                                                variant='contained' 
                                                size='small'
                                                sx={{zIndex: '1', backgroundColor: '#4d2836'}}
                                                onClick={() => handleClickOpen(order)}
                                            >
                                                Open
                                            </Button>
                                            <IconButton 
                                                onClick={() => handleDeleteDialogOpen(order.id)} 
                                                color="error"
                                                disabled={order.status !== 'cancelled'}
                                            > 
                                                <DeleteIcon /> 
                                            </IconButton>
                                        </Box>
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
                            <Box sx={{display: 'flex', gap: '10px', overflow: 'auto'}}>
                                <Box sx={{display: 'flex', flexDirection: 'column', gap: '5px', minWidth: '230px', maxWidth: '50%'}}>
                                    <Typography variant="body1" sx={{ backgroundColor: '#e8d3e3', padding: '10px', paddingLeft: '10px', borderRadius: '10px' }}>Customer: <br/><strong>{selectedOrder.user.name}</strong></Typography>
                                    <Typography variant="body1" sx={{ backgroundColor: '#e8d3e3', padding: '10px', paddingLeft: '10px', borderRadius: '10px' }}>Address: <br/><strong>{selectedOrder.address}</strong></Typography>
                                    <Typography variant="body1" sx={{ backgroundColor: '#e8d3e3', padding: '10px', paddingLeft: '10px', borderRadius: '10px', marginBottom: '10px' }}>Postal Code: <br/><strong>{selectedOrder.postal_code}</strong></Typography>
                                    <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', height: 'auto',}}>
                                        <Typography variant="body1" sx={{ backgroundColor: '#e8d3e3', padding: '10px', paddingLeft: '10px', borderRadius: '10px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>Notes: <br/><strong>{selectedOrder.notes}</strong></Typography>
                                    </Box>
                                </Box>
                                <Box sx={{display: 'flex', flexDirection: 'column', gap: '5px', width: '100%'}}>
                                <Typography variant="body1" sx={{ backgroundColor: '#e8d3e3', padding: '10px', paddingLeft: '10px', borderRadius: '10px' }}>Service: <br/><strong>{selectedOrder.service.name}</strong></Typography>
                                    <Typography variant="body1" sx={{ backgroundColor: '#fcba03', padding: '10px', paddingLeft: '10px', borderRadius: '10px' }}>Order Status: <br/><strong>{statusMapping[selectedOrder.status]}</strong></Typography>
                                    <Typography variant="body1" sx={{ backgroundColor: '#e8d3e3', padding: '10px', paddingLeft: '10px', borderRadius: '10px' }}>Total Price: <br/><strong>P{selectedOrder.total_price}</strong></Typography>
                                    <Typography variant="body1" sx={{ backgroundColor: '#e8d3e3', padding: '10px', paddingLeft: '10px', borderRadius: '10px' }}>Baskets: <br/><strong>{selectedOrder.baskets}</strong></Typography>
                                    <Typography variant="body1" sx={{ backgroundColor: '#e8d3e3', padding: '10px', paddingLeft: '10px', borderRadius: '10px' }}>Payment Mode: <br/><strong>{paymentModeMapping[selectedOrder.payment_mode]}</strong></Typography>
                                    <Typography variant="body1" sx={{ backgroundColor: '#e8d3e3', padding: '10px', paddingLeft: '10px', borderRadius: '10px' }}>Order Date: <br/><strong>{new Date(selectedOrder.created_at).toLocaleString()}</strong></Typography>
                                </Box>
                            </Box>
                        ) : (
                            <Typography variant="body1">Loading order details...</Typography>
                        )}
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        </Box>
                        <UpdateOrder order={selectedOrder} onUpdate={handleUpdate} />
                        <Button onClick={handleClose} color="primary" variant='contained' fullWidth
                            sx={{ marginBottom: '5px', marginTop: '20px' }}
                            >
                                Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            <Dialog 
                    open={deleteDialogOpen} 
                    onClose={handleDeleteDialogClose} 
                    aria-labelledby="alert-dialog-title" 
                    aria-describedby="alert-dialog-description" 
                > 
                    <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle> 
                    <DialogContent> 
                        <DialogContentText id="alert-dialog-description"> 
                            Are you sure you want to delete this user? This action cannot be undone. 
                        </DialogContentText> 
                    </DialogContent> 
                    <DialogActions> 
                        <Button onClick={handleDeleteDialogClose} color="primary"> Cancel </Button> 
                        <Button onClick={handleDelete} color="error" autoFocus> Delete </Button> 
                    </DialogActions> 
            </Dialog>
        </Box>
    );
}

export default OrderManager;
