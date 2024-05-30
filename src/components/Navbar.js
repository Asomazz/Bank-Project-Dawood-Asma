import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { removeToken } from "../api/storage";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png"; // Ensure the path is correct

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    setUser(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </Link>
            <Link to="/" className="ml-2 text-orange-600 text-xl font-semibold">
              Dasma Bank
            </Link>
          </div>
          <div className="block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
                to="/accountPage"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600 bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    : "text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600 bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    : "text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                Transactions
              </NavLink>
              <NavLink
                to="/usersPage"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600 bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    : "text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                Users
              </NavLink>
              <NavLink
                to="/profilePage"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600 bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    : "text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                Profile
              </NavLink>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
                >
                  Logout
                </button>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
