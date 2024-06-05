import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserContext from "../context/UserContext";
import Navbar from "../components/Navbar";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useContext(UserContext);
  const [language, setLanguage] = useState(i18n.language);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const logout = () => {
    alert("Logging out...");
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
            Dasma Bank
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
          {language === "en" ? (
            <button
              onClick={() => handleLanguageChange("ar")}
              className="px-4 py-2 bg-white text-orange-600 border border-orange-600 rounded-lg text-sm"
            >
              AR
            </button>
          ) : (
            <button
              onClick={() => handleLanguageChange("en")}
              className="px-4 py-2 bg-white text-orange-600 border border-orange-600 rounded-lg text-sm"
            >
              EN
            </button>
          )}
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-600 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Your privacy is important to us. This privacy policy explains how we
            collect, use, and protect your information.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">
            Information Collection
          </h2>
          <p className="text-gray-700 mb-4">
            We collect information that you provide to us directly, such as when
            you create an account, make a transaction, or contact us for
            support. This may include your name, email address, phone number,
            and financial information.
          </p>
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">
            Use of Information
          </h2>
          <p className="text-gray-700 mb-4">
            The information we collect is used to provide and improve our
            services, process transactions, communicate with you, and ensure the
            security of our platform. We may also use your information for
            marketing purposes, with your consent.
          </p>
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">
            Data Protection
          </h2>
          <p className="text-gray-700">
            We implement robust security measures to protect your data from
            unauthorized access, disclosure, alteration, or destruction. Our
            data protection practices comply with applicable laws and
            regulations to ensure your information is handled with the utmost
            care.
          </p>
        </div>
      </main>

      <footer className="w-full bg-orange-600 text-white py-4 text-center">
        <div className="flex justify-between items-center max-w-5xl mx-auto px-4 font-lively">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="flex space-x-4">
            <Link to="/about" className="hover:text-gray-200">
              {t("about")}
            </Link>
            <Link to="/privacy" className="hover:text-gray-200">
              {t("privacyPolicy")}
            </Link>
            <Link to="/licensing" className="hover:text-gray-200">
              {t("licensing")}
            </Link>
            <Link to="/contact" className="hover:text-gray-200">
              {t("contact")}
            </Link>
          </div>
        </div>
        <div className="text-center text-gray-200 text-sm mt-2 font-lively">
          {t("allRightsReserved")}
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
