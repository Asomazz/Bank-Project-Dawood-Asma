import React, { useContext } from "react";
import { Link } from "react-router-dom";
import bigPicture from "../Pics/LogoHome.png";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";
import UserContext from "../context/UserContext";
import "tailwindcss/tailwind.css";

const Home = () => {
  const [user, setUser] = useContext(UserContext);

  const logout = () => {
    alert("Logging out...");
    localStorage.removeItem("token");
    setUser(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-orange-600 p-6 font-lively">
      <header className="w-full max-w-5xl flex justify-between items-center p-5 mb-5">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-16 mr-3" />
          <h1 className="text-2xl">Dasma Bank</h1>
        </div>
        {user ? (
          <div className="flex items-center">
            <Link
              to="/profilePage"
              className="mx-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
            >
              Visit Profile
            </Link>
            <Link
              onClick={logout}
              to="/"
              className="mx-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm"
            >
              Logout
            </Link>
          </div>
        ) : (
          <nav>
            <Link
              to="/register"
              className="mx-2 px-4 py-2 bg-orange-600 text-white rounded-lg text-sm"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="mx-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
            >
              Login
            </Link>
          </nav>
        )}
      </header>

      <main className="w-full max-w-5xl text-center">
        <h2 className="text-4xl mb-5">Welcome to Dasma Bank</h2>
        <p className="text-lg mb-5">
          Manage your finances easily and securely with our online banking
          services.
        </p>
        <div className="relative mb-5">
          <img
            src={bigPicture}
            alt="Banking"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <div className="flex justify-around mb-5">
          <div className="w-1/3 bg-green-400 p-5 rounded-lg shadow-md">
            <h3 className="text-2xl mb-3 text-white">Easy Transfers</h3>
            <p className="text-white">
              Send money to anyone, anywhere, with just a few clicks.
            </p>
          </div>
          <div className="w-1/3 bg-orange-600 p-5 rounded-lg shadow-md">
            <h3 className="text-2xl mb-3 text-white">Secure Savings</h3>
            <p className="text-white">
              Your money is safe with our top-notch security features.
            </p>
          </div>
          <div className="w-1/3 bg-green-600 p-5 rounded-lg shadow-md">
            <h3 className="text-2xl mb-3 text-white">24/7 Support</h3>
            <p className="text-white">
              We're here to help you any time, any day.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
