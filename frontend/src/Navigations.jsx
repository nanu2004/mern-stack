import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import SearchInput from './Form/SearchInput';
import useCategory from './hooks/useCategory';
import { useCart } from './context/cart';
import { Badge } from 'antd';

function Navigations() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const categories = useCategory();
  const [cart] = useCart();

  const handleLogout = () => {
    try {
      Cookies.remove('token');
      setAuth({ user: null, token: '' });  // Clear the authentication state
      toast.success('Logged out successfully', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/login');  // Redirect to login page
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

  const toggleCategoryDropdown = () => {
    setCategoryDropdownOpen(!categoryDropdownOpen);
    setUserDropdownOpen(false);  // Close user dropdown if open
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
    setCategoryDropdownOpen(false);  // Close category dropdown if open
  };

  return (
    <nav className="bg-gray-800 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between z-50 relative">
      <div className="flex items-center mb-4 md:mb-0">
        <span className="text-white font-bold text-lg">Your Logo</span>
      </div>
      <SearchInput className="flex-1 mx-4" />
      <div className="flex flex-col md:flex-row items-center space-x-4">
        <Link to="/" className="text-white hover:text-gray-300">
          Home
        </Link>
        <div className="relative">
          <button
            className="text-white hover:text-gray-300 focus:outline-none"
            onClick={toggleCategoryDropdown}
          >
            Categories
          </button>
          {categoryDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-50">
              <li>
                <Link
                  to="/categories"
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
                >
                  All Categories
                </Link>
              </li>
              {categories?.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
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
              onClick={toggleUserDropdown}
            >
              {auth.user.firstname} {auth.user.lastname}
            </button>
            {userDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md z-50">
                <li>
                  <Link
                    to={`/dashboard/${auth.user.role === 1 ? 'admin' : 'user'}`}
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-100"
                    onClick={() => setUserDropdownOpen(false)}
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
        <Link to="/Wishlist" className="text-white hover:text-gray-300">
          WishListlistpage
        </Link>
        <Link to="/cart" className="relative text-white hover:text-gray-300 flex items-center">
          <Badge count={cart?.length} showZero>
            <span className="text-white">Cart</span>
          </Badge>
        </Link>
      </div>
    </nav>
  );
}

export default Navigations;
