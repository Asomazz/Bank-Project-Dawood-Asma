import React from "react";
import { Link, NavLink } from "react-router-dom";
import bigPicture from "../Pics/file-oICBHWLtouaMtgy0jlLldtIo-ezgif.com-webp-to-jpg-converter.jpg";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";
import { useContext } from "react";
import UserContext from "../context/UserContext";

const Home = () => {
  const [user, setUser] = useContext(UserContext);
  const logout = () => {
    alert("logininniinin");
    localStorage.removeItem("token");
    setUser(false);
  };
  return (
    <div
      style={{
        fontFamily: "Quicksand, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#233d4d",
        color: "#f7f8fa",
        padding: "20px",
      }}
    >
      <header
        style={{
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
          backgroundColor: "#fcca46",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: "70px", marginRight: "10px" }}
          />
          <h1 style={{ color: "#233d4d", fontSize: "24px" }}>Dasma Bank</h1>
        </div>
        {user ? (
          <Link
            onClick={logout}
            to="/"
            style={{
              margin: "0 10px",
              padding: "10px 20px",
              backgroundColor: "#fe7f2d",
              color: "#f7f8fa",
              borderRadius: "4px",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Logout
          </Link>
        ) : (
          <nav>
            <Link
              to="/register"
              style={{
                margin: "0 10px",
                padding: "10px 20px",
                backgroundColor: "#fe7f2d",
                color: "#f7f8fa",
                borderRadius: "4px",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Register
            </Link>
            <Link
              to="/login"
              style={{
                margin: "0 10px",
                padding: "10px 20px",
                backgroundColor: "#619b8a",
                color: "#f7f8fa",
                borderRadius: "4px",
                textDecoration: "none",
                fontSize: "14px",
              }}
            >
              Login
            </Link>
          </nav>
        )}
      </header>

      <main
        style={{
          width: "100%",
          maxWidth: "1200px",
          textAlign: "center",
        }}
      >
        <h2
          style={{ color: "#f7f8fa", fontSize: "32px", marginBottom: "20px" }}
        >
          Welcome to Dasma Bank
        </h2>
        <p style={{ color: "#f7f8fa", fontSize: "18px", marginBottom: "20px" }}>
          Manage your finances easily and securely with our online banking
          services.
        </p>
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <img
            src={bigPicture}
            alt="Banking"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "30%",
              backgroundColor: "#a1c181",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                color: "#233d4d",
                fontSize: "24px",
                marginBottom: "10px",
              }}
            >
              Easy Transfers
            </h3>
            <p style={{ color: "#233d4d" }}>
              Send money to anyone, anywhere, with just a few clicks.
            </p>
          </div>
          <div
            style={{
              width: "30%",
              backgroundColor: "#fe7f2d",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                color: "#233d4d",
                fontSize: "24px",
                marginBottom: "10px",
              }}
            >
              Secure Savings
            </h3>
            <p style={{ color: "#f7f8fa" }}>
              Your money is safe with our top-notch security features.
            </p>
          </div>
          <div
            style={{
              width: "30%",
              backgroundColor: "#619b8a",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3
              style={{
                color: "#233d4d",
                fontSize: "24px",
                marginBottom: "10px",
              }}
            >
              24/7 Support
            </h3>
            <p style={{ color: "#f7f8fa" }}>
              We're here to help you any time, any day.
            </p>
          </div>
        </div>
        <Link
          to="/register"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#fe7f2d",
            color: "#f7f8fa",
            borderRadius: "4px",
            textDecoration: "none",
            marginTop: "20px",
          }}
        >
          Get Started
        </Link>
      </main>
    </div>
  );
};

export default Home;
