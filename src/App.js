import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import UserList from './Administrator';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import AboutUs from './AboutUs';
import Register from './Register';
import Contact from './Contact';
import CustomerDashboard from './CustomerDashboard';
import ResetPassword from './ResetPassword';
import ServicesManager from './ServicesManager';
import OrderManager from './OrderManager';
import CourierDashboard from './CourierDashboard';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<PrivateRoute><UserList /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><CustomerDashboard /></PrivateRoute>} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services-manager" element={<PrivateRoute><ServicesManager /></PrivateRoute>}></Route>
                <Route path="/order-manager" element={<PrivateRoute><OrderManager /></PrivateRoute>}></Route>
                <Route path="/courier-dashboard" element={<PrivateRoute><CourierDashboard/></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
