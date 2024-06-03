import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UserContext from "../context/UserContext";
import { getProfile, updateProfile } from "../api/auth";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";

const ProfilePage = () => {
  const [user, setUser] = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const profileData = await getProfile(user);
        setProfile(profileData);
      }
    };
    fetchProfile();
  }, [user]);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSave = async () => {
    if (profileImage) {
      const formData = new FormData();
      formData.append("image", profileImage);
      const updatedUser = await updateProfile(formData, user);
      setUser(updatedUser);
      setProfile(updatedUser);
      setProfileImage(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white shadow-md rounded-md p-8 m-4 w-80 text-center">
          {profile.image ? (
            <img
              src={
                "https://react-bank-project.eapi.joincoded.com/" + profile.image
              }
              alt="Profile"
              className="w-48 h-48 rounded-full mx-auto mb-4"
            />
          ) : (
            <div className="w-48 h-48 rounded-full mx-auto mb-4 bg-gray-300" />
          )}
          <h2 className="text-2xl mb-2 text-orange-600">{profile.username}</h2>
          <p className="text-lg text-gray-600">
            Balance: {profile.balance}{" "}
            <span className="text-orange-600">BTC</span>
          </p>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload a Profile Picture
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
            />
          </div>
          <button
            onClick={handleSave}
            className={`mt-4 w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none ${
              !profileImage ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Save
          </button>
        </div>
      </main>
      <footer className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="flex space-x-4">
            <a href="/about" className="text-gray-700 hover:text-orange-600">
              About
            </a>
            <a href="/privacy" className="text-gray-700 hover:text-orange-600">
              Privacy Policy
            </a>
            <a
              href="/licensing"
              className="text-gray-700 hover:text-orange-600"
            >
              Licensing
            </a>
            <a href="/contact" className="text-gray-700 hover:text-orange-600">
              Contact
            </a>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-2">
          © 2024 CODED™. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
