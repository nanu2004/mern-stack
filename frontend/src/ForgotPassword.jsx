import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => setEmail(e.target.value);

  const handleError = (err) =>
    toast.error(err, {
      position: 'top-center',
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: 'top-center',
    });

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:3000/auth/forgot-password', { email });
      handleSuccess(data.message);
    } catch (error) {
      handleError(error.response?.data?.message || 'Password reset request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form_container max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Reset Email'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
