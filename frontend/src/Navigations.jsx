import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component

function Navigations() {
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <span className="font-bold text-lg">Your Logo</span>
            </div>
            <div className="hidden md:flex space-x-4">
              {/* Replace anchor tags with Link components */}
              <Link to="/" className="text-white hover:text-gray-300">Home</Link>
              <Link to="/products" className="text-white hover:text-gray-300">Shop</Link>
              <Link to="/about" className="text-white hover:text-gray-300">About Us</Link>
              <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
              <Link to="/bag" className="text-white hover:text-gray-300">Bag</Link>
              <Link to="/cart" className="text-white hover:text-gray-300">Add to Cart</Link>
            </div>
            <div className="md:hidden">
              {/* Add your mobile menu icon here */}
              <button className="text-white">
                {/* Example: Hamburger icon */}
                &#9776;
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navigations;
