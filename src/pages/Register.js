import React, { useContext, useState, useEffect } from "react";
import { register } from "../api/auth";
import { useMutation } from "@tanstack/react-query";
import UserContext from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";
import bigImage from "../Pics/LogoHome.png";

const Register = () => {
  const { t, i18n } = useTranslation();
  const [userInfo, setUserInfo] = useState({
    username: "",
    image: null,
    password: "",
  });

  const [user, setUser] = useContext(UserContext);
  const [language, setLanguage] = useState(i18n.language);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const credentials = userInfo.username && userInfo.password && userInfo.image;

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.files[0] });
    } else {
      setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    }
  };

  const { mutate } = useMutation({
    mutationKey: ["register"],
    mutationFn: () => register(userInfo),
    onSuccess: () => {
      setUser(true);
      setUserInfo({ username: "", password: "", image: null });
      navigate("/accountPage");
      toast.success(t("registrationSuccessful"));
      setIsProcessing(false);
    },
    onError: () => {
      setUserInfo({ username: "", password: "", image: null });
      toast.error(t("registrationFailed"));
      setIsProcessing(false);
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    mutate();
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const logout = () => {
    toast.info(t("loggingOut"));
    localStorage.removeItem("token");
    setUser(false);
  };

  return (
    <div
      className={`flex flex-col min-h-screen ${theme === "dark" ? "dark" : ""}`}
    >
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
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg text-sm border bg-white text-orange-600 border-orange-600`}
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
              className={`px-4 py-2 rounded-lg text-sm border bg-white text-orange-600 border-orange-600`}
            >
              AR
            </button>
          ) : (
            <button
              onClick={() => handleLanguageChange("EN")}
              className={`px-4 py-2 rounded-lg text-sm border bg-white text-orange-600 border-orange-600`}
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
            <h2 className="text-3xl mb-5 text-orange-600">{t("register")}</h2>
            <p className="mb-5 text-orange-600">
              {t("nAccount")}{" "}
              <Link to="/login" className="text-green-600 underline">
                {t("loginHere")}
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
              <div className="mb-4">
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
              </div>
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block mb-2 text-orange-600 text-left"
                >
                  {t("uploadProfilePicture")}
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full py-2 text-white rounded-md focus:outline-none ${
                  isProcessing ? "bg-orange-400" : "bg-orange-600"
                } ${
                  isProcessing ? "cursor-not-allowed" : "hover:bg-orange-700"
                }`}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <svg
                    className="animate-spin h-5 w-5 mx-auto text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  t("register")
                )}
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

export default Register;
