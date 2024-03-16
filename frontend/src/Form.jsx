import React, { useState } from "react";
import axios from 'axios'; // Import Axios

function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); // Log formData to console
    
    try {
      const response = await axios.post('http://localhost:3000/auth/register', formData);
      
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Error during registration:', error.message);
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-4">Customer Information</h3>
      <form onSubmit={handleSubmit} method="POST"> {/* Specify method="POST" */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-semibold mb-1">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            required
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-semibold mb-1">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            required
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            onChange={handleInputChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export { Form };
