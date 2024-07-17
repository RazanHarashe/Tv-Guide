import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/SignUp.css'; 

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'USER', // Default role can be set to 'USER' or 'ADMIN'
    fullname: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/registration', formData);
      setMessage(response.data);
    } catch (error) {
      console.error('There was an error!', error);
      setMessage('This User exist');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p><Link to="/adminlogin" className="login-link">Go to Admin Login</Link></p>
      <p className="p">OR</p>
      <p><Link to="/login" className="login-link">Go to User Login</Link></p>  
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUp;
