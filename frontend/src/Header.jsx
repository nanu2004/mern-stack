// Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/" className="hover:text-gray-300">Home</NavLink>
        </li>
        <li>
          <NavLink to="/category" className="hover:text-gray-300">Categories</NavLink>
        </li>
        <li>
          <NavLink to="/card" className="hover:text-gray-300">Card</NavLink>
        </li>
        <li>
          <NavLink to="/login" className="hover:text-gray-300">Login</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Header;
