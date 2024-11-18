import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import UserList from './UserList';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import AboutUs from './AboutUs';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="aboutus" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
            </Routes>
        </Router>
    );
}

export default App;
