import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './css/Login.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated, setIsAdmin } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/adminlogin', { email, password });
            if (response.data.includes("Login successful")) {
                setIsAuthenticated(true);
                setIsAdmin(true);
                navigate('/admin');
            } else {
                setMessage("Invalid credentials or unauthorized access.");
            }
        } catch (error) {
            setMessage(error.response ? error.response.data : "Server error");
        }
    };

    return (
        <div className='login-container'>
            <h2>Admin Log In</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminLogin;
