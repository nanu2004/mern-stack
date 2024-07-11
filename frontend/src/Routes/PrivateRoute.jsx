import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, fetchUserData } from '../context/AuthContext'; // Updated import

const PrivateRoute = () => {
  const { auth, setAuth } = useAuth(); // Removed fetchUserData from destructure

  useEffect(() => {
    fetchUserData(setAuth); // Fetch user data on component mount
  }, [setAuth]);

  return auth && auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
