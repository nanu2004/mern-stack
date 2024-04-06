import React from 'react';
import { NavLink } from 'react-router-dom';

function Category() {
  const handleCategorySelect = (category) => {
    // Implement category selection functionality here
    console.log('Selected category:', category);
  };

  const activeClassName = 'text-blue-500 bg-red-400';

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center my-5 items-center">


      <NavLink
        to="/category/Skincare"
        className={({ isActive }) =>
          isActive ? activeClassName : 'text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out'
        }
        onClick={() => handleCategorySelect('Skincare')}
      >
        Skincare
      </NavLink>
      <NavLink
        to="/category/Mascara"
        className={({ isActive }) =>
          isActive ? activeClassName : 'text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out'
        }
        onClick={() => handleCategorySelect('Mascara')}
      >
        Mascara
      </NavLink>
      <NavLink
        to="/category/Eyes"
        className={({ isActive }) =>
          isActive ? activeClassName : 'text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out'
        }
        onClick={() => handleCategorySelect('Eyes')}
      >
        Eyes
      </NavLink>
      <NavLink
        to="/category/Lipsticks"
        className={({ isActive }) =>
          isActive ? activeClassName : 'text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out'
        }
        onClick={() => handleCategorySelect('Lipsticks')}
      >
        Lipstick
      </NavLink>
      <NavLink
        to="/category/Foundation"
        className={({ isActive }) =>
          isActive ? activeClassName : 'text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out'
        }
        onClick={() => handleCategorySelect('Foundation')}
      >
        Foundation
      </NavLink>
      <NavLink
        to="/category/Concealer"
        className={({ isActive }) =>
          isActive ? activeClassName : 'text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out'
        }
        onClick={() => handleCategorySelect('Concealer')}
      >
        Concealer
      </NavLink>
    </div>
  );
}

export default Category;
