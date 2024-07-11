import React, { useEffect } from 'react';

import UserMenu from '../UserMenu';
import { useAuth } from '../context/AuthContext'; // Adjust the import path based on your project structure

const Dashboard = () => {
  const { auth } = useAuth(); // Destructure auth from the useAuth hook

  useEffect(() => {
    console.log('Auth state:', auth); // Log the auth state to debug
  }, [auth]); // useEffect dependency on auth

  return (

      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              {auth && auth.user ? (
                <>
                  <h3>Welcome {auth.user.firstname} {auth.user.lastname}</h3>
                  <p>Your user ID: {auth.user._id}</p>
                  <h3>{auth.user.email}</h3>
                  <h3>{auth.user.address}</h3>
                </>
              ) : (
                <div>Loading user data...</div>
              )}
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default Dashboard;
