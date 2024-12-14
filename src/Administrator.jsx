import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Container, Pagination, Modal, Button, Typography, Box, IconButton, Dialog,
         DialogActions, DialogContent, DialogContentText, DialogTitle, Alert, AlertTitle } from '@mui/material';
import api from './services/api';
import UpdateUserRole from './UpdateUserRole';
import { Delete as DeleteIcon, Close as CloseIcon } from '@mui/icons-material';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get(`/users?page=${currentPage}`);
                console.log("API Response:", response.data); // Log the response data
                setUsers(response.data.data);
                setTotalPages(response.data.last_page);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [currentPage]);

    const handleUpdate = (updatedUser, setSuccessMessage) => {
        console.log(`Updating user with ID: ${updatedUser.id}, New Role: ${updatedUser.role}`);
        api.put(`/users/${updatedUser.id}/role`, { role: updatedUser.role })
            .then(response => {
                console.log(response.data.message);
                setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
                setSuccessMessage('User role updated successfully!');
            })
            .catch(error => {
                console.error('There was an error updating the user role!', error);
                setSuccessMessage('Failed to update user role. Please try again.');
            });
    };

    const handleOpen = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleDeleteDialogOpen = (userId) => { 
        setUserIdToDelete(userId); 
        setDeleteDialogOpen(true); 
    };

    const handleDeleteDialogClose = () => { 
        setUserIdToDelete(null); 
        setDeleteDialogOpen(false); 
    };

    const handleDelete = () => { 
        api.delete(`/users/${userIdToDelete}`) 
            .then(response => { 
                console.log(response.data.message); 
                setUsers(users.filter(user => user.id !== userIdToDelete)); 
                setSuccessMessage('User deleted successfully!');
                handleDeleteDialogClose();
            }) 
            .catch(error => { 
                console.error('There was an error deleting the user!', error); 
                setSuccessMessage('Failed to delete user. Please try again.');
                handleDeleteDialogClose();
            }); 
    };

    const handleCloseAlert = () => { 
        setSuccessMessage(''); 
    };

    return (
        <Container maxWidth="lg"
                   sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        flexDirection: 'column',
                        height: '100vh',
                    }}>
            <Paper sx={{
                        border: '2px solid black',
                        borderRadius: '10px',
                        height: '500px',
                        overflow: 'auto',
                    }}>
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
                                    top: '0',
                                    backgroundColor: '#2e1f2a',
                                    textAlign: 'center',
                                    zIndex: '10',
                    }}>
                        <TableRow sx={{ textAlign: 'center' }}>
                            <TableCell sx={{ color: '#ffffff' }}>ID</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Name</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Email</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Role</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Address</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Postal</TableCell>
                            <TableCell sx={{ color: '#ffffff' }}>Mobile</TableCell>
                            <TableCell sx={{ color: '#ffffff', textAlign: 'center'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.address}</TableCell>
                                <TableCell>{user.postal_code}</TableCell>
                                <TableCell>{user.mobile}</TableCell>
                                <TableCell>
                                    <Box fullWidth sx={{display: 'flex'}}>
                                        <Button onClick={() => handleOpen(user)} variant="contained" sx={{ marginRight: 2, zIndex: '1', backgroundColor: '#4d2836'}}>
                                            Edit
                                        </Button>
                                        <IconButton onClick={() => handleDeleteDialogOpen(user.id)} color="error"> <DeleteIcon /> </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
            />

            <Modal open={open}
                   onClose={handleClose}
                   aria-labelledby="modal-title"
                   aria-describedby="modal-description"
            >
                <Paper sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    backgroundColor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}>
                    {selectedUser && (
                        <>
                            <Typography variant='h5'
                                sx={{ marginBottom: '30px' }}>Manage User</Typography>
                            <Box sx={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <Typography sx={{ backgroundColor: '#e8d3e3', padding: '7px', borderRadius: '10px' }}>
                                    <Typography sx={{ fontSize: '12px' }}>Name:</Typography>{selectedUser.name}
                                </Typography>
                                <Typography sx={{ backgroundColor: '#e8d3e3', padding: '7px', borderRadius: '10px' }}>
                                    <Typography sx={{ fontSize: '12px' }}>Email:</Typography>{selectedUser.email}
                                </Typography>
                                <Typography sx={{ backgroundColor: '#e8d3e3', padding: '7px', borderRadius: '10px' }}>
                                    <Typography sx={{ fontSize: '12px' }}>Address:</Typography>{selectedUser.address}
                                </Typography>
                                <Typography sx={{ backgroundColor: '#e8d3e3', padding: '7px', borderRadius: '10px' }}>
                                    <Typography sx={{ fontSize: '12px' }}>Postal Code:</Typography>{selectedUser.postal_code}
                                </Typography>
                                <Typography sx={{ backgroundColor: '#e8d3e3', padding: '7px', borderRadius: '10px' }}>
                                    <Typography sx={{ fontSize: '12px' }}>Mobile No.:</Typography>0{selectedUser.mobile}
                                </Typography>
                            </Box>
                            <UpdateUserRole user={selectedUser} onUpdate={handleUpdate} />
                            <Button onClick={handleClose} variant="contained" color='secondary' sx={{ marginTop: 2 }}>
                                Close
                            </Button>
                        </>
                    )}
                </Paper>
            </Modal>
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
        </Container>
    );
};

export default UserList;
