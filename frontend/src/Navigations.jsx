import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useSearch } from './SearchContext';

function Navigations() {
  const { setSearchQuery } = useSearch();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <nav className="bg-gray-800 p-4 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0"> {/* Centering the Logo */}
        <span className="text-white font-bold text-lg">Your Logo</span>
      </div>
      <div className="flex justify-center mb-4 md:mb-0"> {/* Centering the SearchBar */}
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="hidden md:flex space-x-4"> {/* Navigation Links */}
        <Link to="/home" className="text-white hover:text-gray-300">Home</Link>
        <Link to="/signup" className="text-white hover:text-gray-300">Signup</Link>
        <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
        <Link to="/products" className="text-white hover:text-gray-300">Product</Link>
        <Link to="/bag" className="text-white hover:text-gray-300">Bag</Link>
        <Link to="/WishList" className="text-white hover:text-gray-300">WishList</Link>
        <Link to="/cart" className="text-white hover:text-gray-300">Add to Cart</Link>
        {/* Add other navigation links */}
      </div>
    </nav>
  );
}

export default Navigations;
