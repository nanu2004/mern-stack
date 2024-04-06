import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

function Navigations() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <span className="font-bold text-lg">Your Logo</span>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link to="/home" className="text-white hover:text-gray-300">Home</Link>
            <Link to="/signup" className="text-white hover:text-gray-300">Signup</Link>
            <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
            <Link to="/products" className="text-white hover:text-gray-300">Product</Link>
            <Link to="/bag" className="text-white hover:text-gray-300">Bag</Link>
            <Link to="/cart" className="text-white hover:text-gray-300">Add to Cart</Link>
          </div>
          <div className="md:hidden">
            <button className="text-white">&#9776;</button>
          </div>
        </div>
        {/* Center align the SearchBar component */}
        <div className="flex justify-center mt-4">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}

export default Navigations;
