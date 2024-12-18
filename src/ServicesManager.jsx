import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import api from './services/api';

const ServicesManager = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/services');
                setServices(response.data);
            } catch (error) {
                console.error("Error Fetching Services:", error);
            }
        };

        fetchServices();
    }, []);

    const handleClickOpen = (service) => {
        setSelectedService(service);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedService(null);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedService(prevService => ({
            ...prevService,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        try {
            await api.put(`/services/${selectedService.id}`, selectedService);
            setServices(services.map(service => 
                service.id === selectedService.id ? selectedService : service
            ));
            setSnackbarMessage('Service updated successfully!');
            setSnackbarOpen(true);
            handleClose();
        } catch (error) {
            console.error("Error updating service:", error);
            setSnackbarMessage('Error updating service.');
            setSnackbarOpen(true);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Button 
                variant='contained' 
                onClick={() => navigate('/admin')}
                sx={{ left: '-25%', marginBottom: '10px' }}
            >Users
            </Button>
            <Paper elevation={10} sx={{ padding: '10px', width: '800px', height: '400px', marginBottom: '-50px', overflow: 'auto' }} >
                <Table>
                    <TableHead sx={{
                                    position: 'sticky',
                                    top: '0',
                                    backgroundColor: '#2e1f2a',
                                    textAlign: 'center',
                                    zIndex: '10',
                                }}>
                        <TableRow sx={{ textAlign: 'center' }}>
                            <TableCell sx={{ color: '#ffffff' }}>Service</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Description</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Price</TableCell>
                            <TableCell sx={{ textAlign: 'center', color: '#ffffff' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell>{service.name}</TableCell>
                                <TableCell>{service.description}</TableCell>
                                <TableCell>P{parseFloat(service.price).toFixed(2)}</TableCell>
                                <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                    <Button onClick={() => handleClickOpen(service)}>Update</Button>
                                    <DeleteForeverIcon color='error'/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Service</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Service Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="name"
                        value={selectedService?.name || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="description"
                        value={selectedService?.description || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="outlined"
                        name="price"
                        value={selectedService?.price || ''}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleUpdate} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default ServicesManager;
