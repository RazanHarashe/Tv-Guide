import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';

import './css/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate(); // This is used to programmatically navigate

  const handleLogout = () => {
    localStorage.clear(); // Clear all stored data in localStorage
    navigate('/adminlogin'); // Redirect to the login page or wherever needed
  };

  return (
    <div className="admin-dashboard">
      <div className="header1">
        <h2>ADMIN DASHBOARD</h2>
        <button onClick={handleLogout}>Logout</button> {/* Logout button */}
      </div>
      <nav>
        <ul className='img'>
          <li><img src="/img/shows.jpg" alt="shows" /></li>
          <li><img src="/img/reviews.jpg" alt="reviews" /></li>
          <li><img src="/img/users.png" alt="users" /></li>
        </ul>
        <ul>
          <li><Link to="shows">Manage Shows</Link></li>
          <li><Link to="reviews">Manage Reviews</Link></li>
          <li><Link to="admin_users">Manage Users</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
