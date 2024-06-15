// src/components/Spinner.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Spinner = () => {
  const [timeoutReached, setTimeoutReached] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutReached(true);
      navigate('/error'); // Redirect to an error page or a fallback route
    }, 5 * 60 * 1000); // 5 minutes timeout

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        {!timeoutReached ? (
          <>
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
            <p className="mt-4 text-lg text-gray-700">Loading...</p>
          </>
        ) : (
          <p className="mt-4 text-lg text-gray-700">Loading is taking longer than expected...</p>
        )}
      </div>
    </div>
  );
};

export default Spinner;
