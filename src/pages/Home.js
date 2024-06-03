import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bigPicture from "../Pics/LogoHome.png";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";
import UserContext from "../context/UserContext";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useContext(UserContext);
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  const logout = () => {
    toast.info("Logging out...");
    localStorage.removeItem("token");
    setUser(false);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-orange-600 p-6 font-lively">
      <header className="w-full max-w-5xl flex justify-between items-center p-5 mb-5">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-16 mr-3" />
          <h1 className="text-2xl">{t("title")}</h1>
        </div>
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <Link
                to="/profilePage"
                className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm border border-orange-600"
              >
                {t("visitProfile")}
              </Link>
              <Link
                onClick={logout}
                to="/"
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm border border-green-600"
              >
                {t("logout")}
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm border border-green-600"
              >
                {t("register")}
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm border border-orange-600"
              >
                {t("login")}
              </Link>
            </>
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

      <main className="w-full max-w-5xl text-center">
        <h2 className="text-4xl mb-5">{t("welcomeMessage")}</h2>
        <p className="text-lg mb-5">{t("description")}</p>
        <div className="relative mb-5">
          <img
            src={bigPicture}
            alt="Banking"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="flex justify-around mb-5 space-x-4">
          <div className="w-1/3 bg-green-400 p-5 rounded-lg shadow-md">
            <h3 className="text-2xl mb-3 text-white">{t("easyTransfers")}</h3>
            <p className="text-white">{t("easyTransfersDesc")}</p>
          </div>
          <div className="w-1/3 bg-orange-600 p-5 rounded-lg shadow-md">
            <h3 className="text-2xl mb-3 text-white">{t("secureSavings")}</h3>
            <p className="text-white">{t("secureSavingsDesc")}</p>
          </div>
          <div className="w-1/3 bg-green-600 p-5 rounded-lg shadow-md">
            <h3 className="text-2xl mb-3 text-white">{t("support")}</h3>
            <p className="text-white">{t("supportDesc")}</p>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-5xl py-4">
        <div className="flex justify-between items-center">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="flex space-x-4">
            <Link to="/about" className="text-gray-700 hover:text-orange-600">
              {t("about")}
            </Link>
            <a href="/privacy" className="text-gray-700 hover:text-orange-600">
              {t("privacyPolicy")}
            </a>
            <a
              href="/licensing"
              className="text-gray-700 hover:text-orange-600"
            >
              {t("licensing")}
            </a>
            <a href="/contact" className="text-gray-700 hover:text-orange-600">
              {t("contact")}
            </a>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-2">
          {t("allRightsReserved")}
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default Home;
