import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './css/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', { email, password });
            if (response.data.includes("Login successful")) {
                setIsAuthenticated(true);
                navigate('/shows');
            } else {
                setMessage("unauthorized access.");
            }
        } catch (error) {
            setMessage(error.response ? error.response.data : "Server error");
        }
    };

    return (
        <div className='login-container'>
            <h2>User Log In</h2>
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
            <p className='p'>are you admin?<Link to="/adminlogin" className="login-link">Login as Admin</Link></p>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
