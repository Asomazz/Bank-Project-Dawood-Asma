import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserContext from "../context/UserContext";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";
import gif from "../Pics/e4ec7c5d7af5342f57347c9ada429fba.gif";

const NotFoundPage = () => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useContext(UserContext);
  const [language, setLanguage] = useState("EN");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-orange-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Logo" className="h-16 mr-3" />
          </Link>
          <Link to="/" className="text-2xl font-lively">
            {t("title")}
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <Link
                to="/profilePage"
                className="px-4 py-2 bg-white text-orange-600 rounded-lg text-sm"
              >
                {t("visitProfile")}
              </Link>
              <Link
                onClick={logout}
                to="/"
                className="px-4 py-2 bg-white text-orange-600 rounded-lg text-sm"
              >
                {t("logout")}
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-orange-600 rounded-lg text-sm"
            >
              {t("login")}
            </Link>
          )}
          {language === "EN" ? (
            <button
              onClick={() => handleLanguageChange("AR")}
              className="px-4 py-2 bg-white text-orange-600 border border-orange-600 rounded-lg text-sm"
            >
              AR
            </button>
          ) : (
            <button
              onClick={() => handleLanguageChange("EN")}
              className="px-4 py-2 bg-white text-orange-600 border border-orange-600 rounded-lg text-sm"
            >
              EN
            </button>
          )}
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <div className="flex items-center justify-center space-x-6 max-w-5xl w-full">
          <div className="w-1/2">
            <h1 className="text-6xl font-bold text-orange-600 mb-4">
              {t("wrongTurn")}
            </h1>
            <p className="text-lg text-gray-700 mb-4 font-lively">
              {t("lostMessage")}
            </p>
            <div className="flex flex-col space-y-2">
              <Link to="/status" className="text-blue-600">
                {t("statusPage")}
              </Link>
              <Link to="/discord" className="text-blue-600">
                {t("discord")}
              </Link>
              <Link to="/support" className="text-blue-600">
                {t("supportLink")}
              </Link>
            </div>
          </div>
          <div className="w-1/2">
            <img src={gif} alt="404 Illustration" className="w-full h-auto" />
          </div>
        </div>
      </main>

      <footer className="w-full bg-orange-600 text-white py-4 text-center">
        <div className="flex justify-between items-center max-w-5xl mx-auto px-4 font-lively">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="flex space-x-4">
            <Link to="/about" className="hover:text-gray-200">
              {t("about")}
            </Link>
            <a href="/privacy" className="hover:text-gray-200">
              {t("privacyPolicy")}
            </a>
            <a href="/licensing" className="hover:text-gray-200">
              {t("licensing")}
            </a>
            <a href="/contact" className="hover:text-gray-200">
              {t("contact")}
            </a>
          </div>
        </div>
        <div className="text-center text-gray-200 text-sm mt-2 font-lively">
          {t("allRightsReserved")}
        </div>
      </footer>
    </div>
  );
};

export default NotFoundPage;
