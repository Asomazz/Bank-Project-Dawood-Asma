import React, { useContext, useState } from "react";
import { register } from "../api/auth";
import { useMutation } from "@tanstack/react-query";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";
import bigImage from "../Pics/file-oICBHWLtouaMtgy0jlLldtIo-ezgif.com-webp-to-jpg-converter.jpg";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    image: null,
    password: "",
  });
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

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
      alert("Registration successful!");
      setUserInfo({ username: "", password: "", image: null });
      navigate("/");
    },
    onError: () => {
      alert("Registration failed. Please try again.");
      setUserInfo({ username: "", password: "", image: null });
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div
      style={{
        fontFamily: "Quicksand, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#233d4d",
        color: "#f7f8fa",
        padding: "20px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ height: "70px", marginRight: "10px" }}
        />
        <h1 style={{ color: "#f7f8fa", fontSize: "24px" }}>Dasma Bank</h1>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "60px",
        }}
      >
        <div
          style={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={bigImage}
            alt="Banking"
            style={{ width: "85%", height: "auto" }}
          />
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
              backgroundColor: "#f7f8fa",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "40px",
            }}
          >
            <h2
              style={{
                marginBottom: "10px",
                color: "#233d4d",
                fontSize: "24px",
              }}
            >
              Register your account
            </h2>
            <p style={{ marginBottom: "20px", color: "#233d4d" }}>
              If you do have an account,{" "}
              <a href="/login" style={{ color: "#fe7f2d" }}>
                login here
              </a>
            </p>
            <form onSubmit={handleFormSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="username"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#233d4d",
                  }}
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userInfo.username}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #a1c181",
                    borderRadius: "4px",
                    fontSize: "14px",
                    color: "#233d4d",
                  }}
                  required
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="password"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#233d4d",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #a1c181",
                    borderRadius: "4px",
                    fontSize: "14px",
                    color: "#233d4d",
                  }}
                  required
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="image"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#233d4d",
                  }}
                >
                  Upload a Profile Picture
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #a1c181",
                    borderRadius: "4px",
                    fontSize: "14px",
                    color: "#233d4d",
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "#fe7f2d",
                  color: "#f7f8fa",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
