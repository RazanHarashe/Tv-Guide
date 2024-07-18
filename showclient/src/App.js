import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import Login from './components/Login';
import './App.css';
import SignUp from './components/SignUp';
import AdminLogin from './components/AdminLogin';
import { AuthProvider} from './AuthContext';

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
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;