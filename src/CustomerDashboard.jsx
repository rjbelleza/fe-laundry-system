import React, { useState } from 'react';
import { Container, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const OrderForm = () => { 
    const [service, setService] = useState(''); 
    const [baskets, setBaskets] = useState(''); 
    const [address, setAddress] = useState(''); 
    const [paymentMode, setPaymentMode] = useState(''); 
    const [amount, setAmount] = useState('');

    const handleOrder = () => { 
        // Logic to handle order submission 
        console.log('Order placed:', { service, baskets, address, paymentMode, amount }); 
    };

        return ( 
            <Container maxWidth="sm"> 
                <form onSubmit={handleOrder}> 
                    <FormControl fullWidth margin="normal"> 
                        <InputLabel>Select Service</InputLabel> 
                        <Select value={service} onChange={(e) => setService(e.target.value)} required> 
                            <MenuItem value="Wash">Wash</MenuItem> 
                            <MenuItem value="Dry Clean">Dry Clean</MenuItem> 
                            <MenuItem value="Iron">Iron</MenuItem> 
                        </Select> 
                    </FormControl> 
                    <TextField 
                        label="Number of Baskets" 
                        type="number" 
                        fullWidth margin="normal" 
                        value={baskets} 
                        onChange={(e) => setBaskets(e.target.value)} 
                        required /> 
                        <TextField 
                            label="Change Default Address" 
                            fullWidth margin="normal" 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} /> 
                            <FormControl 
                                fullWidth 
                                margin="normal"> 
                                <InputLabel>Payment Mode</InputLabel> 
                                <Select 
                                    value={paymentMode} 
                                    onChange={(e) => setPaymentMode(e.target.value)} 
                                    required> 
                                    <MenuItem value="Credit Card">Credit Card</MenuItem> 
                                    <MenuItem value="Paypal">Paypal</MenuItem> 
                                    <MenuItem value="Cash on Delivery">Cash on Delivery</MenuItem> 
                                </Select> 
                            </FormControl> 
                            <TextField 
                                label="Amount to Pay" 
                                type="number" 
                                fullWidth margin="normal" 
                                value={amount} 
                                onChange={(e) => setAmount(e.target.value)} 
                                required /> 
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    color="primary" 
                                    fullWidth> Place Order </Button> 
                </form> 
            </Container> 
            );

        }

    const CustomerDashboard =()  => {
        return(
        <OrderForm></OrderForm>

        );
    }


export default CustomerDashboard;
