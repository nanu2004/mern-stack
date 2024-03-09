import { NavLink } from "react-router-dom";

function Category() {
  const activeClassName = "text-blue-500 bg-red-400";
  return (
    <div className="flex gap-4 justify-center my-5">
      <NavLink
        to="/category/Skincare"  // Add leading slash
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : "text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out "
        }
      >
        Skincare
      </NavLink>


      <NavLink
        to="category/Mascara"
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : "text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out "
        }
      >
        Mascara
      </NavLink>

      <NavLink
        to="category/Eyes"
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : "text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out "
        }
      >
        Eyes
      </NavLink>

      <NavLink
        to="category/Lipsticks"
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : "text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out "
        }
      >
        Lipstick
      </NavLink>

      <NavLink
        to="category/Foundation"
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : "text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out "
        }
      >
        Foundation
      </NavLink>
      <NavLink
        to="category/Concealer"
        className={({ isActive }) =>
          isActive
            ? activeClassName
            : "text-gray-500 hover:text-gray-700 transition duration-300 ease-in-out "
        }
      >
        Concealer
      </NavLink>
    </div>
  );
}

export { Category };