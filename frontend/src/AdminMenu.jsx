import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaList,
  FaProductHunt,
  FaShoppingCart,
  FaUsers,
  FaChartLine,
  FaFileAlt,
  FaPlus,
  FaEdit // Import the icon for updating products
} from "react-icons/fa";
import 'tailwindcss/tailwind.css';

const AdminMenu = () => {
  return (
    <div className="bg-gray-800 text-gray-400 h-full overflow-y-auto transition-all duration-500 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
      <div className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold">
          <FaShoppingCart className="inline-block text-2xl mr-2" /> SHOP
        </div>
      </div>
      <ul className="list-none p-0">
        <li>
          <NavLink
            to="/dashboard/admin"
            className="flex items-center py-4 px-6 text-lg text-gray-400 hover:bg-gray-600 hover:text-white rounded no-underline"
          >
            <FaChartLine className="mr-3" /> Dashboard Overview
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/create-product"
            className="flex items-center py-4 px-6 text-lg text-gray-400 hover:bg-gray-600 hover:text-white rounded no-underline"
          >
            <FaPlus className="mr-3" /> Create Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/orders"
            className="flex items-center py-4 px-6 text-lg text-gray-400 hover:bg-gray-600 hover:text-white rounded no-underline"
          >
            <FaShoppingCart className="mr-3" /> Orders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/products"
            className="flex items-center py-4 px-6 text-lg text-gray-400 hover:bg-gray-600 hover:text-white rounded no-underline"
          >
            <FaProductHunt className="mr-3" /> Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/create-category"
            className="flex items-center py-4 px-6 text-lg text-gray-400 hover:bg-gray-600 hover:text-white rounded no-underline"
          >
            <FaList className="mr-3" /> Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/users"
            className="flex items-center py-4 px-6 text-lg text-gray-400 hover:bg-gray-600 hover:text-white rounded no-underline"
          >
            <FaUsers className="mr-3" /> Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/comment"
            className="flex items-center py-4 px-6 text-lg text-gray-400 hover:bg-gray-600 hover:text-white rounded no-underline"
          >
            <FaFileAlt className="mr-3" /> Comments
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
