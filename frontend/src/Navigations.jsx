import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import SearchInput from './Form/SearchInput'; // Importing SearchInput

function Navigations() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    try {
      Cookies.remove('token');
      setAuth({ user: null, token: '' });
      toast.success('Logged out successfully', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-gray-800 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <span className="text-white font-bold text-lg">Your Logo</span>
      </div>
      <SearchInput className="flex-1 mx-4" /> {/* Centered SearchInput */}
      <div className="hidden md:flex space-x-4 items-center">
        <Link to="/" className="text-white hover:text-gray-300">
          Home
        </Link>
        {!auth.user ? (
          <>
            <Link to="/signup" className="text-white hover:text-gray-300">
              Signup
            </Link>
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={toggleDropdown}
            >
              {auth?.user?.firstname} {auth?.user?.lastname}
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md">
                <li>
                  <Link
                    to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
        <Link to="/about" className="text-white hover:text-gray-300">
          About
        </Link>
        <Link to="/bag" className="text-white hover:text-gray-300">
          Bag
        </Link>
        <Link to="/wishlist" className="text-white hover:text-gray-300">
          WishList
        </Link>
        <Link to="/cart" className="text-white hover:text-gray-300">
          Add to Cart
        </Link>
      </div>
    </nav>
  );
}

export default Navigations;
