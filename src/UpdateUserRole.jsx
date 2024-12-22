import React, { useState } from 'react';
import { Button, FormControl, Select, MenuItem, Typography, Box } from '@mui/material';

const UpdateUserRole = ({ user, onUpdate }) => {
    const [role, setRole] = useState(user.role);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...user, role }, setSuccessMessage);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Typography sx={{fontSize: '12px', marginLeft: '10px'}}>Role</Typography>
            <FormControl fullWidth>
                <Select
                    labelId="role-label"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                    <MenuItem value="courier">Courier</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{width: '100%', display: 'flex', alignItems: 'center'}}>
            <Button type="submit" variant="contained" sx={{ marginTop: 2, backgroundColor: '#4d1c2f' }}
                    disabled={role === user.role}
                >Update Role</Button>
                {successMessage && (
                    <Typography variant="body2" color="success.main" sx={{ mt: 2, marginLeft: '50px',}}>
                        {successMessage}
                    </Typography>
                )}
            </Box>
        </form>
    );
};

export default UpdateUserRole;
