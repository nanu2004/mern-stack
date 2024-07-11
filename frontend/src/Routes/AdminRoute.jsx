import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, fetchAdminData } from '../context/AuthContext'; // Updated import

const AdminRoute = () => {
  const { auth, setAuth } = useAuth(); // Removed fetchAdminData from destructure

  useEffect(() => {
    fetchAdminData(setAuth); // Fetch admin data on component mount
  }, [setAuth]);

  return auth && auth.token && auth.isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
