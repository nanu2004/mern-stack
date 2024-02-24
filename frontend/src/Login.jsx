// Login.jsx
import React, { useState } from 'react';
import { useLoginContext } from './LoginContext';

const Login = () => {
  const { login, isLoggedIn } = useLoginContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    // For now, let's assume a simple check with hardcoded credentials
    if (username === 'example' && password === 'password') {
      login(); // Set the login state to true
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        {isLoggedIn ? (
          <p className="text-green-600">You are already logged in.</p>
        ) : (
          <div>
            <label className="block mb-2 text-sm">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 mb-4 w-full"
            />

            <label className="block mb-2 text-sm">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 mb-4 w-full"
            />

            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none w-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
