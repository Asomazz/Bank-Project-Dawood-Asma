import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { removeToken } from "../api/storage";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    removeToken();
    setUser(false);
    navigate("/");
  };

  const handleLanguageChange = () => {
    const newLang = i18n.language === "EN" ? "AR" : "EN";
    i18n.changeLanguage(newLang);
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
              {t("title")}
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
                {t("dashboard")}
              </NavLink>
              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600 bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    : "text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                {t("transactions")}
              </NavLink>
              <NavLink
                to="/usersPage"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600 bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    : "text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                {t("users")}
              </NavLink>
              <NavLink
                to="/profilePage"
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-600 bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                    : "text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                }
              >
                {t("profile")}
              </NavLink>
              {user ? (
                <>
                  <button
                    onClick={handleLogout}
                    className="bg-orange-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
                  >
                    {t("logout")}
                  </button>
                  <button
                    onClick={handleLanguageChange}
                    className="px-4 py-2 bg-white text-orange-600 border border-orange-600 rounded-lg text-sm"
                  >
                    {i18n.language === "EN" ? "AR" : "EN"}
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {t("login")}
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {t("register")}
                  </NavLink>
                  <button
                    onClick={handleLanguageChange}
                    className="px-4 py-2 bg-white text-orange-600 border border-orange-600 rounded-lg text-sm"
                  >
                    {i18n.language === "EN" ? "AR" : "EN"}
                  </button>
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
