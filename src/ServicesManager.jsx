import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@mui/material';
import api from './services/api'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';

const ServicesManager = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try{
                const response = await api.get('/services');
                setServices(response.data);
            } catch (error) {
                console.error("ErrorFetching Services:", error)
            }
        };

        fetchServices();
    }, []);

    return(
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <Button 
                variant='contained' 
                onClick={() => navigate('/admin')}
                sx={{left: '-25%', marginBottom: '10px'}}
            >Users
            </Button>
            <Paper elevation={10} sx={{padding: '10px', width: '800px', height: '400px', marginBottom: '-50px', overflow: 'auto'}} >
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
                            <TableCell sx={{textAlign: 'center', color: '#ffffff'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((service) => (
                            <TableRow key={service.id}>
                                <TableCell>{service.name}</TableCell>
                                <TableCell>{service.description}</TableCell>
                                <TableCell>P{parseFloat(service.price).toFixed(2)}</TableCell>
                                <TableCell sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                                    <Button>Update</Button>
                                    <DeleteForeverIcon color='error'/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
}

export default ServicesManager;
