import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import UserList from './UserList';
import PrivateRoute from './PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={
                    <PrivateRoute>
                        <UserList />
                    </PrivateRoute>
                } />
                <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login by default */}
            </Routes>
        </Router>
    );
}

export default App;
