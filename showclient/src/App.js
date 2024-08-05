import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage';
import Login from './components/Login';
import './App.css';
import SignUp from './components/SignUp';
import AdminLogin from './components/AdminLogin';
import Search from './components/SearchShows';
import ShowList from './components/ShowList';
import AdminDashboard from './components/AdminDashboard';
import ManageUsers from './components/ManageUsers';
import ShowDetails from './components/ShowDetails';
import ManageShows from './components/ManageShows';
import ManageReviews from './components/ManageReviews';
import AiringSchedule from './components/AiringSchedule';
import { AuthProvider, useAuth } from './AuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

const AdminRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  return isAuthenticated && isAdmin ? <Component {...rest} /> : <Navigate to="/adminlogin" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="/register" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/adminlogin" element={<AdminLogin />} />
            <Route exact path="/shows/search" element={<Search />} />
            <Route exact path="/shows" element={<PrivateRoute element={ShowList} />} />
            <Route exact path="/shows/:id" element={<PrivateRoute element={ShowDetails} />} />
            <Route exact path="/admin" element={<AdminRoute element={AdminDashboard} />} />
            <Route exact path="/admin/admin_users" element={<AdminRoute element={ManageUsers} />} />
            <Route exact path="/admin/shows" element={<AdminRoute element={ManageShows} />} />
            <Route exact path="/admin/reviews" element={<AdminRoute element={ManageReviews} />} />
            <Route exact path="/shows/airing-schedule" element={<PrivateRoute element={AiringSchedule} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

