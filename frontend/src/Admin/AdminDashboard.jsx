import React, { useEffect } from 'react';
import AdminMenu from '../AdminMenu'; // Adjust the path based on your project structure
import { useAuth, fetchAdminData } from '../context/AuthContext';

const AdminDashboard = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    if (!auth || !auth.user) {
      fetchAdminData(setAuth); // Fetch admin data if not already fetched
    }
  }, [auth, setAuth]);

  if (!auth || !auth.user) {
    return <div>Loading admin data...</div>; // Handle initial loading state
  }

  const { firstname, lastname, _id: userId, email, phone } = auth.user;

  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <div className="card w-75 p-3">
            <h3> Admin Name : {firstname} {lastname}</h3>
            <h3> Admin Email : {email}</h3>
            <h3> Admin Contact : {phone}</h3>
            <p>Your admin ID: {userId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
