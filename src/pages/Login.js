import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserContext from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";
import bigImage from "../Pics/LogoHome.png";
import { login } from "../api/auth";

const Login = () => {
  const { t, i18n } = useTranslation();
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useContext(UserContext);
  const [language, setLanguage] = useState("EN");
  const navigate = useNavigate();

  const credentials = userInfo.username && userInfo.password;

  const { mutate, isPending } = useMutation({
    mutationKey: ["Login"],
    mutationFn: () => login(userInfo.username, userInfo.password),
    onSuccess: () => {
      setUser(true);
      navigate("/accountPage");
      toast.success(t("loginSuccess"));
    },
    onError: (error) => {
      toast.error(t("loginFailed"));
    },
  });

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const logout = () => {
    toast.info(t("loggingOut"));
    localStorage.removeItem("token");
    setUser(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer />
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
              <button
                onClick={logout}
                className="px-4 py-2 bg-white text-orange-600 rounded-lg text-sm"
              >
                {t("logout")}
              </button>
            </>
          ) : (
            <div></div>
          )}
          {language === "EN" ? (
            <button
              type="submit"
              className={`w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none
              ${!credentials ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handleLanguageChange("AR")}
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
        <div className="flex items-center justify-center space-x-6 max-w-7xl w-full">
          <div className="w-1/2">
            <img src={bigImage} alt="Banking" className="w-full h-auto" />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center p-6">
            <h2 className="text-3xl mb-5 text-orange-600">{t("login")}</h2>
            <p className="mb-5 text-orange-600">
              {t("noAccount")}{" "}
              <Link to="/register" className="text-green-600 underline">
                {t("registerHere")}
              </Link>
            </p>
            <form onSubmit={handleFormSubmit} className="w-full max-w-md">
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block mb-2 text-orange-600 text-left"
                >
                  {t("username")}
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userInfo.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-orange-600 rounded-md focus:outline-none focus:border-orange-600 text-orange-600"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-orange-600 text-left"
                >
                  {t("password")}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-orange-600 rounded-md focus:outline-none focus:border-orange-600 text-orange-600"
                  required
                />
                <Link
                  to="/forgot-password"
                  className="absolute right-0 top-2 text-blue-600"
                >
                  {t("forgotPassword")}
                </Link>
              </div>
              {isPending && (
                <span className="loading loading-ball loading-lg"></span>
              )}
              <button
                type="submit"
                className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none"
              >
                {t("login")}
              </button>
            </form>
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

export default Login;
