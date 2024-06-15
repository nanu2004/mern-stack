import React from 'react';
import { useAuth } from './AuthContext';
import { useLocation } from 'react-router-dom';

const About = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    <div>
      <h1>About Page</h1>
      <p>Current location: {location.pathname}</p>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </div>
  );
};

export default About;
