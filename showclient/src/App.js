import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage';
import Login from './components/Login';
import './App.css';
import SignUp from './components/SignUp';
import AdminLogin from './components/AdminLogin';
import { AuthProvider, useAuth} from './AuthContext';
import AdminDashboard from './components/AdminDashboard';

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
            <Route exact path="/admin" element={<AdminRoute element={AdminDashboard} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;