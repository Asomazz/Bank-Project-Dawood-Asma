import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserContext from "../context/UserContext";
import Navbar from "../components/Navbar";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";

const Licensing = () => {
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
          <h1 className="text-4xl font-bold text-orange-600 mb-4">Licensing</h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Welcome to the licensing section of Dasma Bank. Here, you can find
            all the necessary information regarding the licensing of our
            services and products.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl w-full">
          <h2 className="text-2xl font-semibold text-orange-600 mb-4">
            Our Licensing Policy
          </h2>
          <p className="text-gray-700 mb-4">
            At Dasma Bank, we are committed to providing transparent and
            accessible financial services. Our licensing policies ensure that
            our operations comply with international financial regulations and
            standards.
          </p>
          <h3 className="text-xl font-semibold text-orange-600 mb-2">
            Financial Services License
          </h3>
          <p className="text-gray-700 mb-4">
            Dasma Bank operates under a comprehensive financial services license
            granted by the Financial Regulatory Authority (FRA). This license
            authorizes us to provide a wide range of banking services including
            savings accounts, loans, and digital payments.
          </p>
          <h3 className="text-xl font-semibold text-orange-600 mb-2">
            Data Protection and Privacy
          </h3>
          <p className="text-gray-700 mb-4">
            We take data protection seriously. Dasma Bank complies with the
            General Data Protection Regulation (GDPR) to ensure that all client
            information is handled securely and confidentially. Our privacy
            policies are designed to protect your data and respect your privacy.
          </p>
          <h3 className="text-xl font-semibold text-orange-600 mb-2">
            Consumer Protection
          </h3>
          <p className="text-gray-700 mb-4">
            Consumer protection is a cornerstone of our licensing policy. We are
            committed to fair and ethical practices in all our dealings with
            clients. Our services are designed to be transparent, with clear
            terms and conditions, and no hidden fees.
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

export default Licensing;
