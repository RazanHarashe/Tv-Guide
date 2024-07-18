import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create a context to manage authentication state
const AuthContext = createContext();

// AuthProvider component manages authentication state and provides it through context
export const AuthProvider = ({ children }) => {
  // State variables for authentication status and admin status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // useEffect hook to fetch authentication status from server on component mount
  useEffect(() => {
    // Function to fetch authentication status from server
    const checkAuthStatus = async () => {
      try {
        // Make a GET request to '/auth-status' endpoint to get authentication status
        const response = await axios.get('/auth-status');
        // Update isAuthenticated and isAdmin state based on server response
        setIsAuthenticated(response.data.isAuthenticated);
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        // If there's an error, set isAuthenticated and isAdmin to false
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    };

    // Call checkAuthStatus function when component mounts to fetch initial authentication status
    checkAuthStatus();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  // Provide authentication state values and update functions to children components through context
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin }}>
      {children} {/* Render children components */}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access authentication context values in functional components
export const useAuth = () => useContext(AuthContext);