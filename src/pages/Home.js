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
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    setLanguage(i18n.language);
  }, [i18n.language]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const logout = () => {
    toast.info("Logging out...");
    localStorage.removeItem("token");
    setUser(false);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={`flex flex-col items-center justify-between min-h-screen ${
        loading
          ? "animate-pulse bg-gray-300"
          : "bg-white dark:bg-darkBg dark:text-darkText text-orange-600"
      } font-lively`}
    >
      <header className="w-full max-w-5xl flex justify-between items-center p-5">
        <div className="flex items-center">
          {!loading && <img src={logo} alt="Logo" className="h-16 mr-3" />}
          <h1
            className={`text-3xl ${
              loading ? "bg-gray-400 text-transparent" : ""
            }`}
          >
            {t("title")}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <Link
                to="/profilePage"
                className={`px-4 py-2 rounded-lg text-sm border ${
                  loading
                    ? "bg-gray-400 border-gray-400 text-transparent"
                    : "bg-orange-600 text-white border-orange-600 dark:bg-darkAccent dark:border-darkAccent"
                }`}
              >
                {t("visitProfile")}
              </Link>
              <Link
                onClick={logout}
                to="/"
                className={`px-4 py-2 rounded-lg text-sm border ${
                  loading
                    ? "bg-gray-400 border-gray-400 text-transparent"
                    : "bg-orange-600 text-white border-orange-600 dark:bg-darkAccent dark:border-darkAccent"
                }`}
              >
                {t("logout")}
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/register"
                className={`px-4 py-2 rounded-lg text-sm border ${
                  loading
                    ? "bg-gray-400 border-gray-400 text-transparent"
                    : "bg-orange-600 text-white border-orange-600 dark:bg-darkAccent dark:border-darkAccent"
                }`}
              >
                {t("register")}
              </Link>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg text-sm border ${
                  loading
                    ? "bg-gray-400 border-gray-400 text-transparent"
                    : "bg-orange-600 text-white border-orange-600 dark:bg-darkAccent dark:border-darkAccent"
                }`}
              >
                {t("login")}
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg text-sm border ${
              loading
                ? "bg-gray-400 border-gray-400 text-transparent"
                : "bg-orange-600 text-white border-orange-600 dark:bg-darkAccent dark:border-darkAccent"
            }`}
            aria-label="toggle theme"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="20px"
                viewBox="0 0 24 24"
                width="20px"
                className="fill-current"
              >
                <rect fill="none" height="24" width="24" />
                <path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="20px"
                viewBox="0 0 24 24"
                width="20px"
                className="fill-current"
              >
                <rect fill="none" height="24" width="24" />
                <path d="M11.01,3.05C6.51,3.54,3,7.36,3,12c0,4.97,4.03,9,9,9c4.63,0,8.45-3.5,8.95-8c0.09-0.79-0.78-1.42-1.54-0.95 c-0.84,0.54-1.84,0.85-2.91,0.85c-2.98,0-5.4-2.42-5.4-5.4c0-1.06,0.31-2.06,0.84-2.89C12.39,3.94,11.9,2.98,11.01,3.05z" />
              </svg>
            )}
          </button>
          {language === "EN" ? (
            <button
              onClick={() => handleLanguageChange("AR")}
              className={`px-4 py-2 rounded-lg text-sm border ${
                loading
                  ? "bg-gray-400 border-gray-400 text-transparent"
                  : "bg-orange-600 text-white border-orange-600 dark:bg-darkAccent dark:border-darkAccent"
              }`}
            >
              AR
            </button>
          ) : (
            <button
              onClick={() => handleLanguageChange("EN")}
              className={`px-4 py-2 rounded-lg text-sm border ${
                loading
                  ? "bg-gray-400 border-gray-400 text-transparent"
                  : "bg-orange-600 text-white border-orange-600 dark:bg-darkAccent dark:border-darkAccent"
              }`}
            >
              EN
            </button>
          )}
        </div>
      </header>

      <main className="w-full max-w-5xl text-center flex-grow flex flex-col justify-center items-center">
        <h2
          className={`text-5xl mb-5 ${
            loading ? "bg-gray-400 text-transparent" : ""
          }`}
        >
          {t("welcomeMessage")}
        </h2>
        <p
          className={`text-2xl mb-5 ${
            loading ? "bg-gray-400 text-transparent" : ""
          }`}
        >
          {t("description")}
        </p>
        {!loading && (
          <>
            <div className="relative mb-5 w-full max-w-4xl">
              <img
                src={bigPicture}
                alt="Banking"
                className="w-full max-h-80 object-contain mx-auto rounded-lg"
              />
            </div>
            <div className="flex justify-around mb-5 space-x-4 w-full">
              <div className="w-1/3 bg-orange-600 dark:bg-darkAccent p-6 rounded-lg shadow-md">
                <h3 className="text-2xl mb-3 text-white">
                  {t("easyTransfers")}
                </h3>
                <p className="text-white">{t("easyTransfersDesc")}</p>
              </div>
              <div className="w-1/3 bg-orange-600 dark:bg-darkAccent p-6 rounded-lg shadow-md">
                <h3 className="text-2xl mb-3 text-white">
                  {t("secureSavings")}
                </h3>
                <p className="text-white">{t("secureSavingsDesc")}</p>
              </div>
              <div className="w-1/3 bg-orange-600 dark:bg-darkAccent p-6 rounded-lg shadow-md">
                <h3 className="text-2xl mb-3 text-white">{t("support")}</h3>
                <p className="text-white">{t("supportDesc")}</p>
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="w-full max-w-5xl py-4">
        <div className="flex justify-between items-center">
          {!loading && <img src={logo} alt="Logo" className="h-8 w-auto" />}
          <div className="flex space-x-4">
            <Link
              to="/about"
              className={`text-gray-700 hover:text-orange-600 ${
                loading ? "text-transparent" : ""
              }`}
            >
              {t("about")}
            </Link>
            <Link
              to="/privacy"
              className={`text-gray-700 hover:text-orange-600 ${
                loading ? "text-transparent" : ""
              }`}
            >
              {t("privacyPolicy")}
            </Link>
            <Link
              to="/licensing"
              className={`text-gray-700 hover:text-orange-600 ${
                loading ? "text-transparent" : ""
              }`}
            >
              {t("licensing")}
            </Link>
            <Link
              to="/contact"
              className={`text-gray-700 hover:text-orange-600 ${
                loading ? "text-transparent" : ""
              }`}
            >
              {t("contact")}
            </Link>
          </div>
        </div>
        <div
          className={`text-center text-gray-500 text-sm mt-2 ${
            loading ? "text-transparent" : ""
          }`}
        >
          {t("allRightsReserved")}
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default Home;
