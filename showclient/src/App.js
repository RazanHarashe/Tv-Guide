import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import Login from './components/Login';
import './App.css';
import SignUp from './components/SignUp';

const App = () => {
  return (
      <Router>
        <div className="app">
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="/register" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;