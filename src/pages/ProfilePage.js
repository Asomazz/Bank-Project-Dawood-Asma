import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import UserContext from "../context/UserContext";
import { getProfile, updateProfile } from "../api/auth";
import { ToastContainer, toast } from "react-toastify";
import logo from "../Pics/Collage_2024-05-29_00_55_17-removebg-preview.png";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [user, setUser] = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const fileInputRef = React.createRef();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const profileData = await getProfile(user);
        setProfile(profileData);
        setOriginalImage(profileData.image);
      }
    };
    fetchProfile();
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleClear = () => {
    setProfileImage(null);
    setPreviewImage(null);
    fileInputRef.current.value = null;
  };

  const handleSave = async () => {
    if (profileImage) {
      const formData = new FormData();
      formData.append("image", profileImage);
      try {
        const updatedUser = await updateProfile(formData, user);
        setUser(updatedUser);
        setProfile(updatedUser);
        setOriginalImage(updatedUser.image);
        handleClear(); // Clear the input and preview after saving
        toast.success(t("profileUpdated"));
      } catch (error) {
        toast.error(t("updateFailed"));
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-700 font-lively">
      <Navbar />
      <main className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-white shadow-md rounded-md p-8 m-4 w-80 text-center">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-48 h-48 rounded-full mx-auto mb-4"
            />
          ) : profile.image ? (
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
            {t("balance")}: {profile.balance}{" "}
            <span className="text-orange-600">BTC</span>
          </p>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("uploadProfilePicture")}
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={handleSave}
              className="w-full py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none mr-2"
            >
              {t("save")}
            </button>
            {previewImage && (
              <button
                onClick={handleClear}
                className="w-full py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none ml-2"
              >
                {t("clear")}
              </button>
            )}
          </div>
        </div>
      </main>
      <footer className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <img src={logo} alt="Logo" className="h-8 w-auto" />
          <div className="flex space-x-4">
            <a href="/about" className="text-gray-700 hover:text-orange-600">
              {t("about")}
            </a>
            <a href="/privacy" className="text-gray-700 hover:text-orange-600">
              {t("privacyPolicy")}
            </a>
            <a
              href="/licensing"
              className="text-gray-700 hover:text-orange-600"
            >
              {t("licensing")}
            </a>
            <a href="/contact" className="text-gray-700 hover:text-orange-600">
              {t("contact")}
            </a>
          </div>
        </div>
        <div className="text-center text-gray-500 text-sm mt-2">
          {t("allRightsReserved")}
        </div>
      </footer>
      <ToastContainer />
    </div>
  );
};

export default ProfilePage;
