import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, 
        TextField, Snackbar, Alert, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import api from './services/api';

const ServicesManager = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [newService, setNewService] = useState({ name: '', description: '', price: '' });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [serviceIdToDelete, setServiceIdToDelete] = useState(null);
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

    const handleDeleteDialogOpen = (serviceId) => { 
        setServiceIdToDelete(serviceId); 
        setDeleteDialogOpen(true); 
    };

    const handleDeleteDialogClose = () => { 
        setServiceIdToDelete(null); 
        setDeleteDialogOpen(false); 
    };

    const handleDelete = () => { 
        api.delete(`/services/${serviceIdToDelete}`) 
            .then(response => { 
                console.log(response.data.message); 
                setServices(services.filter(service => service.id !== serviceIdToDelete)); 
                setSnackbarOpen(true);
                setSnackbarMessage('Service deleted successfully!');
                handleDeleteDialogClose();
            }) 
            .catch(error => { 
                console.error('There was an error deleting the service!', error); 
                setSnackbarOpen(true);
                setSnackbarMessage('Failed to delete service. Please try again.');
                handleDeleteDialogClose();
            }); 
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

    const handleCreateDialogOpen = () => {
        setCreateDialogOpen(true);
    };

    const handleCreateDialogClose = () => {
        setCreateDialogOpen(false);
        setNewService({ name: '', description: '', price: '' });
    };

    const handleNewServiceChange = (e) => {
        const { name, value } = e.target;
        setNewService(prevService => ({
            ...prevService,
            [name]: value,
        }));
    };

    const handleCreateService = async () => {
        try {
            const response = await api.post('/services', newService);
            setServices([...services, response.data]);
            setSnackbarMessage('Service created successfully!');
            setSnackbarOpen(true);
            handleCreateDialogClose();
        } catch (error) {
            console.error("Error creating service:", error);
            setSnackbarMessage('Error creating service.');
            setSnackbarOpen(true);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box sx={{width: '50vw', display: 'flex', justifyContent: 'space-between'}}>
                <Button 
                    variant='contained' 
                    onClick={() => navigate('/admin')}
                    sx={{ marginBottom: '10px' }}
                >User List
                </Button>
                <Button 
                    variant='contained'
                    onClick={handleCreateDialogOpen}
                    sx={{ marginBottom: '10px' }}
                >Add Service
                </Button>
            </Box>
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
                                    <IconButton onClick={() => handleDeleteDialogOpen(service.id)} color='error'><DeleteForeverIcon/></IconButton>
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

            <Dialog open={createDialogOpen} onClose={handleCreateDialogClose}>
                <DialogTitle>Create New Service</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Service Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="name"
                        value={newService.name}
                        onChange={handleNewServiceChange}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        name="description"
                        value={newService.description}
                        onChange={handleNewServiceChange}
                    />
                    <TextField
                        margin="dense"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="outlined"
                        name="price"
                        value={newService.price}
                        onChange={handleNewServiceChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCreateDialogClose} color="primary">Cancel</Button>
                    <Button onClick={handleCreateService} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog 
                open={deleteDialogOpen} 
                onClose={handleDeleteDialogClose} 
                aria-labelledby="alert-dialog-title" 
                aria-describedby="alert-dialog-description" 
            > 
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle> 
                <DialogContent> 
                    <DialogContentText id="alert-dialog-description"> 
                        Are you sure you want to delete this service? This action cannot be undone. 
                    </DialogContentText> 
                </DialogContent> 
                <DialogActions> 
                    <Button onClick={handleDeleteDialogClose} color="primary"> Cancel </Button> 
                    <Button onClick={handleDelete} color="error" autoFocus> Delete </Button> 
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
