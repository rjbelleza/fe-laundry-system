import React, { useState } from 'react';
import { Button, FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';

const UpdateUserRole = ({ user, onUpdate }) => {
    const [role, setRole] = useState(user.role);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate({ ...user, role }, setSuccessMessage);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                    labelId="role-label"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{width: '100%', display: 'flex', alignItems: 'center'}}>
            <Button type="submit" variant="contained" sx={{ marginTop: 2, backgroundColor: '#4d1c2f' }}>Update Role</Button>
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
