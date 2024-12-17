import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, MenuItem, Button, Typography, Box, Snackbar, Alert } from '@mui/material';
import OrderHistory from './OrderHistory';
import Navbar from './NavBar';

const OrderForm = () => {
    const [services, setServices] = useState([]);
    const [serviceId, setServiceId] = useState('');
    const [servicePrice, setServicePrice] = useState(0); // State for service price
    const [baskets, setBaskets] = useState(0); // Initialize baskets with 0
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState(''); // State for postal code
    const [notes, setNotes] = useState(''); // State for notes
    const [paymentMode, setPaymentMode] = useState('');
    const [totalPrice, setTotalPrice] = useState(0); // State for total price
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    useEffect(() => {
        axios.get('http://localhost:8000/api/services')
            .then(response => {
                // Ensure price is parsed as a number
                const servicesData = response.data.map(service => ({
                    ...service,
                    price: parseFloat(service.price)
                }));
                setServices(servicesData);
            })
            .catch(error => {
                console.error('Error fetching services:', error);
                setSnackbarMessage('Error fetching services. Please try again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });
    }, []);

    useEffect(() => {
        // Calculate total price whenever serviceId or baskets change
        const price = servicePrice * (baskets ? parseInt(baskets, 10) : 0);
        setTotalPrice(price.toFixed(2));
    }, [servicePrice, baskets]);

    const handleServiceChange = (e) => {
        const selectedServiceId = e.target.value;
        setServiceId(selectedServiceId);
        const selectedService = services.find(service => service.id === selectedServiceId);
        setServicePrice(selectedService ? selectedService.price : 0);
    };

    const handleBasketChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 0) {
            setBaskets(value);
        }
    };

    const handlePostalCodeChange = (e) => {
        setPostalCode(e.target.value);
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!serviceId || baskets === 0 || !address || !postalCode || !paymentMode) {
            setSnackbarMessage('Please fill out all fields.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const token = localStorage.getItem('auth_token'); // Get the token from local storage
        console.log('Auth Token:', token); // Log token for debugging

        axios.post('http://localhost:8000/api/orders', {
            service_id: serviceId,
            baskets,
            address,
            postal_code: postalCode, // Include postal code
            notes, // Include notes
            payment_mode: paymentMode,
        }, { 
            headers: { 
                'Authorization': `Bearer ${token}` // Include the token in the headers 
            }
        })
        .then(response => {
            console.log('Order created successfully', response.data);
            setServiceId('');
            setBaskets(0);
            setAddress('');
            setPostalCode('');
            setNotes('');
            setPaymentMode('');
            setServicePrice(0);
            setTotalPrice(0);
            setSnackbarMessage('Order created successfully.');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);

            setTimeout(() => { 
                window.location.reload(); 
            }, 1000);
        })
        .catch(error => {
            console.error('Error creating order:', error);
            setSnackbarMessage('Error creating order. Please try again.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        });
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth="sm"
            sx={{ border: 'solid 1px black', padding: '10px', borderRadius: '10px', backgroundColor: '#fff', }}>
            <Typography variant="h6" component="h1" gutterBottom>
                Place Your Order
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate 
                sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <TextField
                    select
                    id="service"
                    label="Select Service"
                    fullWidth
                    margin="normal"
                    value={serviceId}
                    onChange={handleServiceChange}
                    size="small"
                >
                    {services.map((service) => (
                        <MenuItem key={service.id} value={service.id}>
                            {service.name} - ₱{service.price.toFixed(2)}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="baskets"
                    label="Number of Baskets"
                    type="number"
                    fullWidth
                    value={baskets}
                    onChange={handleBasketChange}
                    slotProps={{ min: 0 }}
                    size="small"
                />
                <TextField
                    id="address"
                    label="Address"
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    size="small"
                />
                <TextField
                    id="postalCode"
                    label="Postal Code"
                    fullWidth
                    value={postalCode}
                    onChange={handlePostalCodeChange}
                    size="small"
                />
                <TextField
                    id="notes"
                    label="Notes"
                    fullWidth
                    multiline
                    rows={3} // Set the height for multiline input
                    value={notes}
                    onChange={handleNotesChange}
                    size="small"
                />
                <TextField
                    select
                    id="paymentMode"
                    label="Select Payment Mode"
                    fullWidth
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    size="small"
                >
                    <MenuItem value="cash">Cash on Delivery</MenuItem>
                    <MenuItem value="credit_card">Credit Card</MenuItem>
                    <MenuItem value="paypal">PayPal</MenuItem>
                </TextField>
                
                {/* Total Price Section */}
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Total Price: ₱{totalPrice}</Typography>
                </Box>
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2, backgroundColor: '#38223d' }}
                >
                    Place Order
                </Button>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

const CustomerDashboard = () => {
    return (
        <Box maxWidth
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#ffea9e',
            }}>
            <OrderForm />
            <OrderHistory/>
            <Navbar/>
        </Box>
    );
}

export default CustomerDashboard;
