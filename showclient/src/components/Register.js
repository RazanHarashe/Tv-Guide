import React, { useState } from 'react';
import authService from '../services/authService';
import { Link } from 'react-router-dom';
import './css/Auth.css';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    authService.register(fullname, email, password).then(
      response => {
        setMessage('User registered successfully.');
        setSuccess(true);
      },
      error => {
        const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        setMessage(resMessage);
        setSuccess(false);
      }
    );
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Register</button>
        {message && <p className="message">{message}</p>}
        {success && <Link to="/login" className="login-link">Go to Login</Link>}  
      </form>
    </div>
  );
};

export default Register;
