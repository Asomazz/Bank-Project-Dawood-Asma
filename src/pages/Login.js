import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";
import bigImage from "../Pics/LogoHome.png";
import { login } from "../api/auth";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["Login"],
    mutationFn: () => login(userInfo.username, userInfo.password),
    onSuccess: () => {
      setUser(true);
      navigate("/accountPage");
    },
  });

  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white text-orange-600 p-6 font-lively">
      <div className="absolute top-5 left-5 flex items-center">
        <img src={logo} alt="Logo" className="h-16 mr-3" />
        <h1 className="text-2xl">Dasma Bank</h1>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-center items-center mt-16">
        <div className="w-full md:w-2/3 lg:w-1/2 flex justify-center items-center">
          <img
            src={bigImage}
            alt="Banking"
            className="w-3/4 md:w-full h-auto"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6">
          <h2 className="text-3xl mb-5">Login to your account</h2>
          <p className="mb-5">
            If you don't have an account,{" "}
            <a href="/register" className="text-green-600 underline">
              register here
            </a>
          </p>
          <form onSubmit={handleFormSubmit} className="w-full max-w-md">
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2 text-orange-600">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={userInfo.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-orange-600 rounded-md focus:outline-none focus:border-orange-600"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password" className="block mb-2 text-orange-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={userInfo.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-orange-600 rounded-md focus:outline-none focus:border-orange-600"
                required
              />
              <a
                href="/register"
                className="absolute right-0 top-2 text-blue-600"
              >
                Forgot password?
              </a>
            </div>
            {isPending && (
              <span className="loading loading-ball loading-lg"></span>
            )}
            <button
              type="submit"
              className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
