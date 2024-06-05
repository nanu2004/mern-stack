import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;

const Welcome = () => {
  const [user, setUser] = useState(null);

  // Function to refresh the access token
  const refreshToken = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/refresh");
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // Function to fetch user data
  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/user");
      const data = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    // Function to initialize user data upon component mount
    const initializeUserData = async () => {
      try {
        const userData = await sendRequest();
        if (userData) {
          setUser(userData.user);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Initialize user data if it's the first render
    if (!user) {
      initializeUserData();
    }

    // Set interval to refresh access token and update user data
    const interval = setInterval(async () => {
      try {
        const refreshTokenData = await refreshToken();
        if (refreshTokenData) {
          setUser(refreshTokenData.user);
        }
      } catch (error) {
        console.log(error);
      }
    }, 1000 * 29); // Refresh token every 29 seconds

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [user]); // Trigger effect when user state changes

  // Log the Welcome component to the console when user data is available
  useEffect(() => {
    if (user) {
      console.log(`Welcome component rendered for user: ${user.firstname}`);
    }
  }, [user]);

  return (
    <div>
      {user && <h1>Welcome, {user.firstname}</h1>}
    </div>
  );
};

export { Welcome };
