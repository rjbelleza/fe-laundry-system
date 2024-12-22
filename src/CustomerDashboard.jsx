import React, { useState, useEffect } from 'react';
import api from './services/api';
import { Container, TextField, MenuItem, Button, Typography, Box, Snackbar, Alert, Paper } from '@mui/material';
import OrderHistory from './OrderHistory';
import Navbar from './NavBar';
import './fonts/fonts.css';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const OrderForm = () => {
    const [services, setServices] = useState([]);
    const [serviceId, setServiceId] = useState('');
    const [products, setProducts] = useState([]); 
    const [productId, setProductId] = useState(''); 
    const [servicePrice, setServicePrice] = useState(0);
    const [productPrice, setProductPrice] = useState(0);
    const [baskets, setBaskets] = useState(0);
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [notes, setNotes] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    useEffect(() => {
        // Fetch services
        api.get('/services')
            .then(response => {
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

    api.get('/products')
            .then(response => {
                const productsData = response.data.map(product => ({
                    ...product,
                    price: parseFloat(product.price)
                }));
                setProducts(productsData);
            })
            .catch(error => {
                console.error('Error fetching services:', error);
                setSnackbarMessage('Error fetching services. Please try again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            });

        // Fetch user address and postal code
        const token = localStorage.getItem('auth_token');
        api.get('/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const { address, postal_code } = response.data;
            setAddress(address);
            setPostalCode(postal_code);
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
            setSnackbarMessage('Error fetching user info. Please try again.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        });
    }, []);

    useEffect(() => {
        // Calculate total price whenever serviceId or baskets change
        const price1 = servicePrice * (baskets ? parseInt(baskets, 10) : 0);
        const price2 = productPrice * (baskets ? parseInt(baskets, 10) : 0);
        const price = price1 + price2;
        setTotalPrice(price.toFixed(2));
    }, [servicePrice, productPrice, baskets]);

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

    const handleProductsChange = (e) => {
        const selectedProductId = e.target.value;
        setProductId(selectedProductId);
        const selectedProduct = products.find(product => product.id === selectedProductId);
        setProductPrice(selectedProduct ? selectedProduct.price : 0);
    };

    const handlePostalCodeChange = (e) => {
        setPostalCode(e.target.value);
    };

    const handleNotesChange = (e) => {
        setNotes(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!productId || !serviceId || baskets === 0 || !address || !postalCode || !paymentMode) {
            setSnackbarMessage('Please fill out all fields.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const token = localStorage.getItem('auth_token');

        api.post('/orders', {
            service_id: serviceId,
            product_id: productId, 
            baskets,
            address,
            postal_code: postalCode.toString(),
            notes,
            payment_mode: paymentMode,
            total_price: totalPrice,
        }, { 
            headers: { 
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Order created successfully', response.data);
            // Reset form fields
            setServiceId('');
            setBaskets(0);
            setAddress('');
            setPostalCode('');
            setNotes('');
            setPaymentMode('');
            setServicePrice(0);
            setTotalPrice(0);
            setProducts([]); // Reset products
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
            sx={{ border: 'solid 1px #919191', padding: '15px', borderRadius: '5px', height: '100vh' }}>
            <Typography variant="h6" component="h1" gutterBottom sx={{color: '#424142'}}>
                Place Your Order
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate 
                sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
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
                    select
                    label="Select Product"
                    value={productId}
                    onChange={handleProductsChange}
                    fullWidth
                    size="small"
                    sx={{marginBottom: '5px'}}
                >
                    {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                            {product.name} - ₱{parseFloat(product.price).toFixed(2)}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="address"
                    label="Address"
                    fullWidth
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    size="small"
                    sx={{marginBottom: '7px'}}
                />
                <TextField
                    id="postalCode"
                    label="Postal Code"
                    fullWidth
                    value={postalCode}
                    onChange={handlePostalCodeChange}
                    size="small"
                    sx={{marginBottom: '7px'}}
                />
                <TextField
                    id="notes"
                    label="Notes"
                    fullWidth
                    multiline
                    rows={3}
                    value={notes}
                    onChange={handleNotesChange}
                    size="small"
                    sx={{marginBottom: '7px'}}
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
                
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Total Price: ₱{totalPrice}</Typography>
                </Box>
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, backgroundColor: '#cc0454' }}
                    size='large'
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
                padding: '30px',
            }}>
            <OrderForm />
            <Box sx={{height: '80%'}}>
                <Box sx={{display: 'flex', gap: '20px',}}>
                    <Button variant='contained' size='large' startIcon={<LocalLaundryServiceIcon/>} sx={{backgroundColor: '#f28705'}}>View Services</Button>
                    <Button variant='contained' size='large' startIcon={<ShoppingBasketIcon/>}>View Products</Button>
                </Box>
            <OrderHistory />
            </Box>
            <Navbar/>
        </Box>
    );
}

export default CustomerDashboard;
