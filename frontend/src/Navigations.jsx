import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useSearch } from './SearchContext';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

function Navigations() {
  const { setSearchQuery } = useSearch();
  const { auth, setAuth } = useAuth();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleLogout = () => {
    try {
      // Clear user authentication data from localStorage
      localStorage.removeItem('auth');
      // Clear user authentication data from AuthContext
      setAuth({ user: null, token: "" });
      // Show success notification
      toast.success('Logged out successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      // Show error notification if logout fails
      toast.error('Failed to logout', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
        {!auth.user && (
          <>
            <Link to="/signup" className="text-white hover:text-gray-300">Signup</Link>
            <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
          </>
        )}
        {auth.user && (
          <Link to="/" className="text-white hover:text-gray-300" onClick={handleLogout}>Logout</Link>
        )}
        <Link to="/about" className="text-white hover:text-gray-300">About</Link>
        <Link to="/bag" className="text-white hover:text-gray-300">Bag</Link>
        <Link to="/WishList" className="text-white hover:text-gray-300">WishList</Link>
        <Link to="/cart" className="text-white hover:text-gray-300">Add to Cart</Link>
        {/* Add other navigation links */}
      </div>
    </nav>
  );
}

export default Navigations;
